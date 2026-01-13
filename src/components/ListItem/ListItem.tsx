// ListItem.tsx
import { forwardRef, ReactNode } from 'react';
import styles from './ListItem.module.css';

export type ListItemType = 'text' | 'button' | 'link';

export interface ListItemProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Disables the item and makes it non-selectable and non-interactive.
   */
  disabled?: boolean;

  /**
   * Sets the behavior of the list item, defaults to "text". Change to "link" or
   * "button" for interactive items.
   */
  type?: ListItemType;

  /**
   * Sets the underlying `HTMLAnchorElement`'s `href` resource attribute.
   */
  href?: string;

  /**
   * Sets the underlying `HTMLAnchorElement`'s `target` attribute when `href` is set.
   */
  target?: '_blank' | '_parent' | '_self' | '_top' | '';

  /**
   * Content for the start slot.
   */
  start?: ReactNode;

  /**
   * Content for the end slot.
   */
  end?: ReactNode;

  /**
   * Body content.
   */
  children?: ReactNode;

  'aria-selected'?: string;
  'aria-checked'?: string;
  'aria-expanded'?: string;
  'aria-haspopup'?: string;
}

export const ListItem = forwardRef<HTMLElement, ListItemProps>(
  (
    {
      disabled = false,
      type: typeProp = 'text',
      href = '',
      target = '',
      start,
      end,
      children,
      className,
      'aria-selected': ariaSelected,
      'aria-checked': ariaChecked,
      'aria-expanded': ariaExpanded,
      'aria-haspopup': ariaHasPopup,
      ...props
    },
    ref
  ) => {
    const type = href ? 'link' : typeProp;
    const isDisabled = disabled && type !== 'link';
    const isInteractive = type !== 'text';

    const content = (
      <>
        <div className={styles.container}>
          {start && <div className={styles.start}>{start}</div>}
          <div className={styles.body}>{children}</div>
          {end && <div className={styles.end}>{end}</div>}
        </div>
      </>
    );

    const commonProps = {
      role: 'listitem',
      tabIndex: isDisabled || !isInteractive ? -1 : 0,
      'aria-selected': ariaSelected,
      'aria-checked': ariaChecked,
      'aria-expanded': ariaExpanded,
      'aria-haspopup': ariaHasPopup,
      className: `${styles.listItem} ${className || ''}`.trim(),
    };

    if (type === 'link') {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target || undefined}
          {...commonProps}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    if (type === 'button') {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          disabled={isDisabled}
          {...commonProps}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {content}
        </button>
      );
    }

    return (
      <li
        ref={ref as React.Ref<HTMLLIElement>}
        {...commonProps}
        {...(props as React.LiHTMLAttributes<HTMLLIElement>)}
      >
        {content}
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';
