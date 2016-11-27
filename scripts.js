$(function(){
  var taskList = [];

  document.getElementById("numTasks").innerHTML = taskList.length;
  $("#addTask").click(function(){
		var newTask = getNewTask();

		if (!newTask.text){
			document.getElementById("warn").style.visibility = "visible";
			return;
		}

		document.getElementById("warn").style.visibility = "hidden";
    taskList.push(newTask);

    //newItem represents a new <p> element to be added to document
    var newItem = "<p id='task" + taskList.length + "'>";
    newItem += "<b>Task:</b> " + newTask.text;
    if (newTask.dueDate){
      newItem += " <b>Due:</b> " + newTask.dueDate;
      if (newTask.dueTime){
        newItem += " at " + newTask.dueTime;
      }
    }
    newItem += "</p>";

    $("#todoList").append(newItem);
		document.getElementById("numTasks").innerHTML = taskList.length;
  })
});

function getNewTask(){
	//returns a task object {text:string, dueDate:string, dueTime:string}
	//all three members should be not undefined (but could be otherwise falsy)
	var fTaskName = document.getElementById("taskInput").elements["task"].value;
	var fDueDate = document.getElementById("taskInput").elements["dueDate"].value;
	var fDueTime = document.getElementById("taskInput").elements["dueTime"].value;

	return {text:fTaskName, dueDate:fDueDate, dueTime:fDueTime};
}
