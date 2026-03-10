import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Zap, 
  LayoutDashboard, 
  Info, 
  MessageSquare,
  Sparkles,
  ChevronRight,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  Bell,
  Search,
  Sun,
  Moon,
  ChevronDown,
  Briefcase,
  Users,
  Award,
  TrendingUp,
  Globe,
  Shield,
  Code,
  BookOpen,
  Headphones,
  FileText,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  LogIn
} from 'lucide-react';
import './Navbar.css';
import logo from '../../assets/images/Logo/logo.svg';

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simular estado de login
  const [theme, setTheme] = useState('dark'); // 'light' ou 'dark'
  
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fecha o menu mobile quando muda de rota
    setIsMobileMenuOpen(false);
    setShowDropdown(null);
  }, [location]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('light');
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => document.getElementById('search-input')?.focus(), 100);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implementar lógica de busca
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { 
      name: 'Início', 
      path: '/', 
      icon: Home, 
    },
    { 
      name: 'Planos', 
      path: '/planos', 
      icon: Zap, 
    },
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: LayoutDashboard, 
      badge: 'Novo'
    },
    { 
      name: 'Sobre', 
      path: '/about', 
      icon: Info, 
    },
    { 
      name: 'Contato', 
      path: '/contato', 
      icon: MessageSquare, 
    },
  ];

  const userLinks = [
    { name: 'Perfil', path: '/perfil', icon: User },
    { name: 'Configurações', path: '/configuracoes', icon: Settings },
    { name: 'Notificações', path: '/notificacoes', icon: Bell, badge: 3 },
  ];

  // Animações
  const navItemVariants = {
    hover: { 
      y: -2,
      transition: { type: 'spring', stiffness: 400, damping: 17 }
    }
  };

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 500,
        damping: 30,
        staggerChildren: 0.05
      }
    }
  };

  const dropdownItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${theme}`}>
        <div className="navbar-container">
          
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-container">
              <img src={logo} alt="Transita.AI" className="navbar-logo-img" />
            </div>
            <span className="logo-text">Transita<span className="logo-accent">.AI</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links-desktop">
            {navLinks.map((link, index) => (
              <div 
                key={link.name}
                className="nav-item-wrapper"
                onMouseEnter={() => setShowDropdown(index)}
                onMouseLeave={() => setShowDropdown(null)}
              >
                <Link
                  to={link.path}
                  className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <link.icon className="nav-icon" size={18} />
                  <span className="nav-text">{link.name}</span>
                  {link.badge && <span className="nav-badge">{link.badge}</span>}
                  {link.dropdown && <ChevronDown size={14} className="dropdown-arrow" />}
                </Link>

                {/* Dropdown Menu */}
                {link.dropdown && showDropdown === index && (
                  <motion.div 
                    className="dropdown-menu"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <div className="dropdown-header">
                      <link.icon size={16} />
                      <span>{link.name}</span>
                    </div>
                    {link.dropdown.map((item) => (
                      <motion.div key={item.name} variants={dropdownItemVariants}>
                        <Link to={item.path} className="dropdown-item">
                          {item.icon && <item.icon size={14} />}
                          <span>{item.name}</span>
                          {item.badge && <span className="dropdown-badge">{item.badge}</span>}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="nav-right">
            {/* Search Button */}
            <button 
              className="nav-icon-button search-toggle"
              onClick={toggleSearch}
              aria-label="Buscar"
            >
              <Search size={18} />
            </button>

            {/* Theme Toggle */}
            <button 
              className="nav-icon-button theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* User Menu */}
            {isLoggedIn ? (
              <div className="user-menu-wrapper">
                <button 
                  className="user-menu-button"
                  onClick={() => setShowDropdown('user')}
                >
                  <img 
                    src="https://ui-avatars.com/api/?name=Usuario&background=1A4D3E&color=ffffff" 
                    alt="User"
                    className="user-avatar"
                  />
                  <span className="user-name">Usuário</span>
                </button>

                {showDropdown === 'user' && (
                  <motion.div 
                    className="dropdown-menu user-dropdown"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {userLinks.map((item) => (
                      <Link key={item.name} to={item.path} className="dropdown-item">
                        <item.icon size={14} />
                        <span>{item.name}</span>
                        {item.badge && <span className="dropdown-badge">{item.badge}</span>}
                      </Link>
                    ))}
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout">
                      <LogOut size={14} />
                      <span>Sair</span>
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link to="/auth" className="login-button">
                <LogIn size={16} />
                <span>Entrar</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div 
              className="search-overlay"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <form onSubmit={handleSearchSubmit} className="search-form">
                <Search size={20} className="search-icon" />
                <input
                  id="search-input"
                  type="text"
                  placeholder="Buscar na Transita.AI..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="button" onClick={toggleSearch} className="search-close">
                  <X size={20} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="mobile-menu-header">
              <Link to="/" className="mobile-logo" onClick={() => setIsMobileMenuOpen(false)}>
                <img src={logo} alt="Transita.AI" className="mobile-logo-img" />
                <span>Transita.AI</span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="mobile-close">
                <X size={24} />
              </button>
            </div>

            <div className="mobile-menu-content">
              {navLinks.map((link) => (
                <div key={link.name} className="mobile-section">
                  <Link
                    to={link.path}
                    className={`mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <link.icon size={18} />
                    <span>{link.name}</span>
                    {link.badge && <span className="mobile-badge">{link.badge}</span>}
                    <ChevronRight size={16} className="mobile-arrow" />
                  </Link>

                  {link.dropdown && (
                    <div className="mobile-submenu">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="mobile-sub-link"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.icon && <item.icon size={14} />}
                          <span>{item.name}</span>
                          {item.badge && <span className="mobile-badge small">{item.badge}</span>}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {!isLoggedIn && (
                <Link to="/auth" className="mobile-login" onClick={() => setIsMobileMenuOpen(false)}>
                  <LogIn size={18} />
                  <span>Entrar na Plataforma</span>
                </Link>
              )}
            </div>

            <div className="mobile-menu-footer">
              <button onClick={toggleTheme} className="mobile-theme">
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                <span>{theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay para mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;