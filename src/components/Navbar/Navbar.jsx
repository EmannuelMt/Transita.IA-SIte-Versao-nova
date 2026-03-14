import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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

  // Search: results + history + simple DOM search
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('transita_search_history');
    if (saved) {
      try { setSearchHistory(JSON.parse(saved)); } catch { setSearchHistory([]); }
    }
  }, []);

  const saveHistoryToStorage = (hist) => {
    try { localStorage.setItem('transita_search_history', JSON.stringify(hist)); } catch {}
  };

  const addToHistory = (q) => {
    const normalized = (q || '').trim();
    if (!normalized) return;
    setSearchHistory(prev => {
      const next = [normalized, ...prev.filter(h => h.toLowerCase() !== normalized.toLowerCase())].slice(0, 20);
      saveHistoryToStorage(next);
      return next;
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
    try { localStorage.removeItem('transita_search_history'); } catch {}
  };

  const performSearch = (q) => {
    const query = (q || '').trim().toLowerCase();
    if (!query) { setSearchResults([]); return; }

    const nodes = Array.from(document.querySelectorAll('section, h1, h2, h3, h4, p, a, li'));
    const results = [];
    const seen = new Set();

    for (const el of nodes) {
      const text = (el.textContent || '').trim();
      if (!text) continue;
      const lower = text.toLowerCase();
      if (lower.includes(query)) {
        const section = el.closest('section');
        const sectionId = section ? section.id : '';
        const heading = section ? (section.querySelector('h2, h1, h3')?.textContent || '') : '';
        const key = (sectionId || heading || '').slice(0, 200) + '::' + text.slice(0, 200);
        if (seen.has(key)) continue;
        seen.add(key);

        results.push({
          title: heading || sectionId || text.slice(0, 40),
          snippet: text.slice(0, 200),
          anchor: sectionId ? `#${sectionId}` : '',
        });
        if (results.length >= 12) break;
      }
    }

    setSearchResults(results);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = (searchQuery || '').trim();
    if (!q) return;
    addToHistory(q);
    performSearch(q);
  };

  const handleResultClick = (result) => {
    setSearchOpen(false);
    // If result contains an anchor (section id), navigate to current path + anchor
    if (result && result.anchor) {
      const anchor = result.anchor.startsWith('#') ? result.anchor : `#${result.anchor}`;
      const targetPath = location.pathname.split('#')[0] + anchor;
      navigate(targetPath);
      // try to scroll to element after navigation/render
      const id = anchor.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 350);
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
                  onChange={(e) => {
                    const v = e.target.value;
                    setSearchQuery(v);
                    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
                    searchTimeoutRef.current = setTimeout(() => performSearch(v), 300);
                  }}
                  className="search-input"
                />
                <button type="button" onClick={toggleSearch} className="search-close">
                  <X size={20} />
                </button>

                <div className="search-panel">
                  {searchQuery.trim() === '' ? (
                    <div className="search-history">
                      <div className="search-history-header">
                        <strong>Histórico de pesquisa</strong>
                        {searchHistory.length > 0 && (
                          <button className="clear-history" onClick={(ev) => { ev.preventDefault(); clearHistory(); }}>Limpar</button>
                        )}
                      </div>
                      {searchHistory.length === 0 ? (
                        <div className="search-empty">Nenhuma pesquisa recente</div>
                      ) : (
                        <ul>
                          {searchHistory.map((h, i) => (
                            <li key={i}>
                              <button className="history-item" onClick={(ev) => { ev.preventDefault(); setSearchQuery(h); performSearch(h); addToHistory(h); }}>
                                {h}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <div className="search-results">
                      {searchResults.length === 0 ? (
                        <div className="search-empty">Nenhum resultado encontrado</div>
                      ) : (
                        <ul>
                          {searchResults.map((r, i) => (
                            <li key={i} className="search-result-item">
                              {r.anchor ? (
                                <button className="history-item" onClick={(ev) => { ev.preventDefault(); handleResultClick(r); }}>
                                  <strong>{r.title}</strong>
                                  <div className="search-snippet">{r.snippet}</div>
                                </button>
                              ) : (
                                <div>
                                  <strong>{r.title}</strong>
                                  <div className="search-snippet">{r.snippet}</div>
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
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