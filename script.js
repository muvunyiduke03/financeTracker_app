const transactionForm = document.getElementById("transactionForm");
const transactionList = document.getElementById("transactionList");
const allIncome = document.getElementById("totalIncome");
const allExpenses = document.getElementById("totalExpenses");
const myBalance = document.getElementById("balance");
const myBooks = document.getElementById("booksList");


let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateSummary() {
  let income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum +t.amount, 0);

  let expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = income - expense;

  allIncome.textContent = income.toLocaleString();
  allExpenses.textContent = expense.toLocaleString();
  myBalance.textContent = balance.toLocaleString();
}

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function makeTransactions() {
  transactionList.innerHTML = "";
  transactions.forEach(tx => {
    const li = document.createElement("li");
    li.textContent = `${tx.description}: RWF ${tx.amount.toLocaleString()} (${tx.type})`;
    transactionList.appendChild(li);
  });
}

transactionForm.addEventListener("submit", e => {
  e.preventDefault();
  const description = document.getElementById("description").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!description || isNaN(amount) || amount <= 0) return;

  transactions.push({description, amount, type});
  saveTransactions();
  makeTransactions();
  updateSummary();
  transactionForm.reset();
});

function fetchBooks() {
  fetch("https://openlibrary.org/subjects/personal_finance.json?limit=5")
    .then(res => res.json())
    .then(data => {
      data.works.forEach(book => {
        const li = document.createElement("li");
        li.className = "booksItems";

        const link = document.createElement("a");
        link.href = `https://openlibrary.org${book.key}`;
        link.textContent = book.title;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = "booksLink"
        
        li.appendChild(link);
        myBooks.appendChild(li);
      });
    })
    .catch(err => console.error("Books API Error", err));
}

fetchBooks();

makeTransactions();
updateSummary();

// to refresh the page
const refreshPage = document.getElementById("home");
if (refreshPage) {
  refreshPage.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.reload();
  });
}