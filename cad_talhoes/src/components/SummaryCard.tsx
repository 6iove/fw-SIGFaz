import type { ReactNode } from "react"

interface SummaryCardProps {
  icon: ReactNode;
  trendText: string;
  trendColor: string;
  title: string;
  value: string;
}

export default function SummaryCard({ icon, trendText, trendColor, title, value }: SummaryCardProps) {
  return (
    <div className="flex-1 border border-gray-200 bg-white rounded-lg p-5 shadow-sm">
      <div className="flex flex-row justify-between items-center mb-3">
        <div className="w-6 h-6 flex items-center justify-center">
          {icon}
        </div>
        {/* We use template literals here to inject the specific color class */}
        <span className={`${trendColor} text-xs font-bold`}>{trendText}</span>
      </div>
      <span className="text-gray-500 text-sm font-semibold">{title}</span>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  );
}