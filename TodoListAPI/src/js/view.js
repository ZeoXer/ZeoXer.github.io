"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// DOM
const login = document.getElementById("login");
const regist = document.getElementById("regist");
const todo = document.getElementById("todo");
const login_email = document.getElementById("login-email");
const login_pwd = document.getElementById("login-pwd");
const regist_email = document.getElementById("regist-email");
const regist_pwd = document.getElementById("regist-pwd");
const regist_nickname = document.getElementById("regist-nickname");
const regist_pwdRepeat = document.getElementById("regist-pwdRepeat");
const login_email_warning = document.getElementById("login-email-warning");
const login_pwd_warning = document.getElementById("login-pwd-warning");
const regist_email_warning = document.getElementById("regist-email-warning");
const regist_pwd_warning = document.getElementById("regist-pwd-warning");
const regist_nickname_warning = document.getElementById("regist-nickname-warning");
const regist_pwdRepeat_warning = document.getElementById("regist-pwdRepeat-warning");
const nickname_show = document.querySelector(".nav-info h2 span");
const no_item_region = document.getElementById("no-item-region");
const item_region = document.getElementById("item-region");
const item_list = document.getElementById("item-list");
const item_num = document.querySelector("#num-info span");
const category_all = document.getElementById("category-all");
const category_not_completed = document.getElementById("category-not-completed");
const category_completed = document.getElementById("category-completed");
let all_count = 0;
let not_completed_count = 0;
// 頁面切換
function showLogin() {
    regist.style.display = "none";
    todo.style.display = "none";
    login.style.display = "";
    regist_email.value = "";
    regist_pwd.value = "";
    regist_nickname.value = "";
    regist_pwdRepeat.value = "";
}
function showRegist() {
    login.style.display = "none";
    regist.style.display = "";
    login_email.value = "";
    login_pwd.value = "";
}
function showTodo(nickname) {
    login.style.display = "none";
    todo.style.display = "";
    login_email.value = "";
    login_pwd.value = "";
    nickname_show.textContent = nickname;
}
// 輸入格式檢查
function formatCheck(mode) {
    let returnBool = false;
    const email_format = /.+@(.+\.)+.+/;
    let email = login_email;
    let pwd = login_pwd;
    let email_warning = login_email_warning;
    let pwd_warning = login_pwd_warning;
    if (mode === 1) {
        email = regist_email;
        pwd = regist_pwd;
        email_warning = regist_email_warning;
        pwd_warning = regist_pwd_warning;
    }
    if (email.value === "") {
        returnBool = true;
        email_warning.textContent = "Email 不可為空";
        cleanWord(email_warning);
    }
    else if (!email.value.match(email_format)) {
        returnBool = true;
        email_warning.textContent = "Email 格式有誤";
        cleanWord(email_warning);
    }
    if (pwd.value === "") {
        returnBool = true;
        pwd_warning.textContent = "密碼不可為空";
        cleanWord(pwd_warning);
    }
    else if (pwd.value.length < 6) {
        returnBool = true;
        pwd_warning.textContent = "密碼須大於 6 碼";
        cleanWord(pwd_warning);
    }
    if (mode === 1) {
        if (regist_nickname.value === "") {
            returnBool = true;
            regist_nickname_warning.textContent = "暱稱不可為空";
            cleanWord(regist_nickname_warning);
        }
        if (regist_pwdRepeat.value != pwd.value) {
            returnBool = true;
            regist_pwdRepeat_warning.textContent = "確認密碼有誤";
            cleanWord(regist_pwdRepeat_warning);
        }
    }
    return returnBool;
}
function cleanWord(target) {
    setTimeout(() => {
        target.textContent = "";
    }, 1000);
}
// 版面檢查
function hideList() {
    if (all_count > 0) {
        item_region.setAttribute("class", "item-region item-region-working");
        no_item_region.style.display = "none";
    }
    else {
        item_region.setAttribute("class", "item-region");
        no_item_region.style.display = "block";
    }
}
function setNumber() {
    item_num.textContent = `${not_completed_count}`;
}
function showTodoItems(data, state) {
    let completed_str = "";
    let not_completed_str = "";
    all_count = 0;
    not_completed_count = 0;
    data.forEach((ele) => {
        if (ele.completed_at === null) {
            not_completed_str += `<li data-id="${ele.id}" data-state="not-completed">
      <label>
        <input type="checkbox" />
        <span>${ele.content}</span>
      </label>
      <a href="#" class="modify-item"><i class="fa-solid fa-pen"></i></a>
      <a href="#" class="modify-item"><i class="fa-solid fa-trash-can"></i></a>
    </li>`;
            not_completed_count++;
        }
        else {
            completed_str += `<li data-id="${ele.id}" data-state="completed">
      <label>
        <input type="checkbox" checked/>
        <span>${ele.content}</span>
      </label>
      <a href="#" class="modify-item" id="edit-item"><i class="fa-solid fa-pen"></i></a>
      <a href="#" class="modify-item" id="delete-item"><i class="fa-solid fa-trash-can"></i></a>
    </li>`;
        }
        all_count++;
    });
    if (state === "all") {
        item_list.innerHTML = not_completed_str + completed_str;
    }
    else if (state === "completed") {
        item_list.innerHTML = completed_str;
    }
    else if (state === "not_completed") {
        item_list.innerHTML = not_completed_str;
    }
    switch_category(state);
    hideList();
    setNumber();
}
// 切換分類
function switch_category(state) {
    category_all.setAttribute("class", "category-option");
    category_not_completed.setAttribute("class", "category-option");
    category_completed.setAttribute("class", "category-option");
    switch (state) {
        case "all":
            category_all.setAttribute("class", "category-option active");
            break;
        case "not_completed":
            category_not_completed.setAttribute("class", "category-option active");
            break;
        case "completed":
            category_completed.setAttribute("class", "category-option active");
            break;
    }
}
const view = {
    showLogin: showLogin,
    showRegist: showRegist,
    showTodo: showTodo,
    formatCheck: formatCheck,
    cleanWord: cleanWord,
    showTodoItems: showTodoItems,
};
exports.default = view;
// forEach ele.content / ele.completed_at / ele.id
