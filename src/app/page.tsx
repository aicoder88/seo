'use client';

import MetricCard from '@/components/dashboard/MetricCard';
import DirectorySubmissions from '@/components/dashboard/DirectorySubmissions';
import DuplicateDetectionPanel from '@/components/dashboard/DuplicateDetectionPanel';
import BlogOutreach from '@/components/dashboard/BlogOutreach';
import TemplateLibrary from '@/components/dashboard/TemplateLibrary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  mockDirectorySubmissions, 
  mockDuplicateDetections, 
  mockBlogContacts, 
  mockOutreachTemplates 
} from '@/lib/mock-data';
import { 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  BarChart3,
  Sparkles
} from 'lucide-react';

export default function Page() {
  const totalSubmissions = mockDirectorySubmissions.length;
  const approvedSubmissions = mockDirectorySubmissions.filter(s => s.status === 'approved').length;
  const pendingSubmissions = mockDirectorySubmissions.filter(s => s.status === 'pending').length;
  const avgDA = Math.round(
    mockDirectorySubmissions.reduce((acc, s) => acc + s.domainAuthority, 0) / totalSubmissions
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header with Gradient */}
        <div className="space-y-4 pt-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg shadow-blue-500/20">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                SEO Outreach Dashboard
              </h1>
              <p className="text-slate-400 text-lg mt-1">
                Top 100 high-impact directories • Automated submissions • AI-powered insights
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Metrics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Directories"
            value={totalSubmissions}
            description="Top SEO platforms tracked"
            icon={BarChart3}
            trend={{ value: 12, isPositive: true }}
          />
          <MetricCard
            title="Live Listings"
            value={approvedSubmissions}
            description={`${Math.round((approvedSubmissions / totalSubmissions) * 100)}% approval rate`}
            icon={CheckCircle}
            trend={{ value: 8, isPositive: true }}
          />
          <MetricCard
            title="In Progress"
            value={pendingSubmissions}
            description="Awaiting approval"
            icon={Clock}
          />
          <MetricCard
            title="Avg Domain Authority"
            value={avgDA}
            description="Exceptional quality score"
            icon={TrendingUp}
            trend={{ value: 3, isPositive: true }}
          />
        </div>

        {/* Main Content Tabs with Enhanced Styling */}
        <Tabs defaultValue="submissions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid bg-slate-900/50 border border-slate-800 p-1">
            <TabsTrigger 
              value="submissions"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white"
            >
              Directory Submissions
            </TabsTrigger>
            <TabsTrigger 
              value="duplicates"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white"
            >
              Duplicate Detection
            </TabsTrigger>
            <TabsTrigger 
              value="outreach"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white"
            >
              Blog Outreach
            </TabsTrigger>
            <TabsTrigger 
              value="templates"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white"
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