import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const adventure = new URLSearchParams(search).get("adventure");
  return adventure;


  // Place holder for functionality to work in the Stubs

}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const response = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
    const adventureDetails = await response.json();
    return adventureDetails;
  } catch (error) {
    return null;
  }
}

// Place holder for functionality to work in the Stubs


//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const name = adventure.name;
  const subtitle = adventure.subtitle;
  const images = adventure.images;
  // console.log(images);
  const headingElement = document.getElementById("adventure-name");
  const subtitleElement = document.getElementById("adventure-subtitle");
  headingElement.innerHTML = name;
  subtitleElement.innerHTML = subtitle;

  images.map((image) => {
    const divElement = document.createElement("div");
    divElement.classList.add("col-lg-12");
    divElement.innerHTML = `
    <img 
      src = ${image};
      class = "activity-card-image pb-3 pb-md-0"
      />
    `
    document.getElementById("photo-gallery").appendChild(divElement)
  })
  // console.log(adventure);
  document.getElementById("adventure-content").innerHTML = adventure.content

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photogallery = document.getElementById("photo-gallery");

  photogallery.innerHTML = `
  <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">

  </div>
    
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>
  `

  const carouselElem = document.querySelector(".carousel-inner")

  images.map((image, index) => {
    const divElement = document.createElement("div");
    divElement.className = `carousel-item ${index === 0 ? "active" : ""}`;
    divElement.innerHTML = `
    <img 
      src = ${image};
      class = "activity-card-image pb-3 pb-md-0"
      />
    `
    // console.log(divElement)
    carouselElem.appendChild(divElement);
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
