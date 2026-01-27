import { db } from "./data/db";
import express from "express";
import cors from "cors";
import routes from "./route/routes";

function openForm() : void {
    const popup = document.getElementById("popupForm") as HTMLDivElement;
    popup.style.display = "flex";
}

function closeForm() : void {
    const closeForm = document.getElementById("popupForm") as HTMLDivElement;
    closeForm.style.display = "none";
}
//load task
async function loadTasks(): Promise<void> {
  try {
    const res = await fetch("http://localhost:3000/api/tasks");
    const tasks = await res.json();

    const taskList = document.getElementById("taskList");

    if (!taskList) {
      console.error("Task list element not found");
      return;
    }

    taskList.innerHTML = "";

    tasks.forEach((task: any) => {
      const li = document.createElement("li");
      li.textContent = task.title;
      taskList.appendChild(li);
    });
  } catch (error) {
    console.error("Failed to load tasks", error);
  }
}
//save task
async function saveTask(): Promise<void> {
  const taskInput = document.getElementById("taskInput") as HTMLInputElement | null;

  if (!taskInput) {
    console.error("Task input not found");
    return;
  }

  const title = taskInput.value.trim();

  if (title === "") {
    alert("Please Enter a Task");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    });

    if (!res.ok) {
      throw new Error("Failed to save task");
    }

    alert("Task Added");

    taskInput.value = "";
    closeForm();

    loadTasks();
  } catch (error) {
    console.error(error);
    alert("Error saving task");
  }
}
//task history
async function taskHistory() {
  const res = await fetch("http://localhost:3000/api/tasks/history");
  const tasks = await res.json();

  const list = document.getElementById("historyList");
  const popup = document.getElementById("historyPopup");

  if (!list || !popup) {
    console.error("History elements not found");
    return;
  }

  list.innerHTML = "";

  tasks.forEach((task: any) => {
    const li = document.createElement("li");
    li.textContent = task.title;
    list.appendChild(li);
  });

  popup.style.display = "flex";
}

function closeHistory() :void {
    const historyPopUp = document.getElementById("historyPopup") as HTMLDivElement;
    historyPopUp.style.display = "none";
}



const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});