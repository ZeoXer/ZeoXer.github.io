import axios from "axios";
import Swal from "sweetalert2";
import view from "./view";

type showState = "all" | "completed" | "not_completed";

class TodoListAPI {
  public nickname: string = "";

  constructor(private url: string) {}

  regist(email: string, pwd: string, nickname: string): void {
    axios
      .post(`${this.url}/users`, {
        user: {
          email: email,
          nickname: nickname,
          password: pwd,
        },
      })
      .then((response: any) => {
        Swal.fire({
          title: response.data.message,
          text: `歡迎！${response.data.nickname}`,
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            view.showLogin();
          }
        });
      })
      .catch((error: any) => {
        Swal.fire({
          title: error.response.data.message,
          text: error.response.data.error[0],
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  login(email: string, pwd: string): void {
    axios
      .post(`${this.url}/users/sign_in`, {
        user: {
          email: email,
          password: pwd,
        },
      })
      .then((response: any) => {
        axios.defaults.headers.common["Authorization"] =
          response.headers.authorization;
        this.nickname = response.data.nickname;
        Swal.fire({
          title: response.data.message,
          text: `哈囉！${this.nickname}`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .then(() => {
        this.getTodos("all");
        view.showTodo(this.nickname);
      })
      .catch((error: any) => {
        console.log(error.response);
        Swal.fire({
          title: error.response.data.message,
          icon: "error",
          showConfirmButton: false,
          timer: 1000,
        });
      });
  }

  logout(): void {
    axios
      .delete(`${this.url}/users/sign_out`)
      .then((response) => {
        axios.defaults.headers.common["Authorization"] = "";
        Swal.fire({
          title: response.data.message,
          icon: "info",
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .then(() => view.showLogin())
      .catch((error) => console.log(error.response));
  }
  getTodos(state: showState): void {
    axios
      .get(`${this.url}/todos`)
      .then((response) => {
        view.showTodoItems(response.data.todos, state);
      })
      .catch((error) => console.log(error.response));
  }

  addTodo(message: string): void {
    axios
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

  editTodo(id: string): void {
    Swal.fire({
      title: "請輸入更動事項內容",
      icon: "info",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "修改",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
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

  toggleTodo(id: string): void {
    axios
      .patch(`${this.url}/todos/${id}/toggle`, {})
      .then(() => {
        this.getTodos("all");
      })
      .catch((error) => console.log(error.response));
  }
  
  deleteTodo(id: string): void {
    axios
      .delete(`${this.url}/todos/${id}`)
      .then(() => this.getTodos("all"))
      .catch((error) => console.log(error.response));
  }
}

export default TodoListAPI;
