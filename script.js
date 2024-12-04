const generateButton = document.getElementById("generateButton");
const copyButton = document.getElementById("copyButton");
const show = document.querySelector(".show");
const passwordInput = document.getElementById("password");
const passwordLengthInput = document.getElementById("passwordLength");

generateButton.onclick = function generatePassword() {
    const character = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_";
    let pwdLength = passwordLengthInput.value || 16;
    let password = "";

    pwdLength = Math.max(8, Math.min(20, pwdLength));

    for (let i = 0; i < pwdLength; i++) {
        let generatePwd = Math.floor(Math.random() * character.length);
        password += character.substring(generatePwd, generatePwd + 1);
    }

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
