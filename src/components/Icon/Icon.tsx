// Icon.tsx
import { forwardRef, useEffect, useRef } from 'react';
import styles from './Icon.module.css';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({ children, className, ...props }, ref) => {
    const internalRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      const element = internalRef.current;
      if (!element) return;

      const ariaHidden = element.getAttribute('aria-hidden');
      if (ariaHidden === 'false') {
        element.removeAttribute('aria-hidden');
        return;
      }

      element.setAttribute('aria-hidden', 'true');
    }, []);

    return (
      <span
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          (internalRef as React.MutableRefObject<HTMLSpanElement | null>).current = node;
        }}
        className={`${styles.icon} ${className || ''}`.trim()}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Icon.displayName = 'Icon';
