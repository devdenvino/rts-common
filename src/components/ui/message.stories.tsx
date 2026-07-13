import type { Meta, StoryObj } from '@storybook/react';
import {
    Message,
    MessageAvatar,
    MessageContent,
    MessageGroup,
    MessageHeader,
    MessageFooter,
} from './message';
import { Bubble, BubbleContent, BubbleGroup } from './bubble';
import { Marker, MarkerContent } from './marker';

const meta: Meta<typeof Message> = {
    title: 'Components/UI/Message',
    component: Message,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
    argTypes: {
        align: {
            control: 'select',
            options: ['start', 'end'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Message>;

const AvatarPlaceholder = ({ name }: { name: string }) => (
    <div
        className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground"
        aria-label={name}
    >
        {name[0]}
    </div>
);

export const Received: Story = {
    name: 'Received Message',
    render: () => (
        <Message>
            <MessageAvatar>
                <AvatarPlaceholder name="Alice" />
            </MessageAvatar>
            <MessageContent>
                <MessageHeader>Alice · 2:30 PM</MessageHeader>
                <Bubble variant="muted">
                    <BubbleContent>Hey! Are you coming today?</BubbleContent>
                </Bubble>
            </MessageContent>
        </Message>
    ),
};

export const Sent: Story = {
    name: 'Sent Message',
    render: () => (
        <Message align="end">
            <MessageContent>
                <Bubble variant="default" align="end">
                    <BubbleContent>Yes, I'll be there at 3pm!</BubbleContent>
                </Bubble>
                <MessageFooter>Read · 3:15 PM</MessageFooter>
            </MessageContent>
        </Message>
    ),
};

export const WithFooter: Story = {
    render: () => (
        <Message>
            <MessageAvatar>
                <AvatarPlaceholder name="Bob" />
            </MessageAvatar>
            <MessageContent>
                <Bubble variant="muted">
                    <BubbleContent>This was delivered successfully.</BubbleContent>
                </Bubble>
                <MessageFooter>Delivered · 4:00 PM</MessageFooter>
            </MessageContent>
        </Message>
    ),
};

export const GroupedMessages: Story = {
    name: 'Grouped Messages',
    render: () => (
        <MessageGroup>
            <Message>
                <MessageAvatar>
                    <AvatarPlaceholder name="Alice" />
                </MessageAvatar>
                <MessageContent>
                    <MessageHeader>Alice</MessageHeader>
                    <BubbleGroup>
                        <Bubble variant="muted">
                            <BubbleContent>Hello there!</BubbleContent>
                        </Bubble>
                        <Bubble variant="muted">
                            <BubbleContent>How can I help you?</BubbleContent>
                        </Bubble>
                    </BubbleGroup>
                </MessageContent>
            </Message>
        </MessageGroup>
    ),
};

export const FullConversation: Story = {
    name: 'Full Conversation',
    render: () => (
        <div className="flex w-full max-w-lg flex-col gap-6 p-4">
            <Marker variant="separator">
                <MarkerContent>Today</MarkerContent>
            </Marker>

            <MessageGroup>
                <Message>
                    <MessageAvatar>
                        <AvatarPlaceholder name="Alice" />
                    </MessageAvatar>
                    <MessageContent>
                        <MessageHeader>Alice</MessageHeader>
                        <BubbleGroup>
                            <Bubble variant="muted">
                                <BubbleContent>Hey there! 👋</BubbleContent>
                            </Bubble>
                            <Bubble variant="muted">
                                <BubbleContent>Do you have a moment to chat?</BubbleContent>
                            </Bubble>
                        </BubbleGroup>
                    </MessageContent>
                </Message>
            </MessageGroup>

            <MessageGroup>
                <Message align="end">
                    <MessageContent>
                        <BubbleGroup>
                            <Bubble align="end">
                                <BubbleContent>Sure! What's up?</BubbleContent>
                            </Bubble>
                        </BubbleGroup>
                        <MessageFooter>Read · 2:31 PM</MessageFooter>
                    </MessageContent>
                </Message>
            </MessageGroup>

            <MessageGroup>
                <Message>
                    <MessageAvatar>
                        <AvatarPlaceholder name="Alice" />
                    </MessageAvatar>
                    <MessageContent>
                        <MessageHeader>Alice</MessageHeader>
                        <Bubble variant="muted">
                            <BubbleContent>I wanted to ask about the project deadline.</BubbleContent>
                        </Bubble>
                    </MessageContent>
                </Message>
            </MessageGroup>
        </div>
    ),
};
