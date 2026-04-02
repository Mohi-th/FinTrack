import { useSelector, useDispatch } from 'react-redux';
import { setFilter, clearFilters } from '../../store/slices/transactionSlice';
import { Search, X, Filter } from 'lucide-react';
import { CATEGORIES, SORT_OPTIONS } from '../../utils/constants';
import Button from '../common/Button';
import './TransactionFilters.css';

export default function TransactionFilters() {
  const dispatch = useDispatch();
  const filters = useSelector(s => s.transactions.filters);

  const hasFilters = filters.type !== 'all' || filters.category !== 'all' || filters.search || filters.dateFrom || filters.dateTo;

  const allCategories = [...CATEGORIES.income, ...CATEGORIES.expense];

  return (
    <div className="tx-filters animate-fade-in">
      <div className="tx-filters__row">
        {/* Search */}
        <div className="tx-filters__search">
          <Search size={16} className="tx-filters__search-icon" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={e => dispatch(setFilter({ key: 'search', value: e.target.value }))}
            className="tx-filters__search-input"
          />
          {filters.search && (
            <button
              className="tx-filters__search-clear"
              onClick={() => dispatch(setFilter({ key: 'search', value: '' }))}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Type filter */}
        <select
          value={filters.type}
          onChange={e => dispatch(setFilter({ key: 'type', value: e.target.value }))}
          className="tx-filters__select"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Category filter */}
        <select
          value={filters.category}
          onChange={e => dispatch(setFilter({ key: 'category', value: e.target.value }))}
          className="tx-filters__select"
        >
          <option value="all">All Categories</option>
          <optgroup label="Income">
            {CATEGORIES.income.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </optgroup>
          <optgroup label="Expense">
            {CATEGORIES.expense.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </optgroup>
        </select>

        {/* Sort */}
        <select
          value={filters.sort}
          onChange={e => dispatch(setFilter({ key: 'sort', value: e.target.value }))}
          className="tx-filters__select"
        >
          {SORT_OPTIONS.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <div className="tx-filters__row">
        {/* Date range */}
        <div className="tx-filters__date-group">
          <label className="tx-filters__date-label">From</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={e => dispatch(setFilter({ key: 'dateFrom', value: e.target.value }))}
            className="tx-filters__date-input"
          />
        </div>
        <div className="tx-filters__date-group">
          <label className="tx-filters__date-label">To</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={e => dispatch(setFilter({ key: 'dateTo', value: e.target.value }))}
            className="tx-filters__date-input"
          />
        </div>

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            icon={X}
            onClick={() => dispatch(clearFilters())}
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
