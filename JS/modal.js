const mainBody = document.querySelector("body");
const modalWindow = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".close_btn");
const modalMovieTitle = document.querySelector(".modal_info_title");
const modalMovieComment = document.querySelector(".modal_info_comment");
const modalMovieDate = document.querySelector(".modal_info_date");
const modalMovieRating = document.querySelector(".modal_info_rating");
const modalMovieImgItem = document.querySelector(".modal_img_item");

function modalRenderMovies(movie) {
  modalMovieTitle.innerHTML = movie.title;
  modalMovieTitle.setAttribute("data-id", movie.id);
  modalMovieComment.innerHTML = movie.overview;
  modalMovieDate.innerHTML = movie.release_date;
  modalMovieRating.innerHTML = movie.vote_average;
  modalMovieImgItem.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  mainBody.style.overflow = "hidden";
  updateBookmarkButtons(movie.id);
}

function modalClose() {
  modalWindow.style.display = "none";
}

modalCloseBtn.addEventListener("click", () => {
  mainBody.style.overflow = "";
  modalClose();
});

window.addEventListener("click", (event) => {
  if (event.target === modalWindow) {
    modalClose();
  }
});
