import type { Meta, StoryObj } from '@storybook/react';
import { TypingAnimation } from './typing-animation';

const meta: Meta<typeof TypingAnimation> = {
    title: 'Components/MagicUI/TypingAnimation',
    component: TypingAnimation,
    tags: ['autodocs'],
    argTypes: {
        duration: { control: { type: 'range', min: 10, max: 500, step: 10 } },
        delay: { control: { type: 'number' } },
        startOnView: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof TypingAnimation>;

export const Default: Story = {
    args: {
        children: 'Typing Animation',
        className: 'text-4xl font-bold text-foreground',
        duration: 100,
    },
};

export const Fast: Story = {
    args: {
        children: 'Fast Typing Animation',
        className: 'text-4xl font-bold text-foreground',
        duration: 20,
    },
};
