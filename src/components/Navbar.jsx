import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLeadForm } from './LeadFormContext';
import logo from '../assets/brand/logo-wordmark.jpg';

const links = [
  { to: '/', label: 'Home' },
  { to: '/life-in-germany', label: 'Life in Germany' },
  { to: '/gc-buddy', label: 'GC Buddy' },
  { to: '/faqs', label: 'FAQs' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useLeadForm();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Global Careers by Testbook" className="navbar-logo-img" />
        </Link>

        <nav className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <button className="btn btn-primary nav-cta" onClick={() => { open('navbar'); setMenuOpen(false); }}>
            Apply Now
          </button>
        </nav>

        <button className="navbar-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
