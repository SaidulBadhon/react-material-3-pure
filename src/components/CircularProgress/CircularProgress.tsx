// CircularProgress.tsx
import { forwardRef } from 'react';
import styles from './CircularProgress.module.css';

export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
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

  'aria-label'?: string;
}

export const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  (
    {
      value = 0,
      max = 1,
      indeterminate = false,
      fourColor = false,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const dashOffset = (1 - value / max) * 100;

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
        {indeterminate ? (
          <div className={styles.spinner}>
            <div className={styles.left}>
              <div className={styles.circle}></div>
            </div>
            <div className={styles.right}>
              <div className={styles.circle}></div>
            </div>
          </div>
        ) : (
          <svg viewBox="0 0 4800 4800">
            <circle className={styles.track} pathLength={100}></circle>
            <circle
              className={styles.activeTrack}
              pathLength={100}
              strokeDashoffset={dashOffset}
            ></circle>
          </svg>
        )}
      </div>
    );
  }
);

CircularProgress.displayName = 'CircularProgress';
