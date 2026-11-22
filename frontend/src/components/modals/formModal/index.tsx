import { X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ModalProps<T> = {
  title?: string;
  description?: string;
  open: boolean;
  onModalClose: (open: boolean) => void;
  dataOnEdit?: T | null;
  renderForm: (
    dataOnEdit: T | null,
    onModalClose: (open: boolean) => void,
  ) => React.ReactNode;
  DialogContentStyle?: string;
};

const FormModal = <T,>({
  title,
  description,
  open,
  onModalClose,
  dataOnEdit,
  renderForm,
  DialogContentStyle,
}: ModalProps<T>) => {
  return (
    <Dialog open={open} onOpenChange={onModalClose}>
      <DialogContent
        className={`[&>button:last-child]:hidden bg-primary-beige rounded-[20px] shadow-[0px_4px_16px_rgba(0,0,0,0.1) 2xl:p-[50px] p-8 -translate-y-1/2 max-h-[90vh] flex flex-col ${DialogContentStyle}`}
      >
        <DialogClose
          className="absolute -top-10 -right-10 bg-primary rounded-full w-[35px] h-[35px] flex justify-center items-center hover:bg-secondary-blue transition-all ease-in-out duration-500 cursor-pointer z-[100]"
          aria-label="Close"
        >
          <X className="size-4 text-white" />
        </DialogClose>
        <DialogHeader>
          <DialogTitle>{title ? title : "Form Modal"}</DialogTitle>
          <DialogDescription>{description && description}</DialogDescription>
        </DialogHeader>
        {renderForm(dataOnEdit ?? null, onModalClose)}
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
