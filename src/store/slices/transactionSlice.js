import { createSlice } from '@reduxjs/toolkit';
import { getStoredTransactions, saveTransactions } from '../../utils/storage';
import { generateMockTransactions } from '../../data/mockData';
import { generateId } from '../../utils/formatters';

// Load initial data: localStorage first, else generate mock data
const loadInitialTransactions = () => {
  const stored = getStoredTransactions();
  if (stored && stored.length > 0) return stored;
  const mock = generateMockTransactions();
  saveTransactions(mock);
  return mock;
};

const initialState = {
  items: loadInitialTransactions(),
  filters: {
    type: 'all',       // 'all' | 'income' | 'expense'
    category: 'all',
    search: '',
    dateFrom: '',
    dateTo: '',
    sort: 'date_desc', // 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc'
  },
  currentPage: 1,
  itemsPerPage: 10,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const newTx = {
        ...action.payload,
        id: generateId(),
      };
      state.items.unshift(newTx);
      saveTransactions(state.items);
    },

    updateTransaction: (state, action) => {
      const index = state.items.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        saveTransactions(state.items);
      }
    },

    deleteTransaction: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
      saveTransactions(state.items);
    },

    setFilter: (state, action) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
      state.currentPage = 1; // Reset page on filter change
    },

    clearFilters: (state) => {
      state.filters = { ...initialState.filters };
      state.currentPage = 1;
    },

    setPage: (state, action) => {
      state.currentPage = action.payload;
    },

    resetData: (state) => {
      const mock = generateMockTransactions();
      state.items = mock;
      saveTransactions(mock);
      state.filters = { ...initialState.filters };
      state.currentPage = 1;
    },
  },
});

// ======== Selectors ========

/**
 * Get filtered and sorted transactions
 */
export const selectFilteredTransactions = (state) => {
  const { items, filters } = state.transactions;
  let filtered = [...items];

  // Type filter
  if (filters.type !== 'all') {
    filtered = filtered.filter(t => t.type === filters.type);
  }

  // Category filter
  if (filters.category !== 'all') {
    filtered = filtered.filter(t => t.category === filters.category);
  }

  // Search
  if (filters.search.trim()) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(t =>
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  }

  // Date range
  if (filters.dateFrom) {
    filtered = filtered.filter(t => new Date(t.date) >= new Date(filters.dateFrom));
  }
  if (filters.dateTo) {
    const toDate = new Date(filters.dateTo);
    toDate.setHours(23, 59, 59, 999);
    filtered = filtered.filter(t => new Date(t.date) <= toDate);
  }

  // Sort
  filtered.sort((a, b) => {
    switch (filters.sort) {
      case 'date_asc': return new Date(a.date) - new Date(b.date);
      case 'amount_desc': return b.amount - a.amount;
      case 'amount_asc': return a.amount - b.amount;
      case 'date_desc':
      default: return new Date(b.date) - new Date(a.date);
    }
  });

  return filtered;
};

/**
 * Get paginated transactions
 */
export const selectPaginatedTransactions = (state) => {
  const filtered = selectFilteredTransactions(state);
  const { currentPage, itemsPerPage } = state.transactions;
  const start = (currentPage - 1) * itemsPerPage;
  return {
    data: filtered.slice(start, start + itemsPerPage),
    total: filtered.length,
    totalPages: Math.ceil(filtered.length / itemsPerPage),
    currentPage,
  };
};

/**
 * Dashboard summary stats
 */
export const selectSummary = (state) => {
  const { items } = state.transactions;
  const totalIncome = items
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = items
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalBalance: totalIncome - totalExpenses,
    totalIncome,
    totalExpenses,
    transactionCount: items.length,
    savingsRate: totalIncome > 0
      ? ((totalIncome - totalExpenses) / totalIncome) * 100
      : 0,
  };
};

/**
 * Monthly data for charts (last 6 months)
 */
export const selectMonthlyData = (state) => {
  const { items } = state.transactions;
  const months = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthLabel = date.toLocaleDateString('en-US', { month: 'short' });

    const monthTransactions = items.filter(t => {
      const td = new Date(t.date);
      return td.getFullYear() === date.getFullYear() && td.getMonth() === date.getMonth();
    });

    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    months.push({
      month: monthLabel,
      monthKey,
      income: Math.round(income),
      expenses: Math.round(expenses),
      balance: Math.round(income - expenses),
    });
  }

  // Calculate cumulative balance
  let cumulativeBalance = 0;
  months.forEach(m => {
    cumulativeBalance += m.balance;
    m.cumulativeBalance = cumulativeBalance;
  });

  return months;
};

/**
 * Spending by category (expenses only)
 */
export const selectCategoryBreakdown = (state) => {
  const { items } = state.transactions;
  const expenses = items.filter(t => t.type === 'expense');
  const total = expenses.reduce((sum, t) => sum + t.amount, 0);

  const categoryMap = {};
  expenses.forEach(t => {
    if (!categoryMap[t.category]) {
      categoryMap[t.category] = 0;
    }
    categoryMap[t.category] += t.amount;
  });

  const breakdown = Object.entries(categoryMap)
    .map(([category, amount]) => ({
      category,
      amount: Math.round(amount * 100) / 100,
      percentage: total > 0 ? Math.round((amount / total) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  return breakdown;
};

/**
 * Recent transactions (last 5)
 */
export const selectRecentTransactions = (state) => {
  const sorted = [...state.transactions.items].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return sorted.slice(0, 5);
};

/**
 * Insights data
 */
export const selectInsights = (state) => {
  const { items } = state.transactions;
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();
  const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
  const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

  // Current month expenses
  const currentMonthExpenses = items.filter(t => {
    const d = new Date(t.date);
    return t.type === 'expense' && d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  });

  const currentMonthIncome = items.filter(t => {
    const d = new Date(t.date);
    return t.type === 'income' && d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  });

  // Last month expenses
  const lastMonthExpenses = items.filter(t => {
    const d = new Date(t.date);
    return t.type === 'expense' && d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
  });

  const lastMonthIncome = items.filter(t => {
    const d = new Date(t.date);
    return t.type === 'income' && d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
  });

  const currentExpenseTotal = currentMonthExpenses.reduce((s, t) => s + t.amount, 0);
  const lastExpenseTotal = lastMonthExpenses.reduce((s, t) => s + t.amount, 0);
  const currentIncomeTotal = currentMonthIncome.reduce((s, t) => s + t.amount, 0);
  const lastIncomeTotal = lastMonthIncome.reduce((s, t) => s + t.amount, 0);

  // Highest spending category this month
  const catMap = {};
  currentMonthExpenses.forEach(t => {
    catMap[t.category] = (catMap[t.category] || 0) + t.amount;
  });
  const topCategory = Object.entries(catMap).sort((a, b) => b[1] - a[1])[0];

  // Biggest single transaction
  const biggestExpense = [...items]
    .filter(t => t.type === 'expense')
    .sort((a, b) => b.amount - a.amount)[0];

  // Average daily spending this month
  const daysInMonth = new Date(thisYear, thisMonth + 1, 0).getDate();
  const currentDay = Math.min(now.getDate(), daysInMonth);
  const avgDaily = currentDay > 0 ? currentExpenseTotal / currentDay : 0;

  // Expense change percentage
  const expenseChange = lastExpenseTotal > 0
    ? ((currentExpenseTotal - lastExpenseTotal) / lastExpenseTotal) * 100
    : 0;

  const incomeChange = lastIncomeTotal > 0
    ? ((currentIncomeTotal - lastIncomeTotal) / lastIncomeTotal) * 100
    : 0;

  return {
    topCategory: topCategory ? { name: topCategory[0], amount: topCategory[1] } : null,
    biggestExpense,
    avgDailySpending: avgDaily,
    currentMonthExpenses: currentExpenseTotal,
    lastMonthExpenses: lastExpenseTotal,
    currentMonthIncome: currentIncomeTotal,
    lastMonthIncome: lastIncomeTotal,
    expenseChangePercent: expenseChange,
    incomeChangePercent: incomeChange,
    savingsThisMonth: currentIncomeTotal - currentExpenseTotal,
    categoryBreakdownThisMonth: Object.entries(catMap)
      .map(([cat, amt]) => ({ category: cat, amount: amt }))
      .sort((a, b) => b.amount - a.amount),
  };
};

export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setFilter,
  clearFilters,
  setPage,
  resetData,
} = transactionSlice.actions;

export default transactionSlice.reducer;
