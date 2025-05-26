const tbody = document.querySelector(".tasks-container");

const addForm = document.querySelector(".create-task-form");
const inputTask = document.querySelector("#task-input");

const fetchTasks = async () => {
  const res = await fetch("http://localhost:3333/tasks");
  const data = await res.json();
  return data.tasks;
};

const addtask = async (event) => {
  event.preventDefault();

  const task = { title: inputTask.value };

  await fetch("http://localhost:3333/tasks", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  loadTasks();
  inputTask.value = "";
};

const deleteTask = async (id) => {
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: "delete",
  });

  loadTasks();
};

const updateTask = async ({ id, title, status }) => {
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, status }),
  });

  loadTasks();
};

const formatDate = (dateUTC) => {
  const options = { dateStyle: "long", timeStyle: "short" };
  const date = new Date(dateUTC).toLocaleString("pt-br", options);
  return date;
};

const createElement = (tag, innerText = "", innerHTML = "") => {
  const element = document.createElement(tag);

  if (innerText) {
    element.innerText = innerText;
  }

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
};

const createSelect = (value) => {
  const options = `<option value="pendente">pendente</option>
    <option value="em andamento">em andamento</option>
    <option value="concluida">concluida</option>`;

  const select = createElement("select", "", options);
  select.value = value;
  return select;
};

const createRow = (task) => {
  const { id, title } = task;

  const div = createElement("div");
  const tdTitle = createElement("h2", title);
  const divActions = createElement("div");

  const editButton = createElement(
    "button",
    "",
    '<span class="material-symbols-outlined"> edit </span>'
  );

  const infoButton = createElement(
    "button",
    "",
    '<span class="material-symbols-outlined"> priority_high </span>'
  );

  const deletebutton = createElement(
    "button",
    "",
    '<span class="material-symbols-outlined"> delete </span>'
  );

  div.classList.add("task");
  divActions.classList.add("actions");
  infoButton.classList.add("action-btn", "info-btn");
  editButton.classList.add("action-btn", "edit-btn");
  deletebutton.classList.add("action-btn", "delete-btn");

  deletebutton.addEventListener("click", () => deleteTask(id));

  editButton.addEventListener("click", () => {
    console.log("Editar task:", id);
  });

  infoButton.addEventListener('click', () => {
    openModal(task); 
  });

  divActions.appendChild(infoButton);
  divActions.appendChild(editButton);
  divActions.appendChild(deletebutton);
  
  div.appendChild(tdTitle);
  div.appendChild(divActions);

  console.log(id);
  return div;
};

const loadTasks = async () => {
 try {
    const tasks = await fetchTasks();
    console.log("Dados recebidos:", tasks);

    tbody.innerHTML = "";

    tasks.forEach((task) => {
      const tr = createRow(task);
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error("Erro ao carregar tasks:", error);
  }
};

addForm.addEventListener("submit", addtask);
loadTasks();

//MODAL INFO;

function openModal(task) {
  document.getElementById("infoModal").style.display = "flex";
  document.body.style.overflow = "hidden";

  document.getElementById("modal-task-title").textContent = `Título: ${task.title}`;
  document.getElementById("modal-task-status").textContent = `Status: ${task.status ?? "pendente"}`;
  document.getElementById("modal-task-date").textContent = `Criada em: ${formatDate(task.created_at ?? new Date())}`;
}

// Função para fechar o modal
function closeModal() {
  document.getElementById("infoModal").style.display = "none";
  document.body.style.overflow = "auto";
}

window.addEventListener("click", function (event) {
  const modal = document.getElementById("infoModal");
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeModal();
});

document.querySelector(".close").addEventListener("click", closeModal);



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
