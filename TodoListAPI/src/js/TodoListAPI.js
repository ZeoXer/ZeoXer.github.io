"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const view_js_1 = __importDefault(require("./view.js"));
class TodoListAPI {
    constructor(url) {
        this.url = url;
        this.nickname = "";
    }
    regist(email, pwd, nickname) {
        axios_1.default
            .post(`${this.url}/users`, {
            user: {
                email: email,
                nickname: nickname,
                password: pwd,
            },
        })
            .then((response) => {
            sweetalert2_1.default.fire({
                title: response.data.message,
                text: `歡迎！${response.data.nickname}`,
                icon: "success",
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                    view_js_1.default.showLogin();
                }
            });
        })
            .catch((error) => {
            sweetalert2_1.default.fire({
                title: error.response.data.message,
                text: error.response.data.error[0],
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
            });
        });
    }
    login(email, pwd) {
        axios_1.default
            .post(`${this.url}/users/sign_in`, {
            user: {
                email: email,
                password: pwd,
            },
        })
            .then((response) => {
            axios_1.default.defaults.headers.common["Authorization"] =
                response.headers.authorization;
            this.nickname = response.data.nickname;
            sweetalert2_1.default.fire({
                title: response.data.message,
                text: `哈囉！${this.nickname}`,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
        })
            .then(() => {
            this.getTodos("all");
            view_js_1.default.showTodo(this.nickname);
        })
            .catch((error) => {
            console.log(error.response);
            sweetalert2_1.default.fire({
                title: error.response.data.message,
                icon: "error",
                showConfirmButton: false,
                timer: 1000,
            });
        });
    }
    logout() {
        axios_1.default
            .delete(`${this.url}/users/sign_out`)
            .then((response) => {
            axios_1.default.defaults.headers.common["Authorization"] = "";
            sweetalert2_1.default.fire({
                title: response.data.message,
                icon: "info",
                showConfirmButton: false,
                timer: 1000,
            });
        })
            .then(() => view_js_1.default.showLogin())
            .catch((error) => console.log(error.response));
    }
    getTodos(state) {
        axios_1.default
            .get(`${this.url}/todos`)
            .then((response) => {
            view_js_1.default.showTodoItems(response.data.todos, state);
        })
            .catch((error) => console.log(error.response));
    }
    addTodo(message) {
        axios_1.default
            .post(`${this.url}/todos`, {
            todo: {
                content: message,
            },
        })
            .then(() => {
            this.getTodos("all");
        })
            .catch((error) => console.log(error.response));
    }
    editTodo(id) {
        sweetalert2_1.default.fire({
            title: "請輸入更動事項內容",
            icon: "info",
            input: "text",
            showCancelButton: true,
            confirmButtonText: "修改",
            cancelButtonText: "取消",
        }).then((result) => {
            if (result.isConfirmed) {
                axios_1.default
                    .put(`${this.url}/todos/${id}`, {
                    todo: {
                        content: result.value,
                    },
                })
                    .then(() => {
                    this.getTodos("all");
                })
                    .catch((error) => console.log(error.response));
            }
        });
    }
    toggleTodo(id) {
        axios_1.default
            .patch(`${this.url}/todos/${id}/toggle`, {})
            .then(() => {
            this.getTodos("all");
        })
            .catch((error) => console.log(error.response));
    }
    deleteTodo(id) {
        axios_1.default
            .delete(`${this.url}/todos/${id}`)
            .then(() => this.getTodos("all"))
            .catch((error) => console.log(error.response));
    }
}
exports.default = TodoListAPI;
