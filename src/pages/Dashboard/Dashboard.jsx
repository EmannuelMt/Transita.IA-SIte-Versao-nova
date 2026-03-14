// Dashboard.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Truck,
  Users,
  Building2,
  MapPin,
  Clock,
  Calendar,
  FileText,
  Route,
  Search,
  Filter,
  Download,
  RefreshCw,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  X,
  AlertTriangle,
  AlertCircle,
  Info,
  Bell,
  Settings,
  LogOut,
  User,
  ChevronRight,
  ChevronDown,
  Maximize2,
  Navigation,
  Star
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import logo from '../../assets/images/Logo/logo.svg';

// Componente de Card de Métrica
const MetricCard = React.memo(({ title, value, change, icon, color, trend }) => {
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;
  
  return (
    <motion.div 
      className="metric-card"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="metric-header">
        <div className="metric-icon" style={{ backgroundColor: `${color}20`, color }}>
          {icon}
        </div>
        {change !== undefined && (
          <div className={`metric-trend ${trend}`}>
            <TrendIcon size={14} />
            <span>{change}%</span>
          </div>
        )}
      </div>
      <div className="metric-content">
        <h3 className="metric-title">{title}</h3>
        <div className="metric-value">{value}</div>
      </div>
    </motion.div>
  );
});

// Componente de Gráfico de Linha
const LineChart = React.memo(({ data, title, height = 200 }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
        <div className="chart-actions">
          <button className="chart-action">
            <RefreshCw size={14} />
          </button>
          <button className="chart-action">
            <Download size={14} />
          </button>
        </div>
      </div>
      <div className="chart-container" style={{ height }}>
        <svg width="100%" height="100%" viewBox={`0 0 ${data.length * 50} 100`} preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line
              key={y}
              x1="0"
              y1={100 - y}
              x2={data.length * 50}
              y2={100 - y}
              stroke="var(--glass-border)"
              strokeWidth="0.5"
              strokeDasharray="4 4"
            />
          ))}
          
          {/* Line */}
          <polyline
            points={data.map((d, i) => `${i * 50 + 25},${100 - ((d.value - minValue) / range) * 80 - 10}`).join(' ')}
            fill="none"
            stroke="var(--green-moss)"
            strokeWidth="2"
          />
          
          {/* Dots */}
          {data.map((d, i) => (
            <circle
              key={i}
              cx={i * 50 + 25}
              cy={100 - ((d.value - minValue) / range) * 80 - 10}
              r="4"
              fill="var(--green-moss)"
              className="chart-dot"
            />
          ))}
        </svg>
      </div>
      <div className="chart-labels">
        {data.map((d, i) => (
          <div key={i} className="chart-label">
            <span className="label-date">{d.date}</span>
            <span className="label-value">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

// Componente de Gráfico de Pizza
const PieChartComponent = React.memo(({ data, title }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativeAngle = 0;

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
      </div>
      <div className="pie-chart-container">
        <svg viewBox="0 0 100 100" className="pie-chart">
          {data.map((item, index) => {
            const angle = (item.value / total) * 360;
            const startAngle = cumulativeAngle;
            const endAngle = cumulativeAngle + angle;
            cumulativeAngle = endAngle;

            const startRad = (startAngle - 90) * Math.PI / 180;
            const endRad = (endAngle - 90) * Math.PI / 180;

            const x1 = 50 + 40 * Math.cos(startRad);
            const y1 = 50 + 40 * Math.sin(startRad);
            const x2 = 50 + 40 * Math.cos(endRad);
            const y2 = 50 + 40 * Math.sin(endRad);

            const largeArc = angle > 180 ? 1 : 0;

            const pathData = [
              `M 50 50`,
              `L ${x1} ${y1}`,
              `A 40 40 0 ${largeArc} 1 ${x2} ${y2}`,
              `Z`
            ].join(' ');

            return (
              <path
                key={index}
                d={pathData}
                fill={item.color}
                className="pie-segment"
              />
            );
          })}
        </svg>
        <div className="pie-legend">
          {data.map((item, index) => (
            <div key={index} className="legend-item">
              <span className="legend-color" style={{ backgroundColor: item.color }}></span>
              <span className="legend-label">{item.label}</span>
              <span className="legend-value">{item.value}</span>
              <span className="legend-percent">{Math.round((item.value / total) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// Componente de Tabela de Entregas
const DeliveriesTable = React.memo(({ deliveries }) => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredDeliveries = deliveries.filter(d => {
    if (filter !== 'all' && d.status !== filter) return false;
    if (search && !d.id.toLowerCase().includes(search.toLowerCase()) && !d.address.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getStatusBadge = (status) => {
    const badges = {
      pending: { icon: <Clock size={14} />, text: 'Pendente', color: '#eab308' },
      in_progress: { icon: <Truck size={14} />, text: 'Em andamento', color: '#3b82f6' },
      delivered: { icon: <CheckCircle2 size={14} />, text: 'Entregue', color: '#22c55e' },
      cancelled: { icon: <XCircle size={14} />, text: 'Cancelado', color: '#ef4444' }
    };
    return badges[status];
  };

  return (
    <div className="table-card">
      <div className="table-header">
        <h3 className="table-title">Entregas Recentes</h3>
        <div className="table-actions">
          <div className="search-wrapper">
            <Search size={14} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar entregas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <select 
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Todos os status</option>
            <option value="pending">Pendente</option>
            <option value="in_progress">Em andamento</option>
            <option value="delivered">Entregue</option>
            <option value="cancelled">Cancelado</option>
          </select>
          <button className="table-action">
            <Download size={14} />
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Endereço</th>
              <th>Data</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeliveries.map((delivery) => {
              const status = getStatusBadge(delivery.status);
              return (
                <tr key={delivery.id}>
                  <td className="delivery-id">#{delivery.id}</td>
                  <td>{delivery.recipient}</td>
                  <td className="delivery-address">{delivery.address}</td>
                  <td>{delivery.date}</td>
                  <td>
                    <span className="status-badge" style={{ backgroundColor: `${status.color}20`, color: status.color }}>
                      {status.icon}
                      {status.text}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-button" title="Ver detalhes">
                        <Eye size={14} />
                      </button>
                      <button className="action-button" title="Editar">
                        <Edit size={14} />
                      </button>
                      <button className="action-button" title="Cancelar">
                        <XCircle size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <span className="table-info">Mostrando {filteredDeliveries.length} de {deliveries.length} entregas</span>
        <button className="view-all-button">
          Ver todas
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
});

// Componente de Lista de Notificações
const NotificationsList = React.memo(({ notifications }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedNotifications = showAll ? notifications : notifications.slice(0, 3);

  const getNotificationIcon = (type) => {
    const icons = {
      success: <CheckCircle2 size={16} />,
      warning: <AlertTriangle size={16} />,
      info: <Info size={16} />,
      error: <AlertCircle size={16} />
    };
    return icons[type];
  };

  return (
    <div className="notifications-card">
      <div className="notifications-header">
        <h3 className="notifications-title">Notificações</h3>
        <button className="notifications-action">
          <Bell size={14} />
        </button>
      </div>
      <div className="notifications-list">
        {displayedNotifications.map((notification, index) => (
          <motion.div
            key={index}
            className={`notification-item ${notification.type}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="notification-icon">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="notification-content">
              <p className="notification-message">{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
            <button className="notification-close">
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </div>
      {notifications.length > 3 && (
        <button 
          className="show-more-button"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Mostrar menos' : `Ver mais ${notifications.length - 3} notificações`}
          <ChevronDown size={14} style={{ transform: showAll ? 'rotate(180deg)' : 'none' }} />
        </button>
      )}
    </div>
  );
});

// Componente de Mapa Resumido
const MiniMap = React.memo(({ deliveries }) => {
  return (
    <div className="map-card">
      <div className="map-header">
        <h3 className="map-title">Entregas em andamento</h3>
        <button className="map-expand">
          <Maximize2 size={14} />
        </button>
      </div>
      <div className="map-container">
        <div className="map-placeholder">
          {deliveries.slice(0, 5).map((delivery, index) => (
            <motion.div
              key={delivery.id}
              className="map-marker"
              style={{
                top: `${20 + index * 15}%`,
                left: `${30 + index * 10}%`
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3
              }}
            >
              <div className="marker-dot" />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="map-footer">
        <span className="map-stats">
          <Truck size={12} />
          {deliveries.filter(d => d.status === 'in_progress').length} em andamento
        </span>
        <span className="map-stats">
          <MapPin size={12} />
          {deliveries.length} entregas ativas
        </span>
      </div>
    </div>
  );
});

// Componente de Lista de Tarefas
const TaskList = React.memo(({ tasks }) => {
  const [completed, setCompleted] = useState({});

  const toggleTask = (index) => {
    setCompleted(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="tasks-card">
      <div className="tasks-header">
        <h3 className="tasks-title">Tarefas pendentes</h3>
        <button className="tasks-action">
          <Plus size={14} />
        </button>
      </div>
      <div className="tasks-list">
        {tasks.map((task, index) => (
          <motion.div
            key={index}
            className={`task-item ${completed[index] ? 'completed' : ''}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <label className="task-checkbox">
              <input
                type="checkbox"
                checked={completed[index] || false}
                onChange={() => toggleTask(index)}
              />
              <span className="checkmark"></span>
            </label>
            <div className="task-content">
              <p className="task-title">{task.title}</p>
              <div className="task-meta">
                <Clock size={12} />
                <span>{task.time}</span>
                <span className="task-priority" style={{ backgroundColor: task.priority === 'high' ? '#ef444420' : task.priority === 'medium' ? '#eab30820' : '#22c55e20', color: task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#eab308' : '#22c55e' }}>
                  {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

// Componente de Progresso da Frota
const FleetProgress = React.memo(({ fleet }) => {
  return (
    <div className="fleet-card">
      <div className="fleet-header">
        <h3 className="fleet-title">Status da Frota</h3>
        <button className="fleet-action">
          <Settings size={14} />
        </button>
      </div>
      <div className="fleet-stats">
        <div className="fleet-stat">
          <span className="stat-label">Veículos ativos</span>
          <span className="stat-value">{fleet.active}</span>
        </div>
        <div className="fleet-stat">
          <span className="stat-label">Em manutenção</span>
          <span className="stat-value">{fleet.maintenance}</span>
        </div>
        <div className="fleet-stat">
          <span className="stat-label">Disponíveis</span>
          <span className="stat-value">{fleet.available}</span>
        </div>
      </div>
      <div className="fleet-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill active" 
            style={{ width: `${(fleet.active / fleet.total) * 100}%` }}
          />
          <div 
            className="progress-fill maintenance" 
            style={{ width: `${(fleet.maintenance / fleet.total) * 100}%` }}
          />
        </div>
        <div className="progress-labels">
          <span className="progress-label">
            <span className="dot active" /> Ativos ({fleet.active})
          </span>
          <span className="progress-label">
            <span className="dot maintenance" /> Manutenção ({fleet.maintenance})
          </span>
          <span className="progress-label">
            <span className="dot available" /> Disponível ({fleet.available})
          </span>
        </div>
      </div>
    </div>
  );
});

// Componente de Quick Actions
const QuickActions = React.memo(() => {
  const actions = [
    { icon: <Package size={16} />, label: 'Nova entrega', color: '#1A4D3E' },
    { icon: <Truck size={16} />, label: 'Adicionar veículo', color: '#2C6B4F' },
    { icon: <Users size={16} />, label: 'Novo entregador', color: '#3D8B6A' },
    { icon: <Route size={16} />, label: 'Otimizar rotas', color: '#5B8C7A' },
    { icon: <FileText size={16} />, label: 'Gerar relatório', color: '#6B9C87' },
    { icon: <Calendar size={16} />, label: 'Agendar coleta', color: '#8ABFA3' }
  ];

  return (
    <div className="quick-actions-card">
      <h3 className="quick-actions-title">Ações rápidas</h3>
      <div className="quick-actions-grid">
        {actions.map((action, index) => (
          <motion.button
            key={index}
            className="quick-action"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{ '--action-color': action.color }}
          >
            <div className="quick-action-icon">{action.icon}</div>
            <span className="quick-action-label">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
});

// Componente de Perfil do Usuário
const UserProfile = React.memo(({ user, userType }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="user-profile-card">
      <div className="user-profile-header">
        <div className="user-avatar">
          <img 
            src={`https://ui-avatars.com/api/?name=${user.name}&background=1A4D3E&color=ffffff`} 
            alt={user.name}
          />
          <div className="user-status online" />
        </div>
        <div className="user-info">
          <h3 className="user-name">{user.name}</h3>
          <p className="user-role">
            {userType === 'employee' ? 'Entregador' : 'Gestor'}
          </p>
        </div>
        <button className="user-menu-button" onClick={() => setShowMenu(!showMenu)}>
          <MoreHorizontal size={18} />
        </button>
        <AnimatePresence>
          {showMenu && (
            <motion.div 
              className="user-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <button className="menu-item">
                <User size={14} />
                <span>Meu perfil</span>
              </button>
              <button className="menu-item">
                <Settings size={14} />
                <span>Configurações</span>
              </button>
              <button className="menu-item">
                <Bell size={14} />
                <span>Notificações</span>
              </button>
              <button className="menu-item logout">
                <LogOut size={14} />
                <span>Sair</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="user-stats">
        <div className="user-stat">
          <span className="stat-value">{user.deliveries}</span>
          <span className="stat-label">Entregas</span>
        </div>
        <div className="user-stat">
          <span className="stat-value">{user.rating}</span>
          <span className="stat-label">Avaliação</span>
        </div>
        <div className="user-stat">
          <span className="stat-value">{user.experience}</span>
          <span className="stat-label">Experiência</span>
        </div>
      </div>
    </div>
  );
});

const Dashboard = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('employee'); // 'employee' ou 'company'
  const [timeRange, setTimeRange] = useState('week');
  const [showFilters, setShowFilters] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Dados mockados baseados no tipo de usuário
  const metrics = useMemo(() => {
    if (userType === 'employee') {
      return [
        { title: 'Entregas hoje', value: '12', change: 8, trend: 'up', icon: <Truck size={20} />, color: '#1A4D3E' },
        { title: 'Entregas semana', value: '78', change: 12, trend: 'up', icon: <Package size={20} />, color: '#2C6B4F' },
        { title: 'Ganhos hoje', value: 'R$ 420', change: 5, trend: 'up', icon: <DollarSign size={20} />, color: '#3D8B6A' },
        { title: 'Avaliação', value: '4.8', change: 2, trend: 'up', icon: <Star size={20} />, color: '#5B8C7A' },
        { title: 'KM rodados', value: '245', change: -3, trend: 'down', icon: <Navigation size={20} />, color: '#6B9C87' },
        { title: 'Tempo médio', value: '32min', change: -5, trend: 'down', icon: <Clock size={20} />, color: '#8ABFA3' }
      ];
    } else {
      return [
        { title: 'Entregas hoje', value: '847', change: 15, trend: 'up', icon: <Truck size={20} />, color: '#1A4D3E' },
        { title: 'Frota ativa', value: '124', change: 5, trend: 'up', icon: <Package size={20} />, color: '#2C6B4F' },
        { title: 'Faturamento', value: 'R$ 52.4k', change: 18, trend: 'up', icon: <DollarSign size={20} />, color: '#3D8B6A' },
        { title: 'Entregadores', value: '156', change: 8, trend: 'up', icon: <Users size={20} />, color: '#5B8C7A' },
        { title: 'Taxa de sucesso', value: '97%', change: 2, trend: 'up', icon: <CheckCircle2 size={20} />, color: '#6B9C87' },
        { title: 'Tempo médio', value: '28min', change: -7, trend: 'down', icon: <Clock size={20} />, color: '#8ABFA3' }
      ];
    }
  }, [userType]);

  const chartData = useMemo(() => [
    { date: 'Seg', value: 12 },
    { date: 'Ter', value: 18 },
    { date: 'Qua', value: 15 },
    { date: 'Qui', value: 22 },
    { date: 'Sex', value: 28 },
    { date: 'Sáb', value: 20 },
    { date: 'Dom', value: 10 }
  ], []);

  const pieData = useMemo(() => [
    { label: 'Entregues', value: 156, color: '#1A4D3E' },
    { label: 'Em andamento', value: 43, color: '#2C6B4F' },
    { label: 'Pendentes', value: 12, color: '#eab308' },
    { label: 'Canceladas', value: 5, color: '#ef4444' }
  ], []);

  const deliveries = useMemo(() => [
    { id: '1234', recipient: 'João Silva', address: 'Rua Augusta, 123 - Consolação', date: '10/03/2024', status: 'delivered' },
    { id: '1235', recipient: 'Maria Santos', address: 'Av. Paulista, 1000 - Bela Vista', date: '10/03/2024', status: 'in_progress' },
    { id: '1236', recipient: 'Pedro Oliveira', address: 'Rua Oscar Freire, 500 - Jardins', date: '09/03/2024', status: 'pending' },
    { id: '1237', recipient: 'Ana Costa', address: 'Av. Brigadeiro Faria Lima, 1500 - Pinheiros', date: '09/03/2024', status: 'delivered' },
    { id: '1238', recipient: 'Carlos Souza', address: 'Rua da Consolação, 2000 - Consolação', date: '08/03/2024', status: 'cancelled' },
    { id: '1239', recipient: 'Fernanda Lima', address: 'Av. Rebouças, 800 - Pinheiros', date: '08/03/2024', status: 'delivered' }
  ], []);

  const notifications = useMemo(() => [
    { type: 'success', message: 'Entrega #1234 concluída com sucesso', time: 'há 5 min' },
    { type: 'warning', message: 'Atraso na rota #1235 - trânsito intenso', time: 'há 15 min' },
    { type: 'info', message: 'Novo entregador disponível na região', time: 'há 30 min' },
    { type: 'error', message: 'Falha na comunicação com veículo #1242', time: 'há 1 hora' },
    { type: 'success', message: 'Meta de entregas da semana atingida!', time: 'há 2 horas' }
  ], []);

  const tasks = useMemo(() => [
    { title: 'Revisar rotas para amanhã', time: 'Hoje, 18:00', priority: 'high' },
    { title: 'Confirmar disponibilidade dos entregadores', time: 'Hoje, 14:00', priority: 'high' },
    { title: 'Atualizar cadastro de veículos', time: 'Hoje, 16:00', priority: 'medium' },
    { title: 'Gerar relatório mensal', time: 'Amanhã, 09:00', priority: 'low' },
    { title: 'Agendar manutenção preventiva', time: 'Quarta, 10:00', priority: 'medium' }
  ], []);

  const fleet = useMemo(() => ({
    total: 50,
    active: 35,
    maintenance: 8,
    available: 7
  }), []);

  const user = useMemo(() => ({
    name: userType === 'employee' ? 'João Silva' : 'Maria Santos',
    deliveries: userType === 'employee' ? '1.247' : '847',
    rating: '4.8',
    experience: '2 anos'
  }), [userType]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="dashboard">
      {/* Sidebar (reutilizar componente existente) */}
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <button className="menu-toggle">
            <Menu size={20} />
          </button>
          <h1 className="page-title">Dashboard</h1>
          <div className="page-actions">
            <button className="header-action" onClick={handleRefresh}>
              <RefreshCw size={16} className={refreshKey ? 'spinning' : ''} />
            </button>
            <button className="header-action" onClick={() => setShowFilters(!showFilters)}>
              <Filter size={16} />
            </button>
            <button className="header-action">
              <Download size={16} />
            </button>
          </div>
        </div>
        <div className="header-right">
          <div className="time-range-selector">
            <button 
              className={`time-option ${timeRange === 'day' ? 'active' : ''}`}
              onClick={() => setTimeRange('day')}
            >
              Hoje
            </button>
            <button 
              className={`time-option ${timeRange === 'week' ? 'active' : ''}`}
              onClick={() => setTimeRange('week')}
            >
              Semana
            </button>
            <button 
              className={`time-option ${timeRange === 'month' ? 'active' : ''}`}
              onClick={() => setTimeRange('month')}
            >
              Mês
            </button>
          </div>
          <div className="user-type-selector">
            <button 
              className={`type-option ${userType === 'employee' ? 'active' : ''}`}
              onClick={() => setUserType('employee')}
            >
              <User size={14} />
              <span>Entregador</span>
            </button>
            <button 
              className={`type-option ${userType === 'company' ? 'active' : ''}`}
              onClick={() => setUserType('company')}
            >
              <Building2 size={14} />
              <span>Empresa</span>
            </button>
          </div>
        </div>
      </header>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            className="filters-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="filters-header">
              <h3>Filtros</h3>
              <button onClick={() => setShowFilters(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="filters-content">
              <div className="filter-group">
                <label>Data inicial</label>
                <input type="date" className="filter-input" />
              </div>
              <div className="filter-group">
                <label>Data final</label>
                <input type="date" className="filter-input" />
              </div>
              <div className="filter-group">
                <label>Status</label>
                <select className="filter-select">
                  <option>Todos</option>
                  <option>Entregues</option>
                  <option>Em andamento</option>
                  <option>Pendentes</option>
                  <option>Canceladas</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Região</label>
                <select className="filter-select">
                  <option>Todas</option>
                  <option>São Paulo</option>
                  <option>Rio de Janeiro</option>
                  <option>Belo Horizonte</option>
                </select>
              </div>
            </div>
            <div className="filters-actions">
              <button className="apply-filters">Aplicar filtros</button>
              <button className="clear-filters">Limpar</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* User Profile (mobile) */}
        <div className="mobile-profile">
          <UserProfile user={user} userType={userType} />
        </div>

        {/* Metrics Grid */}
        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="charts-row">
          <div className="chart-col">
            <LineChart data={chartData} title="Entregas por dia" height={250} />
          </div>
          <div className="chart-col">
            <PieChartComponent data={pieData} title="Status das entregas" />
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          <div className="grid-col main">
            <DeliveriesTable deliveries={deliveries} />
          </div>
          <div className="grid-col sidebar">
            <MiniMap deliveries={deliveries} />
            <TaskList tasks={tasks} />
            <FleetProgress fleet={fleet} />
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Notifications (mobile) */}
        <div className="mobile-notifications">
          <NotificationsList notifications={notifications} />
        </div>
      </main>

      {/* Floating Action Button */}
      <motion.button 
        className="fab"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Plus size={24} />
      </motion.button>
    </div>
  );
};

export default Dashboard;