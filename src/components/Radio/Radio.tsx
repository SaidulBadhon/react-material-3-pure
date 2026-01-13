// Radio.tsx
import { forwardRef, useId, useEffect, useRef } from 'react';
import styles from './Radio.module.css';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  /**
   * Whether or not the radio is selected.
   */
  checked?: boolean;

  /**
   * Whether or not the radio is required. If any radio is required in a group,
   * all radios are implicitly required.
   */
  required?: boolean;

  /**
   * The element value to use in form submission when checked.
   */
  value?: string;

  /**
   * Called when the radio selection changes.
   */
  onChange?: (checked: boolean) => void;

  /**
   * Called on input event.
   */
  onInput?: (checked: boolean) => void;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      checked = false,
      required = false,
      value = 'on',
      disabled = false,
      onChange,
      onInput,
      className,
      ...props
    },
    ref
  ) => {
    const maskId = useRef(`cutout${Math.random().toString(36).substr(2, 9)}`).current;
    const containerRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
      if (disabled) return;
      
      onChange?.(true);
      onInput?.(true);
    };

    return (
      <div
        ref={containerRef}
        className={`${styles.container} ${checked ? styles.checked : ''} ${className || ''}`.trim()}
        onClick={handleClick}
        role="radio"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
      >
        <svg className={styles.icon} viewBox="0 0 20 20">
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="white" />
            <circle cx="10" cy="10" r="8" fill="black" />
          </mask>
          <circle
            className={`${styles.outerCircle} ${styles.circle}`}
            cx="10"
            cy="10"
            r="10"
            mask={`url(#${maskId})`}
          />
          <circle className={`${styles.innerCircle} ${styles.circle}`} cx="10" cy="10" r="5" />
        </svg>

        <div className={styles.touchTarget}></div>

        <input
          ref={ref}
          type="radio"
          checked={checked}
          disabled={disabled}
          required={required}
          value={value}
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
          {...props}
        />
      </div>
    );
  }
);

Radio.displayName = 'Radio';
