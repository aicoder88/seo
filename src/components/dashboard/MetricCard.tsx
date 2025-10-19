import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function MetricCard({ title, value, description, icon: Icon, trend }: MetricCardProps) {
  return (
    <Card className="relative group overflow-hidden border-slate-800/60 bg-slate-950/80 backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20">
      <div className="pointer-events-none absolute -top-10 right-0 h-28 w-28 rounded-full bg-gradient-to-br from-cyan-500/40 to-emerald-400/20 blur-3xl opacity-70 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -bottom-16 left-4 h-32 w-32 rounded-full bg-gradient-to-tr from-blue-500/30 to-indigo-400/10 blur-3xl opacity-60" />
      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-semibold tracking-wide text-slate-200/90 uppercase">{title}</CardTitle>
        <div className="rounded-xl bg-slate-900/60 p-2 shadow-inner shadow-sky-500/10">
          <Icon className="h-4 w-4 text-cyan-300" />
        </div>
      </CardHeader>
      <CardContent className="relative space-y-3">
        <p className="text-4xl font-bold tracking-tight text-slate-50">{value}</p>
        {description && <p className="text-xs text-slate-400/90 leading-relaxed">{description}</p>}
        {trend && (
          <div className="flex items-center gap-2 text-xs">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-medium ${
                trend.isPositive
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'
                  : 'bg-rose-500/15 text-rose-300 border border-rose-500/20'
              }`}
            >
              {trend.isPositive ? '▲' : '▼'} {trend.value}%
            </span>
            <span className="text-slate-500">vs. last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
