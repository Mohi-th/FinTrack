import Header from '../components/layout/Header';
import MonthlyComparisonChart from '../components/charts/MonthlyComparisonChart';
import InsightCards from '../components/insights/InsightCards';

export default function InsightsPage() {
  return (
    <>
      <Header />
      <div className="px-6 pb-6 flex flex-col gap-5 max-w-[1200px] mx-auto w-full max-sm:px-4 max-sm:gap-4 max-[360px]:px-3 max-[360px]:gap-3">
        <div className="pt-1">
          <h2 className="text-2xl font-bold text-text-primary font-display max-sm:text-xl">Insights</h2>
          <p className="text-sm text-text-muted">Financial analysis & spending patterns</p>
        </div>
        <InsightCards />
        <MonthlyComparisonChart />
      </div>
    </>
  );
}
