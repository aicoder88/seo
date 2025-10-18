'use client';

import { useState } from 'react';
import { DirectorySubmission } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ExternalLink, Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface DirectorySubmissionsProps {
  submissions: DirectorySubmission[];
}

export default function DirectorySubmissions({ submissions = [] }: DirectorySubmissionsProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('da');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAiSubmission, setActiveAiSubmission] = useState<DirectorySubmission | null>(null);
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);

  const getTier = (submission: DirectorySubmission) => {
    if (submission.tier) return submission.tier;
    if (submission.domainAuthority >= 90) return 'Essential' as const;
    if (submission.domainAuthority >= 80) return 'High Impact' as const;
    return 'Growth' as const;
  };

  const getFocusArea = (submission: DirectorySubmission) => {
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
    if (name.includes('blog') || name.includes('news') || name.includes('community') || name.includes('hackers')) {
      return 'Community';
    }
    return 'Niche';
  };

  const getTierColor = (tier: NonNullable<DirectorySubmission['tier']>) => {
    switch (tier) {
      case 'Essential':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
    return tier === 'High Impact'
      ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      : 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  };

  const getFocusColor = (focus: NonNullable<DirectorySubmission['focusArea']>) => {
    switch (focus) {
      case 'Local':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Startup':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'Product':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'Review':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Community':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const formatDate = (date?: Date) =>
    date
      ? date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })
      : '—';

  const getStatusColor = (status: DirectorySubmission['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30';
      case 'submitted':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30';
      case 'pending':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30 hover:bg-slate-500/30';
    }
  };

  const getDAColor = (da: number) => {
    if (da >= 90) return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    if (da >= 80) return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    if (da >= 70) return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
    if (da >= 60) return 'bg-green-500/20 text-green-300 border-green-500/30';
    return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  };

  const totalDirectories = submissions.length;
  const approvedCount = submissions.filter((sub) => sub.status === 'approved').length;
  const aiGeneratedCount = submissions.filter((sub) => sub.aiStatus === 'generated').length;
  const aiDraftCount = submissions.filter((sub) => sub.aiStatus === 'draft').length;

  const essentialHighlights = [...submissions]
    .filter((sub) => getTier(sub) === 'Essential')
    .sort((a, b) => b.domainAuthority - a.domainAuthority)
    .slice(0, 4);

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    const matchesSearch = sub.directoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    if (sortBy === 'date') {
      return b.submissionDate.getTime() - a.submissionDate.getTime();
    } else if (sortBy === 'da') {
      return b.domainAuthority - a.domainAuthority;
    } else if (sortBy === 'name') {
      return a.directoryName.localeCompare(b.directoryName);
    }
    return 0;
  });

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm shadow-2xl">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Directory Submissions
            </CardTitle>
            <CardDescription className="text-slate-400">
              Top {totalDirectories} directories and channels • {approvedCount} live • {aiGeneratedCount} with Anthropic copy • {aiDraftCount} drafting
            </CardDescription>
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search directories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-[200px] bg-slate-800/50 border-slate-700 text-slate-200"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700 text-slate-200">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700 text-slate-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                <SelectItem value="da">Domain Authority</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {essentialHighlights.length > 0 && (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4 mb-6">
            {essentialHighlights.map((highlight) => {
              const tier = getTier(highlight);
              const focus = getFocusArea(highlight);
              return (
                <div
                  key={highlight.id}
                  className="rounded-xl border border-blue-500/30 bg-slate-900/70 p-4 backdrop-blur-sm shadow-lg shadow-blue-500/10 hover:border-blue-400/60 transition-all"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
                    <span className="flex items-center gap-2">
                      <Badge variant="outline" className={`font-semibold ${getTierColor(tier)}`}>
                        {tier}
                      </Badge>
                      <Badge variant="outline" className={`font-semibold ${getFocusColor(focus)}`}>
                        {focus}
                      </Badge>
                    </span>
                    <Badge variant="outline" className={`font-semibold ${getStatusColor(highlight.status)}`}>
                      {highlight.status}
                    </Badge>
                  </div>
                  <div className="mt-3 space-y-2">
                    <p className="text-lg font-semibold text-slate-100 leading-tight">{highlight.directoryName}</p>
                    <p className="text-sm text-slate-400">{highlight.notes ?? 'Keep listing fresh with current messaging.'}</p>
                    <p className="text-xs text-slate-500">Last updated {formatDate(highlight.submissionDate)}</p>
                  </div>
                  {highlight.aiDescription && (
                    <p className="mt-4 text-xs text-slate-400 line-clamp-3">
                      “{highlight.aiDescription}”
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                    <span>DA {highlight.domainAuthority}</span>
                    {highlight.aiStatus && (
                      <Badge
                        variant="outline"
                        className={`font-semibold ${
                          highlight.aiStatus === 'generated'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : highlight.aiStatus === 'regenerating'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-slate-500/20 text-slate-300 border-slate-500/30'
                        }`}
                      >
                        {highlight.aiStatus === 'generated'
                          ? 'Unique copy'
                          : highlight.aiStatus === 'regenerating'
                          ? 'Refreshing'
                          : 'Draft'}
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="rounded-lg border border-slate-700/50 overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-slate-900/95 backdrop-blur-sm z-10">
                <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                  <TableHead className="text-slate-300">Directory</TableHead>
                  <TableHead className="text-slate-300">Tier</TableHead>
                  <TableHead className="text-slate-300">Focus</TableHead>
                  <TableHead className="text-slate-300">DA Score</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Last Updated</TableHead>
                  <TableHead className="text-slate-300">Content</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedSubmissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center text-slate-400 py-8">
                      No submissions found
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedSubmissions.map((submission) => (
                    <TableRow key={submission.id} className="border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                      <TableCell className="font-medium text-slate-200">
                        <div className="flex items-center gap-2">
                          {submission.directoryName}
                          <a
                            href={submission.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-blue-400 transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`font-semibold ${getTierColor(getTier(submission))}`}>
                          {getTier(submission)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`font-semibold ${getFocusColor(getFocusArea(submission))}`}>
                          {getFocusArea(submission)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`font-mono font-bold ${getDAColor(submission.domainAuthority)}`}>
                          {submission.domainAuthority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(submission.status)}>
                          {submission.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-400 text-sm">
                        {formatDate(submission.submissionDate)}
                      </TableCell>
                      <TableCell>
                        {submission.aiDescription ? (
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={`font-semibold ${
                                  submission.aiStatus === 'generated'
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                    : submission.aiStatus === 'regenerating'
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                    : 'bg-slate-500/20 text-slate-300 border-slate-500/30'
                                }`}
                              >
                                {submission.aiStatus === 'generated'
                                  ? 'Unique copy'
                                  : submission.aiStatus === 'regenerating'
                                  ? 'Refreshing'
                                  : 'Draft'}
                              </Badge>
                              {submission.lastAiGeneration && (
                                <span className="text-xs text-slate-500">
                                  {formatDate(submission.lastAiGeneration)}
                                </span>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="justify-start gap-2 text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                              onClick={() => {
                                setActiveAiSubmission(submission);
                                setIsAiDialogOpen(true);
                              }}
                            >
                              <Sparkles className="h-4 w-4" />
                              View copy
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-500 hover:text-emerald-300 hover:bg-emerald-500/10"
                          >
                            <Sparkles className="h-4 w-4 mr-1" />
                            Generate copy
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
      <Dialog open={isAiDialogOpen} onOpenChange={setIsAiDialogOpen}>
        <DialogContent className="sm:max-w-[620px] bg-slate-950 border-slate-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-100">
              <Sparkles className="h-5 w-5 text-emerald-300" />
              Anthropic-crafted listing copy
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {activeAiSubmission?.directoryName} • {activeAiSubmission?.anthropicModel ?? 'claude-3'}
            </DialogDescription>
          </DialogHeader>
          {activeAiSubmission && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <Badge
                  variant="outline"
                  className={`font-semibold ${
                    activeAiSubmission.aiStatus === 'generated'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : activeAiSubmission.aiStatus === 'regenerating'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-slate-500/20 text-slate-300 border-slate-500/30'
                  }`}
                >
                  {activeAiSubmission.aiStatus === 'generated'
                    ? 'Unique copy'
                    : activeAiSubmission.aiStatus === 'regenerating'
                    ? 'Refreshing'
                    : 'Draft'}
                </Badge>
                {activeAiSubmission.lastAiGeneration && (
                  <span>
                    Generated{' '}
                    {activeAiSubmission.lastAiGeneration.toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </span>
                )}
              </div>
              <Separator className="bg-slate-800" />
              <ScrollArea className="max-h-[320px] rounded-xl border border-slate-800/80 bg-slate-900/80 p-4">
                <p className="whitespace-pre-wrap text-sm leading-6 text-slate-200">
                  {activeAiSubmission.aiDescription}
                </p>
              </ScrollArea>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Model: {activeAiSubmission.anthropicModel ?? 'claude-3'}</span>
                <span>Directory focus: {getFocusArea(activeAiSubmission)}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
