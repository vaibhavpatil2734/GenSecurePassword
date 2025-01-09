const generateButton = document.getElementById("generateButton");
const copyButton = document.getElementById("copyButton");
const show = document.querySelector(".show");
const passwordInput = document.getElementById("password");
const passwordLengthInput = document.getElementById("passwordLength");
const userTextInput = document.getElementById("userText");

generateButton.onclick = function generatePassword() {
    const character = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_";
    let pwdLength = parseInt(passwordLengthInput.value) || 16;
    let userText = userTextInput.value.trim();
    let password = "";

    // Ensure password length is between 8 and 20
    pwdLength = Math.max(8, Math.min(20, pwdLength));

    // Validate that user-provided text does not exceed half the password length
    const maxUserTextLength = Math.floor(pwdLength / 2);
    if (userText.length > maxUserTextLength) {
        alert(`The provided custom text is more than 50%`);
        return;
    }

    // Calculate lengths for characters before and after the user-provided text
    let remainingLength = pwdLength - userText.length;
    let beforeLength = Math.floor(remainingLength / 2);
    let afterLength = remainingLength - beforeLength;

    // Generate random characters before and after the user-provided text
    let beforeText = "";
    let afterText = "";
    for (let i = 0; i < beforeLength; i++) {
        let generatePwd = Math.floor(Math.random() * character.length);
        beforeText += character.substring(generatePwd, generatePwd + 1);
    }
    for (let i = 0; i < afterLength; i++) {
        let generatePwd = Math.floor(Math.random() * character.length);
        afterText += character.substring(generatePwd, generatePwd + 1);
    }

    // Combine parts to form the final password
    password = beforeText + userText + afterText;

    passwordInput.value = password;
};

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
        }).catch(function () {
            alert("Failed to copy password. Try again.");
        });
    }
};
