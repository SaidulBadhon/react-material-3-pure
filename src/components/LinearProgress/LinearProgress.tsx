// LinearProgress.tsx
import { forwardRef } from 'react';
import styles from './LinearProgress.module.css';

export interface LinearProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Progress to display, a fraction between 0 and `max`.
   */
  value?: number;

  /**
   * Maximum progress to display, defaults to 1.
   */
  max?: number;

  /**
   * Whether or not to display indeterminate progress, which gives no indication
   * to how long an activity will take.
   */
  indeterminate?: boolean;

  /**
   * Whether or not to render indeterminate mode using 4 colors instead of one.
   */
  fourColor?: boolean;

  /**
   * Buffer amount to display, a fraction between 0 and `max`.
   * If the value is 0 or negative, the buffer is not displayed.
   */
  buffer?: number;

  'aria-label'?: string;
}

export const LinearProgress = forwardRef<HTMLDivElement, LinearProgressProps>(
  (
    {
      value = 0,
      max = 1,
      indeterminate = false,
      fourColor = false,
      buffer = 0,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const progressValue = indeterminate ? 1 : value / max;
    const progressStyles = {
      transform: `scaleX(${progressValue * 100}%)`,
    };

    const bufferValue = buffer ?? 0;
    const hasBuffer = bufferValue > 0;
    const dotSize = indeterminate || !hasBuffer ? 1 : bufferValue / max;
    const dotStyles = {
      transform: `scaleX(${dotSize * 100}%)`,
    };

    const hideDots =
      indeterminate || !hasBuffer || bufferValue >= max || value >= max;

    return (
      <div
        ref={ref}
        className={`${styles.progress} ${indeterminate ? styles.indeterminate : ''} ${fourColor ? styles.fourColor : ''} ${className || ''}`.trim()}
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : value}
        {...props}
      >
        <div className={styles.dots} hidden={hideDots}></div>
        <div className={styles.inactiveTrack} style={dotStyles}></div>
        <div className={`${styles.bar} ${styles.primaryBar}`} style={progressStyles}>
          <div className={styles.barInner}></div>
        </div>
        <div className={`${styles.bar} ${styles.secondaryBar}`}>
          <div className={styles.barInner}></div>
        </div>
      </div>
    );
  }
);

LinearProgress.displayName = 'LinearProgress';
