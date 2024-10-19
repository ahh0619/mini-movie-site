const mainBody = document.querySelector("body");

function scrollDisable() {
  mainBody.classList.add("scroll_disable");
}

function scrollAble() {
  mainBody.classList.remove("scroll_disable");
}
