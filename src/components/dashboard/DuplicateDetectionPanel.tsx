'use client';

import { useState } from 'react';
import { DuplicateDetection } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, XCircle, Shield } from 'lucide-react';

interface DuplicateDetectionPanelProps {
  detections: DuplicateDetection[];
}

export default function DuplicateDetectionPanel({ detections = [] }: DuplicateDetectionPanelProps) {
  const [localDetections, setLocalDetections] = useState(detections);

  const handleAccept = (id: string) => {
    setLocalDetections((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'accepted' as const } : d))
    );
  };

  const handleOverride = (id: string) => {
    setLocalDetections((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'overridden' as const } : d))
    );
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 0.8) return 'text-red-400';
    if (score >= 0.6) return 'text-amber-400';
    return 'text-emerald-400';
  };

  const getProgressColor = (score: number) => {
    if (score >= 0.8) return 'bg-red-500';
    if (score >= 0.6) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const pendingDetections = localDetections.filter((d) => d.status === 'pending');

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Duplicate Detection
              </span>
            </CardTitle>
            <CardDescription className="text-slate-400 mt-1">
              Machine learning powered duplicate prevention system
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2 bg-purple-500/20 text-purple-300 border-purple-500/30">
            {pendingDetections.length} Pending
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {localDetections.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <div className="inline-flex p-4 bg-emerald-500/10 rounded-full mb-4">
                <CheckCircle className="h-12 w-12 text-emerald-400" />
              </div>
              <p className="text-lg font-medium text-slate-300">No duplicates detected</p>
              <p className="text-sm text-slate-500 mt-1">All submissions are unique</p>
            </div>
          ) : (
            localDetections.map((detection) => (
              <div
                key={detection.id}
                className="border border-slate-700/50 rounded-lg p-5 space-y-4 hover:bg-slate-800/30 transition-all duration-300 hover:border-purple-500/30"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-200 text-lg">{detection.directoryName}</h4>
                    <p className="text-sm text-slate-400 mt-1">{detection.url}</p>
                    <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Detected on {detection.detectedDate.toLocaleDateString()}
                    </p>
                  </div>
                  {detection.status !== 'pending' && (
                    <Badge
                      variant={detection.status === 'accepted' ? 'default' : 'secondary'}
                      className={`ml-2 ${
                        detection.status === 'accepted'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                      }`}
                    >
                      {detection.status === 'accepted' ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {detection.status}
                    </Badge>
                  )}
                </div>

                <div className="space-y-3 bg-slate-900/50 rounded-lg p-4 border border-slate-700/30">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-medium">AI Confidence Score</span>
                    <span className={`font-bold text-lg ${getConfidenceColor(detection.confidenceScore)}`}>
                      {(detection.confidenceScore * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="relative">
                    <Progress value={detection.confidenceScore * 100} className="h-3 bg-slate-800" />
                    <div 
                      className={`absolute top-0 left-0 h-3 rounded-full transition-all ${getProgressColor(detection.confidenceScore)}`}
                      style={{ width: `${detection.confidenceScore * 100}%` }}
                    />
                  </div>
                </div>

                {detection.status === 'pending' && (
                  <div className="flex gap-3 pt-2">
                    <Button
                      size="sm"
                      onClick={() => handleAccept(detection.id)}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accept as Duplicate
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOverride(detection.id)}
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Override Detection
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}