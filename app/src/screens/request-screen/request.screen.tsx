"use client";
import { urgencyOptions } from "../../constant";
import { ArrowIcon } from "../../icons/arrow.icon";

import useRequestHooks from "./request.hook";
const RequestScreen = () => {
  const { formData, errors, setFormData, handleChange, handleSubmit, handleBack } =
    useRequestHooks();

  return (
    <div className="relative flex justify-center items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="w-[447px] flex flex-col items-center">
        <div className="w-full relative">
          <div onClick={handleBack} className="absolute left-12 top-2 cursor-pointer">
            <ArrowIcon />
          </div>
          <div className="text-[20px] font-bold text-center mb-[22px]">Maintenance Request</div>
        </div>

        <form onSubmit={handleSubmit} className="w-[447px]">
          {/* Urgency Dropdown */}
          <div className="mb-[25px]">
            <label className="block text-xs text-inactive font-medium mb-2">Urgency *</label>
            <div className="select-wrapper">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`custom-select shadow-md w-full rounded-[12px] h-[52px] px-[16px] ${
                  errors.status ? "border-[red] border" : ""
                }`}
              >
                {Object.entries(urgencyOptions).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            {errors.status && <p className="text-[red] text-xs mt-1">{errors.status}</p>}
          </div>

          {/* Status Toggle */}
          <div className="mb-[25px]">
            <label className="block text-xs text-inactive font-medium mb-2">Status</label>
            <div className="select-wrapper">
              <select
                name="isResolved"
                value={String(formData.isResolved)}
                onChange={(e) =>
                  setFormData({ ...formData, isResolved: e.target.value === "true" })
                }
                className="custom-select shadow-md w-full rounded-[12px] h-[52px] px-[16px]"
              >
                <option value="false">Open</option>
                <option value="true">Resolved</option>
              </select>
            </div>
          </div>

          {/* Title Input */}
          <div className="mb-[25px]">
            <label className="block text-xs text-inactive font-medium mb-2">Title *</label>
            <input
              type="text"
              name="title"
              placeholder="Enter title..."
              value={formData.title}
              onChange={handleChange}
              className={`shadow-md w-full rounded-[12px] h-[52px] px-[16px] ${
                errors.title ? "border-[red] border" : ""
              }`}
            />
            {errors.title && <p className="text-[red] text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Description Input */}
          <div className="mb-[25px]">
            <label className="block text-xs text-inactive font-medium mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Enter description..."
              value={formData.description}
              onChange={handleChange}
              className="shadow-md w-full rounded-[12px] h-[188px] px-[16px] py-[14px]"
            />
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-center mt-[21px]">
            <button
              type="submit"
              className="bg-primary text-[white] px-4 py-[12px] rounded-[8px] w-[268px]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestScreen;
