// Divider.tsx
import { forwardRef } from 'react';
import styles from './Divider.module.css';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Indents the divider with equal padding on both sides.
   */
  inset?: boolean;

  /**
   * Indents the divider with padding on the leading side.
   */
  insetStart?: boolean;

  /**
   * Indents the divider with padding on the trailing side.
   */
  insetEnd?: boolean;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ inset = false, insetStart = false, insetEnd = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.root} ${inset ? styles.inset : ''} ${insetStart ? styles.insetStart : ''} ${insetEnd ? styles.insetEnd : ''} ${className || ''}`.trim()}
        role="separator"
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';
