// FocusRing.tsx
import { forwardRef, useEffect, useRef, useState } from 'react';
import styles from './FocusRing.module.css';

export interface FocusRingProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Makes the focus ring visible.
   */
  visible?: boolean;

  /**
   * Makes the focus ring animate inwards instead of outwards.
   */
  inward?: boolean;

  /**
   * The element to attach to and watch for focus.
   */
  htmlFor?: string;

  /**
   * The control element reference.
   */
  control?: HTMLElement | null;
}

export const FocusRing = forwardRef<HTMLSpanElement, FocusRingProps>(
  (
    {
      visible: visibleProp = false,
      inward = false,
      htmlFor,
      control: controlProp,
      className,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(visibleProp);
    const internalRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      setVisible(visibleProp);
    }, [visibleProp]);

    useEffect(() => {
      const element = internalRef.current;
      if (element) {
        element.setAttribute('aria-hidden', 'true');
      }
    }, []);

    useEffect(() => {
      let control = controlProp;

      if (!control && htmlFor) {
        const root = internalRef.current?.getRootNode() as Document | ShadowRoot;
        control = root?.getElementById(htmlFor) ?? null;
      }

      if (!control) return;

      const handleFocusIn = (event: FocusEvent) => {
        const target = event.target as HTMLElement;
        setVisible(target.matches(':focus-visible'));
      };

      const handleFocusOut = () => {
        setVisible(false);
      };

      const handlePointerDown = () => {
        setVisible(false);
      };

      control.addEventListener('focusin', handleFocusIn);
      control.addEventListener('focusout', handleFocusOut);
      control.addEventListener('pointerdown', handlePointerDown);

      return () => {
        control?.removeEventListener('focusin', handleFocusIn);
        control?.removeEventListener('focusout', handleFocusOut);
        control?.removeEventListener('pointerdown', handlePointerDown);
      };
    }, [controlProp, htmlFor]);

    return (
      <span
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          (internalRef as React.MutableRefObject<HTMLSpanElement | null>).current = node;
        }}
        className={`${styles.focusRing} ${visible ? styles.visible : ''} ${inward ? styles.inward : ''} ${className || ''}`.trim()}
        {...props}
      />
    );
  }
);

FocusRing.displayName = 'FocusRing';
