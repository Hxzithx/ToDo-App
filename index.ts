function openForm() : void {
    const popup = document.getElementById("popupForm") as HTMLDivElement;
    popup.style.display = "flex";
}

function closeForm() : void {
    const closeForm = document.getElementById("popupForm") as HTMLDivElement;
    closeForm.style.display = "none";
}
function saveTask() : void {
    const task = document.getElementById("taskInput") as HTMLInputElement;

    if(task.value.trim() !== ""){
         alert("Task Added" +task.value);
         task.value = "";
         closeForm();
   }
}