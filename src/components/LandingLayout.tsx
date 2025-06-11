import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingFeedbackButton from '@/components/FloatingFeedbackButton';

interface LandingLayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
  showFeedback?: boolean;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({
  children,
  showNavbar = true,
  showFooter = true,
  showFeedback = true,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      {showNavbar && <Navbar />}

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      {showFooter && <Footer />}

      {/* Floating Feedback Button */}
      {showFeedback && <FloatingFeedbackButton />}
    </div>
  );
};

export default LandingLayout;
