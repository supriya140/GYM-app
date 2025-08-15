// script.js
console.log("STONEKEEPER Gym homepage script loaded.");

// --- Mobile Menu Toggle ---
const hamburgerButton = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-menu');

// This code finds the hamburger button and the navigation menu in the HTML.
if (hamburgerButton && navMenu) {
    // It then waits for a user to click the hamburger button.
    hamburgerButton.addEventListener('click', () => {
        // When clicked, it adds or removes the 'active' class from both the button and the menu.
        hamburgerButton.classList.toggle('active');
        navMenu.classList.toggle('active');
        // The CSS file uses the 'active' class to show or hide the menu and swap the icons.
    });
}


// --- Mobile Dropdown Toggle ---
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const dropbtn = dropdown.querySelector('.dropbtn');
    
    if (dropbtn) {
        // This makes the dropdowns in the mobile menu work on tap.
        dropbtn.addEventListener('click', (event) => {
            if (window.innerWidth <= 768) {
                event.preventDefault(); 
                const parentDropdown = event.currentTarget.parentElement;
                parentDropdown.classList.toggle('active');
            }
        });
    }
});
