import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
    title: 'Components/Custom/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
        checked: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    render: (args) => (
        <div className="flex items-center space-x-2">
            <Checkbox id="terms" {...args} />
            <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
    ),
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
    render: (args) => (
        <div className="flex items-center space-x-2">
            <Checkbox id="disabled" {...args} />
            <Label htmlFor="disabled">Disabled Checkbox</Label>
        </div>
    ),
};

export const CheckedDisabled: Story = {
    args: {
        checked: true,
        disabled: true,
    },
    render: (args) => (
        <div className="flex items-center space-x-2">
            <Checkbox id="checked-disabled" {...args} />
            <Label htmlFor="checked-disabled">Checked & Disabled</Label>
        </div>
    ),
};

export const Interactive: Story = {
    render: () => {
        const [checked, setChecked] = useState<boolean | 'indeterminate'>(false);
        return (
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="interactive"
                    checked={checked}
                    onCheckedChange={setChecked}
                />
                <Label htmlFor="interactive">
                    Interactive State: {checked === true ? 'Checked' : 'Unchecked'}
                </Label>
            </div>
        )
    }
}
