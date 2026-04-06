<div align="center">

# 💰 FinTrack — Finance Dashboard

**A premium, interactive finance dashboard for tracking income, expenses, and spending insights.**

Built with **React 19 · Vite 8 · Redux Toolkit · Tailwind CSS v4 · Recharts**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
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
git clone https://github.com/Mohi-th/Finance_tracker.git
cd Finance_tracker

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

- **Summary Cards** — Total Balance, Income, Expenses & Transaction count with smooth animated counters and trend indicators (₹ INR currency)
- **Balance Trend Chart** — Area chart showing cumulative balance & income over the last 6 months
- **Spending Breakdown** — Interactive donut chart with a category legend
- **Recent Transactions** — Quick-view list with **color-coded category labels** and Lucide icons

### 💳 Transaction Management

- Full **CRUD operations** via `createAsyncThunk` — Add, Edit, Delete (admin-only)
- **Debounced search** — 350ms delay to reduce unnecessary Redux dispatches while typing
- **Collapsible filter panel** — toggle with a Filters button to reveal Type, Category, Date Range
- **Sorting** — via dropdown menu (date or amount, ascending/descending)
- **Pagination** — with intuitive page controls
- **CSV Export** — download all filtered transactions as `.csv`
- **Responsive views** — table layout on desktop, card layout on mobile
- **Category Icons** — each category (Food, Shopping, Travel, etc.) has its own Lucide icon with unique color

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

Toggle between roles via the **header segmented control**. The current role is displayed as a color-coded badge in the sidebar.

### 🌗 Theming

- **Dark Mode** — "Midnight Analytics" theme (default)
- **Light Mode** — clean, bright alternative
- Theme toggle with **tilt animation** in the header
- Theme preference is **persisted in localStorage**

---

## 🏗️ Project Architecture

```
finance-dashboard/
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
│   │   │   ├── CategoryIcon.jsx    # ← NEW: Lucide icons per category
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
│   │   │   ├── Header.jsx      # Role toggle + theme switch
│   │   │   └── Sidebar.jsx     # Nav + role badge indicator
│   │   └── transactions/       # Transaction CRUD UI
│   │       ├── TransactionFilters.jsx  # Collapsible filters + debounced search
│   │       ├── TransactionForm.jsx
│   │       └── TransactionList.jsx
│   ├── data/
│   │   └── mockData.js         # Hardcoded realistic transaction data
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── TransactionsPage.jsx
│   │   └── InsightsPage.jsx
│   ├── store/
│   │   ├── index.js            # Redux store configuration
│   │   └── slices/
│   │       ├── transactionSlice.js   # Async thunks + filters + selectors
│   │       └── uiSlice.js            # Theme, role, sidebar, modal, toast
│   ├── utils/
│   │   ├── constants.js        # App-wide constants & category maps
│   │   ├── formatters.js       # Currency (₹ INR), date, ID formatters
│   │   ├── storage.js          # localStorage helpers
│   │   └── useDebounce.js      # ← NEW: Custom debounce hooks
│   ├── App.jsx                 # Root component with routing
│   ├── index.css               # Tailwind CSS + @theme design tokens
│   └── main.jsx                # App entry point
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## 🧩 State Management (Redux Toolkit)

The Redux store is organized into two slices with a focus on **async-ready architecture** and **performance optimization**.

### `transactionSlice` — Async Thunks & Selectors

All CRUD operations use **`createAsyncThunk`** to simulate API interactions, making the codebase ready for backend integration:

```js
// Async thunks with simulated API delays
addTransactionAsync     // POST   /api/transactions     (600ms delay)
updateTransactionAsync  // PUT    /api/transactions/:id (600ms delay)
deleteTransactionAsync  // DELETE /api/transactions/:id (400ms delay)
```

Each thunk manages its lifecycle through `extraReducers`:

| State       | What it does                                         |
| ----------- | ---------------------------------------------------- |
| `pending`   | Sets `loading: true`, tracks `operationType`         |
| `fulfilled` | Updates the transactions array, clears loading       |
| `rejected`  | Sets `error` message, clears loading                 |

**Memoized Selectors** — computed data is cached to avoid recalculation:

```js
selectFilteredTransactions  // Search + type + category + date range filtering
selectPaginatedTransactions // Paginated subset of filtered results
selectSummary               // Totals, balances, savings rate
selectInsights              // Top category, trends, average daily spend
selectMonthlyData           // Aggregated monthly income/expense/balance
selectCategoryBreakdown     // Spending by category with percentages
selectRecentTransactions    // Latest 5 transactions
```

### `uiSlice` — UI State

| State Key          | Purpose                              |
| ------------------ | ------------------------------------ |
| `theme`            | `'dark'` / `'light'` — persisted     |
| `role`             | `'admin'` / `'viewer'` — RBAC       |
| `sidebarOpen`      | Desktop sidebar collapse state       |
| `mobileSidebarOpen`| Mobile sidebar drawer visibility     |
| `modalOpen`        | Active modal type or `null`          |
| `toasts[]`         | Toast notification queue             |

---

## ⚡ Debounced Search

The transaction search input uses a **custom debounce hook** to optimize performance:

```
src/utils/useDebounce.js
├── useDebounceValue(value, delay)      — Returns a debounced value
└── useDebouncedCallback(fn, delay)     — Returns a debounced function
```

### How it works:

1. **User types** in the search box → local React state updates **immediately** (no input lag)
2. **Redux dispatch is delayed** by 350ms after the last keystroke
3. If the user keeps typing, the timer resets — only the final value is dispatched
4. This prevents **unnecessary re-filtering** of 200+ transactions on every keypress

```
Keystroke timeline:
  "s" → "sa" → "sal" → "sala" → "salary"
                                    ↓
                            350ms debounce
                                    ↓
                        dispatch(setFilter({ search: "salary" }))
```

---

## 🎨 Design System

The UI is powered by **Tailwind CSS v4** with custom design tokens defined via the `@theme` directive in `index.css`.

| Token          | Dark Mode Value                  | Purpose                  |
| -------------- | -------------------------------- | ------------------------ |
| `bg-primary`   | `#0F1629` (Deep Navy)            | Page background          |
| `bg-secondary` | `#1A2332`                        | Card / panel backgrounds |
| `primary`      | `#3B82F6` (Electric Blue)        | Buttons, links, accents  |
| `income`       | `#10B981` (Emerald)              | Income indicators        |
| `expense`      | `#F43F5E` (Rose)                 | Expense indicators       |
| Font           | [Inter](https://fonts.google.com/specimen/Inter) | Typography               |
| Border Radius  | `6px – 16px` system              | Consistent rounding      |

### Category Color System

Each transaction category has a unique icon and color for instant visual recognition:

| Category        | Icon            | Color     |
| --------------- | --------------- | --------- |
| Food & Dining   | UtensilsCrossed | `#F97316` |
| Shopping        | ShoppingBag     | `#A855F7` |
| Transport       | Car             | `#06B6D4` |
| Entertainment   | Gamepad2        | `#F43F5E` |
| Bills & Utilities| Zap            | `#F59E0B` |
| Salary          | Briefcase       | `#3B82F6` |
| Freelance       | Laptop          | `#8B5CF6` |
| Travel          | Plane           | `#0EA5E9` |
| Education       | GraduationCap   | `#3B82F6` |
| Groceries       | ShoppingCart     | `#84CC16` |

---

## 🛠️ Tech Stack

| Technology           | Purpose                          |
| -------------------- | -------------------------------- |
| **React 19**         | UI framework (functional components + hooks) |
| **Vite 8**           | Lightning-fast dev server & bundler |
| **Tailwind CSS v4**  | Utility-first styling with `@theme` tokens |
| **Redux Toolkit**    | Centralized state with `createAsyncThunk` |
| **React Router v7**  | Client-side routing              |
| **Recharts**         | Charts & data visualizations     |
| **Lucide React**     | Category icons & UI iconography  |
| **Lottie (dotlottie)**| Loading & empty state animations |

---

## 📱 Responsive Design

| Breakpoint         | Layout                                           |
| ------------------ | ------------------------------------------------ |
| **Desktop** 1024px+| Full sidebar + multi-column dashboard grid        |
| **Tablet** 640–1024px | Collapsible sidebar drawer, adapted grid       |
| **Mobile** < 640px | Bottom-sheet modals, card-based transaction list  |

---

## 📊 Mock Data

The app ships with **hardcoded realistic transactions** spanning the last 6 months:

- 💼 Bi-monthly salary deposits (₹3,800–₹4,200)
- 💻 Random freelance & investment income
- 🍕 Daily expenses across **10+ categories** (food, transport, shopping, bills, etc.)
- ✈️ Occasional large travel expenses
- 📈 Seasonal spending variations for realistic trends

All data is **persisted in localStorage**.

---

## 🔮 Future Enhancements

- **Backend Integration** — Replace `simulateApiDelay` in async thunks with real `fetch`/`axios` API calls
- **Authentication** — JWT-based login/signup with role assignment
- **Budget Goals** — Set monthly spending limits per category
- **Recurring Transactions** — Auto-generate subscriptions and salary entries
- **Data Export** — PDF report generation with charts

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

**Built with ❤️ using React + Vite + Tailwind CSS**

⭐ Star this repo if you found it useful!

</div>
