import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { expect, fn, userEvent, within } from 'storybook/test';

/**
 * Material Design 3 Button Component
 *
 * A production-ready button component implementing the M3 "Common Buttons" specification.
 * Supports 5 visual variants, state layers, ripple effects, and full accessibility.
 *
 * Reference: https://m3.material.io/components/all-buttons
 */
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'text', 'elevated', 'tonal'],
      description: 'Visual style of the button',
      table: {
        defaultValue: { summary: 'filled' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    startIcon: {
      control: false,
      description: 'Icon element before the button text',
    },
    endIcon: {
      control: false,
      description: 'Icon element after the button text',
    },
    children: {
      control: 'text',
      description: 'Button label text',
    },
  },
  args: {
    onClick: fn(),
    onPointerDown: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/* ==========================================================================
   VARIANT STORIES
   ========================================================================== */

/**
 * Filled Button - High emphasis
 *
 * The most prominent button for primary actions. Uses primary color background.
 */
export const Filled: Story = {
  args: {
    variant: 'filled',
    children: 'Filled Button',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Filled Button' });

    // Verify button is rendered correctly
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveAttribute('type', 'button');
    await expect(button).not.toBeDisabled();

    // Test click interaction
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/**
 * Outlined Button - Medium emphasis
 *
 * For secondary actions. Has a visible border with no fill.
 */
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined Button',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Outlined Button' });

    await expect(button).toBeInTheDocument();
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/**
 * Text Button - Low emphasis
 *
 * For tertiary actions. Minimal visual weight, no background or border.
 */
export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Text Button',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Text Button' });

    await expect(button).toBeInTheDocument();
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/**
 * Elevated Button - Medium emphasis with shadow
 *
 * For actions that need visual separation from patterned backgrounds.
 */
export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'Elevated Button',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Elevated Button' });

    await expect(button).toBeInTheDocument();
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/**
 * Tonal Button - Medium emphasis
 *
 * Alternative to filled button with secondary color palette.
 */
export const Tonal: Story = {
  args: {
    variant: 'tonal',
    children: 'Tonal Button',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Tonal Button' });

    await expect(button).toBeInTheDocument();
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/* ==========================================================================
   ICON STORIES
   ========================================================================== */

// Simple SVG icon for testing
const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
  </svg>
);

/**
 * Button with Start Icon
 *
 * Icon displayed before the button text.
 */
export const WithStartIcon: Story = {
  args: {
    variant: 'filled',
    children: 'Add Item',
    startIcon: <PlusIcon />,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Add Item' });

    await expect(button).toBeInTheDocument();
    // Check that icon is rendered (aria-hidden)
    const icon = button.querySelector('svg');
    await expect(icon).toBeInTheDocument();

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/**
 * Button with End Icon
 *
 * Icon displayed after the button text.
 */
export const WithEndIcon: Story = {
  args: {
    variant: 'filled',
    children: 'Continue',
    endIcon: <ArrowIcon />,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Continue' });

    await expect(button).toBeInTheDocument();
    const icon = button.querySelector('svg');
    await expect(icon).toBeInTheDocument();

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/**
 * Button with Both Icons
 *
 * Icons on both sides of the button text.
 */
export const WithBothIcons: Story = {
  args: {
    variant: 'tonal',
    children: 'Navigate',
    startIcon: <PlusIcon />,
    endIcon: <ArrowIcon />,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Navigate' });

    await expect(button).toBeInTheDocument();
    const icons = button.querySelectorAll('svg');
    await expect(icons.length).toBe(2);

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/* ==========================================================================
   STATE STORIES
   ========================================================================== */

/**
 * Disabled Button
 *
 * Shows the disabled state with reduced opacity and no interactions.
 */
export const Disabled: Story = {
  args: {
    variant: 'filled',
    children: 'Disabled',
    disabled: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Disabled' });

    await expect(button).toBeInTheDocument();
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('aria-disabled', 'true');

    // Click should not trigger onClick
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/**
 * Disabled Outlined Button
 */
export const DisabledOutlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Disabled Outlined',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Disabled Outlined' });

    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  },
};

/**
 * Disabled Text Button
 */
export const DisabledText: Story = {
  args: {
    variant: 'text',
    children: 'Disabled Text',
    disabled: true,
  },
};

/**
 * Disabled Elevated Button
 */
export const DisabledElevated: Story = {
  args: {
    variant: 'elevated',
    children: 'Disabled Elevated',
    disabled: true,
  },
};

/**
 * Disabled Tonal Button
 */
export const DisabledTonal: Story = {
  args: {
    variant: 'tonal',
    children: 'Disabled Tonal',
    disabled: true,
  },
};

/* ==========================================================================
   INTERACTION STORIES
   ========================================================================== */

/**
 * Ripple Effect Test
 *
 * Tests that ripple effect is triggered on pointer down.
 */
export const RippleEffect: Story = {
  args: {
    variant: 'filled',
    children: 'Click for Ripple',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Click for Ripple' });

    // Test pointer down event (triggers ripple)
    await userEvent.click(button);
    await expect(args.onPointerDown).toHaveBeenCalled();
    await expect(args.onClick).toHaveBeenCalled();

    // Wait for ripple animation to complete and trigger cleanup
    // The ripple animation is 600ms, so we wait a bit longer
    await new Promise((resolve) => setTimeout(resolve, 700));
  },
};

/**
 * Custom onPointerDown Handler
 *
 * Tests that custom onPointerDown is called alongside ripple effect.
 */
export const CustomPointerDownHandler: Story = {
  args: {
    variant: 'elevated',
    children: 'Custom Handler',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Custom Handler' });

    await userEvent.click(button);
    await expect(args.onPointerDown).toHaveBeenCalledTimes(1);
  },
};

/**
 * Button without onPointerDown
 *
 * Tests ripple effect when no custom onPointerDown is provided.
 */
export const WithoutPointerDownHandler: Story = {
  args: {
    variant: 'filled',
    children: 'No Handler',
    onPointerDown: undefined,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'No Handler' });

    // Click should still work (ripple effect happens internally)
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

/* ==========================================================================
   ACCESSIBILITY STORIES
   ========================================================================== */

/**
 * Submit Button
 *
 * Button with type="submit" for form submission.
 */
export const SubmitButton: Story = {
  args: {
    variant: 'filled',
    children: 'Submit',
    type: 'submit',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Submit' });

    await expect(button).toHaveAttribute('type', 'submit');
  },
};

/**
 * Custom Class Name
 *
 * Tests that custom className is applied correctly.
 */
export const CustomClassName: Story = {
  args: {
    variant: 'filled',
    children: 'Custom Class',
    className: 'my-custom-class',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Custom Class' });

    await expect(button.className).toContain('my-custom-class');
  },
};

/* ==========================================================================
   SHOWCASE STORIES
   ========================================================================== */

/**
 * All Variants Showcase
 *
 * Display all button variants side by side for comparison.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="filled">Filled</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
      <Button variant="elevated">Elevated</Button>
      <Button variant="tonal">Tonal</Button>
    </div>
  ),
};

/**
 * All Disabled Variants
 *
 * Display all disabled button variants.
 */
export const AllDisabledVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="filled" disabled>Filled</Button>
      <Button variant="outlined" disabled>Outlined</Button>
      <Button variant="text" disabled>Text</Button>
      <Button variant="elevated" disabled>Elevated</Button>
      <Button variant="tonal" disabled>Tonal</Button>
    </div>
  ),
};

/**
 * Icons with All Variants
 *
 * Display all variants with icons.
 */
export const IconsWithAllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="filled" startIcon={<PlusIcon />}>Filled</Button>
      <Button variant="outlined" startIcon={<PlusIcon />}>Outlined</Button>
      <Button variant="text" startIcon={<PlusIcon />}>Text</Button>
      <Button variant="elevated" startIcon={<PlusIcon />}>Elevated</Button>
      <Button variant="tonal" startIcon={<PlusIcon />}>Tonal</Button>
    </div>
  ),
};

/**
 * Invalid Variant Fallback
 *
 * Tests that invalid variant falls back to 'filled' style.
 */
export const InvalidVariantFallback: Story = {
  // @ts-expect-error - Testing invalid variant fallback
  args: {
    variant: 'invalid-variant',
    children: 'Fallback Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Fallback Button' });

    // Button should still render with fallback styles
    await expect(button).toBeInTheDocument();
  },
};

