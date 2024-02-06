let lat;
let long;
let uofa = { lat: 32.23185, lng: -110.95156 };
let cuboulder = { lat: 40.00722, lng: -105.26550 };
let ucla = { lat: 34.07015, lng: -118.44360 };
let alabama = { lat: 33.21167, lng: -87.54013 };
let coordinates = '';

let ari = document.getElementById('ari');
let bou = document.getElementById('bou');
let los = document.getElementById('los');
let ala = document.getElementById('ala');

async function initMap(centerCoordinates) {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const map = new Map(document.getElementById("map"), {
        zoom: 16,
        center: centerCoordinates,
        mapId: "4504f8b37365c3d0",
    });

    let infoWindow = new google.maps.InfoWindow({
    });

    map.addListener("click", (mapsMouseEvent) => {
        lat = (mapsMouseEvent.latLng.toJSON().lat);
        long = (mapsMouseEvent.latLng.toJSON().lng);
        infoWindow.close();
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(
            `<div id="form">
            <form id="myForm">
                <div class="writeInInputs">
                    <h3><label>Title</label></h3>
                    <input name="title" id="title" placeholder="Enter Title" />
                    <h3><label>Description</label></h3>
                    <input type="text" id="description" name="description" placeholder="Short Description" />
                </div>
    
                <div class="chooseInput">
                    <h3><label>Category</label></h3>
                    <select id="type" name="type">
                        <option value="disabled selected">Select Type of Resource</option>
                        <option value="couch">Couch</option>
                        <option value="droplet">Water Station</option>
                        <option value="charging-station">Charging Station</option>
                        <option value="desktop">Study Space</option>
                    </select>
                    <h3><label>Rating</label></h3>
                    <input type="range" min="1" max="5" value="1" class="slider" id="review">
                    <h3><label>Image</label></h3>
                    <input type="file" id="img" name="img" accept=".png, .jpeg, .jpg" />
                </div>
            </form>
    
            <div id="buttonBreak">
                <br>
                <button id="submit" onclick="SubForm()">Submit</button>
            </div>
        </div>`
        );
        infoWindow.open(map);
    });

    for (const resource of resources) {
        const AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
            map,
            content: buildContent(resource),
            position: resource.position,
            title: resource.description,
        });

        AdvancedMarkerElement.addListener("click", () => {
            toggleHighlight(AdvancedMarkerElement, resource);
            infoWindow.close();
        });
    }
}

function toggleHighlight(markerView) {
    if (markerView.content.classList.contains("highlight")) {
        markerView.content.classList.remove("highlight");
        markerView.zIndex = null;
    } else {
        markerView.content.classList.add("highlight");
        markerView.zIndex = 1;
    }
};

function buildContent(resource) {
    const content = document.createElement("div");
    content.classList.add("resource");
    content.innerHTML = `
      <div class="icon">
          <i aria-hidden="true" class="fa fa-icon fa-${resource.type}" title="${resource.type}"></i>
          <span class="fa-sr-only">${resource.type}</span>
      </div>
      <div class="details">
          <div class="title">${resource.title}</div>
          <div class="description">${resource.description}</div>
          <div class="comfort">Review: ${`<span class="fa fa-star checked"></span>`.repeat(resource.review) + `<span class="fa fa-star"></span>`.repeat(5 - resource.review)}</div>
      </div>
      <div class="img-container">
        <img src=${resource.img}>
      </div>
      `;
    return content;
}

const resources = [
    {
        title: "Bookstore recliners",
        description: "4 comfy couches in bookstore. Use main entrance turn left, then head straight back.",
        type: "couch",
        review: 4,
        img: 'images/img-1.jpg',
        position: {
            lat: 32.23244,
            lng: -110.95266,
        },
    },
    {
        title: "Arts building charging station",
        description: "Huge charging station set up outside of room 112 on main level.",
        type: "charging-station",
        review: 5,
        img: 'images/img-2.jpg',
        position: {
            lat: 32.23568,
            lng: -110.95644,
        },
    },
    {
        title: "Main library water bottle station",
        description: "Refill station on second floor of main library in the northwest corner by the elevators. Only works like 80% of the time though.",
        type: "droplet",
        review: 3,
        img: 'images/img-3.jpg',
        position: {
            lat: 32.23078,
            lng: -110.94867,
        },
    },
    {
        title: "Quiet desk in koffler building",
        description: "desk outside of room 412. Small but isolated so it's quiet and good for cramming before lab.",
        type: "desktop",
        review: 4,
        img: 'images/img-4.jpg',
        position: {
            lat: 32.23124,
            lng: -110.95124,
        },
    },
    {
        title: "Campus rec refill station",
        description: "Water bottle refill station near entrance of campus rec between men's and women's locker rooms.",
        type: "droplet",
        review: 5,
        img: 'images/img-5.jpg',
        position: {
            lat: 32.22753,
            lng: -110.95037,
        },
    },
    {
        title: "Main rec center study lounge",
        description: "Huge study lounge hidden at the rec center. Go past shake smart and turn left just past the racquetball courts. Head straight back, turn right. Nobody EVER uses these.",
        type: "desktop",
        review: 5,
        img: 'images/img-6.jpg',
        position: {
            lat: 32.22735,
            lng: -110.94962,
        },
    },
];

initMap(uofa);

ari.addEventListener('click', function() {
    coordinates = uofa;
    initMap(uofa);
});

bou.addEventListener('click', function() {
    coordinates = cuboulder;
    initMap(cuboulder);
});

los.addEventListener('click', function() {
    coordinates = ucla;
    initMap(ucla);
});

ala.addEventListener('click', function() {
    coordinates = alabama;
    initMap(alabama);
});

function SubForm() {

    const input = document.getElementById("img");
    let imagesArray = [];
    const file = input.files;
    imagesArray.push(file[0])
    let images = ""
    imagesArray.forEach((image) => {
        images = URL.createObjectURL(image);
    })
    let newObject = {
        title: document.querySelector('input[name="title"]').value,
        description: this.description.value,
        type: this.type.value,
        review: this.review.value,
        img: images,
        position: {
            lat: lat,
            lng: long,
        },
    }
    resources.push(newObject);
    initMap(coordinates);
}