import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
    MessageScroller,
    MessageScrollerButton,
    MessageScrollerContent,
    MessageScrollerItem,
    MessageScrollerProvider,
    MessageScrollerViewport,
} from './message-scroller';
import { Message, MessageContent } from './message';
import { Bubble, BubbleContent } from './bubble';
import { Marker, MarkerContent } from './marker';

const SAMPLE_MESSAGES = [
    { id: '1', text: 'Hey! How are you doing?', align: 'start' as const },
    { id: '2', text: 'Doing great, thanks for asking!', align: 'end' as const },
    { id: '3', text: 'Did you see the latest update?', align: 'start' as const },
    { id: '4', text: 'Yes! It looks amazing. The new components are really useful.', align: 'end' as const },
    { id: '5', text: 'Agreed! The message scroller especially makes it so easy to build chat UIs.', align: 'start' as const },
    { id: '6', text: "I've already integrated it into our project.", align: 'end' as const },
    { id: '7', text: 'How long did it take?', align: 'start' as const },
    { id: '8', text: 'Just a few hours! The API is very clean.', align: 'end' as const },
    { id: '9', text: 'That\'s impressive. Can\'t wait to try it myself.', align: 'start' as const },
    { id: '10', text: 'You should! Let me know if you need any help.', align: 'end' as const },
];

const meta: Meta<typeof MessageScroller> = {
    title: 'Components/UI/MessageScroller',
    component: MessageScroller,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof MessageScroller>;

export const Default: Story = {
    render: () => (
        <div className="h-96 w-full max-w-lg border rounded-lg overflow-hidden">
            <MessageScrollerProvider>
                <MessageScroller>
                    <MessageScrollerViewport>
                        <MessageScrollerContent>
                            <Marker variant="separator">
                                <MarkerContent>Today</MarkerContent>
                            </Marker>
                            {SAMPLE_MESSAGES.map((msg, i) => (
                                <MessageScrollerItem
                                    key={msg.id}
                                    scrollAnchor={i === SAMPLE_MESSAGES.length - 1}
                                >
                                    <Message align={msg.align}>
                                        <MessageContent>
                                            <Bubble
                                                variant={msg.align === 'end' ? 'default' : 'muted'}
                                                align={msg.align}
                                            >
                                                <BubbleContent>{msg.text}</BubbleContent>
                                            </Bubble>
                                        </MessageContent>
                                    </Message>
                                </MessageScrollerItem>
                            ))}
                        </MessageScrollerContent>
                    </MessageScrollerViewport>
                    <MessageScrollerButton />
                </MessageScroller>
            </MessageScrollerProvider>
        </div>
    ),
};

export const LiveChat: Story = {
    name: 'Live Chat (add messages)',
    render: () => {
        const [messages, setMessages] = React.useState(SAMPLE_MESSAGES.slice(0, 3));
        const [input, setInput] = React.useState('');

        const sendMessage = () => {
            if (!input.trim()) return;
            setMessages((prev) => [
                ...prev,
                { id: String(Date.now()), text: input, align: 'end' },
            ]);
            setInput('');
        };

        return (
            <div className="flex h-112 w-full max-w-lg flex-col border rounded-lg overflow-hidden">
                <div className="flex-1 min-h-0">
                    <MessageScrollerProvider>
                        <MessageScroller>
                            <MessageScrollerViewport>
                                <MessageScrollerContent>
                                    {messages.map((msg, i) => (
                                        <MessageScrollerItem
                                            key={msg.id}
                                            scrollAnchor={i === messages.length - 1}
                                        >
                                            <Message align={msg.align}>
                                                <MessageContent>
                                                    <Bubble
                                                        variant={msg.align === 'end' ? 'default' : 'muted'}
                                                        align={msg.align}
                                                    >
                                                        <BubbleContent>{msg.text}</BubbleContent>
                                                    </Bubble>
                                                </MessageContent>
                                            </Message>
                                        </MessageScrollerItem>
                                    ))}
                                </MessageScrollerContent>
                            </MessageScrollerViewport>
                            <MessageScrollerButton />
                        </MessageScroller>
                    </MessageScrollerProvider>
                </div>
                <div className="flex gap-2 border-t p-2">
                    <input
                        className="flex-1 rounded border px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-ring"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a message…"
                    />
                    <button
                        className="rounded bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90"
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        );
    },
};
