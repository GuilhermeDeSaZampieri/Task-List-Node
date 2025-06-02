import { createElement} from "../../util/domHelpers.js";
import {openModal} from "../../components/modal/modal.js";
export const createRow = (task) => {
  const { id, title } = task;

  const div = createElement("div");
  const tdTitle = createElement("h2", title);
  const divActions = createElement("div");

  const editButton = createElement(
    "button",
    "",
    '<span class="material-symbols-outlined" id="icon"> edit </span>'
  );

  const infoButton = createElement(
    "button",
    "",
    '<span class="material-symbols-outlined" id="icon"> priority_high </span>'
  );

  const deletebutton = createElement(
    "button",
    "",
    '<span class="material-symbols-outlined" id="icon"> delete </span>'
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

  return div;
};
