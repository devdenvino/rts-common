import type { Meta, StoryObj } from '@storybook/react';
import { Icons } from './icons';

const meta: Meta = {
    title: 'Components/Custom/Icons',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Gallery: Story = {
    render: () => (
        <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8">
            {Object.entries(Icons).map(([name, Icon]) => (
                <div
                    key={name}
                    className="flex flex-col items-center justify-center gap-2 rounded-md border p-4 hover:bg-muted"
                >
                    <Icon className="h-6 w-6" />
                    <span className="text-xs text-muted-foreground">{name}</span>
                </div>
            ))}
        </div>
    ),
};
