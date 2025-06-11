import React from 'react';
import {
  MotionDiv,
  MotionSection,
  MotionH1,
  MotionH2,
  MotionP,
  MotionButton,
  MotionLi,
  MotionTr,
} from '@/lib/motion-wrapper';

import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  hoverEffect?: boolean;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  headerAction?: React.ReactNode;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      children,
      hoverEffect = true,
      icon,
      title,
      description,
      footer,
      headerAction,
      ...props
    },
    ref
  ) => {
    const cardContent = (
      <div
        ref={ref}
        className={cn('glass-card', !hoverEffect && 'hover:transform-none', className)}
        {...props}
      >
        {(title || description || icon || headerAction) && (
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              {icon && <div className="text-primary">{icon}</div>}
              <div>
                {title && (
                  <CardTitle className="text-lg font-medium text-foreground">{title}</CardTitle>
                )}
                {description && (
                  <CardDescription className="text-sm text-muted-foreground">
                    {description}
                  </CardDescription>
                )}
              </div>
            </div>
            {headerAction && <div>{headerAction}</div>}
          </CardHeader>
        )}
        <CardContent className={cn(!title && !description && !icon && !headerAction && 'pt-6')}>
          {children}
        </CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </div>
    );

    if (hoverEffect) {
      return (
        <MotionDiv whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
          {cardContent}
        </MotionDiv>
      );
    }

    return cardContent;
  }
);

GlassCard.displayName = 'GlassCard';

export { GlassCard };
