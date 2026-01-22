let taskHistoryArr : string[] = [];

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
         alert("Task Added");
         taskHistoryArr.push(task.value);
         task.value = "";
         closeForm();
   }
}
function taskHistory() : void {
    const historyPopUp = document.getElementById("historyPoup") as HTMLDivElement;
    const list = document.getElementById("historyList") as HTMLDivElement;

    list.innerHTML = "";
    taskHistoryArr.forEach(hisTask =>{
        const li = document.createElement("li");
        li.textContent = hisTask;
        list.appendChild(li);
    });
    historyPopUp.style.display = "flex";
}
function closeHistory() :void {
    const historyPopUpClose = document.getElementById("historyPopup") as HTMLDivElement;
    historyPopUpClose.style.display = "none";
}