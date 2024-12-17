import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BenefitCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  stats?: {
    value: string;
    label: string;
  };
}

export function BenefitCard({ title, description, icon: Icon, stats }: BenefitCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{
            background: 'linear-gradient(135deg, #FF0A7B, #6B0F6C)',
          }}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          
          {stats && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-[#FF0A7B]">{stats.value}</span>
                <span className="ml-2 text-sm text-gray-500">{stats.label}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}