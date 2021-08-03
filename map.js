class HotSpot {
    constructor(locationName, exposureTime, exposureDate, lat, lng) {
        this.locationName = locationName;
        this.exposureTime = exposureTime;
        this.exposureDate = exposureDate;
        this.lat = lat;
        this.lng = lng;
    }
}

const hotSpots = [
    new HotSpot("Flinders Street Station", 
                "10:30AM - 10:45AM", 
                "9 Jul 21", 
                -37.81785576232708, 144.9673085501717),
    new HotSpot("Kmart Burwood", 
                "1:30PM - 2PM", 
                "20 Jul 21", 
                -37.85374403319895, 145.15016575304665),
    new HotSpot("Coles Berwick", 
                "4:45PM - 5:15PM", 
                "23 Jul 21", 
                -38.032070061000695, 145.34560744284525)
];

function initMap() {
    const centreCoordinates = { lat: -37.81100320947774, lng: 145.062455385037 };

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 9,
      center: centreCoordinates,
      mapTypeId: "terrain",
    });

    let table = document.createElement("table");
    let tr = table.insertRow(-1);

    hotSpots.forEach(x => {
        const _ = new google.maps.Marker({
            position: {lat: x.lat, lng: x.lng},
            map: map
        });

        tr = table.insertRow(-1);
        let tabCell = tr.insertCell(-1);
        tabCell.innerHTML = `<div class="exposure-title"><b>` + x.locationName + `</b></div>`;

        tr = table.insertRow(-1);
        let tabCell2 = tr.insertCell(-1);
        tabCell2.innerHTML = `<div class="exposure-content"><b>Time:</b> ` + x.exposureTime + " <b>Date:</b> " + x.exposureDate + `</div>`;

    });

    let divContainer = document.getElementById('hotspotTable');
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}