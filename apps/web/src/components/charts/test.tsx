'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart'

interface OrganizationActivityChartProps {
  role: 'ADMIN' | 'MEMBER' | 'BILLING'
  activityData: { day: string; value: number }[]
}

const getRoleColor = (role: OrganizationActivityChartProps['role']) => {
  switch (role) {
    case 'ADMIN':
      return 'hsl(var(--chart-1))'
    case 'MEMBER':
      return 'hsl(var(--chart-2))'
    case 'BILLING':
      return 'hsl(var(--chart-3))'
  }
}

export function OrganizationActivityChart({
  role,
  activityData,
}: OrganizationActivityChartProps) {
  const chartConfig = {
    activity: {
      label: 'Atividade',
      color: getRoleColor(role),
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={activityData}
          margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
            tickFormatter={(value) => value.slice(0, 3)}
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={`var(--color-activity)`}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
