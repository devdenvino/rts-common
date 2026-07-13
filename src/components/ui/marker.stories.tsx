import type { Meta, StoryObj } from '@storybook/react';
import { CheckCheckIcon, ClockIcon, InfoIcon } from 'lucide-react';
import { Marker, MarkerContent, MarkerIcon } from './marker';

const meta: Meta<typeof Marker> = {
    title: 'Components/UI/Marker',
    component: Marker,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'separator', 'border'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Marker>;

export const Default: Story = {
    render: (args) => (
        <div className="w-80">
            <Marker {...args}>
                <MarkerContent>Today at 2:34 PM</MarkerContent>
            </Marker>
        </div>
    ),
    args: { variant: 'default' },
};

export const Separator: Story = {
    render: () => (
        <div className="w-80">
            <Marker variant="separator">
                <MarkerContent>Monday, July 14</MarkerContent>
            </Marker>
        </div>
    ),
};

export const Border: Story = {
    render: () => (
        <div className="w-80">
            <Marker variant="border">
                <MarkerContent>Unread messages</MarkerContent>
            </Marker>
        </div>
    ),
};

export const WithIcon: Story = {
    render: () => (
        <div className="w-80">
            <Marker>
                <MarkerIcon><CheckCheckIcon /></MarkerIcon>
                <MarkerContent>Read · 3:15 PM</MarkerContent>
            </Marker>
        </div>
    ),
};

export const TimestampIcon: Story = {
    name: 'Timestamp with Icon',
    render: () => (
        <div className="w-80">
            <Marker>
                <MarkerIcon><ClockIcon /></MarkerIcon>
                <MarkerContent>Delivered 2:34 PM</MarkerContent>
            </Marker>
        </div>
    ),
};

export const InfoSeparator: Story = {
    name: 'Info Separator',
    render: () => (
        <div className="w-80">
            <Marker variant="separator">
                <MarkerIcon><InfoIcon /></MarkerIcon>
                <MarkerContent>Conversation started</MarkerContent>
            </Marker>
        </div>
    ),
};
