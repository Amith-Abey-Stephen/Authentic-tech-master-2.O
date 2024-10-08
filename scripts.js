document.addEventListener('DOMContentLoaded', function() {
    
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
        document.querySelectorAll("#about .about-content").forEach(item => {
            if (isInViewport(item)) {
                item.classList.add("visible");
            }
            // else {console.log("Error loading something")}

        });
    }

    // Event listener for scroll and resize to check visibility
    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);

    // Initial check on page load
    checkVisibility();


    // Schedule section functionality
    const scheduleSection = document.getElementById('schedule');
    const events = document.querySelectorAll('.event');
    const verticalLine = document.querySelector('.vertical-line');

    function handleScroll() {
        const sectionTop = scheduleSection.offsetTop;
        const sectionHeight = scheduleSection.offsetHeight;
        const scrollPosition = window.pageYOffset;

        // Calculate the progress of scrolling through the section
        const progress = (scrollPosition - sectionTop) / sectionHeight;
        const lineHeight = Math.min(Math.max(progress * 100, 0), 85);
        verticalLine.style.height = `${lineHeight}%`;

        // Event animations based on the vertical line's height
        events.forEach((event, index) => {
            const eventPosition = (index + 0.2) / events.length * 85; // Map event position to the vertical line height (0-85%)
            if (lineHeight >= eventPosition) {
                event.style.opacity = '1';
                event.style.transform = 'translateX(0)';
            } else {
                event.style.opacity = '0';
                event.style.transform = index % 2 === 0 ? 'translateX(-100px)' : 'translateX(100px)';
            }
        });
    }

    // Initial styles for events
    events.forEach((event, index) => {
        event.style.opacity = '0';
        event.style.transform = index % 2 === 0 ? 'translateX(-100px)' : 'translateX(100px)';
        event.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Initialize vertical line
    verticalLine.style.height = '0%';
    verticalLine.style.transition = 'height 0.5s ease-out';

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Initial call to set up the animations
    handleScroll();

});
