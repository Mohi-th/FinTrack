import { createSlice } from '@reduxjs/toolkit';
import { getStoredTheme, saveTheme, getStoredRole, saveRole } from '../../utils/storage';

const initialState = {
  theme: getStoredTheme(),          // 'dark' | 'light'
  role: getStoredRole(),            // 'admin' | 'viewer'
  sidebarOpen: true,
  mobileSidebarOpen: false,
  modalOpen: null,                  // null | 'addTransaction' | 'editTransaction'
  editingTransaction: null,
  toasts: [],                       // { id, message, type, duration }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      saveTheme(state.theme);
    },

    setTheme: (state, action) => {
      state.theme = action.payload;
      saveTheme(state.theme);
    },

    setRole: (state, action) => {
      state.role = action.payload;
      saveRole(action.payload);
    },

    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },

    toggleMobileSidebar: (state) => {
      state.mobileSidebarOpen = !state.mobileSidebarOpen;
    },

    closeMobileSidebar: (state) => {
      state.mobileSidebarOpen = false;
    },

    openModal: (state, action) => {
      state.modalOpen = action.payload.type;
      state.editingTransaction = action.payload.data || null;
    },

    closeModal: (state) => {
      state.modalOpen = null;
      state.editingTransaction = null;
    },

    addToast: (state, action) => {
      state.toasts.push({
        id: Date.now().toString(),
        duration: 3000,
        ...action.payload,
      });
    },

    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(t => t.id !== action.payload);
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  setRole,
  toggleSidebar,
  toggleMobileSidebar,
  closeMobileSidebar,
  openModal,
  closeModal,
  addToast,
  removeToast,
} = uiSlice.actions;

export default uiSlice.reducer;
