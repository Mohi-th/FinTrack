import { useSelector } from 'react-redux';
import { selectSummary, selectInsights } from '../../store/slices/transactionSlice';
import { formatCurrency } from '../../utils/formatters';
import { getCategoryLabel } from '../../utils/constants';
import { TrendingUp, TrendingDown, PiggyBank, Receipt, Target, Flame, BarChart3 } from 'lucide-react';
import Card from '../common/Card';

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
      bg: 'bg-expense-light',
      textColor: 'text-expense',
    },
    {
      icon: PiggyBank,
      title: 'Savings This Month',
      value: formatCurrency(insights.savingsThisMonth),
      detail: insights.savingsThisMonth >= 0 ? 'You\'re saving!' : 'Spending more than earning',
      color: insights.savingsThisMonth >= 0 ? '#10B981' : '#F43F5E',
      bg: insights.savingsThisMonth >= 0 ? 'bg-income-light' : 'bg-expense-light',
      textColor: insights.savingsThisMonth >= 0 ? 'text-income' : 'text-expense',
    },
    {
      icon: Target,
      title: 'Savings Rate',
      value: `${summary.savingsRate.toFixed(1)}%`,
      detail: 'Of total income saved',
      color: '#3B82F6',
      bg: 'bg-primary-light',
      textColor: 'text-primary',
    },
    {
      icon: Receipt,
      title: 'Avg. Daily Spending',
      value: formatCurrency(insights.avgDailySpending),
      detail: 'Average per day this month',
      color: '#F59E0B',
      bg: 'bg-warning-light',
      textColor: 'text-warning',
    },
    {
      icon: TrendingDown,
      title: 'Expense Trend',
      value: `${insights.expenseChangePercent >= 0 ? '+' : ''}${insights.expenseChangePercent.toFixed(1)}%`,
      detail: 'vs last month',
      color: insights.expenseChangePercent <= 0 ? '#10B981' : '#F43F5E',
      bg: insights.expenseChangePercent <= 0 ? 'bg-income-light' : 'bg-expense-light',
      textColor: insights.expenseChangePercent <= 0 ? 'text-income' : 'text-expense',
    },
    {
      icon: TrendingUp,
      title: 'Income Trend',
      value: `${insights.incomeChangePercent >= 0 ? '+' : ''}${insights.incomeChangePercent.toFixed(1)}%`,
      detail: 'vs last month',
      color: insights.incomeChangePercent >= 0 ? '#10B981' : '#F43F5E',
      bg: insights.incomeChangePercent >= 0 ? 'bg-income-light' : 'bg-expense-light',
      textColor: insights.incomeChangePercent >= 0 ? 'text-income' : 'text-expense',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1 stagger-children">
      {insightItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <Card key={idx} className="flex items-start gap-4" hover padding="md">
            <div className={`w-11 h-11 rounded-md flex items-center justify-center shrink-0 ${item.bg}`} style={{ color: item.color }}>
              <Icon size={22} />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">{item.title}</span>
              <span className="text-xl font-extrabold tracking-tight" style={{ color: item.color }}>{item.value}</span>
              <span className="text-xs text-text-secondary font-medium">{item.detail}</span>
            </div>
          </Card>
        );
      })}

      {/* Category Breakdown Detail */}
      {insights.categoryBreakdownThisMonth.length > 0 && (
        <Card className="col-span-full" padding="md">
          <div className="flex items-center gap-3 mb-5">
            <BarChart3 size={20} className="text-primary" />
            <h3 className="text-base font-bold text-text-primary">This Month's Spending Breakdown</h3>
          </div>
          <div className="flex flex-col gap-4">
            {insights.categoryBreakdownThisMonth.slice(0, 6).map((cat, i) => {
              const maxAmount = insights.categoryBreakdownThisMonth[0]?.amount || 1;
              const widthPct = (cat.amount / maxAmount) * 100;
              return (
                <div key={cat.category} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[0.8125rem] font-semibold text-text-primary">{getCategoryLabel(cat.category)}</span>
                    <span className="text-[0.8125rem] font-bold text-text-secondary">{formatCurrency(cat.amount)}</span>
                  </div>
                  <div className="h-2 bg-bg-primary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full animate-bar-grow"
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
