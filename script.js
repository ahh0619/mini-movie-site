const MY_API_KEY = "cc24de6758ec32392f5e908a59646216";
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${MY_API_KEY}&language=ko-KR`;

const rootMain = document.querySelector(".main_section");
const searchInput = document.querySelector(".header_input");

const bookmarkViewBtn = document.querySelector(".bookmark_button");
const bookmarkReverseBtn = document.querySelector(".reverse_button");
const bookmarkAddBtn = document.querySelector(".bookmark_addbtn");
const bookmarkRemoveBtn = document.querySelector(".bookmark_removebtn");

const modalWindow = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".close_btn");

const modalMovieTitle = document.querySelector(".modal_info_title");
const modalMovieComment = document.querySelector(".modal_info_comment");
const modalMovieDate = document.querySelector(".modal_info_date");
const modalMovieRating = document.querySelector(".modal_info_rating");
const modalMovieImgItem = document.querySelector(".modal_img_item");

let allMovies = [];
let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

function saveBookmarks() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function addBookmark(movie) {
  if (!bookmarks.some((bookmark) => bookmark.id === movie.id)) {
    bookmarks.push(movie);
    saveBookmarks();
    updateBookmarkButtons(movie.id);
  }
}

function removeBookmark(movieId) {
  bookmarks = bookmarks.filter((bookmark) => bookmark.id !== movieId);
  saveBookmarks();
  updateBookmarkButtons(movieId);
}

function updateBookmarkButtons(movieId) {
  const isBookmarked = bookmarks.some((bookmark) => bookmark.id === movieId);
  if (isBookmarked) {
    bookmarkAddBtn.style.display = "none";
    bookmarkRemoveBtn.style.display = "block";
  } else {
    bookmarkAddBtn.style.display = "block";
    bookmarkRemoveBtn.style.display = "none";
  }
}

function modalRenderMovies(movie) {
  modalMovieTitle.innerHTML = movie.title;
  modalMovieTitle.setAttribute("data-id", movie.id);
  modalMovieComment.innerHTML = movie.overview;
  modalMovieDate.innerHTML = movie.release_date;
  modalMovieRating.innerHTML = movie.vote_average;
  modalMovieImgItem.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  updateBookmarkButtons(movie.id);
}

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    allMovies = data.results;
    renderMovies(allMovies);
  })
  .catch((error) => {
    console.error("데이터를 가져오는 중 오류 발생:", error);
  });

function renderMovies(movies) {
  rootMain.innerHTML = "";
  movies.forEach((movie) => {
    const movieCardId = movie.id;
    const movieTitle = movie.title;
    const movieImage = movie.poster_path;
    const movieAverage = movie.vote_average;
    let createCardHtml = `
    <div class="card" id=${movieCardId}>
      <div class="card_img_box">
        <img
          class="card_img_item"
          src="https://image.tmdb.org/t/p/w500${movieImage}"
          alt="${movieTitle}"
        />
      </div>
      <div class="card_title_box">
        <span class="card_movie_title">${movieTitle}</span>
        <div class="card_info_box">
          <span class="card_info_rating">평점 : </span>
          <span class="card_info_ratingnumber">${movieAverage}</span>
        </div>
      </div>
    </div>
    `;
    rootMain.innerHTML += createCardHtml;
  });
}

rootMain.addEventListener("click", (e) => {
  const clickedCard = e.target.closest(".card");
  if (clickedCard) {
    const clickedMovieId = parseInt(clickedCard.id);
    const selectedMovie = allMovies.find(
      (movie) => movie.id === clickedMovieId
    );
    if (selectedMovie) {
      modalRenderMovies(selectedMovie);
      modalWindow.style.display = "block";
    }
  }
});

bookmarkViewBtn.addEventListener("click", () => {
  renderMovies(bookmarks);
  bookmarkViewBtn.style.display = "none";
  bookmarkReverseBtn.style.display = "block";
});

bookmarkReverseBtn.addEventListener("click", () => {
  renderMovies(allMovies);
  bookmarkViewBtn.style.display = "block";
  bookmarkReverseBtn.style.display = "none";
});

bookmarkAddBtn.addEventListener("click", () => {
  const movieId = parseInt(modalMovieTitle.getAttribute("data-id"));
  const movie = allMovies.find((movie) => movie.id === movieId);
  if (movie) {
    addBookmark(movie);
  }
  alert("북마크에 추가되었습니다.");
});

bookmarkRemoveBtn.addEventListener("click", () => {
  const movieId = parseInt(modalMovieTitle.getAttribute("data-id"));
  removeBookmark(movieId);
  modalWindow.style.display = "none";
  alert("북마크에서 제거되었습니다.");
});

modalCloseBtn.addEventListener("click", () => {
  modalWindow.style.display = "none";
});

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchValue)
  );
  renderMovies(filteredMovies);
});

window.addEventListener("load", () => {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
});
