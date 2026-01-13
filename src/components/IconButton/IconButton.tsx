// IconButton.tsx
import { forwardRef, useState, useEffect } from 'react';
import styles from './IconButton.module.css';

export type LinkTarget = '_blank' | '_parent' | '_self' | '_top';
export type FormSubmitterType = 'button' | 'reset' | 'submit';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Disables the icon button and makes it non-interactive.
   */
  disabled?: boolean;

  /**
   * "Soft-disables" the icon button (disabled but still focusable).
   */
  softDisabled?: boolean;

  /**
   * Flips the icon if it is in an RTL context at startup.
   */
  flipIconInRtl?: boolean;

  /**
   * Sets the underlying `HTMLAnchorElement`'s `href` resource attribute.
   */
  href?: string;

  /**
   * The filename to use when downloading the linked resource.
   */
  download?: string;

  /**
   * Sets the underlying `HTMLAnchorElement`'s `target` attribute.
   */
  target?: LinkTarget | '';

  /**
   * The `aria-label` of the button when the button is toggleable and selected.
   */
  ariaLabelSelected?: string;

  /**
   * When true, the button will toggle between selected and unselected states.
   */
  toggle?: boolean;

  /**
   * Sets the selected state.
   */
  selected?: boolean;

  /**
   * The default behavior of the button.
   */
  type?: FormSubmitterType;

  /**
   * The value added to a form with the button's name when the button submits a form.
   */
  value?: string;

  /**
   * Icon element or content for default state.
   */
  icon?: React.ReactNode;

  /**
   * Icon element or content for selected state.
   */
  selectedIcon?: React.ReactNode;

  /**
   * Called when the button selection changes (toggle mode).
   */
  onChange?: (selected: boolean) => void;

  /**
   * Called on input event (toggle mode).
   */
  onInput?: (selected: boolean) => void;

  'aria-label'?: string;
  'aria-haspopup'?: string;
  'aria-expanded'?: string;
}

export const IconButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, IconButtonProps>(
  (
    {
      disabled = false,
      softDisabled = false,
      flipIconInRtl = false,
      href = '',
      download = '',
      target = '',
      ariaLabelSelected = '',
      toggle = false,
      selected = false,
      type = 'submit',
      value = '',
      icon,
      selectedIcon,
      onChange,
      onInput,
      className,
      children,
      'aria-label': ariaLabel,
      'aria-haspopup': ariaHasPopup,
      'aria-expanded': ariaExpanded,
      onClick,
      ...props
    },
    ref
  ) => {
    const [isSelected, setIsSelected] = useState(selected);
    const [flipIcon, setFlipIcon] = useState(false);

    useEffect(() => {
      setIsSelected(selected);
    }, [selected]);

    useEffect(() => {
      if (flipIconInRtl) {
        setFlipIcon(document.dir === 'rtl');
      }
    }, [flipIconInRtl]);

    const handleClick = (event: React.MouseEvent) => {
      if (!href && softDisabled) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }

      if (toggle && !disabled && !softDisabled) {
        const newSelected = !isSelected;
        setIsSelected(newSelected);
        onChange?.(newSelected);
        onInput?.(newSelected);
      }

      onClick?.(event as any);
    };

    const hasToggledAriaLabel = ariaLabel && ariaLabelSelected;
    const ariaPressedValue = !toggle ? undefined : isSelected;
    const ariaLabelValue = !href && hasToggledAriaLabel && isSelected ? ariaLabelSelected : ariaLabel;

    const buttonClasses = `${styles.iconButton} ${flipIcon ? styles.flipIcon : ''} ${toggle && isSelected ? styles.selected : ''} ${className || ''}`.trim();

    if (href) {
      return (
        <div className={buttonClasses}>
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            className={styles.link}
            href={href}
            download={download || undefined}
            target={target || undefined}
            aria-label={ariaLabel}
            onClick={handleClick}
            {...(props as any)}
          >
            <span className={styles.touch}></span>
          </a>
          <span className={styles.icon}>
            {!isSelected ? (icon || children) : (selectedIcon || icon || children)}
          </span>
        </div>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={buttonClasses}
        aria-label={ariaLabelValue}
        aria-haspopup={ariaHasPopup}
        aria-expanded={ariaExpanded}
        aria-pressed={ariaPressedValue}
        aria-disabled={softDisabled || undefined}
        disabled={disabled}
        type={type}
        value={value}
        onClick={handleClick}
        {...props}
      >
        {!isSelected ? (
          <span className={styles.icon}>{icon || children}</span>
        ) : (
          <span className={`${styles.icon} ${styles.iconSelected}`}>
            {selectedIcon || icon || children}
          </span>
        )}
        <span className={styles.touch}></span>
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
