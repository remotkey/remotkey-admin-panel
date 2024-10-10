import { useState } from "react";
import { toast } from "react-hot-toast";

export const useDeleteApiHandler = () => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentItemId, setCurrentItemId] = useState("");
  const [currentDeleteApi, setCurrentDeleteApi] = useState<
    ((id: string) => Promise<any>) | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (currentDeleteApi && currentItemId) {
      setIsLoading(true);
      const deleted = await currentDeleteApi(currentItemId);
      setIsLoading(false);
      toast.success(deleted.message);
      setDeleteDialogOpen(false);
    }
  };

  const openDeleteDialog = (
    id: string,
    deleteApi: (id: string) => Promise<any>
  ) => {
    setCurrentItemId(id);
    setCurrentDeleteApi(() => deleteApi);
    setDeleteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
  };

  return {
    isDeleteDialogOpen,
    handleDelete,
    openDeleteDialog,
    handleCloseDialog,
    isLoading,
  };
};
