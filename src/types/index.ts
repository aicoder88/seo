export interface DirectorySubmission {
  id: string;
  directoryName: string;
  url: string;
  domainAuthority: number;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  submissionDate: Date;
  nextResubmission?: Date;
  tier?: 'Essential' | 'High Impact' | 'Growth';
  focusArea?: 'Local' | 'Startup' | 'Product' | 'Review' | 'Community' | 'Pets' | 'Niche';
  automation?: 'auto' | 'manual';
  notes?: string;
  aiDescription?: string;
  aiStatus?: 'generated' | 'draft' | 'regenerating';
  lastAiGeneration?: Date;
  anthropicModel?: string;
}

export interface DuplicateDetection {
  id: string;
  directoryName: string;
  url: string;
  confidenceScore: number;
  detectedDate: Date;
  status: 'pending' | 'accepted' | 'overridden';
}

export interface BlogContact {
  id: string;
  name: string;
  email: string;
  blogUrl: string;
  domainAuthority: number;
  status: 'new' | 'contacted' | 'responded' | 'declined';
  lastContactDate?: Date;
  notes?: string;
}

export interface OutreachTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: string;
}

export interface AutomationTask {
  id: string;
  name: string;
  cadence: 'monthly' | 'quarterly' | 'weekly';
  nextRun: Date;
  owner: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  impact: 'critical' | 'high' | 'medium';
  relatedDirectories: string[];
  notes?: string;
}

export interface SeoTask {
  id: string;
  label: string;
  category: 'Listing' | 'Content' | 'Review' | 'Optimization';
  impactScore: number;
  status: 'queued' | 'active' | 'done';
  owner: string;
  dueDate: Date;
}

export interface AiGenerationSummary {
  totalDirectories: number;
  uniqueDescriptions: number;
  averageTokens: number;
  lastRun: Date;
  model: string;
}
