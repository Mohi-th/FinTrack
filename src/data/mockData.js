import { generateId } from '../utils/formatters';

const incomeCategories = ['salary', 'freelance', 'investments', 'gifts', 'other_income'];
const expenseCategories = ['food', 'shopping', 'transport', 'entertainment', 'bills', 'healthcare', 'education', 'travel', 'groceries', 'other_expense'];

const incomeDescriptions = {
  salary: ['Monthly salary', 'Salary deposit', 'Paycheck', 'Salary payment'],
  freelance: ['Web development project', 'Freelance design work', 'Consulting fee', 'Content writing', 'UI/UX design project'],
  investments: ['Stock dividends', 'Mutual fund returns', 'Crypto gains', 'Bond interest', 'Investment payout'],
  gifts: ['Birthday gift', 'Holiday bonus', 'Cash gift from family', 'Wedding gift'],
  other_income: ['Refund received', 'Cashback reward', 'Contest prize', 'Side gig payment'],
};

const expenseDescriptions = {
  food: ['Restaurant dinner', 'Coffee shop', 'Lunch with team', 'Pizza delivery', 'Sushi takeout', 'Breakfast cafe', 'Fast food'],
  shopping: ['New clothes', 'Electronics purchase', 'Amazon order', 'Home decor', 'Shoes', 'Books online'],
  transport: ['Uber ride', 'Gas station', 'Metro card reload', 'Parking fee', 'Car maintenance', 'Bus pass'],
  entertainment: ['Netflix subscription', 'Movie tickets', 'Concert tickets', 'Gaming subscription', 'Spotify premium', 'YouTube premium'],
  bills: ['Electricity bill', 'Internet bill', 'Phone bill', 'Water bill', 'Gas bill', 'Insurance premium'],
  healthcare: ['Doctor visit', 'Pharmacy', 'Dental checkup', 'Gym membership', 'Health supplements', 'Eye examination'],
  education: ['Online course', 'Udemy purchase', 'Books & materials', 'Workshop fee', 'Certification exam'],
  travel: ['Flight booking', 'Hotel stay', 'Airbnb booking', 'Travel insurance', 'Vacation expenses'],
  groceries: ['Weekly groceries', 'Supermarket run', 'Fresh produce', 'Household supplies', 'Costco trip'],
  other_expense: ['Pet supplies', 'Charity donation', 'Miscellaneous', 'Gift for friend', 'Subscription renewal'],
};

function randomBetween(min, max) {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateDate(monthsAgo, day) {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth() - monthsAgo, day);
  // Don't generate future dates
  if (date > now) {
    date.setMonth(date.getMonth() - 1);
  }
  return date.toISOString();
}

/**
 * Generate realistic mock transactions for the last 6 months
 */
export function generateMockTransactions() {
  const transactions = [];

  for (let monthsAgo = 5; monthsAgo >= 0; monthsAgo--) {
    // 2 salary payments per month (1st and 15th)
    transactions.push({
      id: generateId(),
      date: generateDate(monthsAgo, 1),
      amount: randomBetween(3800, 4200),
      type: 'income',
      category: 'salary',
      description: randomItem(incomeDescriptions.salary),
    });
    transactions.push({
      id: generateId(),
      date: generateDate(monthsAgo, 15),
      amount: randomBetween(3800, 4200),
      type: 'income',
      category: 'salary',
      description: randomItem(incomeDescriptions.salary),
    });

    // 0-2 freelance income per month
    const freelanceCount = Math.floor(Math.random() * 3);
    for (let i = 0; i < freelanceCount; i++) {
      transactions.push({
        id: generateId(),
        date: generateDate(monthsAgo, randomBetween(2, 28)),
        amount: randomBetween(500, 2500),
        type: 'income',
        category: 'freelance',
        description: randomItem(incomeDescriptions.freelance),
      });
    }

    // 0-1 investment income
    if (Math.random() > 0.4) {
      transactions.push({
        id: generateId(),
        date: generateDate(monthsAgo, randomBetween(5, 25)),
        amount: randomBetween(100, 800),
        type: 'income',
        category: 'investments',
        description: randomItem(incomeDescriptions.investments),
      });
    }

    // Occasional gift or other income
    if (Math.random() > 0.7) {
      const cat = randomItem(['gifts', 'other_income']);
      transactions.push({
        id: generateId(),
        date: generateDate(monthsAgo, randomBetween(1, 28)),
        amount: randomBetween(50, 500),
        type: 'income',
        category: cat,
        description: randomItem(incomeDescriptions[cat]),
      });
    }

    // --- Expenses ---

    // Food: 8-14 per month
    const foodCount = Math.floor(randomBetween(8, 14));
    for (let i = 0; i < foodCount; i++) {
      transactions.push({
        id: generateId(),
        date: generateDate(monthsAgo, Math.ceil(randomBetween(1, 28))),
        amount: randomBetween(8, 85),
        type: 'expense',
        category: 'food',
        description: randomItem(expenseDescriptions.food),
      });
    }

    // Groceries: 3-5 per month
    const groceryCount = Math.floor(randomBetween(3, 5));
    for (let i = 0; i < groceryCount; i++) {
      transactions.push({
        id: generateId(),
        date: generateDate(monthsAgo, Math.ceil(randomBetween(1, 28))),
        amount: randomBetween(40, 180),
        type: 'expense',
        category: 'groceries',
        description: randomItem(expenseDescriptions.groceries),
      });
    }

    // Bills: 3-5 per month (consistent)
    const billTypes = ['Electricity bill', 'Internet bill', 'Phone bill'];
    billTypes.forEach((desc, idx) => {
      transactions.push({
        id: generateId(),
        date: generateDate(monthsAgo, Math.min(5 + idx * 5, 28)),
        amount: randomBetween(40, 150),
        type: 'expense',
        category: 'bills',
        description: desc,
      });
    });

    // Transport: 4-8 per month
    const transportCount = Math.floor(randomBetween(4, 8));
    for (let i = 0; i < transportCount; i++) {
      transactions.push({
        id: generateId(),
        date: generateDate(monthsAgo, Math.ceil(randomBetween(1, 28))),
        amount: randomBetween(5, 60),
        type: 'expense',
        category: 'transport',
        description: randomItem(expenseDescriptions.transport),
      });
    }

    // Shopping: 2-5 per month
    const shoppingCount = Math.floor(randomBetween(2, 5));
    for (let i = 0; i < shoppingCount; i++) {
      transactions.push({
        id: generateId(),
        date: generateDate(monthsAgo, Math.ceil(randomBetween(1, 28))),
        amount: randomBetween(15, 250),
        type: 'expense',
        category: 'shopping',
        description: randomItem(expenseDescriptions.shopping),
      });
    }

    // Entertainment: 2-4 per month
    const entertainmentCount = Math.floor(randomBetween(2, 4));
    for (let i = 0; i < entertainmentCount; i++) {
      transactions.push({
        id: generateId(),
        date: generateDate(monthsAgo, Math.ceil(randomBetween(1, 28))),
        amount: randomBetween(10, 80),
        type: 'expense',
        category: 'entertainment',
        description: randomItem(expenseDescriptions.entertainment),
      });
    }

    // Healthcare: 0-2 per month
    const healthCount = Math.floor(randomBetween(0, 2));
    for (let i = 0; i < healthCount; i++) {
      transactions.push({
        id: generateId(),
        date: generateDate(monthsAgo, Math.ceil(randomBetween(1, 28))),
        amount: randomBetween(20, 200),
        type: 'expense',
        category: 'healthcare',
        description: randomItem(expenseDescriptions.healthcare),
      });
    }

    // Education: 0-1 per month
    if (Math.random() > 0.5) {
      transactions.push({
        id: generateId(),
        date: generateDate(monthsAgo, Math.ceil(randomBetween(1, 28))),
        amount: randomBetween(15, 200),
        type: 'expense',
        category: 'education',
        description: randomItem(expenseDescriptions.education),
      });
    }

    // Travel: 0-1 per month (occasional big expense)
    if (Math.random() > 0.75) {
      transactions.push({
        id: generateId(),
        date: generateDate(monthsAgo, Math.ceil(randomBetween(1, 28))),
        amount: randomBetween(200, 1200),
        type: 'expense',
        category: 'travel',
        description: randomItem(expenseDescriptions.travel),
      });
    }

    // Other: 0-2 per month
    if (Math.random() > 0.5) {
      transactions.push({
        id: generateId(),
        date: generateDate(monthsAgo, Math.ceil(randomBetween(1, 28))),
        amount: randomBetween(10, 100),
        type: 'expense',
        category: 'other_expense',
        description: randomItem(expenseDescriptions.other_expense),
      });
    }
  }

  // Sort by date descending
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  return transactions;
}
