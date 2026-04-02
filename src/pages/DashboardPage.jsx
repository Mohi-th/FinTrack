import Header from '../components/layout/Header';
import SummaryCards from '../components/dashboard/SummaryCards';
import BalanceTrendChart from '../components/charts/BalanceTrendChart';
import SpendingBreakdownChart from '../components/charts/SpendingBreakdownChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import './Pages.css';

export default function DashboardPage() {
  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Good Morning' : now.getHours() < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <>
      <Header
        title={`${greeting} 👋`}
        subtitle={now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
      />
      <div className="page">
        <SummaryCards />

        <div className="page__grid-2">
          <BalanceTrendChart />
          <SpendingBreakdownChart />
        </div>

        <div className="page__grid-1">
          <RecentTransactions />
        </div>
      </div>
    </>
  );
}
