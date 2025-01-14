
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let city = new URLSearchParams(search).get("city");
  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const response = await fetch(config.backendEndpoint + `/adventures/?city=${city}`);
    const citydata = await response.json();
    return citydata;
  } catch (error) {
    return null;
  }
}


//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let row = document.getElementById("data");
  adventures.forEach((key) => {
    let col = document.createElement("div");
    col.className = "col-sm-6 col-lg-3 col-12 text-center mb-4 position-relative"
    col.innerHTML = `
              <a href="detail/?adventure=${key.id}" id=${key.id}>
                <div class="category-banner">
                  ${key.category}
                </div>
                <div class="activity-card">
                  <img class="img-fluid activity-card img" src=${key.image}/>
                    <div class="text-md-center w-100 mt-3">
                      <div class="d-block d-md-flex justify-content-between flex-wrap ps-2 pe-2">
                        <h6 class="text-left">${key.name}</h6>
                        <p> ${"$ " + key.costPerHead}</p>
                      </div>
                      <div class="d-block d-md-flex justify-content-between flex-wrap ps-2 pe-2">
                        <h6 class="text-left"> Duration</h6>
                        <p> ${key.duration}</p>
                      </div>
                    </div>
                  </div>
                </a>            
`
    row.append(col);
  });
};


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  // console.log(list);
  return list.filter((data) => {
    return (data.duration >= low && data.duration <= high);
  })


}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter((categoryData) => {
    // console.log(categoryData.category);
    return categoryList.includes(categoryData.category);
  })

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  const duration = filters["duration"];
  const isDurationPresent = duration !== null && duration.length > 0 ? true : false;

  const categoryList = filters["category"];

  const isCategoryPresent = categoryList !== null && categoryList.length > 0 ? true : false;

  const low = duration.split("-")[0];
  const high = duration.split("-")[1];

  if (isDurationPresent && !isCategoryPresent) {

    list = filterByDuration(list, low, high)


  } else if (isCategoryPresent && !isDurationPresent) {

    list = filterByCategory(list, categoryList);


  } else if (isDurationPresent && isCategoryPresent) {

    list = filterByDuration(list, low, high);
    list = filterByCategory(list, categoryList);

  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters))



  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(localStorage.getItem("filters"));




  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const categoryFilter = filters["category"];
  categoryFilter.forEach((key) => {
    let divElement = document.createElement("div");
    divElement.className = "category-filter"
    divElement.innerHTML = `
    <div> ${key} </div>
    `
    document.getElementById("category-list").appendChild(divElement)
  });

}


export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
