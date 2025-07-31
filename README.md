# TrackFinance

**TrackFinance** is a finance tracking web application that will help the users to manage their
income and expenses, monitor their current balance and discover books that will teach them more about
financial responsibility.

The application was developed using HTML, CSS and JavaScript and used [Open Library API](https://openlibrary.org/developers/api)
to fetch books for the users.


## 🚀 Features
- Add, categorize, and list financial transactions as **income** or **expenses**
- View a real-time summary of:
  - Total income
  - Total expenses
  - Current balance
- Data is stored using `localStorage`
- Responsive design for both desktop and mobile screens
- Book recommendations fetched from an external API
- Easy-to-use and intuitive user interface
- Delete transactions (UX enhancement)

---

## 🧩 Technologies Used

- HTML5 (For web app structuring)
- CSS3 (Media queries for responsive design)
- JavaScript (DOM manipulation & API handling)
- [Open Library API](https://openlibrary.org/developers/api) — for fetching personal finance books for the users.

## 🌐 Deployment
This app was deployed using Netlify and can be accessed at:

🔗: https://finance-tracker-mnhd.netlify.app/

## ⚙️ Project Structure

FinanceTracker/  
│  
├── index.html  
├── style.css         
├── script.js         
├── README.md         
├── .gitignore      
└── vercel.json       


## 📚 API Attribution
- Book recommendations: Open Library API (https://openlibrary.org/developers/api)
- /subjects/personal_finance.json was used to fetch curated book lists on finance education.

## ⚠️ Error Handling
- API fetch errors are well handled with fallback in console logs.
- User inputs are checked to avoid empty fields or invalid numbers (< 0).
- Deletion of previous transactions to restart with new month.
- Refreshing of page.

## 📹 Demo Video
Watch the video below to understand more about the app:
🎬: https://youtu.be/AsQFa95los0

## 👤 Author
- **Developer**: MUVUNYI Ndamage Herve Duke
- **Github**: @mvunyiduke03
- **Portfolio**: https://muvunyiduke03.github.io/myPortfolio/

## 📄 License
This project is licensed under the **MIT license**. Feel free to use and modify it for
personal or educational uses.
