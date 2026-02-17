'use client';

import { forwardRef, useCallback } from 'react';
import styles from './Button.module.css';
import { useRipple } from '../../hooks';

/**
 * Material Design 3 Button Component
 *
 * Simple shadcn-style API - just put content as children.
 * Icons are just regular children, no special props needed.
 *
 * @example
 * ```tsx
 * // Simple button
 * <Button>Click me</Button>
 *
 * // With icon (just add it as child)
 * <Button variant="filled">
 *   <PlusIcon />
 *   Add Item
 * </Button>
 *
 * // Icon only
 * <Button variant="tonal" size="icon" aria-label="Settings">
 *   <SettingsIcon />
 * </Button>
 *
 * // As link
 * <Button variant="text" as="a" href="/about">
 *   Learn More
 * </Button>
 * ```
 */

export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

type ButtonAsButton = {
  as?: 'button';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsAnchor = {
  as: 'a';
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonAsType = ButtonAsButton | ButtonAsAnchor;

export type ButtonProps = {
  /** Visual style of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Disable the button */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
  /** Button content - text, icons, or any React nodes */
  children?: React.ReactNode;
} & ButtonAsType;

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * M3 Button Component
 *
 * Simple API - icons and text are just children.
 * Use `as="a"` to render as a link.
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'filled',
      size = 'md',
      as = 'button',
      disabled = false,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const { surfaceRef, handlers, state } = useRipple<HTMLSpanElement>(disabled);

    // Combine ripple handlers with user's onClick
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        handlers.onClick(e as React.MouseEvent<HTMLElement>);
        if (onClick) {
          (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
        }
      },
      [handlers, onClick]
    );

    const buttonClass = cn(
      styles.button,
      styles[variant],
      styles[size],
      disabled && styles.disabled,
      state.pressed && styles.pressed,
      className
    );

    const content = (
      <>
        <span 
          ref={surfaceRef} 
          className={styles.ripple}
          aria-hidden="true"
        />
        <span className={styles.stateLayer} aria-hidden="true" />
        <span className={styles.content}>{children}</span>
      </>
    );

    if (as === 'a') {
      const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={buttonClass}
          aria-disabled={disabled || undefined}
          {...anchorProps}
          onPointerEnter={handlers.onPointerEnter}
          onPointerLeave={handlers.onPointerLeave}
          onPointerDown={handlers.onPointerDown}
          onPointerUp={handlers.onPointerUp}
          onPointerCancel={handlers.onPointerCancel}
          onClick={handleClick}
        >
          {content}
        </a>
      );
    }

    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={buttonClass}
        disabled={disabled}
        {...buttonProps}
        onPointerEnter={handlers.onPointerEnter}
        onPointerLeave={handlers.onPointerLeave}
        onPointerDown={handlers.onPointerDown}
        onPointerUp={handlers.onPointerUp}
        onPointerCancel={handlers.onPointerCancel}
        onClick={handleClick}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
