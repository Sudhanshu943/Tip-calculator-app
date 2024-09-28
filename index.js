console.log("Connected to the console");

const inputBill = document.getElementById("input-bill");
const inputTip = document.getElementById("input-tip");
const inputPeople = document.getElementById("input-people");
const amountValue = document.getElementById("tip-amount-value");
const totalValue = document.getElementById("total-value");
const tipButtons = document.querySelectorAll("button[data-tip]");

const resetBtn = document.getElementById("reset-btn");
const peopleError = document.getElementById("people-error");
const inputBorderError = document.querySelector(".people-fild");

let selectedTip = 0;

// Function to calculate tip and total per person
function calculate() {
  let billValue = parseFloat(inputBill.value) || 0;
  let tipValue = selectedTip || parseFloat(inputTip.value) || 0;
  let peopleNum = parseFloat(inputPeople.value);

  if (peopleNum <= 0) {
    peopleError.style.display = "block";
    inputBorderError.classList.add("error");
    amountValue.textContent = "0.00";
    totalValue.textContent = "0.00";
  } else {
    inputBorderError.classList.remove("error");
    peopleError.style.display = "none";
  }

  let tip = (billValue * tipValue) / 100;
  let totalBill = billValue + tip;
  let tipAmount = tip / peopleNum;
  let total = totalBill / peopleNum;

  amountValue.textContent = tipAmount.toFixed(2);
  totalValue.textContent = total.toFixed(2);
}

// Add event listeners to all inputs
inputBill.addEventListener("input", calculate);
inputTip.addEventListener("input", () => {
  clearButtonSelection();
  calculate();
});
inputPeople.addEventListener("input", calculate);

// Add event listeners to tip buttons
tipButtons.forEach((button) => {
  button.addEventListener("click", function () {
    selectedTip = parseFloat(this.getAttribute("data-tip"));
    clearButtonSelection();
    this.classList.add("selected");
    calculate();
  });
});

function clearButtonSelection() {
  tipButtons.forEach((button) => {
    button.classList.remove("selected");
  });
}

resetBtn.addEventListener("click", () => {
  inputBill.value = "";
  inputPeople.value = "";
  inputTip.value = "";
  amountValue.textContent = "0.00";
  totalValue.textContent = "0.00";
  clearButtonSelection();
  peopleError.style.display = "none";
  inputBorderError.classList.remove("error");
});
