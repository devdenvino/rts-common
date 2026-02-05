import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { ChevronRight, Mail, Loader2 } from 'lucide-react';

const meta: Meta<typeof Button> = {
    title: 'Components/AnimateUI/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: [
                'default',
                'destructive',
                'outline',
                'secondary',
                'ghost',
                'link',
                'accent'
            ],
        },
        size: {
            control: 'select',
            options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
        },
        disabled: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: 'Button',
        variant: 'default',
    },
};

export const Secondary: Story = {
    args: {
        children: 'Secondary',
        variant: 'secondary',
    },
};

export const Destructive: Story = {
    args: {
        children: 'Destructive',
        variant: 'destructive',
    },
};

export const Outline: Story = {
    args: {
        children: 'Outline',
        variant: 'outline',
    },
};

export const Ghost: Story = {
    args: {
        children: 'Ghost',
        variant: 'ghost',
    },
};

export const Link: Story = {
    args: {
        children: 'Link',
        variant: 'link',
    },
};

export const Accent: Story = {
    args: {
        children: 'Accent',
        variant: 'accent'
    }
}

export const WithIcon: Story = {
    args: {
        children: (
            <>
                <Mail className="mr-2 h-4 w-4" /> Login with Email
            </>
        ),
    },
};

export const IconOnly: Story = {
    args: {
        size: 'icon',
        children: <ChevronRight className="h-4 w-4" />
    }
}

export const Loading: Story = {
    args: {
        disabled: true,
        children: (
            <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
            </>
        ),
    },
};
