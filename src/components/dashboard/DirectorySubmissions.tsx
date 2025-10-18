'use client';

import { useState } from 'react';
import { DirectorySubmission } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ExternalLink, Calendar, RefreshCw, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DirectorySubmissionsProps {
  submissions: DirectorySubmission[];
}

export default function DirectorySubmissions({ submissions = [] }: DirectorySubmissionsProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('da');
  const [searchQuery, setSearchQuery] = useState('');

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
              Top 100 high-impact SEO directories • {approvedSubmissions.length} live listings
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
        <div className="rounded-lg border border-slate-700/50 overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-slate-900/95 backdrop-blur-sm z-10">
                <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                  <TableHead className="text-slate-300">Directory</TableHead>
                  <TableHead className="text-slate-300">DA Score</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Submission Date</TableHead>
                  <TableHead className="text-right text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedSubmissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-slate-400 py-8">
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
                        <Badge variant="outline" className={`font-mono font-bold ${getDAColor(submission.domainAuthority)}`}>
                          {submission.domainAuthority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(submission.status)}>
                          {submission.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-400">
                        {submission.submissionDate.toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {submission.nextResubmission && (
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-400 hover:bg-blue-500/10">
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Resubmit
                          </Button>
                        )}
                        {submission.status === 'rejected' && (
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-400 hover:bg-blue-500/10">
                            <Calendar className="h-4 w-4 mr-1" />
                            Schedule
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
    </Card>
  );
}