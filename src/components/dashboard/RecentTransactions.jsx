import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectRecentTransactions } from '../../store/slices/transactionSlice';
import { getCategoryLabel } from '../../utils/constants';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { ArrowUpRight, ArrowDownRight, ChevronRight } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import './RecentTransactions.css';

export default function RecentTransactions() {
  const recent = useSelector(selectRecentTransactions);
  const navigate = useNavigate();

  return (
    <Card className="recent-transactions animate-fade-in-up" padding="none">
      <div className="recent-transactions__header">
        <h3 className="recent-transactions__title">Recent Transactions</h3>
        <button className="recent-transactions__view-all" onClick={() => navigate('/transactions')}>
          View All <ChevronRight size={16} />
        </button>
      </div>
      <div className="recent-transactions__list">
        {recent.map(tx => (
          <div key={tx.id} className="recent-tx">
            <div className={`recent-tx__icon ${tx.type === 'income' ? 'recent-tx__icon--income' : 'recent-tx__icon--expense'}`}>
              {tx.type === 'income' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
            </div>
            <div className="recent-tx__info">
              <span className="recent-tx__desc">{tx.description}</span>
              <span className="recent-tx__meta">
                {getCategoryLabel(tx.category)} · {formatDate(tx.date, 'dayMonth')}
              </span>
            </div>
            <div className="recent-tx__right">
              <span className={`recent-tx__amount ${tx.type === 'income' ? 'text-income' : 'text-expense'}`}>
                {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
              </span>
              <Badge variant={tx.type} size="sm">{tx.type}</Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
