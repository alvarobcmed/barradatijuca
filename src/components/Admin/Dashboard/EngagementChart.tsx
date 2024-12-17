import React from 'react';
import { BarChart2 } from 'lucide-react';

interface DataPoint {
  date: string;
  views: number;
  likes: number;
}

interface EngagementChartProps {
  data: DataPoint[];
  period: 'day' | 'week' | 'month' | 'year';
  onPeriodChange: (period: 'day' | 'week' | 'month' | 'year') => void;
}

export function EngagementChart({ data, period, onPeriodChange }: EngagementChartProps) {
  const periods = [
    { value: 'day', label: 'Hoje' },
    { value: 'week', label: 'Esta Semana' },
    { value: 'month', label: 'Este Mês' },
    { value: 'year', label: 'Este Ano' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Engajamento ao Longo do Tempo</h3>
        <div className="flex gap-2">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => onPeriodChange(p.value as typeof period)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                period === p.value
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64 flex items-center justify-center text-gray-500">
        <BarChart2 className="w-6 h-6 mr-2" />
        <span>Visualização do gráfico será implementada aqui</span>
      </div>
    </div>
  );
}