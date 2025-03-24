import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyBL2ZwM51v1S56vKFPJWMNi0hkB7Icd-yg",
  authDomain: "addtocart-c285c.firebaseapp.com",
  databaseURL:
    "https://addtocart-c285c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "addtocart-c285c",
  storageBucket: "addtocart-c285c.firebasestorage.app",
  messagingSenderId: "1046405764960",
  appId: "1:1046405764960:web:e54571a7669ca6cc85b005",
};
const appendItemToList = (item) => {
  let listEl = document.createElement("li");
  listEl.textContent = item[1];
  shoppingList.appendChild(listEl);
  listEl.addEventListener("click", () => {
    console.log(item[0]);
    let removedItem = ref(db, `items/${item[0]}`);
    remove(removedItem);
  });
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const itemsInDB = ref(db, "items");
const inputFieldEl = document.getElementById("input-field");
const addButton = document.getElementById("addButton");
const shoppingList = document.getElementById("shopping-list");

onValue(itemsInDB, function (snapshot) {
  if (snapshot.exists()) {
    let allItems = Object.entries(snapshot.val());
    shoppingList.innerHTML = null;
    allItems.map((item) => appendItemToList(item));
  } else {
    shoppingList.innerHTML = null;
    let emptyMessage = document.createElement("p");
    emptyMessage.textContent = "The list is empty.";
    shoppingList.appendChild(emptyMessage);
  }
});
addButton.addEventListener("click", () => {
  const item = inputFieldEl.value;
  inputFieldEl.value = "";
  if (item) {
    push(itemsInDB, item);
  }
});



if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered with scope:", registration.scope);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
