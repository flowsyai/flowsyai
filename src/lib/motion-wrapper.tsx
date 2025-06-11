import * as React from 'react';
import {
  motion,
  AnimatePresence,
  MotionProps,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';

// Extend MotionProps to include className
interface ExtendedMotionProps extends MotionProps {
  className?: string;
  children?: React.ReactNode;
}

// Type for fallback props
interface FallbackProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

// Safety check for React availability
const safeForwardRef = React?.forwardRef || ((render: any) => render);

// Wrapper pentru motion.div cu error boundary
export const MotionDiv = safeForwardRef<HTMLDivElement, ExtendedMotionProps>((props, ref) => {
  try {
    return <motion.div ref={ref} {...props} />;
  } catch (error) {
    console.warn('Framer Motion error:', error);
    const fallbackProps: FallbackProps = {
      className: props.className,
      children: props.children,
    };
    return <div ref={ref} {...fallbackProps} />;
  }
});

MotionDiv.displayName = 'MotionDiv';

// Wrapper pentru motion.section cu error boundary
export const MotionSection = safeForwardRef<HTMLElement, ExtendedMotionProps>((props, ref) => {
  try {
    return <motion.section ref={ref} {...props} />;
  } catch (error) {
    console.warn('Framer Motion error:', error);
    const fallbackProps: FallbackProps = {
      className: props.className,
      children: props.children,
    };
    return <section ref={ref} {...fallbackProps} />;
  }
});

MotionSection.displayName = 'MotionSection';

// Wrapper pentru motion.h1 cu error boundary
export const MotionH1 = safeForwardRef<HTMLHeadingElement, ExtendedMotionProps>((props, ref) => {
  try {
    return <motion.h1 ref={ref} {...props} />;
  } catch (error) {
    console.warn('Framer Motion error:', error);
    const fallbackProps: FallbackProps = {
      className: props.className,
      children: props.children,
    };
    return <h1 ref={ref} {...fallbackProps} />;
  }
});

MotionH1.displayName = 'MotionH1';

// Wrapper pentru motion.h2 cu error boundary
export const MotionH2 = safeForwardRef<HTMLHeadingElement, ExtendedMotionProps>((props, ref) => {
  try {
    return <motion.h2 ref={ref} {...props} />;
  } catch (error) {
    console.warn('Framer Motion error:', error);
    const fallbackProps: FallbackProps = {
      className: props.className,
      children: props.children,
    };
    return <h2 ref={ref} {...fallbackProps} />;
  }
});

MotionH2.displayName = 'MotionH2';

// Wrapper pentru motion.h3 cu error boundary
export const MotionH3 = safeForwardRef<HTMLHeadingElement, ExtendedMotionProps>((props, ref) => {
  try {
    return <motion.h3 ref={ref} {...props} />;
  } catch (error) {
    console.warn('Framer Motion error:', error);
    const fallbackProps: FallbackProps = {
      className: props.className,
      children: props.children,
    };
    return <h3 ref={ref} {...fallbackProps} />;
  }
});

MotionH3.displayName = 'MotionH3';

// Wrapper pentru motion.p cu error boundary
export const MotionP = safeForwardRef<HTMLParagraphElement, ExtendedMotionProps>((props, ref) => {
  try {
    return <motion.p ref={ref} {...props} />;
  } catch (error) {
    console.warn('Framer Motion error:', error);
    const fallbackProps: FallbackProps = {
      className: props.className,
      children: props.children,
    };
    return <p ref={ref} {...fallbackProps} />;
  }
});

MotionP.displayName = 'MotionP';

// Wrapper pentru motion.button cu error boundary
export const MotionButton = safeForwardRef<HTMLButtonElement, ExtendedMotionProps>(
  (props, ref) => {
    try {
      return <motion.button ref={ref} {...props} />;
    } catch (error) {
      console.warn('Framer Motion error:', error);
      const fallbackProps: FallbackProps = {
        className: props.className,
        children: props.children,
      };
      return <button ref={ref} {...fallbackProps} />;
    }
  }
);

MotionButton.displayName = 'MotionButton';

// Wrapper pentru motion.li cu error boundary
export const MotionLi = safeForwardRef<HTMLLIElement, ExtendedMotionProps>((props, ref) => {
  try {
    return <motion.li ref={ref} {...props} />;
  } catch (error) {
    console.warn('Framer Motion error:', error);
    const fallbackProps: FallbackProps = {
      className: props.className,
      children: props.children,
    };
    return <li ref={ref} {...fallbackProps} />;
  }
});

MotionLi.displayName = 'MotionLi';

// Wrapper pentru motion.tr cu error boundary
export const MotionTr = safeForwardRef<HTMLTableRowElement, ExtendedMotionProps>((props, ref) => {
  try {
    return <motion.tr ref={ref} {...props} />;
  } catch (error) {
    console.warn('Framer Motion error:', error);
    const fallbackProps: FallbackProps = {
      className: props.className,
      children: props.children,
    };
    return <tr ref={ref} {...fallbackProps} />;
  }
});

MotionTr.displayName = 'MotionTr';

// Wrapper pentru motion.path cu error boundary
export const MotionPath = safeForwardRef<SVGPathElement, ExtendedMotionProps>((props, ref) => {
  try {
    return <motion.path ref={ref} {...props} />;
  } catch (error) {
    console.warn('Framer Motion error:', error);
    const fallbackProps: FallbackProps = {
      className: props.className,
      children: props.children,
    };
    return <path ref={ref} {...fallbackProps} />;
  }
});

MotionPath.displayName = 'MotionPath';

// Wrapper pentru motion.linearGradient cu error boundary
export const MotionLinearGradient = safeForwardRef<SVGLinearGradientElement, ExtendedMotionProps>(
  (props, ref) => {
    try {
      return <motion.linearGradient ref={ref} {...props} />;
    } catch (error) {
      console.warn('Framer Motion error:', error);
      const fallbackProps: FallbackProps = {
        className: props.className,
        children: props.children,
      };
      return <linearGradient ref={ref} {...fallbackProps} />;
    }
  }
);

MotionLinearGradient.displayName = 'MotionLinearGradient';

// Wrapper pentru motion.circle cu error boundary
export const MotionCircle = safeForwardRef<SVGCircleElement, ExtendedMotionProps>(
  (props, ref) => {
    try {
      return <motion.circle ref={ref} {...props} />;
    } catch (error) {
      console.warn('Framer Motion error:', error);
      const fallbackProps: FallbackProps = {
        className: props.className,
        children: props.children,
      };
      return <circle ref={ref} {...fallbackProps} />;
    }
  }
);

MotionCircle.displayName = 'MotionCircle';

// Wrapper pentru motion.svg cu error boundary
export const MotionSvg = safeForwardRef<SVGSVGElement, ExtendedMotionProps>((props, ref) => {
  try {
    return <motion.svg ref={ref} {...props} />;
  } catch (error) {
    console.warn('Framer Motion error:', error);
    const fallbackProps: FallbackProps = {
      className: props.className,
      children: props.children,
    };
    return <svg ref={ref} {...fallbackProps} />;
  }
});

MotionSvg.displayName = 'MotionSvg';

// Wrapper pentru motion.footer cu error boundary
export const MotionFooter = safeForwardRef<HTMLElement, ExtendedMotionProps>((props, ref) => {
  try {
    return <motion.footer ref={ref} {...props} />;
  } catch (error) {
    console.warn('Framer Motion error:', error);
    const fallbackProps: FallbackProps = {
      className: props.className,
      children: props.children,
    };
    return <footer ref={ref} {...fallbackProps} />;
  }
});

MotionFooter.displayName = 'MotionFooter';

// Wrapper pentru motion.a cu error boundary
export const MotionA = safeForwardRef<HTMLAnchorElement, ExtendedMotionProps>((props, ref) => {
  try {
    return <motion.a ref={ref} {...props} />;
  } catch (error) {
    console.warn('Framer Motion error:', error);
    const fallbackProps: FallbackProps = {
      className: props.className,
      children: props.children,
    };
    return <a ref={ref} {...fallbackProps} />;
  }
});

MotionA.displayName = 'MotionA';

// Wrapper pentru motion.span cu error boundary
export const MotionSpan = safeForwardRef<HTMLSpanElement, ExtendedMotionProps>((props, ref) => {
  try {
    return <motion.span ref={ref} {...props} />;
  } catch (error) {
    console.warn('Framer Motion error:', error);
    const fallbackProps: FallbackProps = {
      className: props.className,
      children: props.children,
    };
    return <span ref={ref} {...fallbackProps} />;
  }
});

MotionSpan.displayName = 'MotionSpan';

// Wrapper pentru motion.aside cu error boundary
export const MotionAside = safeForwardRef<HTMLElement, ExtendedMotionProps>((props, ref) => {
  try {
    return <motion.aside ref={ref} {...props} />;
  } catch (error) {
    console.warn('Framer Motion error:', error);
    const fallbackProps: FallbackProps = {
      className: props.className,
      children: props.children,
    };
    return <aside ref={ref} {...fallbackProps} />;
  }
});

MotionAside.displayName = 'MotionAside';

// Wrapper pentru motion.main cu error boundary
export const MotionMain = safeForwardRef<HTMLElement, ExtendedMotionProps>((props, ref) => {
  try {
    return <motion.main ref={ref} {...props} />;
  } catch (error) {
    console.warn('Framer Motion error:', error);
    const fallbackProps: FallbackProps = {
      className: props.className,
      children: props.children,
    };
    return <main ref={ref} {...fallbackProps} />;
  }
});

MotionMain.displayName = 'MotionMain';

// Wrapper pentru AnimatePresence cu error boundary
export const SafeAnimatePresence: React.FC<{
  children: React.ReactNode;
  mode?: 'wait' | 'sync' | 'popLayout';
}> = ({ children, mode }) => {
  try {
    return <AnimatePresence mode={mode}>{children}</AnimatePresence>;
  } catch (error) {
    console.warn('AnimatePresence error:', error);
    return <>{children}</>;
  }
};
