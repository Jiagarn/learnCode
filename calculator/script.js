const numberButton = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");

const currentScreenTextElement = document.querySelector(
  "[data-operand-current]"
);
const previousScreenTextElement = document.querySelector(
  "[data-operand-previous]"
);

class Calculator {
  constructor(currentScreenTextElement, previousScreenTextElement) {
    this.currentScreenTextElement = currentScreenTextElement;
    this.previousScreenTextElement = previousScreenTextElement;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = null;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  flushOperator(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand != "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const previous = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = previous + current;
        break;
      case "-":
        computation = previous - current;
        break;
      case "x":
        computation = previous * current;
        break;
      case "/":
        if (current === 0) {
          alert("Cannot divide by zero!");
          return;
        }
        computation = previous / current;
        break;
      default:
        return;
    }

    this.currentOperand = computation;
    this.previousOperand = ""; // You can keep it if chaining is desired
    this.operation = null;
  }

  updateDisplay() {
    this.currentScreenTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousScreenTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousScreenTextElement.innerText = this.previousOperand; // Clear previous screen when no operation
    }
  }
}

document.addEventListener("keydown", (event) => {
  if (!isNaN(event.key)) {
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  }
  switch (event.key) {
    case "+":
    case "-":
    case "*":
    case "/":
      calculator.flushOperator(event.key);
      calculator.updateDisplay();
      break;
    case "Enter":
      calculator.compute();
      calculator.updateDisplay();
      break;
    case "=":
      calculator.compute();
      calculator.updateDisplay();
      break;
    case "Backspace":
      calculator.delete();
      calculator.updateDisplay();
      break;
    case "Escape":
      calculator.clear();
      calculator.updateDisplay();
      break;
  }
});

const calculator = new Calculator(
  currentScreenTextElement,
  previousScreenTextElement
);

numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.flushOperator(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
