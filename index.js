var taskHistoryArr = [];
function openForm() {
    var popup = document.getElementById("popupForm");
    popup.style.display = "flex";
}
function closeForm() {
    var closeForm = document.getElementById("popupForm");
    closeForm.style.display = "none";
}
function saveTask() {
    var task = document.getElementById("taskInput");
    if (task.value.trim() !== "") {
        alert("Task Added");
        taskHistoryArr.push(task.value);
        task.value = "";
        closeForm();
    }
    else {
        alert("Please Enter a Task");
    }
}
function taskHistory() {
    var historyPopUp = document.getElementById("historyPopup");
    var list = document.getElementById("historyList");
    list.innerHTML = "";
    taskHistoryArr.forEach(function (hisTask) {
        var li = document.createElement("li");
        li.textContent = hisTask;
        list.appendChild(li);
    });
    historyPopUp.style.display = "flex";
}
function closeHistory() {
    var historyPopUp = document.getElementById("historyPopup");
    historyPopUp.style.display = "none";
}
x