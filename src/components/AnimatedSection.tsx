import React, { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'slideLeft' | 'slideRight' | 'slideUp' | 'slideDown' | 'fade' | 'zoom';
  delay?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'fade',
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animation) {
        case 'slideLeft':
          return 'opacity-0 translate-x-12';
        case 'slideRight':
          return 'opacity-0 -translate-x-12';
        case 'slideUp':
          return 'opacity-0 translate-y-12';
        case 'slideDown':
          return 'opacity-0 -translate-y-12';
        case 'zoom':
          return 'opacity-0 scale-95';
        default:
          return 'opacity-0';
      }
    }
    return 'opacity-100 translate-x-0 translate-y-0 scale-100';
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  );
};
