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
});

function getNewTask(){
	//returns a task object {text:string, dueDate:string, dueTime:string}
	//all three members could be falsy
	var fTaskName = document.getElementById("taskInput").elements["task"].value;
	var fDueDate = document.getElementById("taskInput").elements["dueDate"].value;
	var fDueTime = document.getElementById("taskInput").elements["dueTime"].value;

	return {text:fTaskName, dueDate:fDueDate, dueTime:fDueTime};
}

function addTaskToList(task, taskID){
  if (!task.text){
    document.getElementById("warn").style.visibility = "visible";
    return false;
  }
  document.getElementById("warn").style.visibility = "hidden";

  //newItem represents a new <p> element to be added to document
  var newItem = "<p class='task' id='task" + taskID + "'>";
  newItem += "<b>Task:</b> " + task.text;
  if (task.dueDate){
    newItem += " <b>Due:</b> " + task.dueDate;
    if (task.dueTime){
      newItem += " at " + task.dueTime;
    }
  }
  newItem += "<span class='deleteButton'>x</span>";
  newItem += "</p>";

  $(newItem).hide().appendTo("#todoList").fadeIn();
  return true;
}
