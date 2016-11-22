function addNewTask(){
	var taskName = document.getElementById("taskInput").elements["task"].value;
	var dueDate = document.getElementById("taskInput").elements["dueDate"].value;
	var dueTime = document.getElementById("taskInput").elements["dueTime"].value;
	var currList = document.getElementById("taskList").innerHTML;
	var newList = currList + "<br></br>" + "<b>Task:</b> " + taskName + " <b>Due:</b>" +
	    dueDate + " at " + dueTime;
	document.getElementById("taskList").innerHTML = newList;
}