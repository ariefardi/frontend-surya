"use client";
import { MaintenanceProps } from "@/app/src/interfaces/maintenance.interface";
import { useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";
import Swal from "sweetalert2";

import { GET_ALL_REQUESTS, MUTATION_UPDATE_REQUEST } from "@/app/src/services/maintenance.service";
import { ListMaintenanceComponentProps } from "./list-maintenance.component";
// import { useRouter } from "next/router";

const useListMaintenanceHooks = (props: ListMaintenanceComponentProps) => {
  const { getAllRequest } = props;

  const handleCreate = useCallback(() => {
    // const router = useRouter();
    // router.push("/request/new");
    window.location.href = "/request/new";
  }, []);
  const handleEdit = useCallback((id: number) => {
    // const router = useRouter();
    window.location.href = `/request/${id}`;
  }, []);
  return {
    getAllRequest,
    handleCreate,

    handleEdit,
  };
};

export default useListMaintenanceHooks;
