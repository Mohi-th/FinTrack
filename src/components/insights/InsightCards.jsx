import { useSelector } from 'react-redux';
import { selectSummary, selectInsights } from '../../store/slices/transactionSlice';
import { formatCurrency } from '../../utils/formatters';
import { getCategoryLabel } from '../../utils/constants';
import { TrendingUp, TrendingDown, PiggyBank, Receipt, Target, Flame, DollarSign, BarChart3 } from 'lucide-react';
import Card from '../common/Card';
import AnimatedNumber from '../common/AnimatedNumber';
import './InsightCards.css';

export default function InsightCards() {
  const insights = useSelector(selectInsights);
  const summary = useSelector(selectSummary);

  const insightItems = [
    {
      icon: Flame,
      title: 'Top Spending Category',
      value: insights.topCategory ? getCategoryLabel(insights.topCategory.name) : 'N/A',
      detail: insights.topCategory ? formatCurrency(insights.topCategory.amount) + ' this month' : '',
      color: '#F43F5E',
      bg: 'var(--color-expense-light)',
    },
    {
      icon: PiggyBank,
      title: 'Savings This Month',
      value: formatCurrency(insights.savingsThisMonth),
      detail: insights.savingsThisMonth >= 0 ? 'You\'re saving!' : 'Spending more than earning',
      color: insights.savingsThisMonth >= 0 ? '#10B981' : '#F43F5E',
      bg: insights.savingsThisMonth >= 0 ? 'var(--color-income-light)' : 'var(--color-expense-light)',
    },
    {
      icon: Target,
      title: 'Savings Rate',
      value: `${summary.savingsRate.toFixed(1)}%`,
      detail: 'Of total income saved',
      color: '#3B82F6',
      bg: 'var(--color-primary-light)',
    },
    {
      icon: Receipt,
      title: 'Avg. Daily Spending',
      value: formatCurrency(insights.avgDailySpending),
      detail: 'Average per day this month',
      color: '#F59E0B',
      bg: 'var(--color-warning-light)',
    },
    {
      icon: TrendingDown,
      title: 'Expense Trend',
      value: `${insights.expenseChangePercent >= 0 ? '+' : ''}${insights.expenseChangePercent.toFixed(1)}%`,
      detail: 'vs last month',
      color: insights.expenseChangePercent <= 0 ? '#10B981' : '#F43F5E',
      bg: insights.expenseChangePercent <= 0 ? 'var(--color-income-light)' : 'var(--color-expense-light)',
    },
    {
      icon: TrendingUp,
      title: 'Income Trend',
      value: `${insights.incomeChangePercent >= 0 ? '+' : ''}${insights.incomeChangePercent.toFixed(1)}%`,
      detail: 'vs last month',
      color: insights.incomeChangePercent >= 0 ? '#10B981' : '#F43F5E',
      bg: insights.incomeChangePercent >= 0 ? 'var(--color-income-light)' : 'var(--color-expense-light)',
    },
  ];

  return (
    <div className="insight-cards stagger-children">
      {insightItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <Card key={idx} className="insight-card" hover padding="md">
            <div className="insight-card__icon" style={{ background: item.bg, color: item.color }}>
              <Icon size={22} />
            </div>
            <div className="insight-card__content">
              <span className="insight-card__title">{item.title}</span>
              <span className="insight-card__value" style={{ color: item.color }}>{item.value}</span>
              <span className="insight-card__detail">{item.detail}</span>
            </div>
          </Card>
        );
      })}

      {/* Category Breakdown Detail */}
      {insights.categoryBreakdownThisMonth.length > 0 && (
        <Card className="insight-category-card" padding="md" style={{ gridColumn: '1 / -1' }}>
          <div className="insight-category-card__header">
            <BarChart3 size={20} className="text-primary-color" />
            <h3>This Month's Spending Breakdown</h3>
          </div>
          <div className="insight-category-bars">
            {insights.categoryBreakdownThisMonth.slice(0, 6).map((cat, i) => {
              const maxAmount = insights.categoryBreakdownThisMonth[0]?.amount || 1;
              const widthPct = (cat.amount / maxAmount) * 100;
              return (
                <div key={cat.category} className="insight-bar-item" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="insight-bar-item__label">
                    <span className="insight-bar-item__name">{getCategoryLabel(cat.category)}</span>
                    <span className="insight-bar-item__amount">{formatCurrency(cat.amount)}</span>
                  </div>
                  <div className="insight-bar-item__track">
                    <div
                      className="insight-bar-item__fill"
                      style={{
                        width: `${widthPct}%`,
                        background: `hsl(${220 + i * 25}, 70%, 55%)`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
