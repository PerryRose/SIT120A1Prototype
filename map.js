// Class for Hotspot Exposure Sites
class HotSpot {
    constructor(suburb, locationName, address, exposureTime, exposureDate, notes, tier, lat, lng) {
        this.suburb = suburb;
        this.locationName = locationName;
        this.address = address;
        this.exposureTime = exposureTime;
        this.exposureDate = exposureDate;
        this.notes = notes;
        this.tier = tier;
        this.lat = lat;
        this.lng = lng;
    }
}

// An array of the current exposure sites
const hotSpots = [
    new HotSpot("Melbourne", 
                "Flinders Street Station", 
                "Flinders St, Melbourne VIC 3000",
                "10:30AM - 10:45AM", 
                "9 Jul 21",
                "Case visited location",
                "Tier Level 1 - Get Tested Immediately", 
                -37.81785576232708, 144.9673085501717),
    new HotSpot("East Burwood",
                "Kmart", 
                "172 Burwood Hwy, Burwood East VIC 3151",
                "1:30PM - 2:00PM", 
                "20 Jul 21", 
                "Case visited store",
                "Tier Level 1 - Get Tested Immediately", 
                -37.85374403319895, 145.15016575304665),
    new HotSpot("Berwick",
                "Coles Supermarket",
                "2 Richardson Grove, Berwick VIC 3806", 
                "4:45PM - 5:15PM", 
                "23 Jul 21", 
                "Case visited store",
                "Tier Level 1 - Get Tested Immediately", 
                -38.032070061000695, 145.34560744284525)
];

// Filtered hot spots contain all hot spots by default
let filteredHotSpots = hotSpots;

// Google Maps JavaScript API initialisation
function initMap() {
    // Where the centre of the map should be
    const centreCoordinates = { lat: -37.81100320947774, lng: 145.062455385037 };

    // The map object
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 9,
      center: centreCoordinates,
      mapTypeId: "terrain",
    });

    // For every existing hotspot
    hotSpots.forEach(x => {
        // Create a marker on the map
        const _ = new google.maps.Marker({
            position: {lat: x.lat, lng: x.lng},
            map: map
        });
    });

    // Set up exposure site list
    initExposureSiteList();
}

function initExposureSiteList() {
    // The string used for the exposure site list
    let htmlString = `<table class="exposure-list-table">`;

    // For every filtered hotspot
    filteredHotSpots.forEach(x => { //hotSpots.forEach(x => {
        // Append data to the string
        htmlString += `
            <tr>
                <th>
                    <div class="exposure-title">
                        ${x.suburb}
                    </div>
                </th>
            </tr>
            <tr>
                <th>
                    <div class="exposure-content" style="margin-left: 1em;">
                        ${x.locationName}
                        <br>
                        ${x.address}
                    </div>
                </th>
                <th>
                    <div class="exposure-content">
                        ${x.exposureDate} at ${x.exposureTime}
                    </div>
                </th>
                <th>
                    <div class="exposure-content">
                        ${x.notes}
                    </div>
                </th>
                <th>
                    <div class="exposure-content" style="margin-right: 1em;">
                        ${x.tier}
                    </div>
                </th>
            </tr>`;
    });

    // Find hotspot table
    let divContainer = document.getElementById('hotspotTable');

    // Add html string to table
    divContainer.innerHTML = htmlString += `</table>`;
}

// Search Bar Feature
let searchBar = document.getElementById('exposure-site-search-bar');

// Add event listener for key-up
searchBar.addEventListener('keyup', updateSearchList);

// Function to update the exposure site list based on search bar contents
function updateSearchList() {
    // Get search term
    let searchTerm = this.value;

    // If search term is empty
    if (searchTerm.trim() === "") {
        // Show all exposure sites
        filteredHotSpots = hotSpots;
    }
    else {
        // Empty hot spots
        filteredHotSpots = [];

        // Search for hotspots
        hotSpots.forEach(x => {

            // If location name or address contains the search term
            if (x.locationName.toLowerCase().includes(searchTerm.toLowerCase()) || 
            x.address.toLowerCase().includes(searchTerm.toLowerCase())) {
                // Add hotspot to filtered hot spots
                filteredHotSpots.push(x);
            }
        });
    }

    // Re-initialise exposure site list with new array
    initExposureSiteList();
}

// Variables for Latest Figures component
class CovidFigures {
    constructor(newCases, totalCases, testsReceived) {
        this.newCases = newCases;
        this.totalCases = totalCases;
        this.testsReceived = testsReceived;
    }
}

const latestFigures = new CovidFigures(12, 250, "35.6k")

let warningIcon = document.getElementById('warning-icon');
let latestFiguresTitle = document.getElementById('latest-figures-title');
let latestFiguresBox = document.getElementById('latest-figures');
let expandedContent = document.getElementById('expanded-content');
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Add event listener for mouse hover
latestFiguresBox.addEventListener('mouseenter', expandLatestFigures);
latestFiguresBox.addEventListener('mouseleave', closeLatestFigures);

// Expand latest figures
function expandLatestFigures() {
    // Add and hide appropriate elements
    warningIcon.classList.add('hide');
    latestFiguresTitle.classList.add('hide');
    expandedContent.classList.remove('hide');
  
    // Get the date
    const date = new Date();

    // Create string containing latest figures data
    let htmlString = `
    <tr>
        <!--Current Date-->
        <th style="padding-bottom: 1em;">${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}</th>
    </tr>
    <tr>
        <!--COVID information-->
        <th><h1>${latestFigures.newCases}</h1><br> new cases</th>
        <th><h1>${latestFigures.totalCases}</h1><br> total cases</th>
        <th><h1>${latestFigures.testsReceived}</h1><br> tests received</th>
    </tr>
    `;

    // Add html string to table
    expandedContent.innerHTML = htmlString;
}

// Close Latest figures
function closeLatestFigures() {
    // Add and hide appropriate elements
    warningIcon.classList.remove('hide');
    latestFiguresTitle.classList.remove('hide');
    expandedContent.classList.add('hide');
}
