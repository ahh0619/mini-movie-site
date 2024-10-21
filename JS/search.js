const searchInput = document.querySelector(".header_input");

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchValue)
  );
  renderMovies(filteredMovies);
});

// 검색어에 직접 값을 넣어서 모든 영화를 나타내는 로직.

// async function searchMovies(query) {
//   const url = `https://api.themoviedb.org/3/search/movie?api_key=${MY_API_KEY}&query=${query}&language=ko-KR`;
//   const options = {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//     },
//   };
//   try {
//     const response = await fetch(url, options);
//     const data = await response.json();
//     allMovies = data.results;
//     renderMovies(allMovies);
//   } catch (error) {
//     console.error("데이터를 가져오는 중 오류 발생:", error);
//   }
// }

// searchInput.addEventListener("input", () => {
//   const searchValue = searchInput.value.toLowerCase();
//   if (searchValue) {
//     searchMovies(searchValue);
//   } else {
//     fetchMovies();
//   }
// });
