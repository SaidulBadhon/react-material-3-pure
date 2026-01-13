// Badge.tsx
import { forwardRef } from 'react';
import styles from './Badge.module.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The value to display in the badge.
   */
  value?: string;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ value = '', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.badge} ${value ? styles.large : ''} ${className || ''}`.trim()}
        {...props}
      >
        <p className={styles.value}>{value}</p>
      </div>
    );
  }
);

Badge.displayName = 'Badge';
