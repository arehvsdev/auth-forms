// variables for tab section
const loginTab = document.getElementById("tabLogin");
const signupTab = document.getElementById("tabSignup");

// variables for forms
const signinForm = document.getElementById("signinForm");
const signupForm = document.getElementById("signupForm");

// variables for buttons
const signInBtn = document.getElementById("signInBtn");
const signUpBtn = document.getElementById("signUpBtn");

// variables for password eye icon
const passEyeIcon = document.getElementById("passEyeIcon");
const passEyeSlashIcon = document.getElementById("passEyeSlashIcon");
const confirmPassEyeIcon = document.getElementById("confirmPassEyeIcon");
const confirmPassEyeSlashIcon = document.getElementById("confirmPassEyeSlashIcon");

// variables for input fields
const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNumber");
const locationInput = document.getElementById("location");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// alerts
const fullNameError = document.getElementById("fullNameError");
const emailError = document.getElementById("emailError");
const phoneNumberError = document.getElementById("phoneNumberError");
const locationError = document.getElementById("locationError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const loginError = document.getElementById("loginError");
const loginMessage = document.getElementById("loginMessage");
const signupMessage = document.getElementById("signupMessage");
const signupError = document.getElementById("signupError");



if (loginTab && signupTab && signinForm && signupForm) {
    loginTab.addEventListener("click", () => {
        loginTab.classList.add("active-tab");
        signupTab.classList.remove("active-tab-right");

        signinForm.classList.remove("d-none");
        signupForm.classList.add("d-none");
        loginError.classList.add("d-none");
        loginMessage.classList.add("d-none");
        signupMessage.classList.add("d-none");
    });

    signupTab.addEventListener("click", () => {
        signupTab.classList.add("active-tab-right");
        loginTab.classList.remove("active-tab");

        signupForm.classList.remove("d-none");
        signinForm.classList.add("d-none");
    });
}

signInBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const emailVal = inputEmail.value.trim();
    const passwordVal = inputPassword.value.trim();
    if (validateLoginForm(emailVal, passwordVal)) {
        const user = await fetch(`https://69ba81c2b3dcf7e0b4bd2e74.mockapi.io/api/v1/users?username=${emailVal}&password=${passwordVal}`);
        const userData = await user.json();
        if (userData.length == 1) {
            localStorage.setItem('userData', JSON.stringify(userData[0]))
            window.location.href = "tourist-landing.html";
        } else {
            localStorage.removeItem('userData');
            loginError.classList.remove("d-none");
            loginError.textContent = "Invalid email or password";
        }
    }

    setTimeout(() => {
        loginError.classList.add("d-none")
    }, 2000);
});

function validateLoginForm(email, password) {
    if (email === "" || password === "") {
        loginError.classList.remove("d-none");
        loginError.textContent = "Please enter email and password";
        return false;
    }
    if (!validateEmail(email)) {
        loginError.classList.remove("d-none");
        loginError.textContent = "Please enter a valid email address";
        return false;
    }
    return true;
}

signUpBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const fullNameValue = fullName.value.trim();
    const emailValue = email.value.trim();
    const phoneNumberValue = phoneNumber.value.trim();
    const locationValue = locationInput.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    const errorArray = [fullNameError, emailError, phoneNumberError, locationError, passwordError, confirmPasswordError];
    errorArray.forEach(error => {
        error.classList.add("d-none");
        error.classList.remove("d-block");
    });

    if (validateSignupForm(fullNameValue, emailValue, phoneNumberValue, locationValue, passwordValue, confirmPasswordValue)) {
        regisetUser(fullNameValue, emailValue, phoneNumberValue, locationValue, passwordValue, confirmPasswordValue);
    }

    setTimeout(() => {
        signupError.classList.add("d-none");
        signupError.classList.remove("d-block");

    }, 2000);

})

function validateSignupForm(fullNameValue, emailValue, phoneNumberValue, locationValue, passwordValue, confirmPasswordValue) {
    if (fullNameValue === "" || emailValue === "" || phoneNumberValue === "" || locationValue === "" || passwordValue === "" || confirmPasswordValue === "") {
        signupError.classList.remove("d-none");
        signupError.classList.add("d-block");
        signupError.textContent = "Please enter all the fields";
        return false;
    }
    if (passwordValue !== confirmPasswordValue) {
        confirmPasswordError.classList.remove("d-none");
        confirmPasswordError.classList.add("d-block");
        return false;
    }
    if (!validateEmail(emailValue)) {
        emailError.classList.remove("d-none");
        emailError.classList.add("d-block");
        return false;
    }
    if (!validatePhoneNumber(phoneNumberValue)) {
        phoneNumberError.classList.remove("d-none");
        phoneNumberError.classList.add("d-block");
        return false;
    }
    if (!validateLocation(locationValue)) {
        locationError.classList.remove("d-none");
        locationError.classList.add("d-block");
        return false;
    }
    if (!validatePassword(passwordValue)) {
        passwordError.classList.remove("d-none");
        passwordError.classList.add("d-block");
        return false;
    }
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhoneNumber(phoneNumber) {
    const phoneNumberRegex = /^[0-9]{10}$/;
    return phoneNumberRegex.test(phoneNumber);
}

function validateLocation(location) {
    const locationRegex = /^[a-zA-Z ]+$/;
    return locationRegex.test(location);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

async function regisetUser(fullNameValue, emailValue, phoneNumberValue, locationValue, passwordValue, confirmPasswordValue) {
    const user = await fetch(`https://69ba81c2b3dcf7e0b4bd2e74.mockapi.io/api/v1/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: fullNameValue,
            email: emailValue,
            phoneNumber: phoneNumberValue,
            location: locationValue,
            password: passwordValue,
            username: emailValue,
        }),
    });
    if (user.status == 201 && user.ok) {
        signupForm.classList.add("d-none");
        signupMessage.classList.remove("d-none");
        fullName.value = "";
        email.value = "";
        phoneNumber.value = "";
        locationInput.value = "";
        password.value = "";
        confirmPassword.value = "";
        setTimeout(() => {
            loginTab.click();
        }, 2000);
    } else {
        signupError.classList.remove("d-none");
        signupError.textContent = "Invalid username or password";
    }
}



// Toggle password visibility
function togglePasswordVisibility(inputElement, eyeIcon, eyeSlashIcon) {
    if (inputElement.type === "password") {
        inputElement.type = "text";
        eyeIcon.classList.add("d-none");
        eyeSlashIcon.classList.remove("d-none");
    } else {
        inputElement.type = "password";
        eyeIcon.classList.remove("d-none");
        eyeSlashIcon.classList.add("d-none");
    }
}

// Ensure the eye icons have listeners
const loginPassEyeIcon = document.getElementById("loginPassEyeIcon");
const loginPassEyeSlashIcon = document.getElementById("loginPassEyeSlashIcon");
if (loginPassEyeIcon) {
    loginPassEyeIcon.addEventListener("click", () => togglePasswordVisibility(inputPassword, loginPassEyeIcon, loginPassEyeSlashIcon));
    loginPassEyeSlashIcon.addEventListener("click", () => togglePasswordVisibility(inputPassword, loginPassEyeIcon, loginPassEyeSlashIcon));
}
if (passEyeIcon) {
    passEyeIcon.addEventListener("click", () => togglePasswordVisibility(password, passEyeIcon, passEyeSlashIcon));
    passEyeSlashIcon.addEventListener("click", () => togglePasswordVisibility(password, passEyeIcon, passEyeSlashIcon));
}
if (confirmPassEyeIcon) {
    confirmPassEyeIcon.addEventListener("click", () => togglePasswordVisibility(confirmPassword, confirmPassEyeIcon, confirmPassEyeSlashIcon));
    confirmPassEyeSlashIcon.addEventListener("click", () => togglePasswordVisibility(confirmPassword, confirmPassEyeIcon, confirmPassEyeSlashIcon));
}