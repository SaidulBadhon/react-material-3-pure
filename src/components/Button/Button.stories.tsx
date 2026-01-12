import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['filled', 'outlined', 'text', 'elevated', 'tonal'],
        },
        disabled: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Filled: Story = {
    args: {
        variant: 'filled',
        children: 'Filled',
    },
};

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        children: 'Outlined',
    },
};

export const Text: Story = {
    args: {
        variant: 'text',
        children: 'Text',
    },
};

export const Elevated: Story = {
    args: {
        variant: 'elevated',
        children: 'Elevated',
    },
};

export const Tonal: Story = {
    args: {
        variant: 'tonal',
        children: 'Tonal',
    },
};

export const WithIcon: Story = {
    args: {
        variant: 'filled',
        children: 'With Icon',
        startIcon: <span style={{ fontSize: '18px', display: 'flex' }}>+</span>, /* Simple plus icon */
    },
};

export const Disabled: Story = {
    args: {
        variant: 'filled',
        children: 'Disabled',
        disabled: true,
    },
};
