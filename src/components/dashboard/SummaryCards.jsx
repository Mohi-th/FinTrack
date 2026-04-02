import { useSelector } from 'react-redux';
import { selectSummary, selectInsights } from '../../store/slices/transactionSlice';
import { Wallet, TrendingUp, TrendingDown, ArrowLeftRight } from 'lucide-react';
import AnimatedNumber from '../common/AnimatedNumber';
import Card from '../common/Card';
import './SummaryCards.css';

const cards = [
  {
    key: 'totalBalance',
    label: 'Total Balance',
    icon: Wallet,
    colorClass: 'summary-card--primary',
    prefix: '$',
  },
  {
    key: 'totalIncome',
    label: 'Total Income',
    icon: TrendingUp,
    colorClass: 'summary-card--income',
    prefix: '$',
  },
  {
    key: 'totalExpenses',
    label: 'Total Expenses',
    icon: TrendingDown,
    colorClass: 'summary-card--expense',
    prefix: '$',
  },
  {
    key: 'transactionCount',
    label: 'Transactions',
    icon: ArrowLeftRight,
    colorClass: 'summary-card--info',
    prefix: '',
    decimals: 0,
  },
];

export default function SummaryCards() {
  const summary = useSelector(selectSummary);
  const insights = useSelector(selectInsights);

  const getTrend = (key) => {
    if (key === 'totalExpenses') return insights.expenseChangePercent;
    if (key === 'totalIncome') return insights.incomeChangePercent;
    return null;
  };

  return (
    <div className="summary-cards stagger-children">
      {cards.map(card => {
        const Icon = card.icon;
        const value = summary[card.key] || 0;
        const trend = getTrend(card.key);

        return (
          <Card key={card.key} className={`summary-card ${card.colorClass}`} hover padding="md">
            <div className="summary-card__header">
              <span className="summary-card__label">{card.label}</span>
              <div className="summary-card__icon">
                <Icon size={20} />
              </div>
            </div>
            <div className="summary-card__value">
              <AnimatedNumber
                value={value}
                prefix={card.prefix}
                decimals={card.decimals !== undefined ? card.decimals : 2}
                duration={1200}
              />
            </div>
            {trend !== null && (
              <div className={`summary-card__trend ${trend >= 0 ? 'summary-card__trend--up' : 'summary-card__trend--down'}`}>
                {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{Math.abs(trend).toFixed(1)}% vs last month</span>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
