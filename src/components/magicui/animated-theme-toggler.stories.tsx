import type { Meta, StoryObj } from '@storybook/react';
import { AnimatedThemeToggler } from './animated-theme-toggler';

const meta: Meta<typeof AnimatedThemeToggler> = {
    title: 'Components/MagicUI/AnimatedThemeToggler',
    component: AnimatedThemeToggler,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AnimatedThemeToggler>;

export const Default: Story = {
    render: () => (
        <div className="flex items-center justify-center p-10">
            <AnimatedThemeToggler />
        </div>
    ),
};
