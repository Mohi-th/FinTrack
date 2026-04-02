import { useSelector, useDispatch } from 'react-redux';
import { selectPaginatedTransactions, deleteTransaction, setPage } from '../../store/slices/transactionSlice';
import { openModal, addToast } from '../../store/slices/uiSlice';
import { getCategoryLabel } from '../../utils/constants';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { ArrowUpRight, ArrowDownRight, Edit2, Trash2, ChevronLeft, ChevronRight, Inbox } from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import EmptyState from '../common/EmptyState';
import './TransactionList.css';

export default function TransactionList() {
  const dispatch = useDispatch();
  const { data: transactions, total, totalPages, currentPage } = useSelector(selectPaginatedTransactions);
  const role = useSelector(s => s.ui.role);
  const isAdmin = role === 'admin';

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch(deleteTransaction(id));
      dispatch(addToast({ message: 'Transaction deleted', type: 'success' }));
    }
  };

  const handleEdit = (tx) => {
    dispatch(openModal({ type: 'editTransaction', data: tx }));
  };

  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="No transactions found"
        message="Try adjusting your filters or add a new transaction."
      />
    );
  }

  return (
    <div className="tx-list">
      {/* Desktop table */}
      <div className="tx-table-wrapper">
        <table className="tx-table">
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Type</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <tr key={tx.id} className="tx-table__row" style={{ animationDelay: `${i * 30}ms` }}>
                <td>
                  <div className="tx-table__txn">
                    <div className={`tx-table__icon ${tx.type === 'income' ? 'tx-table__icon--income' : 'tx-table__icon--expense'}`}>
                      {tx.type === 'income' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    </div>
                    <span className="tx-table__desc">{tx.description}</span>
                  </div>
                </td>
                <td>
                  <Badge variant="default">{getCategoryLabel(tx.category)}</Badge>
                </td>
                <td className="tx-table__date">{formatDate(tx.date)}</td>
                <td>
                  <span className={tx.type === 'income' ? 'text-income' : 'text-expense'} style={{ fontWeight: 700 }}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </span>
                </td>
                <td>
                  <Badge variant={tx.type}>{tx.type}</Badge>
                </td>
                {isAdmin && (
                  <td>
                    <div className="tx-table__actions">
                      <button className="tx-table__action-btn" onClick={() => handleEdit(tx)} title="Edit">
                        <Edit2 size={15} />
                      </button>
                      <button className="tx-table__action-btn tx-table__action-btn--danger" onClick={() => handleDelete(tx.id)} title="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="tx-mobile-list">
        {transactions.map((tx, i) => (
          <div key={tx.id} className="tx-mobile-card" style={{ animationDelay: `${i * 30}ms` }}>
            <div className="tx-mobile-card__top">
              <div className={`tx-table__icon ${tx.type === 'income' ? 'tx-table__icon--income' : 'tx-table__icon--expense'}`}>
                {tx.type === 'income' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              </div>
              <div className="tx-mobile-card__info">
                <span className="tx-mobile-card__desc">{tx.description}</span>
                <span className="tx-mobile-card__meta">{getCategoryLabel(tx.category)} · {formatDate(tx.date, 'dayMonth')}</span>
              </div>
              <div className="tx-mobile-card__amount-group">
                <span className={`tx-mobile-card__amount ${tx.type === 'income' ? 'text-income' : 'text-expense'}`}>
                  {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                </span>
                {isAdmin && (
                  <div className="tx-table__actions">
                    <button className="tx-table__action-btn" onClick={() => handleEdit(tx)} title="Edit">
                      <Edit2 size={14} />
                    </button>
                    <button className="tx-table__action-btn tx-table__action-btn--danger" onClick={() => handleDelete(tx.id)} title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="tx-pagination">
          <span className="tx-pagination__info">
            Showing {(currentPage - 1) * 10 + 1}–{Math.min(currentPage * 10, total)} of {total}
          </span>
          <div className="tx-pagination__controls">
            <button
              className="tx-pagination__btn"
              disabled={currentPage === 1}
              onClick={() => dispatch(setPage(currentPage - 1))}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let page;
              if (totalPages <= 5) {
                page = i + 1;
              } else if (currentPage <= 3) {
                page = i + 1;
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = currentPage - 2 + i;
              }
              return (
                <button
                  key={page}
                  className={`tx-pagination__btn ${currentPage === page ? 'tx-pagination__btn--active' : ''}`}
                  onClick={() => dispatch(setPage(page))}
                >
                  {page}
                </button>
              );
            })}
            <button
              className="tx-pagination__btn"
              disabled={currentPage === totalPages}
              onClick={() => dispatch(setPage(currentPage + 1))}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
