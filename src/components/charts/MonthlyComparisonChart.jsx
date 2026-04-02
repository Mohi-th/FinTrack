import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useSelector } from 'react-redux';
import { selectMonthlyData } from '../../store/slices/transactionSlice';
import { formatCurrency } from '../../utils/formatters';
import Card from '../common/Card';
import './Charts.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="chart-tooltip__value" style={{ color: entry.color }}>
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
};

export default function MonthlyComparisonChart() {
  const monthlyData = useSelector(selectMonthlyData);

  return (
    <Card className="chart-card animate-fade-in-up" padding="md">
      <div className="chart-card__header">
        <h3 className="chart-card__title">Income vs Expenses</h3>
        <span className="chart-card__subtitle">Monthly comparison</span>
      </div>
      <div className="chart-card__body" style={{ height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="var(--text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '12px', color: 'var(--text-secondary)' }}
            />
            <Bar
              dataKey="income"
              name="Income"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
              animationDuration={800}
            />
            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#F43F5E"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
              animationDuration={800}
              animationBegin={200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
