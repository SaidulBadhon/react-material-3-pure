// Switch.tsx
import { forwardRef, useRef, useId, ChangeEvent } from 'react';
import styles from './Switch.module.css';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  /**
   * Puts the switch in the selected state and sets the form submission value to
   * the `value` property.
   */
  selected?: boolean;

  /**
   * Shows both the selected and deselected icons.
   */
  icons?: boolean;

  /**
   * Shows only the selected icon, and not the deselected icon. If `true`,
   * overrides the behavior of the `icons` property.
   */
  showOnlySelectedIcon?: boolean;

  /**
   * When true, require the switch to be selected when participating in
   * form submission.
   */
  required?: boolean;

  /**
   * The value associated with this switch on form submission. `null` is
   * submitted when `selected` is `false`.
   */
  value?: string;

  /**
   * Called when the switch selection changes.
   */
  onChange?: (selected: boolean) => void;

  /**
   * Called on input event.
   */
  onInput?: (selected: boolean) => void;

  'aria-label'?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      selected = false,
      icons = false,
      showOnlySelectedIcon = false,
      required = false,
      value = 'on',
      disabled = false,
      onChange,
      onInput,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const id = useId();

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
      onInput?.(event.target.checked);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.checked);
    };

    const shouldShowIcons = icons || showOnlySelectedIcon;
    const showIcon = showOnlySelectedIcon ? selected : icons;

    return (
      <div
        className={`${styles.switch} ${selected ? styles.selected : styles.unselected} ${disabled ? styles.disabled : ''} ${className || ''}`.trim()}
      >
        <input
          ref={(node) => {
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
          }}
          id={id}
          className={styles.touch}
          type="checkbox"
          role="switch"
          aria-label={ariaLabel}
          checked={selected}
          disabled={disabled}
          required={required}
          value={value}
          onInput={handleInput}
          onChange={handleChange}
          {...props}
        />

        <span className={styles.track}>
          <span className={styles.touchTarget}></span>
          <span className={styles.handleContainer}>
            <span className={`${styles.handle} ${showIcon ? styles.withIcon : ''}`.trim()}>
              {shouldShowIcons && (
                <div className={styles.icons}>
                  <span className={`${styles.icon} ${styles.iconOn}`}>
                    <svg viewBox="0 0 24 24">
                      <path d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z" />
                    </svg>
                  </span>
                  {!showOnlySelectedIcon && (
                    <span className={`${styles.icon} ${styles.iconOff}`}>
                      <svg viewBox="0 0 24 24">
                        <path d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z" />
                      </svg>
                    </span>
                  )}
                </div>
              )}
            </span>
          </span>
        </span>
      </div>
    );
  }
);

Switch.displayName = 'Switch';
