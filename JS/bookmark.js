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
  const movieId = parseInt(modalMovieTitle.getAttribute("data-id")); // 모달 창에서 영화 ID 가져오기
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
