// CAROUSEL: HOME
document.addEventListener("DOMContentLoaded", function () {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const carousel = document.querySelector('.carousel');
    let scrollAmount = 0;

    const getScrollWidth = () => {
        // Get the width of a single item (100% on mobile)
        return carousel.offsetWidth / (window.innerWidth <= 600 ? 1 : 3);
    };

    nextButton.addEventListener('click', () => {
        scrollAmount += getScrollWidth();
        carousel.scrollTo({
            top: 0,
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    prevButton.addEventListener('click', () => {
        scrollAmount -= getScrollWidth();
        carousel.scrollTo({
            top: 0,
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
});