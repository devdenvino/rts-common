import React from 'react';
import { dialogStore } from './store';

export interface DialogProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  content?: React.ReactNode; // Alias for children for consistency
  cancelButtonText?: string;
  actionButtonText?: string;
  hideActions?: boolean;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const dialog = (props: DialogProps): Promise<boolean> => {
    return new Promise((resolve) => {
        const id = generateId();
        dialogStore.addDialog({
            id,
            type: 'dialog',
            title: props.title,
            description: props.description,
            content: props.children || props.content,
            actionButtonText: props.actionButtonText,
            cancelButtonText: props.cancelButtonText,
            hideActions: props.hideActions,
            resolve: (result) => resolve(result),
        });
    });
};


