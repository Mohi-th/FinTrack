import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';
import { selectCategoryBreakdown } from '../../store/slices/transactionSlice';
import { getCategoryLabel } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';
import { CHART_COLORS } from '../../utils/constants';
import Card from '../common/Card';
import './Charts.css';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{getCategoryLabel(data.category)}</p>
      <p className="chart-tooltip__value">{formatCurrency(data.amount)}</p>
      <p className="chart-tooltip__pct">{data.percentage}%</p>
    </div>
  );
};

export default function SpendingBreakdownChart() {
  const breakdown = useSelector(selectCategoryBreakdown);
  const topCategories = breakdown.slice(0, 8);

  return (
    <Card className="chart-card animate-fade-in-up" padding="md">
      <div className="chart-card__header">
        <h3 className="chart-card__title">Spending Breakdown</h3>
        <span className="chart-card__subtitle">By category</span>
      </div>
      <div className="spending-breakdown">
        <div className="spending-breakdown__chart" style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topCategories}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={3}
                dataKey="amount"
                stroke="none"
                animationBegin={200}
                animationDuration={800}
              >
                {topCategories.map((entry, index) => (
                  <Cell key={entry.category} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="spending-breakdown__legend">
          {topCategories.map((item, index) => (
            <div key={item.category} className="spending-breakdown__legend-item">
              <div className="spending-breakdown__legend-dot" style={{ background: CHART_COLORS[index % CHART_COLORS.length] }} />
              <span className="spending-breakdown__legend-label">{getCategoryLabel(item.category)}</span>
              <span className="spending-breakdown__legend-value">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
