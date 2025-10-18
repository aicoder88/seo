'use client';

import { AiGenerationSummary } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles, ShieldCheck, Repeat } from 'lucide-react';

interface AiCopySummaryProps {
  summary: AiGenerationSummary;
}

const formatDate = (date: Date) =>
  date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

export default function AiCopySummary({ summary }: AiCopySummaryProps) {
  const coverage = summary.totalDirectories
    ? Math.round((summary.uniqueDescriptions / summary.totalDirectories) * 100)
    : 0;

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/60 backdrop-blur-sm shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-lg">
            <Sparkles className="h-6 w-6 text-emerald-300" />
          </div>
          <span className="bg-gradient-to-r from-emerald-300 to-blue-300 bg-clip-text text-transparent">
            Anthropic Description Coverage
          </span>
        </CardTitle>
        <CardDescription className="text-slate-400 mt-1">
          Unique directory copy generated with {summary.model}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-700/50 bg-slate-900/80 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Directories covered</p>
            <p className="mt-1 text-2xl font-semibold text-slate-100">{summary.uniqueDescriptions}</p>
            <p className="text-xs text-slate-500">of {summary.totalDirectories}</p>
          </div>
          <div className="rounded-xl border border-slate-700/50 bg-slate-900/80 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Avg tokens per listing</p>
            <p className="mt-1 text-2xl font-semibold text-slate-100">{summary.averageTokens}</p>
            <p className="text-xs text-slate-500">Optimized for uniqueness</p>
          </div>
          <div className="rounded-xl border border-slate-700/50 bg-slate-900/80 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Last batch</p>
            <p className="mt-1 text-lg font-semibold text-slate-100">{formatDate(summary.lastRun)}</p>
            <Badge variant="outline" className="mt-2 w-fit bg-emerald-500/10 text-emerald-300 border-emerald-500/30">
              <ShieldCheck className="mr-1 h-3 w-3" /> Unique enforcement on
            </Badge>
          </div>
        </div>
        <div className="rounded-xl border border-emerald-500/30 bg-slate-900/80 p-4">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-300" />
              Claudegen coverage
            </span>
            <span className="text-emerald-300 font-semibold">{coverage}%</span>
          </div>
          <Progress value={coverage} className="mt-3 h-2 bg-slate-800" />
          <p className="mt-3 text-xs text-slate-500 flex items-center gap-2">
            <Repeat className="h-4 w-4 text-cyan-300" />
            New descriptions regenerate automatically when directory metadata changes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
