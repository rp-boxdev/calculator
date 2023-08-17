let currentNumber = "";
let operator = null;
let firstOperand = null;
let pendingOperation = false;

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
          display.value = "Error";
          return;
        }
        break;
    }
    display.value = firstOperand;
    currentNumber = firstOperand.toString();
    pendingOperation = true;
    operator = null;
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
