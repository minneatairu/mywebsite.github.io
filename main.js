// header - START
document.addEventListener("DOMContentLoaded", function () {
    
    // Creating header through JS and showing on all pages
    let header = document.createElement("div");
    header.classList.add("menu-header");

    // HOMEPAGE link
    let linkHome =  document.createElement("a");
    linkHome.href = 'https://minneatairu.com';
    linkHome.innerText = "MINNE ATAIRU";

    // BIOGRAPHY link
    let linkBiography =  document.createElement("a");
    linkBiography.href = 'biography';
    linkBiography.innerText = "BIOGRAPHY";

    // EVENTS link
    let linkEvents =  document.createElement("a");
    linkEvents.href = 'events';
    linkEvents.innerText = "EVENTS";
  
    header.appendChild(linkHome)
    header.appendChild(linkBiography)
    header.appendChild(linkEvents)

    document.getElementById('header-container').appendChild(header);

});
// header - END

  
// CAROUSEL: HOME
document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const counter = document.querySelector('.carousel-counter');
    let currentItem = 0; // Start with the first item

    const updateCounter = () => {
        counter.textContent = `${currentItem + 1}/${totalItems}`;
    };

    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');

    const changeItem = (next) => {
        items[currentItem].classList.remove('active'); // Hide the current item
        currentItem += next ? 1 : -1; // Determine the next item index
        if (currentItem >= totalItems) { currentItem = 0; } // Loop to start if at the end
        if (currentItem < 0) { currentItem = totalItems - 1; } // Loop to end if at the start
        items[currentItem].classList.add('active'); // Show the new item
        updateCounter();
    };

    nextButton.addEventListener('click', () => changeItem(true));
    prevButton.addEventListener('click', () => changeItem(false));

    // Initial setup
    items[0].classList.add('active'); // Show the first item initially
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
  
// accordion

     function toggleAccordion(element) {
            var content = element.nextElementSibling;
            element.classList.toggle("active"); // Toggle the active class for smooth background color transition
            if (content.style.maxHeight) {
                content.style.maxHeight = null; // Close the accordion content
            } else {
                content.style.maxHeight = content.scrollHeight + "px"; // Open or close the accordion content smoothly
            }
        }

     // JavaScript to hide the caption after 15 seconds
     document.addEventListener("DOMContentLoaded", function() {
        setTimeout(function() {
            var caption = document.querySelector(".video-caption");
            if (caption) {
                caption.style.display = "none";
            }
        }, 45000); // 15 seconds
    });

    document.addEventListener("DOMContentLoaded", function() {
        var index = 0; // Start at the first slide
        var slides = document.getElementsByClassName("page-carousel-item");
        var prev = document.getElementById("prev");
        var next = document.getElementById("next");
    
        function showSlide(n) {
            // Hide all slides
            for (var i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            // Show the specified slide
            slides[n].style.display = "block";
        }
    
        function nextSlide() {
            index++;
            if (index >= slides.length) index = 0; // Loop back to first slide
            showSlide(index);
        }
    
        function prevSlide() {
            index--;
            if (index < 0) index = slides.length - 1; // Loop back to last slide
            showSlide(index);
        }
    
        // Initial display
        showSlide(index);
    
        // Event listeners for next and previous
        next.addEventListener("click", nextSlide);
        prev.addEventListener("click", prevSlide);
    });
    