<![CDATA[<div align="center">

# 💰 FinTrack — Finance Dashboard

**A premium, interactive finance dashboard for tracking income, expenses, and spending insights.**

Built with **React 19 · Vite · Redux Toolkit · Recharts**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-2.11-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](LICENSE)

---

</div>

## 📸 Preview

> A sleek **"Midnight Analytics"** dark theme with glassmorphic cards, animated counters, and rich data visualizations — designed to feel professional and polished out of the box.

---

## 🚀 Quick Start

```bash
# 1 — Clone the repository
git clone https://github.com/your-username/fintrack.git
cd fintrack

# 2 — Install dependencies
npm install

# 3 — Start the development server
npm run dev
```

Open **http://localhost:5173/** in your browser — you're good to go!

### Other Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start Vite dev server with HMR       |
| `npm run build`    | Build optimized production bundle    |
| `npm run preview`  | Preview the production build locally |
| `npm run lint`     | Run ESLint across the project        |

---

## ✨ Features

### 📊 Dashboard Overview

- **Summary Cards** — Total Balance, Income, Expenses & Transaction count with smooth animated counters and trend indicators
- **Balance Trend Chart** — Area chart showing cumulative balance & income over the last 6 months
- **Spending Breakdown** — Interactive donut chart with a category legend
- **Recent Transactions** — Quick-view list of the most recent 5 transactions

### 💳 Transaction Management

- Full **CRUD operations** — Add, Edit, Delete (admin-only)
- **Multi-criteria filtering** — by type, category, date range, and text search
- **Sorting** — by date or amount (ascending / descending)
- **Pagination** — with intuitive page controls
- **CSV Export** — download all filtered transactions as `.csv`
- **Responsive views** — table layout on desktop, card layout on mobile

### 📈 Insights & Analytics

- **Top Spending Category** with amount this month
- **Savings Rate** displayed as a percentage of total income
- **Average Daily Spending** calculation
- **Monthly Trends** — expense & income change vs. previous month
- **Spending Breakdown Bars** — visual side-by-side comparison of categories
- **Income vs Expenses** — monthly bar chart comparison

### 🔐 Role-Based Access Control (RBAC)

| Role      | Permissions                              |
| --------- | ---------------------------------------- |
| **Admin** | Full CRUD access to all transactions     |
| **Viewer**| Read-only — add/edit/delete are hidden   |

Toggle between roles via the sidebar switch. A role badge is displayed in the header.

### 🌗 Theming

- **Dark Mode** — "Midnight Analytics" theme (default)
- **Light Mode** — clean, bright alternative
- Theme preference is **persisted in localStorage**

---

## 🏗️ Project Architecture

```
fintrack/
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   ├── charts/             # Recharts visualizations
│   │   │   ├── BalanceTrendChart.jsx
│   │   │   ├── MonthlyComparisonChart.jsx
│   │   │   └── SpendingBreakdownChart.jsx
│   │   ├── common/             # Reusable UI primitives
│   │   │   ├── AnimatedNumber.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Toast.jsx
│   │   ├── dashboard/          # Dashboard-specific widgets
│   │   │   ├── RecentTransactions.jsx
│   │   │   └── SummaryCards.jsx
│   │   ├── insights/           # Insight cards & breakdowns
│   │   │   └── InsightCards.jsx
│   │   ├── layout/             # App shell — Sidebar, Header
│   │   │   ├── AppLayout.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   └── transactions/       # Transaction CRUD UI
│   │       ├── TransactionFilters.jsx
│   │       ├── TransactionForm.jsx
│   │       └── TransactionList.jsx
│   ├── data/
│   │   └── mockData.js         # Realistic mock data generator
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── TransactionsPage.jsx
│   │   └── InsightsPage.jsx
│   ├── store/
│   │   ├── index.js            # Redux store configuration
│   │   └── slices/
│   │       ├── transactionSlice.js   # Transactions, filters, pagination
│   │       └── uiSlice.js            # Theme, role, sidebar, modal, toast
│   ├── utils/
│   │   ├── constants.js        # App-wide constants & category maps
│   │   ├── formatters.js       # Currency, date, ID formatters
│   │   └── storage.js          # localStorage helpers
│   ├── App.jsx                 # Root component with routing
│   ├── App.css
│   ├── index.css               # Global styles & design tokens
│   └── main.jsx                # App entry point
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## 🎨 Design System

The UI is powered by **CSS Custom Properties** for seamless theming.

| Token        | Dark Mode Value                  | Purpose                  |
| ------------ | -------------------------------- | ------------------------ |
| `--bg`       | `#0F1629` (Deep Navy)            | Page background          |
| `--surface`  | `#1A2332`                        | Card / panel backgrounds |
| `--primary`  | `#3B82F6` (Electric Blue)        | Buttons, links, accents  |
| `--income`   | `#10B981` (Emerald)              | Income indicators        |
| `--expense`  | `#F43F5E` (Rose)                 | Expense indicators       |
| Font         | [Inter](https://fonts.google.com/specimen/Inter) | Typography               |
| Border Radius| `6px – 16px` system              | Consistent rounding      |

---

## 🛠️ Tech Stack

| Technology           | Purpose                          |
| -------------------- | -------------------------------- |
| **React 19**         | UI framework (functional components + hooks) |
| **Vite 8**           | Lightning-fast dev server & bundler |
| **Redux Toolkit**    | Centralized state management     |
| **React Router v7**  | Client-side routing              |
| **Recharts**         | Charts & data visualizations     |
| **Lucide React**     | Beautiful icon system            |
| **Lottie (dotlottie)**| Loading & empty state animations |
| **CSS Custom Props** | Design tokens & light/dark theming |

---

## 📱 Responsive Design

| Breakpoint         | Layout                                           |
| ------------------ | ------------------------------------------------ |
| **Desktop** 1024px+| Full sidebar + multi-column dashboard grid        |
| **Tablet** 640–1024px | Collapsible sidebar drawer, adapted grid       |
| **Mobile** < 640px | Bottom-sheet modals, card-based transaction list  |

---

## 📊 Mock Data

On first load, the app auto-generates **~150–200 realistic transactions** spanning the last 6 months:

- 💼 Bi-monthly salary deposits ($3,800–$4,200)
- 💻 Random freelance & investment income
- 🍕 Daily expenses across **10+ categories** (food, transport, shopping, bills, etc.)
- ✈️ Occasional large travel expenses
- 📈 Seasonal spending variations for realistic trends

All data is **persisted in localStorage**. Hit the **"Reset Data"** button in the sidebar to regenerate fresh data anytime.

---

## 🧩 State Management

The Redux store is organized into two slices:

### `transactionSlice`
- Manages the full transactions array
- Handles add / edit / delete reducers
- Provides filtered & paginated selectors
- Computes derived stats (totals, category breakdowns, monthly aggregates)

### `uiSlice`
- Controls theme (dark / light)
- Manages user role (admin / viewer)
- Handles sidebar open/close state
- Controls modal visibility & toast notifications

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** this repository
2. Create a feature branch — `git checkout -b feature/awesome-feature`
3. Commit your changes — `git commit -m "Add awesome feature"`
4. Push to the branch — `git push origin feature/awesome-feature`
5. Open a **Pull Request**

---

## 📄 License

This project is licensed under the **MIT License** — free to use, modify, and distribute.

---

<div align="center">

**Built with ❤️ using React + Vite**

⭐ Star this repo if you found it useful!

</div>
]]>
