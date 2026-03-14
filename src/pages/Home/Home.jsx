import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  BarChart3, 
  Shield, 
  Zap, 
  Globe, 
  Truck, 
  MapPin, 
  Clock,
  ChevronRight,
  Play,
  CheckCircle2,
  Users,
  Handshake,
  ShieldCheck,
  Leaf,
  MessageSquare,
  Star,
  Send,
  Phone,
  Mail,
  Sparkles,
  TrendingUp,
  Award,
  Target,
  Network,
  Cpu,
  Radar,
  Infinity,
  Hexagon,
  Boxes,
  Satellite,
  Gauge,
  Wind,
  Recycle,
  Factory,
  ScanLine,
  Blocks,
  Route,
  LocateFixed,
  ChevronDown,
  Zap as ZapIcon,
  Gift,
  Rocket,
  Check,
  Plus,
  Package,
  Coins,
  CreditCard,
  Menu,
  X,
  ExternalLink,
  Download,
  FileText,
  Video,
  Headphones,
  HelpCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '../../assets/images/Logo/logo.svg';
import heroBackground from '../../assets/images/Logo/logobannerhero.jpg';
import registerImage from '../../assets/images/Home/register-e-frota.jpg';
import registerEmployees from '../../assets/images/Home/register-funcionarios.jpg';
import activationImage from '../../assets/images/Home/Processo de ativação da conta.jpg';

// Componente de Partículas Otimizado
const Particles = React.memo(({ count = 30 }) => {
  const particles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 5,
      xMove: Math.random() * 200 - 100,
      yMove: Math.random() * 200 - 100
    })), [count]
  );

  return (
    <div className="hero-particles">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          animate={{
            x: [0, particle.xMove, 0],
            y: [0, particle.yMove, 0],
            opacity: [0, 0.2, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: 0, // Alterado de Infinity para 0 para evitar erro
            repeatType: "loop",
            ease: "easeInOut",
            delay: particle.delay
          }}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}
    </div>
  );
});

// Componente de Card de Estatística
const StatCard = React.memo(({ icon, value, label, suffix, index }) => (
  <motion.div
    className="stat-card"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8 }}
  >
    <div className="stat-icon">{icon}</div>
    <div className="stat-content">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-suffix">{suffix}</div>
    </div>
    <div className="stat-glow"></div>
  </motion.div>
));

// Componente de Card de Timeline
const TimelineItem = React.memo(({ item, index }) => (
  <motion.div
    className="timeline-item"
    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="timeline-year">
      <div className="timeline-year-content">
        <span>{item.year}</span>
        <div className="timeline-year-icon">{item.icon}</div>
      </div>
    </div>
    <div className="timeline-content">
      <h4>{item.title}</h4>
      <p>{item.description}</p>
    </div>
  </motion.div>
));

// Componente de Card de Depoimento
const TestimonialCard = React.memo(({ testimonial, index }) => (
  <motion.div
    className="testimonial-card"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8 }}
  >
    <div className="testimonial-rating">
      {[...Array(testimonial.rating)].map((_, i) => (
        <Star key={i} size={14} fill="currentColor" />
      ))}
    </div>
    <p className="testimonial-content">"{testimonial.content}"</p>
    <div className="testimonial-author">
      <img 
        src={testimonial.image} 
        alt={testimonial.name} 
        className="testimonial-avatar"
        loading="lazy"
      />
      <div>
        <div className="testimonial-name">{testimonial.name}</div>
        <div className="testimonial-role">{testimonial.role}</div>
      </div>
    </div>
    <div className="testimonial-company">{testimonial.company}</div>
  </motion.div>
));

const Home = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [activePlan, setActivePlan] = useState('pro');
  const [selectedTokenPlan, setSelectedTokenPlan] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const plansRef = useRef(null);
  
  // Animações baseadas no scroll com spring para mais suavidade
  const smoothY1 = useSpring(useTransform(scrollY, [0, 500], [0, 150]), { stiffness: 100, damping: 30 });
  const smoothY2 = useSpring(useTransform(scrollY, [0, 500], [0, -150]), { stiffness: 100, damping: 30 });
  const heroOpacity = useSpring(useTransform(scrollY, [0, 300], [1, 0.95]), { stiffness: 100, damping: 30 });
  const heroScale = useSpring(useTransform(scrollY, [0, 300], [1, 0.98]), { stiffness: 100, damping: 30 });
  const heroBlur = useSpring(useTransform(scrollY, [0, 300], [0, 4]), { stiffness: 100, damping: 30 });

  // Stats otimizados com useMemo
  const stats = useMemo(() => [
    { icon: <Truck size={32} />, value: "1.2M", label: "Rotas/dia", suffix: "+ processadas" },
    { icon: <Users size={32} />, value: "850", label: "Clientes", suffix: "empresas" },
    { icon: <Globe size={32} />, value: "15", label: "Países", suffix: "operação" },
    { icon: <TrendingUp size={32} />, value: "35%", label: "Economia", suffix: "média" }
  ], []);

  // Journey Timeline
  const journey = useMemo(() => [
    {
      year: "2018",
      title: "Fundação",
      description: "Transita.AI nasce no coração do ecossistema de inovação brasileiro.",
      icon: <Hexagon size={24} />
    },
    {
      year: "2019",
      title: "Primeiro Algoritmo",
      description: "Lançamento do primeiro algoritmo proprietário de otimização logística.",
      icon: <Network size={24} />
    },
    {
      year: "2020",
      title: "Expansão Nacional",
      description: "Alcance nacional com mais de 100 clientes e 1M de entregas.",
      icon: <MapPin size={24} />
    },
    {
      year: "2021",
      title: "IA Generativa",
      description: "Implementação de IA generativa para planejamento autônomo.",
      icon: <Cpu size={24} />
    },
    {
      year: "2022",
      title: "Blockchain",
      description: "Integração com blockchain para segurança e transparência total.",
      icon: <Blocks size={24} />
    },
    {
      year: "2023",
      title: "Green Logistics",
      description: "Lançamento do programa de logística verde e sustentável.",
      icon: <Recycle size={24} />
    },
    {
      year: "2024",
      title: "Liderança Global",
      description: "Expansão internacional com operações em 15 países.",
      icon: <Globe size={24} />
    }
  ], []);

  // Testimonials
  const testimonials = useMemo(() => [
    {
      name: "Carlos Eduardo",
      role: "Diretor de Operações, FastLog",
      content: "Reduzimos nossos custos operacionais em 42% no primeiro ano. A Transita.AI não é apenas uma ferramenta, é um divisor de águas para o setor.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Carlos+Eduardo&background=1A4D3E&color=ffffff",
      company: "FastLog"
    },
    {
      name: "Fernanda Lima",
      role: "VP de Supply Chain, GlobalTrade",
      content: "A precisão da IA é impressionante. Conseguiram prever com 97% de acurácia nossos picos de demanda com 6 meses de antecedência.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Fernanda+Lima&background=1A4D3E&color=ffffff",
      company: "GlobalTrade"
    },
    {
      name: "João Pedro",
      role: "CEO, TransExpress",
      content: "A integração foi perfeita em 48 horas. O ROI veio no primeiro mês. É a melhor decisão tecnológica que tomamos.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Joao+Pedro&background=1A4D3E&color=ffffff",
      company: "TransExpress"
    },
    {
      name: "Ana Beatriz",
      role: "Diretora de Logística, LogTech",
      content: "A plataforma é extremamente intuitiva e o suporte técnico é excepcional.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Ana+Beatriz&background=1A4D3E&color=ffffff",
      company: "LogTech"
    },
    {
      name: "Ricardo Mendes",
      role: "CTO, DeliveryExpress",
      content: "Arquitetura sólida e escalável. Processamos 1 milhão de rotas por dia sem downtime.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Ricardo+Mendes&background=1A4D3E&color=ffffff",
      company: "DeliveryExpress"
    },
    {
      name: "Patrícia Oliveira",
      role: "Head de Sustentabilidade, EcoLog",
      content: "Reduzimos nossa pegada de carbono em 35% com as rotas verdes otimizadas.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Patricia+Oliveira&background=1A4D3E&color=ffffff",
      company: "EcoLog"
    }
  ], []);

  // Partners
  const partners = useMemo(() => [
    "Amazon", "Mercado Livre", "Magalu", "Via Varejo", "DHL", "FedEx", "UPS", "Correios"
  ], []);

  // Planos de Assinatura
  const subscriptionPlans = useMemo(() => [
    {
      id: 'basic',
      name: 'Básico',
      price: 'R$ 2.500',
      period: '/mês',
      description: 'Ideal para pequenas operações',
      features: [
        'Até 1.000 rotas/mês',
        'Dashboard básico',
        'Suporte em horário comercial',
        'API com limite diário',
        '1 usuário incluso'
      ],
      cta: 'Começar agora',
      popular: false,
      icon: <Package size={24} />
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 'R$ 5.900',
      period: '/mês',
      description: 'Para empresas em crescimento',
      features: [
        'Até 10.000 rotas/mês',
        'Análises avançadas',
        'Suporte 24/7 prioritário',
        'API ilimitada',
        '5 usuários inclusos',
        'IA generativa',
        'Rotas otimizadas em tempo real'
      ],
      cta: 'Escolher Pro',
      popular: true,
      icon: <Rocket size={24} />
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Personalizado',
      period: '',
      description: 'Para grandes operações',
      features: [
        'Rotas ilimitadas',
        'Soluções customizadas',
        'Gerente de conta dedicado',
        'SLA garantido',
        'Usuários ilimitados',
        'On-premise disponível',
        'Treinamento exclusivo'
      ],
      cta: 'Falar com vendas',
      popular: false,
      icon: <Award size={24} />
    }
  ], []);

  // Planos de Tokens
  const tokenPlans = useMemo(() => [
    {
      id: 'token-500',
      name: 'Pacote Básico',
      tokens: 500,
      price: 49,
      bonus: 0,
      popular: false,
      icon: <ZapIcon size={24} />
    },
    {
      id: 'token-2000',
      name: 'Pacote Profissional',
      tokens: 2000,
      price: 149,
      bonus: 15,
      popular: true,
      icon: <Rocket size={24} />
    },
    {
      id: 'token-10000',
      name: 'Pacote Enterprise',
      tokens: 10000,
      price: 599,
      bonus: 30,
      popular: false,
      icon: <Coins size={24} />
    }
  ], []);

  const handlePlanSelect = useCallback((planId) => {
    setActivePlan(planId);
  }, []);

  const handleTokenSelect = useCallback((planId) => {
    setSelectedTokenPlan(planId);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    // Implementar lógica de envio
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: ''
    });
    // Mostrar mensagem de sucesso
    alert('Mensagem enviada com sucesso!');
  }, [formData]);

  const openVideoModal = useCallback(() => {
    setIsVideoModalOpen(true);
  }, []);

  const closeVideoModal = useCallback(() => {
    setIsVideoModalOpen(false);
  }, []);

  return (
    <div className="home">
      {/* Hero Section com Imagem de Fundo */}
      <section ref={heroRef} className="hero" id="home">
        <div className="hero-background">
          <div className="hero-image-overlay"></div>
          <img 
            src={heroBackground} 
            alt="Hero Background" 
            className="hero-background-image"
            loading="eager"
          />
          <div className="hero-gradient-overlay"></div>
          <div className="hero-grid"></div>
          <Particles count={40} />
        </div>

        <motion.div 
          className="hero-content"
          style={{ 
            opacity: heroOpacity, 
            scale: heroScale,
            filter: heroBlur ? `blur(${heroBlur}px)` : 'none'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-badge"
          >
            <Sparkles size={16} />
            <span>Inteligência Artificial para Logística</span>
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Logística Quântica
            <br />
            <span className="hero-title-gradient">Algorítmica</span>
          </motion.h1>

          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Processamento neural de 1.2 milhões de rotas por segundo. 
            A primeira plataforma de IA generativa para supply chain do Brasil.
          </motion.p>

          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/demo" className="btn-primary">
              <span>Ativar Demonstração</span>
              <ArrowRight size={20} />
              <div className="btn-glow"></div>
            </Link>
            <button 
              className="btn-secondary"
              onClick={openVideoModal}
            >
              <Play size={18} />
              <span>Ver em Ação</span>
            </button>
          </motion.div>

          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {stats.slice(0, 3).map((stat, index) => (
              <div key={index} className="hero-stat">
                <div className="hero-stat-icon">{stat.icon}</div>
                <div>
                  <div className="hero-stat-value">{stat.value}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div 
            className="hero-scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            onClick={() => scrollToSection('sobre')}
          >
            <span>Role para explorar</span>
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-logo-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <img src={logo} alt="Transita.AI Logo" className="logo-white" />
        </motion.div>

        <motion.div 
          className="hero-scroll"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: 0, repeatType: "reverse" }}
        >
          <div className="hero-scroll-line"></div>
        </motion.div>
      </section>


      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div 
            className="video-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideoModal}
          >
            <motion.div 
              className="video-modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="video-modal-close" onClick={closeVideoModal}>
                <X size={24} />
              </button>
              <div className="video-modal-iframe-container">
                <iframe
                  src="https://www.youtube.com/embed/demo-video-id"
                  title="Transita.AI em Ação"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sobre Section */}
      <section className="about" id="sobre">
        <div className="container">
          <div className="about-grid">
            <motion.div 
              className="about-logo-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="about-logo-container">
                <img src={logo} alt="Transita.AI Logo" className="logo-green" />
                <div className="about-logo-glow"></div>
              </div>
            </motion.div>

            <motion.div 
              className="about-content"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="section-badge">
                <MessageSquare size={16} />
                Sobre Nós
              </span>
              
              <h2 className="section-title">
                Transformando a <span className="section-title-gradient">logística</span> com IA
              </h2>
              
              <p className="about-description">
                A Transita.AI nasceu em 2018 com uma missão clara: revolucionar o setor logístico 
                através da inteligência artificial. Combinamos expertise em tecnologia com profundo 
                conhecimento do mercado brasileiro para criar soluções que realmente fazem a diferença.
              </p>

              <div className="about-features">
                <div className="about-feature">
                  <div className="about-feature-icon">
                    <Cpu size={20} />
                  </div>
                  <div>
                    <h4>Tecnologia Proprietária</h4>
                    <p>Algoritmos exclusivos desenvolvidos por nossa equipe de P&D</p>
                  </div>
                </div>
                <div className="about-feature">
                  <div className="about-feature-icon">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4>Equipe Especializada</h4>
                    <p>Mais de 50 engenheiros e cientistas de dados</p>
                  </div>
                </div>
                <div className="about-feature">
                  <div className="about-feature-icon">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h4>Presença Global</h4>
                    <p>Operações em 15 países e crescimento contínuo</p>
                  </div>
                </div>
              </div>

              <div className="about-stats-mini">
                <div className="about-stat-item">
                  <span className="about-stat-value">7+</span>
                  <span className="about-stat-label">anos de mercado</span>
                </div>
                <div className="about-stat-item">
                  <span className="about-stat-value">850+</span>
                  <span className="about-stat-label">clientes ativos</span>
                </div>
                <div className="about-stat-item">
                  <span className="about-stat-value">15</span>
                  <span className="about-stat-label">países</span>
                </div>
              </div>

              <div className="about-values">
                <div className="value-tag">
                  <ShieldCheck size={16} />
                  <span>Integridade</span>
                </div>
                <div className="value-tag">
                  <Cpu size={16} />
                  <span>Inovação</span>
                </div>
                <div className="value-tag">
                  <Leaf size={16} />
                  <span>Sustentabilidade</span>
                </div>
                <div className="value-tag">
                  <TrendingUp size={16} />
                  <span>Escalabilidade</span>
                </div>
                <div className="value-tag">
                  <Target size={16} />
                  <span>Resultados</span>
                </div>
                <div className="value-tag">
                  <Handshake size={16} />
                  <span>Parceria</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="stats" id="resultados" ref={statsRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <BarChart3 size={16} />
              Resultados
            </span>
            <h2 className="section-title">
              Números que <span className="section-title-gradient">comprovam</span>
            </h2>
            <p className="section-description">
              Mais de 850 empresas já transformaram suas operações com nossa plataforma
            </p>
          </motion.div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="journey" id="historia">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <Target size={16} />
              Nossa História
            </span>
            <h2 className="section-title">
              Evolução <span className="section-title-gradient">Constante</span>
            </h2>
            <p className="section-description">
              Uma trajetória de inovação e crescimento desde 2018
            </p>
          </motion.div>

          <div className="timeline">
            {journey.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>
      
 {/* Processo de ativação da conta empresarial */}
      <section className="activation-process" id="ativacao-conta">
        <div className="container">
          <div className="register-grid">
            <motion.div
              className="register-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge">
                <ShieldCheck size={16} />
                Processo de ativação da conta empresarial
              </span>

              <h2 className="section-title">
                Processo de ativação da <span className="section-title-gradient">conta empresarial</span>
              </h2>

              <p className="section-description">
                Olá! Sabemos que muitos usuários podem ter dúvidas sobre o funcionamento do nosso site e sobre como ocorre o processo de cadastro e ativação das empresas dentro da plataforma Transita.IA. Por isso, reunimos algumas informações importantes para explicar melhor como funciona esse processo.
              </p>

              <p className="section-description">
                Na Transita.IA, cada empresa possui um banco de dados exclusivo e isolado, criado especialmente para garantir um alto padrão de segurança, organização e profissionalismo. Essa estrutura permite que todas as informações de cada cliente sejam armazenadas de forma independente, evitando qualquer risco de conflito entre dados, acessos indevidos ou vazamentos de informações. Dessa forma, garantimos que os dados da sua empresa permaneçam protegidos e que o sistema funcione com máxima eficiência e confiabilidade.
              </p>

              <p className="section-description">
                Para que possamos liberar o ambiente completo da empresa dentro da plataforma, é necessário que a empresa já possua uma conta registrada no site. Esse cadastro inicial permite que nossa equipe identifique a empresa no sistema e, posteriormente, libere o acesso administrativo (Admin) para que ela possa gerenciar sua própria área dentro da plataforma.
              </p>

              <p className="section-description">
                Devido ao processo de criação e configuração personalizada do ambiente de cada empresa, o prazo de implementação pode levar alguns dias ou até algumas semanas, dependendo da demanda e da complexidade das configurações solicitadas. Esse cuidado faz parte do nosso compromisso em entregar uma plataforma segura, estável e preparada para atender às necessidades específicas de cada cliente.
              </p>

              <p className="section-description">
                Após a ativação da conta empresarial e a liberação do acesso administrativo, a empresa poderá gerenciar totalmente o seu ambiente dentro da plataforma. Com esse acesso, será possível cadastrar funcionários, registrar motoristas, gerenciar veículos, organizar rotas e utilizar todos os recursos disponíveis na Dashboard da Transita.IA, permitindo uma gestão mais eficiente das operações logísticas.
              </p>

              <p className="section-description">
                É importante destacar que o processo de configuração e liberação completa do ambiente da empresa é realizado apenas após a contratação de um dos planos da plataforma ou mediante contato direto com nossa equipe para a solicitação de um serviço personalizado. Dessa forma, conseguimos entender melhor as necessidades de cada empresa e configurar a plataforma da maneira mais adequada.
              </p>

              <p className="section-description">
                Nosso objetivo é oferecer uma solução segura, profissional e eficiente, garantindo que cada empresa tenha um ambiente exclusivo, organizado e preparado para crescer junto com suas operações. Caso tenha qualquer dúvida ou precise de mais informações, nossa equipe estará sempre disponível para ajudar.
              </p>
            </motion.div>

            <motion.div
              className="register-image"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="activation-image-wrapper">
                <img src={activationImage} alt="Processo de ativação da conta" loading="lazy" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>


       {/* Registro de Funcionários */}
      <section className="register-employees" id="registro-funcionarios">
        <div className="container">
          <div className="register-grid">
            <motion.div
              className="register-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge">
                <Users size={16} />
                Registro de Funcionários
              </span>

              <h2 className="section-title">
                Gestão de Colaboradores e <span className="section-title-gradient">Recursos Humanos</span>
              </h2>

              <p className="section-description">
                A Transita.IA também conta com um módulo dedicado ao Registro e Gerenciamento de Funcionários, desenvolvido para facilitar a organização da equipe e centralizar todas as informações administrativas dentro da plataforma. Essa funcionalidade permite que empresas mantenham um controle estruturado e atualizado de todos os colaboradores, garantindo mais eficiência, organização e transparência na gestão interna.
              </p>

              <p className="section-description">
                Por meio da Dashboard administrativa, gestores podem realizar o cadastro de novos funcionários de forma rápida, prática e segura, armazenando informações essenciais para a identificação e organização da equipe. Para efetuar o registro, basta informar dados básicos como nome completo, RG, CPF, CTPS (Carteira de Trabalho), data de admissão, cargo e setor, permitindo que cada colaborador seja devidamente identificado e integrado ao sistema.
              </p>

              <p className="section-description">
                Após o cadastro, os funcionários passam a fazer parte do banco de dados da plataforma, possibilitando que a empresa acompanhe, organize e gerencie sua equipe de maneira centralizada e estruturada. Esse recurso é especialmente útil para organizações que possuem diferentes setores operacionais, administrativos ou logísticos, garantindo maior controle sobre os profissionais envolvidos nas atividades diárias.
              </p>

              <p className="section-description">
                Com o módulo de Registro de Funcionários da Transita.IA, gestores têm acesso a uma ferramenta prática e eficiente para administrar equipes, manter registros organizados e otimizar a gestão de colaboradores, tudo diretamente pela Dashboard da plataforma, tornando o processo de gerenciamento mais simples, transparente e profissional.
              </p>
            </motion.div>

            <motion.div
              className="register-image"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="register-image-wrapper">
                <img src={registerEmployees} alt="Registro de Funcionários" loading="lazy" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Registro de Motorista e Frota */}
      <section className="register-fleet" id="registro">
        <div className="container">
          <div className="register-grid">
            <motion.div
              className="register-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge">
                <ShieldCheck size={16} />
                Registro de Motoristas & Frota
              </span>

              <h2 className="section-title">
                Gestão de Motoristas e <span className="section-title-gradient">Frotas</span>
              </h2>

              <p className="section-description">
                A Transita.AI oferece uma plataforma completa para gestão logística e organização de operações de transporte, reunindo ferramentas inteligentes que auxiliam empresas no controle eficiente de suas atividades. Entre esses recursos, destaca-se o módulo de Registro de Motoristas e Gerenciamento de Frotas, disponível diretamente na Dashboard administrativa da plataforma.
              </p>

              <p className="section-description">
                Essa funcionalidade permite que gestores realizem o cadastro e controle de motoristas de forma simples e centralizada, mantendo todas as informações organizadas em um único ambiente. Durante o registro, basta inserir os dados essenciais do motorista, como nome completo, RG, CPF e CNH, garantindo um banco de dados seguro e estruturado para a gestão da equipe responsável pelas operações de transporte.
              </p>

              <p className="section-description">
                Além disso, a plataforma disponibiliza o sistema de cadastro e gerenciamento da frota de caminhões, permitindo registrar cada veículo utilizado pela empresa. Para adicionar um novo caminhão, é necessário informar dados básicos como número da placa, nome do veículo (ou identificação interna) e modelo do caminhão, facilitando o controle e a identificação dentro da operação logística.
              </p>

              <p className="section-description">
                Um dos principais diferenciais desse módulo é a possibilidade de vincular motoristas aos veículos cadastrados, permitindo que cada caminhão seja associado a um motorista específico. Essa funcionalidade proporciona maior organização operacional, rastreabilidade e controle sobre as responsabilidades da equipe, tornando o gerenciamento da frota mais eficiente e transparente.
              </p>

              <p className="section-description">
                Com tudo integrado à Dashboard da Transita.AI, gestores conseguem visualizar, cadastrar, editar e organizar motoristas e veículos em tempo real, garantindo uma administração mais estratégica, prática e escalável para empresas que dependem de logística e transporte no seu dia a dia.
              </p>
            </motion.div>

            <motion.div
              className="register-image"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="register-image-wrapper">
                <img src={registerImage} alt="Registro de Motoristas e Frota" loading="lazy" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Subscription Plans Section */}
      <section className="subscription-plans" id="planos" ref={plansRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <Award size={16} />
              Planos de Assinatura
            </span>
            <h2 className="section-title">
              Escolha o plano <span className="section-title-gradient">ideal</span>
            </h2>
            <p className="section-description">
              Soluções completas para todos os tamanhos de operação
            </p>
          </motion.div>

          <div className="subscription-grid">
            {subscriptionPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                className={`subscription-card ${plan.popular ? 'popular' : ''} ${activePlan === plan.id ? 'active' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {plan.popular && <div className="plan-badge">Mais Popular</div>}
                
                <div className="plan-icon">{plan.icon}</div>
                
                <div className="plan-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    <span className="plan-price-value">{plan.price}</span>
                    <span className="plan-price-period">{plan.period}</span>
                  </div>
                  <p className="plan-description">{plan.description}</p>
                </div>
                
                <ul className="plan-features">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="plan-feature">
                      <CheckCircle2 size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`plan-button ${plan.popular ? 'popular' : ''}`}>
                  {plan.cta}
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Token Plans Section */}
      <section className="token-plans" id="tokens">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <Zap size={16} />
              Tokens
            </span>
            <h2 className="section-title">
              Carregue com <span className="section-title-gradient">tokens</span>
            </h2>
            <p className="section-description">
              Compre tokens para usar serviços sob demanda, sem fidelidade
            </p>

            <div className="tokens-explanation">
              <p className="section-description">
                Olá! Sabemos que muitos usuários podem ter dúvidas sobre como funcionam os tokens de acesso dentro da plataforma Transita.IA. Por isso, preparamos uma explicação simples para ajudar a entender melhor esse recurso.
              </p>

              <p className="section-description">
                Os tokens são utilizados como um mecanismo de segurança e controle de acesso para o registro de funcionários dentro do sistema. Sempre que um novo colaborador precisar criar sua conta na plataforma, será necessário utilizar um token de registro, que será fornecido pela empresa responsável.
              </p>

              <p className="section-description">
                Esse token funciona como uma chave de autorização, garantindo que apenas pessoas autorizadas pela empresa possam se registrar e ter acesso ao ambiente da organização dentro da plataforma.
              </p>

              <p className="section-description">
                Cada token é único e individual, sendo destinado ao cadastro de apenas um funcionário específico. Após ser utilizado no momento do registro, o token passa a ficar automaticamente vinculado à conta do funcionário que realizou o cadastro, não podendo ser reutilizado por outra pessoa.
              </p>

              <p className="section-description">
                Esse sistema ajuda a manter um alto nível de segurança e organização, evitando registros indevidos e garantindo que todos os usuários cadastrados estejam realmente vinculados à empresa responsável.
              </p>

              <p className="section-description">
                Dessa forma, a Transita.IA assegura que o acesso ao sistema seja controlado de maneira segura, transparente e profissional, permitindo que cada empresa tenha total controle sobre quem pode ou não ingressar na plataforma como parte de sua equipe.
              </p>

              <p className="section-description">
                Caso haja dúvidas sobre a geração ou utilização dos tokens, a empresa responsável ou o administrador da conta poderá fornecer as orientações necessárias para o cadastro dos funcionários.
              </p>
            </div>
          </motion.div>

          <div className="token-grid">
            {tokenPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                className={`token-card ${plan.popular ? 'popular' : ''} ${selectedTokenPlan === plan.id ? 'selected' : ''}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => handleTokenSelect(plan.id)}
              >
                {plan.popular && (
                  <div className="token-badge">
                    <Gift size={14} />
                    <span>Mais vantajoso</span>
                  </div>
                )}
                
                <div className="token-icon">
                  {plan.icon}
                </div>
                
                <div className="token-content">
                  <span className="token-name">{plan.name}</span>
                  <div className="token-amount">
                    <span className="token-value">{plan.tokens.toLocaleString()}</span>
                    <span className="token-label">tokens</span>
                  </div>
                  
                  {plan.bonus > 0 && (
                    <div className="token-bonus">
                      <Plus size={14} />
                      <span>{plan.bonus}% BÔNUS</span>
                    </div>
                  )}
                  
                  <div className="token-price">
                    <span className="token-price-value">R$ {plan.price}</span>
                  </div>
                  
                  <button className="token-button">
                    Comprar
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="token-info"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="token-info-item">
              <CheckCircle2 size={18} />
              <span>Tokens nunca expiram</span>
            </div>
            <div className="token-info-item">
              <CheckCircle2 size={18} />
              <span>Use em qualquer serviço da plataforma</span>
            </div>
            <div className="token-info-item">
              <CheckCircle2 size={18} />
              <span>Recarga automática disponível</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" id="cases">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <MessageSquare size={16} />
              Cases de Sucesso
            </span>
            <h2 className="section-title">
              O que nossos <span className="section-title-gradient">clientes</span> dizem
            </h2>
            <p className="section-description">
              Histórias reais de transformação digital
            </p>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>

          <motion.div 
            className="testimonials-more"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/cases" className="more-link">
              Ver todos os cases
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section className="partners">
        <div className="container">
          <motion.div
            className="partners-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="partners-title">Confiado por líderes do mercado</span>
          </motion.div>

          <motion.div
            className="partners-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                className="partner-item"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                {partner}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <motion.div
            className="cta-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="cta-background">
              <div className="cta-gradient"></div>
            </div>

            <div className="cta-content">
              <h2 className="cta-title">
                Pronto para o <span className="cta-title-gradient">futuro</span>?
              </h2>
              <p className="cta-description">
                Junte-se a 850+ empresas que já estão revolucionando suas operações com nossa plataforma.
              </p>

              <div className="cta-features">
                <div className="cta-feature">
                  <CheckCircle2 size={20} />
                  <span>Implementação em 24h</span>
                </div>
                <div className="cta-feature">
                  <CheckCircle2 size={20} />
                  <span>Suporte 24/7 especializado</span>
                </div>
                <div className="cta-feature">
                  <CheckCircle2 size={20} />
                  <span>Garantia de performance</span>
                </div>
              </div>

              <div className="cta-buttons">
                <Link to="/demo" className="cta-button-primary">
                  <span>Iniciar Transformação</span>
                  <ChevronRight size={24} />
                </Link>
                <Link to="/contato" className="cta-button-secondary">
                  <span>Falar com especialista</span>
                  <Headphones size={18} />
                </Link>
              </div>
            </div>

            <div className="cta-stats">
              <div className="cta-stat">
                <span className="cta-stat-value">98%</span>
                <span className="cta-stat-label">Satisfação</span>
              </div>
              <div className="cta-stat">
                <span className="cta-stat-value">35%</span>
                <span className="cta-stat-label">Economia média</span>
              </div>
              <div className="cta-stat">
                <span className="cta-stat-value">24/7</span>
                <span className="cta-stat-label">Suporte</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact" id="contato">
        <div className="container">
          <div className="contact-grid">
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge">
                <Mail size={16} />
                Contato
              </span>
              
              <h2 className="contact-title">
                Vamos <span className="section-title-gradient">conversar</span>
              </h2>
              
              <p className="contact-description">
                Nossos especialistas estão prontos para entender seus desafios e propor soluções personalizadas.
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-method-icon">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4>Telefone</h4>
                    <p>(11) 3333-4444</p>
                    <p>(62) 3333-5555</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-method-icon">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>contato@transita.ai</p>
                    <p>suporte@transita.ai</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-method-icon">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4>Horário de Atendimento</h4>
                    <p>Segunda a Sexta: 8h às 20h</p>
                    <p>Sábado: 9h às 13h</p>
                  </div>
                </div>
              </div>

              <div className="contact-locations">
                <div className="location-card">
                  <div className="location-icon">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4>São Paulo - Matriz</h4>
                    <p>Av. Paulista, 1000</p>
                    <p>Bela Vista, São Paulo - SP</p>
                    <p>CEP: 01310-100</p>
                  </div>
                </div>

                <div className="location-card">
                  <div className="location-icon">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4>Goiás - Anápolis</h4>
                    <p>Av. Brasil, 500</p>
                    <p>Centro, Anápolis - GO</p>
                    <p>CEP: 75000-000</p>
                  </div>
                </div>
              </div>

              <div className="contact-social">
                <h4>Redes Sociais</h4>
                <div className="social-links">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                    </svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                    </svg>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M23.5 6.2c-.3-1-1-1.8-2-2.1-1.9-.5-9.5-.5-9.5-.5s-7.6 0-9.5.5c-1 .3-1.7 1.1-2 2.1-.5 1.9-.5 5.8-.5 5.8s0 3.9.5 5.8c.3 1 1 1.8 2 2.1 1.9.5 9.5.5 9.5.5s7.6 0 9.5-.5c1-.3 1.7-1.1 2-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.5v-8l8 4-8 4z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="contact-form-container"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="contact-form-card">
                <h3 className="form-title">Envie sua mensagem</h3>
                <p className="form-subtitle">Respondemos em até 2 horas úteis</p>

                <form className="form" onSubmit={handleFormSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Nome completo *" 
                        className="form-input" 
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="Email corporativo *" 
                        className="form-input" 
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <input 
                        type="text" 
                        name="company"
                        value={formData.company}
                        onChange={handleFormChange}
                        placeholder="Empresa" 
                        className="form-input" 
                      />
                    </div>
                    <div className="form-group">
                      <input 
                        type="text" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="Telefone *" 
                        className="form-input" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleFormChange}
                      className="form-select" 
                      required
                    >
                      <option value="" disabled>Selecione o assunto *</option>
                      <option value="vendas">Vendas e Demonstrações</option>
                      <option value="suporte">Suporte Técnico</option>
                      <option value="parceria">Parcerias</option>
                      <option value="imprensa">Imprensa</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows={4} 
                      placeholder="Descreva seu desafio ou necessidade... *"
                      className="form-textarea"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="form-submit">
                    <span>Enviar mensagem</span>
                    <Send size={18} />
                  </button>

                  <div className="form-footer">
                    <Shield size={14} />
                    <span>Seus dados estão protegidos pela LGPD</span>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;