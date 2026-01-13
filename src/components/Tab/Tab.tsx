// Tab.tsx
import { forwardRef, ReactNode, useState, useEffect, useRef } from 'react';
import styles from './Tab.module.css';

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Whether or not the tab is selected.
   */
  active?: boolean;

  /**
   * @deprecated use `active`
   */
  selected?: boolean;

  /**
   * In SSR, set this to true when an icon is present.
   */
  hasIcon?: boolean;

  /**
   * In SSR, set this to true when there is no label and only an icon.
   */
  iconOnly?: boolean;

  /**
   * Icon element or content.
   */
  icon?: ReactNode;

  /**
   * Tab label content.
   */
  children?: ReactNode;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  (
    {
      active: activeProp = false,
      selected,
      hasIcon: hasIconProp,
      iconOnly: iconOnlyProp,
      icon,
      children,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const active = selected ?? activeProp;
    const [hasIcon] = useState(hasIconProp ?? !!icon);
    const [iconOnly] = useState(iconOnlyProp ?? (!!icon && !children));
    const [fullWidthIndicator] = useState(false);
    const indicatorRef = useRef<HTMLDivElement>(null);

    const handleContentClick = (event: React.MouseEvent) => {
      event.stopPropagation();
      onClick?.(event as any);
    };

    const indicator = <div ref={indicatorRef} className={styles.indicator}></div>;

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={active}
        className={`${styles.tab} ${className || ''}`.trim()}
        tabIndex={active ? 0 : -1}
        {...props}
      >
        <div className={styles.button} role="presentation" onClick={handleContentClick}>
          <div
            className={`${styles.content} ${hasIcon ? styles.hasIcon : ''} ${!iconOnly ? styles.hasLabel : ''}`.trim()}
            role="presentation"
          >
            {icon && <span className={styles.iconSlot}>{icon}</span>}
            <span className={styles.labelSlot}>{children}</span>
            {!fullWidthIndicator && indicator}
          </div>
          {fullWidthIndicator && indicator}
        </div>
      </button>
    );
  }
);

Tab.displayName = 'Tab';
