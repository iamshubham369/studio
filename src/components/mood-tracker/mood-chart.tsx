'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import type { MoodEntry } from '@/lib/hooks/use-mood-data';
import { format, subDays, eachDayOfInterval } from 'date-fns';

const chartConfig = {
  mood: {
    label: 'Mood',
  },
  happy: {
    label: 'Happy',
    color: 'hsl(142.1 76.2% 42.2%)',
  },
  calm: {
    label: 'Calm',
    color: 'hsl(217.2 91.2% 59.8%)',
  },
  neutral: {
    label: 'Neutral',
    color: 'hsl(215.4 16.3% 46.9%)',
  },
  anxious: {
    label: 'Anxious',
    color: 'hsl(47.9 95.8% 53.1%)',
  },
  sad: {
    label: 'Sad',
    color: 'hsl(255, 62%, 55%)',
  },
} satisfies ChartConfig;

const moodColors = {
  happy: 'var(--color-happy)',
  calm: 'var(--color-calm)',
  neutral: 'var(--color-neutral)',
  anxious: 'var(--color-anxious)',
  sad: 'var(--color-sad)',
};

interface MoodChartProps {
  data: MoodEntry[];
}

export function MoodChart({ data }: MoodChartProps) {
  // Process data for the last 7 days
  const endDate = new Date();
  const startDate = subDays(endDate, 6);
  const dateInterval = eachDayOfInterval({ start: startDate, end: endDate });

  const chartData = dateInterval.map(date => {
    const dateString = date.toISOString().split('T')[0];
    const entry = data.find(e => e.date === dateString);
    return {
      date: format(date, 'MMM d'),
      value: entry ? entry.value : null,
      mood: entry ? entry.mood : 'none',
    };
  });

  return (
    <div className="h-[300px] w-full">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value}
          />
          <YAxis
            domain={[0, 5]}
            ticks={[1, 2, 3, 4, 5]}
            tickFormatter={(value) => {
              switch (value) {
                case 1: return 'Sad';
                case 2: return 'Anxious';
                case 3: return 'Neutral';
                case 4: return 'Calm';
                case 5: return 'Happy';
                default: return '';
              }
            }}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                formatter={(value, name, props) => (
                  <>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                      style={{ backgroundColor: moodColors[props.payload.mood as keyof typeof moodColors] }}
                    />
                    {chartConfig[props.payload.mood as keyof typeof chartConfig]?.label}
                  </div>
                  </>
                )}
                labelFormatter={(label, payload) => payload[0]?.payload.date}
              />
            }
          />
          <defs>
            <linearGradient id="fillMood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="url(#fillMood)"
            connectNulls
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
