document.addEventListener('DOMContentLoaded', function() {
    const schedulesec = document.getElementById('schedulesec');
    const body = document.body;
    const scrollThreshold = 10; // Adjust this value as needed
    const verticalScrollAmount = 100; // Adjust vertical scroll amount as needed
    const scrollDuration = 200; // Duration of smooth scroll in milliseconds

    // Smooth scroll function
    function smoothScroll(element, to, duration) {
        const start = element.scrollLeft;
        const startTime = performance.now();
        const scroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            element.scrollLeft = start + (to - start) * progress;
            if (progress < 1) {
                requestAnimationFrame(scroll);
            }
        };
        requestAnimationFrame(scroll);
    }

    // Handle horizontal scrolling with the mouse wheel
    schedulesec.addEventListener('wheel', (event) => {
        if (event.deltaY !== 0) {
            // Scroll horizontally based on vertical mouse wheel movement
            const newScrollLeft = schedulesec.scrollLeft + event.deltaY;
            const maxScrollLeft = schedulesec.scrollWidth - schedulesec.clientWidth;

            smoothScroll(schedulesec, newScrollLeft, scrollDuration);

            // Check if the horizontal scroll is at or near the left or right edge
            if (newScrollLeft <= scrollThreshold) {
                // At the left edge, scroll vertically up
                window.scrollBy({
                    top: -verticalScrollAmount,
                    behavior: 'smooth'
                });
            } else if (newScrollLeft >= maxScrollLeft - scrollThreshold) {
                // At the right edge, scroll vertically down
                window.scrollBy({
                    top: verticalScrollAmount,
                    behavior: 'smooth'
                });
            }

            event.preventDefault(); // Prevent default vertical scroll
        }
    });

    // Sticky navbar functionality
    window.onscroll = function() {
        const header = document.getElementById("myHeader");
        const sticky = header.offsetTop;

        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    };

    // Hamburger menu functionality
    const hamburger = document.querySelector(".navbar .hamburger");
    const navLinks = document.querySelector(".navbar .nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        document.querySelectorAll(".navbar .nav-links li").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        }));
    } else {
        console.error("Hamburger or nav-links not found");
    }

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to loop through service items and add visible class if in viewport
    function checkVisibility() {
        document.querySelectorAll("#aboutus .about").forEach(item => {
            if (isInViewport(item)) {
                item.classList.add("visible");
            } 
        });
    }

    // Event listener for scroll and resize to check visibility
    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);

    // Initial check on page load
    checkVisibility();
});
