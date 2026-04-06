import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register, clearAuthError, selectAuth } from '../store/slices/authSlice';
import { Wallet, User, Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(selectAuth);

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Must be at least 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(register({ name: form.name.trim(), email: form.email.trim(), password: form.password }));
  };

  const handleChange = (key, value) => {
    setForm(f => ({ ...f, [key]: value }));
    if (formErrors[key]) setFormErrors(e => ({ ...e, [key]: '' }));
    if (error) dispatch(clearAuthError());
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Aurora Background */}
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
      </div>

      <div className="w-full max-w-[420px] relative z-10 animate-fade-in-up">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-[#22D3EE] flex items-center justify-center text-white shadow-[0_4px_24px_rgba(139,92,246,0.4)]">
            <Wallet size={28} />
          </div>
          <h1 className="text-2xl font-bold text-text-primary font-display">Create account</h1>
          <p className="text-sm text-text-muted">Start tracking your finances with FinTrack</p>
        </div>

        {/* Form Card */}
        <div className="glass-card-static p-6 rounded-2xl">
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-[#FB718533] border border-[#FB718544] text-[#FB7185] text-sm font-medium animate-fade-in">
              {error}
            </div>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.8125rem] font-semibold text-text-secondary">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-bg-elevated border rounded-xl text-text-primary text-sm transition-all duration-200 focus:border-primary focus:shadow-[0_0_0_3px_var(--color-primary-light)] placeholder:text-text-muted ${formErrors.name ? 'border-[#FB7185]' : 'border-[var(--color-glass-border)]'}`}
                  disabled={loading}
                />
              </div>
              {formErrors.name && <span className="text-xs text-[#FB7185] font-medium">{formErrors.name}</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.8125rem] font-semibold text-text-secondary">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-bg-elevated border rounded-xl text-text-primary text-sm transition-all duration-200 focus:border-primary focus:shadow-[0_0_0_3px_var(--color-primary-light)] placeholder:text-text-muted ${formErrors.email ? 'border-[#FB7185]' : 'border-[var(--color-glass-border)]'}`}
                  disabled={loading}
                />
              </div>
              {formErrors.email && <span className="text-xs text-[#FB7185] font-medium">{formErrors.email}</span>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.8125rem] font-semibold text-text-secondary">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={e => handleChange('password', e.target.value)}
                  className={`w-full pl-10 pr-11 py-3 bg-bg-elevated border rounded-xl text-text-primary text-sm transition-all duration-200 focus:border-primary focus:shadow-[0_0_0_3px_var(--color-primary-light)] placeholder:text-text-muted ${formErrors.password ? 'border-[#FB7185]' : 'border-[var(--color-glass-border)]'}`}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {formErrors.password && <span className="text-xs text-[#FB7185] font-medium">{formErrors.password}</span>}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.8125rem] font-semibold text-text-secondary">Confirm Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={e => handleChange('confirmPassword', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-bg-elevated border rounded-xl text-text-primary text-sm transition-all duration-200 focus:border-primary focus:shadow-[0_0_0_3px_var(--color-primary-light)] placeholder:text-text-muted ${formErrors.confirmPassword ? 'border-[#FB7185]' : 'border-[var(--color-glass-border)]'}`}
                  disabled={loading}
                />
              </div>
              {formErrors.confirmPassword && <span className="text-xs text-[#FB7185] font-medium">{formErrors.confirmPassword}</span>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary to-[#22D3EE] shadow-[0_4px_16px_rgba(139,92,246,0.3)] transition-all duration-200 hover:shadow-[0_6px_24px_rgba(139,92,246,0.45)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer link */}
        <p className="text-center mt-6 text-sm text-text-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
