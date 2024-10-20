const mainBody = document.querySelector("body");
const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

function scrollDisable() {
  mainBody.style.overflow = "hidden";
  mainBody.style.paddingRight = `${scrollBarWidth}px`;
}

function scrollAble() {
  mainBody.style.overflow = "";
  mainBody.style.paddingRight = "";
}
