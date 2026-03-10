// NotFound.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  AlertCircle, 
  ArrowLeft, 
  RefreshCw, 
  Headphones, 
  Mail, 
  Phone, 
  MessageSquare,
  MapPin,
  Clock,
  ChevronRight,
  HelpCircle,
  Wifi,
  WifiOff,
  Shield,
  AlertTriangle,
  Compass,
  Rocket,
  Sparkles,
  Heart,
  Coffee,
  Smile,
  Frown,
  Meh,
  Loader
} from 'lucide-react';
import './NotFound.css';
import logo from '../../assets/images/Logo/logo.svg';

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentMood, setCurrentMood] = useState('neutral');

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const contactChannels = [
    { 
      icon: <Headphones size={18} />, 
      title: 'Suporte 24/7', 
      description: 'Atendimento especializado',
      action: 'Chat ao vivo',
      link: '/suporte',
      color: '#3D8B6A'
    },
    { 
      icon: <Mail size={18} />, 
      title: 'E-mail', 
      description: 'suporte@transita.ai',
      action: 'Enviar mensagem',
      link: 'mailto:suporte@transita.ai',
      color: '#5B8C7A'
    },
    { 
      icon: <Phone size={18} />, 
      title: 'Telefone', 
      description: '(11) 3333-4444',
      action: 'Ligar agora',
      link: 'tel:+551133334444',
      color: '#6B9C87'
    },
    { 
      icon: <MessageSquare size={18} />, 
      title: 'WhatsApp', 
      description: 'Atendimento rápido',
      action: 'Iniciar conversa',
      link: 'https://wa.me/5511999999999',
      color: '#8ABFA3'
    }
  ];

  const quickLinks = [
    { name: 'Página Inicial', path: '/', icon: Home, description: 'Voltar ao início' },
    { name: 'Soluções', path: '/solucoes', icon: Rocket, description: 'Conheça nossas tecnologias' },
    { name: 'Planos', path: '/planos', icon: Sparkles, description: 'Ver preços e recursos' },
    { name: 'Contato', path: '/contato', icon: Headphones, description: 'Fale conosco' },
  ];

  const statusEmojis = [
    { mood: '😕', label: 'neutral', rotate: -5 },
    { mood: '😢', label: 'sad', rotate: 0 },
    { mood: '😊', label: 'happy', rotate: 5 },
  ];

  return (
    <div className="not-found">
      {/* Background Elements */}
      <div className="not-found-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="grid-pattern"></div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="not-found-container">
        {/* Logo */}
        <motion.div 
          className="logo-wrapper"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="logo-link">
            <img src={logo} alt="Transita.AI" className="logo-image" />
          </Link>
        </motion.div>

        {/* Error Card */}
        <motion.div 
          className="error-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`
          }}
        >
          {/* Status Code with Animation */}
          <div className="error-code-wrapper">
            <motion.div 
              className="error-code"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="code-4">4</span>
              <motion.span 
                className="code-0"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                0
              </motion.span>
              <span className="code-4">4</span>
            </motion.div>
            
            <div className="error-status">
              <AlertTriangle size={20} />
              <span>Página não encontrada</span>
            </div>
          </div>

          {/* Message */}
          <motion.div 
            className="message-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="greeting">
              <span className="greeting-text">Olá, usuário!</span>
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="greeting-emoji"
              >
                {statusEmojis.find(e => e.label === currentMood)?.mood || '😕'}
              </motion.div>
            </div>

            <p className="message-main">
              Se você chegou até esta página, pode ser que o site esteja passando por manutenção para novas atualizações ou que a página que você tentou acessar não esteja disponível no momento.
            </p>

            <p className="message-secondary">
              Pedimos desculpas pelo inconveniente e pedimos que tente acessar novamente mais tarde.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="action-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.button
              onClick={() => navigate(-1)}
              className="btn-primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} />
              <span>Voltar</span>
            </motion.button>

            <motion.button
              onClick={handleRefresh}
              className="btn-secondary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader size={18} className="spinning" />
              ) : (
                <RefreshCw size={18} />
              )}
              <span>{isLoading ? 'Atualizando...' : 'Tentar novamente'}</span>
            </motion.button>

            <Link to="/" className="btn-home">
              <Home size={18} />
              <span>Página Inicial</span>
            </Link>
          </motion.div>

          {/* Auto Redirect Info */}
          <motion.div 
            className="redirect-info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Wifi size={14} className={countdown > 0 ? 'wifi-icon' : 'wifi-off'} />
            <span>
              {countdown > 0 
                ? `Redirecionando para a página inicial em ${countdown} segundos...` 
                : 'Redirecionando agora...'}
            </span>
          </motion.div>
        </motion.div>

        {/* Contact Channels */}
        <motion.div 
          className="contact-channels"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="channels-title">
            <Headphones size={18} />
            <span>Canais de Atendimento</span>
          </h3>

          <p className="channels-description">
            Caso precise de ajuda, entre em contato com o suporte por um de nossos canais de atendimento.
          </p>

          <div className="channels-grid">
            {contactChannels.map((channel, index) => (
              <motion.a
                key={index}
                href={channel.link}
                className="channel-card"
                style={{ '--channel-color': channel.color }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { type: 'spring', stiffness: 400 }
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
              >
                <div className="channel-icon-wrapper">
                  {channel.icon}
                </div>
                <div className="channel-info">
                  <h4>{channel.title}</h4>
                  <p>{channel.description}</p>
                  <span className="channel-action">
                    {channel.action}
                    <ChevronRight size={12} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          className="quick-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <h3 className="quick-links-title">Você também pode gostar:</h3>
          <div className="quick-links-grid">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={link.path} className="quick-link">
                  <link.icon size={16} />
                  <span>{link.name}</span>
                  <small>{link.description}</small>
                  <ChevronRight size={14} className="link-arrow" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="not-found-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <div className="footer-content">
            <div className="footer-section">
              <Shield size={14} />
              <span>Site seguro • Proteção de dados • LGPD</span>
            </div>
            
            <div className="footer-section">
              <Clock size={14} />
              <span>Atendimento 24/7 • Suporte especializado</span>
            </div>
            
            <div className="footer-section">
              <MapPin size={14} />
              <span>São Paulo • Goiás • Brasil</span>
            </div>
          </div>

          <div className="footer-made-with">
            <span>Feito com</span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart size={12} className="heart-icon" />
            </motion.div>
            <span>no Brasil • Transita.AI © {new Date().getFullYear()}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;