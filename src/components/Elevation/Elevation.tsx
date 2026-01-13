// Elevation.tsx
import { forwardRef, useEffect, useRef } from 'react';
import styles from './Elevation.module.css';

export interface ElevationProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const Elevation = forwardRef<HTMLSpanElement, ElevationProps>(
  ({ className, ...props }, ref) => {
    const internalRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      const element = internalRef.current;
      if (element) {
        element.setAttribute('aria-hidden', 'true');
      }
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
        className={`${styles.elevation} ${className || ''}`.trim()}
        {...props}
      >
        <span className={styles.shadow}></span>
      </span>
    );
  }
);

Elevation.displayName = 'Elevation';
