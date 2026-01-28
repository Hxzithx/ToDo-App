"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("../BE/route/routes"));
function openForm() {
    const popup = document.getElementById("popupForm");
    popup.style.display = "flex";
}
function closeForm() {
    const closeForm = document.getElementById("popupForm");
    closeForm.style.display = "none";
}
//load task
async function loadTasks() {
    try {
        const res = await fetch("http://localhost:3000/api/tasks");
        const tasks = await res.json();
        const taskList = document.getElementById("taskList");
        if (!taskList) {
            console.error("Task list element not found");
            return;
        }
        taskList.innerHTML = "";
        tasks.forEach((task) => {
            const li = document.createElement("li");
            li.textContent = task.title;
            taskList.appendChild(li);
        });
    }
    catch (error) {
        console.error("Failed to load tasks", error);
    }
}
//save task
async function saveTask() {
    const taskInput = document.getElementById("taskInput");
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
    }
    catch (error) {
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
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task.title;
        list.appendChild(li);
    });
    popup.style.display = "flex";
}
function closeHistory() {
    const historyPopUp = document.getElementById("historyPopup");
    historyPopUp.style.display = "none";
}
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", routes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

document.addEventListener("DOMContentLoaded", () => {
  setCurrentDate();
});

function setCurrentDate() {
  const dateElement = document.getElementById("currentDate");

  if (!dateElement) {
    console.error("Date element not found");
    return;
  }

  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  dateElement.textContent = `${year}/${month}/${day}`;
}
function showAppPage() {
  document.getElementById("authPage").style.display = "none";
  document.getElementById("appPage").style.display = "block";
}

function showAuthPage() {
  document.getElementById("authPage").style.display = "flex";
  document.getElementById("appPage").style.display = "none";
}

// Firebase auth functions
window.signup = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Signup successful!");
    showAppPage();
  } catch (error) {
    alert(error.message);
  }
};

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    showAppPage();
  } catch (error) {
    alert(error.message);
  }
};

const firebaseConfig = {
  apiKey: "AIzaSyAIK0D3hkDX-OPlS1xnz6nMRJc59NB9Tco",
  authDomain: "todo-app-74c70.firebaseapp.com",
  projectId: "todo-app-74c70",
  storageBucket: "todo-app-74c70.firebasestorage.app",
  messagingSenderId: "96127534578",
  appId: "1:96127534578:web:a827d3959129058cb8176b",
  measurementId: "G-82KSC33CS8"
};
const { initializeApp, getAuth } = window.firebaseModules;

const fireBaseapp = initializeApp(firebaseConfig);
const auth = getAuth(fireBaseapp);