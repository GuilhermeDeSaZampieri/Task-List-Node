export function toastSucess(text) {
  Toastify({
    text: `Tarefa ${text} com sucesso!`,
    duration: 3000,
    stopOnFocus: true,
    avatar: "https://img.icons8.com/?size=100&id=63312&format=png&color=000000",
    className: "toast-sucess",
  }).showToast();
}

export function toastError(error) {
  Toastify({
    text: error.message,
    duration: 3000,
    className: "toast-error",
    avatar:
      "https://img.icons8.com/?size=100&id=Au1txlUciLVz&format=png&color=000000",
    stopOnFocus: true,
  }).showToast();
}
