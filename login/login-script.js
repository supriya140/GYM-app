document.addEventListener('DOMContentLoaded', function() {
    const loginToggle = document.getElementById('login-toggle');
    const signupToggle = document.getElementById('signup-toggle');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    // Password toggle elements
    const passwordInput = document.getElementById('signup-password');
    const passwordToggleBtn = document.getElementById('password-toggle-btn');

    // Signup form specific elements
    const createAccountBtn = document.getElementById('create-account-btn');
    const signupOtpSection = document.getElementById('signup-otp-section');
    const signupSubmitBtn = document.getElementById('signup-submit-btn');

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
    
    // --- Enforce Numeric Input for Phone and OTP fields ---
    function enforceNumericInput(selector) {
        document.querySelectorAll(selector).forEach(input => {
            input.addEventListener('input', function(e) {
                this.value = this.value.replace(/[^\d]/g, '');
            });
        });
    }
    enforceNumericInput('#login-phone, #signup-phone, .otp-input');


    // --- OTP Input Auto-Focus Logic ---
    function setupOtpInputs(container) {
        const otpInputs = container.querySelectorAll('.otp-input');
        otpInputs.forEach((input, index) => {
            input.addEventListener('input', () => {
                if (input.value.length === 1 && index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
                    otpInputs[index - 1].focus();
                }
            });
        });
    }

    setupOtpInputs(document.getElementById('login-otp-section'));
    setupOtpInputs(document.getElementById('signup-otp-section')); // Changed from modal

    // --- Login Flow ---
    window.sendOtp = function(formType) {
        if (formType === 'login') {
            const phone = document.getElementById('login-phone').value;
            if (phone.length === 10) { 
                console.log(`Sending OTP to ${phone}`);
                document.getElementById('login-otp-section').classList.remove('hidden');
                document.getElementById('login-submit-btn').classList.remove('hidden');
                document.querySelector('#login-form button[onclick*="sendOtp"]').classList.add('hidden');
            } else {
                alert('Please enter a valid 10-digit phone number.');
            }
        }
    };

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const otp = Array.from(document.querySelectorAll('#login-otp-section .otp-input')).map(input => input.value).join('');
        const phone = document.getElementById('login-phone').value;
        console.log(`Logging in with Phone: ${phone}, OTP: ${otp}`);
        alert(`Login successful for ${phone}!`);
        loginForm.reset();
        document.getElementById('login-otp-section').classList.add('hidden');
        document.getElementById('login-submit-btn').classList.add('hidden');
        document.querySelector('#login-form button[onclick*="sendOtp"]').classList.remove('hidden');
    });

    // --- Create Account Flow (No Modal) ---
    createAccountBtn.addEventListener('click', () => {
        // Validate all required fields before showing OTP
        const name = document.getElementById('signup-name').value;
        const age = document.getElementById('signup-age').value;
        const gender = document.getElementById('signup-gender').value;
        const phone = document.getElementById('signup-phone').value;
        const password = document.getElementById('signup-password').value;

        if (!name || !age || !gender || !password || phone.length !== 10) {
            alert('Please fill in all required fields, ensuring the mobile number is 10 digits.');
            return;
        }
        
        // If validation passes, show the inline OTP section
        console.log(`Sending OTP to ${phone} for account creation.`);
        createAccountBtn.classList.add('hidden');
        signupOtpSection.classList.remove('hidden');
        signupSubmitBtn.classList.remove('hidden');
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // This handler now processes the final submission with OTP
        const otp = Array.from(document.querySelectorAll('#signup-otp-section .otp-input')).map(input => input.value).join('');
        if (otp.length === 4) {
            console.log('Account creation verified with OTP.');
            alert('Account created successfully!');
            signupForm.reset();
            // Reset the form to its initial state
            createAccountBtn.classList.remove('hidden');
            signupOtpSection.classList.add('hidden');
            signupSubmitBtn.classList.add('hidden');
            // Optionally switch to the login form
            loginToggle.click();
        } else {
            alert('Please enter the complete 4-digit OTP.');
        }
    });
    
    // --- Password Visibility Toggle ---
    passwordToggleBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('.eye-open').classList.toggle('hidden');
        this.querySelector('.eye-closed').classList.toggle('hidden');
    });
});
