import { toast } from "sonner";

type ToastProps = {
  message: string;
  id: string | number;
};

/**
 * Shows a success toast notification.
 * Closes all existing toasts before showing the new one.
 * @param message - The message to display in the toast.
 * @param id - The unique identifier for the toast.
 */
export const SuccessToast = ({ message, id }: ToastProps) => {
  toast.dismiss();
  return toast.success(message, {
    id: id,
    unstyled: true,
    className:
      "bg-primary-success text-white px-4 py-2 gap-x-2 rounded shadow-md flex items-center",
  });
};

/**
 * Shows an error toast notification.
 * @param message - The message to display in the toast.
 * @param id - The unique identifier for the toast.
 */
export const ErrorToast = ({ message, id }: ToastProps) => {
  return toast.error(message, {
    id: id,
    unstyled: true,
    className:
      "bg-primary-error text-white px-4 py-2 gap-x-2 rounded shadow-md flex items-center",
  });
};
