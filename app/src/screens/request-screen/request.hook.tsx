"use client";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
// import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CreateMaintenanceProps, MaintenanceProps } from "../../interfaces/maintenance.interface";
import { GET_ONE_REQUEST, MUTATION_CREATE_REQUEST } from "../../services/maintenance.service";
import { useRouter } from "next/navigation";
const useRequestHooks = () => {
  const { id } = useParams(); // Get ID from URL
  const router = useRouter();
  const isEdit = id !== "new"; // "new" means create, otherwise edit
  const [formData, setFormData] = useState<CreateMaintenanceProps>({
    title: "",
    description: "",
    status: "emergency",
    isResolved: false,
  });
  const [createRequest, _] = useMutation(MUTATION_CREATE_REQUEST);
  const [updateRequest, __] = useMutation(MUTATION_CREATE_REQUEST);

  const getOneRequest = useQuery<{ request: MaintenanceProps }>(GET_ONE_REQUEST, {
    variables: { id: Number(id) },
    skip: !isEdit,
  });

  const [errors, setErrors] = useState<{ title?: string; status?: string }>({});

  useEffect(() => {
    if (isEdit && getOneRequest.data?.request) {
      setFormData((prev) => ({
        ...prev,
        ...getOneRequest?.data?.request,
        status: getOneRequest?.data?.request.status || "not_urgent",
      }));
    }
  }, [getOneRequest.data, isEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors: { title?: string; status?: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.status) {
      newErrors.status = "Urgency is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    isEdit ? handleUpdate() : handleCreate(formData);
  };

  const showConfirmation = async (title: string, action: () => Promise<void>) => {
    const result = await Swal.fire({
      title,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    });

    if (result.isConfirmed) {
      await action();
    }
  };

  const handleUpdate = useCallback(async () => {
    try {
      await showConfirmation("Are you sure you want to update?", async () => {
        await updateRequest({
          variables: {
            id,
            title: formData.title,
            status: formData.status,
            description: formData.description,
            isResolved: formData.isResolved || false,
          },
        });

        await Swal.fire({
          title: "Success!",
          text: "Your task has been updated.",
          icon: "success",
        });

        router.push("/");
      });
    } catch (error) {}
  }, [formData, id, updateRequest, router]);

  const handleCreate = useCallback(
    async (formData: CreateMaintenanceProps) => {
      try {
        await showConfirmation("Are you sure you want to create?", async () => {
          await createRequest({
            variables: {
              title: formData.title,
              status: formData.status,
              description: formData.description,
              isResolved: formData.isResolved || false,
            },
          });

          await Swal.fire({
            title: "Success!",
            text: "Your task has been created.",
            icon: "success",
          });

          router.push("/");
        });
      } catch (error) {}
    },
    [createRequest]
  );

  return { formData, errors, setFormData, handleChange, handleSubmit };
};

export default useRequestHooks;
