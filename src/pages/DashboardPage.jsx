import { useSelector } from 'react-redux';
import { selectSummary, selectInsights } from '../store/slices/transactionSlice';
import Header from '../components/layout/Header';
import SummaryCards from '../components/dashboard/SummaryCards';
import BalanceTrendChart from '../components/charts/BalanceTrendChart';
import SpendingBreakdownChart from '../components/charts/SpendingBreakdownChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import AnimatedNumber from '../components/common/AnimatedNumber';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Good Morning' : now.getHours() < 18 ? 'Good Afternoon' : 'Good Evening';
  const summary = useSelector(selectSummary);
  const insights = useSelector(selectInsights);

  return (
    <>
      <Header />

      <div className="px-6 pb-6 flex flex-col gap-6 max-w-[1200px] mx-auto w-full max-sm:px-4 max-sm:gap-5 max-[360px]:px-3 max-[360px]:gap-4">

        {/* ═══ HERO SECTION ═══ */}
        <div className="animate-fade-in-up pt-2">
          <h2 className="text-2xl font-bold text-text-primary font-display mb-1 max-sm:text-xl">{greeting} 👋</h2>
          <div className="flex items-end gap-4 flex-wrap max-sm:gap-2">
            <div className="hero-balance">
              <AnimatedNumber value={summary.totalBalance} prefix="₹" decimals={2} duration={1400} />
            </div>
            <div className={`flex items-center gap-1.5 text-sm font-semibold pb-2 ${insights.incomeChangePercent >= 0 ? 'text-income' : 'text-expense'}`}>
              {insights.incomeChangePercent >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>{insights.incomeChangePercent >= 0 ? '+' : ''}{insights.incomeChangePercent.toFixed(1)}% from last month</span>
            </div>
          </div>
        </div>

        {/* ═══ BENTO GRID ROW 1 — Income/Expenses left, Balance Trend right ═══ */}
        <div className="grid grid-cols-[1fr_1.8fr] gap-5 max-lg:grid-cols-1">
          {/* Left: stacked stat cards */}
          <SummaryCards />
          {/* Right: tall chart */}
          <BalanceTrendChart />
        </div>

        {/* ═══ BENTO GRID ROW 2 — Spending Breakdown + Recent Transactions ═══ */}
        <div className="grid grid-cols-[1fr_1.2fr] gap-5 max-lg:grid-cols-1">
          <SpendingBreakdownChart />
          <RecentTransactions />
        </div>
      </div>
    </>
  );
}
