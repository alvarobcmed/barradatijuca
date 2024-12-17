import React from 'react';
import { Clock } from 'lucide-react';

interface ViewTimeStatsProps {
  stories: Array<{
    id: string;
    username: string;
    duration: number;
    averageViewTime: number;
    totalViewTime: number;
    viewCount: number;
  }>;
}

export function ViewTimeStats({ stories }: ViewTimeStatsProps) {
  const formatTime = (ms: number) => {
    const seconds = Math.round(ms / 1000);
    return seconds < 60 ? `${seconds}s` : `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  };

  const averageViewTime = Math.round(
    stories.reduce((acc, story) => acc + story.averageViewTime, 0) / stories.length
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">View Time Analysis</h3>
          <p className="text-sm text-gray-500">
            Average view time: {formatTime(averageViewTime)}
          </p>
        </div>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-6">
        {stories.map((story) => (
          <div key={story.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{story.username}</span>
              <span className="text-sm text-gray-500">
                Story length: {formatTime(story.duration)}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Average view time</span>
                  <span className="text-xs font-medium text-gray-700">
                    {formatTime(story.averageViewTime)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((story.averageViewTime / story.duration) * 100, 100)}%`
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>Total views: {story.viewCount}</span>
              <span>Total view time: {formatTime(story.totalViewTime)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}