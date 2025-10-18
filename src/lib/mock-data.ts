import { DirectorySubmission, DuplicateDetection, BlogContact, OutreachTemplate } from '@/types';

// Top 100 Most Impactful SEO Directory Sites
export const mockDirectorySubmissions: DirectorySubmission[] = [
  // Tier 1: Essential (DA 90+)
  { id: '1', directoryName: 'Google My Business', url: 'https://business.google.com', domainAuthority: 100, status: 'approved', submissionDate: new Date('2024-01-15') },
  { id: '2', directoryName: 'Yelp', url: 'https://yelp.com', domainAuthority: 94, status: 'approved', submissionDate: new Date('2024-01-15') },
  { id: '3', directoryName: 'Crunchbase', url: 'https://crunchbase.com', domainAuthority: 92, status: 'submitted', submissionDate: new Date('2024-01-20') },
  { id: '4', directoryName: 'Product Hunt', url: 'https://producthunt.com', domainAuthority: 92, status: 'approved', submissionDate: new Date('2024-01-15') },
  { id: '5', directoryName: 'Hacker News', url: 'https://news.ycombinator.com', domainAuthority: 94, status: 'pending', submissionDate: new Date('2024-01-22') },
  { id: '6', directoryName: 'Facebook Business', url: 'https://facebook.com/business', domainAuthority: 96, status: 'approved', submissionDate: new Date('2024-01-10') },
  { id: '7', directoryName: 'LinkedIn Company', url: 'https://linkedin.com', domainAuthority: 98, status: 'approved', submissionDate: new Date('2024-01-12') },
  { id: '8', directoryName: 'Apple Maps', url: 'https://mapsconnect.apple.com', domainAuthority: 100, status: 'submitted', submissionDate: new Date('2024-01-18') },
  { id: '9', directoryName: 'Bing Places', url: 'https://bingplaces.com', domainAuthority: 93, status: 'approved', submissionDate: new Date('2024-01-14') },
  { id: '10', directoryName: 'Better Business Bureau', url: 'https://bbb.org', domainAuthority: 91, status: 'approved', submissionDate: new Date('2024-01-16') },

  // Tier 2: High Impact (DA 80-89)
  { id: '11', directoryName: 'Indie Hackers', url: 'https://indiehackers.com', domainAuthority: 88, status: 'approved', submissionDate: new Date('2024-01-20') },
  { id: '12', directoryName: 'AlternativeTo', url: 'https://alternativeto.net', domainAuthority: 87, status: 'approved', submissionDate: new Date('2024-01-18') },
  { id: '13', directoryName: 'G2', url: 'https://g2.com', domainAuthority: 89, status: 'submitted', submissionDate: new Date('2024-01-21') },
  { id: '14', directoryName: 'Capterra', url: 'https://capterra.com', domainAuthority: 88, status: 'approved', submissionDate: new Date('2024-01-17') },
  { id: '15', directoryName: 'TrustRadius', url: 'https://trustradius.com', domainAuthority: 84, status: 'pending', submissionDate: new Date('2024-01-23') },
  { id: '16', directoryName: 'GetApp', url: 'https://getapp.com', domainAuthority: 83, status: 'approved', submissionDate: new Date('2024-01-19') },
  { id: '17', directoryName: 'Software Advice', url: 'https://softwareadvice.com', domainAuthority: 85, status: 'submitted', submissionDate: new Date('2024-01-22') },
  { id: '18', directoryName: 'Trustpilot', url: 'https://trustpilot.com', domainAuthority: 89, status: 'approved', submissionDate: new Date('2024-01-15') },
  { id: '19', directoryName: 'Foursquare', url: 'https://foursquare.com', domainAuthority: 86, status: 'approved', submissionDate: new Date('2024-01-16') },
  { id: '20', directoryName: 'Yellow Pages', url: 'https://yellowpages.com', domainAuthority: 82, status: 'approved', submissionDate: new Date('2024-01-14') },

  // Tier 3: Strong Impact (DA 70-79)
  { id: '21', directoryName: 'BetaList', url: 'https://betalist.com', domainAuthority: 79, status: 'pending', submissionDate: new Date('2024-01-22'), nextResubmission: new Date('2024-02-05') },
  { id: '22', directoryName: 'SaaSHub', url: 'https://saashub.com', domainAuthority: 76, status: 'submitted', submissionDate: new Date('2024-01-21') },
  { id: '23', directoryName: 'Slashdot', url: 'https://slashdot.org', domainAuthority: 78, status: 'approved', submissionDate: new Date('2024-01-18') },
  { id: '24', directoryName: 'AngelList', url: 'https://angel.co', domainAuthority: 79, status: 'approved', submissionDate: new Date('2024-01-17') },
  { id: '25', directoryName: 'StartupRanking', url: 'https://startupranking.com', domainAuthority: 72, status: 'submitted', submissionDate: new Date('2024-01-20') },
  { id: '26', directoryName: 'Launching Next', url: 'https://launchingnext.com', domainAuthority: 71, status: 'pending', submissionDate: new Date('2024-01-23') },
  { id: '27', directoryName: 'Startup Buffer', url: 'https://startupbuffer.com', domainAuthority: 70, status: 'approved', submissionDate: new Date('2024-01-19') },
  { id: '28', directoryName: 'Killer Startups', url: 'https://killerstartups.com', domainAuthority: 73, status: 'submitted', submissionDate: new Date('2024-01-21') },
  { id: '29', directoryName: 'StartupLift', url: 'https://startuplift.com', domainAuthority: 74, status: 'approved', submissionDate: new Date('2024-01-18') },
  { id: '30', directoryName: 'Startup88', url: 'https://startup88.com', domainAuthority: 71, status: 'pending', submissionDate: new Date('2024-01-22') },

  // Tier 4: Good Impact (DA 60-69)
  { id: '31', directoryName: 'Betapage', url: 'https://betapage.co', domainAuthority: 68, status: 'approved', submissionDate: new Date('2024-01-17') },
  { id: '32', directoryName: 'Startup Stash', url: 'https://startupstash.com', domainAuthority: 67, status: 'submitted', submissionDate: new Date('2024-01-20') },
  { id: '33', directoryName: 'Startup Inspire', url: 'https://startupinspire.com', domainAuthority: 65, status: 'approved', submissionDate: new Date('2024-01-19') },
  { id: '34', directoryName: 'All Startups', url: 'https://allstartups.info', domainAuthority: 64, status: 'pending', submissionDate: new Date('2024-01-23') },
  { id: '35', directoryName: 'Startup Base', url: 'https://startupbase.io', domainAuthority: 66, status: 'submitted', submissionDate: new Date('2024-01-21') },
  { id: '36', directoryName: 'Feedmyapp', url: 'https://feedmyapp.com', domainAuthority: 63, status: 'approved', submissionDate: new Date('2024-01-18') },
  { id: '37', directoryName: 'Startupbeat', url: 'https://startupbeat.com', domainAuthority: 62, status: 'pending', submissionDate: new Date('2024-01-22') },
  { id: '38', directoryName: 'Erlibird', url: 'https://erlibird.com', domainAuthority: 61, status: 'submitted', submissionDate: new Date('2024-01-20') },
  { id: '39', directoryName: 'Springwise', url: 'https://springwise.com', domainAuthority: 69, status: 'approved', submissionDate: new Date('2024-01-17') },
  { id: '40', directoryName: 'Startup Collections', url: 'https://startupcollections.com', domainAuthority: 60, status: 'approved', submissionDate: new Date('2024-01-19') },

  // Tier 5: Solid Impact (DA 50-59)
  { id: '41', directoryName: 'Startups.co', url: 'https://startups.co', domainAuthority: 59, status: 'submitted', submissionDate: new Date('2024-01-21') },
  { id: '42', directoryName: 'Startup Tracker', url: 'https://startuptracker.io', domainAuthority: 58, status: 'approved', submissionDate: new Date('2024-01-18') },
  { id: '43', directoryName: 'Geekwire', url: 'https://geekwire.com', domainAuthority: 57, status: 'pending', submissionDate: new Date('2024-01-23') },
  { id: '44', directoryName: 'Launched', url: 'https://launched.io', domainAuthority: 56, status: 'submitted', submissionDate: new Date('2024-01-20') },
  { id: '45', directoryName: 'Startup Blink', url: 'https://startupblink.com', domainAuthority: 55, status: 'approved', submissionDate: new Date('2024-01-19') },
  { id: '46', directoryName: 'Startup Dope', url: 'https://startupdope.com', domainAuthority: 54, status: 'pending', submissionDate: new Date('2024-01-22') },
  { id: '47', directoryName: 'Startup Register', url: 'https://startupregister.io', domainAuthority: 53, status: 'submitted', submissionDate: new Date('2024-01-21') },
  { id: '48', directoryName: 'Venture Beat', url: 'https://venturebeat.com', domainAuthority: 59, status: 'approved', submissionDate: new Date('2024-01-17') },
  { id: '49', directoryName: 'Tech Pluto', url: 'https://techpluto.com', domainAuthority: 52, status: 'approved', submissionDate: new Date('2024-01-18') },
  { id: '50', directoryName: 'Startup Resources', url: 'https://startupresources.io', domainAuthority: 51, status: 'pending', submissionDate: new Date('2024-01-23') },

  // Additional High-Value Directories (DA 45-70)
  { id: '51', directoryName: 'Reddit (r/startups)', url: 'https://reddit.com/r/startups', domainAuthority: 91, status: 'approved', submissionDate: new Date('2024-01-16') },
  { id: '52', directoryName: 'Stack Overflow', url: 'https://stackoverflow.com', domainAuthority: 95, status: 'approved', submissionDate: new Date('2024-01-15') },
  { id: '53', directoryName: 'GitHub', url: 'https://github.com', domainAuthority: 96, status: 'approved', submissionDate: new Date('2024-01-14') },
  { id: '54', directoryName: 'Dev.to', url: 'https://dev.to', domainAuthority: 82, status: 'submitted', submissionDate: new Date('2024-01-21') },
  { id: '55', directoryName: 'Hashnode', url: 'https://hashnode.com', domainAuthority: 75, status: 'approved', submissionDate: new Date('2024-01-19') },
  { id: '56', directoryName: 'Medium', url: 'https://medium.com', domainAuthority: 96, status: 'approved', submissionDate: new Date('2024-01-15') },
  { id: '57', directoryName: 'Quora', url: 'https://quora.com', domainAuthority: 93, status: 'approved', submissionDate: new Date('2024-01-16') },
  { id: '58', directoryName: 'Slideshare', url: 'https://slideshare.net', domainAuthority: 88, status: 'submitted', submissionDate: new Date('2024-01-20') },
  { id: '59', directoryName: 'Behance', url: 'https://behance.net', domainAuthority: 92, status: 'approved', submissionDate: new Date('2024-01-17') },
  { id: '60', directoryName: 'Dribbble', url: 'https://dribbble.com', domainAuthority: 90, status: 'approved', submissionDate: new Date('2024-01-18') },

  // Industry-Specific High DA (DA 50-85)
  { id: '61', directoryName: 'TechCrunch', url: 'https://techcrunch.com', domainAuthority: 93, status: 'pending', submissionDate: new Date('2024-01-23') },
  { id: '62', directoryName: 'The Next Web', url: 'https://thenextweb.com', domainAuthority: 85, status: 'submitted', submissionDate: new Date('2024-01-21') },
  { id: '63', directoryName: 'Mashable', url: 'https://mashable.com', domainAuthority: 92, status: 'approved', submissionDate: new Date('2024-01-17') },
  { id: '64', directoryName: 'Wired', url: 'https://wired.com', domainAuthority: 93, status: 'approved', submissionDate: new Date('2024-01-16') },
  { id: '65', directoryName: 'Fast Company', url: 'https://fastcompany.com', domainAuthority: 91, status: 'submitted', submissionDate: new Date('2024-01-20') },
  { id: '66', directoryName: 'Inc.com', url: 'https://inc.com', domainAuthority: 92, status: 'approved', submissionDate: new Date('2024-01-18') },
  { id: '67', directoryName: 'Entrepreneur', url: 'https://entrepreneur.com', domainAuthority: 90, status: 'approved', submissionDate: new Date('2024-01-19') },
  { id: '68', directoryName: 'Forbes', url: 'https://forbes.com', domainAuthority: 95, status: 'pending', submissionDate: new Date('2024-01-22') },
  { id: '69', directoryName: 'Business Insider', url: 'https://businessinsider.com', domainAuthority: 93, status: 'submitted', submissionDate: new Date('2024-01-21') },
  { id: '70', directoryName: 'The Verge', url: 'https://theverge.com', domainAuthority: 91, status: 'approved', submissionDate: new Date('2024-01-17') },

  // SaaS & Tech Directories (DA 45-75)
  { id: '71', directoryName: 'SaaS Genius', url: 'https://saasgenius.com', domainAuthority: 68, status: 'approved', submissionDate: new Date('2024-01-19') },
  { id: '72', directoryName: 'SaaS Worthy', url: 'https://saasworthy.com', domainAuthority: 65, status: 'submitted', submissionDate: new Date('2024-01-20') },
  { id: '73', directoryName: 'Siftery', url: 'https://siftery.com', domainAuthority: 62, status: 'approved', submissionDate: new Date('2024-01-18') },
  { id: '74', directoryName: 'StackShare', url: 'https://stackshare.io', domainAuthority: 75, status: 'approved', submissionDate: new Date('2024-01-17') },
  { id: '75', directoryName: 'Crozdesk', url: 'https://crozdesk.com', domainAuthority: 61, status: 'pending', submissionDate: new Date('2024-01-23') },
  { id: '76', directoryName: 'FinancesOnline', url: 'https://financesonline.com', domainAuthority: 70, status: 'submitted', submissionDate: new Date('2024-01-21') },
  { id: '77', directoryName: 'Featured Customers', url: 'https://featuredcustomers.com', domainAuthority: 64, status: 'approved', submissionDate: new Date('2024-01-19') },
  { id: '78', directoryName: 'Serchen', url: 'https://serchen.com', domainAuthority: 58, status: 'approved', submissionDate: new Date('2024-01-18') },
  { id: '79', directoryName: 'Sourceforge', url: 'https://sourceforge.net', domainAuthority: 87, status: 'approved', submissionDate: new Date('2024-01-16') },
  { id: '80', directoryName: 'Softpedia', url: 'https://softpedia.com', domainAuthority: 81, status: 'submitted', submissionDate: new Date('2024-01-20') },

  // Startup & Business Directories (DA 40-65)
  { id: '81', directoryName: 'F6S', url: 'https://f6s.com', domainAuthority: 72, status: 'approved', submissionDate: new Date('2024-01-17') },
  { id: '82', directoryName: 'Gust', url: 'https://gust.com', domainAuthority: 68, status: 'pending', submissionDate: new Date('2024-01-22') },
  { id: '83', directoryName: 'Owler', url: 'https://owler.com', domainAuthority: 65, status: 'submitted', submissionDate: new Date('2024-01-21') },
  { id: '84', directoryName: 'Manta', url: 'https://manta.com', domainAuthority: 70, status: 'approved', submissionDate: new Date('2024-01-19') },
  { id: '85', directoryName: 'Clutch', url: 'https://clutch.co', domainAuthority: 78, status: 'approved', submissionDate: new Date('2024-01-18') },
  { id: '86', directoryName: 'GoodFirms', url: 'https://goodfirms.co', domainAuthority: 63, status: 'submitted', submissionDate: new Date('2024-01-20') },
  { id: '87', directoryName: 'The Manifest', url: 'https://themanifest.com', domainAuthority: 69, status: 'approved', submissionDate: new Date('2024-01-17') },
  { id: '88', directoryName: 'Visual Objects', url: 'https://visualobjects.com', domainAuthority: 61, status: 'pending', submissionDate: new Date('2024-01-23') },
  { id: '89', directoryName: 'Sitejabber', url: 'https://sitejabber.com', domainAuthority: 74, status: 'submitted', submissionDate: new Date('2024-01-21') },
  { id: '90', directoryName: 'Glassdoor', url: 'https://glassdoor.com', domainAuthority: 89, status: 'approved', submissionDate: new Date('2024-01-16') },

  // Final 10 High-Value Directories
  { id: '91', directoryName: 'Pitchbook', url: 'https://pitchbook.com', domainAuthority: 80, status: 'approved', submissionDate: new Date('2024-01-18') },
  { id: '92', directoryName: 'CB Insights', url: 'https://cbinsights.com', domainAuthority: 77, status: 'submitted', submissionDate: new Date('2024-01-20') },
  { id: '93', directoryName: 'Craft.co', url: 'https://craft.co', domainAuthority: 71, status: 'approved', submissionDate: new Date('2024-01-19') },
  { id: '94', directoryName: 'Tracxn', url: 'https://tracxn.com', domainAuthority: 69, status: 'pending', submissionDate: new Date('2024-01-22') },
  { id: '95', directoryName: 'Dealroom', url: 'https://dealroom.co', domainAuthority: 67, status: 'submitted', submissionDate: new Date('2024-01-21') },
  { id: '96', directoryName: 'Wellfound (AngelList)', url: 'https://wellfound.com', domainAuthority: 79, status: 'approved', submissionDate: new Date('2024-01-17') },
  { id: '97', directoryName: 'Startup Grind', url: 'https://startupgrind.com', domainAuthority: 73, status: 'approved', submissionDate: new Date('2024-01-18') },
  { id: '98', directoryName: 'Betabound', url: 'https://betabound.com', domainAuthority: 64, status: 'pending', submissionDate: new Date('2024-01-23') },
  { id: '99', directoryName: 'Startup Savant', url: 'https://startupsavant.com', domainAuthority: 66, status: 'submitted', submissionDate: new Date('2024-01-20') },
  { id: '100', directoryName: 'Startup Nation', url: 'https://startupnation.com', domainAuthority: 68, status: 'approved', submissionDate: new Date('2024-01-19') },
];

// Mock data for duplicate detections
export const mockDuplicateDetections: DuplicateDetection[] = [
  {
    id: '1',
    directoryName: 'StartupBase',
    url: 'https://startupbase.io',
    confidenceScore: 0.95,
    detectedDate: new Date('2024-01-23'),
    status: 'pending',
  },
  {
    id: '2',
    directoryName: 'SaaSHub',
    url: 'https://saashub.com',
    confidenceScore: 0.78,
    detectedDate: new Date('2024-01-24'),
    status: 'pending',
  },
  {
    id: '3',
    directoryName: 'Capterra',
    url: 'https://capterra.com',
    confidenceScore: 0.62,
    detectedDate: new Date('2024-01-25'),
    status: 'accepted',
  },
];

// Mock data for blog contacts
export const mockBlogContacts: BlogContact[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@techblog.com',
    blogUrl: 'https://techblog.com',
    domainAuthority: 78,
    status: 'responded',
    lastContactDate: new Date('2024-01-20'),
    notes: 'Interested in guest post collaboration',
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@startupinsights.io',
    blogUrl: 'https://startupinsights.io',
    domainAuthority: 82,
    status: 'contacted',
    lastContactDate: new Date('2024-01-22'),
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily@devnews.com',
    blogUrl: 'https://devnews.com',
    domainAuthority: 85,
    status: 'new',
  },
  {
    id: '4',
    name: 'David Park',
    email: 'david@saasnews.net',
    blogUrl: 'https://saasnews.net',
    domainAuthority: 76,
    status: 'declined',
    lastContactDate: new Date('2024-01-15'),
    notes: 'Not accepting guest posts currently',
  },
];

// Mock data for outreach templates
export const mockOutreachTemplates: OutreachTemplate[] = [
  {
    id: '1',
    name: 'Initial Outreach',
    subject: 'Guest Post Opportunity for {{blog_name}}',
    body: 'Hi {{contact_name}},\n\nI hope this email finds you well. I\'ve been following {{blog_name}} and really appreciate your content on {{topic}}.\n\nI\'d love to contribute a guest post...',
    category: 'Guest Post',
  },
  {
    id: '2',
    name: 'Follow-up',
    subject: 'Following up on guest post opportunity',
    body: 'Hi {{contact_name}},\n\nI wanted to follow up on my previous email about contributing to {{blog_name}}...',
    category: 'Follow-up',
  },
  {
    id: '3',
    name: 'Product Feature Request',
    subject: 'Feature opportunity: {{product_name}}',
    body: 'Hi {{contact_name}},\n\nI noticed you recently covered {{related_topic}} on {{blog_name}}. I thought you might be interested in {{product_name}}...',
    category: 'Product Feature',
  },
];