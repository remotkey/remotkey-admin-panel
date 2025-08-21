"use client";

import { Button } from "@/common/components/atoms/Button";
import { ConfirmationDialog } from "@/common/components/molecules/ConfirmationDialog";
import { useDeleteApiHandler } from "@/custom-hooks/useDeleteApiHandler";
import { deleteVendorApi } from "@/main/vendor/api/actions";
import { deletePropertyApi } from "../../../main/property/api/actions";
import { ModuleNames } from "@/common/enums";

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

  const api =
    deleteDialogModuleName === ModuleNames.PROPERTY
      ? deletePropertyApi
      : deleteDialogModuleName === ModuleNames.VENDOR && deleteVendorApi;

  const handleOpenDeleteDialog = (id: string) => {
    api && openDeleteDialog(id, api);
  };

  return (
    <div className="flex flex-nowrap items-center justify-center gap-3 overflow-visible py-[0.62rem] pr-[0.62rem]">
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
        url={
          deleteDialogModuleName === ModuleNames.PROPERTY
            ? `edit-property?id=${id} `
            : deleteDialogModuleName === ModuleNames.VENDOR
              ? `edit-vendor?id=${id} `
              : ""
        }
        icon="/icons/pencil.svg"
        className="cursor-pointer border border-C_309B5F bg-C_309B5F px-4"
        hasBgColor
        text="Edit"
      />
      <Button
        onClick={() => handleOpenDeleteDialog(id)}
        iconSize={24}
        className="flex size-10 items-center justify-center"
        icon="/icons/delete.svg"
      />
    </div>
  );
};
