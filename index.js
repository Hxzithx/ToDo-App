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
        task.value = "";
        closeForm();
    }
}
