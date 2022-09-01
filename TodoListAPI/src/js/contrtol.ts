import TodoListAPI from "./TodoListAPI";
import view from "./view";
import Swal from "sweetalert2";

const todoAPI = new TodoListAPI("https://todoo.5xcamp.us");

enum formatCheckMode {
  "login",
  "regist",
}

// DOM
const turn_to_regist = document.getElementById("turn-to-regist")!;
const turn_to_login = document.getElementById("turn-to-login")!;
const login_btn = document.getElementById("login-btn")!;
const regist_btn = document.getElementById("regist-btn")!;
const logout_btn = document.getElementById("logout-btn")!;
const login_email = document.getElementById("login-email")! as HTMLInputElement;
const login_pwd = document.getElementById("login-pwd")! as HTMLInputElement;
const regist_email = document.getElementById(
  "regist-email"
)! as HTMLInputElement;
const regist_pwd = document.getElementById("regist-pwd")! as HTMLInputElement;
const regist_nickname = document.getElementById(
  "regist-nickname"
)! as HTMLInputElement;
const add_btn = document.getElementById("add-button")!;
const new_item = document.getElementById("new-item")! as HTMLInputElement;
const item_list = document.getElementById("item-list")!;
const item_category = document.getElementById("item-category")!;
const clear_all_completed = document.getElementById("clear-all-finished")!;

// 註冊登入切換
turn_to_login.addEventListener("click", (e) => {
  e.preventDefault();
  view.showLogin();
});

turn_to_regist.addEventListener("click", (e) => {
  e.preventDefault();
  view.showRegist();
});

// 登入
login_btn.addEventListener("click", (e) => {
  e.preventDefault();
  let isFormatIncorrect = view.formatCheck(formatCheckMode.login);
  if (isFormatIncorrect) return;
  todoAPI.login(login_email.value, login_pwd.value);
});

// 註冊
regist_btn.addEventListener("click", (e) => {
  e.preventDefault();
  let isFormatIncorrect = view.formatCheck(formatCheckMode.regist);
  if (isFormatIncorrect) return;
  todoAPI.regist(regist_email.value, regist_pwd.value, regist_nickname.value);
});

// 登出
logout_btn.addEventListener("click", (e) => {
  e.preventDefault();
  todoAPI.logout();
});

// 新增事項
add_btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (new_item.value === "") {
    Swal.fire({
      title: "請輸入待辦事項內容！",
      icon: "warning",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }
  todoAPI.addTodo(new_item.value);
  new_item.value = "";
});

// 勾選、編輯、刪除事項
item_list.addEventListener("click", (e) => {
  if (e.target instanceof Element) {
    let id_pos = e.target.closest("li");
    let id = "";
    if (id_pos instanceof Element) {
      let check_id = id_pos.getAttribute("data-id");
      if (typeof check_id === "string") id = check_id;
    }

    if (e.target.nodeName === "I") {
      if (e.target.getAttribute("class") === "fa-solid fa-pen") {
        todoAPI.editTodo(id);
      } else if (e.target.getAttribute("class") === "fa-solid fa-trash-can") {
        todoAPI.deleteTodo(id);
      }
    } else if (e.target.nodeName === "INPUT") {
      todoAPI.toggleTodo(id);
    }
  }
});

// 刪除全部事項
clear_all_completed.addEventListener("click", (e) => {
  e.preventDefault();
  let promises: any[] = [];
  item_list.childNodes.forEach((ele) => {
    if (ele instanceof Element) {
      if (ele.getAttribute("data-state") === "completed") {
        let id = ele.getAttribute("data-id");
        if (typeof id === "string") {
          promises.push(todoAPI.deleteTodo(id));
        }
      }
    }
  });
  Promise.all(promises).catch((error) => console.log(error.response));
});

// 切換分類
item_category.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target instanceof Element) {
    if (e.target.nodeName === "A") {
      switch (e.target.textContent) {
        case "全部":
          todoAPI.getTodos("all");
          break;
        case "待完成":
          todoAPI.getTodos("not_completed");
          break;
        case "已完成":
          todoAPI.getTodos("completed");
          break;
      }
    }
  }
});
