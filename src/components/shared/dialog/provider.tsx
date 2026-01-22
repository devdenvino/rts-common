import React, { useEffect, useState } from 'react';
import { dialogStore, type DialogOptions } from './store';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const GlobalDialogProvider: React.FC = () => {
  const [dialogs, setDialogs] = useState<DialogOptions[]>([]);

  useEffect(() => {
    return dialogStore.subscribe((updatedDialogs) => {
      setDialogs(updatedDialogs);
    });
  }, []);

  const handleClose = (id: string, result: boolean) => {
    const dialog = dialogs.find((d) => d.id === id);
    if (dialog) {
        // Prevent double close if already closing
        if (dialog.open === false) return;

        if(result) {
            dialog.onConfirm?.();
        } else {
            dialog.onCancel?.();
        }
        dialog.resolve?.(result);
        
        // Animating out
        dialogStore.updateDialog(id, { open: false });
        // Remove after animation (approx 300ms)
        setTimeout(() => {
             dialogStore.removeDialog(id);
        }, 300);
    }
  };

  const handleOpenChange = (id: string, open: boolean) => {
    if (!open) {
      handleClose(id, false);
    }
  };

  return (
    <>
      {dialogs.map((dialog) => {
        const isOpen = dialog.open !== false;
        if (dialog.type === 'alert' || dialog.type === 'confirm') {
          return (
            <AlertDialog key={dialog.id} open={isOpen} onOpenChange={(open) => handleOpenChange(dialog.id, open)}>
              <AlertDialogContent className={dialog.className}>
                <AlertDialogHeader>
                  {dialog.title && <AlertDialogTitle>{dialog.title}</AlertDialogTitle>}
                  {dialog.description && <AlertDialogDescription>{dialog.description}</AlertDialogDescription>}
                </AlertDialogHeader>
                {dialog.content}
                <AlertDialogFooter>
                  {dialog.type === 'confirm' && (
                    <AlertDialogCancel onClick={() => handleClose(dialog.id, false)}>
                      {dialog.cancelButtonText || 'Cancel'}
                    </AlertDialogCancel>
                  )}
                  {/* Alert usually only has an Action button (OK/Continue) */}
                  <AlertDialogAction onClick={() => handleClose(dialog.id, true)}>
                    {dialog.actionButtonText || (dialog.type === 'confirm' ? 'Continue' : 'OK')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          );
        }

        if (dialog.type === 'dialog') {
          return (
            <Dialog key={dialog.id} open={isOpen} onOpenChange={(open) => handleOpenChange(dialog.id, open)}>
              <DialogContent className={dialog.className}>
                <DialogHeader>
                  <DialogTitle>{dialog.title}</DialogTitle>
                  {dialog.description && <DialogDescription>{dialog.description}</DialogDescription>}
                </DialogHeader>
                {dialog.content}
                <DialogFooter>
                   {/* Custom dialogs might have their own footer in content, usually logic is separate. 
                       But the original wrapper provided buttons. 
                       If users want custom footer, they should probably use the primitive directly in their code.
                       However, to match legacy behavior: */}
                    {!dialog.hideActions && (
                      <>
                        <Button variant="outline" onClick={() => handleClose(dialog.id, false)}>
                            {dialog.cancelButtonText || 'Cancel'}
                        </Button>
                        <Button onClick={() => handleClose(dialog.id, true)}>
                            {dialog.actionButtonText || 'Continue'}
                        </Button>
                      </>
                    )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          );
        }

        return null;
      })}
    </>
  );
};
