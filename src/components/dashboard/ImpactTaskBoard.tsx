'use client';

import { SeoTask } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Target } from 'lucide-react';

interface ImpactTaskBoardProps {
  tasks: SeoTask[];
}

const statusText: Record<SeoTask['status'], string> = {
  queued: 'Queued',
  active: 'In Flight',
  done: 'Completed',
};

const statusStyle: Record<SeoTask['status'], string> = {
  queued: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  active: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  done: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
};

const categoryStyle: Record<SeoTask['category'], string> = {
  Listing: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Content: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  Review: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  Optimization: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
};

const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

export default function ImpactTaskBoard({ tasks = [] }: ImpactTaskBoardProps) {
  const orderedTasks = [...tasks].sort((a, b) => b.impactScore - a.impactScore);

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-lg">
            <Sparkles className="h-6 w-6 text-fuchsia-300" />
          </div>
          <span className="bg-gradient-to-r from-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
            High-Impact SEO Tasks
          </span>
        </CardTitle>
        <CardDescription className="text-slate-400 mt-1">
          Prioritized outreach, content, and review workstreams
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {orderedTasks.map((task) => (
          <div key={task.id} className="border border-slate-700/50 rounded-xl p-4 bg-slate-900/60 shadow-inner shadow-slate-900/40">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className={`font-semibold ${categoryStyle[task.category]}`}>
                    {task.category}
                  </Badge>
                  <Badge variant="outline" className={`font-semibold ${statusStyle[task.status]}`}>
                    {statusText[task.status]}
                  </Badge>
                </div>
                <h4 className="text-lg font-semibold text-slate-100 leading-tight">
                  {task.label}
                </h4>
                <p className="text-sm text-slate-400 flex items-center gap-2">
                  <Target className="h-4 w-4 text-emerald-300" />
                  Owner: {task.owner}
                </p>
              </div>
              <div className="text-right text-sm text-slate-400">
                <p className="font-semibold text-slate-200">Impact Score {task.impactScore}</p>
                <p className="text-xs text-slate-500 mt-1">Due {formatDate(task.dueDate)}</p>
              </div>
            </div>
            <Progress value={task.impactScore} className="h-2 mt-4 bg-slate-800" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
