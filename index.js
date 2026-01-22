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
        alert("Task Added" + task.value);
        taskHistoryArr.push(task.value);
        task.value = "";
        closeForm();
    }
}
function taskHistory() {
    var historyPopUp = document.getElementById("historyPoup");
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
    var historyPopUpClose = document.getElementById("historyPopup");
    historyPopUpClose.style.display = "none";
}
