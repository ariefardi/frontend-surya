"use client";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
// import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CreateMaintenanceProps, MaintenanceProps } from "../../interfaces/maintenance.interface";
import { GET_ONE_REQUEST, MUTATION_CREATE_REQUEST } from "../../services/maintenance.service";

const useRequestHooks = () => {
  const { id } = useParams(); // Get ID from URL
  // const router = useRouter();
  const isEdit = id !== "new"; // "new" means create, otherwise edit
  const [formData, setFormData] = useState<CreateMaintenanceProps>({
    title: "",
    description: "",
    status: "",
    isResolved: false,
  });
  const [createRequest, { loading: loadingCrate, error: errorCrate, data: dataCrate }] =
    useMutation(MUTATION_CREATE_REQUEST);
  const [updateRequest, { loading: loadingUpdate, error: errorUpdate, data: dataUpdate }] =
    useMutation(MUTATION_CREATE_REQUEST);

  const {
    loading: loadingOne,
    error: errorOne,
    data: dataOne,
  } = useQuery<{ request: MaintenanceProps }>(GET_ONE_REQUEST, {
    variables: { id: Number(id) },
    skip: !isEdit, // Skip if `isEdit` is false
  });

  const [errors, setErrors] = useState<{ title?: string; status?: string }>({});

  // Set formData when editing an existing request
  useEffect(() => {
    if (isEdit && dataOne?.request) {
      setFormData((prev) => ({
        ...prev,
        ...dataOne.request,
        status: dataOne.request.status || "not_urgent",
      }));
    }
  }, [dataOne, isEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Hapus error ketika user mulai mengetik
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
    return Object.keys(newErrors).length === 0; // Return true jika tidak ada error
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submit jika ada error
    }
    console.log("form", formData, isEdit);

    if (!isEdit) {
      handleCreate(formData);
    } else {
      handleUpdate();
    }
  };
  const handleUpdate = useCallback(async () => {
    try {
      Swal.fire({
        title: "Are you sure want to update?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateRequest({
            variables: {
              id: id,
              title: formData.title,
              status: formData.status,
              description: formData.description,
              isResolved: formData.isResolved || false,
            },
          });

          await Swal.fire({
            title: "Resolved!",
            text: "Your task has been updated.",
            icon: "success",
          });
          // router.push("/");
          window.location.href = "/";
        }
      });
    } catch (error) {}
  }, [formData, id]);
  const handleCreate = useCallback(async (formData: CreateMaintenanceProps) => {
    try {
      Swal.fire({
        title: "Are you sure want to create?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes,  it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await createRequest({
            variables: {
              title: formData.title,
              status: formData.status,
              description: formData.description,
              isResolved: formData.isResolved || false,
            },
          });

          await Swal.fire({
            title: "Resolved!",
            text: "Your task has been created.",
            icon: "success",
          });
          // router.push("/");
          window.location.href = "/";
        }
      });
    } catch (error) {}
  }, []);
  return { formData, errors, setFormData, handleChange, handleSubmit };
};

export default useRequestHooks;
