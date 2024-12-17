import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRangeSelectorProps {
  startDate: Date;
  endDate: Date;
  onDateChange: (start: Date, end: Date) => void;
}

export function DateRangeSelector({ startDate, endDate, onDateChange }: DateRangeSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <input
          type="date"
          value={startDate.toISOString().split('T')[0]}
          onChange={(e) => onDateChange(new Date(e.target.value), endDate)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
      <span className="text-gray-500">to</span>
      <div className="relative">
        <input
          type="date"
          value={endDate.toISOString().split('T')[0]}
          onChange={(e) => onDateChange(startDate, new Date(e.target.value))}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
}