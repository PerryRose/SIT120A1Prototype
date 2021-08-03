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

    // The string used for the exposure site list
    let htmlString = `<table class="exposure-list-table">`;

    // For every hotspot
    hotSpots.forEach(x => {
        // Create a marker on the map
        const _ = new google.maps.Marker({
            position: {lat: x.lat, lng: x.lng},
            map: map
        });

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

// Variables for Latest Figures component
let warningIcon = document.getElementById('warning-icon');
let latestFiguresTitle = document.getElementById('latest-figures-title');
let latestFiguresBox = document.getElementById('latest-figures');
let expandedContent = document.getElementById('expanded-content');

// Add event listener for mouse hover
latestFiguresBox.addEventListener('mouseenter', expandLatestFigures);
latestFiguresBox.addEventListener('mouseleave', closeLatestFigures);

// Expand latest figures
function expandLatestFigures() {
    // Wait 600ms for expansion, then add and hide appropriate elements
    //sleep(600).then(() => {
        warningIcon.classList.add('hide');
        latestFiguresTitle.classList.add('hide');
        expandedContent.classList.remove('hide');
    //});
}

// Close Latest figures
function closeLatestFigures() {
    // Add and hide appropriate elements
    warningIcon.classList.remove('hide');
    latestFiguresTitle.classList.remove('hide');
    expandedContent.classList.add('hide');
}

// Function for sleeping
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}