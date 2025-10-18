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
import { Sparkles, TrendingUp, Compass, Layers } from 'lucide-react';

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
  if (name.includes('blog') || name.includes('news') || name.includes('community') || name.includes('hackers') || name.includes('social')) {
    return 'Community';
  }
  return 'Niche';
};

export default function Page() {
  const totalSubmissions = mockDirectorySubmissions.length;
  const statusCounts = mockDirectorySubmissions.reduce<Record<DirectorySubmission['status'], number>>((acc, submission) => {
    acc[submission.status] = (acc[submission.status] ?? 0) + 1;
    return acc;
  }, {
    approved: 0,
    submitted: 0,
    pending: 0,
    rejected: 0,
  });

  const liveCount = statusCounts.approved ?? 0;
  const inReviewCount = (statusCounts.pending ?? 0) + (statusCounts.submitted ?? 0);
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

  const statusBreakdown = (['approved', 'submitted', 'pending', 'rejected'] as DirectorySubmission['status'][])
    .map((status) => ({
      status,
      value: statusCounts[status] ?? 0,
      color: statusPalette[status],
    }))
    .filter((item) => item.value > 0);

  const topListings = [...mockDirectorySubmissions]
    .filter((submission) => submission.status === 'approved')
    .sort((a, b) => b.domainAuthority - a.domainAuthority)
    .slice(0, 5);

  const communityCoverage = mockDirectorySubmissions.filter((submission) => getFocusArea(submission) === 'Community').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-12 space-y-10">
        <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Card className="border-slate-800 bg-slate-900/90">
            <CardHeader className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-500/20 p-3">
                  <Sparkles className="h-7 w-7 text-blue-300" />
                </div>
                <div>
                  <CardTitle className="text-4xl font-bold tracking-tight text-slate-100">
                    Listings & Social HQ
                  </CardTitle>
                  <CardDescription className="text-base text-slate-400">
                    A calm command center for every live profile, social launch, and Anthropic-ready description.
                  </CardDescription>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Live coverage</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-100">{liveCount}</p>
                  <p className="text-xs text-slate-400">Directories and channels published</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">In motion</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-100">{inReviewCount}</p>
                  <p className="text-xs text-slate-400">Awaiting approval or scheduled launch</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Avg. domain authority</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-100">{averageDomainAuthority}</p>
                  <p className="text-xs text-slate-400">Across {totalSubmissions} placements</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="border-slate-800 bg-slate-900/90">
            <CardHeader>
              <CardTitle className="text-xl text-slate-100">Top live placements</CardTitle>
              <CardDescription className="text-slate-400">High-authority profiles worth showcasing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topListings.map((listing) => (
                <div key={listing.id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-800/80 bg-slate-950/60 p-3">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-100">{listing.directoryName}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <Badge variant="outline" className="border-slate-700 text-slate-300">
                        {listing.status}
                      </Badge>
                      <span>Focus: {getFocusArea(listing)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase text-slate-500">DA</p>
                    <p className="text-xl font-semibold text-emerald-300">{listing.domainAuthority}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Live directories"
            value={liveCount}
            description="Approved listings with final copy"
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
          />
          <MetricCard
            title="In review"
            value={inReviewCount}
            description="Pending or submitted placements"
            icon={Compass}
            trend={{ value: 3, isPositive: true }}
          />
          <MetricCard
            title="Anthropic coverage"
            value={`${anthropicCoverage}%`}
            description={`${aiSummary.uniqueDescriptions} listings with unique descriptions`}
            icon={Sparkles}
            trend={{ value: 8, isPositive: true }}
          />
          <MetricCard
            title="Community platforms"
            value={communityCoverage}
            description="Social and community channels online"
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

        <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <DirectorySubmissions submissions={mockDirectorySubmissions} />
          <div className="space-y-6">
            <BlogOutreach contacts={mockBlogContacts} />
            <TemplateLibrary templates={mockOutreachTemplates} />
          </div>
        </section>
      </div>
    </div>
  );
}
