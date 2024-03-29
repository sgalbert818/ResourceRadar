let lat;
let long;
const uofa = { lat: 32.23185, lng: -110.95156 };
const cuboulder = { lat: 40.00722, lng: -105.26550 };
const ucla = { lat: 34.07015, lng: -118.44360 };
const alabama = { lat: 33.21167, lng: -87.54013 };
let coordinates = uofa;

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
    {
        title: "Rec center study lounge",
        description: "Study lounge just past the second weight floor, lots of couches and computers.",
        type: "desktop",
        review: 4,
        img: 'images/img-6.jpg',
        position: {
            lat: 40.01017,
            lng: -105.26919,
        },
    },
    {    
        title: "Charging station at student union",
        description: "Small charger station next to main hall, by room 101.",
        type: "charging-station",
        review: 5,
        img: 'images/img-2.jpg',
        position: {
            lat: 40.00763,
            lng: -105.27094,
        },
    },
    {
        title: "Business school sofas",
        description: "Huge red sofa otside of room 352. Kind of scratchy but very quiet and big enough for a nap.",
        type: "couch",
        review: 4,
        img: 'images/img-1.jpg',
        position: {
            lat: 40.00568,
            lng: -105.26322,
        },
    },
    {    
        title: "Charging station at student union",
        description: "Small charger station on the second level by elevators.",
        type: "charging-station",
        review: 4,
        img: 'images/img-2.jpg',
        position: {
            lat: 34.07057,
            lng: -118.44415,
        },
    },
    {
        title: "Royce hall water bottle station",
        description: "Refill station by the main entrance on the right",
        type: "droplet",
        review: 5,
        img: 'images/img-3.jpg',
        position: {
            lat: 34.07284,
            lng: -118.44133,
        },
    },
    {
        title: "Student rec center armchairs",
        description: "Set of three armchairs outside shake smart, noisy but comfortable",
        type: "couch",
        review: 3,
        img: 'images/img-1.jpg',
        position: {
            lat: 33.21231,
            lng: -87.53099,
        },
    },
    {
        title: "Student center study lounge",
        description: "Study lounge for students at the end of the main hallway on the main floor.",
        type: "desktop",
        review: 4,
        img: 'images/img-4.jpg',
        position: {
            lat: 33.21453,
            lng: -87.54507,
        },
    },
];

initMap(uofa);

const locations = document.getElementById('locations');

locations.onchange = function() {
   if (locations.value == 'uofa') {
    coordinates = uofa;
    initMap(uofa);
   }
   if (locations.value == 'cuboulder') {
    coordinates = cuboulder;
    initMap(cuboulder);
   }
   if (locations.value == 'ucla') {
    coordinates = ucla;
    initMap(ucla);
   }
   if (locations.value == 'alabama') {
    coordinates = alabama;
    initMap(alabama);
   }
 }

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