import { Link } from 'react-router-dom';
import logo from '../assets/brand/logo.jpg';
import Icon from './Icon';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <img src={logo} alt="Global Careers by Testbook" className="footer-logo-img" />
          <p className="footer-tag">
            Helping Indian nurses build trusted, well-paid careers in Germany — with language
            training, visa support, and a soft landing on the other side.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/life-in-germany">Life in Germany</Link>
          <Link to="/about">About Us</Link>
          <Link to="/faqs">FAQs</Link>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Get in touch</h4>
          <a href="mailto:support.gc@testbook.com">support.gc@testbook.com</a>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Follow</h4>
          <a href="https://instagram.com/globalcareersbytestbook" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/company/testbook" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://www.youtube.com/@testbook" target="_blank" rel="noreferrer">YouTube</a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Global Careers by Testbook. All rights reserved.</span>
        <div className="footer-compliance">
          <span className="compliance-badge"><Icon name="lock" size={15} /> DPDP Act 2023 Compliant</span>
          <span className="compliance-badge"><Icon name="globe" size={15} /> GDPR Compliant</span>
        </div>
      </div>
    </footer>
  );
}
