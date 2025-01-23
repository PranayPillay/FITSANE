
const burgerMenu = document.getElementById('burgerMenu');
const menuOptions = document.getElementById('menuOptions');

burgerMenu.addEventListener('click', () => {
  menuOptions.classList.toggle('show');
});
