const MY_API_KEY = "cc24de6758ec32392f5e908a59646216";
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${MY_API_KEY}&language=ko-KR`;

const rootMain = document.querySelector(".main_section");
const bookmarkViewBtn = document.querySelector(".bookmark_button");
const bookmarkReverseBtn = document.querySelector(".reverse_button");
const bookmarkAddBtn = document.querySelector(".bookmark_addbtn");
const bookmarkRemoveBtn = document.querySelector(".bookmark_removebtn");

let allMovies = [];

async function fetchMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    allMovies = data.results;
    renderMovies(allMovies);
  } catch (error) {
    console.error("데이터를 가져오는 중 오류 발생:", error);
  }
}

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

fetchMovies();

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
