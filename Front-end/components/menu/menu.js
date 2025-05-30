let menuOpen = false;
let currentStatus = "";

export const Menu = (onStatusChange) => {
  const arrowButton = document.getElementById("arrow");
  const menu = document.getElementById("menu");
  const menuItems = document.querySelectorAll(".span-status");

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      const isAlreadyActive = item.classList.contains("active");
      menuItems.forEach((i) => i.classList.remove("active"));

      if (!isAlreadyActive) {
        item.classList.add("active");
        currentStatus = item.textContent.toLocaleLowerCase();
      } else {
        currentStatus = "";
      }

      onStatusChange(currentStatus);
    });
  });

  arrowButton.addEventListener("click", () => {
  toggleMenu();
});

    function toggleMenu() {
    if (menuOpen) {
        menu.style.display = "none";
        arrowButton.innerHTML = `<span class="material-symbols-outlined" id="arrow">arrow_back_ios</span>`;
    } else {
        menu.style.display = "flex";
        arrowButton.innerHTML = `<span class="material-symbols-outlined" id="arrow"> arrow_forward_ios </span>`;
    }
    menuOpen = !menuOpen;
    }
};
