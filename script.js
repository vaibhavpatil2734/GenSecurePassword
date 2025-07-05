const generateButton = document.getElementById("generateButton");
const copyButton = document.getElementById("copyButton");
const toggleButton = document.getElementById("toggleVisibility");
const show = document.querySelector(".show");
const passwordInput = document.getElementById("password");
const passwordLengthInput = document.getElementById("passwordLength");
const userTextInput = document.getElementById("userText");

const includeLowercase = document.getElementById("includeLowercase");
const includeUppercase = document.getElementById("includeUppercase");
const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");

const strengthIndicator = document.getElementById("strengthIndicator");

toggleButton.onclick = function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleButton.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        toggleButton.textContent = "Show";
    }
};

generateButton.onclick = function generatePassword() {
    let characterSet = "";

    if (includeLowercase.checked) characterSet += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase.checked) characterSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers.checked) characterSet += "0123456789";
    if (includeSymbols.checked) characterSet += "!@#$%^&*_";

    if (characterSet === "") {
        alert("Please select at least one character type.");
        return;
    }

    let pwdLength = parseInt(passwordLengthInput.value) || 16;
    let userText = userTextInput.value.trim();
    let password = "";

    pwdLength = Math.max(8, Math.min(20, pwdLength));

    const maxUserTextLength = Math.floor(pwdLength / 2);
    if (userText.length > maxUserTextLength) {
        alert(`The provided custom text is more than 50% of password length.`);
        return;
    }

    let remainingLength = pwdLength - userText.length;
    let beforeLength = Math.floor(remainingLength / 2);
    let afterLength = remainingLength - beforeLength;

    let beforeText = "", afterText = "";
    for (let i = 0; i < beforeLength; i++) {
        let rand = Math.floor(Math.random() * characterSet.length);
        beforeText += characterSet.charAt(rand);
    }
    for (let i = 0; i < afterLength; i++) {
        let rand = Math.floor(Math.random() * characterSet.length);
        afterText += characterSet.charAt(rand);
    }

    password = beforeText + userText + afterText;
    passwordInput.value = password;

    evaluateStrength(password);
};

function evaluateStrength(password) {
    let score = 0;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (password.length >= 12) score++;

    let strength = "";
    if (score <= 2) {
        strength = "Weak";
        strengthIndicator.style.color = "red";
    } else if (score === 3 || score === 4) {
        strength = "Medium";
        strengthIndicator.style.color = "orange";
    } else {
        strength = "Strong";
        strengthIndicator.style.color = "green";
    }

    strengthIndicator.textContent = `Strength: ${strength}`;
}

copyButton.onclick = function copyPwd() {
    const passwordValue = passwordInput.value;

    if (passwordValue.trim() === "") {
        alert("Password is empty. Generate a password first.");
    } else {
        navigator.clipboard.writeText(passwordValue).then(function () {
            show.innerHTML = "Password copied to clipboard!";
            show.classList.add("active");
            setTimeout(() => {
                show.classList.remove("active");
            }, 2000);
            passwordInput.value = "";
            strengthIndicator.textContent = "";
        }).catch(function () {
            alert("Failed to copy password. Try again.");
        });
    }
};
