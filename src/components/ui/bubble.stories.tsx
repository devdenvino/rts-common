import type { Meta, StoryObj } from '@storybook/react';
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from './bubble';

const meta: Meta<typeof Bubble> = {
    title: 'Components/UI/Bubble',
    component: Bubble,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'secondary', 'muted', 'tinted', 'outline', 'ghost', 'destructive'],
        },
        align: {
            control: 'select',
            options: ['start', 'end'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Bubble>;

export const Default: Story = {
    render: (args) => (
        <Bubble {...args}>
            <BubbleContent>Hello, how are you?</BubbleContent>
        </Bubble>
    ),
    args: { variant: 'default', align: 'start' },
};

export const Sent: Story = {
    name: 'Sent (end align)',
    render: () => (
        <Bubble variant="default" align="end">
            <BubbleContent>Yes, I'll be there at 3pm!</BubbleContent>
        </Bubble>
    ),
};

export const Received: Story = {
    name: 'Received (muted)',
    render: () => (
        <Bubble variant="muted">
            <BubbleContent>Hey! Are you coming today?</BubbleContent>
        </Bubble>
    ),
};

export const Tinted: Story = {
    render: () => (
        <Bubble variant="tinted">
            <BubbleContent>Great news everyone! 🎉</BubbleContent>
        </Bubble>
    ),
};

export const Outline: Story = {
    render: () => (
        <Bubble variant="outline">
            <BubbleContent>System notification</BubbleContent>
        </Bubble>
    ),
};

export const Ghost: Story = {
    render: () => (
        <Bubble variant="ghost">
            <BubbleContent>This is a ghost message with no background</BubbleContent>
        </Bubble>
    ),
};

export const Destructive: Story = {
    render: () => (
        <Bubble variant="destructive">
            <BubbleContent>Message delivery failed</BubbleContent>
        </Bubble>
    ),
};

export const WithReactions: Story = {
    render: () => (
        <Bubble variant="tinted">
            <BubbleContent>Great news everyone!</BubbleContent>
            <BubbleReactions>
                <span>👍</span>
                <span>3</span>
            </BubbleReactions>
        </Bubble>
    ),
};

export const Conversation: Story = {
    name: 'Conversation Thread',
    render: () => (
        <div className="flex w-80 flex-col gap-2 p-4">
            <BubbleGroup>
                <Bubble variant="muted">
                    <BubbleContent>Hello! How can I help you today?</BubbleContent>
                </Bubble>
                <Bubble variant="muted">
                    <BubbleContent>Feel free to ask anything.</BubbleContent>
                </Bubble>
            </BubbleGroup>
            <BubbleGroup>
                <Bubble variant="default" align="end">
                    <BubbleContent>I have a question about my order.</BubbleContent>
                </Bubble>
            </BubbleGroup>
            <BubbleGroup>
                <Bubble variant="muted">
                    <BubbleContent>Sure! What's your order number?</BubbleContent>
                </Bubble>
            </BubbleGroup>
        </div>
    ),
};
