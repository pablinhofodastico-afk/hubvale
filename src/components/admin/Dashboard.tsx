import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Palette, 
  Download,
  Calendar,
  Eye
} from 'lucide-react';
import { AdminStats } from '../../types/admin';

interface DashboardProps {
  stats: AdminStats;
}

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  trend?: string;
  color: string;
}> = ({ title, value, icon: Icon, trend, color }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {trend && (
          <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
            <TrendingUp size={14} />
            {trend}
          </p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Visão geral do sistema de criação de logos</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Logos Criadas"
          value={stats.totalLogosCreated}
          icon={Palette}
          trend="+12% este mês"
          color="bg-gradient-to-r from-purple-500 to-purple-600"
        />
        <StatCard
          title="Usuários Ativos"
          value={stats.totalUsers}
          icon={Users}
          trend="+8% este mês"
          color="bg-gradient-to-r from-blue-500 to-blue-600"
        />
        <StatCard
          title="Downloads"
          value="1,247"
          icon={Download}
          trend="+23% este mês"
          color="bg-gradient-to-r from-green-500 to-green-600"
        />
        <StatCard
          title="Visualizações"
          value="3,891"
          icon={Eye}
          color="bg-gradient-to-r from-orange-500 to-orange-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Sectors */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Setores Mais Populares</h3>
          <div className="space-y-3">
            {stats.popularSectors.map((sector, index) => (
              <div key={sector.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{sector.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      style={{ width: `${(sector.count / Math.max(...stats.popularSectors.map(s => s.count))) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-600">{sector.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Styles */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estilos Mais Escolhidos</h3>
          <div className="space-y-3">
            {stats.popularStyles.map((style, index) => (
              <div key={style.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{style.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ width: `${(style.count / Math.max(...stats.popularStyles.map(s => s.count))) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-600">{style.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Empresa</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Setor</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Conceitos</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Data</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentActivity.map((project) => (
                <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{project.companyName}</td>
                  <td className="py-3 px-4 text-gray-600">{project.sector}</td>
                  <td className="py-3 px-4 text-gray-600">{project.concepts}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : project.status === 'exported'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status === 'completed' ? 'Concluído' : 
                       project.status === 'exported' ? 'Exportado' : 'Rascunho'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {project.createdAt.toLocaleDateString('pt-BR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;