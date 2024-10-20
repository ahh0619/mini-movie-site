const bookmarkViewBtn = document.querySelector(".bookmark_button");
const bookmarkReverseBtn = document.querySelector(".reverse_button");
const bookmarkAddBtn = document.querySelector(".bookmark_addbtn");
const bookmarkRemoveBtn = document.querySelector(".bookmark_removebtn");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
let bookmarkState = false;

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

  if (bookmarkState) {
    renderMovies(bookmarks);
  }
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

bookmarkViewBtn.addEventListener("click", () => {
  bookmarkState = true;
  renderMovies(bookmarks);
  bookmarkViewBtn.style.display = "none";
  bookmarkReverseBtn.style.display = "block";
});

bookmarkReverseBtn.addEventListener("click", () => {
  bookmarkState = false;
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
  modalClose();
  alert("북마크에 추가되었습니다.");
});

bookmarkRemoveBtn.addEventListener("click", () => {
  const movieId = parseInt(modalMovieTitle.getAttribute("data-id"));
  removeBookmark(movieId);
  modalClose();
  alert("북마크에서 제거되었습니다.");
});

window.addEventListener("load", () => {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
});
