'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockDirectorySubmissions } from '@/lib/mock-data';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

const essentialListings = mockDirectorySubmissions.filter((submission) => submission.tier === 'Essential');

const navLinks = [
  { href: '#overview', label: 'Overview' },
  { href: '#automation', label: 'Automation' },
  { href: '#tasks', label: 'Impact Tasks' },
  { href: '#library', label: 'Templates' },
];

const GlobalNavbar = () => {
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async () => {
    if (submissionState === 'submitting') return;

    setSubmissionState('submitting');

    // Simulate the async submission workflow to the essential directories.
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Submitting essential directory payload', {
      directories: essentialListings.map((listing) => ({
        id: listing.id,
        name: listing.directoryName,
        url: listing.url,
      })),
      submittedAt: new Date().toISOString(),
    });

    setSubmissionState('success');

    // Let the success state linger briefly before resetting.
    setTimeout(() => setSubmissionState('idle'), 4000);
  };

  const renderButtonIcon = () => {
    if (submissionState === 'submitting') {
      return <Loader2 className="h-4 w-4 animate-spin" />;
    }

    if (submissionState === 'success') {
      return <CheckCircle2 className="h-4 w-4" />;
    }

    return <Send className="h-4 w-4" />;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-6 sm:px-10">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-200">
          <span className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-1 text-xs uppercase text-white">
            Tempo SEO
          </span>
          <span className="hidden text-slate-300 sm:inline">Command Center</span>
        </Link>

        <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-wide text-slate-400 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-slate-100">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Badge className="hidden bg-blue-600/10 text-blue-200 border-blue-500/50 sm:inline-flex" variant="outline">
            {essentialListings.length} Essential
          </Badge>
          <Button
            onClick={handleSubmit}
            disabled={submissionState === 'submitting'}
            className="gap-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 text-white shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:via-cyan-400 hover:to-emerald-300"
          >
            {renderButtonIcon()}
            {submissionState === 'success' ? 'Submitted!' : 'Submit Essential Listings'}
          </Button>
        </div>
      </div>
    </header>
  );
};

export { GlobalNavbar };
