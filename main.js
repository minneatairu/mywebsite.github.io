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


document.addEventListener('DOMContentLoaded', function() {
    // Attach a change event listener to the radio buttons
    document.querySelectorAll('input[name="displayType"]').forEach(function(radio) {
        radio.addEventListener('change', filterArtworks);
    });
});

function filterArtworks() {
    // Get the selected value
    let selectedType = document.querySelector('input[name="displayType"]:checked').value;

    // Get all artwork containers
    let artworkContainers = document.querySelectorAll('.artwork-container');

    // Loop through artwork containers and display/hide based on the selected type
    artworkContainers.forEach(function(container) {
        if(container.getAttribute('data-type') === selectedType) {
            container.style.display = 'grid'; // Display the entire container
        } else {
            container.style.display = 'none'; // Hide the container
        }
    });
}
