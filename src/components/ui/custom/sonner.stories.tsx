import type { Meta, StoryObj } from '@storybook/react';
import { Toaster } from './sonner';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const meta: Meta<typeof Toaster> = {
    title: 'Components/Custom/Toaster',
    component: Toaster,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
    render: () => (
        <div className="flex flex-col gap-4 items-start">
            <Toaster />
            <Button
                variant="outline"
                onClick={() =>
                    toast('Event has been created', {
                        description: 'Sunday, December 03, 2023 at 9:00 AM',
                        action: {
                            label: 'Undo',
                            onClick: () => console.log('Undo'),
                        },
                    })
                }
            >
                Show Toast
            </Button>

            <Button
                variant="default"
                onClick={() => toast.success('Event has been created')}
            >
                Show Success
            </Button>

            <Button
                variant="destructive"
                onClick={() => toast.error('Something went wrong')}
            >
                Show Error
            </Button>

            <Button
                variant="secondary"
                onClick={() => toast.info('New updates available')}
            >
                Show Info
            </Button>

            <Button
                variant="ghost"
                onClick={() => toast.warning('Your session is about to expire')}
            >
                Show Warning
            </Button>
        </div>
    ),
};
