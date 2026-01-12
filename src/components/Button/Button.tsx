import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'filled' | 'outlined' | 'text';
    children: React.ReactNode;
}

export const Button = ({ variant = 'filled', children, className, ...props }: ButtonProps) => {
    const variantClass = styles[variant];
    return (
        <button className={`${styles.button} ${variantClass} ${className || ''}`} {...props}>
            {children}
        </button>
    );
};
