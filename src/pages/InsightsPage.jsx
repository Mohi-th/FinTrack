import Header from '../components/layout/Header';
import MonthlyComparisonChart from '../components/charts/MonthlyComparisonChart';
import InsightCards from '../components/insights/InsightCards';
import './Pages.css';

export default function InsightsPage() {
  return (
    <>
      <Header title="Insights" subtitle="Financial analysis & spending patterns" />
      <div className="page">
        <InsightCards />
        <MonthlyComparisonChart />
      </div>
    </>
  );
}
