const THEME_KEY = 'fintrack_theme';

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
