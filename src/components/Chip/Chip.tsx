// Chip.tsx
import { forwardRef, useState, ReactNode } from 'react';
import styles from './Chip.module.css';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether or not the chip is disabled.
   */
  disabled?: boolean;

  /**
   * Whether or not the chip is "soft-disabled" (disabled but still focusable).
   */
  softDisabled?: boolean;

  /**
   * When true, allow disabled chips to be focused with arrow keys.
   * @deprecated Use `softDisabled` instead.
   */
  alwaysFocusable?: boolean;

  /**
   * The label of the chip.
   * @deprecated Set text as content of the chip instead.
   */
  label?: string;

  /**
   * Only needed for SSR. Set when chip has an icon.
   */
  hasIcon?: boolean;

  /**
   * Icon element or content.
   */
  icon?: ReactNode;

  /**
   * Whether the chip is elevated.
   */
  elevated?: boolean;

  /**
   * Link href for assist chips.
   */
  href?: string;

  /**
   * Download attribute for link chips.
   */
  download?: string;

  /**
   * Target attribute for link chips.
   */
  target?: '_blank' | '_parent' | '_self' | '_top' | '';

  'aria-label'?: string;
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      disabled = false,
      softDisabled = false,
      alwaysFocusable = false,
      label = '',
      hasIcon: hasIconProp,
      icon,
      elevated = false,
      href = '',
      download = '',
      target = '',
      className,
      children,
      'aria-label': ariaLabel,
      onClick,
      ...props
    },
    ref
  ) => {
    const [hasIcon] = useState(hasIconProp ?? !!icon);
    const primaryId = href ? 'link' : 'button';
    const rippleDisabled = !href && (disabled || softDisabled);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (softDisabled || (disabled && alwaysFocusable)) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    const renderPrimaryContent = () => (
      <>
        <span className={`${styles.leading} ${styles.icon}`} aria-hidden="true">
          {icon}
        </span>
        <span className={styles.label}>
          <span className={styles.labelText} id="label">
            {label || children}
          </span>
        </span>
        <span className={styles.touch}></span>
      </>
    );

    const renderPrimaryAction = () => {
      if (href) {
        return (
          <a
            className={`${styles.primary} ${styles.action}`}
            id="link"
            aria-label={ariaLabel}
            href={href}
            download={download || undefined}
            target={target || undefined}
          >
            {renderPrimaryContent()}
          </a>
        );
      }

      return (
        <button
          className={`${styles.primary} ${styles.action}`}
          id="button"
          aria-label={ariaLabel}
          aria-disabled={softDisabled || undefined}
          disabled={disabled && !alwaysFocusable}
          type="button"
        >
          {renderPrimaryContent()}
        </button>
      );
    };

    return (
      <div
        ref={ref}
        className={`${styles.container} ${disabled || softDisabled ? styles.disabled : ''} ${hasIcon ? styles.hasIcon : ''} ${elevated ? styles.elevated : ''} ${href ? styles.link : ''} ${className || ''}`.trim()}
        onClick={handleClick}
        {...props}
      >
        {elevated ? (
          <span className={styles.elevation}></span>
        ) : (
          <span className={styles.outline}></span>
        )}
        {renderPrimaryAction()}
      </div>
    );
  }
);

Chip.displayName = 'Chip';
