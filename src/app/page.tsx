'use client';

import MetricCard from '@/components/dashboard/MetricCard';
import DirectorySubmissions from '@/components/dashboard/DirectorySubmissions';
import DuplicateDetectionPanel from '@/components/dashboard/DuplicateDetectionPanel';
import BlogOutreach from '@/components/dashboard/BlogOutreach';
import TemplateLibrary from '@/components/dashboard/TemplateLibrary';
import AutomationTimeline from '@/components/dashboard/AutomationTimeline';
import ImpactTaskBoard from '@/components/dashboard/ImpactTaskBoard';
import AiCopySummary from '@/components/dashboard/AiCopySummary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  mockDirectorySubmissions,
  mockDuplicateDetections,
  mockBlogContacts,
  mockOutreachTemplates,
  mockAutomationTasks,
  mockSeoTasks,
  mockAiSummary,
} from '@/lib/mock-data';
import {
  ShieldCheck,
  RefreshCcw,
  Shield,
  Sparkles,
  Target,
} from 'lucide-react';

const formatDate = (date?: Date) =>
  date
    ? date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : '—';

const inferTier = (domainAuthority: number) => {
  if (domainAuthority >= 90) return 'Essential';
  if (domainAuthority >= 80) return 'High Impact';
  return 'Growth';
};

export default function Page() {
  const totalSubmissions = mockDirectorySubmissions.length;
  const approvedSubmissions = mockDirectorySubmissions.filter((s) => s.status === 'approved').length;
  const automationCount = mockDirectorySubmissions.filter((s) => s.automation === 'auto').length;
  const automationCoverage = totalSubmissions ? Math.round((automationCount / totalSubmissions) * 100) : 0;
  const avgDA = Math.round(
    mockDirectorySubmissions.reduce((acc, s) => acc + s.domainAuthority, 0) / totalSubmissions
  );

  const fourteenDays = 1000 * 60 * 60 * 24 * 14;
  const now = new Date();
  const resubmissionsDue = mockDirectorySubmissions.filter(
    (s) =>
      s.nextResubmission &&
      s.nextResubmission.getTime() >= now.getTime() &&
      s.nextResubmission.getTime() - now.getTime() <= fourteenDays,
  ).length;

  const essentialCount = mockDirectorySubmissions.filter((s) => (s.tier ? s.tier === 'Essential' : inferTier(s.domainAuthority) === 'Essential')).length;
  const aiDuplicatesCleared = mockDuplicateDetections.filter((d) => d.status === 'accepted').length;
  const aiSummary = mockAiSummary;
  const anthropicCoverage = aiSummary.totalDirectories
    ? Math.round((aiSummary.uniqueDescriptions / aiSummary.totalDirectories) * 100)
    : 0;

  const primaryListings = ['Google My Business', 'Yelp', 'Crunchbase'];
  const prioritizedListingsMap = new Map<string, typeof mockDirectorySubmissions[number]>();

  primaryListings.forEach((name) => {
    const match = mockDirectorySubmissions.find((entry) => entry.directoryName === name);
    if (match) {
      prioritizedListingsMap.set(match.id, match);
    }
  });

  mockDirectorySubmissions
    .filter((entry) => entry.domainAuthority >= 90 && !primaryListings.includes(entry.directoryName))
    .sort((a, b) => b.domainAuthority - a.domainAuthority)
    .slice(0, 3)
    .forEach((entry) => {
      prioritizedListingsMap.set(entry.id, entry);
    });

  const prioritizedListings = Array.from(prioritizedListingsMap.values()).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <div className="container mx-auto p-6 space-y-10">
        <div className="space-y-6 pt-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg shadow-blue-500/20">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                SEO Outreach Command Center
              </h1>
              <p className="text-slate-400 text-lg mt-1">
                Automated submissions to the top 100 free directories • Anthropic-powered unique copy • AI duplicate prevention
              </p>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
            <div className="rounded-3xl border border-blue-500/30 bg-slate-900/70 p-6 shadow-xl shadow-blue-500/20">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-semibold text-slate-100">Built for dark-mode teams shipping fast</h2>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-200 border-blue-500/30">
                  Avg DA {avgDA}
                </Badge>
              </div>
              <p className="text-slate-400 mt-2">
                Keep every high-authority directory polished with automated resubmissions, AI duplicate detection, and a manual outreach lane for relationship-driven wins.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-300 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-slate-200">AI duplicate firewall</p>
                    <p className="text-xs text-slate-400">Prevents redundant listings before they go live.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCcw className="h-5 w-5 text-cyan-300 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-slate-200">Monthly automation cadence</p>
                    <p className="text-xs text-slate-400">Hands-free resubmission to every essential directory.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-emerald-300 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-slate-200">Anthropic description engine</p>
                    <p className="text-xs text-slate-400">Claude writes unique copy for every directory to prevent duplication penalties.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-emerald-300 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-slate-200">Manual blog outreach lane</p>
                    <p className="text-xs text-slate-400">Personalized pitches for high-value editorial placements.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-700/60 bg-slate-900/70 p-6 shadow-xl shadow-slate-900/40">
              <h3 className="text-xl font-semibold text-slate-100">Essential listings, always on</h3>
              <p className="text-xs text-slate-500 mt-1">{resubmissionsDue} resubmissions scheduled in the next 14 days.</p>
              <div className="mt-4 space-y-3">
                {prioritizedListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-slate-800/60 bg-slate-900/80 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-200">{listing.directoryName}</p>
                      <p className="text-xs text-slate-400">
                        Next refresh {formatDate(listing.nextResubmission)} • {listing.automation === 'auto' ? 'Automated' : 'Manual'}
                      </p>
                      {listing.aiDescription && (
                        <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                          “{listing.aiDescription}”
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-xs uppercase tracking-wide text-slate-500">DA</span>
                      <div className="text-lg font-bold text-blue-300">{listing.domainAuthority}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Essential Listings"
            value={essentialCount}
            description="GMB, Yelp, Crunchbase, and more"
            icon={ShieldCheck}
            trend={{ value: 4, isPositive: true }}
          />
          <MetricCard
            title="Anthropic Unique Copy"
            value={`${anthropicCoverage}%`}
            description={`${aiSummary.uniqueDescriptions} listings with Claude descriptions`}
            icon={Sparkles}
            trend={{ value: 9, isPositive: true }}
          />
          <MetricCard
            title="Automation Coverage"
            value={`${automationCoverage}%`}
            description={`${automationCount} directories on autopilot`}
            icon={RefreshCcw}
            trend={{ value: 6, isPositive: true }}
          />
          <MetricCard
            title="AI Duplicates Resolved"
            value={aiDuplicatesCleared}
            description={`${approvedSubmissions} live listings protected`}
            icon={Shield}
            trend={{ value: 2, isPositive: true }}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
          <AutomationTimeline tasks={mockAutomationTasks} />
          <AiCopySummary summary={aiSummary} />
        </div>

        <ImpactTaskBoard tasks={mockSeoTasks} />

        <Tabs defaultValue="submissions" className="space-y-6">
          <TabsList className="grid w-full gap-2 rounded-full bg-slate-900/70 p-2 shadow-inner shadow-slate-900/60 sm:grid-cols-4">
            <TabsTrigger
              value="submissions"
              className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white"
            >
              Directory Submissions
            </TabsTrigger>
            <TabsTrigger
              value="duplicates"
              className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white"
            >
              Duplicate Detection
            </TabsTrigger>
            <TabsTrigger
              value="outreach"
              className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white"
            >
              Blog Outreach
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white"
            >
              Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submissions" className="space-y-4">
            <DirectorySubmissions submissions={mockDirectorySubmissions} />
          </TabsContent>

          <TabsContent value="duplicates" className="space-y-4">
            <DuplicateDetectionPanel detections={mockDuplicateDetections} />
          </TabsContent>

          <TabsContent value="outreach" className="space-y-4">
            <BlogOutreach contacts={mockBlogContacts} />
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <TemplateLibrary templates={mockOutreachTemplates} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
