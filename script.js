const API_KEY = "62663eca";
const BASE_URL = "http://www.omdbapi.com/";

$(".search-button").on("click", function () {
  const movieName = $(".input-keyword").val();
  $.ajax({
    url: `${BASE_URL}?apikey=${API_KEY}&s=${movieName}`,
    success: (results) => {
      const movies = results.Search;
      if (!movies) {
        $(".movie-container").html("<h4>Movie Not Found...</h4>");
        return;
      }
      let cards = "";
      movies.forEach((m) => {
        cards += showCards(m);
      });
      $(".movie-container").html(cards);

      // saat show details di-klik
      $(".movie-container").on("click", ".movie-detail", function () {
        const imdbID = $(this).data("imdbid");
        $.ajax({
          url: `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`,
          success: (m) => {
            const movieDetail = showDetailCards(m);
            $(".modal-body").html(movieDetail);
            $(".modal-title").html(`${m.Title} (${m.Year})`);
          },
          error: (error) => {
            $(".modal-body").html(
              `<h4 class="text-danger text-center">Error loading details. Please try again later.</h4>`
            );
            console.error("Error:", error);
          },
        });
      });
    },
    error: (error) => {
      console.error("Error:", error);
    },
  });
});

// tampilin cards
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

// const showDetailCards = (m) => {
//   return `<div class="row">
//                   <div class="col-md-4">
//                     <img
//                       src="${m.Poster}"
//                       class="img-fluid"
//                     />
//                   </div>
//                   <div class="col-md">
//                     <ul class="list-group">
//                       <li class="list-group-item">
//                         <strong>Synopsis: </strong><br />${m.Plot}
//                       </li>
//                       <li class="list-group-item">
//                         <strong>Genre: </strong>${m.Genre}
//                       </li>
//                       <li class="list-group-item">
//                         <strong>Actors: </strong>${m.Actors}
//                       </li>
//                       <li class="list-group-item">
//                         <strong>Type: </strong>${m.Type}
//                       </li>
//                     </ul>
//                   </div>
//                 </div>`;
// };

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
