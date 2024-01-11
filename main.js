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

//sorting year
let sortOrder = 'asc'; // Keeps track of the current sort order

document.getElementById('year-header').addEventListener('click', function() {
    let containers = Array.from(document.querySelectorAll('.artwork-container'));
    containers.sort(function(a, b) {
        let yearA = parseInt(a.children[2].textContent, 10); // Assuming year is the third child
        let yearB = parseInt(b.children[2].textContent, 10);

        if (sortOrder === 'asc') {
            return yearA - yearB;
        } else {
            return yearB - yearA;
        }
    });

    // Update the grid with the sorted containers
    let gridContainer = document.querySelector('.grid-container');
    containers.forEach(container => gridContainer.appendChild(container)); // Re-append in sorted order

    // Toggle the sort order for the next click
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
});

}
