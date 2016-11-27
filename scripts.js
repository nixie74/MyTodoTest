$(document).ready(function(){
  var taskList = [];
  $("#addTask").click(function(){
		var newTask = getNewTask();
    if (addTaskToList(newTask, taskList.length)){
      taskList.push(newTask);
    }
	  document.getElementById("numTasks").innerHTML = taskList.length;
  })

  $(document).on("click", ".deleteButton", function(){
      if (confirm("Do you really wish to delete this task?")){
        var parentIDNum = $(this).parent().attr('id').substring(4);
        var taskIdx = parseInt(parentIDNum);
        taskList.splice(taskIdx, 1);
        $(this).parent().fadeOut(500, function(){
          $(this).delay(500).remove();
          document.getElementById("numTasks").innerHTML = taskList.length;
        });
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

function addTaskToList(task, numTasks){
  if (!task.text){
    document.getElementById("warn").style.visibility = "visible";
    return false;
  }
  document.getElementById("warn").style.visibility = "hidden";

  //newItem represents a new <p> element to be added to document
  var newItem = "<p class='task' id='task" + numTasks + "'>";
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
