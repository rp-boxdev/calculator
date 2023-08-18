let currentNumber = "";
let operator = null;
let firstOperand = null;
let pendingOperation = false;

// Add an event listener to the whole document to detect key presses
document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
  const key = event.key;

  // Map keys to calculator actions
  switch (key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      appendToDisplay(key);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      setOperatorByKey(key);
      break;
    case "=":
    case "Enter":
      calculate();
      break;
    case "Escape":
    case "c":
      clearDisplay();
      break;
    case "Backspace":
      handleBackspace();
      break;
    case ".":
      handleDecimal();
      break;
  }
}

function setOperatorByKey(key) {
  let operatorButton;

  switch (key) {
    case "+":
      operatorButton = document.querySelector(".button.operator:nth-child(16)");
      break;
    case "-":
      operatorButton = document.querySelector(".button.operator:nth-child(12)");
      break;
    case "*":
      operatorButton = document.querySelector(".button.operator:nth-child(8)");
      break;
    case "/":
      operatorButton = document.querySelector(".button.operator:nth-child(4)");
      break;
  }

  if (operatorButton) {
    setOperator(operatorButton);
  }
}

function handleBackspace() {
  const display = document.getElementById("display");
  currentNumber = currentNumber.slice(0, -1);
  display.value = currentNumber;
}

function handleDecimal() {
  if (currentNumber.indexOf(".") === -1) {
    appendToDisplay(".");
  }
}

function appendToDisplay(value) {
  const display = document.getElementById("display");
  if (pendingOperation) {
    display.value = "";
    pendingOperation = false;
  }
  currentNumber += value;
  display.value = currentNumber;
}

function clearDisplay() {
  const display = document.getElementById("display");
  display.value = "";
  currentNumber = "";
  operator = null;
  firstOperand = null;
  pendingOperation = false;
  clearActiveOperatorButton();
}

function calculate() {
  const display = document.getElementById("display");
  if (operator !== null && currentNumber !== "") {
    const secondOperand = parseFloat(currentNumber);
    switch (operator) {
      case "+":
        firstOperand += secondOperand;
        break;
      case "-":
        firstOperand -= secondOperand;
        break;
      case "*":
        firstOperand *= secondOperand;
        break;
      case "/":
        if (secondOperand !== 0) {
          firstOperand /= secondOperand;
        } else {
          display.value = "NEVER!!!";
          return;
        }
        break;
    }
    // Round the result to 14 decimal places
    const roundedResult = Number(firstOperand.toFixed(14));
    display.value = roundedResult;
    currentNumber = roundedResult.toString();
    pendingOperation = true;
    operator = null;
    clearActiveOperatorButton(); // Clear active status after calculation
  }
}

function setOperator(opButton) {
  if (currentNumber !== "") {
    if (operator !== null) {
      calculate();
    }
    const operatorSymbol = opButton.textContent;
    operator = operatorSymbol === "÷" ? "/" : operatorSymbol;
    opButton.classList.add("active");
    firstOperand = parseFloat(currentNumber);
    currentNumber = "";
    pendingOperation = true;
  }
}

function clearActiveOperatorButton() {
  const activeOperatorButton = document.querySelector(
    ".button.operator.active"
  );
  if (activeOperatorButton) {
    activeOperatorButton.classList.remove("active");
  }
}
