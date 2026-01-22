import React from "react";
import { dialogStore } from "./store";

export interface AlertProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  cancelButtonText?: string;
  actionButtonText?: string;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const confirm = (props: AlertProps): Promise<boolean> => {
    return new Promise((resolve) => {
        const id = generateId();
        dialogStore.addDialog({
            id,
            type: 'confirm',
            ...props,
            resolve: (result) => resolve(result),
        });
    });
};

export const alert = (props: AlertProps): Promise<void> => {
    return new Promise((resolve) => {
        const id = generateId();
         dialogStore.addDialog({
            id,
            type: 'alert',
            ...props,
            resolve: () => resolve(),
        });
    });
};


