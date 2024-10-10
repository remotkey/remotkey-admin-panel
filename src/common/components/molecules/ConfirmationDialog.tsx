"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { ReactNode } from "react";
import { ModalButton } from "../atoms/ModalButton";

export interface ConfirmationDialogInterface {
  isOpen: boolean;
  handleClose: () => void;
  onConfirm: () => void;
  children: ReactNode;
  isLoading: boolean;
}

export const ConfirmationDialog = ({
  isOpen,
  handleClose,
  onConfirm,
  children,
  isLoading,
}: ConfirmationDialogInterface) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={handleClose}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-C_rgba4">
        <div className="flex min-h-full items-center justify-center text-center">
          <DialogPanel
            transition
            className="relative rounded-r_15 bg-white p-[3.125rem] duration-100 ease-out data-[closed]:opacity-0">
            <div className="font_med_6 mb-10 max-w-[17.5rem] text-C_232323">
              {children}
            </div>
            <div className="flex justify-center gap-[0.62rem]">
              <ModalButton
                text="Yes"
                isLoading={isLoading}
                onClick={onConfirm}
              />
              <ModalButton text="No" hasBgRed onClick={handleClose} />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
