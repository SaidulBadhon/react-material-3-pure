import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['filled', 'outlined', 'text'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Filled: Story = {
    args: {
        variant: 'filled',
        children: 'Filled Button',
    },
};

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        children: 'Outlined Button',
    },
};

export const Text: Story = {
    args: {
        variant: 'text',
        children: 'Text Button',
    },
};
