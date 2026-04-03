import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useSelector } from 'react-redux';
import { selectMonthlyData } from '../../store/slices/transactionSlice';
import { formatCurrency } from '../../utils/formatters';
import Card from '../common/Card';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-secondary border border-border rounded-md px-4 py-3 shadow-md">
      <p className="text-xs text-text-muted mb-1 font-semibold">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-[0.8125rem] font-semibold text-text-primary" style={{ color: entry.color }}>
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
};

export default function MonthlyComparisonChart() {
  const monthlyData = useSelector(selectMonthlyData);

  return (
    <Card className="animate-fade-in-up" padding="md">
      <div className="flex items-baseline justify-between mb-5">
        <h3 className="text-base font-bold text-text-primary">Income vs Expenses</h3>
        <span className="text-xs text-text-muted font-medium">Monthly comparison</span>
      </div>
      <div className="w-full" style={{ height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="var(--color-text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--color-text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}
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
