export const BUTTON_TSX = `'use client';

import { forwardRef, useCallback } from 'react';
import styles from './button.module.css';
import { useRipple } from '../hooks/use-ripple';

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
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
} & ButtonAsType;

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

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
`;

export const BUTTON_CSS = `/**
 * Material Design 3 Button Styles
 */

.button {
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  font: inherit;
  margin: 0;
  outline: none;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  font-family: var(--md-sys-typescale-label-large-font, Roboto, sans-serif);
  font-size: var(--md-sys-typescale-label-large-size, 0.875rem);
  font-weight: var(--md-sys-typescale-label-large-weight, 500);
  line-height: var(--md-sys-typescale-label-large-line-height, 1.25rem);
  letter-spacing: var(--md-sys-typescale-label-large-tracking, 0.1px);
  
  height: 40px;
  padding: 0 24px;
  border-radius: var(--md-sys-shape-corner-full, 9999px);
  
  transition: 
    background-color 200ms cubic-bezier(0.2, 0, 0, 1),
    box-shadow 200ms cubic-bezier(0.2, 0, 0, 1),
    border-color 200ms cubic-bezier(0.2, 0, 0, 1);
}

.button:focus-visible {
  outline: 2px solid var(--md-sys-color-primary, #6750a4);
  outline-offset: 2px;
}

.content {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  z-index: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.content > svg,
.content > [data-icon] {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  fill: currentColor;
}

.stateLayer {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 200ms cubic-bezier(0.2, 0, 0, 1);
  pointer-events: none;
}

.button:hover .stateLayer {
  opacity: 0.08;
}

.button:focus-visible .stateLayer {
  opacity: 0.12;
}

.pressed .stateLayer,
.button:active .stateLayer {
  opacity: 0.12;
}

.ripple {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;
  pointer-events: none;
  -webkit-mask-image: radial-gradient(circle, white 100%, black 100%);
  mask-image: radial-gradient(circle, white 100%, black 100%);
}

.sm {
  height: 32px;
  padding: 0 16px;
  font-size: 0.8125rem;
}

.md {
  height: 40px;
  padding: 0 24px;
}

.lg {
  height: 48px;
  padding: 0 32px;
  font-size: 1rem;
}

.icon {
  height: 40px;
  width: 40px;
  padding: 0;
  border-radius: var(--md-sys-shape-corner-full, 9999px);
}

.icon .content {
  gap: 0;
}

.filled {
  background-color: var(--md-sys-color-primary, #6750a4);
  color: var(--md-sys-color-on-primary, #ffffff);
}

.filled .stateLayer {
  background-color: var(--md-sys-color-on-primary, #ffffff);
}

.filled:hover {
  box-shadow: var(--md-sys-elevation-level-1, 0 1px 3px 1px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.3));
}

.outlined {
  background-color: transparent;
  color: var(--md-sys-color-primary, #6750a4);
  border: 1px solid var(--md-sys-color-outline, #79747e);
}

.outlined .stateLayer {
  background-color: var(--md-sys-color-primary, #6750a4);
}

.text {
  background-color: transparent;
  color: var(--md-sys-color-primary, #6750a4);
  padding: 0 12px;
}

.text .stateLayer {
  background-color: var(--md-sys-color-primary, #6750a4);
}

.elevated {
  background-color: var(--md-sys-color-surface-container-low, #f7f2fa);
  color: var(--md-sys-color-primary, #6750a4);
  box-shadow: var(--md-sys-elevation-level-1, 0 1px 3px 1px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.3));
}

.elevated .stateLayer {
  background-color: var(--md-sys-color-primary, #6750a4);
}

.elevated:hover {
  box-shadow: var(--md-sys-elevation-level-2, 0 2px 6px 2px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.3));
}

.tonal {
  background-color: var(--md-sys-color-secondary-container, #e8def8);
  color: var(--md-sys-color-on-secondary-container, #1d192b);
}

.tonal .stateLayer {
  background-color: var(--md-sys-color-on-secondary-container, #1d192b);
}

.tonal:hover {
  box-shadow: var(--md-sys-elevation-level-1, 0 1px 3px 1px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.3));
}

.disabled {
  cursor: not-allowed;
  pointer-events: none;
  background-color: color-mix(in srgb, var(--md-sys-color-on-surface, #1d1b20) 12%, transparent) !important;
  color: color-mix(in srgb, var(--md-sys-color-on-surface, #1d1b20) 38%, transparent) !important;
  box-shadow: none !important;
  border-color: transparent !important;
}

.disabled .stateLayer {
  display: none;
}
`;

