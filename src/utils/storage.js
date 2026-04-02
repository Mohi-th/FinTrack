const STORAGE_KEY = 'fintrack_data';
const THEME_KEY = 'fintrack_theme';
const ROLE_KEY = 'fintrack_role';

/**
 * Get transactions from localStorage
 */
export const getStoredTransactions = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    console.error('Failed to parse stored transactions');
    return null;
  }
};

/**
 * Save transactions to localStorage
 */
export const saveTransactions = (transactions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (e) {
    console.error('Failed to save transactions:', e);
  }
};

/**
 * Get stored theme preference
 */
export const getStoredTheme = () => {
  return localStorage.getItem(THEME_KEY) || 'dark';
};

/**
 * Save theme preference
 */
export const saveTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
};

/**
 * Get stored role
 */
export const getStoredRole = () => {
  return localStorage.getItem(ROLE_KEY) || 'admin';
};

/**
 * Save role
 */
export const saveRole = (role) => {
  localStorage.setItem(ROLE_KEY, role);
};

/**
 * Clear all stored data
 */
export const clearStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};
