'use client';

import MetricCard from '@/components/dashboard/MetricCard';
import DirectorySubmissions from '@/components/dashboard/DirectorySubmissions';
import BlogOutreach from '@/components/dashboard/BlogOutreach';
import TemplateLibrary from '@/components/dashboard/TemplateLibrary';
import ImpactTaskBoard from '@/components/dashboard/ImpactTaskBoard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { DirectorySubmission } from '@/types';
import {
  mockDirectorySubmissions,
  mockBlogContacts,
  mockOutreachTemplates,
  mockSeoTasks,
  mockAiSummary,
} from '@/lib/mock-data';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Sparkles, TrendingUp, Compass, Layers, Cat, GaugeCircle } from 'lucide-react';

const statusPalette: Record<DirectorySubmission['status'], string> = {
  approved: '#34d399',
  submitted: '#60a5fa',
  pending: '#facc15',
  rejected: '#f87171',
};

const formatDayLabel = (date: Date) =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

const getFocusArea = (submission: DirectorySubmission): NonNullable<DirectorySubmission['focusArea']> => {
  if (submission.focusArea) return submission.focusArea;
  const name = submission.directoryName.toLowerCase();
  if (name.includes('google') || name.includes('bing') || name.includes('yelp') || name.includes('maps')) {
    return 'Local';
  }
  if (name.includes('startup') || name.includes('angel') || name.includes('crunchbase') || name.includes('venture')) {
    return 'Startup';
  }
  if (name.includes('review') || name.includes('trust') || name.includes('g2') || name.includes('capterra') || name.includes('ratings')) {
    return 'Review';
  }
  if (name.includes('product') || name.includes('software') || name.includes('app')) {
    return 'Product';
  }
  if (
    name.includes('cat') ||
    name.includes('feline') ||
    name.includes('pet') ||
    name.includes('purr') ||
    name.includes('kitten')
  ) {
    return 'Pets';
  }
  if (name.includes('blog') || name.includes('news') || name.includes('community') || name.includes('hackers') || name.includes('social')) {
    return 'Community';
  }
  return 'Niche';
};

export default function Page() {
  const totalSubmissions = mockDirectorySubmissions.length;
  const statusCounts = mockDirectorySubmissions.reduce<Record<DirectorySubmission['status'], number>>(
    (acc, submission) => {
      acc[submission.status] = (acc[submission.status] ?? 0) + 1;
      return acc;
    },
    {
      approved: 0,
      submitted: 0,
      pending: 0,
      rejected: 0,
    },
  );

  const pendingCount = statusCounts.pending ?? 0;
  const petFocusCount = mockDirectorySubmissions.filter((submission) => getFocusArea(submission) === 'Pets').length;
  const averageDomainAuthority = Math.round(
    mockDirectorySubmissions.reduce((acc, submission) => acc + submission.domainAuthority, 0) / totalSubmissions,
  );

  const aiSummary = mockAiSummary;
  const anthropicCoverage = aiSummary.totalDirectories
    ? Math.round((aiSummary.uniqueDescriptions / aiSummary.totalDirectories) * 100)
    : 0;

  const focusStatsMap = mockDirectorySubmissions.reduce(
    (acc, submission) => {
      const focus = getFocusArea(submission);
      if (!acc.has(focus)) {
        acc.set(focus, { focus, directories: 0, totalDa: 0 });
      }
      const entry = acc.get(focus)!;
      entry.directories += 1;
      entry.totalDa += submission.domainAuthority;
      return acc;
    },
    new Map<NonNullable<DirectorySubmission['focusArea']>, { focus: NonNullable<DirectorySubmission['focusArea']>; directories: number; totalDa: number }>(),
  );

  const focusChartData = Array.from(focusStatsMap.values())
    .map((entry) => ({
      focus: entry.focus,
      directories: entry.directories,
      averageDA: Math.round(entry.totalDa / entry.directories),
    }))
    .sort((a, b) => b.directories - a.directories)
    .slice(0, 5);

  const highlightInsights = [
    {
      title: 'Anthropic drafts ready',
      value: `${aiSummary.uniqueDescriptions}`,
      description: 'Listings already feature bespoke copy ready to ship.',
      icon: Sparkles,
    },
    {
      title: 'Launch queue',
      value: `${pendingCount}`,
      description: 'Directories staged for rollout in the next sprint.',
      icon: GaugeCircle,
    },
    {
      title: 'Cat community reach',
      value: `${petFocusCount}`,
      description: 'High-trust placements tuned to feline guardians.',
      icon: Cat,
    },
  ];

  const submissionTrendMap = mockDirectorySubmissions.reduce(
    (acc, submission) => {
      const iso = submission.submissionDate.toISOString().slice(0, 10);
      if (!acc.has(iso)) {
        const day = new Date(iso + 'T00:00:00');
        acc.set(iso, { date: day, submissions: 0 });
      }
      const entry = acc.get(iso)!;
      entry.submissions += 1;
      return acc;
    },
    new Map<string, { date: Date; submissions: number }>(),
  );

  const submissionTrend = Array.from(submissionTrendMap.values())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((entry) => ({
      label: formatDayLabel(entry.date),
      submissions: entry.submissions,
    }));

  const statusBreakdown = (['pending', 'submitted', 'approved', 'rejected'] as DirectorySubmission['status'][])
    .map((status) => ({
      status,
      value: statusCounts[status] ?? 0,
      color: statusPalette[status],
    }))
    .filter((item) => item.value > 0);

  const petCoverage = mockDirectorySubmissions.filter((submission) => getFocusArea(submission) === 'Pets').length;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-28 h-[520px] w-[520px] rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute top-1/2 right-[-160px] h-[460px] w-[460px] -translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-[-200px] left-1/3 h-[380px] w-[380px] rounded-full bg-purple-500/25 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 py-12 space-y-10">
        <section>
          <DirectorySubmissions submissions={mockDirectorySubmissions} />
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {highlightInsights.map(({ title, value, description, icon: Icon }) => (
            <div
              key={title}
              className="relative overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-950/75 p-5 backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <div className="pointer-events-none absolute -right-10 top-6 h-28 w-28 rounded-full bg-cyan-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -left-8 -bottom-10 h-24 w-24 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-50">{value}</p>
                  <p className="mt-2 text-sm text-slate-400 leading-6">{description}</p>
                </div>
                <span className="rounded-full bg-slate-900/70 p-2 text-cyan-300">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Pending directories"
            value={pendingCount}
            description="Listings staged for activation"
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
          />
          <MetricCard
            title="Pet audience outlets"
            value={petFocusCount}
            description="Cat-focused communities ready for placement"
            icon={Compass}
            trend={{ value: 7, isPositive: true }}
          />
          <MetricCard
            title="Anthropic coverage"
            value={`${anthropicCoverage}%`}
            description={`${aiSummary.uniqueDescriptions} listings with unique descriptions`}
            icon={Sparkles}
            trend={{ value: 8, isPositive: true }}
          />
          <MetricCard
            title="Pet platforms"
            value={petCoverage}
            description="Social and community channels aligned to cats"
            icon={Layers}
            trend={{ value: 4, isPositive: true }}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <Card className="border-slate-800 bg-slate-900/90 xl:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg text-slate-100">Launch velocity</CardTitle>
              <CardDescription className="text-slate-400">Daily count of directories and social profiles coming online</CardDescription>
            </CardHeader>
            <CardContent className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={submissionTrend} margin={{ top: 10, right: 16, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSubmissions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="label" stroke="#64748b" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis stroke="#64748b" tickLine={false} axisLine={false} fontSize={12} allowDecimals={false} />
                  <RechartsTooltip
                    cursor={{ stroke: '#38bdf8', strokeWidth: 1, strokeDasharray: '4 4' }}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0.75rem', borderColor: '#1e293b' }}
                    labelClassName="text-slate-200"
                    formatter={(value: number) => [`${value} launches`, 'Submissions']}
                  />
                  <Area type="monotone" dataKey="submissions" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#colorSubmissions)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/90">
            <CardHeader>
              <CardTitle className="text-lg text-slate-100">Status mix</CardTitle>
              <CardDescription className="text-slate-400">Current distribution by publishing stage</CardDescription>
            </CardHeader>
            <CardContent className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusBreakdown} dataKey="value" nameKey="status" innerRadius={60} outerRadius={90} paddingAngle={6}>
                    {statusBreakdown.map((entry) => (
                      <Cell key={entry.status} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0.75rem', borderColor: '#1e293b' }}
                    formatter={(value: number, name: string) => [`${value} placements`, name.charAt(0).toUpperCase() + name.slice(1)]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <Card className="border-slate-800 bg-slate-900/90">
            <CardHeader>
              <CardTitle className="text-lg text-slate-100">Focus area depth</CardTitle>
              <CardDescription className="text-slate-400">Where we are investing our directory energy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={focusChartData} margin={{ top: 10, right: 16, left: -16, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="focus" stroke="#64748b" tickLine={false} axisLine={false} fontSize={12} />
                    <YAxis stroke="#64748b" tickLine={false} axisLine={false} fontSize={12} allowDecimals={false} />
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0.75rem', borderColor: '#1e293b' }}
                      formatter={(value: number, _name: string, { payload }) => [
                        `${value} listings`,
                        `Avg. DA ${payload?.averageDA ?? '—'}`,
                      ]}
                    />
                    <Bar dataKey="directories" fill="#38bdf8" radius={[6, 6, 0, 0]}>
                      {focusChartData.map((entry) => (
                        <Cell key={entry.focus} fill="#38bdf8" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 text-sm text-slate-300">
                {focusChartData.map((entry) => (
                  <div key={entry.focus} className="flex items-center justify-between rounded-md border border-slate-800/80 bg-slate-950/60 px-3 py-2">
                    <span>{entry.focus}</span>
                    <span className="text-slate-400">Avg. DA {entry.averageDA}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="xl:col-span-2">
            <ImpactTaskBoard tasks={mockSeoTasks} />
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <BlogOutreach contacts={mockBlogContacts} />
          <TemplateLibrary templates={mockOutreachTemplates} />
        </section>
      </div>
    </div>
  );
}
