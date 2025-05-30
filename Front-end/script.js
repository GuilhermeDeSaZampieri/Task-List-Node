import { fetchTasks, deleteTask, addTask, updateTask } from "./api/tasks.js";
import {toastSucess, toastError} from "./components/Toast/toast.js";
import {Menu } from "./components/menu/menu.js";
import {createRow} from "./components/row/row.js";

const tbody = document.querySelector(".tasks-container");
const addForm = document.querySelector(".create-task-form");
const inputTask = document.querySelector("#task-input");

const handleAddTask = async (event) => {
  event.preventDefault();
  try {
    await addTask({ title: inputTask.value });
    loadTasks();
    toastSucess("criada");
    inputTask.value = "";
  } catch (error) {
    toastError(error);
  }
};

export const handleUpdateTask = async ({ id, title, status }) => {
  try {

    await updateTask({id, title, status});
    loadTasks();
    toastSucess("atualizada");

  } catch (error) {
    toastError(error);
  }
};

export const handleDelete  = async (id) => {
  try{
    await deleteTask(id);
    loadTasks();
    toastSucess("deletada");
    closeModal();
  }catch(error){
    toastError(error);
  }
}
window.handleDelete = handleDelete;


 export const loadTasks = async (statusFilter = "") => {
  try {
    const tasks = await fetchTasks();

    tbody.innerHTML = "";

    tasks.forEach((task) => {
      const { status } = task;
      if (statusFilter === "" || status === statusFilter) {
        const tr = createRow(task);
        tbody.appendChild(tr);
      }
    });
  } catch (error) {
    console.error("Erro ao carregar tasks:", error);
  }
};

addForm.addEventListener("submit", handleAddTask);
loadTasks();


document.addEventListener("DOMContentLoaded", () => {
  Menu((newStatus) => {
    console.log("Status alterado para:", newStatus);
    loadTasks(newStatus); 
  });
});
