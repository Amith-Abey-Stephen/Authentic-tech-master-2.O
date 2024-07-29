document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector(".navbar .hamburger");
    const navLinks = document.querySelector(".navbar .nav-links");

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
    
});