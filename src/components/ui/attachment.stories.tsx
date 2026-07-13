import type { Meta, StoryObj } from '@storybook/react';
import {
    FileIcon,
    FileTextIcon,
    ImageIcon,
    XIcon,
    DownloadIcon,
    AlertCircleIcon,
} from 'lucide-react';
import {
    Attachment,
    AttachmentGroup,
    AttachmentMedia,
    AttachmentContent,
    AttachmentTitle,
    AttachmentDescription,
    AttachmentActions,
    AttachmentAction,
    AttachmentTrigger,
} from './attachment';
import { Spinner } from './spinner';

const meta: Meta<typeof Attachment> = {
    title: 'Components/UI/Attachment',
    component: Attachment,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    argTypes: {
        state: {
            control: 'select',
            options: ['idle', 'uploading', 'processing', 'error', 'done'],
        },
        size: {
            control: 'select',
            options: ['default', 'sm', 'xs'],
        },
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Attachment>;

export const Default: Story = {
    render: (args) => (
        <Attachment {...args}>
            <AttachmentMedia>
                <FileIcon />
            </AttachmentMedia>
            <AttachmentContent>
                <AttachmentTitle>document.pdf</AttachmentTitle>
                <AttachmentDescription>2.4 MB · PDF</AttachmentDescription>
            </AttachmentContent>
        </Attachment>
    ),
    args: { state: 'done', size: 'default', orientation: 'horizontal' },
};

export const WithActions: Story = {
    render: () => (
        <Attachment>
            <AttachmentMedia>
                <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
                <AttachmentTitle>report.docx</AttachmentTitle>
                <AttachmentDescription>1.2 MB · Word</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
                <AttachmentAction aria-label="Download">
                    <DownloadIcon />
                </AttachmentAction>
                <AttachmentAction aria-label="Remove">
                    <XIcon />
                </AttachmentAction>
            </AttachmentActions>
        </Attachment>
    ),
};

export const Uploading: Story = {
    render: () => (
        <Attachment state="uploading">
            <AttachmentMedia>
                <Spinner />
            </AttachmentMedia>
            <AttachmentContent>
                <AttachmentTitle>uploading.zip</AttachmentTitle>
                <AttachmentDescription>Uploading…</AttachmentDescription>
            </AttachmentContent>
        </Attachment>
    ),
};

export const Processing: Story = {
    render: () => (
        <Attachment state="processing">
            <AttachmentMedia>
                <Spinner />
            </AttachmentMedia>
            <AttachmentContent>
                <AttachmentTitle>processing-data.csv</AttachmentTitle>
                <AttachmentDescription>Processing…</AttachmentDescription>
            </AttachmentContent>
        </Attachment>
    ),
};

export const ErrorState: Story = {
    name: 'Error',
    render: () => (
        <Attachment state="error">
            <AttachmentMedia>
                <AlertCircleIcon />
            </AttachmentMedia>
            <AttachmentContent>
                <AttachmentTitle>failed-upload.pdf</AttachmentTitle>
                <AttachmentDescription>Upload failed. Try again.</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
                <AttachmentAction aria-label="Remove">
                    <XIcon />
                </AttachmentAction>
            </AttachmentActions>
        </Attachment>
    ),
};

export const SmallSize: Story = {
    render: () => (
        <Attachment size="sm">
            <AttachmentMedia>
                <FileIcon />
            </AttachmentMedia>
            <AttachmentContent>
                <AttachmentTitle>notes.txt</AttachmentTitle>
                <AttachmentDescription>4 KB</AttachmentDescription>
            </AttachmentContent>
        </Attachment>
    ),
};

export const Clickable: Story = {
    render: () => (
        <Attachment>
            <AttachmentTrigger onClick={() => alert('Open file')} aria-label="Open file" />
            <AttachmentMedia>
                <FileIcon />
            </AttachmentMedia>
            <AttachmentContent>
                <AttachmentTitle>contract.pdf</AttachmentTitle>
                <AttachmentDescription>Click to preview</AttachmentDescription>
            </AttachmentContent>
        </Attachment>
    ),
};

export const ImageVertical: Story = {
    name: 'Image (Vertical)',
    render: () => (
        <Attachment orientation="vertical">
            <AttachmentMedia variant="image">
                <ImageIcon className="size-6" />
            </AttachmentMedia>
            <AttachmentContent>
                <AttachmentTitle>photo.jpg</AttachmentTitle>
            </AttachmentContent>
        </Attachment>
    ),
};

export const GroupedAttachments: Story = {
    name: 'Group',
    render: () => (
        <AttachmentGroup>
            {['document.pdf', 'spreadsheet.xlsx', 'notes.txt'].map((name) => (
                <Attachment key={name}>
                    <AttachmentMedia>
                        <FileIcon />
                    </AttachmentMedia>
                    <AttachmentContent>
                        <AttachmentTitle>{name}</AttachmentTitle>
                        <AttachmentDescription>Ready</AttachmentDescription>
                    </AttachmentContent>
                    <AttachmentActions>
                        <AttachmentAction aria-label="Remove">
                            <XIcon />
                        </AttachmentAction>
                    </AttachmentActions>
                </Attachment>
            ))}
        </AttachmentGroup>
    ),
};
