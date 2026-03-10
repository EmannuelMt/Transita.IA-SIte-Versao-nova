// Contact.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Star,
  Users,
  Globe,
  Shield,
  Heart,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  ExternalLink,
  Calendar,
  User,
  FileText,
  Download,
  Upload,
  Image,
  Paperclip,
  Smile,
  ThumbsUp,
  ThumbsDown,
  Search,
  Filter,
  MailOpen,
  MessageCircle,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  MessageSquareText,
  LifeBuoy,
  BookOpen,
  Video,
  Mic,
  Camera,
  Settings,
  CreditCard,
  Truck,
  Package,
  TrendingUp,
  Award,
  Target,
  Zap,
  Cpu,
  Network,
  Globe2,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Contato.css';
import logo from '../../assets/images/Logo/logo.svg';
import heroBackground from '../../assets/images/Logo/logobannerhero.jpg';

// Componente de Partículas
const Particles = React.memo(({ count = 30 }) => {
  const particles = React.useMemo(() => 
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
    <div className="contact-particles">
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
            repeat: 0,
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

// Componente de FAQ Item
const FAQItem = React.memo(({ faq, index, isOpen, onToggle }) => {
  return (
    <motion.div 
      className={`faq-item ${isOpen ? 'open' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <button 
        className="faq-question"
        onClick={() => onToggle(index)}
      >
        <div className="faq-question-content">
          <span className="faq-icon">{faq.icon}</span>
          <h3>{faq.question}</h3>
        </div>
        <motion.div 
          className="faq-toggle"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{faq.answer}</p>
            {faq.link && (
              <Link to={faq.link} className="faq-link">
                Saiba mais
                <ArrowRight size={14} />
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

// Componente de Canal de Suporte
const SupportChannel = React.memo(({ channel, index }) => (
  <motion.a
    href={channel.link}
    className="support-channel-card"
    target={channel.external ? '_blank' : undefined}
    rel={channel.external ? 'noopener noreferrer' : undefined}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5 }}
  >
    <div className="channel-icon-wrapper" style={{ backgroundColor: channel.bgColor }}>
      {channel.icon}
    </div>
    <div className="channel-info">
      <h3>{channel.title}</h3>
      <p>{channel.description}</p>
      <span className="channel-response">
        <Clock size={12} />
        {channel.responseTime}
      </span>
    </div>
    <div className="channel-arrow">
      <ArrowRight size={16} />
    </div>
  </motion.a>
));

const Contact = () => {
  const { scrollY } = useScroll();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    department: 'geral'
  });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState(null);
  const [copied, setCopied] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('geral');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const heroRef = useRef(null);
  const contactRef = useRef(null);
  const supportRef = useRef(null);
  const faqRef = useRef(null);

  // Animações baseadas no scroll
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.95]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.98]);
  const heroBlur = useTransform(scrollY, [0, 300], [0, 4]);

  // Dados de contato
  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: 'Telefone',
      description: 'Disponível 24/7 para emergências',
      items: [
        { label: 'Comercial', value: '+55 (11) 3333-4444', link: 'tel:+551133334444' },
        { label: 'Suporte', value: '+55 (11) 3333-5555', link: 'tel:+551133335555' },
        { label: 'WhatsApp', value: '+55 (11) 99999-9999', link: 'https://wa.me/5511999999999' }
      ]
    },
    {
      icon: <Mail size={24} />,
      title: 'E-mail',
      description: 'Respondemos em até 2 horas',
      items: [
        { label: 'Geral', value: 'contato@transita.ai', link: 'mailto:contato@transita.ai' },
        { label: 'Suporte', value: 'suporte@transita.ai', link: 'mailto:suporte@transita.ai' },
        { label: 'Vendas', value: 'vendas@transita.ai', link: 'mailto:vendas@transita.ai' }
      ]
    },
    {
      icon: <MapPin size={24} />,
      title: 'Endereços',
      description: 'Escritórios no Brasil',
      items: [
        { label: 'São Paulo', value: 'Av. Paulista, 1000 - Bela Vista' },
        { label: 'Goiânia', value: 'Av. Brasil, 500 - Centro' },
        { label: 'Brasília', value: 'SBS Quadra 2 - Asa Sul' }
      ]
    },
    {
      icon: <Clock size={24} />,
      title: 'Horário de Atendimento',
      description: 'Equipe disponível nos seguintes horários',
      items: [
        { label: 'Segunda - Sexta', value: '08:00 - 20:00' },
        { label: 'Sábado', value: '09:00 - 13:00' },
        { label: 'Domingo', value: 'Fechado (urgências via WhatsApp)' }
      ]
    }
  ];

  // Departamentos para o formulário
  const departments = [
    { id: 'geral', label: 'Departamento Geral', description: 'Assuntos gerais e informações' },
    { id: 'vendas', label: 'Vendas', description: 'Orçamentos e planos' },
    { id: 'suporte', label: 'Suporte Técnico', description: 'Ajuda com a plataforma' },
    { id: 'financeiro', label: 'Financeiro', description: 'Faturas e pagamentos' },
    { id: 'parcerias', label: 'Parcerias', description: 'Tornar-se um parceiro' },
    { id: 'imprensa', label: 'Imprensa', description: 'Assessoria de imprensa' },
    { id: 'rh', label: 'Recursos Humanos', description: 'Carreiras e talentos' },
    { id: 'ouvidoria', label: 'Ouvidoria', description: 'Reclamações e elogios' }
  ];

  // Canais de suporte
  const supportChannels = [
    {
      icon: <MessageCircle size={24} />,
      title: 'Chat Ao Vivo',
      description: 'Converse com um especialista agora mesmo',
      responseTime: 'Resposta imediata',
      link: '/chat',
      bgColor: '#1A4D3E',
      external: false
    },
    {
      icon: <PhoneCall size={24} />,
      title: 'Central Telefônica',
      description: 'Ligue para nossa central de atendimento',
      responseTime: 'Disponível 24/7',
      link: 'tel:+551133334444',
      bgColor: '#2C6B4F',
      external: true
    },
    {
      icon: <Mail size={24} />,
      title: 'E-mail Prioritário',
      description: 'suporte@transita.ai',
      responseTime: 'Resposta em até 1 hora',
      link: 'mailto:suporte@transita.ai',
      bgColor: '#3D8B6A',
      external: true
    },
    {
      icon: <MessageSquare size={24} />,
      title: 'WhatsApp',
      description: 'Atendimento via WhatsApp Business',
      responseTime: 'Resposta em minutos',
      link: 'https://wa.me/5511999999999',
      bgColor: '#5B8C7A',
      external: true
    },
    {
      icon: <LifeBuoy size={24} />,
      title: 'Base de Conhecimento',
      description: 'Artigos, tutoriais e documentação',
      responseTime: 'Autoatendimento 24/7',
      link: '/ajuda',
      bgColor: '#6B9C87',
      external: false
    },
    {
      icon: <Headphones size={24} />,
      title: 'Suporte Técnico',
      description: 'Ajuda especializada com a plataforma',
      responseTime: 'Reserva técnica disponível',
      link: '/suporte-tecnico',
      bgColor: '#8ABFA3',
      external: false
    }
  ];

  // FAQ
  const faqs = {
    geral: [
      {
        icon: <HelpCircle size={20} />,
        question: 'Como posso contratar os serviços da Transita.AI?',
        answer: 'Você pode contratar nossos serviços diretamente pelo site, através da página de planos, ou entrando em contato com nosso time comercial pelo e-mail vendas@transita.ai. Oferecemos testes gratuitos para que você possa conhecer a plataforma antes de assinar.',
        link: '/planos'
      },
      {
        icon: <CreditCard size={20} />,
        question: 'Quais são as formas de pagamento aceitas?',
        answer: 'Aceitamos cartões de crédito (Visa, Mastercard, Elo, American Express), boleto bancário, PIX e transferência bancária. Para planos anuais, oferecemos condições especiais de pagamento.'
      },
      {
        icon: <Shield size={20} />,
        question: 'Como funciona o teste gratuito?',
        answer: 'Oferecemos 14 dias de teste gratuito para todos os planos, sem necessidade de cartão de crédito. Durante o período, você terá acesso a todas as funcionalidades do plano escolhido e suporte prioritário.'
      },
      {
        icon: <Users size={20} />,
        question: 'Posso mudar de plano depois?',
        answer: 'Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. O valor é ajustado proporcionalmente aos dias restantes do ciclo de faturamento atual.'
      }
    ],
    suporte: [
      {
        icon: <Headphones size={20} />,
        question: 'Como entro em contato com o suporte técnico?',
        answer: 'Você pode entrar em contato com nosso suporte técnico através do chat ao vivo no site, e-mail suporte@transita.ai, WhatsApp (11) 99999-9999 ou telefone (11) 3333-5555. Atendemos 24/7 para emergências.'
      },
      {
        icon: <Clock size={20} />,
        question: 'Qual é o tempo médio de resposta do suporte?',
        answer: 'Para chamados abertos via chat, a resposta é imediata. Para e-mails, respondemos em até 2 horas durante o horário comercial. Em casos de emergência, o tempo de resposta é de no máximo 30 minutos.'
      },
      {
        icon: <FileText size={20} />,
        question: 'Onde encontro documentação da API?',
        answer: 'Nossa documentação completa da API está disponível no portal do desenvolvedor. Você encontrará guias de integração, exemplos de código, referência de endpoints e muito mais.',
        link: '/api-docs'
      }
    ],
    comercial: [
      {
        icon: <Award size={20} />,
        question: 'Existe desconto para planos anuais?',
        answer: 'Sim, oferecemos 15% de desconto em todos os planos anuais. Além disso, para empresas que contratam múltiplas licenças, temos condições especiais. Entre em contato com nosso time comercial para mais informações.'
      },
      {
        icon: <Users size={20} />,
        question: 'Como funciona o plano Enterprise?',
        answer: 'O plano Enterprise é personalizado para grandes empresas que necessitam de soluções customizadas, SLA garantido, gerente de conta dedicado e suporte prioritário. Entre em contato para uma proposta personalizada.'
      }
    ],
    tecnico: [
      {
        icon: <Cpu size={20} />,
        question: 'Quais são os requisitos técnicos para usar a plataforma?',
        answer: 'Nossa plataforma é 100% web, funcionando em qualquer navegador moderno. Para integrações via API, fornecemos SDKs em diversas linguagens e documentação completa.'
      },
      {
        icon: <ShieldCheck size={20} />,
        question: 'Como vocês garantem a segurança dos dados?',
        answer: 'Utilizamos criptografia de ponta a ponta, certificação SSL, conformidade com LGPD e realizamos backups diários. Todos os dados são armazenados em servidores no Brasil.'
      }
    ]
  };

  // Validação do formulário
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'E-mail inválido';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Telefone é obrigatório';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Mensagem é obrigatória';
    }
    
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpa o erro do campo quando o usuário começa a digitar
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB max
      setSelectedFile(file);
    } else {
      alert('Arquivo muito grande. Tamanho máximo: 5MB');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setFormStatus({
        type: 'error',
        message: 'Por favor, preencha todos os campos obrigatórios corretamente.'
      });
      return;
    }

    setIsSubmitting(true);
    setFormStatus(null);

    // Simular envio
    setTimeout(() => {
      setFormStatus({
        type: 'success',
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        department: 'geral'
      });
      setSelectedFile(null);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Banner */}
      <section ref={heroRef} className="contact-hero" id="hero">
        <div className="hero-background">
          <img src={heroBackground} alt="Hero Background" className="hero-image" />
          <div className="hero-overlay"></div>
          <div className="hero-gradient"></div>
          <Particles count={40} />
        </div>

        <motion.div 
          className="hero-content"
          style={{ opacity: heroOpacity, scale: heroScale, filter: `blur(${heroBlur}px)` }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-badge"
          >
            <MessageSquare size={16} />
            <span>Fale Conosco</span>
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Estamos aqui para <span className="title-gradient">ajudar</span>
          </motion.h1>

          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Nossa equipe está pronta para atender você. Escolha o canal de atendimento 
            que preferir e receba suporte especializado.
          </motion.p>

          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button 
              className="btn-primary"
              onClick={() => scrollToSection('contato')}
            >
              <span>Enviar mensagem</span>
              <Send size={20} />
            </button>
            <button 
              className="btn-secondary"
              onClick={() => scrollToSection('suporte')}
            >
              <Headphones size={18} />
              <span>Canais de suporte</span>
            </button>
          </motion.div>

          <motion.div 
            className="hero-scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={() => scrollToSection('contato')}
          >
            <span>Conheça nossos canais</span>
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-logo"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <img src={logo} alt="Transita.AI" className="logo-white" />
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info-cards">
        <div className="container">
          <div className="info-cards-grid">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="info-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="info-card-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                <p className="info-description">{info.description}</p>
                <div className="info-items">
                  {info.items.map((item, idx) => (
                    <div key={idx} className="info-item">
                      <span className="info-label">{item.label}:</span>
                      {item.link ? (
                        <a href={item.link} className="info-value">
                          {item.value}
                        </a>
                      ) : (
                        <span className="info-value">{item.value}</span>
                      )}
                      {item.link?.startsWith('mailto:') && (
                        <button 
                          className="copy-button"
                          onClick={() => handleCopy(item.value, `email-${index}-${idx}`)}
                          title="Copiar e-mail"
                        >
                          {copied === `email-${index}-${idx}` ? (
                            <Check size={14} />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section" id="contato" ref={contactRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <Mail size={16} />
              Fale Conosco
            </span>
            <h2 className="section-title">
              Envie sua <span className="title-gradient">mensagem</span>
            </h2>
            <p className="section-description">
              Preencha o formulário abaixo que entraremos em contato o mais breve possível
            </p>
          </motion.div>

          <div className="contact-form-wrapper">
            {/* Departamentos Tabs */}
            <div className="departments-tabs">
              {departments.slice(0, 6).map((dept) => (
                <button
                  key={dept.id}
                  className={`tab-button ${activeTab === dept.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(dept.id)}
                >
                  {dept.label}
                </button>
              ))}
            </div>

            {/* Formulário */}
            <motion.form 
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nome completo *</label>
                  <div className="input-wrapper">
                    <User size={16} className="input-icon" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-input ${formErrors.name ? 'error' : ''}`}
                      placeholder="Seu nome completo"
                    />
                  </div>
                  {formErrors.name && (
                    <span className="error-message">{formErrors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-mail *</label>
                  <div className="input-wrapper">
                    <Mail size={16} className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${formErrors.email ? 'error' : ''}`}
                      placeholder="seu@email.com"
                    />
                  </div>
                  {formErrors.email && (
                    <span className="error-message">{formErrors.email}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Telefone *</label>
                  <div className="input-wrapper">
                    <Phone size={16} className="input-icon" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`form-input ${formErrors.phone ? 'error' : ''}`}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  {formErrors.phone && (
                    <span className="error-message">{formErrors.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="company">Empresa</label>
                  <div className="input-wrapper">
                    <Building2 size={16} className="input-icon" />
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Nome da sua empresa"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="department">Departamento</label>
                <div className="select-wrapper">
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>
                        {dept.label} - {dept.description}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="select-arrow" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Assunto</label>
                <div className="input-wrapper">
                  <MessageSquare size={16} className="input-icon" />
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Assunto da mensagem"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensagem *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`form-textarea ${formErrors.message ? 'error' : ''}`}
                  rows={5}
                  placeholder="Descreva sua dúvida, sugestão ou solicitação..."
                ></textarea>
                {formErrors.message && (
                  <span className="error-message">{formErrors.message}</span>
                )}
              </div>

              <div className="form-group file-group">
                <label htmlFor="file" className="file-label">
                  <Paperclip size={16} />
                  <span>Anexar arquivo (opcional, max. 5MB)</span>
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  className="file-input"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                />
                {selectedFile && (
                  <div className="selected-file">
                    <FileText size={14} />
                    <span>{selectedFile.name}</span>
                    <button 
                      type="button" 
                      onClick={() => setSelectedFile(null)}
                      className="remove-file"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              <AnimatePresence>
                {formStatus && (
                  <motion.div 
                    className={`form-status ${formStatus.type}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {formStatus.type === 'success' ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <AlertCircle size={18} />
                    )}
                    <span>{formStatus.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                type="submit" 
                className="form-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Enviar mensagem</span>
                  </>
                )}
              </button>

              <p className="form-disclaimer">
                Ao enviar, você concorda com nossa <Link to="/privacidade">Política de Privacidade</Link>.
                Seus dados estão protegidos pela LGPD.
              </p>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Support Channels Section */}
      <section className="support-channels-section" id="suporte" ref={supportRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <Headphones size={16} />
              Canais de Suporte
            </span>
            <h2 className="section-title">
              Escolha o <span className="title-gradient">canal</span> que preferir
            </h2>
            <p className="section-description">
              Oferecemos múltiplos canais para garantir que você receba o suporte que precisa
            </p>
          </motion.div>

          <div className="support-channels-grid">
            {supportChannels.map((channel, index) => (
              <SupportChannel key={index} channel={channel} index={index} />
            ))}
          </div>

          {/* Status do Suporte */}
          <motion.div 
            className="support-status"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="status-badge online">
              <span className="status-dot"></span>
              <span>Suporte online agora</span>
            </div>
            <p className="status-text">
              Temos 5 especialistas disponíveis para atendimento imediato.
              Tempo médio de espera: <strong>menos de 2 minutos</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" id="faq" ref={faqRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <HelpCircle size={16} />
              FAQ
            </span>
            <h2 className="section-title">
              Perguntas <span className="title-gradient">frequentes</span>
            </h2>
            <p className="section-description">
              Encontre respostas para as dúvidas mais comuns sobre nossos serviços
            </p>
          </motion.div>

          {/* FAQ Categories */}
          <div className="faq-categories">
            {Object.keys(faqs).map((category) => (
              <button
                key={category}
                className={`category-button ${activeTab === category ? 'active' : ''}`}
                onClick={() => setActiveTab(category)}
              >
                {category === 'geral' && 'Geral'}
                {category === 'suporte' && 'Suporte'}
                {category === 'comercial' && 'Comercial'}
                {category === 'tecnico' && 'Técnico'}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="faq-list">
            {faqs[activeTab]?.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openFaqIndex === index}
                onToggle={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              />
            ))}
          </div>

          {/* FAQ Contact */}
          <motion.div 
            className="faq-contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="faq-contact-icon">
              <HelpCircle size={24} />
            </div>
            <div className="faq-contact-content">
              <h3>Não encontrou o que procurava?</h3>
              <p>Nossa equipe está pronta para ajudar com qualquer dúvida específica.</p>
            </div>
            <Link to="/suporte" className="faq-contact-button">
              <span>Falar com suporte</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <MapPin size={16} />
              Nossas Localizações
            </span>
            <h2 className="section-title">
              Estamos <span className="title-gradient">presentes</span> em todo Brasil
            </h2>
          </motion.div>

          <div className="map-container">
            {/* Simulação de mapa - substituir por mapa real */}
            <div className="map-placeholder">
              <div className="map-pin sp">
                <div className="pin-dot"></div>
                <span>São Paulo</span>
              </div>
              <div className="map-pin go">
                <div className="pin-dot"></div>
                <span>Goiânia</span>
              </div>
              <div className="map-pin df">
                <div className="pin-dot"></div>
                <span>Brasília</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="final-cta">
        <div className="container">
          <motion.div
            className="cta-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="cta-content">
              <h2 className="cta-title">
                Pronto para <span className="title-gradient">transformar</span> sua logística?
              </h2>
              <p className="cta-description">
                Fale com um especialista e descubra como a Transita.AI pode ajudar sua empresa.
              </p>
              <div className="cta-buttons">
                <Link to="/demo" className="cta-button-primary">
                  <span>Solicitar demonstração</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/planos" className="cta-button-secondary">
                  <span>Conhecer planos</span>
                  <ExternalLink size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;