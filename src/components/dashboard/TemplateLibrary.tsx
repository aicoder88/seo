'use client';

import { useState } from 'react';
import { OutreachTemplate } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Eye, Edit, Copy, Sparkles } from 'lucide-react';

interface TemplateLibraryProps {
  templates: OutreachTemplate[];
}

export default function TemplateLibrary({ templates = [] }: TemplateLibraryProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<OutreachTemplate | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const handleViewTemplate = (template: OutreachTemplate) => {
    setSelectedTemplate(template);
    setIsViewDialogOpen(true);
  };

  const handleCopyTemplate = (template: OutreachTemplate) => {
    navigator.clipboard.writeText(template.body);
  };

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm shadow-2xl">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg">
                <Sparkles className="h-6 w-6 text-pink-400" />
              </div>
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Template Library
              </span>
            </CardTitle>
            <CardDescription className="text-slate-400 mt-1">
              Reusable email templates with variable support
            </CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-slate-900 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-slate-200">Create New Template</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Create a reusable email template for outreach campaigns
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name" className="text-slate-300">Template Name</Label>
                  <Input id="template-name" placeholder="e.g., Initial Outreach" className="bg-slate-800 border-slate-700 text-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-slate-300">Category</Label>
                  <Input id="category" placeholder="e.g., Guest Post" className="bg-slate-800 border-slate-700 text-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-slate-300">Email Subject</Label>
                  <Input id="subject" placeholder="Use {{variables}} for personalization" className="bg-slate-800 border-slate-700 text-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body" className="text-slate-300">Email Body</Label>
                  <Textarea
                    id="body"
                    placeholder="Write your template here. Use {{contact_name}}, {{blog_name}}, etc."
                    rows={8}
                    className="bg-slate-800 border-slate-700 text-slate-200"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-slate-700 text-slate-300">
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)} className="bg-gradient-to-r from-pink-600 to-purple-600">
                  Create Template
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-400">
              <div className="inline-flex p-4 bg-pink-500/10 rounded-full mb-4">
                <FileText className="h-12 w-12 text-pink-400" />
              </div>
              <p className="text-lg font-medium text-slate-300">No templates yet</p>
              <p className="text-sm text-slate-500 mt-1">Create your first template to get started</p>
            </div>
          ) : (
            templates.map((template) => (
              <div
                key={template.id}
                className="border border-slate-700/50 rounded-lg p-5 space-y-4 hover:bg-slate-800/30 transition-all duration-300 hover:border-pink-500/30 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-200 text-lg group-hover:text-pink-400 transition-colors">
                      {template.name}
                    </h4>
                    <Badge variant="secondary" className="mt-2 bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {template.category}
                    </Badge>
                  </div>
                  <div className="p-2 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-lg">
                    <FileText className="h-5 w-5 text-pink-400" />
                  </div>
                </div>

                <div className="space-y-2 bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Subject:</p>
                  <p className="text-sm text-slate-300 line-clamp-2">{template.subject}</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-slate-400 hover:text-pink-400 hover:bg-pink-500/10"
                    onClick={() => handleViewTemplate(template)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10"
                    onClick={() => handleCopyTemplate(template)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-400 hover:bg-blue-500/10">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px] bg-slate-900 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-slate-200">{selectedTemplate?.name}</DialogTitle>
              <DialogDescription>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  {selectedTemplate?.category}
                </Badge>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Subject</Label>
                <div className="p-3 bg-slate-800 rounded-md text-sm text-slate-200 border border-slate-700">
                  {selectedTemplate?.subject}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Body</Label>
                <div className="p-3 bg-slate-800 rounded-md text-sm text-slate-200 whitespace-pre-wrap max-h-[300px] overflow-y-auto border border-slate-700">
                  {selectedTemplate?.body}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)} className="border-slate-700 text-slate-300">
                Close
              </Button>
              <Button 
                onClick={() => selectedTemplate && handleCopyTemplate(selectedTemplate)}
                className="bg-gradient-to-r from-pink-600 to-purple-600"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Template
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}