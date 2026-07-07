import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import StickyApplyBar from './components/StickyApplyBar';
import EngagementTriggers from './components/EngagementTriggers';
import LeadFormModal from './components/LeadFormModal';
import { LeadFormProvider } from './components/LeadFormContext';

import Home from './pages/Home';
import LifeInGermany from './pages/LifeInGermany';
import About from './pages/About';
import FAQs from './pages/FAQs';
import GCBuddyPage from './pages/GCBuddyPage';
import Terms from './pages/Terms';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <LeadFormProvider>
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/life-in-germany" element={<LifeInGermany />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/gc-buddy" element={<GCBuddyPage />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <StickyApplyBar />
        <EngagementTriggers />
        <LeadFormModal />
      </LeadFormProvider>
    </HashRouter>
  );
}
