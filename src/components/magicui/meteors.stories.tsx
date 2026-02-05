import type { Meta, StoryObj } from '@storybook/react';
import { Meteors } from './meteors';

const meta: Meta<typeof Meteors> = {
    title: 'Components/MagicUI/Meteors',
    component: Meteors,
    tags: ['autodocs'],
    argTypes: {
        number: { control: { type: 'range', min: 1, max: 100 } },
    },
};

export default meta;
type Story = StoryObj<typeof Meteors>;

export const Default: Story = {
    render: (args) => (
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
            <Meteors {...args} />
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                Meteors
            </span>
        </div>
    ),
};
