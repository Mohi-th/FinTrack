/**
 * Hardcoded mock transactions for the Finance Dashboard.
 * Covers the last 6 months with realistic income & expense data.
 */

const MOCK_TRANSACTIONS = [
  // ===== MONTH 1 (5 months ago) =====
  // Income
  { id: 'tx001', date: getDate(5, 1), amount: 4050.00, type: 'income', category: 'salary', description: 'Monthly salary' },
  { id: 'tx002', date: getDate(5, 15), amount: 4050.00, type: 'income', category: 'salary', description: 'Salary deposit' },
  { id: 'tx003', date: getDate(5, 10), amount: 1200.00, type: 'income', category: 'freelance', description: 'Web development project' },
  { id: 'tx004', date: getDate(5, 20), amount: 350.00, type: 'income', category: 'investments', description: 'Stock dividends' },
  // Expenses
  { id: 'tx005', date: getDate(5, 2), amount: 45.50, type: 'expense', category: 'food', description: 'Restaurant dinner' },
  { id: 'tx006', date: getDate(5, 3), amount: 6.75, type: 'expense', category: 'food', description: 'Coffee shop' },
  { id: 'tx007', date: getDate(5, 5), amount: 95.00, type: 'expense', category: 'bills', description: 'Electricity bill' },
  { id: 'tx008', date: getDate(5, 7), amount: 32.99, type: 'expense', category: 'transport', description: 'Uber ride' },
  { id: 'tx009', date: getDate(5, 8), amount: 142.30, type: 'expense', category: 'groceries', description: 'Weekly groceries' },
  { id: 'tx010', date: getDate(5, 9), amount: 25.00, type: 'expense', category: 'entertainment', description: 'Netflix subscription' },
  { id: 'tx011', date: getDate(5, 10), amount: 59.99, type: 'expense', category: 'bills', description: 'Internet bill' },
  { id: 'tx012', date: getDate(5, 11), amount: 78.50, type: 'expense', category: 'shopping', description: 'New clothes' },
  { id: 'tx013', date: getDate(5, 13), amount: 22.00, type: 'expense', category: 'food', description: 'Lunch with team' },
  { id: 'tx014', date: getDate(5, 14), amount: 155.00, type: 'expense', category: 'groceries', description: 'Supermarket run' },
  { id: 'tx015', date: getDate(5, 16), amount: 15.49, type: 'expense', category: 'transport', description: 'Gas station' },
  { id: 'tx016', date: getDate(5, 18), amount: 35.00, type: 'expense', category: 'healthcare', description: 'Pharmacy' },
  { id: 'tx017', date: getDate(5, 19), amount: 12.99, type: 'expense', category: 'food', description: 'Pizza delivery' },
  { id: 'tx018', date: getDate(5, 21), amount: 89.00, type: 'expense', category: 'shopping', description: 'Electronics purchase' },
  { id: 'tx019', date: getDate(5, 22), amount: 49.99, type: 'expense', category: 'bills', description: 'Phone bill' },
  { id: 'tx020', date: getDate(5, 24), amount: 18.75, type: 'expense', category: 'food', description: 'Sushi takeout' },
  { id: 'tx021', date: getDate(5, 25), amount: 120.00, type: 'expense', category: 'groceries', description: 'Costco trip' },
  { id: 'tx022', date: getDate(5, 26), amount: 45.00, type: 'expense', category: 'transport', description: 'Car maintenance' },
  { id: 'tx023', date: getDate(5, 27), amount: 29.99, type: 'expense', category: 'education', description: 'Online course' },
  { id: 'tx024', date: getDate(5, 28), amount: 65.00, type: 'expense', category: 'food', description: 'Breakfast cafe' },

  // ===== MONTH 2 (4 months ago) =====
  // Income
  { id: 'tx025', date: getDate(4, 1), amount: 4050.00, type: 'income', category: 'salary', description: 'Monthly salary' },
  { id: 'tx026', date: getDate(4, 15), amount: 4050.00, type: 'income', category: 'salary', description: 'Paycheck' },
  { id: 'tx027', date: getDate(4, 8), amount: 1800.00, type: 'income', category: 'freelance', description: 'Consulting fee' },
  { id: 'tx028', date: getDate(4, 22), amount: 520.00, type: 'income', category: 'investments', description: 'Mutual fund returns' },
  { id: 'tx029', date: getDate(4, 12), amount: 200.00, type: 'income', category: 'gifts', description: 'Birthday gift' },
  // Expenses
  { id: 'tx030', date: getDate(4, 2), amount: 38.00, type: 'expense', category: 'food', description: 'Restaurant dinner' },
  { id: 'tx031', date: getDate(4, 3), amount: 7.25, type: 'expense', category: 'food', description: 'Coffee shop' },
  { id: 'tx032', date: getDate(4, 4), amount: 165.00, type: 'expense', category: 'groceries', description: 'Weekly groceries' },
  { id: 'tx033', date: getDate(4, 5), amount: 102.00, type: 'expense', category: 'bills', description: 'Electricity bill' },
  { id: 'tx034', date: getDate(4, 6), amount: 24.50, type: 'expense', category: 'transport', description: 'Metro card reload' },
  { id: 'tx035', date: getDate(4, 7), amount: 14.99, type: 'expense', category: 'entertainment', description: 'Spotify premium' },
  { id: 'tx036', date: getDate(4, 9), amount: 189.99, type: 'expense', category: 'shopping', description: 'Amazon order' },
  { id: 'tx037', date: getDate(4, 10), amount: 59.99, type: 'expense', category: 'bills', description: 'Internet bill' },
  { id: 'tx038', date: getDate(4, 11), amount: 42.00, type: 'expense', category: 'food', description: 'Fast food' },
  { id: 'tx039', date: getDate(4, 13), amount: 850.00, type: 'expense', category: 'travel', description: 'Flight booking' },
  { id: 'tx040', date: getDate(4, 14), amount: 130.00, type: 'expense', category: 'groceries', description: 'Fresh produce' },
  { id: 'tx041', date: getDate(4, 16), amount: 28.00, type: 'expense', category: 'transport', description: 'Uber ride' },
  { id: 'tx042', date: getDate(4, 17), amount: 55.00, type: 'expense', category: 'healthcare', description: 'Doctor visit' },
  { id: 'tx043', date: getDate(4, 18), amount: 19.99, type: 'expense', category: 'food', description: 'Pizza delivery' },
  { id: 'tx044', date: getDate(4, 19), amount: 49.99, type: 'expense', category: 'bills', description: 'Phone bill' },
  { id: 'tx045', date: getDate(4, 20), amount: 75.00, type: 'expense', category: 'shopping', description: 'Home decor' },
  { id: 'tx046', date: getDate(4, 23), amount: 34.50, type: 'expense', category: 'food', description: 'Sushi takeout' },
  { id: 'tx047', date: getDate(4, 24), amount: 110.00, type: 'expense', category: 'groceries', description: 'Household supplies' },
  { id: 'tx048', date: getDate(4, 25), amount: 22.00, type: 'expense', category: 'food', description: 'Coffee shop' },
  { id: 'tx049', date: getDate(4, 26), amount: 15.00, type: 'expense', category: 'transport', description: 'Parking fee' },
  { id: 'tx050', date: getDate(4, 27), amount: 45.00, type: 'expense', category: 'entertainment', description: 'Movie tickets' },

  // ===== MONTH 3 (3 months ago) =====
  // Income
  { id: 'tx051', date: getDate(3, 1), amount: 4100.00, type: 'income', category: 'salary', description: 'Salary deposit' },
  { id: 'tx052', date: getDate(3, 15), amount: 4100.00, type: 'income', category: 'salary', description: 'Salary payment' },
  { id: 'tx053', date: getDate(3, 18), amount: 2200.00, type: 'income', category: 'freelance', description: 'UI/UX design project' },
  { id: 'tx054', date: getDate(3, 25), amount: 680.00, type: 'income', category: 'investments', description: 'Bond interest' },
  // Expenses
  { id: 'tx055', date: getDate(3, 2), amount: 52.00, type: 'expense', category: 'food', description: 'Restaurant dinner' },
  { id: 'tx056', date: getDate(3, 3), amount: 175.00, type: 'expense', category: 'groceries', description: 'Weekly groceries' },
  { id: 'tx057', date: getDate(3, 4), amount: 8.50, type: 'expense', category: 'food', description: 'Coffee shop' },
  { id: 'tx058', date: getDate(3, 5), amount: 88.00, type: 'expense', category: 'bills', description: 'Electricity bill' },
  { id: 'tx059', date: getDate(3, 6), amount: 35.00, type: 'expense', category: 'transport', description: 'Gas station' },
  { id: 'tx060', date: getDate(3, 7), amount: 129.99, type: 'expense', category: 'shopping', description: 'Shoes' },
  { id: 'tx061', date: getDate(3, 8), amount: 59.99, type: 'expense', category: 'bills', description: 'Internet bill' },
  { id: 'tx062', date: getDate(3, 9), amount: 15.99, type: 'expense', category: 'entertainment', description: 'Gaming subscription' },
  { id: 'tx063', date: getDate(3, 10), amount: 42.50, type: 'expense', category: 'food', description: 'Lunch with team' },
  { id: 'tx064', date: getDate(3, 11), amount: 28.00, type: 'expense', category: 'transport', description: 'Uber ride' },
  { id: 'tx065', date: getDate(3, 12), amount: 145.00, type: 'expense', category: 'groceries', description: 'Supermarket run' },
  { id: 'tx066', date: getDate(3, 13), amount: 150.00, type: 'expense', category: 'healthcare', description: 'Dental checkup' },
  { id: 'tx067', date: getDate(3, 14), amount: 49.99, type: 'expense', category: 'bills', description: 'Phone bill' },
  { id: 'tx068', date: getDate(3, 16), amount: 65.00, type: 'expense', category: 'shopping', description: 'Books online' },
  { id: 'tx069', date: getDate(3, 17), amount: 24.99, type: 'expense', category: 'food', description: 'Fast food' },
  { id: 'tx070', date: getDate(3, 19), amount: 199.00, type: 'expense', category: 'education', description: 'Udemy purchase' },
  { id: 'tx071', date: getDate(3, 20), amount: 18.00, type: 'expense', category: 'transport', description: 'Bus pass' },
  { id: 'tx072', date: getDate(3, 21), amount: 33.00, type: 'expense', category: 'food', description: 'Breakfast cafe' },
  { id: 'tx073', date: getDate(3, 22), amount: 95.00, type: 'expense', category: 'groceries', description: 'Fresh produce' },
  { id: 'tx074', date: getDate(3, 23), amount: 250.00, type: 'expense', category: 'shopping', description: 'New clothes' },
  { id: 'tx075', date: getDate(3, 24), amount: 12.00, type: 'expense', category: 'entertainment', description: 'YouTube premium' },
  { id: 'tx076', date: getDate(3, 26), amount: 40.00, type: 'expense', category: 'food', description: 'Pizza delivery' },

  // ===== MONTH 4 (2 months ago) =====
  // Income
  { id: 'tx077', date: getDate(2, 1), amount: 4100.00, type: 'income', category: 'salary', description: 'Monthly salary' },
  { id: 'tx078', date: getDate(2, 15), amount: 4100.00, type: 'income', category: 'salary', description: 'Paycheck' },
  { id: 'tx079', date: getDate(2, 12), amount: 950.00, type: 'income', category: 'freelance', description: 'Content writing' },
  { id: 'tx080', date: getDate(2, 20), amount: 420.00, type: 'income', category: 'investments', description: 'Crypto gains' },
  { id: 'tx081', date: getDate(2, 5), amount: 300.00, type: 'income', category: 'other_income', description: 'Cashback reward' },
  // Expenses
  { id: 'tx082', date: getDate(2, 2), amount: 55.00, type: 'expense', category: 'food', description: 'Restaurant dinner' },
  { id: 'tx083', date: getDate(2, 3), amount: 7.50, type: 'expense', category: 'food', description: 'Coffee shop' },
  { id: 'tx084', date: getDate(2, 4), amount: 160.00, type: 'expense', category: 'groceries', description: 'Costco trip' },
  { id: 'tx085', date: getDate(2, 5), amount: 110.00, type: 'expense', category: 'bills', description: 'Electricity bill' },
  { id: 'tx086', date: getDate(2, 6), amount: 42.00, type: 'expense', category: 'transport', description: 'Gas station' },
  { id: 'tx087', date: getDate(2, 7), amount: 25.00, type: 'expense', category: 'entertainment', description: 'Netflix subscription' },
  { id: 'tx088', date: getDate(2, 8), amount: 59.99, type: 'expense', category: 'bills', description: 'Internet bill' },
  { id: 'tx089', date: getDate(2, 9), amount: 220.00, type: 'expense', category: 'shopping', description: 'Amazon order' },
  { id: 'tx090', date: getDate(2, 10), amount: 38.00, type: 'expense', category: 'food', description: 'Lunch with team' },
  { id: 'tx091', date: getDate(2, 11), amount: 1050.00, type: 'expense', category: 'travel', description: 'Hotel stay' },
  { id: 'tx092', date: getDate(2, 12), amount: 135.00, type: 'expense', category: 'groceries', description: 'Weekly groceries' },
  { id: 'tx093', date: getDate(2, 13), amount: 20.00, type: 'expense', category: 'transport', description: 'Uber ride' },
  { id: 'tx094', date: getDate(2, 14), amount: 85.00, type: 'expense', category: 'healthcare', description: 'Gym membership' },
  { id: 'tx095', date: getDate(2, 16), amount: 49.99, type: 'expense', category: 'bills', description: 'Phone bill' },
  { id: 'tx096', date: getDate(2, 17), amount: 28.50, type: 'expense', category: 'food', description: 'Sushi takeout' },
  { id: 'tx097', date: getDate(2, 18), amount: 145.00, type: 'expense', category: 'shopping', description: 'Electronics purchase' },
  { id: 'tx098', date: getDate(2, 19), amount: 15.00, type: 'expense', category: 'food', description: 'Fast food' },
  { id: 'tx099', date: getDate(2, 21), amount: 100.00, type: 'expense', category: 'groceries', description: 'Household supplies' },
  { id: 'tx100', date: getDate(2, 22), amount: 35.00, type: 'expense', category: 'transport', description: 'Parking fee' },
  { id: 'tx101', date: getDate(2, 23), amount: 60.00, type: 'expense', category: 'entertainment', description: 'Concert tickets' },
  { id: 'tx102', date: getDate(2, 24), amount: 45.00, type: 'expense', category: 'food', description: 'Breakfast cafe' },

  // ===== MONTH 5 (1 month ago) =====
  // Income
  { id: 'tx103', date: getDate(1, 1), amount: 4150.00, type: 'income', category: 'salary', description: 'Salary deposit' },
  { id: 'tx104', date: getDate(1, 15), amount: 4150.00, type: 'income', category: 'salary', description: 'Monthly salary' },
  { id: 'tx105', date: getDate(1, 7), amount: 1500.00, type: 'income', category: 'freelance', description: 'Freelance design work' },
  { id: 'tx106', date: getDate(1, 22), amount: 380.00, type: 'income', category: 'investments', description: 'Investment payout' },
  { id: 'tx107', date: getDate(1, 28), amount: 150.00, type: 'income', category: 'other_income', description: 'Refund received' },
  // Expenses
  { id: 'tx108', date: getDate(1, 2), amount: 62.00, type: 'expense', category: 'food', description: 'Restaurant dinner' },
  { id: 'tx109', date: getDate(1, 3), amount: 5.75, type: 'expense', category: 'food', description: 'Coffee shop' },
  { id: 'tx110', date: getDate(1, 4), amount: 180.00, type: 'expense', category: 'groceries', description: 'Weekly groceries' },
  { id: 'tx111', date: getDate(1, 5), amount: 98.00, type: 'expense', category: 'bills', description: 'Electricity bill' },
  { id: 'tx112', date: getDate(1, 6), amount: 38.50, type: 'expense', category: 'transport', description: 'Gas station' },
  { id: 'tx113', date: getDate(1, 7), amount: 14.99, type: 'expense', category: 'entertainment', description: 'Spotify premium' },
  { id: 'tx114', date: getDate(1, 8), amount: 59.99, type: 'expense', category: 'bills', description: 'Internet bill' },
  { id: 'tx115', date: getDate(1, 9), amount: 175.00, type: 'expense', category: 'shopping', description: 'New clothes' },
  { id: 'tx116', date: getDate(1, 10), amount: 33.00, type: 'expense', category: 'food', description: 'Lunch with team' },
  { id: 'tx117', date: getDate(1, 11), amount: 22.00, type: 'expense', category: 'transport', description: 'Metro card reload' },
  { id: 'tx118', date: getDate(1, 12), amount: 155.00, type: 'expense', category: 'groceries', description: 'Supermarket run' },
  { id: 'tx119', date: getDate(1, 13), amount: 120.00, type: 'expense', category: 'healthcare', description: 'Doctor visit' },
  { id: 'tx120', date: getDate(1, 14), amount: 49.99, type: 'expense', category: 'bills', description: 'Phone bill' },
  { id: 'tx121', date: getDate(1, 16), amount: 95.00, type: 'expense', category: 'shopping', description: 'Amazon order' },
  { id: 'tx122', date: getDate(1, 17), amount: 18.99, type: 'expense', category: 'food', description: 'Pizza delivery' },
  { id: 'tx123', date: getDate(1, 18), amount: 29.99, type: 'expense', category: 'education', description: 'Online course' },
  { id: 'tx124', date: getDate(1, 19), amount: 15.00, type: 'expense', category: 'transport', description: 'Parking fee' },
  { id: 'tx125', date: getDate(1, 20), amount: 42.00, type: 'expense', category: 'food', description: 'Sushi takeout' },
  { id: 'tx126', date: getDate(1, 21), amount: 125.00, type: 'expense', category: 'groceries', description: 'Fresh produce' },
  { id: 'tx127', date: getDate(1, 23), amount: 550.00, type: 'expense', category: 'travel', description: 'Airbnb booking' },
  { id: 'tx128', date: getDate(1, 24), amount: 35.00, type: 'expense', category: 'entertainment', description: 'Movie tickets' },
  { id: 'tx129', date: getDate(1, 25), amount: 48.00, type: 'expense', category: 'food', description: 'Breakfast cafe' },
  { id: 'tx130', date: getDate(1, 26), amount: 65.00, type: 'expense', category: 'shopping', description: 'Home decor' },

  // ===== MONTH 6 (Current month) =====
  // Income
  { id: 'tx131', date: getDate(0, 1), amount: 4150.00, type: 'income', category: 'salary', description: 'Monthly salary' },
  { id: 'tx132', date: getDate(0, 2), amount: 1713.95, type: 'income', category: 'freelance', description: 'Freelance design work' },
  // Expenses
  { id: 'tx133', date: getDate(0, 1), amount: 48.00, type: 'expense', category: 'food', description: 'Restaurant dinner' },
  { id: 'tx134', date: getDate(0, 1), amount: 7.25, type: 'expense', category: 'food', description: 'Coffee shop' },
  { id: 'tx135', date: getDate(0, 2), amount: 70.53, type: 'expense', category: 'entertainment', description: 'YouTube premium' },
  { id: 'tx136', date: getDate(0, 2), amount: 21.66, type: 'expense', category: 'food', description: 'Sushi takeout' },
  { id: 'tx137', date: getDate(0, 1), amount: 156.38, type: 'expense', category: 'groceries', description: 'Weekly groceries' },
  { id: 'tx138', date: getDate(0, 2), amount: 10.00, type: 'expense', category: 'food', description: 'Fast food' },
  { id: 'tx139', date: getDate(0, 1), amount: 492.52, type: 'expense', category: 'travel', description: 'Vacation expenses' },
  { id: 'tx140', date: getDate(0, 2), amount: 3883.24, type: 'income', category: 'salary', description: 'Salary deposit' },
];

/**
 * Helper: generate a date relative to the current month.
 * @param {number} monthsAgo — 0 = current month, 1 = last month, etc.
 * @param {number} day — day of the month (1-28 safe range)
 */
function getDate(monthsAgo, day) {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth() - monthsAgo, day);
  // Don't generate future dates
  if (date > now) {
    date.setDate(now.getDate());
  }
  return date.toISOString();
}

/**
 * Returns the hardcoded mock transactions array.
 * Sorted by date descending (newest first).
 */
export function getMockTransactions() {
  return [...MOCK_TRANSACTIONS].sort((a, b) => new Date(b.date) - new Date(a.date));
}
