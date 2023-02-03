const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const numberBtns = $$("[data-number]");
const oparationBtns = $$("[data-operation]");
const equalBtn = $("[data-equal]");
const deleteBtn = $("[data-delete]");
const clearAllBtn = $("[data-clear-all]");
const previousOperandTextElement = $("[data-previous-operand ]");
const currentOperandTextElement = $("[data-current-operand ]");

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previosOperand = "";
    this.operation = "";
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.currentOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previosOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computating;
    const prev = parseFloat(this.previosOperand);
    const current = parseFloat(this.currentOperand);
    switch (this.operation) {
      case "÷":
        computating = prev / current;
        break;
      case "x":
        computating = prev * current;
        break;
      case "+":
        computating = prev + current;
        break;
      case "-":
        computating = prev - current;
        break;
      default:
        return;
    }
    this.currentOperand = computating;
    this.operation = undefined;
    this.previosOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const intergerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let intergerDisplay;
    if (isNaN(intergerDigits)) {
      intergerDisplay = "";
    } else {
      intergerDisplay = intergerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${intergerDisplay}.${decimalDigits}`;
    } else {
      return intergerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previosOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

oparationBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalBtn.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearAllBtn.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
