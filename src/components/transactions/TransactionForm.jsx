import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, updateTransaction } from '../../store/slices/transactionSlice';
import { closeModal, addToast } from '../../store/slices/uiSlice';
import { CATEGORIES } from '../../utils/constants';
import Button from '../common/Button';
import './TransactionForm.css';

export default function TransactionForm() {
  const dispatch = useDispatch();
  const editingTx = useSelector(s => s.ui.editingTransaction);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const txData = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category,
      date: new Date(form.date).toISOString(),
    };

    if (editingTx) {
      dispatch(updateTransaction({ ...txData, id: editingTx.id }));
      dispatch(addToast({ message: 'Transaction updated successfully', type: 'success' }));
    } else {
      dispatch(addTransaction(txData));
      dispatch(addToast({ message: 'Transaction added successfully', type: 'success' }));
    }

    dispatch(closeModal());
  };

  const handleChange = (key, value) => {
    setForm(f => ({ ...f, [key]: value }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };

  return (
    <form className="tx-form" onSubmit={handleSubmit}>
      {/* Type toggle */}
      <div className="tx-form__type-toggle">
        <button
          type="button"
          className={`tx-form__type-btn ${form.type === 'expense' ? 'tx-form__type-btn--expense tx-form__type-btn--active' : ''}`}
          onClick={() => handleChange('type', 'expense')}
        >
          Expense
        </button>
        <button
          type="button"
          className={`tx-form__type-btn ${form.type === 'income' ? 'tx-form__type-btn--income tx-form__type-btn--active' : ''}`}
          onClick={() => handleChange('type', 'income')}
        >
          Income
        </button>
      </div>

      {/* Amount */}
      <div className="tx-form__field">
        <label className="tx-form__label">Amount</label>
        <div className="tx-form__amount-wrapper">
          <span className="tx-form__currency">$</span>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={form.amount}
            onChange={e => handleChange('amount', e.target.value)}
            className={`tx-form__input tx-form__input--amount ${errors.amount ? 'tx-form__input--error' : ''}`}
          />
        </div>
        {errors.amount && <span className="tx-form__error">{errors.amount}</span>}
      </div>

      {/* Description */}
      <div className="tx-form__field">
        <label className="tx-form__label">Description</label>
        <input
          type="text"
          placeholder="What was this for?"
          value={form.description}
          onChange={e => handleChange('description', e.target.value)}
          className={`tx-form__input ${errors.description ? 'tx-form__input--error' : ''}`}
        />
        {errors.description && <span className="tx-form__error">{errors.description}</span>}
      </div>

      {/* Category */}
      <div className="tx-form__field">
        <label className="tx-form__label">Category</label>
        <select
          value={form.category}
          onChange={e => handleChange('category', e.target.value)}
          className={`tx-form__input ${errors.category ? 'tx-form__input--error' : ''}`}
        >
          {categories.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        {errors.category && <span className="tx-form__error">{errors.category}</span>}
      </div>

      {/* Date */}
      <div className="tx-form__field">
        <label className="tx-form__label">Date</label>
        <input
          type="date"
          value={form.date}
          onChange={e => handleChange('date', e.target.value)}
          className={`tx-form__input ${errors.date ? 'tx-form__input--error' : ''}`}
        />
        {errors.date && <span className="tx-form__error">{errors.date}</span>}
      </div>

      {/* Actions */}
      <div className="tx-form__actions">
        <Button variant="ghost" onClick={() => dispatch(closeModal())}>Cancel</Button>
        <Button type="submit" variant={form.type === 'income' ? 'success' : 'primary'}>
          {editingTx ? 'Update' : 'Add'} Transaction
        </Button>
      </div>
    </form>
  );
}
