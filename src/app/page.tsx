'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import type { DirectorySubmission } from '@/types';
import { mockDirectorySubmissions } from '@/lib/mock-data';
import { ExternalLink, Search, Filter, Sparkles, Target, TrendingUp } from 'lucide-react';

export default function Page() {
  const [showApproved, setShowApproved] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFocus, setSelectedFocus] = useState<string[]>([]);
  const [selectedTier, setSelectedTier] = useState<string[]>([]);

  const filteredSubmissions = useMemo(() => {
    let filtered = mockDirectorySubmissions;
    
    if (!showApproved) {
      filtered = filtered.filter(sub => sub.status !== 'approved');
    }
    
    if (searchQuery) {
      filtered = filtered.filter(sub => 
        sub.directoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.notes?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedFocus.length > 0) {
      filtered = filtered.filter(sub => selectedFocus.includes(sub.focusArea || 'Niche'));
    }
    
    if (selectedTier.length > 0) {
      filtered = filtered.filter(sub => {
        const tier = sub.tier || (sub.domainAuthority >= 90 ? 'Essential' : sub.domainAuthority >= 80 ? 'High Impact' : 'Growth');
        return selectedTier.includes(tier);
      });
    }
    
    return filtered;
  }, [showApproved, searchQuery, selectedFocus, selectedTier]);

  const stats = useMemo(() => {
    const total = filteredSubmissions.length;
    const pending = filteredSubmissions.filter(s => s.status === 'pending').length;
    const submitted = filteredSubmissions.filter(s => s.status === 'submitted').length;
    const avgDA = Math.round(filteredSubmissions.reduce((acc, s) => acc + s.domainAuthority, 0) / total);
    
    return { total, pending, submitted, avgDA };
  }, [filteredSubmissions]);

  const focusAreas = ['Local', 'Pets', 'Community', 'Product', 'Startup', 'Review', 'Niche'];
  const tiers = ['Essential', 'High Impact', 'Growth'];

  const getStatusColor = (status: DirectorySubmission['status']) => {
    switch (status) {
      case 'approved': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'submitted': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'pending': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'rejected': return 'bg-red-500/20 text-red-300 border-red-500/40';
    }
  };

  const getFocusColor = (focus: string) => {
    switch (focus) {
      case 'Local': return 'bg-emerald-500/20 text-emerald-300';
      case 'Pets': return 'bg-violet-500/20 text-violet-300';
      case 'Community': return 'bg-pink-500/20 text-pink-300';
      case 'Product': return 'bg-orange-500/20 text-orange-300';
      case 'Startup': return 'bg-cyan-500/20 text-cyan-300';
      case 'Review': return 'bg-amber-500/20 text-amber-300';
      default: return 'bg-slate-500/20 text-slate-300';
    }
  };

  const getDAColor = (da: number) => {
    if (da >= 90) return 'text-purple-400';
    if (da >= 80) return 'text-blue-400';
    if (da >= 70) return 'text-cyan-400';
    return 'text-slate-400';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Compact Action Bar */}
      <div className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-sm">
        <div className="mx-auto max-w-[1800px] px-4 py-3">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Quick Stats */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-cyan-400" />
                <span className="text-slate-400">Total:</span>
                <span className="font-bold text-cyan-400">{stats.total}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-slate-400">Pending:</span>
                <span className="font-bold text-amber-400">{stats.pending}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                <span className="text-slate-400">Avg DA:</span>
                <span className="font-bold text-blue-400">{stats.avgDA}</span>
              </div>
            </div>

            <div className="h-6 w-px bg-slate-700" />

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search directories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-900 border-slate-700 focus:border-cyan-500"
              />
            </div>

            {/* Show Approved Toggle */}
            <div className="flex items-center gap-2">
              <Checkbox 
                id="show-approved" 
                checked={showApproved}
                onCheckedChange={(checked) => setShowApproved(checked === true)}
              />
              <label htmlFor="show-approved" className="text-sm text-slate-400 cursor-pointer">
                Show approved
              </label>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <Filter className="h-4 w-4 text-slate-500" />
            
            {/* Focus Area Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {focusAreas.map(focus => (
                <button
                  key={focus}
                  onClick={() => setSelectedFocus(prev => 
                    prev.includes(focus) ? prev.filter(f => f !== focus) : [...prev, focus]
                  )}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedFocus.includes(focus)
                      ? getFocusColor(focus) + ' ring-2 ring-offset-2 ring-offset-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {focus}
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-slate-700" />

            {/* Tier Filters */}
            <div className="flex items-center gap-2">
              {tiers.map(tier => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(prev => 
                    prev.includes(tier) ? prev.filter(t => t !== tier) : [...prev, tier]
                  )}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedTier.includes(tier)
                      ? 'bg-blue-500/30 text-blue-300 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>

            {(selectedFocus.length > 0 || selectedTier.length > 0) && (
              <button
                onClick={() => {
                  setSelectedFocus([]);
                  setSelectedTier([]);
                }}
                className="text-xs text-slate-500 hover:text-slate-300 underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Miro-like Card Grid */}
      <div className="mx-auto max-w-[1800px] px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {filteredSubmissions.map((submission) => {
            const tier = submission.tier || (submission.domainAuthority >= 90 ? 'Essential' : submission.domainAuthority >= 80 ? 'High Impact' : 'Growth');
            const focus = submission.focusArea || 'Niche';
            
            return (
              <div
                key={submission.id}
                className="group relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-4 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all cursor-pointer"
              >
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <Badge className={`text-xs ${getStatusColor(submission.status)}`}>
                    {submission.status}
                  </Badge>
                </div>

                {/* Directory Name */}
                <div className="pr-20 mb-3">
                  <h3 className="font-semibold text-slate-100 text-sm line-clamp-2 group-hover:text-cyan-400 transition-colors">
                    {submission.directoryName}
                  </h3>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <Badge className={`text-xs ${getFocusColor(focus)}`}>
                    {focus}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-slate-800/50 text-slate-300 border-slate-700">
                    {tier}
                  </Badge>
                </div>

                {/* DA Score */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-slate-500">DA</span>
                  <span className={`text-2xl font-bold ${getDAColor(submission.domainAuthority)}`}>
                    {submission.domainAuthority}
                  </span>
                </div>

                {/* Notes */}
                {submission.notes && (
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                    {submission.notes}
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="flex-1 text-xs hover:bg-cyan-500/10 hover:text-cyan-400"
                    onClick={() => window.open(submission.url, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Visit
                  </Button>
                  {submission.status === 'pending' && (
                    <Button
                      size="sm"
                      className="flex-1 text-xs bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300"
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      Submit
                    </Button>
                  )}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 pointer-events-none transition-all" />
              </div>
            );
          })}
        </div>

        {filteredSubmissions.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
              <Search className="h-8 w-8 text-slate-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-300 mb-2">No directories found</h3>
            <p className="text-slate-500">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
}