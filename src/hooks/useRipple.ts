import { useState, useCallback } from 'react';

export interface Ripple {
    x: number;
    y: number;
    size: number;
    key: number;
}

// Optimization: Reuse the same array if empty to reduce GC
const NO_RIPPLES: Ripple[] = [];

export function useRipple() {
    const [ripples, setRipples] = useState<Ripple[]>(NO_RIPPLES);

    // Clear ripples that have finished animating
    // In a real optimized lib, we might use onAnimationEnd per ripple,
    // but a timeout is robust enough for a lightweight implementation.
    const cleanupRipple = useCallback((key: number) => {
        setRipples((prev) => prev.filter((r) => r.key !== key));
    }, []);

    const onPointerDown = useCallback((event: React.PointerEvent<HTMLElement>) => {
        const element = event.currentTarget;
        const rect = element.getBoundingClientRect();

        // Calculate ripple size (cover the element)
        const width = rect.width;
        const height = rect.height;
        const size = Math.max(width, height) * 2; // Make sure it covers extending corners

        // Click position relative to element
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const newRipple: Ripple = {
            x,
            y,
            size,
            key: Date.now() + Math.random(),
        };

        setRipples((prev) => [...prev, newRipple]);
    }, []);

    return { ripples, onPointerDown, cleanupRipple };
}
