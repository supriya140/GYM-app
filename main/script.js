document.addEventListener('DOMContentLoaded', function() {
    const loginToggle = document.getElementById('login-toggle');
    const signupToggle = document.getElementById('signup-toggle');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const otpModal = document.getElementById('otp-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const signupAccountBtn = signupForm.querySelector('.btn-primary');

    // --- Form Toggling Logic ---
    loginToggle.addEventListener('click', () => {
        loginToggle.classList.add('active');
        signupToggle.classList.remove('active');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    });

    signupToggle.addEventListener('click', () => {
        signupToggle.classList.add('active');
        loginToggle.classList.remove('active');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    });

    // --- OTP Input Logic ---
    function setupOtpInputs(container) {
        const otpInputs = container.querySelectorAll('.otp-input');
        otpInputs.forEach((input, index) => {
            input.addEventListener('input', () => {
                // Move to next input if a digit is entered
                if (input.value.length === 1 && index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            });

            input.addEventListener('keydown', (e) => {
                // Move to previous input on backspace if current is empty
                if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
                    otpInputs[index - 1].focus();
                }
            });
        });
    }

    setupOtpInputs(document.getElementById('login-otp-section'));
    setupOtpInputs(document.getElementById('modal-otp-section'));

    // --- Login Flow ---
    window.sendOtp = function(formType) {
        if (formType === 'login') {
            const phone = document.getElementById('login-phone').value;
            if (phone.length >= 10) { // Simple validation
                console.log(`Sending OTP to ${phone}`);
                document.getElementById('login-otp-section').classList.remove('hidden');
                document.getElementById('login-submit-btn').classList.remove('hidden');
                document.querySelector('#login-form button[onclick*="sendOtp"]').classList.add('hidden');
            } else {
                showCustomAlert('Please enter a valid phone number.');
            }
        }
    };

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const otp = Array.from(document.querySelectorAll('#login-otp-section .otp-input')).map(input => input.value).join('');
        const phone = document.getElementById('login-phone').value;
        console.log(`Logging in with Phone: ${phone}, OTP: ${otp}`);
        
        // **UPDATED ALERT**
        showCustomAlert(`Sign in successful for ${phone}!`);
        
        loginForm.reset();
        document.getElementById('login-otp-section').classList.add('hidden');
        document.getElementById('login-submit-btn').classList.add('hidden');
        document.querySelector('#login-form button[onclick*="sendOtp"]').classList.remove('hidden');
    });

    // --- Create Account Flow & Modal ---
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const phone = document.getElementById('signup-phone').value;
        if (name && phone) {
            console.log('Account details captured, showing OTP modal for verification.');
            otpModal.classList.remove('hidden');
        } else {
            showCustomAlert('Please fill in all required fields.');
        }
    });

    closeModalBtn.addEventListener('click', () => {
        otpModal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        if (e.target === otpModal) {
            otpModal.classList.add('hidden');
        }
    });

    document.getElementById('verify-otp-btn').addEventListener('click', () => {
        const otp = Array.from(document.querySelectorAll('#modal-otp-section .otp-input')).map(input => input.value).join('');
        if (otp.length === 4) {
            console.log(`Verifying OTP: ${otp}`);
            showCustomAlert('Account created successfully!');
            otpModal.classList.add('hidden');
            signupForm.reset();
            loginToggle.click();
        } else {
            showCustomAlert('Please enter the complete 4-digit OTP.');
        }
    });

    // --- Custom Alert Box Function ---
    function showCustomAlert(message) {
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        const alertBox = document.createElement('div');
        alertBox.className = 'custom-alert';
        // Applying styles directly via JS
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
        alertBox.style.fontFamily = "'Poppins', sans-serif";

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
});
