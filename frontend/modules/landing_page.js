import config from "../conf/index.js";


async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  // console.log(cities)
  // console.log(config);


  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
  
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const response = await fetch(config.backendEndpoint + "/cities");
    const data = await response.json();
    // console.log(data);

    let serachResult = search(data)
    //console.log("Get Search Result:", serachResult);
    return serachResult == undefined ? data : serachResult
  } catch (error) {
    // console.log("error", error)
    return null;
  }



  function search(data) {
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('keyup', (event) => {
    const searchString = event.target.value.toLowerCase().trim();
    const filteredCharacters = data.filter((character) => {
        return (
            character.city.toLowerCase().includes(searchString)
        );
        
    });

    let datas = document.getElementById("data");
    datas.innerHTML = ""
    
    filteredCharacters.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
    
    
    
    return filteredCharacters
 });
}

}

const searchBar = document.getElementById('searchBar');


function search(data) {
  searchBar.addEventListener('keyup', (event) => {
    const searchString = event.target.value.toLowerCase().trim();
    const filteredCharacters = data.filter((character) => {
      return (
        character.city.toLowerCase().includes(searchString)
      );

    });

    let datas = document.getElementById("data");
    datas.innerHTML = ""

    filteredCharacters.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });



    return filteredCharacters
  });
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // . Populate the City details and insert those details into the DOM
  const row = document.getElementById("data");
  let col = document.createElement("div");
  col.className = "col-lg-3 col-sm-6 col-12 mb-4"
  col.innerHTML = `
              <a href = "pages/adventures/?city=${id}" id="${id}">
                  <div class="tile">
                    <img src=${image} alt=${city} class="img-fluid">
                      <div class="tile-text text-center">
                      <h5>${city}</h5>
                      <p class="text-white">${description}</p>
                    </div>
                  </div>
                </a>

`
   row.append(col)



}



export { init, fetchCities, addCityToDOM, search };
