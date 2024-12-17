import React from 'react';
import { BarChart2 } from 'lucide-react';

interface CompletionStatsProps {
  stories: Array<{
    id: string;
    username: string;
    timestamp: number;
    completionRate: number;
    views: number;
  }>;
}

export function CompletionStats({ stories }: CompletionStatsProps) {
  const averageCompletionRate = Math.round(
    stories.reduce((acc, story) => acc + story.completionRate, 0) / stories.length
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Story Completion Rates</h3>
          <p className="text-sm text-gray-500">Average completion rate: {averageCompletionRate}%</p>
        </div>
        <div className="flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="space-y-4">
        {stories.map((story) => (
          <div key={story.id} className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{story.username}</span>
                <span className="text-sm text-gray-500">{story.completionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${story.completionRate}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}