"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { InquiryForm } from "./InquiryForm";

export interface InquiryDialogInterface {
  isOpen: boolean;
  handleClose: () => void;
}

export const InquiryDialog = ({
  isOpen,
  handleClose,
}: InquiryDialogInterface) => {
  return (
    <>
      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-C_rgba4">
          <div className="flex min-h-full items-center justify-center text-center">
            <DialogPanel
              transition
              className="relative rounded-r_15 bg-white p-[3.125rem] duration-100 ease-out data-[closed]:opacity-0">
              <InquiryForm handleClose={handleClose} />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
