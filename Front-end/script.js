const fetchTasks = async () => {
  const res = await fetch("http://localhost:3333/tasks/get");
  return res.json();
};

const createElement = (tag, innerText = "") => {
  const element = document.createElement(tag);
  element.innerText = innerText;
  return element;
};

const createRow = (task) => {
  const { id, title, created_at, status } = task;
  const tr = createElement("tr");
  const tdTitle = createElement("td", "Titulo da task");
};

// const finishButtons = document.querySelectorAll(".tasks ul li button");

// finishButtons.forEach((button) => {
//   button.addEventListener("click", finishTask);
// });

// function finishTask(event) {
//   const li = event.target.parentElement.parentElement;
//   li.classList.toggle("done");

//   if (li.classList.contains("done")) {
//     event.target.innerText = "Desfazer";
//   } else {
//     event.target.innerText = "Finalizar";
//   }
// }

// function removeTask(event) {
//   const li = event.target.parentElement.parentElement;
//   const ul = li.parentElement;
//   ul.removeChild(li);
// }

// const form = document.querySelector("form");

// form.addEventListener("submit", (event) => {
//   event.preventDefault(); //tira o reload da pagina

//   const input = document.querySelector("input");
//   const taskText = input.value;

//   if (taskText === "") {
//     alert("Escreva alguma coisa");
//     return;
//   }

//   const existingTasks = document.querySelectorAll(".tasks ul li span");
//   existingTasks.forEach((span) => {
//     if (span.innerText.toLowerCase() === taskText.toLowerCase()) {
//       alert("Já foi informada uma atividade com esse título");
//       taskText = "";
//     }
//   });

//   const buttonFinish = document.createElement("button");
//   buttonFinish.classList.add("btn");
//   buttonFinish.innerText = "Finalizar";
//   buttonFinish.addEventListener("click", finishTask);

//   const buttonDelete = document.createElement("button");
//   buttonDelete.classList.add("btn");
//   buttonDelete.addEventListener("click", removeTask);
//   buttonDelete.innerText = "Excluir";

//   const li = document.createElement("li");
//   li.innerHTML = "<span>" + taskText + "</span>";

//   const buttonBox = document.createElement("div");
//   buttonBox.classList.add("btn-box");
//   buttonBox.appendChild(buttonFinish);
//   buttonBox.appendChild(buttonDelete);
//   li.appendChild(buttonBox);

//   const ul = document.querySelector(".tasks ul");
//   ul.prepend(li); //adiciona arquivos ao mais recente
// });
