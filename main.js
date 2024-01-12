// CAROUSEL: HOME
document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector('.carousel');
    const counter = document.querySelector('.carousel-counter');
    const items = carousel.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let scrollAmount = 0;
    let itemsInView = window.innerWidth <= 600 ? 1 : 3; // Number of items in view depends on the width

    const updateCounter = () => {
        const currentItemIndex = Math.round(scrollAmount / getScrollWidth());
        counter.textContent = `${Math.min(currentItemIndex + itemsInView, totalItems)} of ${totalItems}`;
    };

    const getScrollWidth = () => {
        return carousel.offsetWidth / itemsInView;
    };

    nextButton.addEventListener('click', () => {
        scrollAmount += getScrollWidth();
        carousel.scrollTo({
            top: 0,
            left: scrollAmount,
            behavior: 'smooth'
        });
        updateCounter();
    });

    prevButton.addEventListener('click', () => {
        scrollAmount -= getScrollWidth();
        scrollAmount = Math.max(0, scrollAmount); // Prevent negative scroll amount
        carousel.scrollTo({
            top: 0,
            left: scrollAmount,
            behavior: 'smooth'
        });
        updateCounter();
    });

    // Initial counter update
    updateCounter();
});


//RADIO: EVENTS


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


//ARCHIVE: image filter
document.addEventListener('DOMContentLoaded', function () {
    var lastChecked;
    var radioButtons = document.querySelectorAll('input[name="displayType"]');

    radioButtons.forEach(function(radio) {
        radio.addEventListener('click', function(e) {
            if (e.target === lastChecked) {
                e.target.checked = false;
                lastChecked = null;
                showAllItems();
            } else {
                lastChecked = e.target;
                filterItems(e.target.value);
            }
        });
    });

    function filterItems(selectedType) {
        var indexItems = document.querySelectorAll('.index-item');
        indexItems.forEach(function(item) {
            if (item.getAttribute('data-type') === selectedType) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    function showAllItems() {
        var indexItems = document.querySelectorAll('.index-item');
        indexItems.forEach(function(item) {
            item.style.display = 'block';
        });
    }
});
