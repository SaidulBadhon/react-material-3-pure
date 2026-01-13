// List.tsx
import { forwardRef, ReactNode, useRef, useCallback } from 'react';
import styles from './List.module.css';

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * List items as children.
   */
  children?: ReactNode;
}

export const List = forwardRef<HTMLUListElement, ListProps>(
  ({ children, className, ...props }, ref) => {
    const listRef = useRef<HTMLUListElement>(null);

    const activateNextItem = useCallback(() => {
      // Logic for activating next item
      // Would need to be implemented based on requirements
    }, []);

    const activatePreviousItem = useCallback(() => {
      // Logic for activating previous item
      // Would need to be implemented based on requirements
    }, []);

    return (
      <ul
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          listRef.current = node;
        }}
        role="list"
        className={`${styles.list} ${className || ''}`.trim()}
        {...props}
      >
        {children}
      </ul>
    );
  }
);

List.displayName = 'List';
