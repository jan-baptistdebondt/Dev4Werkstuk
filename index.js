const containerToFill = document.getElementById('containerToFill');
const searchContainer = document.getElementById('searchContainer');
let jsonData;
let filters = document.querySelectorAll('.filter');

//fetching the data from the json and filling the page
fetch('./entries.json')
    .then(res => res.json())
    .then((data) => {
        jsonData = data.items;
        fillPage(jsonData);
    });

//function that fills the page with cards, takes an array of objects as a parameter    
let fillPage = (data) => {
    for (content of data) {
        containerToFill.insertAdjacentHTML('afterbegin',
            `<div id="voorstelling" class="${content['category']}">
            <img src="${undefinedFilter(content.thumbnail.url)}">
            <div class="info">
        <h3>${undefinedFilter(content['name'])}</h3>
            <p>${undefinedFilter(content['excerpt'])}</p>
            <p>${undefinedFilter(content['recorded-at'])}</p>
            <p>${undefinedFilter(content['video-length'])}</p>
            </div>
        </div>`);
    };
};

//function to remove undefined text
let undefinedFilter = (data) => {
    if (data == undefined) {
        let emptyString = '<br>';
        return emptyString;
    } else {
        return data;
    };
};

//function that filters an array of objects(filter) for the right genre(query)
let filterGenre = (filter, query) => {
    for (item of query) {
        if (filter['genre-v2'] == item) {
            return true;
        };
    };
};

//function that filters an array of objects(filter) for the right category(query)
let filterCategory = (filter, query) => {
    for (item of query) {
        if (filter['category'] == item) {
            return true;
        };
    };
};


//function that filters data and displays the filtered information, accepts a string array as parameter
let filterFunctionality = (activeFilters) => {
    usedFilters = [];
    for (filterName of activeFilters) {
        usedFilters.push(filterName.id);
    };
    
    let genreArray = jsonData.filter(item => filterGenre(item, usedFilters));
    let categoryArray = jsonData.filter(item => filterCategory(item, usedFilters));
    
    containerToFill.innerHTML = '';

    if(usedFilters == ''){
        fillPage(jsonData);
    }else if(genreArray==''){
        fillPage(categoryArray);
    }else if(categoryArray ==''){
        fillPage(genreArray);
    }else{
        fillPage(genreArray.filter(item => filterCategory(item, usedFilters)))
    };    
};

//function that creates the search functionality, accepts an array of objects(data) and a textstring as parameters
let searchFunctionality = (data, query) => {
    let searchResult;
    if(query !== ""){
        searchContainer.innerHTML = "";
        searchResult = data.filter(item => searchFilter(query, item));
        searchResult.map( item => {
          searchContainer.insertAdjacentHTML('afterbegin', 
          `<div id="searchResult">
          <img src="${item.thumbnail.url}">
          <div id="searchText">
          <h3>${item.name}</h3>
          <p>${item.excerpt}</p>
          <p>${item['recorded-at']}</p>
          </div>
          </div>`
          )}
        );
      } else {
        searchContainer.innerHTML = "";
      } 
};

//function that filters data with a given filter
let searchFilter = (filter, data) => {
    const regex = new RegExp(`^${filter}`, 'gi');
    return data.name.match(regex);
};

//implements the search functionality
document.getElementById('searchBar').onkeyup = async function(){
    let searchValue = this.value;
    console.log(searchValue);
    await searchFunctionality(jsonData,searchValue);
  };

//implements the filter functionality 
for (button of filters) {
    button.onclick = function () {
        this.classList.toggle("active");
        let activeFilters = document.querySelectorAll('.active');
        filterFunctionality(activeFilters);
    };
};
