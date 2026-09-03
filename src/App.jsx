import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import IndependenceDayBanner from './components/IndependenceDayBanner';
import StickyApplyBar from './components/StickyApplyBar';
import EngagementTriggers from './components/EngagementTriggers';
import TimedLeadPopup from './components/TimedLeadPopup';
import WhatsAppButton from './components/WhatsAppButton';
import LeadFormModal from './components/LeadFormModal';
import { LeadFormProvider } from './components/LeadFormContext';
import CookieConsent from './components/CookieConsent';
import { initAnalyticsFromConsent, trackPageView } from './lib/analytics';
import { captureAttributionOnce } from './lib/leadMeta';

import Home from './pages/Home';
import LifeInGermany from './pages/LifeInGermany';
import About from './pages/About';
import FAQs from './pages/FAQs';
import GCBuddyPage from './pages/GCBuddyPage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function ScrollToTop() {
  const { pathname } = useLocation();
  // If the visitor already accepted marketing cookies, boot analytics once.
  // Also snapshot UTM / landing-page attribution before any client-side nav.
  useEffect(() => { initAnalyticsFromConsent(); captureAttributionOnce(); }, []);
  useEffect(() => { window.scrollTo(0, 0); trackPageView(pathname); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <LeadFormProvider>
        <ScrollToTop />
        <IndependenceDayBanner />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/life-in-germany" element={<LifeInGermany />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/gc-buddy" element={<GCBuddyPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </main>
        <Footer />

        <StickyApplyBar />
        <WhatsAppButton />
        <EngagementTriggers />
        <TimedLeadPopup />
        <LeadFormModal />
        <CookieConsent />
      </LeadFormProvider>
    </HashRouter>
  );
}
