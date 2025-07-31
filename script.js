const transactionForm = document.getElementById("transactionForm");
const transactionList = document.getElementById("transactionList");
const allIncome = document.getElementById("totalIncome");
const allExpenses = document.getElementById("totalExpenses");
const myBalance = document.getElementById("balance");
const myBooks = document.getElementById("booksList");


let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// --Update balance, income and expenses--
function updateSummary() {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum +t.amount, 0);

  const expense = transactions
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

// Entering transactions

function makeTransactions() {
  transactionList.innerHTML = "";
  transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach((tx, index) => {
      const li = document.createElement("li");
      li.className = tx.type === "income" ? "incomeItem" : "expenseItem";
      li.innerHTML = `
        <span>
          ${tx.description}: RWF ${tx.amount.toLocaleString()} (${tx.type})
        </span>
        <button class="deleteBtn" onclick="deleteTransaction">Delete</button>
        `;

      li.querySelector(".deleteBtn").onclick = () => {
        transactions.splice(index, 1);
        saveTransactions();
        makeTransactions();
        updateSummary();
      };

      transactionList.appendChild(li);
    });
}

// Handling transaction submission form

transactionForm.addEventListener("submit", e => {
  e.preventDefault();
  const description = document.getElementById("description").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!description || isNaN(amount) || amount < 0) {
    alert("Please enter an amount above 0 RWF.")
    return;
  }

  transactions.push({
    description,
    amount,
    type,
    date: new Date().toISOString()
  });

  saveTransactions();
  makeTransactions();
  updateSummary();
  transactionForm.reset();
});


// rendering book list from API or cache

function renderBooks(books) {
  myBooks.innerHTML = "";
  books.forEach(book => {
    const li = document.createElement("li");
    li.className = "booksItems";

    const link = document.createElement("a");
    link.href = `https://openlibrary.org${book.key}`;
    link.textContent = book.title;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "booksLink";

    li.appendChild(link);
    myBooks.appendChild(li);
  });
}

// fetch books using API

function fetchBooks() {
  const cached = localStorage.getItem("books");
  if (cached) {
    renderBooks(JSON.parse(cached));
    return;
  }

  fetch("https://openlibrary.org/subjects/personal_finance.json?limit=5")
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("books", JSON.stringify(data.works));
      renderBooks(data.works);
    })
    .catch(err => {
      console.error("Books API Error", err);
      myBooks.innerHTML = "<li style='color:red;'>Unable to load books. Try again later.</li>";
    });
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