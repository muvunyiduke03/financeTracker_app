const themeBtn = document.getElementById("changeTheme");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
});

const transactionForm = document.getElementById("transactionForm");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const transactionList = document.getElementById("transactionList");
const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");
const balance = document.getElementById("balance");
const usdRate = document.getElementById("usdRate");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let exchangeRate = null;

function makeTransactions() {
  transactionList.innerHTML = "";
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = `${t.type === "income" ? "+" : "-"} ${t.amount} RWF - ${t.description}`;
    transactionList.appendChild(li);

    if (t.type === "income") income += parseFloat(t.amount);
    else expense += parseFloat(t.amount);
  });

  const netBalance = income - expense;

  totalIncome.textContent = income.toFixed(2);
  totalExpense.textContent = expense.toFixed(2);
  balance.textContent = `${netBalance.toFixed(2)} RWF`;

  // converted balance
  if (exchangeRate) {
    const usdEquivalent = (netBalance / exchangeRate).toFixed(2);
    const usdDiv = document.getElementById("usdBalance");
    if (usdDiv) {
      usdDiv.textContent = `≈ ${usdEquivalent} USD`;
    } else {
      const newDiv = document.createElement("p");
      newDiv.id = "usdBalance";
      newDiv.style.color = "#555";
      newDiv.textContent = `≈ ${usdEquivalent} USD`;
      balance.parentElement.appendChild(newDiv);
    }
  }
}

function fetchExchangeRate() {
  usdRate.textContent = "Loading...";
  fetch("https://api.exchangerate.host/latest?base=USD&symbols=RWF")
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      if (data.rates && data.rates.RWF) {
        exchangeRate = data.rates.RWF;
        usdRate.textContent = exchangeRate.toFixed(2);
        makeTransactions();
      } else{
        usdRate.textContent = "Unavailable";
      }
    })
    .catch(err => {
      console.error("Exchange Rate error:", err);
      usdRate.textContent = "Error Loading";
    });
}

transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTransaction = {
    description: description.value,
    amount: parseFloat(amount.value),
    type: type.value,
  };

  if (isNaN(newTransaction.amount) || newTransaction.amount <= 0) {
    alert("Please enter an amount greater than 0.");
    return;
  }

  transactions.push(newTransaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  makeTransactions();
  transactionForm.reset();
});

makeTransactions();
fetchExchangeRate();