// Ripple.tsx
import { forwardRef, useEffect, useRef, useState } from 'react';
import styles from './Ripple.module.css';

export interface RippleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Disables the ripple.
   */
  disabled?: boolean;

  /**
   * The element to attach to and watch for interactions.
   */
  htmlFor?: string;

  /**
   * The control element reference.
   */
  control?: HTMLElement | null;
}

export const Ripple = forwardRef<HTMLDivElement, RippleProps>(
  ({ disabled = false, htmlFor, control: controlProp, className, ...props }, ref) => {
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    const internalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const element = internalRef.current;
      if (element) {
        element.setAttribute('aria-hidden', 'true');
      }
    }, []);

    useEffect(() => {
      if (disabled) {
        setHovered(false);
        setPressed(false);
      }
    }, [disabled]);

    useEffect(() => {
      let control = controlProp;

      if (!control && htmlFor) {
        const root = internalRef.current?.getRootNode() as Document | ShadowRoot;
        control = root?.getElementById(htmlFor) ?? null;
      }

      if (!control || disabled) return;

      const handlePointerEnter = () => {
        if (!disabled) setHovered(true);
      };

      const handlePointerLeave = () => {
        if (!disabled) {
          setHovered(false);
          setPressed(false);
        }
      };

      const handlePointerDown = () => {
        if (!disabled) setPressed(true);
      };

      const handlePointerUp = () => {
        if (!disabled) setPressed(false);
      };

      const handleClick = () => {
        if (!disabled) setPressed(false);
      };

      control.addEventListener('pointerenter', handlePointerEnter);
      control.addEventListener('pointerleave', handlePointerLeave);
      control.addEventListener('pointerdown', handlePointerDown);
      control.addEventListener('pointerup', handlePointerUp);
      control.addEventListener('click', handleClick);

      return () => {
        control?.removeEventListener('pointerenter', handlePointerEnter);
        control?.removeEventListener('pointerleave', handlePointerLeave);
        control?.removeEventListener('pointerdown', handlePointerDown);
        control?.removeEventListener('pointerup', handlePointerUp);
        control?.removeEventListener('click', handleClick);
      };
    }, [controlProp, htmlFor, disabled]);

    return (
      <div
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={`${styles.ripple} ${className || ''}`.trim()}
        {...props}
      >
        <div
          className={`${styles.surface} ${hovered ? styles.hovered : ''} ${pressed ? styles.pressed : ''}`.trim()}
        ></div>
      </div>
    );
  }
);

Ripple.displayName = 'Ripple';
