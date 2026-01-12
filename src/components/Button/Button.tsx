import React, { forwardRef } from 'react';
import styles from './Button.module.css';
import { useRipple } from '../../hooks';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'filled', startIcon, endIcon, children, className = '', disabled, onPointerDown, ...props }, ref) => {
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
                className={`${styles.button} ${variantClass} ${className}`}
                disabled={disabled}
                onPointerDown={handlePointerDown}
                {...props}
            >
                <span className={styles.content}>
                    {startIcon && <span className={styles.icon}>{startIcon}</span>}
                    {children}
                    {endIcon && <span className={styles.icon}>{endIcon}</span>}
                </span>

                {/* State Layer handled in CSS ::before, Ripples in JS/CSS */}
                {!disabled && (
                    <div className={styles.rippleContainer}>
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
            </button>
        );
    }
);

Button.displayName = 'Button';
