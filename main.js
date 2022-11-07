const todoObjectList = [];

class Todo_Class {
  constructor(item) {
    this.ulElement = item;
  }

  add() {
    const todoInput = document.querySelector("#myInput").value;
    if (todoInput == "") {
      alert("Add task...");
    } else {
      const todoObject = {
        id: todoObjectList.length,
        todoText: todoInput,
        isDone: false,
      };

      todoObjectList.unshift(todoObject);
      this.display();
      document.querySelector("#myInput").value = "";
    }
  }

  deleteElement(z) {
    const selectedDelIndex = todoObjectList.findIndex((item) => item.id == z);

    todoObjectList.splice(selectedDelIndex, 1);

    this.display();
  }

  display() {
    this.ulElement.innerHTML = "";

    todoObjectList.forEach((object_item) => {
      const liElement = document.createElement("li");
      const delBtn = document.createElement("i");
      const editBtn = document.createElement("i");
      const checked = document.createElement("div");
      const unChecked = document.createElement("div");

      liElement.innerText = object_item.todoText;
      liElement.setAttribute("data-id", object_item.id);

      delBtn.setAttribute("data-id", object_item.id);
      delBtn.classList.add("far", "fa-trash-alt");
      delBtn.contentEditable = false;

      editBtn.classList.add("fa-solid", "fa-pen-to-square");
      editBtn.contentEditable = false;

      checked.classList.toggle("check");
      checked.contentEditable = false;

      unChecked.classList.toggle("uncheck");
      unChecked.contentEditable = false;

      liElement.append(unChecked, editBtn, delBtn);

      // Event Listeners

      liElement.addEventListener("click", function () {
        if (liElement) {
          liElement.append(checked);
        }
      });

      delBtn.addEventListener("click", function (e) {
        const deleteId = e.target.getAttribute("data-id");
        myTodoList.deleteElement(deleteId);
      });

      editBtn.addEventListener("click", function (e) {
        if (editBtn) {
          liElement.contentEditable = true;
          liElement.focus();
          document.execCommand("selectAll", false, null);
          document.getSelection().collapseToStart();
        }
      });

      this.ulElement.appendChild(liElement);
    });
  }
}

////-----MAIN PROGRAM------------
const listSection = document.querySelector("#myUL");

myTodoList = new Todo_Class(listSection);

document.querySelector(".addBtn").addEventListener("click", function () {
  myTodoList.add();
});

document.querySelector("#myInput").addEventListener("keydown", function (e) {
  if (e.keyCode == 13) {
    myTodoList.add();
  }
});
