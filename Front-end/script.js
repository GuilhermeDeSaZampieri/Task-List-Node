const finishButtons = document.querySelectorAll(".tasks ul li button");

finishButtons.forEach((button) => {
  button.addEventListener("click", finishTask);
});

function finishTask(event) {
  const li = event.target.parentElement;
  li.classList.toggle("done");

  if (li.classList.contains("done")) {
    event.target.innerText = "Desfazer";
  } else {
    event.target.innerText = "Finalizar";
  }
}

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); //tira o reload da pagina

  const input = document.querySelector("input");
  const taskText = input.value;

  if (taskText === "") {
    return;
  }

  const existingTasks = document.querySelectorAll(".tasks ul li span");
  existingTasks.forEach((span) => {
    if (span.innerText.toLowerCase() === taskText.toLowerCase()) {
      alert("Já foi informada uma atividade com esse título");
      taskText = "";
    }
  });

  const button = document.createElement("button");
  button.classList.add("btn");
  button.addEventListener("click", finishTask);
  button.innerText = "Finalizar";

  const li = document.createElement("li");
  li.innerHTML = "<span>" + taskText + "</span>";
  li.appendChild(button);

  const ul = document.querySelector(".tasks ul");
  ul.appendChild(li);
});
