import React from 'react';
import { Violation } from '../types';

interface ViolationItemProps {
  violation: Violation;
  onClick: () => void;
  isActive: boolean;
}

export const ViolationItem: React.FC<ViolationItemProps> = ({ violation, onClick, isActive }) => {
  // Adjusted colors for dark mode visibility
  const severityColors = {
    Low: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800',
    Medium: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-800',
    High: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800',
    Critical: 'bg-rose-100 dark:bg-rose-900/30 text-rose-900 dark:text-rose-100 border-rose-300 dark:border-rose-700 font-bold',
  };

  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-lg border transition-all cursor-pointer ${
        isActive 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md ring-1 ring-blue-500' 
          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{violation.rule}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${severityColors[violation.severity]}`}>
          {violation.severity}
        </span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-2 italic">"{violation.quote}"</p>
      <p className="text-xs text-slate-500 dark:text-slate-400">{violation.explanation}</p>
    </div>
  );
};