// Login.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail,
  Lock,
  User,
  Briefcase,
  Building2,
  Phone,
  MapPin,
  Globe,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader,
  Sparkles,
  Shield,
  TrendingUp,
  Users,
  Rocket,
  Target,
  Zap,
  Clock,
  Calendar,
  Award,
  Star,
  Heart,
  Leaf,
  Cpu,
  Network,
  BarChart3,
  Package,
  Truck,
  Map,
  Navigation,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  LogIn,
  UserPlus,
  
} from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/images/Logo/logo.svg';
import heroBackground from '../../assets/images/Logo/logobannerhero.jpg';

// Componente de Slide de Dicas
const TipSlide = React.memo(({ type }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const tips = {
    employee: [
      {
        icon: <Rocket size={32} />,
        title: 'Gerencie suas entregas',
        description: 'Acompanhe todas as suas rotas e entregas em tempo real com nosso dashboard intuitivo.',
        color: '#1A4D3E'
      },
      {
        icon: <Map size={32} />,
        title: 'Rotas otimizadas',
        description: 'Receba as melhores rotas calculadas por IA, economizando tempo e combustível.',
        color: '#2C6B4F'
      },
      {
        icon: <BarChart3 size={32} />,
        title: 'Desempenho em tempo real',
        description: 'Monitore seu desempenho e receba feedback instantâneo sobre suas entregas.',
        color: '#3D8B6A'
      },
      {
        icon: <Award size={32} />,
        title: 'Reconhecimento',
        description: 'Acumule pontos e conquistas por seu desempenho e eficiência nas entregas.',
        color: '#5B8C7A'
      },
      {
        icon: <Users size={32} />,
        title: 'Comunicação direta',
        description: 'Converse com a central e receba atualizações importantes em tempo real.',
        color: '#6B9C87'
      }
    ],
    company: [
      {
        icon: <TrendingUp size={32} />,
        title: 'Gestão completa da frota',
        description: 'Controle toda a sua frota em um único lugar com relatórios detalhados e análises preditivas.',
        color: '#1A4D3E'
      },
      {
        icon: <Target size={32} />,
        title: 'Redução de custos',
        description: 'Economize até 35% em operações logísticas com otimização inteligente de rotas.',
        color: '#2C6B4F'
      },
      {
        icon: <Cpu size={32} />,
        title: 'IA generativa',
        description: 'Utilize nossa IA para prever demandas, evitar gargalos e otimizar operações.',
        color: '#3D8B6A'
      },
      {
        icon: <Shield size={32} />,
        title: 'Segurança e conformidade',
        description: 'Mantenha todos os dados protegidos com criptografia de ponta a ponta e conformidade LGPD.',
        color: '#5B8C7A'
      },
      {
        icon: <Globe size={32} />,
        title: 'Expansão nacional',
        description: 'Gerencie operações em múltiplas localidades com nossa plataforma escalável.',
        color: '#6B9C87'
      }
    ]
  };

  const currentTips = type === 'employee' ? tips.employee : tips.company;

  useEffect(() => {
        const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % currentTips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentTips.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % currentTips.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + currentTips.length) % currentTips.length);
  };

  return (
    <div className="tips-slider">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="tip-card"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="tip-icon" style={{ backgroundColor: currentTips[currentSlide].color }}>
            {currentTips[currentSlide].icon}
          </div>
          <h3 className="tip-title">{currentTips[currentSlide].title}</h3>
          <p className="tip-description">{currentTips[currentSlide].description}</p>
        </motion.div>
      </AnimatePresence>

      <div className="slider-controls">
        <button onClick={prevSlide} className="slider-button">
          <ChevronLeft size={20} />
        </button>
        <div className="slider-dots">
          {currentTips.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
        <button onClick={nextSlide} className="slider-button">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="slider-footer">
        <p className="tip-counter">
          {currentSlide + 1} / {currentTips.length}
        </p>
        <div className="tip-badge">
          {type === 'employee' ? 'Para Entregadores' : 'Para Empresas'}
        </div>
      </div>
    </div>
  );
});

// Componente de Força de Senha
const PasswordStrength = React.memo(({ password }) => {
  const getStrength = () => {
    let score = 0;
    if (!password) return 0;
    if (password.length >= 8) score++;
    if (password.match(/[a-z]/)) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^a-zA-Z0-9]/)) score++;
    return score;
  };

  const strength = getStrength();
  const strengthText = ['Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte'];
  const strengthColor = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#15803d'];

  if (!password) return null;

  return (
    <div className="password-strength">
      <div className="strength-bars">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="strength-bar"
            style={{
              backgroundColor: i < strength ? strengthColor[strength - 1] : 'var(--glass-border)',
              opacity: i < strength ? 1 : 0.3
            }}
          />
        ))}
      </div>
      <span className="strength-text" style={{ color: strengthColor[strength - 1] }}>
        {strengthText[strength - 1]}
      </span>
    </div>
  );
});

const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' ou 'register'
  const [userType, setUserType] = useState('employee'); // 'employee' ou 'company'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    companyName: '',
    cnpj: '',
    phone: '',
    cpf: '',
    registrationNumber: '',
    terms: false
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validação em tempo real
  useEffect(() => {
    if (mode === 'register') {
      validateForm();
    }
  }, [formData, mode]);

  const validateForm = () => {
    const newErrors = {};

    // Email
    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    // Senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mínimo de 6 caracteres';
    }

    // Confirmar senha (apenas no registro)
    if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'As senhas não coincidem';
      }

      // Campos específicos por tipo
      if (userType === 'employee') {
        if (!formData.name) newErrors.name = 'Nome é obrigatório';
        if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório';
      } else {
        if (!formData.companyName) newErrors.companyName = 'Nome da empresa é obrigatório';
        if (!formData.cnpj) newErrors.cnpj = 'CNPJ é obrigatório';
      }

      if (!formData.phone) newErrors.phone = 'Telefone é obrigatório';
      if (!formData.terms) newErrors.terms = 'Você precisa aceitar os termos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simular chamada API
    setTimeout(() => {
      setIsLoading(false);
      // Redirecionar para dashboard
      navigate('/dashboard');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simular login com Google
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const toggleMode = () => {
    setMode(prev => prev === 'login' ? 'register' : 'login');
    setErrors({});
    setTouched({});
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      companyName: '',
      cnpj: '',
      phone: '',
      cpf: '',
      registrationNumber: '',
      terms: false
    });
  };

  return (
    <div className="login-page">
      {/* Left Column - Form */}
      <div className="login-form-column">
        <div className="form-container">
          {/* Logo */}
          <Link to="/" className="form-logo">
            <img src={logo} alt="Transita.AI" />
          </Link>

          {/* Header */}
          <div className="form-header">
            <h1 className="form-title">
              {mode === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta'}
            </h1>
            <p className="form-subtitle">
              {mode === 'login' 
                ? 'Acesse sua conta para continuar'
                : 'Preencha os dados abaixo para começar'}
            </p>
          </div>

          {/* User Type Toggle (apenas no registro) */}
          {mode === 'register' && (
            <div className="user-type-toggle">
              <button
                className={`type-button ${userType === 'employee' ? 'active' : ''}`}
                onClick={() => setUserType('employee')}
              >
                <User size={18} />
                <span>Sou entregador</span>
              </button>
              <button
                className={`type-button ${userType === 'company' ? 'active' : ''}`}
                onClick={() => setUserType('company')}
              >
                <Building2 size={18} />
                <span>Sou empresa</span>
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="form">
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <div className={`input-wrapper ${touched.email && errors.email ? 'error' : ''}`}>
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('email')}
                  placeholder="seu@email.com"
                  className="form-input"
                />
              </div>
              {touched.email && errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            {/* Senha */}
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <div className={`input-wrapper ${touched.password && errors.password ? 'error' : ''}`}>
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('password')}
                  placeholder="••••••••"
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {touched.password && errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
              {mode === 'register' && (
                <PasswordStrength password={formData.password} />
              )}
            </div>

            {/* Confirmar Senha (apenas registro) */}
            {mode === 'register' && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar senha</label>
                <div className={`input-wrapper ${touched.confirmPassword && errors.confirmPassword ? 'error' : ''}`}>
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('confirmPassword')}
                    placeholder="••••••••"
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <span className="error-message">{errors.confirmPassword}</span>
                )}
              </div>
            )}

            {/* Campos específicos por tipo (apenas registro) */}
            {mode === 'register' && (
              <>
                {userType === 'employee' ? (
                  <>
                    {/* Nome Completo */}
                    <div className="form-group">
                      <label htmlFor="name">Nome completo</label>
                      <div className={`input-wrapper ${touched.name && errors.name ? 'error' : ''}`}>
                        <User size={18} className="input-icon" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('name')}
                          placeholder="Seu nome completo"
                          className="form-input"
                        />
                      </div>
                      {touched.name && errors.name && (
                        <span className="error-message">{errors.name}</span>
                      )}
                    </div>

                    {/* CPF */}
                    <div className="form-group">
                      <label htmlFor="cpf">CPF</label>
                      <div className={`input-wrapper ${touched.cpf && errors.cpf ? 'error' : ''}`}>
                        <User size={18} className="input-icon" />
                        <input
                          type="text"
                          id="cpf"
                          name="cpf"
                          value={formData.cpf}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('cpf')}
                          placeholder="000.000.000-00"
                          className="form-input"
                        />
                      </div>
                      {touched.cpf && errors.cpf && (
                        <span className="error-message">{errors.cpf}</span>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Nome da Empresa */}
                    <div className="form-group">
                      <label htmlFor="companyName">Nome da empresa</label>
                      <div className={`input-wrapper ${touched.companyName && errors.companyName ? 'error' : ''}`}>
                        <Building2 size={18} className="input-icon" />
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('companyName')}
                          placeholder="Razão social"
                          className="form-input"
                        />
                      </div>
                      {touched.companyName && errors.companyName && (
                        <span className="error-message">{errors.companyName}</span>
                      )}
                    </div>

                    {/* CNPJ */}
                    <div className="form-group">
                      <label htmlFor="cnpj">CNPJ</label>
                      <div className={`input-wrapper ${touched.cnpj && errors.cnpj ? 'error' : ''}`}>
                        <Building2 size={18} className="input-icon" />
                        <input
                          type="text"
                          id="cnpj"
                          name="cnpj"
                          value={formData.cnpj}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('cnpj')}
                          placeholder="00.000.000/0000-00"
                          className="form-input"
                        />
                      </div>
                      {touched.cnpj && errors.cnpj && (
                        <span className="error-message">{errors.cnpj}</span>
                      )}
                    </div>
                  </>
                )}

                {/* Telefone (comum para ambos) */}
                <div className="form-group">
                  <label htmlFor="phone">Telefone</label>
                  <div className={`input-wrapper ${touched.phone && errors.phone ? 'error' : ''}`}>
                    <Phone size={18} className="input-icon" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('phone')}
                      placeholder="(11) 99999-9999"
                      className="form-input"
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <span className="error-message">{errors.phone}</span>
                  )}
                </div>

                {/* Número de Registro (opcional para entregadores) */}
                {userType === 'employee' && (
                  <div className="form-group">
                    <label htmlFor="registrationNumber">Número de registro (opcional)</label>
                    <div className="input-wrapper">
                      <Award size={18} className="input-icon" />
                      <input
                        type="text"
                        id="registrationNumber"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleInputChange}
                        placeholder="Ex: 123456"
                        className="form-input"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Esqueci senha (apenas login) */}
            {mode === 'login' && (
              <div className="forgot-password">
                <Link to="/recuperar-senha">Esqueceu sua senha?</Link>
              </div>
            )}

            {/* Termos (apenas registro) */}
            {mode === 'register' && (
              <div className={`terms-group ${touched.terms && errors.terms ? 'error' : ''}`}>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('terms')}
                  />
                  <span className="checkbox-text">
                    Li e aceito os{' '}
                    <Link to="/termos">Termos de Uso</Link> e{' '}
                    <Link to="/privacidade">Política de Privacidade</Link>
                  </span>
                </label>
                {touched.terms && errors.terms && (
                  <span className="error-message">{errors.terms}</span>
                )}
              </div>
            )}

            {/* Botão de submit */}
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader size={18} className="spinner" />
              ) : (
                mode === 'login' ? <LogIn size={18} /> : <UserPlus size={18} />
              )}
              <span>
                {isLoading 
                  ? 'Processando...' 
                  : mode === 'login' 
                    ? 'Entrar' 
                    : 'Criar conta'
                }
              </span>
            </button>

            {/* Divider */}
            <div className="divider">
              <span>ou</span>
            </div>

            {/* Google Login */}
            <button
              type="button"
              className="google-button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <img 
                src="https://www.google.com/favicon.ico" 
                alt="Google" 
                className="google-icon"
              />
              <span>
                {mode === 'login' 
                  ? 'Continuar com Google' 
                  : 'Cadastrar com Google'
                }
              </span>
            </button>

            {/* Toggle between login/register */}
            <div className="toggle-mode">
              <span>
                {mode === 'login' 
                  ? 'Ainda não tem uma conta?' 
                  : 'Já tem uma conta?'
                }
              </span>
              <button
                type="button"
                onClick={toggleMode}
                className="toggle-button"
              >
                {mode === 'login' ? 'Cadastre-se' : 'Fazer login'}
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column - Tips Slider */}
      <div className="login-tips-column">
        <div className="tips-background">
          <img 
            src={heroBackground} 
            alt="Background" 
            className="tips-background-image"
          />
          <div className="tips-overlay"></div>
          <div className="tips-gradient"></div>
        </div>

        <div className="tips-content">
          <h2 className="tips-main-title">
            {userType === 'employee' 
              ? 'Para entregadores' 
              : 'Para empresas'
            }
          </h2>
          <p className="tips-main-description">
            {userType === 'employee'
              ? 'Tudo que você precisa para otimizar suas entregas e aumentar seus ganhos'
              : 'A plataforma completa para gerenciar sua frota e reduzir custos operacionais'
            }
          </p>

          <TipSlide type={userType} />

          
        </div>
      </div>
    </div>
  );
};

export default Login;