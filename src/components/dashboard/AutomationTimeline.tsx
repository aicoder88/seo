'use client';

import { AutomationTask } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CalendarClock, Repeat, Rocket } from 'lucide-react';

interface AutomationTimelineProps {
  tasks: AutomationTask[];
}

const cadenceLabels: Record<AutomationTask['cadence'], string> = {
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  weekly: 'Weekly',
};

const statusStyles: Record<AutomationTask['status'], string> = {
  scheduled: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'in-progress': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  completed: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
};

const impactStyles: Record<AutomationTask['impact'], string> = {
  critical: 'text-rose-300',
  high: 'text-amber-300',
  medium: 'text-cyan-300',
};

const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

const daysUntil = (date: Date) => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  if (diff < 0) return 'Overdue';
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days === 0 ? 'Today' : `In ${days} day${days > 1 ? 's' : ''}`;
};

export default function AutomationTimeline({ tasks = [] }: AutomationTimelineProps) {
  const upcoming = [...tasks].sort((a, b) => a.nextRun.getTime() - b.nextRun.getTime());

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg">
            <Repeat className="h-6 w-6 text-cyan-300" />
          </div>
          <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            Automation Timeline
          </span>
        </CardTitle>
        <CardDescription className="text-slate-400 mt-1">
          Monthly resubmission engine covering essential directories
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcoming.map((task, index) => (
          <div key={task.id} className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-4 shadow-inner shadow-slate-900/40">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-wide text-slate-400 flex items-center gap-2">
                  <Badge variant="outline" className={`font-semibold ${statusStyles[task.status]}`}>
                    {task.status.replace('-', ' ')}
                  </Badge>
                  <span className={`font-semibold ${impactStyles[task.impact]}`}>{task.impact.toUpperCase()}</span>
                </p>
                <h4 className="text-lg font-semibold text-slate-100 mt-2">{task.name}</h4>
                <p className="text-sm text-slate-400 mt-1">
                  {task.notes ?? 'Automated workflow keeps listing data current.'}
                </p>
              </div>
              <div className="text-right text-sm text-slate-400">
                <div className="flex items-center justify-end gap-2 text-slate-300">
                  <Repeat className="h-4 w-4" />
                  {cadenceLabels[task.cadence]}
                </div>
                <div className="flex items-center justify-end gap-2 mt-2 text-cyan-300">
                  <CalendarClock className="h-4 w-4" />
                  {formatDate(task.nextRun)}
                </div>
                <p className="text-xs text-slate-500 mt-1">{daysUntil(task.nextRun)}</p>
              </div>
            </div>
            <Separator className="my-3 bg-slate-800" />
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <Rocket className="h-3 w-3 text-emerald-300" />
                Owner: {task.owner}
              </span>
              <span className="flex items-center gap-2">
                Targets: {task.relatedDirectories.join(', ')}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
