import { toast as sonnerToast } from 'sonner';

type ToastProps = {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
};

export function useToast() {
  const toast = ({ title, description, variant = 'default' }: ToastProps) => {
    if (title && description) {
      if (variant === 'destructive') {
        sonnerToast.error(title, { description });
      } else if (variant === 'success') {
        sonnerToast.success(title, { description });
      } else if (variant === 'warning') {
        sonnerToast.warning(title, { description });
      } else if (variant === 'info') {
        sonnerToast.info(title, { description });
      } else {
        sonnerToast(title, { description });
      }
    } else if (title) {
      if (variant === 'destructive') {
        sonnerToast.error(title);
      } else if (variant === 'success') {
        sonnerToast.success(title);
      } else if (variant === 'warning') {
        sonnerToast.warning(title);
      } else if (variant === 'info') {
        sonnerToast.info(title);
      } else {
        sonnerToast(title);
      }
    } else if (description) {
      if (variant === 'destructive') {
        sonnerToast.error(description);
      } else if (variant === 'success') {
        sonnerToast.success(description);
      } else if (variant === 'warning') {
        sonnerToast.warning(description);
      } else if (variant === 'info') {
        sonnerToast.info(description);
      } else {
        sonnerToast(description);
      }
    }
  };

  return {
    toast,
    toasts: [],
  };
}

export const toast = ({ title, description, variant = 'default' }: ToastProps) => {
  const { toast: showToast } = useToast();
  showToast({ title, description, variant });
};
