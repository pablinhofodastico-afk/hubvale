import React, { useState } from 'react';
import { 
  Save, 
  Key, 
  Palette, 
  Globe, 
  Shield,
  Bell,
  Database,
  Eye,
  EyeOff
} from 'lucide-react';

interface SettingsManagerProps {
  onSaveSettings: (settings: any) => void;
}

const SettingsManager: React.FC<SettingsManagerProps> = ({ onSaveSettings }) => {
  const [settings, setSettings] = useState({
    stabilityApiKey: '',
    maxLogosPerUser: 10,
    enableEmailNotifications: true,
    enablePublicGallery: false,
    defaultLogoStyle: 'Moderno',
    systemMaintenance: false,
    autoBackup: true,
    sessionTimeout: 60
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    onSaveSettings(settings);
    // Show success message
    alert('Configurações salvas com sucesso!');
  };

  const tabs = [
    { id: 'general', label: 'Geral', icon: Globe },
    { id: 'api', label: 'API & Integrações', icon: Key },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'notifications', label: 'Notificações', icon: Bell },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Máximo de logos por usuário
              </label>
              <input
                type="number"
                value={settings.maxLogosPerUser}
                onChange={(e) => setSettings(prev => ({ ...prev, maxLogosPerUser: parseInt(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="1"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estilo padrão de logo
              </label>
              <select
                value={settings.defaultLogoStyle}
                onChange={(e) => setSettings(prev => ({ ...prev, defaultLogoStyle: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="Minimalista">Minimalista</option>
                <option value="Moderno">Moderno</option>
                <option value="Vintage">Vintage</option>
                <option value="Divertido">Divertido</option>
                <option value="Elegante">Elegante</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Galeria pública</label>
                <p className="text-xs text-gray-500">Permitir que logos sejam exibidas publicamente</p>
              </div>
              <button
                onClick={() => setSettings(prev => ({ ...prev, enablePublicGallery: !prev.enablePublicGallery }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enablePublicGallery ? 'bg-purple-500' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.enablePublicGallery ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Modo manutenção</label>
                <p className="text-xs text-gray-500">Desabilitar acesso temporariamente</p>
              </div>
              <button
                onClick={() => setSettings(prev => ({ ...prev, systemMaintenance: !prev.systemMaintenance }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.systemMaintenance ? 'bg-red-500' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.systemMaintenance ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chave da API Stability AI
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={settings.stabilityApiKey}
                  onChange={(e) => setSettings(prev => ({ ...prev, stabilityApiKey: e.target.value }))}
                  placeholder="sk-..."
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Chave global para geração de imagens (pode ser sobrescrita por usuários)
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Status da API</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-blue-800">Stability AI:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    settings.stabilityApiKey ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {settings.stabilityApiKey ? 'Configurada' : 'Não configurada'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeout de sessão (minutos)
              </label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="15"
                max="480"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Backup automático</label>
                <p className="text-xs text-gray-500">Fazer backup dos dados automaticamente</p>
              </div>
              <button
                onClick={() => setSettings(prev => ({ ...prev, autoBackup: !prev.autoBackup }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoBackup ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoBackup ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">Políticas de Segurança</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Chaves de API são criptografadas em repouso</li>
                <li>• Sessões expiram automaticamente</li>
                <li>• Logs de auditoria são mantidos por 90 dias</li>
                <li>• Dados são processados conforme LGPD</li>
              </ul>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Notificações por email</label>
                <p className="text-xs text-gray-500">Enviar emails para eventos importantes</p>
              </div>
              <button
                onClick={() => setSettings(prev => ({ ...prev, enableEmailNotifications: !prev.enableEmailNotifications }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enableEmailNotifications ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.enableEmailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Eventos de Notificação</h4>
              <div className="space-y-2">
                {[
                  'Novo usuário registrado',
                  'Logo criada com sucesso',
                  'Erro na geração de imagem',
                  'Limite de uso atingido',
                  'Backup realizado'
                ].map((event, index) => (
                  <label key={index} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      className="rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                    />
                    <span className="text-gray-700">{event}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Configurações do Sistema</h1>
        <p className="text-gray-600">Gerencie as configurações globais da aplicação</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>

        {/* Save Button */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium py-2 px-6 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center gap-2"
          >
            <Save size={16} />
            Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsManager;