import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTransactionAsync,
  updateTransactionAsync,
  selectTransactionLoading,
} from '../../store/slices/transactionSlice';
import { closeModal, addToast } from '../../store/slices/uiSlice';
import { CATEGORIES } from '../../utils/constants';
import { Loader2 } from 'lucide-react';
import Button from '../common/Button';

const inputClasses = 'px-4 py-3 bg-bg-primary border border-border rounded-md text-text-primary text-sm transition-all duration-150 h-[42px] focus:border-primary focus:shadow-[0_0_0_3px_var(--color-primary-light)] placeholder:text-text-muted';

export default function TransactionForm() {
  const dispatch = useDispatch();
  const editingTx = useSelector(s => s.ui.editingTransaction);
  const loading = useSelector(selectTransactionLoading);

  const [form, setForm] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'food',
    date: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTx) {
      setForm({
        description: editingTx.description,
        amount: editingTx.amount.toString(),
        type: editingTx.type,
        category: editingTx.category,
        date: new Date(editingTx.date).toISOString().split('T')[0],
      });
    }
  }, [editingTx]);

  const categories = CATEGORIES[form.type] || [];

  // Reset category when type changes (if not editing)
  useEffect(() => {
    if (!editingTx) {
      setForm(f => ({ ...f, category: categories[0]?.value || '' }));
    }
  }, [form.type]);

  const validate = () => {
    const errs = {};
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.amount || parseFloat(form.amount) <= 0) errs.amount = 'Enter a valid amount';
    if (!form.date) errs.date = 'Date is required';
    if (!form.category) errs.category = 'Select a category';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const txData = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category,
      date: new Date(form.date).toISOString(),
    };

    try {
      if (editingTx) {
        await dispatch(updateTransactionAsync({ ...txData, id: editingTx.id })).unwrap();
        dispatch(addToast({ message: 'Transaction updated successfully', type: 'success' }));
      } else {
        await dispatch(addTransactionAsync(txData)).unwrap();
        dispatch(addToast({ message: 'Transaction added successfully', type: 'success' }));
      }
      dispatch(closeModal());
    } catch (err) {
      dispatch(addToast({ message: err || 'Something went wrong', type: 'error' }));
    }
  };

  const handleChange = (key, value) => {
    setForm(f => ({ ...f, [key]: value }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };

  const errorBorder = 'border-expense focus:shadow-[0_0_0_3px_var(--color-expense-light)]';

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {/* Type toggle */}
      <div className="flex gap-2 bg-bg-primary rounded-md p-1">
        <button
          type="button"
          className={`flex-1 px-4 py-2 rounded-[6px] text-[0.8125rem] font-semibold transition-all duration-200 ${
            form.type === 'expense'
              ? 'bg-expense text-white shadow-[0_2px_8px_rgba(244,63,94,0.3)]'
              : 'text-text-secondary hover:text-text-primary'
          }`}
          onClick={() => handleChange('type', 'expense')}
          disabled={loading}
        >
          Expense
        </button>
        <button
          type="button"
          className={`flex-1 px-4 py-2 rounded-[6px] text-[0.8125rem] font-semibold transition-all duration-200 ${
            form.type === 'income'
              ? 'bg-income text-white shadow-[0_2px_8px_rgba(16,185,129,0.3)]'
              : 'text-text-secondary hover:text-text-primary'
          }`}
          onClick={() => handleChange('type', 'income')}
          disabled={loading}
        >
          Income
        </button>
      </div>

      {/* Amount */}
      <div className="flex flex-col gap-2">
        <label className="text-[0.8125rem] font-semibold text-text-secondary">Amount</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-lg font-bold">₹</span>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={form.amount}
            onChange={e => handleChange('amount', e.target.value)}
            className={`${inputClasses} w-full !pl-9 !text-xl !font-bold !h-[52px] ${errors.amount ? errorBorder : ''}`}
            disabled={loading}
          />
        </div>
        {errors.amount && <span className="text-xs text-expense font-medium">{errors.amount}</span>}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label className="text-[0.8125rem] font-semibold text-text-secondary">Description</label>
        <input
          type="text"
          placeholder="What was this for?"
          value={form.description}
          onChange={e => handleChange('description', e.target.value)}
          className={`${inputClasses} ${errors.description ? errorBorder : ''}`}
          disabled={loading}
        />
        {errors.description && <span className="text-xs text-expense font-medium">{errors.description}</span>}
      </div>

      {/* Category */}
      <div className="flex flex-col gap-2">
        <label className="text-[0.8125rem] font-semibold text-text-secondary">Category</label>
        <select
          value={form.category}
          onChange={e => handleChange('category', e.target.value)}
          className={`${inputClasses} cursor-pointer ${errors.category ? errorBorder : ''}`}
          disabled={loading}
        >
          {categories.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        {errors.category && <span className="text-xs text-expense font-medium">{errors.category}</span>}
      </div>

      {/* Date */}
      <div className="flex flex-col gap-2">
        <label className="text-[0.8125rem] font-semibold text-text-secondary">Date</label>
        <input
          type="date"
          value={form.date}
          onChange={e => handleChange('date', e.target.value)}
          className={`${inputClasses} date-picker-dark ${errors.date ? errorBorder : ''}`}
          disabled={loading}
        />
        {errors.date && <span className="text-xs text-expense font-medium">{errors.date}</span>}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-3 border-t border-border">
        <Button variant="ghost" onClick={() => dispatch(closeModal())} disabled={loading}>Cancel</Button>
        <Button type="submit" variant={form.type === 'income' ? 'success' : 'primary'} disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              {editingTx ? 'Updating...' : 'Adding...'}
            </span>
          ) : (
            `${editingTx ? 'Update' : 'Add'} Transaction`
          )}
        </Button>
      </div>
    </form>
  );
}
