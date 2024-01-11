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
let currentSortColumn = null;

function sortItems(columnClass, arrowId) {
    const container = document.querySelector('.grid-container');
    let items = Array.from(container.querySelectorAll('.artwork-container:not(.event-header)'));

    // Reset all arrows to default state
    document.querySelectorAll('.arrow').forEach(arrow => arrow.textContent = '↓');

    if (currentSortColumn !== columnClass || sortOrder === 'descending') {
        sortOrder = 'ascending';
        document.getElementById(arrowId).textContent = '↑';
    } else {
        sortOrder = 'descending';
        document.getElementById(arrowId).textContent = '↓';
    }

    items.sort(function(a, b) {
        const textA = a.querySelector('.' + columnClass).textContent.trim();
        const textB = b.querySelector('.' + columnClass).textContent.trim();

        if (columnClass === 'year') { // Sort numerically for year
            return sortOrder === 'ascending' ? parseInt(textA) - parseInt(textB) : parseInt(textB) - parseInt(textA);
        } else { // Sort alphabetically for event and host
            return sortOrder === 'ascending' ? textA.localeCompare(textB) : textB.localeCompare(textA);
        }
    });

    items.forEach(item => container.appendChild(item));
    currentSortColumn = columnClass;
}

document.getElementById('eventTitle').addEventListener('click', function() {
    sortItems('event', 'arrowEvent');
});

document.getElementById('hostTitle').addEventListener('click', function() {
    sortItems('host', 'arrowHost');
});

document.getElementById('yearTitle').addEventListener('click', function() {
   
