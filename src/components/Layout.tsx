import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingFeedbackButton from './FloatingFeedbackButton';
import GlobalPipelineBackground from './landing/GlobalPipelineBackground';
import { useLocation } from 'react-router-dom';
import {
  SafeAnimatePresence,
  MotionDiv,
  MotionSection,
  MotionH1,
  MotionH2,
  MotionP,
  MotionButton,
  MotionLi,
  MotionTr,
} from '@/lib/motion-wrapper';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isLandingPage, setIsLandingPage] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if current page is landing page
  useEffect(() => {
    setIsLandingPage(location.pathname === '/' || location.pathname === '/index.html');
  }, [location]);

  // Add scroll listener for transparent navbar effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if we should use a more subtle gradient for content-heavy pages
  const isContentHeavyPage = ['/studio', '/documentation', '/settings'].includes(location.pathname);

  // Check if current page is workflow builder (full-screen mode)
  const isWorkflowBuilder = location.pathname === '/workflow-builder';

  // If workflow builder, render without layout elements
  if (isWorkflowBuilder) {
    return <div className="h-screen w-screen overflow-hidden">{children}</div>;
  }

  return (
    <div className="relative min-h-screen">
      {/* Global Pipeline Background */}
      <GlobalPipelineBackground />

      <div className="relative flex flex-col min-h-screen">
        {/* Dynamic Navbar - transparent for landing page, solid for other pages */}
        <div
          className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
            isLandingPage && !isScrolled
              ? 'bg-transparent backdrop-blur-0'
              : 'bg-background/80 backdrop-blur-md shadow-sm'
          }`}
        >
          <Navbar />
        </div>

        {/* Page Content */}
        <main className={`flex-grow ${isLandingPage ? 'pt-0' : 'pt-16'}`}>
          <MotionDiv
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {children}
          </MotionDiv>
        </main>

        <Footer />

        {/* Floating Feedback Button */}
        <FloatingFeedbackButton />
      </div>
    </div>
  );
};

export default Layout;
