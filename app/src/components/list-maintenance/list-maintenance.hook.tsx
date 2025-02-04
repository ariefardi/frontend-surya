"use client";
import { useCallback } from "react";

import { ListMaintenanceComponentProps } from "./list-maintenance.component";
import { useRouter } from "next/navigation";

const useListMaintenanceHooks = (props: ListMaintenanceComponentProps) => {
  const { getAllRequest } = props;
  const router = useRouter();
  const handleCreate = useCallback(() => {
    router.push("/request/new");
  }, []);
  const handleEdit = useCallback((id: number) => {
    router.push(`/request/${id}`);
  }, []);
  return {
    getAllRequest,
    handleCreate,

    handleEdit,
  };
};

export default useListMaintenanceHooks;
