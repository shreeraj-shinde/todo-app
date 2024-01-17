import "./style.css";

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Array<Todo> = [];

const todoContainer = document.querySelector(".todo-container") as HTMLElement;

const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;

const myForm = document.getElementById("myform") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 100),
  };
  todos.push(todo);
  todoInput.value = "";
  renderTodo(todos);
};

const generateTodoItem = (title: string, id: string, isCompleted: boolean) => {
  const todo = `<div class="todo">
  <div class = "title">
    <input type="checkbox" value="${isCompleted}"/>
     <p>${title}</p>
    </div>
    <button id="delete">Delete</button>
  </div>`;
  const btn = document.getElementById("delete") as HTMLButtonElement;
  btn.onclick = () => {
    DeleteTodo(id);
  };

  todoContainer.append(btn);
};

const DeleteTodo = (id: string) => {
  const idx = todos.findIndex((todo) => todo.id === id);
  todos.splice(idx, 1);
  renderTodo(todos);
};

const renderTodo = (todos: Todo[]) => {
  todoContainer.innerText = "";
  if (!todos) return "No todos yet";
  todos.map((todo) => generateTodoItem(todo.title, todo.id, todo.isCompleted));
};
