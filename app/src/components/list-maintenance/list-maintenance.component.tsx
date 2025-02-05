"use client";
import { classStatus } from "@/app/src/constant";
import { PlusIcon } from "../../icons/plus.icon";
import { getAllRequestProps, MaintenanceProps } from "../../interfaces/maintenance.interface";
import { formateDate } from "../../lib/formatDate";

import useListMaintenanceHooks from "./list-maintenance.hook";
export interface ListMaintenanceComponentProps {
  getAllRequest: getAllRequestProps;
  resolveRequest: (value: MaintenanceProps) => void;
}
const ListMaintenanceComponent = (props: ListMaintenanceComponentProps) => {
  const { getAllRequest, handleCreate, handleEdit } = useListMaintenanceHooks(props);

  if (getAllRequest.loading) return <p>Loading...</p>;
  if (getAllRequest.error) return <p>Error: {getAllRequest.error.message}</p>;
  return (
    <>
      <div className="flex flex-col w-[697px] max-w-[697px] relative mx-auto cursor-pointer">
        {getAllRequest.data?.requests.map((d, index) => (
          <div
            onClick={() => handleEdit(d.id)}
            key={index}
            className="bg-white flex flex-col w-full h-[87px] shadow-md mt-[20px] p-[16px] gap-[10px] rounded-[12px]"
          >
            <div className="flex flex-row flex-1 justify-between">
              <div className="text-[14px]">{d.title}</div>
              <div className="text-[12px] text-inactive">
                {" "}
                {formateDate({ date: d.createdAt })}{" "}
              </div>
            </div>
            <div className="flex flex-row flex-1 justify-between">
              <div className={`text-[14px] ${classStatus[d.status].color}`}>{d.statusDisplay}</div>
              {d?.isResolved ? (
                <div className="rounded-full bg-inactive py-[3px] px-[8px] text-[12px]">
                  <span className="text-[white] font-normal">Resolved</span>
                </div>
              ) : (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    props.resolveRequest(d);
                  }}
                  className="rounded-full bg-primary py-[3px] px-[8px] text-[12px] cursor-pointer"
                >
                  <span className="text-[white] font-normal">Mark as Resolved</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Floating Button - Tetap di Bawah Layar tapi di Dalam Container */}
        <button
          onClick={handleCreate}
          className="fixed bottom-4 right-[calc(50%-348px)] bg-primary text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
        >
          <PlusIcon />
        </button>
      </div>
    </>
  );
};

export default ListMaintenanceComponent;
