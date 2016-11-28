$(document).ready(function(){
  var numTasks = 0;
  var numTasksCreated = 0;

  $("#addTask").click(function(){
		var newTask = getNewTask();
    if (addTaskToList(newTask, numTasksCreated)){
      numTasks++;
      numTasksCreated++;
    }
	  document.getElementById("numTasks").innerHTML = numTasks;
  })

  $(document).on("click", ".deleteButton", function(){
      if (confirm("Do you really wish to delete this task?")){
        $(this).parent().fadeOut(500, function(){
          $(this).delay(500).remove();
        });
        numTasks--;
        document.getElementById("numTasks").innerHTML = numTasks;
      }
  })

  $("#cbWeather").change(function(){
    if (this.checked){
      document.getElementById("zipInput").readOnly = false;
    }
    else{
      document.getElementById("zipInput").readOnly = true;
    }
  });
});

function getNewTask(){
	//returns a task object {text:string, dueDate:string, dueTime:string,
  //  weatherZip:string}
	//all three members could be falsy
	var fTaskName = document.getElementById("taskInput").elements["task"].value;
	var fDueDate = document.getElementById("taskInput").elements["dueDate"].value;
	var fDueTime = document.getElementById("taskInput").elements["dueTime"].value;
  var fZipCode = "";
  if (document.getElementById("taskInput").elements["chkWeather"].checked){
    fZipCode = document.getElementById("zipInput").value;
  }

	return {text:fTaskName, dueDate:fDueDate, dueTime:fDueTime,
     weatherZip:fZipCode};
}

function addTaskToList(task, taskID){
  if (!task.text){
    document.getElementById("warn").style.visibility = "visible";
    return false;
  }
  document.getElementById("warn").style.visibility = "hidden";

  if (task.weatherZip && !(task.dueDate && task.dueTime)){
    alert("A date and time must be given to check weather");
    return false;
  }

  //newItem represents a new <p> element to be added to document
  var newItem = "<p class='task' id='task" + taskID + "'>";
  newItem += "<b>Task:</b> " + task.text;
  if (task.dueDate){
    newItem += " <b>Due:</b> " + task.dueDate;
    if (task.dueTime){
      newItem += " at " + task.dueTime;
    }
  }

  if (task.weatherZip){
    newItem += getWeather(task);
  }

  newItem += "<span class='deleteButton'>x</span>";
  newItem += "</p>";

  $(newItem).hide().appendTo("#todoList").fadeIn();
  return true;
}

function getWeather(task){
  var latitude;
  var longitude;
  var time;
  var forecast;
  var temperature;
  var precipChance;
  var gmkey = "";
  var dskey = "";

  //get API keys from local file
  gmkey = keys[0].key;
  dskey = keys[1].key;

  //get lat+long for a zipcode using Google Maps Geocoding API
  var gmurl = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" +
    task.weatherZip + "&key=" + gmkey;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
    var myArr = JSON.parse(this.responseText);
    latitude = myArr.results[0].geometry.location.lat;
    longitude = myArr.results[0].geometry.location.lng;
    }
  };
  xmlhttp.open("GET", gmurl, false);
  xmlhttp.send();

  time = task.dueDate + "T" + task.dueTime + ":00";
  //get weather using Dark Sky Weather API
  var dsurl = "https://api.darksky.net/forecast/" + dskey +
    "/" + latitude + "," + longitude + "," + time +
    "?exclude=minutely,hourly,daily,alerts,flags";

  xmlhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      var myArr = JSON.parse(this.responseText);
      forecast = myArr.currently.summary;
      temperature = Math.round(myArr.currently.temperature);
      precipChance = myArr.currently.precipProbability * 100;
      }
    };
    xmlhttp.open("GET", dsurl, false);
    xmlhttp.send();


    return " <b>Weather: </b>" + forecast + "; " + temperature + "&deg;F;" +
      " Chance of Precipiation: " + precipChance + "%";
}
