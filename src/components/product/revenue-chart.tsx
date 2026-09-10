import { weeklyRevenue } from "@/data/product";
import { formatCurrency } from "@/lib/format";

export function RevenueChart() {
  const maximum = Math.max(...weeklyRevenue.map((entry) => entry.amount));
  return (
    <div
      className="revenue-chart"
      role="img"
      aria-label={`Khoản thu minh họa trong 7 ngày: ${weeklyRevenue.map((entry) => `${entry.day}: ${formatCurrency(entry.amount)}`).join(", ")}`}
    >
      <div className="chart-axis" aria-hidden="true">
        <span>600k</span>
        <span>300k</span>
        <span>0</span>
      </div>
      <div className="chart-bars" aria-hidden="true">
        {weeklyRevenue.map((entry, index) => (
          <div key={entry.day} className="chart-column">
            <div
              className={`chart-bar ${index === weeklyRevenue.length - 1 ? "chart-bar-current" : ""}`}
              style={{ height: `${(entry.amount / maximum) * 86}%` }}
            />
            <span>{entry.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
