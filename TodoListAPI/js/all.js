"use strict";
// 通用元素
const turn_to_regist = document.getElementById("turn-to-regist");
const turn_to_login = document.getElementById("turn-to-login");
const login = document.getElementById("login");
const regist = document.getElementById("regist");
const login_email = document.getElementById("login-email");
const login_pwd = document.getElementById("login-pwd");
const regist_email = document.getElementById("regist-email");
const regist_pwd = document.getElementById("regist-pwd");
const regist_nickname = document.getElementById("regist-nickname");
const regist_pwdRepeat = document.getElementById("regist-pwdRepeat");
const login_btn = document.getElementById("login-btn");
const regist_btn = document.getElementById("regist-btn");
const login_email_warning = document.getElementById("login-email-warning");
const login_pwd_warning = document.getElementById("login-pwd-warning");
const regist_email_warning = document.getElementById("regist-email-warning");
const regist_pwd_warning = document.getElementById("regist-pwd-warning");
const regist_nickname_warning = document.getElementById("regist-nickname-warning");
const regist_pwdRepeat_warning = document.getElementById("regist-pwdRepeat-warning");
// 切換註冊登入頁面
turn_to_login.addEventListener("click", (e) => {
    e.preventDefault();
    regist.style.display = "none";
    login.style.display = "flex";
    regist_email.value = "";
    regist_pwd.value = "";
    regist_nickname.value = "";
    regist_pwdRepeat.value = "";
});
turn_to_regist.addEventListener("click", (e) => {
    e.preventDefault();
    login.style.display = "none";
    regist.style.display = "flex";
    login_email.value = "";
    login_pwd.value = "";
});
// 登入
function formatCheck(email, pwd, email_warning, pwd_warning, isRegist = 0) {
    let returnBool = false;
    const email_format = /.+@.+/;
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
    if (isRegist) {
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
login_btn.addEventListener("click", (e) => {
    e.preventDefault();
    let isReturn = formatCheck(login_email, login_pwd, login_email_warning, login_pwd_warning, 0);
    if (isReturn)
        return;
});
// 註冊
regist_btn.addEventListener("click", (e) => {
    e.preventDefault();
    let isReturn = formatCheck(regist_email, regist_pwd, regist_email_warning, regist_pwd_warning, 1);
    if (isReturn)
        return;
});
