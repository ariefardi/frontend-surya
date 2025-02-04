import { useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";
import Swal from "sweetalert2";
import { MaintenanceProps } from "../../interfaces/maintenance.interface";
import {
  AVERAGE_RESOLUTION_TIME,
  GET_ALL_REQUESTS,
  MUTATION_UPDATE_REQUEST,
  OPEN_REQUEST,
  OPEN_REQUEST_URGENT
} from "../../services/maintenance.service";

const useHomeHooks = () => {
  const getAllRequest = useQuery<{ requests: MaintenanceProps[] }>(GET_ALL_REQUESTS);
  const openRequestQuery = useQuery<{ openRequests: number }>(OPEN_REQUEST);
  const urgentRequestQuery = useQuery<{ openUrgentRequests: number }>(OPEN_REQUEST_URGENT);
  const averageResolutionQuery = useQuery<{ averageResolutionTime: number }>(
    AVERAGE_RESOLUTION_TIME
  );
  const [updateRequest, _] = useMutation(MUTATION_UPDATE_REQUEST);

  const resolveRequest = useCallback(async (value: MaintenanceProps) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, resolve it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateRequest({
            variables: {
              id: value.id,
              isResolved: true,
            },
          });

          getAllRequest.refetch();
          openRequestQuery.refetch();
          if (value.status == "emergency" || value.status == "urgent") urgentRequestQuery.refetch();
          averageResolutionQuery.refetch();

          Swal.fire({
            title: "Resolved!",
            text: "Your file has been resolved.",
            icon: "success",
          });
        }
      });
    } catch (error) {}
  }, []);
  return {
    getAllRequest,
    openRequestQuery,
    urgentRequestQuery,
    averageResolutionQuery,
    resolveRequest,
  };
};

export default useHomeHooks;
