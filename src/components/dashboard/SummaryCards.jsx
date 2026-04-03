import { useSelector } from 'react-redux';
import { selectSummary, selectInsights } from '../../store/slices/transactionSlice';
import { TrendingUp, TrendingDown } from 'lucide-react';
import AnimatedNumber from '../common/AnimatedNumber';

export default function SummaryCards() {
  const summary = useSelector(selectSummary);
  const insights = useSelector(selectInsights);

  return (
    <div className="flex flex-col gap-5 max-lg:grid max-lg:grid-cols-2 max-[480px]:grid-cols-1">
      {/* Income Card */}
      <div className="glass-card flex-1 p-6 relative overflow-hidden max-[360px]:p-4" style={{ borderLeft: '3px solid #34D399' }}>
        {/* Green gradient tint — stronger to match reference */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.12) 0%, rgba(52, 211, 153, 0.03) 50%, transparent 100%)'
        }} />
        <div className="relative z-10">
          <span className="text-sm font-semibold text-text-muted mb-3 block">Income</span>
          <div className="text-3xl font-bold text-income font-display tracking-tight max-[480px]:text-2xl">
            <AnimatedNumber value={summary.totalIncome || 0} prefix="₹" decimals={0} duration={1200} />
          </div>
          {insights.incomeChangePercent !== undefined && (
            <div className={`flex items-center gap-1 text-xs font-medium mt-3 ${insights.incomeChangePercent >= 0 ? 'text-income' : 'text-expense'}`}>
              {insights.incomeChangePercent >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              <span>{Math.abs(insights.incomeChangePercent).toFixed(1)}% vs last month</span>
            </div>
          )}
        </div>
      </div>

      {/* Expenses Card */}
      <div className="glass-card flex-1 p-6 relative overflow-hidden max-[360px]:p-4" style={{ borderLeft: '3px solid #FB7185' }}>
        {/* Rose gradient tint — stronger to match reference */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(135deg, rgba(251, 113, 133, 0.12) 0%, rgba(251, 113, 133, 0.03) 50%, transparent 100%)'
        }} />
        <div className="relative z-10">
          <span className="text-sm font-semibold text-text-muted mb-3 block">Expenses</span>
          <div className="text-3xl font-bold text-expense font-display tracking-tight max-[480px]:text-2xl">
            <AnimatedNumber value={summary.totalExpenses || 0} prefix="₹" decimals={0} duration={1200} />
          </div>
          {insights.expenseChangePercent !== undefined && (
            <div className={`flex items-center gap-1 text-xs font-medium mt-3 ${insights.expenseChangePercent <= 0 ? 'text-income' : 'text-expense'}`}>
              {insights.expenseChangePercent <= 0 ? <TrendingDown size={13} /> : <TrendingUp size={13} />}
              <span>{Math.abs(insights.expenseChangePercent).toFixed(1)}% vs last month</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
