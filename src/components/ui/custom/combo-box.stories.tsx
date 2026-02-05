import type { Meta, StoryObj } from '@storybook/react';
import ComboBox, { SelectOption } from './combo-box';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

const meta: Meta<typeof ComboBox> = {
    title: 'Components/Custom/ComboBox',
    component: ComboBox,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ComboBox>;

const frameworks: SelectOption[] = [
    { id: 'next.js', value: 'Next.js' },
    { id: 'sveltekit', value: 'SvelteKit' },
    { id: 'nuxt.js', value: 'Nuxt.js' },
    { id: 'remix', value: 'Remix' },
    { id: 'astro', value: 'Astro' },
];

const ComboBoxWrapper = (props: Partial<React.ComponentProps<typeof ComboBox>>) => {
    const form = useForm({
        defaultValues: {
            framework: '',
        },
    });

    const onSubmit = (data: any) => {
        toast('You submitted the following values:', {
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
    };

    return (
        <div className="space-y-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-2/3">
                <ComboBox
                    form={form}
                    name="framework"
                    label="Framework"
                    options={frameworks}
                    description="Select your favorite framework."
                    {...props}
                />
                <Button type="submit">Submit</Button>
            </form>
            <Toaster />
        </div>
    );
};

export const Default: Story = {
    render: () => <ComboBoxWrapper />,
};

export const WithSearchCallback: Story = {
    render: () => (
        <ComboBoxWrapper
            onSearch={(query) => console.log('Searching for:', query)}
            onSelect={(option) => console.log('Selected:', option)}
        />
    ),
};

export const Disabled: Story = {
    render: () => <ComboBoxWrapper disabled />,
};
