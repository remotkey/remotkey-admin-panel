"use client";

import { Button } from "@/common/components/atoms/Button";
import { ConfirmationDialog } from "@/common/components/molecules/ConfirmationDialog";
import { useDeleteApiHandler } from "@/custom-hooks/useDeleteApiHandler";
import { deletePropertyApi } from "../api/actions";

export const ActionButtons = ({
  id,
  deleteDialogModuleName,
}: {
  id: string;
  deleteDialogModuleName: string;
}) => {
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
          <span className="text-C_EA241D"> delete</span> this{" "}
          {deleteDialogModuleName}?
        </>
      </ConfirmationDialog>
      <Button
        url={`edit-property?id=${id}`}
        icon="/icons/pencil.svg"
        className="cursor-pointer border border-C_309B5F bg-C_309B5F px-4"
        hasBgColor
        text="Edit"
      />
      <Button
        onClick={() => handleOpenDeleteDialog(id)}
        iconSize={24}
        icon="/icons/delete.svg"
      />
    </div>
  );
};
