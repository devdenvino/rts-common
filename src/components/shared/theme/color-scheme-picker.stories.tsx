import type { Meta, StoryObj } from '@storybook/react';
import { ColorSchemePicker } from './color-scheme-picker';

const meta: Meta<typeof ColorSchemePicker> = {
    title: 'Components/Theme/ColorSchemePicker',
    component: ColorSchemePicker,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    argTypes: {
        variant: {
            control: 'select',
            options: ['ghost', 'outline', 'secondary', 'default'],
        },
        size: {
            control: 'select',
            options: ['icon', 'sm', 'default'],
        },
        align: {
            control: 'select',
            options: ['start', 'center', 'end'],
        },
        side: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof ColorSchemePicker>;

export const Default: Story = {
    args: {
        variant: 'ghost',
        size: 'icon',
        align: 'end',
    },
};

export const OutlineVariant: Story = {
    args: {
        variant: 'outline',
        size: 'icon',
        align: 'end',
    },
};

export const InToolbar: Story = {
    name: 'In Toolbar',
    render: () => (
        <div className="flex items-center gap-2 rounded-lg border px-3 py-2 shadow-sm">
            <span className="text-sm font-medium text-muted-foreground">Theme</span>
            <ColorSchemePicker variant="ghost" size="icon" />
        </div>
    ),
};

export const AlignStart: Story = {
    name: 'Popover Aligned Start',
    args: {
        align: 'start',
    },
};
