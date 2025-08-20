import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2, 
  Calendar,
  Building2
} from 'lucide-react';
import { LogoProject } from '../../types/admin';

interface ProjectsManagerProps {
  projects: LogoProject[];
  onDeleteProject: (id: string) => void;
  onViewProject: (id: string) => void;
}

const ProjectsManager: React.FC<ProjectsManagerProps> = ({ 
  projects, 
  onDeleteProject, 
  onViewProject 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sectorFilter, setSectorFilter] = useState<string>('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.sector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesSector = sectorFilter === 'all' || project.sector === sectorFilter;
    
    return matchesSearch && matchesStatus && matchesSector;
  });

  const uniqueSectors = [...new Set(projects.map(p => p.sector))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Gerenciar Projetos</h1>
        <p className="text-gray-600">Visualize e gerencie todos os projetos de logo criados</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por empresa ou setor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">Todos os status</option>
            <option value="draft">Rascunho</option>
            <option value="completed">Concluído</option>
            <option value="exported">Exportado</option>
          </select>

          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">Todos os setores</option>
            {uniqueSectors.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Empresa</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Setor</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Conceitos</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Data</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{project.companyName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{project.sector}</td>
                  <td className="py-4 px-6 text-gray-600">{project.concepts}</td>
                  <td className="py-4 px-6">
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
                  <td className="py-4 px-6 text-gray-600 flex items-center gap-1">
                    <Calendar size={14} />
                    {project.createdAt.toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewProject(project.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Visualizar projeto"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => onDeleteProject(project.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Excluir projeto"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Palette className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum projeto encontrado</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all' || sectorFilter !== 'all'
                ? 'Tente ajustar os filtros de busca'
                : 'Ainda não há projetos criados no sistema'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsManager;