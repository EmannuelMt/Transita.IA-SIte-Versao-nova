import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Heart,
  Handshake,
  Activity,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Facebook,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Send,
  Shield,
  Award,
  TrendingUp,
  Users,
  Globe,
  Zap,
  Leaf,
  ChevronUp,
  Sparkles,
  Cpu,
  Network,
  BadgeCheck,
  Rocket,
  Code,
  Coffee,
  Smartphone,
  Laptop,
  Cloud,
  Lock,
  FileText,
  HelpCircle,
  MessageSquare,
  Headphones,
  BookOpen,
  ExternalLink,
  Download,
  Play,
  CheckCircle,
  AlertCircle,
  Star,
  Layers,
  BarChart3,
  Package,
  Truck,
  Navigation,
  Target,
  Compass,
  Radar,
  Satellite,
  Gauge,
  Wind,
  Recycle,
  Factory,
  ScanLine,
  Blocks,
  Route,
  LocateFixed,
  Infinity,
  Hexagon,
  Boxes,
  CpuIcon,
  User,
  Briefcase,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Cookie,
  Apple,
  ExternalLink as ExternalLinkIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  GithubIcon
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';
import logo from '../../assets/images/Logo/logo.svg';

// Importando ícones de redes sociais adicionais
import { FaTiktok, FaDiscord, FaWhatsapp, FaTelegram, FaMedium, FaDev, FaProductHunt } from 'react-icons/fa';
import { SiBuymeacoffee, SiKofi } from 'react-icons/si';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  
  const location = useLocation();
  const { scrollY } = useScroll();
  
  const footerOpacity = useTransform(scrollY, [0, 300], [0, 1]);
  const footerScale = useTransform(scrollY, [0, 300], [0.95, 1]);
  const footerY = useTransform(scrollY, [0, 300], [20, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setFormErrors({});
    
    if (!email) {
      setFormErrors({ email: 'O e-mail é obrigatório' });
      return;
    }
    
    if (!validateEmail(email)) {
      setFormErrors({ email: 'Por favor, insira um e-mail válido' });
      return;
    }
    
    // Simular envio
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
    setEmail('');
    setFormErrors({});
  };

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  // Links organizados por categoria
  const footerLinks = {
    empresa: [
      { name: 'Sobre Nós', path: '/sobre', icon: <Users size={16} />, description: 'Conheça nossa história' },
      { name: 'Carreiras', path: '/carreiras', icon: <Briefcase size={16} />, description: 'Trabalhe conosco', badge: '4 vagas' },
      { name: 'Blog', path: '/blog', icon: <BookOpen size={16} />, description: 'Artigos e novidades' },
      { name: 'Imprensa', path: '/imprensa', icon: <FileText size={16} />, description: 'Kit de imprensa' },
      { name: 'Parceiros', path: '/parceiros', icon: <Handshake size={16} />, description: 'Seja um parceiro' },
    ],
    solucoes: [
      { name: 'Plataforma', path: '/plataforma', icon: <Layers size={16} />, description: 'Conheça a plataforma' },
      { name: 'Planos', path: '/planos', icon: <Package size={16} />, description: 'Preços e recursos' },
      { name: 'API', path: '/api', icon: <Code size={16} />, description: 'Documentação técnica' },
      { name: 'Dashboard', path: '/dashboard', icon: <BarChart3 size={16} />, description: 'Área do cliente' },
      { name: 'Mobile', path: '/mobile', icon: <Smartphone size={16} />, description: 'App mobile' },
    ],
    recursos: [
      { name: 'Central de Ajuda', path: '/ajuda', icon: <HelpCircle size={16} />, description: 'Tire suas dúvidas' },
      { name: 'Tutoriais', path: '/tutoriais', icon: <Play size={16} />, description: 'Vídeos tutoriais' },
      { name: 'Documentação', path: '/docs', icon: <FileText size={16} />, description: 'Guias e referências' },
      { name: 'Status', path: '/status', icon: <Activity size={16} />, description: 'Status do sistema', badge: 'Online' },
      { name: 'Suporte', path: '/suporte', icon: <Headphones size={16} />, description: 'Fale com o suporte' },
    ],
    legal: [
      { name: 'Termos de Uso', path: '/termos', icon: <FileText size={16} /> },
      { name: 'Privacidade', path: '/privacidade', icon: <Lock size={16} /> },
      { name: 'Cookies', path: '/cookies', icon: <Cookie size={16} /> },
      { name: 'LGPD', path: '/lgpd', icon: <Shield size={16} /> },
      { name: 'Segurança', path: '/seguranca', icon: <ShieldCheck size={16} /> },
    ],
  };

  // Redes sociais expandidas
  const socialLinks = [
    { icon: <Github size={18} />, url: 'https://github.com/transita-ai', label: 'GitHub', color: '#333' },
    { icon: <Linkedin size={18} />, url: 'https://linkedin.com/company/transita-ai', label: 'LinkedIn', color: '#0077b5' },
    { icon: <Twitter size={18} />, url: 'https://twitter.com/transita_ai', label: 'Twitter', color: '#1da1f2' },
    { icon: <Instagram size={18} />, url: 'https://instagram.com/transita.ai', label: 'Instagram', color: '#e4405f' },
    { icon: <Youtube size={18} />, url: 'https://youtube.com/@transita-ai', label: 'YouTube', color: '#ff0000' },
    { icon: <Facebook size={18} />, url: 'https://facebook.com/transita.ai', label: 'Facebook', color: '#1877f2' },
    { icon: <FaTiktok size={18} />, url: 'https://tiktok.com/@transita.ai', label: 'TikTok', color: '#000000' },
    { icon: <FaDiscord size={18} />, url: 'https://discord.gg/transita-ai', label: 'Discord', color: '#5865f2' },
    { icon: <FaWhatsapp size={18} />, url: 'https://wa.me/5511999999999', label: 'WhatsApp', color: '#25d366' },
    { icon: <FaTelegram size={18} />, url: 'https://t.me/transita_ai', label: 'Telegram', color: '#0088cc' },
    { icon: <SiBuymeacoffee size={18} />, url: 'https://buymeacoffee.com/transita-ai', label: 'Buy Me a Coffee', color: '#ffdd00' },
    { icon: <SiKofi size={18} />, url: 'https://ko-fi.com/transita-ai', label: 'Ko-fi', color: '#ff5e5b' },
  ];

  // Contatos
  const contacts = [
    { icon: <Phone size={16} />, text: '+55 (11) 3333-4444', link: 'tel:+551133334444', description: 'Telefone comercial' },
    { icon: <Mail size={16} />, text: 'contato@transita.ai', link: 'mailto:contato@transita.ai', description: 'E-mail para contato' },
    { icon: <Headphones size={16} />, text: 'suporte@transita.ai', link: 'mailto:suporte@transita.ai', description: 'Suporte técnico' },
    { icon: <MapPin size={16} />, text: 'São Paulo, SP', link: 'https://maps.google.com/?q=São Paulo', description: 'Matriz' },
    { icon: <Clock size={16} />, text: 'Seg - Sex, 8h - 20h', description: 'Horário de atendimento' },
  ];

  // Selos e certificações
  const badges = [
    { icon: <Award size={20} />, text: 'ISO 27001', description: 'Segurança da informação' },
    { icon: <ShieldCheck size={20} />, text: 'LGPD Compliant', description: 'Proteção de dados' },
    { icon: <BadgeCheck size={20} />, text: 'Great Place to Work', description: 'Melhores empresas para trabalhar' },
    { icon: <Rocket size={20} />, text: 'Startup of the Year', description: 'Prêmio inovação 2024' },
  ];

  // Métodos de pagamento
  const paymentMethods = [
    { icon: '💳', name: 'Visa' },
    { icon: '💳', name: 'Mastercard' },
    { icon: '💳', name: 'American Express' },
    { icon: '💳', name: 'Elo' },
    { icon: '📱', name: 'Pix' },
    { icon: '📱', name: 'Boleto' },
  ];

  return (
    <motion.footer 
      className="footer"
      style={{ opacity: footerOpacity, scale: footerScale, y: footerY }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="footer-container">
        {/* Grid Principal */}
        <div className="footer-grid">
          
          {/* Coluna 1 - Brand e Selos */}
          <div className="footer-column brand-column">
            <Link to="/" className="footer-logo">
              <div className="logo-container">
                <img src={logo} alt="Transita.AI" className="footer-logo-img" />
              </div>
              <span className="logo-text">Transita<span className="logo-accent">.AI</span></span>
            </Link>
            
            <p className="brand-description">
              Revolucionando a logística brasileira com inteligência artificial e algoritmos quânticos.
            </p>

            <div className="brand-badges">
              {badges.map((badge, index) => (
                <motion.div 
                  key={index} 
                  className="badge-item"
                  whileHover={{ scale: 1.05, y: -2 }}
                  onMouseEnter={() => setActiveTooltip(`badge-${index}`)}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <span className="badge-icon">{badge.icon}</span>
                  <span className="badge-text">{badge.text}</span>
                  
                  {activeTooltip === `badge-${index}` && (
                    <motion.div 
                      className="badge-tooltip"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {badge.description}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="payment-methods">
              <h4 className="payment-title">Métodos de Pagamento</h4>
              <div className="payment-grid">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="payment-item" title={method.name}>
                    <span className="payment-icon">{method.icon}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna 2 - Empresa */}
          <div className="footer-column">
            <h4 className="column-title" onClick={() => toggleAccordion('empresa')}>
              Empresa
              <ChevronRight className={`accordion-icon ${activeAccordion === 'empresa' ? 'rotated' : ''}`} size={16} />
            </h4>
            <ul className={`footer-links ${activeAccordion === 'empresa' ? 'active' : ''}`}>
              {footerLinks.empresa.map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link 
                    to={link.path} 
                    className={`footer-link ${location.pathname === link.path ? 'active' : ''}`}
                    onMouseEnter={() => setActiveTooltip(link.name)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <span className="link-icon">{link.icon}</span>
                    <span className="link-text">{link.name}</span>
                    {link.badge && <span className="link-badge">{link.badge}</span>}
                    
                    {activeTooltip === link.name && link.description && (
                      <motion.span 
                        className="link-tooltip"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        {link.description}
                      </motion.span>
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 - Soluções */}
          <div className="footer-column">
            <h4 className="column-title" onClick={() => toggleAccordion('solucoes')}>
              Soluções
              <ChevronRight className={`accordion-icon ${activeAccordion === 'solucoes' ? 'rotated' : ''}`} size={16} />
            </h4>
            <ul className={`footer-links ${activeAccordion === 'solucoes' ? 'active' : ''}`}>
              {footerLinks.solucoes.map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link 
                    to={link.path} 
                    className={`footer-link ${location.pathname === link.path ? 'active' : ''}`}
                    onMouseEnter={() => setActiveTooltip(link.name)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <span className="link-icon">{link.icon}</span>
                    <span className="link-text">{link.name}</span>
                    
                    {activeTooltip === link.name && link.description && (
                      <motion.span 
                        className="link-tooltip"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        {link.description}
                      </motion.span>
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 - Recursos */}
          <div className="footer-column">
            <h4 className="column-title" onClick={() => toggleAccordion('recursos')}>
              Recursos
              <ChevronRight className={`accordion-icon ${activeAccordion === 'recursos' ? 'rotated' : ''}`} size={16} />
            </h4>
            <ul className={`footer-links ${activeAccordion === 'recursos' ? 'active' : ''}`}>
              {footerLinks.recursos.map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link 
                    to={link.path} 
                    className={`footer-link ${location.pathname === link.path ? 'active' : ''}`}
                    onMouseEnter={() => setActiveTooltip(link.name)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <span className="link-icon">{link.icon}</span>
                    <span className="link-text">{link.name}</span>
                    {link.badge && <span className="link-badge success">{link.badge}</span>}
                    
                    {activeTooltip === link.name && link.description && (
                      <motion.span 
                        className="link-tooltip"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        {link.description}
                      </motion.span>
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Coluna 5 - Legal e Contato */}
          <div className="footer-column">
            <h4 className="column-title" onClick={() => toggleAccordion('legal')}>
              Legal
              <ChevronRight className={`accordion-icon ${activeAccordion === 'legal' ? 'rotated' : ''}`} size={16} />
            </h4>
            <ul className={`footer-links ${activeAccordion === 'legal' ? 'active' : ''}`}>
              {footerLinks.legal.map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link to={link.path} className="footer-link">
                    <span className="link-icon">{link.icon}</span>
                    <span className="link-text">{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Contatos */}
            <div className="contact-section">
              <h4 className="column-title">Contato</h4>
              <ul className="contact-list">
                {contacts.map((contact, index) => (
                  <li key={index}>
                    {contact.link ? (
                      <a 
                        href={contact.link} 
                        className="contact-link"
                        target={contact.link.startsWith('http') ? '_blank' : undefined}
                        rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        <span className="contact-icon">{contact.icon}</span>
                        <span className="contact-text">{contact.text}</span>
                      </a>
                    ) : (
                      <span className="contact-text">
                        <span className="contact-icon">{contact.icon}</span>
                        {contact.text}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter e Redes Sociais */}
        <div className="footer-newsletter-social">
          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4 className="newsletter-title">Receba Novidades</h4>
            <p className="newsletter-description">
              Inscreva-se para receber insights exclusivos sobre logística e IA.
            </p>
            
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  className={`newsletter-input ${formErrors.email ? 'error' : ''}`}
                  aria-label="E-mail para newsletter"
                />
                <motion.button
                  type="submit"
                  className="newsletter-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Inscrever-se"
                >
                  <Send size={18} />
                </motion.button>
              </div>
              
              <AnimatePresence>
                {formErrors.email && (
                  <motion.div 
                    className="form-error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <AlertCircle size={12} />
                    <span>{formErrors.email}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isSubscribed && (
                  <motion.div 
                    className="subscribe-success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <CheckCircle2 size={14} />
                    <span>Inscrito com sucesso! Verifique seu e-mail.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="newsletter-disclaimer">
                Ao se inscrever, você concorda com nossa Política de Privacidade.
              </p>
            </form>
          </div>

          {/* Redes Sociais */}
          <div className="footer-social">
            <h4 className="social-title">Conecte-se Conosco</h4>
            <div className="social-grid">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* App Downloads */}
            <div className="app-downloads">
              <h5 className="download-title">Baixe nosso app</h5>
              <div className="download-buttons">
                <motion.a 
                  href="#" 
                  className="download-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Apple size={20} />
                  <span>App Store</span>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="download-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Smartphone size={20} />
                  <span>Google Play</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="bottom-content">
            <p className="copyright">
              © {new Date().getFullYear()} Transita.AI Tecnologia Ltda. 
              <span className="separator">•</span>
              <span className="cnpj">CNPJ: 12.345.678/0001-90</span>
            </p>
            
            <div className="bottom-links">
              <Link to="/termos" className="bottom-link">Termos</Link>
              <span className="separator">•</span>
              <Link to="/privacidade" className="bottom-link">Privacidade</Link>
              <span className="separator">•</span>
              <Link to="/cookies" className="bottom-link">Cookies</Link>
            </div>

            <div className="made-with">
              <span>Feito com</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: 0,
                  ease: "easeInOut"
                }}
              >
                <Heart size={14} className="heart-icon" />
              </motion.div>
              <span>no Brasil</span>
              <img 
                src="https://flagcdn.com/w20/br.png" 
                srcSet="https://flagcdn.com/w40/br.png 2x"
                alt="Brasil"
                className="flag-icon"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Voltar ao topo"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.footer>
  );
};

export default Footer;