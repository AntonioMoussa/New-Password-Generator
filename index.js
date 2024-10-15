document.addEventListener("DOMContentLoaded", function () {
  const passwordDisplay = document.getElementById("generated-password");
  const lengthSlider = document.querySelector(".slider");
  const lengthValue = document.getElementById("length-value");
  const uppercaseCheckbox = document.getElementById("uppercase");
  const lowercaseCheckbox = document.getElementById("lowercase");
  const numbersCheckbox = document.getElementById("numbers");
  const symbolsCheckbox = document.getElementById("symbols");
  const generateButton = document.getElementById("generate-button");
  const copyButton = document.getElementById("copy-button");
  const strengthText = document.getElementById("strength-text");
  const bars = document.querySelectorAll(".bar");

  const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
  const NUMBER_CHARS = "0123456789";
  const SYMBOL_CHARS = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  strengthText.textContent = "";

  function generatePassword() {
    const length = parseInt(lengthSlider.value);
    let characterPool = "";
    let password = "";

    if (uppercaseCheckbox.checked) {
      characterPool += UPPERCASE_CHARS;
    }
    if (lowercaseCheckbox.checked) {
      characterPool += LOWERCASE_CHARS;
    }
    if (numbersCheckbox.checked) {
      characterPool += NUMBER_CHARS;
    }
    if (symbolsCheckbox.checked) {
      characterPool += SYMBOL_CHARS;
    }

    if (characterPool.length === 0) {
      alert("Please select at least one character type!");
      return "";
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      password += characterPool[randomIndex];
    }

    return password;
  }

  function updateStrengthMeter(password) {
    let strength = 0;

    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    let strengthLevel;
    let barColor;

    switch (strength) {
      case 1:
        strengthLevel = "WEAK";
        barColor = "#b1e5f0";
        break;
      case 2:
        strengthLevel = "MEDIUM";
        barColor = "#44c5ec";
        break;
      case 3:
        strengthLevel = "STRONG";
        barColor = "#204687";
        break;
      case 4:
        strengthLevel = "VERY STRONG";
        barColor = "#17255e";
        break;
      default:
        strengthLevel = "VERY WEAK";
        barColor = "#8c91ba";
    }

    strengthText.textContent = strengthLevel;

    bars.forEach((bar, index) => {
      bar.classList.toggle("filled", index < strength);
      if (index < strength) {
        bar.style.backgroundColor = barColor;
        bar.style.borderColor = "#b1e5f0";
      } else {
        bar.style.backgroundColor = "transparent";
        bar.style.borderColor = "#b1e5f0";
      }
    });
  }

  lengthSlider.addEventListener("input", function () {
    lengthValue.textContent = lengthSlider.value;
  });

  generateButton.addEventListener("click", function () {
    const password = generatePassword();
    passwordDisplay.value = password;

    if (password) {
      updateStrengthMeter(password);
    } else {
      strengthText.textContent = "";
    }
  });

  copyButton.addEventListener("click", function () {
    passwordDisplay.select();
    document.execCommand("copy");
    alert("Password copied to clipboard!");
  });
});
