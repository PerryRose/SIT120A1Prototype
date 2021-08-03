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

function initMap() {
    const centreCoordinates = { lat: -37.81100320947774, lng: 145.062455385037 };

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 9,
      center: centreCoordinates,
      mapTypeId: "terrain",
    });

    let htmlString = "<table>";

    hotSpots.forEach(x => {
        const _ = new google.maps.Marker({
            position: {lat: x.lat, lng: x.lng},
            map: map
        });

        htmlString += `<tr>`;

        htmlString += `<th><div class="exposure-title">${x.suburb}</div></th>`;

        htmlString += `</tr>`;

        htmlString += `<tr>`;

        htmlString += `<th><div class="exposure-content" style="margin-left: 1em;">${x.locationName}<br>${x.address}</div></th>`;

        htmlString += `<th><div class="exposure-content">${x.exposureDate} at ${x.exposureTime}</div></th>`;

        htmlString += `<th><div class="exposure-content">${x.notes}</div></th>`;

        htmlString += `<th><div class="exposure-content" style="margin-right: 1em;">${x.tier}</div></th>`;

        htmlString += `</tr>`;

    });

    let divContainer = document.getElementById('hotspotTable');
    divContainer.innerHTML = htmlString += `</table>`;
}

let latestFiguresTitle = document.getElementById('latest-figures-title');
let latestFiguresBox = document.getElementById('latest-figures');

latestFiguresBox.addEventListener('mouseenter', expandLatestFigures);

function expandLatestFigures() {
    latestFiguresTitle.innerHTML += `<br>12 new cases<br>250 total cases<br>34.5k tests received`;
}

latestFiguresBox.addEventListener('mouseleave', function(e) {
    latestFiguresTitle.textContent = "Latest Figures";
});