// script.js
console.log("STONEKEEPER Gym website script loaded.");

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


// --- Alert Box for Buttons ---
const signInButton = document.querySelector('.btn-signin');
if (signInButton) {
    signInButton.addEventListener('click', () => {
        showCustomAlert('Sign-in functionality coming soon!');
    });
}

const ctaButton = document.querySelector('.btn-cta');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        showCustomAlert('Free Pass redemption form coming soon!');
    });
}

function showCustomAlert(message) {
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    const alertBox = document.createElement('div');
    alertBox.className = 'custom-alert';
    alertBox.style.position = 'fixed';
    alertBox.style.top = '20px';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translateX(-50%)';
    alertBox.style.padding = '15px 25px';
    alertBox.style.backgroundColor = '#444444';
    alertBox.style.color = '#EDEDED';
    alertBox.style.border = '2px solid #DA0037';
    alertBox.style.borderRadius = '8px';
    alertBox.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    alertBox.style.zIndex = '2000';
    alertBox.style.textAlign = 'center';
    
    alertBox.innerHTML = `<p>${message}</p>`;
    
    document.body.appendChild(alertBox);

    setTimeout(() => {
        if (alertBox) {
            alertBox.style.transition = 'opacity 0.5s ease';
            alertBox.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(alertBox)) {
                    document.body.removeChild(alertBox);
                }
            }, 500);
        }
    }, 3000);
}
