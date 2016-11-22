function addNewTask(){
	var taskName = document.getElementById("taskInput").elements["task"].value;
	var dueDate = document.getElementById("taskInput").elements["dueDate"].value;
	var dueTime = document.getElementById("taskInput").elements["dueTime"].value;
	if (taskName == ""){
		document.getElementById("warn").style.visibility = "visible";
	}
	else{
		document.getElementById("warn").style.visibility = "hidden";
		var currList = document.getElementById("taskList").innerHTML;
		var newList = currList + "<br></br>" + "<b>Task:</b> " + taskName;
		if (dueDate != ""){
			newList += " <b>Due:</b>" + dueDate;
			if (dueTime != ""){
				newList += " at " + dueTime;
			}
		}
		document.getElementById("taskList").innerHTML = newList;
	}

}