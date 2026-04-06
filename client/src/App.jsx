import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import InsightsPage from './pages/InsightsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import Toast from './components/common/Toast';
import { loadUser } from './store/slices/authSlice';
import { fetchTransactions } from './store/slices/transactionSlice';

function App() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.ui.theme);
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  // Check for existing token on app mount
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // Fetch transactions when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchTransactions());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen relative">
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={
          isAuthenticated && !loading ? <Navigate to="/" replace /> : <LoginPage />
        } />
        <Route path="/register" element={
          isAuthenticated && !loading ? <Navigate to="/" replace /> : <RegisterPage />
        } />

        {/* Protected routes */}
        <Route element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toast />
    </div>
  );
}

export default App;
