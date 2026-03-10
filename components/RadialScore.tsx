import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface RadialScoreProps {
  score: number;
  label: string;
  color: string;
  isDark: boolean;
}

export const RadialScore: React.FC<RadialScoreProps> = ({ score, label, color, isDark }) => {
  const data = [
    { name: 'Value', value: score },
    { name: 'Empty', value: 100 - score },
  ];

  const emptyColor = isDark ? '#334155' : '#e2e8f0'; 
  const textColor = isDark ? '#f1f5f9' : '#1e293b'; 
  
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-200">
      <div className="h-32 w-32 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={55}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              <Cell key="val" fill={color} />
              <Cell key="empty" fill={emptyColor} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-2xl font-bold transition-colors duration-200" style={{ color: textColor }}>{score}</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="text-xs text-slate-400 dark:text-slate-500 mt-1">
        {score < 30 ? 'Safe' : score < 70 ? 'Caution' : 'Risky'}
      </span>
    </div>
  );
};