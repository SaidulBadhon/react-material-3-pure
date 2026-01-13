// Fab.tsx
import { forwardRef } from 'react';
import styles from './Fab.module.css';

export type FabVariant = 'surface' | 'primary' | 'secondary' | 'tertiary';
export type FabSize = 'medium' | 'small' | 'large';

export interface FabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The FAB color variant to render.
   */
  variant?: FabVariant;

  /**
   * The size of the FAB.
   *
   * NOTE: Branded FABs cannot be sized to `small`, and Extended FABs do not
   * have different sizes.
   */
  size?: FabSize;

  /**
   * The text to display on the FAB.
   */
  label?: string;

  /**
   * Lowers the FAB's elevation.
   */
  lowered?: boolean;

  /**
   * Icon element or content.
   */
  icon?: React.ReactNode;

  'aria-label'?: string;
}

export const Fab = forwardRef<HTMLButtonElement, FabProps>(
  (
    {
      variant = 'surface',
      size = 'medium',
      label = '',
      lowered = false,
      icon,
      className,
      'aria-label': ariaLabel,
      children,
      ...props
    },
    ref
  ) => {
    const isExtended = !!label;

    return (
      <button
        ref={ref}
        className={`${styles.fab} ${variant === 'primary' ? styles.primary : ''} ${variant === 'secondary' ? styles.secondary : ''} ${variant === 'tertiary' ? styles.tertiary : ''} ${lowered ? styles.lowered : ''} ${size === 'small' && !isExtended ? styles.small : ''} ${size === 'large' && !isExtended ? styles.large : ''} ${isExtended ? styles.extended : ''} ${className || ''}`.trim()}
        aria-label={ariaLabel}
        {...props}
      >
        <div className={styles.touchTarget}></div>
        <span className={styles.icon}>
          {icon || children}
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </button>
    );
  }
);

Fab.displayName = 'Fab';
