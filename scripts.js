document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector(".navbar .hamburger");
    const navLinks = document.querySelector(".navbar .nav-links");
    const aboutitems = document.querySelectorAll("#about div");
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
            console.log("Hamburger clicked"); // Add this line for debugging
        });

        document.querySelectorAll(".navbar .nav-links li").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        }));
    } else {
        console.error("Hamburger or nav-links not found"); // Add this line for debugging
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
        aboutitems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add("visible");
            } 
            // else {
            //     item.classList.remove("visible");
            // }
        });
    }

    // Event listener for scroll and resize to check visibility
    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);

    // Initial check on page load
    checkVisibility();
});