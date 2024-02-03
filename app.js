async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const center = { lat: 32.23185, lng: -110.95156 };
    const map = new Map(document.getElementById("map"), {
        zoom: 16,
        center,
        mapId: "4504f8b37365c3d0",
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
        });
    }
}

function toggleHighlight(markerView, resource) {
    if (markerView.content.classList.contains("highlight")) {
        markerView.content.classList.remove("highlight");
        markerView.zIndex = null;
    } else {
        markerView.content.classList.add("highlight");
        markerView.zIndex = 1;
    }
}

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

initMap();

let tester = document.querySelector('.tester');
let form = document.forms["myForm"];

function SubForm() {

    const input = document.getElementById("img");
    let imagesArray = [];
    const file = input.files;

    imagesArray.push(file[0])
    let images = ""
    imagesArray.forEach((image, index) => {
      images = URL.createObjectURL(image);
    })

    let newObject = {
        title: document.querySelector('input[name="title"]').value,
        description: this.description.value,
        type: this.type.value,
        review: Number(document.querySelector('input[name="review"]:checked').value),
        img: images,
        position: {
            lat: Number(this.lat.value),
            lng: Number(this.long.value),
        },
    }

    resources.push(newObject);
    initMap();
}