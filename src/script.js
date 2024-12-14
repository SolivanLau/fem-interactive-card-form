import "./styles/styles.scss";

const form = document.querySelector("#credit-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
});

// NAME INPUT:

const nameInput = document.querySelector("#name");
const nameText = document.querySelector(".card__text--name");
nameInput.addEventListener("input", (e) => {
    nameText.textContent = e.target.value;
});

nameInput.addEventListener("blur", (e) => {
    if (!e.target.value) {
        nameText.textContent = "Jane Appleseed";
    }
});

// NUMBER INPUT:
// sets a preset value on focus
const numberInputFocus = (input, presetValue) => {
    if (!input.value) {
        input.value = presetValue;
        input.setSelectionRange(0, 0);
        console.log(input.value);
        console.log(input.value.length);
    }
};
// clears only preset value on blur
const numberInputBlur = (input, initialValue) => {
    if (input.value === initialValue) {
        input.value = "";
    }
};

const validateNumberInput = (input, event, errorMessage, parentNode) => {
    // OPTIONAL PARENT NODE or input.parentElement which is used in most cases
    const responseElement = parentNode
        ? parentNode.querySelector(".form__response")
        : input.parentElement.querySelector(".form__response");

    if (event.data && !/^[0-9]$/.test(event.data)) {
        console.log(`ERROR MESSAGE TO BE DISPLAYED: ${errorMessage}`);

        console.log(input.parentElement);

        // TO DO: display error message.
        responseElement.textContent = errorMessage;
        event.preventDefault();
    }
};
// card number input
const cardNumberInput = document.querySelector("#card-number");
const cardNumberText = document.querySelector(".card__text--card-number");

cardNumberInput.addEventListener("focus", () => {
    numberInputFocus(cardNumberInput, "0000 0000 0000 0000");
});

cardNumberInput.addEventListener("blur", () => {
    numberInputBlur(cardNumberInput, "0000 0000 0000 0000");
});

// Check and respond to invalid characters
cardNumberInput.addEventListener("beforeinput", (e) => {
    validateNumberInput(cardNumberInput, e, "Wrong format, numbers only.");
});

cardNumberInput.addEventListener("input", (e) => {
    const cursorPosition = e.target.selectionStart;
    console.log(cursorPosition + " CURRENT CURSOR");
    console.log(cursorPosition + 1 + " NEXT CURSOR");
    let value = e.target.value.replace(/\D/g, "");
    // Split value at cursor and combine with new input

    // Combine and pad to 16

    value = value.slice(0, 16).padEnd(16, "0");
    console.log(value);
    // format as 0000 0000 0000 0000
    let formattedValue = value.match(/.{1,4}/g).join(" ");
    // console.log(formattedValue.length);
    console.log(formattedValue);

    e.target.value = formattedValue;
    cardNumberText.textContent = formattedValue;
    // Check if current position is a space
    if (cursorPosition % 5 === 4) {
        // If it's a space position
        e.target.setSelectionRange(cursorPosition + 1, cursorPosition + 1); // Skip to next number
    } else {
        e.target.setSelectionRange(cursorPosition, cursorPosition);
    }
});

// EXP inputs

const expMonthInput = document.querySelector("#exp-month");
const expYearInput = document.querySelector("#exp-year");

// MONTH
expMonthInput.addEventListener("focus", () => {
    numberInputFocus(expMonthInput, "00");
});

expMonthInput.addEventListener("blur", () => {
    numberInputBlur(expMonthInput, "00");
});
expMonthInput.addEventListener("beforeinput", (e) => {
    validateNumberInput(
        expMonthInput,
        e,
        "Wrong format, numbers only.",
        expMonthInput.closest("fieldset")
    );
});

// YEAR
expYearInput.addEventListener("focus", () => {
    numberInputFocus(expYearInput, "00");
});

expYearInput.addEventListener("blur", () => {
    numberInputBlur(expYearInput, "00");
});

expYearInput.addEventListener("beforeinput", (e) => {
    validateNumberInput(
        expYearInput,
        e,
        "Wrong format, numbers only.",
        expYearInput.closest("fieldset")
    );
});

// CVC
const cvcInput = document.querySelector("#cvc");

cvcInput.addEventListener("focus", () => {
    numberInputFocus(cvcInput, "000");
});

cvcInput.addEventListener("blur", () => {
    numberInputBlur(cvcInput, "000");
});

cvcInput.addEventListener("beforeinput", (e) => {
    validateNumberInput(cvcInput, e, "Wrong format, numbers only.");
});
