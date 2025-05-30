import {formatDate, createSelect} from "../../util/domHelpers.js";
import {handleUpdateTask,handleDelete} from "../../script.js";

export function openModal(tipo, task) {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");

  modalContent.innerHTML = "";

  if (tipo == 0) {
    modalContent.innerHTML = `
      <h2 class="style-title">Informações da tarefa</h2>
      <span class="close">X</span>
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
        handleUpdateTask({ id: task.id, title, status });
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
window.closeModal = closeModal;


window.addEventListener("click", function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeModal();
});

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) =>{
    if(e.target.classList.contains('close')){
      closeModal();
    }
  });
});
