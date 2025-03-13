"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: "standard",
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: "premium",
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

let currentAccount;
let sorted = false;

function updateUI() {
  displayMovements(currentAccount);
  displayBalance(currentAccount);
  displaySummary(currentAccount);
}

function displayMovements(account) {
  containerMovements.innerHTML = "";
  const combinedMovements = account.movements.map((mov, i) => ({
    movement: mov,
    movementDate: account.movementsDates.at(i),
  }));
  if (sorted) combinedMovements.sort((a, b) => a.movement - b.movement);
  combinedMovements.forEach((obj, i) => {
    const { movement, movementDate } = obj;
    const type = movement > 0 ? "deposit" : "withdrawal";
    const date = new Date(movementDate);
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    const displayDate = `${day}/${month}/${year}`;
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">
            ${i + 1} ${type}
          </div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${movement.toFixed(2)}</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

function displayBalance(account) {
  account.balance = account.movements.reduce(
    (previous, current) => previous + current,
    0
  );
  labelBalance.textContent = `${account.balance.toFixed(2)} EUR`;
}

function displaySummary(account) {
  const incomes = account.movements
    .filter((item) => item > 0)
    .reduce((prev, cur) => prev + cur, 0);
  const outcomes = account.movements
    .filter((item) => item < 0)
    .reduce((prev, cur) => prev + cur, 0);
  const interest = account.movements
    .filter((item) => item > 0)
    .map((item) => (item * account.interestRate) / 100)
    .filter((item) => item >= 1)
    .reduce((prev, curr) => prev + curr, 0);
  labelSumIn.innerHTML = `${incomes.toFixed(2)} EUR`;
  labelSumOut.innerHTML = `${Math.abs(outcomes.toFixed(2))} EUR`;
  labelSumInterest.innerHTML = `${interest.toFixed(2)} EUR`;
}

function displayTime() {
  const now = new Date();
  const day = `${now.getDate()}`.padStart(2, 0);
  const month = `${now.getMonth() + 1}`.padStart(2, 0);
  const year = now.getFullYear();
  const hours = `${now.getHours()}`.padStart(2, 0);
  const minutes = `${now.getMinutes()}`.padStart(2, 0);
  labelDate.textContent = `${day}/${month}/${year} ${hours}:${minutes}`;
}

function createUsernames(accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
}

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  currentAccount = accounts.find(
    (item) => item.username === inputLoginUsername.value
  );
  if (currentAccount?.pin !== Number(inputLoginPin.value)) {
    alert("Incorrect login and password data!!!");
    return;
  }
  labelWelcome.textContent = `Welcome back, ${
    currentAccount.owner.split(" ")[0]
  }`;
  containerApp.style.opacity = 100;
  inputLoginUsername.value = "";
  inputLoginPin.value = "";
  inputLoginUsername.blur();
  inputLoginPin.blur();
  updateUI();
});

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const sumToTransfer = Number(inputTransferAmount.value);
  const accToTransfer = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  if (!accToTransfer) return;
  if (sumToTransfer <= 0) return;
  if (currentAccount.balance < sumToTransfer) return;
  if (accToTransfer?.username === currentAccount.username) return;
  currentAccount.movements.push(-sumToTransfer);
  accToTransfer.movements.push(sumToTransfer);
  currentAccount.movementsDates.push(new Date().toISOString());
  accToTransfer.movementsDates.push(new Date().toISOString());
  inputTransferTo.value = "";
  inputTransferAmount.value = "";
  updateUI();
});

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const loanSum = Math.floor(inputLoanAmount.value);
  if (loanSum <= 0) return;
  if (!currentAccount.movements.some((mov) => mov >= loanSum * 0.1)) return;
  currentAccount.movements.push(loanSum);
  currentAccount.movementsDates.push(new Date().toISOString());
  inputLoanAmount.value = "";
  updateUI();
});

btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    inputCloseUsername.value !== currentAccount.username ||
    Number(inputClosePin.value) !== currentAccount.pin
  )
    return;
  const indexToDelete = accounts.findIndex(
    (acc) => acc.username === currentAccount.username
  );
  accounts.splice(indexToDelete, 1);
  inputCloseUsername.value = "";
  inputClosePin.value = "";
  containerApp.style.opacity = 0;
});

btnSort.addEventListener("click", () => {
  sorted = !sorted;
  updateUI();
});

createUsernames(accounts);
displayTime();

/* Practice */
console.log(
  `All acounts balance: ${accounts
    .flatMap((acc) => acc.movements)
    .reduce((prev, cur) => prev + cur)}`
);
console.log(Object.groupBy(accounts, ({ type }) => type));
