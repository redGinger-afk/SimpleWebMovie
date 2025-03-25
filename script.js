// Fetch
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", function () {
  const inputKeyword = document.querySelector(".input-keyword");
  fetch("http://www.omdbapi.com/?apikey=62663eca&s=" + inputKeyword.value)
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      const cards = movies.map(showCards).join("");
      const movieContainer = document.querySelector(".movie-container");
      movieContainer.innerHTML = cards;

      // ketika show detail di-klik
      const movieDetail = document.querySelectorAll(".movie-detail");
      movieDetail.forEach((m) => {
        m.addEventListener("click", function () {
          const imdbid = m.dataset.imdbid;
          fetch("http://www.omdbapi.com/?apikey=62663eca&i=" + imdbid)
            .then((response) => response.json())
            .then((results) => {
              const modalTitle = document.querySelector(".modal-title");
              const modalBody = document.querySelector(".modal-body");
              modalTitle.innerHTML = `${results.Title} (${results.Year})`;
              modalBody.innerHTML = showDetailCards(results);
            });
        });
      });
    });
});

const showCards = (m) => {
  return `<div class="col-md-3 my-3">
                    <div class="card">
                      <img src="${
                        m.Poster !== "N/A" ? m.Poster : "default-poster.jpg"
                      }" class="card-img-top" />
                      <div class="card-body">
                        <h5 class="card-title">${m.Title} (${m.Year})</h5>
                        <a
                          href="#"
                          class="btn btn-primary movie-detail"
                          data-bs-toggle="modal"
                          data-bs-target="#movieDetailModal"
                          data-imdbid="${m.imdbID}"
                          >Show Details</a
                        >
                      </div>
                    </div>
                  </div>`;
};

const showDetailCards = (m) => {
  return `<div class="row">
            <div class="col-md-4">
              <img src="${m.Poster}" class="img-fluid rounded" />
            </div>
            <div class="col-md">
              <ul class="list-group">
                <li class="list-group-item"><strong>Synopsis:</strong><br>${
                  m.Plot
                }</li>
                <li class="list-group-item"><strong>Genre:</strong> ${
                  m.Genre
                }</li>
                <li class="list-group-item">
                  <strong>Actors:</strong> 
                  ${m.Actors.split(", ")
                    .map(
                      (actor) =>
                        `<span class="badge bg-primary me-1">${actor}</span>`
                    )
                    .join("")}
                </li>
                <li class="list-group-item"><strong>Type:</strong> ${
                  m.Type
                }</li>
              </ul>
            </div>
          </div>`;
};
