"use client";

import { Button } from "@/common/components/atoms/Button";
import { deletePropertyApi } from "../api/actions";
import { useDeleteApiHandler } from "@/custom-hooks/useDeleteApiHandler";
import { ConfirmationDialog } from "@/common/components/molecules/ConfirmationDialog";

export const ActionButtons = ({ id }: { id: string }) => {
  // --------------------------------------Delete City Handler-------------------------------------------------
  const {
    isDeleteDialogOpen,
    handleDelete,
    openDeleteDialog,
    handleCloseDialog,
    isLoading,
  } = useDeleteApiHandler();

  const handleOpenDeleteDialog = (id: string) => {
    openDeleteDialog(id, deletePropertyApi);
  };

  return (
    <div className="flex items-center justify-center gap-5 py-[0.62rem] pr-[0.62rem]">
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        handleClose={handleCloseDialog}
        onConfirm={handleDelete}
        isLoading={isLoading}>
        <>
          Are you sure you want to
          <span className="text-C_EA241D"> delete</span> this property?
        </>
      </ConfirmationDialog>
      <Button
        url={`edit-property?id=${id}`}
        icon="/icons/pencil.svg"
        className="border border-C_309B5F bg-C_309B5F"
        hasBgColor
        text="Edit"
      />
      <Button
        onClick={() => handleOpenDeleteDialog(id)}
        iconSize={24}
        icon="/icons/delete.svg"
        className="size-24"
      />
    </div>
  );
};
