const list = document.querySelector(".inner");
const todo = document.querySelector(".todo");
const enter = document.querySelector(".enter");
let todoList = [];

function render() {
  let todoContent = "";

  if (todoList.length === 0) {
    todoContent = `<h2>無待辦事項</h2>`;
  } else {
    todoList.forEach((item, index) => {
      todoContent += `<li><input type="checkbox" ${item.checked}/><span class="${item.checked}">${item.content}</span><i class="fa-regular fa-x" data-num = ${index}></i></li>`;
    });
  }

  list.innerHTML = todoContent;
  todo.value = "";
}

// add

enter.addEventListener("click", (e) => {
  if (!todo.value) return;
  const obj = {};
  obj.content = todo.value;
  obj.checked = "";

  todoList.push(obj);
  render();
  todo.focus();
  list.scrollTop = list.scrollHeight;
});

todo.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    enter.click();
  }
});

// delete

list.addEventListener("click", (e) => {
  if (!e.target.classList.contains("fa-x")) return;
  let target = e.target.getAttribute("data-num");

  todoList.splice(target, 1);
  render();
});

// effect

list.addEventListener("click", (e) => {
  if (e.target.getAttribute("type") !== "checkbox") return;
  const todoItem = e.target.parentNode;

  const todoItemIndex = todoItem.childNodes[2].getAttribute("data-num");
  const item = todoList[todoItemIndex];

  if (!item.checked) {
    item.checked = "checked";
  } else {
    item.checked = "";
  }

  render();
});

render();
