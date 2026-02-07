console.log("FE index.js loaded");

window.auth = null;
let signInWithEmailAndPassword;
let createUserWithEmailAndPassword;
 //UI HELPERS
function openForm() {
  const popup = document.getElementById("popupForm");
  if (popup) popup.style.display = "flex";
} 

function closeForm() {
  const popup = document.getElementById("popupForm");
  if (popup) popup.style.display = "none";
}

function closeHistory() {
  const popup = document.getElementById("historyPopup");
  if (popup) popup.style.display = "none";
}

function showAppPage() {
  document.getElementById("authPage").style.display = "none";
  document.getElementById("appPage").style.display = "block";
}

function showAuthPage() {
  document.getElementById("authPage").style.display = "flex";
  document.getElementById("appPage").style.display = "none";
}

 // DATE
document.addEventListener("DOMContentLoaded", () => {
  setCurrentDate();
});

function setCurrentDate() {
  const dateElement = document.getElementById("currentDate");
  if (!dateElement) return;

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  dateElement.textContent = `${year}/${month}/${day}`;
}


 // FIREBASE INIT
window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Loaded");
   console.log("firebaseModules =", window.firebaseModules);
  const fb = window.firebaseModules;

  if(!fb){
    console.error("Firebase modules not found");
  }

const firebaseConfig = {
  apiKey: "AIzaSyAIK0D3hkDX-OPlS1xnz6nMRJc59NB9Tco",
  authDomain: "todo-app-74c70.firebaseapp.com",
  projectId: "todo-app-74c70",
  storageBucket: "todo-app-74c70.firebasestorage.app",
  messagingSenderId: "96127534578",
  appId: "1:96127534578:web:a827d3959129058cb8176b",
  measurementId: "G-82KSC33CS8"
};

const firebaseApp = fb.initializeApp(firebaseConfig);
window.auth = fb.getAuth(firebaseApp);

console.log("Firesbase intialization succesfull",window.auth);
});

 //AUTH FUNCTIONS
window.signup = async function () {
  /*if(!window.auth){
    alert("Auth not ready yet");
    return;
  }*/
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await window.firebaseModules.createUserWithEmailAndPassword(auth, email, password);
    alert("Signup successful!");
    showAppPage();
    loadTasks();
  } catch (error) {
    alert(error.message);
  }
};

window.login = async function () {
  /*if(!window.auth){
    alert("Auth not ready yet");
    return;
  }*/
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await window.firebaseModules.signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    showAppPage();
    loadTasks();
  } catch (error) {
    alert(error.message);
  }
};
//logout
window.logout = async function () {
  /*if (!window.auth) {
    alert("Auth not ready");
    return;
  }*/

  try {
    await window.firebaseModules.signOut(auth);
    alert("Logged out successfully");
    showAuthPage();
  } catch (error) {
    alert(error.message);
  }
};

 //TOKEN
async function getIdToken() {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
}

 //TASKS
async function loadTasks() {
  const token = await getIdToken();
  if (!token) return;

  const res = await fetch("http://localhost:3000/api/tasks", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const tasks = await res.json();
  renderTasks(tasks);
}

function renderTasks(tasks) {
  const taskList = document.getElementById("taskList");
  if (!taskList) return;

  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.title;
    taskList.appendChild(li);
  });
}

async function saveTask() {
  const taskInput = document.getElementById("taskInput");
  if (!taskInput) return;

  const title = taskInput.value.trim();
  if (!title) {
    alert("Please enter a task");
    return;
  }

  const token = await getIdToken();

  const res = await fetch("http://localhost:3000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title })
  });

  if (!res.ok) {
    alert("Failed to save task");
    return;
  }

  taskInput.value = "";
  closeForm();
  loadTasks();
}

 //TASK HISTORY
async function taskHistory() {
  const token = await getIdToken();

  const res = await fetch("http://localhost:3000/api/tasks/history", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const tasks = await res.json();

  const list = document.getElementById("historyList");
  const popup = document.getElementById("historyPopup");
  if (!list || !popup) return;

  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.title;
    list.appendChild(li);
  });

  popup.style.display = "flex";
}
