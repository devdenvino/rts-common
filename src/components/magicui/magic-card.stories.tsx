import type { Meta, StoryObj } from '@storybook/react';
import { MagicCard } from './magic-card';
import { useTheme } from '@/components/shared/theme';

const meta: Meta<typeof MagicCard> = {
    title: 'Components/MagicUI/MagicCard',
    component: MagicCard,
    tags: ['autodocs'],
    argTypes: {
        gradientSize: { control: { type: 'range', min: 0, max: 1000, step: 10 } },
        gradientColor: { control: 'color' },
        gradientOpacity: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    },
};

export default meta;
type Story = StoryObj<typeof MagicCard>;

const CardGrid = (props: React.ComponentProps<typeof MagicCard>) => {
    const { theme } = useTheme();
    return (
        <div
            className={
                "flex h-[500px] w-full flex-col gap-4 lg:h-[250px] lg:flex-row"
            }
        >
            <MagicCard
                className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl"
                gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                {...props}
            >
                Card 1
            </MagicCard>
            <MagicCard
                className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl"
                gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                {...props}
            >
                Card 2
            </MagicCard>
        </div>
    );
}


export const Default: Story = {
    render: (args) => <CardGrid {...args} />,
};

export const CustomGradient: Story = {
    args: {
        gradientColor: "#ff0000",
        gradientOpacity: 0.5
    },
    render: (args) => <CardGrid {...args} />
}
