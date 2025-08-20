import { AdminStats, LogoProject, AdminUser } from '../types/admin';

export const generateMockStats = (): AdminStats => ({
  totalLogosCreated: 156,
  totalUsers: 89,
  popularSectors: [
    { name: 'Tecnologia', count: 45 },
    { name: 'Saúde', count: 32 },
    { name: 'Educação', count: 28 },
    { name: 'E-commerce', count: 24 },
    { name: 'Consultoria', count: 18 }
  ],
  popularStyles: [
    { name: 'Moderno', count: 67 },
    { name: 'Minimalista', count: 54 },
    { name: 'Elegante', count: 32 },
    { name: 'Divertido', count: 21 },
    { name: 'Vintage', count: 15 }
  ],
  recentActivity: [
    {
      id: '1',
      companyName: 'TechStart',
      sector: 'Tecnologia',
      createdAt: new Date('2025-01-10'),
      status: 'completed',
      concepts: 3
    },
    {
      id: '2',
      companyName: 'EcoVerde',
      sector: 'Sustentabilidade',
      createdAt: new Date('2025-01-09'),
      status: 'exported',
      concepts: 3
    },
    {
      id: '3',
      companyName: 'MediCare Plus',
      sector: 'Saúde',
      createdAt: new Date('2025-01-08'),
      status: 'draft',
      concepts: 2
    }
  ]
});

export const generateMockProjects = (): LogoProject[] => [
  {
    id: '1',
    companyName: 'TechStart',
    sector: 'Tecnologia',
    createdAt: new Date('2025-01-10'),
    status: 'completed',
    concepts: 3
  },
  {
    id: '2',
    companyName: 'EcoVerde',
    sector: 'Sustentabilidade',
    createdAt: new Date('2025-01-09'),
    status: 'exported',
    concepts: 3
  },
  {
    id: '3',
    companyName: 'MediCare Plus',
    sector: 'Saúde',
    createdAt: new Date('2025-01-08'),
    status: 'draft',
    concepts: 2
  },
  {
    id: '4',
    companyName: 'EduTech',
    sector: 'Educação',
    createdAt: new Date('2025-01-07'),
    status: 'completed',
    concepts: 3
  },
  {
    id: '5',
    companyName: 'Fashion Store',
    sector: 'Moda',
    createdAt: new Date('2025-01-06'),
    status: 'exported',
    concepts: 3
  }
];

export const generateMockUsers = (): AdminUser[] => [
  {
    id: '1',
    email: 'admin@logoassistant.com',
    name: 'Administrador',
    role: 'admin',
    createdAt: new Date('2024-12-01'),
    lastLogin: new Date('2025-01-10'),
    projectsCount: 0
  },
  {
    id: '2',
    email: 'joao@techstart.com',
    name: 'João Silva',
    role: 'user',
    createdAt: new Date('2025-01-05'),
    lastLogin: new Date('2025-01-10'),
    projectsCount: 2
  },
  {
    id: '3',
    email: 'maria@ecoverde.com',
    name: 'Maria Santos',
    role: 'user',
    createdAt: new Date('2025-01-03'),
    lastLogin: new Date('2025-01-09'),
    projectsCount: 1
  },
  {
    id: '4',
    email: 'carlos@medicare.com',
    name: 'Carlos Oliveira',
    role: 'user',
    createdAt: new Date('2025-01-02'),
    lastLogin: new Date('2025-01-08'),
    projectsCount: 3
  }
];