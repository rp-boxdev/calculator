let currentNumber = "";
let operator = "";
let firstOperand = "";
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
  operator = "";
  firstOperand = "";
  pendingOperation = false;
}

function calculate() {
  const display = document.getElementById("display");
  if (operator && currentNumber) {
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
  }
}

function setOperator(op) {
  if (currentNumber) {
    operator = op;
    firstOperand = parseFloat(currentNumber);
    currentNumber = "";
    pendingOperation = true;
  }
}
