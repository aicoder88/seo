'use client';

import { useState } from 'react';
import { BlogContact } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ExternalLink, Mail, Plus, Edit, Trash2, Users } from 'lucide-react';

interface BlogOutreachProps {
  contacts: BlogContact[];
}

export default function BlogOutreach({ contacts = [] }: BlogOutreachProps) {
  const [localContacts, setLocalContacts] = useState(contacts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const getStatusColor = (status: BlogContact['status']) => {
    switch (status) {
      case 'responded':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'contacted':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'new':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'declined':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const handleDelete = (id: string) => {
    setLocalContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm shadow-2xl">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg">
                <Users className="h-6 w-6 text-cyan-400" />
              </div>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Manual Blog Outreach
              </span>
            </CardTitle>
            <CardDescription className="text-slate-400 mt-1">
              Manage high-authority blog contacts and outreach campaigns
            </CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-slate-900 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-slate-200">Add New Contact</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Add a new blog contact for outreach
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-300">Name</Label>
                  <Input id="name" placeholder="John Doe" className="bg-slate-800 border-slate-700 text-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="bg-slate-800 border-slate-700 text-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blogUrl" className="text-slate-300">Blog URL</Label>
                  <Input id="blogUrl" placeholder="https://example.com" className="bg-slate-800 border-slate-700 text-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="da" className="text-slate-300">Domain Authority</Label>
                  <Input id="da" type="number" placeholder="75" className="bg-slate-800 border-slate-700 text-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-slate-300">Notes</Label>
                  <Textarea id="notes" placeholder="Additional notes..." className="bg-slate-800 border-slate-700 text-slate-200" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-slate-700 text-slate-300">
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)} className="bg-gradient-to-r from-cyan-600 to-blue-600">
                  Add Contact
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-slate-700/50 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-900/95">
              <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                <TableHead className="text-slate-300">Contact</TableHead>
                <TableHead className="text-slate-300">Blog</TableHead>
                <TableHead className="text-slate-300">DA Score</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
                <TableHead className="text-slate-300">Last Contact</TableHead>
                <TableHead className="text-right text-slate-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {localContacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-slate-400 py-8">
                    No contacts yet. Add your first contact to get started.
                  </TableCell>
                </TableRow>
              ) : (
                localContacts.map((contact) => (
                  <TableRow key={contact.id} className="border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-200">{contact.name}</div>
                        <div className="text-sm text-slate-400">{contact.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <a
                        href={contact.blogUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                      >
                        {contact.blogUrl.replace(/^https?:\/\//, '')}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono font-bold bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {contact.domainAuthority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(contact.status)}>{contact.status}</Badge>
                    </TableCell>
                    <TableCell className="text-slate-400 text-sm">
                      {contact.lastContactDate
                        ? contact.lastContactDate.toLocaleDateString()
                        : 'Never'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-400 hover:bg-blue-500/10">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(contact.id)}
                          className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}