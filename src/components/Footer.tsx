import { Link, useNavigate } from 'react-router-dom';
import {
  MotionDiv,
  MotionSection,
  MotionH1,
  MotionH2,
  MotionP,
  MotionButton,
  MotionLi,
  MotionTr,
  MotionFooter,
  MotionA,
} from '@/lib/motion-wrapper';

import { Layers, Github, Twitter, MessageCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

import { cn } from '@/lib/utils';

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <MotionLi whileHover={{ y: -2, color: 'hsl(var(--primary))' }} transition={{ duration: 0.2 }}>
    <Link to={to} className="hover:text-primary transition-colors duration-200">
      {children}
    </Link>
  </MotionLi>
);

const SocialIconLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) => (
  <MotionA
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--button-primary))]/10 to-[hsl(var(--nav-secondary))]/10 border border-[hsl(var(--button-primary))]/20 hover:border-[hsl(var(--button-primary))]/40 text-[hsl(var(--nav-foreground))] hover:text-[hsl(var(--button-primary))] transition-all duration-300 hover:shadow-lg hover:shadow-[hsl(var(--button-primary))]/25"
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="w-5 h-5" />
  </MotionA>
);

const Footer = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Smart logo navigation based on authentication status
  const handleLogoClick = () => {
    if (isAuthenticated) {
      navigate('/account');
    } else {
      navigate('/');
    }
  };

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { to: '/', label: 'Features' },
        { to: '/templates', label: 'Templates' },
        { to: '/pricing', label: 'Pricing' },
        { to: '/my-agents', label: 'My Agents' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { to: '/documentation', label: 'Documentation' },
        { to: '/tutorials', label: 'Tutorials' }, // Assuming /tutorials exists or will be created
        { to: '/community', label: 'Community' }, // Assuming /community exists or will be created
      ],
    },
    {
      title: 'Company',
      links: [
        { to: '/about', label: 'About Us' }, // Assuming /about exists
        { to: '/contact', label: 'Contact' }, // Assuming /contact exists
        { to: '/privacy', label: 'Privacy Policy' }, // Assuming /privacy exists
        { to: '/terms', label: 'Terms of Service' }, // Assuming /terms exists
      ],
    },
  ];

  const socialLinks = [
    { href: '#telegram', icon: MessageCircle, label: 'Telegram' },
    { href: '#twitter', icon: Twitter, label: 'X (Twitter)' },
    { href: '#github', icon: Github, label: 'GitHub' },
  ];

  return (
    <footer className="border-t border-border-alt py-4 md:py-6 bg-card/80 backdrop-blur-lg shadow-top">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <MotionDiv
            className="flex flex-col items-start md:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-body-std text-muted-foreground max-w-xs">
              Seamlessly integrate advanced AI to automate and innovate.
            </p>
          </MotionDiv>

          {footerSections.map((section, index) => (
            <MotionDiv
              key={section.title}
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <h4 className="font-semibold text-body-std text-foreground">{section.title}</h4>
              <ul className="space-y-1.5 text-body-std text-muted-foreground">
                {section.links.map(link => (
                  <FooterLink key={link.to} to={link.to}>
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </MotionDiv>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-border-alt flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-caption text-muted-foreground">
            &copy; {new Date().getFullYear()} FlowsyAI. All rights reserved.
          </p>
          <div className="flex gap-3">
            {socialLinks.map(social => (
              <SocialIconLink
                key={social.href}
                href={social.href}
                icon={social.icon}
                label={social.label}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
