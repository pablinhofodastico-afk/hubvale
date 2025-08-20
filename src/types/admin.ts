export interface AdminStats {
  totalLogosCreated: number;
  totalUsers: number;
  popularSectors: { name: string; count: number }[];
  popularStyles: { name: string; count: number }[];
  recentActivity: LogoProject[];
}

export interface LogoProject {
  id: string;
  companyName: string;
  sector: string;
  createdAt: Date;
  status: 'draft' | 'completed' | 'exported';
  concepts: number;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
  lastLogin: Date;
  projectsCount: number;
}