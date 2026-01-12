import React, { forwardRef } from 'react';
import styles from './Button.module.css';
import { useRipple } from '../../hooks';

/**
 * Material Design 3 Button Component
 *
 * Implements the M3 "Common Buttons" specification with full support
 * for all variants, state layers, ripple effects, and accessibility.
 *
 * Reference: https://m3.material.io/components/all-buttons
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style of the button.
   * @default 'filled'
   */
  variant?: 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';

  /**
   * Optional icon element to display before the button text.
   */
  startIcon?: React.ReactNode;

  /**
   * Optional icon element to display after the button text.
   */
  endIcon?: React.ReactNode;

  /**
   * Button text content (required).
   */
  children: React.ReactNode;
}

/**
 * Button Component
 *
 * A production-ready Material Design 3 button with:
 * - 5 visual variants (filled, outlined, text, elevated, tonal)
 * - M3 State Layer implementation (opacity-based state visualization)
 * - Hardware-accelerated ripple effect
 * - Full accessibility support (ARIA attributes)
 * - Icon support
 * - Disabled state handling
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'filled',
      startIcon,
      endIcon,
      children,
      className = '',
      disabled = false,
      onPointerDown,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const { ripples, onPointerDown: onRipplePointerDown, cleanupRipple } = useRipple();

    const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (!disabled) {
        onRipplePointerDown(e);
      }
      if (onPointerDown) {
        onPointerDown(e);
      }
    };

    const variantClass = styles[variant] || styles.filled;

    return (
      <button
        ref={ref}
        type={type}
        className={`${styles.button} ${variantClass} ${className}`.trim()}
        disabled={disabled}
        onPointerDown={handlePointerDown}
        aria-disabled={disabled}
        {...props}
      >
        {/* Content layer (z-index: 2) - text and icons */}
        <span className={styles.content}>
          {startIcon && <span className={styles.icon} aria-hidden="true">{startIcon}</span>}
          <span>{children}</span>
          {endIcon && <span className={styles.icon} aria-hidden="true">{endIcon}</span>}
        </span>

        {/* Ripple effect container (z-index: 1) - only render when not disabled */}
        {!disabled && (
          <div className={styles.rippleContainer} aria-hidden="true">
            {ripples.map((ripple) => (
              <span
                key={ripple.key}
                className={styles.ripple}
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: ripple.size,
                  height: ripple.size,
                  marginLeft: -ripple.size / 2,
                  marginTop: -ripple.size / 2,
                }}
                onAnimationEnd={() => cleanupRipple(ripple.key)}
              />
            ))}
          </div>
        )}

        {/* State Layer (z-index: 0) - handled in CSS ::before pseudo-element */}
      </button>
    );
  }
);

Button.displayName = 'Button';
