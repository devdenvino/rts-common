
type DialogType = 'alert' | 'confirm' | 'dialog';

export interface DialogOptions {
  id: string;
  type: DialogType;
  title?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  cancelButtonText?: string;
  actionButtonText?: string;
  hideActions?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  // For 'confirm'/'dialog', we usually want to await the result. 
  // We can attach a resolve function here if we want to support `await confirm(...)`
  resolve?: (value: boolean) => void;
  // Arbitrary props to pass to the underlying primitive if needed (like width)
  className?: string;
  open?: boolean;
}

type DialogListener = (dialogs: DialogOptions[]) => void;

class DialogStore {
  private dialogs: DialogOptions[] = [];
  private listeners: DialogListener[] = [];

  subscribe(listener: DialogListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener([...this.dialogs]));
  }

  addDialog(dialog: DialogOptions) {
    this.dialogs = [...this.dialogs, dialog];
    this.notify();
  }

  updateDialog(id: string, updates: Partial<DialogOptions>) {
    this.dialogs = this.dialogs.map((d) => (d.id === id ? { ...d, ...updates } : d));
    this.notify();
  }

  removeDialog(id: string) {
    this.dialogs = this.dialogs.filter((d) => d.id !== id);
    this.notify();
  }
}

export const dialogStore = new DialogStore();
