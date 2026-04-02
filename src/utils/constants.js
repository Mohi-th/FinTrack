export const CATEGORIES = {
  income: [
    { value: 'salary', label: 'Salary', icon: 'Briefcase' },
    { value: 'freelance', label: 'Freelance', icon: 'Laptop' },
    { value: 'investments', label: 'Investments', icon: 'TrendingUp' },
    { value: 'gifts', label: 'Gifts', icon: 'Gift' },
    { value: 'other_income', label: 'Other Income', icon: 'Plus' },
  ],
  expense: [
    { value: 'food', label: 'Food & Dining', icon: 'UtensilsCrossed' },
    { value: 'shopping', label: 'Shopping', icon: 'ShoppingBag' },
    { value: 'transport', label: 'Transport', icon: 'Car' },
    { value: 'entertainment', label: 'Entertainment', icon: 'Gamepad2' },
    { value: 'bills', label: 'Bills & Utilities', icon: 'Zap' },
    { value: 'healthcare', label: 'Healthcare', icon: 'Heart' },
    { value: 'education', label: 'Education', icon: 'GraduationCap' },
    { value: 'travel', label: 'Travel', icon: 'Plane' },
    { value: 'groceries', label: 'Groceries', icon: 'ShoppingCart' },
    { value: 'other_expense', label: 'Other', icon: 'MoreHorizontal' },
  ],
};

export const ALL_CATEGORIES = [...CATEGORIES.income, ...CATEGORIES.expense];

export const getCategoryLabel = (value) => {
  const cat = ALL_CATEGORIES.find(c => c.value === value);
  return cat ? cat.label : value;
};

export const getCategoryIcon = (value) => {
  const cat = ALL_CATEGORIES.find(c => c.value === value);
  return cat ? cat.icon : 'Circle';
};

export const ROLES = {
  ADMIN: 'admin',
  VIEWER: 'viewer',
};

export const CHART_COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#F43F5E',
  '#8B5CF6', '#06B6D4', '#EC4899', '#64748B',
  '#84CC16', '#F97316',
];

export const SORT_OPTIONS = [
  { value: 'date_desc', label: 'Newest First' },
  { value: 'date_asc', label: 'Oldest First' },
  { value: 'amount_desc', label: 'Highest Amount' },
  { value: 'amount_asc', label: 'Lowest Amount' },
];

export const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export const LOTTIE_URLS = {
  welcome: 'https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie',
  loading: 'https://lottie.host/935b4431-4e73-4680-b2f3-f6a74c003219/sYrevQ57eU.lottie',
  empty: 'https://lottie.host/182a41dc-a6e3-4154-8be0-58cd81d28c55/qTv0gM3xYi.lottie',
  success: 'https://lottie.host/ef520de5-d3ae-4418-964b-085ede9e069a/JCFpFPIGol.lottie',
  finance: 'https://lottie.host/c6e5ee02-b0b3-4e45-b9b5-2e0283a35f2a/DpYmVGLjv8.lottie',
  noData: 'https://lottie.host/2a0f4193-d64e-4e88-9a42-c3e484da8e6c/KL3lODEvNX.lottie',
};
