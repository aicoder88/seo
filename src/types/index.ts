export interface DirectorySubmission {
  id: string;
  directoryName: string;
  url: string;
  domainAuthority: number;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  submissionDate: Date;
  nextResubmission?: Date;
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
