// script.js

// This file is ready for your future JavaScript functionality.
// For example, you could add:
// 1. A mobile navigation menu toggle.
// 2. Logic for the "Sign In" button to open a modal.
// 3. Dynamic loading of trainers or equipment from an API.

console.log("FlexFit Gym website script loaded.");

// Example: Add a click event listener to the sign-in button
const signInButton = document.querySelector('.btn-signin');

if (signInButton) {
    signInButton.addEventListener('click', () => {
        // In a real application, this would open a sign-in form or modal.
        // For now, we'll just log a message to the console.
        console.log('Sign In button clicked!');
        // We are using a custom alert box instead of window.alert
        // as window.alert() is often blocked by browsers.
        showCustomAlert('Sign-in functionality coming soon!');
    });
}

// A simple custom alert function to avoid using window.alert()
function showCustomAlert(message) {
    // Check if an alert box already exists
    if (document.querySelector('.custom-alert')) {
        return;
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

    // Automatically remove the alert after 3 seconds
    setTimeout(() => {
        alertBox.style.transition = 'opacity 0.5s ease';
        alertBox.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(alertBox);
        }, 500);
    }, 3000);
}
