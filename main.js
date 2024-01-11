document.addEventListener("DOMContentLoaded", function () {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const carousel = document.querySelector('.carousel');
    let scrollAmount = 0;

    nextButton.addEventListener('click', () => {
        carousel.scrollTo({
            top: 0,
            left: (scrollAmount += carousel.offsetWidth / 3),
            behavior: 'smooth'
        });
    });

    prevButton.addEventListener('click', () => {
        carousel.scrollTo({
            top: 0,
            left: (scrollAmount -= carousel.offsetWidth / 3),
            behavior: 'smooth'
        });
    });
});


let lastSelectedRadio = null;

document.addEventListener('DOMContentLoaded', function() {
    // Attach a click event listener to the radio buttons
    document.querySelectorAll('input[name="displayType"]').forEach(function(radio) {
        radio.addEventListener('click', function(event) {
            handleRadioClick(event.target);
        });
    });
});

function handleRadioClick(clickedRadio) {
    // If the clicked radio button is the same as the last one, uncheck it and reset the last selected radio
    if (clickedRadio === lastSelectedRadio) {
        clickedRadio.checked = false;
        lastSelectedRadio = null;
    } else {
        lastSelectedRadio = clickedRadio;
    }

    // Apply the filter (or show all if no radio is selected)
    filterArtworks();
}

function filterArtworks() {
    // Get the selected radio button, if any
    let selectedRadio = document.querySelector('input[name="displayType"]:checked');
    let selectedType = selectedRadio ? selectedRadio.value : null;

    // Get all artwork containers
    let artworkContainers = document.querySelectorAll('.artwork-container');

    // Loop through artwork containers and display/hide based on the selected type (or show all if no type is selected)
    artworkContainers.forEach(function(container) {
        if (!selectedType || container.getAttribute('data-type') === selectedType) {
            container.style.display = 'grid'; // Display the container
        } else {
            container.style.display = 'none'; // Hide the container
        }
    });
}

//year sorting
let sortOrder = 'ascending';

function sortItems(columnClass, clickedTitle) {
    const container = document.querySelector('.grid-container');
    let items = Array.from(container.querySelectorAll('.artwork-container:not(.event-header)'));
    const arrow = clickedTitle.querySelector('.sort-arrow');

    items.sort(function(a, b) {
        const textA = a.querySelector('.' + columnClass).textContent.trim();
        const textB = b.querySelector('.' + columnClass).textContent.trim();

        if (sortOrder === 'ascending') {
            return textA.localeCompare(textB);
        } else {
            return textB.localeCompare(textA);
        }
    });

    items.forEach(item => container.appendChild(item));
    sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';

    // Update arrow direction
    if (sortOrder === 'ascending') {
        arrow.classList.add('up');
    } else {
        arrow.classList.remove('up');
    }
}

document.querySelectorAll('.grid-title').forEach(title => {
    title.addEventListener('click', function() {
        const columnClass = this.id.replace('Title', '').toLowerCase();
        sortItems(columnClass, this);
    });
});


//index image filter

const imagesRadio = document.getElementById("images");
const textRadio = document.getElementById("text");
const indexItems = document.querySelectorAll(".index-item");

// Add event listeners to radio buttons
imagesRadio.addEventListener("change", () => {
    filterItems("images");
});

textRadio.addEventListener("change", () => {
    filterItems("text");
});

function filterItems(type) {
    indexItems.forEach((item) => {
        if (type === "images" && item.getAttribute("data-type") === "images") {
            item.classList.remove("hidden");
        } else if (type === "text" && item.getAttribute("data-type") === "text") {
            item.classList.remove("hidden");
        } else {
            item.classList.add("hidden");
        }
    });
}

// Initialize the filter
filterItems("images"); // Initially show images