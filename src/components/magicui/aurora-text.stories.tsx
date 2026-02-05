import type { Meta, StoryObj } from '@storybook/react';
import { AuroraText } from './aurora-text';

const meta: Meta<typeof AuroraText> = {
    title: 'Components/MagicUI/AuroraText',
    component: AuroraText,
    tags: ['autodocs'],
    argTypes: {
        speed: { control: { type: 'range', min: 0.1, max: 2, step: 0.1 } },
    },
};

export default meta;
type Story = StoryObj<typeof AuroraText>;

export const Default: Story = {
    args: {
        children: 'Aurora Text Effect',
    },
    render: (args) => (
        <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
            <AuroraText {...args}>{args.children}</AuroraText>
        </h1>
    ),
};

export const CustomColors: Story = {
    args: {
        children: 'Custom Colors',
        colors: ['#ff0000', '#00ff00', '#0000ff'],
    },
    render: (args) => (
        <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
            <AuroraText {...args}>{args.children}</AuroraText>
        </h1>
    ),
};
