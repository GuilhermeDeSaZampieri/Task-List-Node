export const formatDate = (dateUTC) => {
  const options = { dateStyle: "long", timeStyle: "short" };
  const date = new Date(dateUTC).toLocaleString("pt-br", options);
  return date;
};

export const createElement = (tag, innerText = "", innerHTML = "") => {
  const element = document.createElement(tag);

  if (innerText) {
    element.innerText = innerText;
  }

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
};

export const createSelect = (value) => {
  const options = `<option value="pendente">pendente</option>
    <option value="em andamento">em andamento</option>
    <option value="concluida">concluida</option>`;

  const select = createElement("select", "", options);
  select.value = value;
  return select;
};
