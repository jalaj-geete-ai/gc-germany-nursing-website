import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLeadForm } from './LeadFormContext';
import logo from '../assets/brand/logo.jpg';

const links = [
  { to: '/',                label: 'Home' },
  { to: '/life-in-germany', label: 'Life in Germany' },
  { to: '/gc-buddy',        label: 'GC Buddy' },
  { to: '/about',           label: 'About' },
  { to: '/faqs',            label: 'FAQs' },
];

export default function Navbar() {
  const { open } = useLeadForm();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <nav className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>
      <div className="navbar-inner">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Global Careers by Testbook" className="navbar-logo-img" />
        </Link>

        {/* Desktop tabs */}
        <div className="nav-tabs">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-tab${pathname === l.to ? ' nav-tab-active' : ''}`}
            >
              {l.label}
              {pathname === l.to && <span className="nav-tab-indicator" />}
            </Link>
          ))}
        </div>

        <div className="navbar-right">
          <button className="btn btn-primary navbar-cta" onClick={() => open('navbar')}>
            Apply Now
          </button>
          {/* Hamburger for mobile */}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-drawer">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`mobile-nav-link${pathname === l.to ? ' active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
          <button
            className="btn btn-primary mobile-nav-cta"
            onClick={() => { open('navbar'); setMenuOpen(false); }}
          >
            Apply Now →
          </button>
        </div>
      )}
    </nav>
  );
}
