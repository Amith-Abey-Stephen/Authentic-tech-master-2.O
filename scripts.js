document.addEventListener('DOMContentLoaded', function() {
    const schedulesec = document.getElementById('schedulesec');
    const body = document.body;
    const scrollThreshold = 10; // Adjust this value as needed

    function updateScrollBehavior() {
        // Check if the horizontal scroll is at or near the left edge
        if (schedulesec.scrollLeft <= scrollThreshold) {
            // At the left edge, hide horizontal scrollbar and enable vertical scrolling
            schedulesec.style.overflowX = 'hidden';
            body.style.overflowY = 'auto';
        } else {
            // Not at the left edge, enable horizontal scrollbar and disable vertical scrolling
            schedulesec.style.overflowX = 'scroll';
            body.style.overflowY = 'hidden';
        }
    }

    // Scroll event listener for horizontal scroll behavior
    schedulesec.addEventListener('scroll', updateScrollBehavior);

    // Handle horizontal scrolling with the mouse wheel
    schedulesec.addEventListener('wheel', (event) => {
        if (event.deltaY !== 0) {
            // Scroll horizontally based on vertical mouse wheel movement
            schedulesec.scrollLeft += event.deltaY;
            event.preventDefault(); // Prevent default vertical scroll
        }
    });

    // Initialize scroll behavior
    updateScrollBehavior();

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
