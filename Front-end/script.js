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

  deletebutton.addEventListener("click", () => openModal(2, task));

  editButton.addEventListener("click", () => {
    openModal(1, task);
  });

  infoButton.addEventListener("click", () => {
    openModal(0, task);
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

function handleDelete(id) {
  deleteTask(id);
  closeModal();
}

function openModal(tipo, task) {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");

  modalContent.innerHTML = "";

  if (tipo == 0) {
    modalContent.innerHTML = `
      <h2 class="style-title">Informações da tarefa</h2>
      <span class="close" onclick="closeModal()">X</span>
      <p class="style-p">Título: ${task.title}</p>
      <p class="style-p">Status: ${task.status}</p>
      <p class="style-p">Data: ${formatDate(task.created_at)}</p>
    `;
  } else if (tipo == 1) {
    modalContent.innerHTML = `
      <h2 class="style-title">Editar tarefa</h2>      
      <form id="updateTaskForm">
        <div class="form-group">
          <label class="style-label" for="taskTitle">Título:</label>
          <input type="text" id="taskTitleInput" value="${task.title}" required>
        </div>
        <div class="form-group">
          <label class="style-label" for="taskStatus">Status:</label>
          <div id="selectContainer"></div>
        </div>
        <div class="form-actions">
          <button type="submit" class="updateModelButton">Atualizar</button>
          <button type="button" class="cancelModelButton" onclick="closeModal()">Cancelar</button>
        </div>
      </form>
    `;
    const selectContainer = document.getElementById("selectContainer");
    const statusSelect = createSelect(task.status);
    statusSelect.id = "taskStatus";
    statusSelect.setAttribute("required", "");
    selectContainer.appendChild(statusSelect);

    document
      .getElementById("updateTaskForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const title = document.getElementById("taskTitleInput").value;
        const status = document.getElementById("taskStatus").value;
        updateTask({ id: task.id, title, status });
        closeModal();
      });

  } else if (tipo == 2) {
    modalContent.innerHTML = `
      <h2 class="style-title">Deletar tarefa</h2>      
      <p class="style-p">Tem certeza que deseja deletar a tarefa "<strong>${task.title}</strong>"?</p>
      <p class="style-p">Esta ação não pode ser desfeita.</p>
      <div class="form-actions">
        <button type="button"  class="deleteModelButton" cancelModelButton onclick="handleDelete(${task.id})" class="delete-btn">Deletar</button>
        <button type="button" class="cancelModelButton" onclick="closeModal()">Cancelar</button>
      </div>`;
  }

  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.body.style.overflow = "auto";
}

window.addEventListener("click", function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeModal();
});

document.querySelector("close").addEventListener("click", closeModal);
