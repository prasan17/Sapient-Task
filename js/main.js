// Api url variable
const api_url =
    "https://api.spacexdata.com/v3/launches?limit=100";

// variable for stroing the list of response
let listSpaceXElement = [];

// Fetching the data from the api
fetch(api_url)
    .then((response) => response.json())
    .then((spaceXData) => {
        console.log(spaceXData);
        listSpaceXElement = spaceXData;
        showListSpaceXData(spaceXData);
    }).catch((error) => {
        // Adding if any error
        console.log('Error : ', error.message);
    });

// function to show the updated list of data
function showListSpaceXData(updatedValue) {
    let updateListData = [];
    for (let item of updatedValue) {
        updateListData += `
        <div class="launchCard">
        <img src=${item.links.mission_patch_small} class="launchImage" alt="Space X"></img>
        <div class="launchName">${item.mission_name} # ${item.flight_number}</div>
        <div class="missionID"><span>Mission Ids:</span> ${item.mission_id == '' ? 'Not Available' : item.mission_id}</div>
        <div class="year"><span>Launch Year:</span> ${item.launch_year}</div>
        <div class="success"><span>Successful Launch:</span> ${item.launch_success}</div>
        <div class="fail"><span>Successful Landing:</span> Not Available</div>
        </div>`;
    }
    // Appending to the required block
    document.getElementById("container__list--name").innerHTML = updateListData;
}
// filter data function based on year
function filterData() {
    let filteredData = [];
    var years = document.querySelectorAll(".filter__value button");
    years.forEach((year) => {
        year.addEventListener('click', (yearID) => {
            filteredData = [];
            years.forEach((year) => {
                year.classList.remove('active');
            });
            year.classList.add('active');
            for (let item of listSpaceXElement) {
                if (yearID.target.value == item.launch_year) {
                    filteredData.push(item);
                    showListSpaceXData(filteredData);
                }
            }
        });
    });
}
filterData();