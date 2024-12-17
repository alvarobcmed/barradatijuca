import React, { useState } from 'react';
import { Eye, Heart, Clock, MousePointer } from 'lucide-react';
import { StatsCard } from './Dashboard/StatsCard';
import { EngagementChart } from './Dashboard/EngagementChart';
import { TopStoriesTable } from './Dashboard/TopStoriesTable';
import { ViewTimeStats } from './Dashboard/ViewTimeStats';
import { CompletionStats } from './Dashboard/CompletionStats';
import { COMPANY_STORIES } from '../../data/sampleStories';

export function Dashboard() {
  const [chartPeriod, setChartPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');

  const generateChartData = () => {
    const data = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 1000),
        likes: Math.floor(Math.random() * 500)
      });
    }
    return data;
  };

  const sampleChartData = generateChartData();

  const totalViews = sampleChartData.reduce((sum, day) => sum + day.views, 0);
  const totalLikes = sampleChartData.reduce((sum, day) => sum + day.likes, 0);
  
  const sampleStories = COMPANY_STORIES.stories.map(story => ({
    ...story,
    views: Math.floor(Math.random() * 10000),
    completionRate: Math.floor(Math.random() * 100),
    averageViewTime: Math.floor(Math.random() * 15000),
    totalViewTime: Math.floor(Math.random() * 1000000),
    viewCount: Math.floor(Math.random() * 1000)
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total de Visualizações"
          value={totalViews.toLocaleString()}
          change={12}
          icon={Eye}
          color="blue"
        />
        <StatsCard
          title="Total de Curtidas"
          value={totalLikes.toLocaleString()}
          change={8}
          icon={Heart}
          color="pink"
        />
        <StatsCard
          title="Taxa Média de Conclusão"
          value="78%"
          change={-3}
          icon={MousePointer}
          color="purple"
        />
        <StatsCard
          title="Tempo Médio de Visualização"
          value="1m 23s"
          change={15}
          icon={Clock}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EngagementChart
          data={sampleChartData}
          period={chartPeriod}
          onPeriodChange={setChartPeriod}
        />
        <CompletionStats stories={sampleStories} />
      </div>

      <ViewTimeStats stories={sampleStories} />
      
      <TopStoriesTable stories={sampleStories} />
    </div>
  );
}