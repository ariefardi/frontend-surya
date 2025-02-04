import React from "react";
import FormMaintenanceComponent from "./components/form-maintenance/form-maintenance.component";

const classStatus: any = {
  urgent: {
    color: "text-urgent",
    text: "⚡ Urgent",
  },
  emergency: {
    color: "text-emergency",
    text: "🔥 Emergency",
  },
  non_urgent: {
    color: "text-non_urgent",
    text: "🙂 Non Urgent",
  },
  less_urgent: {
    color: "text-less_urgent",
    text: "🔨 Less Urgent",
  },
};
const DATA = [
  {
    title: "Front Door Broken",
    status: "non_urgent",
    isResolved: false,
    createdAt: new Date(),
  },
  {
    title: "Front Door Broken",
    status: "urgent",
    isResolved: false,
    createdAt: new Date(),
  },
  {
    title: "Front Door Broken",
    status: "emergency",
    isResolved: true,
    createdAt: new Date(),
  },
  {
    title: "Front Door Broken",
    status: "less_urgent",
    isResolved: true,
    createdAt: new Date(),
  },
  {
    title: "Front Door Broken",
    status: "urgent",
    isResolved: true,
    createdAt: new Date(),
  },
];
export default function Home() {
  return (
    <div className="relative flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="text-[20px] font-bold">Maintenance Request</div>
      <div className="flex flex-shrink flex-row">
        <div className="bg-white w-[90px] h-[90px] rounded-[10px] shadow-md flex flex-col items-center">
          <div className="text-[36px] text-primary font-bold">2</div>
          <div className="text-[9px]">Open Requests</div>
        </div>
        <div className="mx-[20px] bg-white w-[90px] h-[90px] rounded-[10px] shadow-md flex flex-col items-center">
          <div className="text-[36px] text-primary font-bold">2</div>
          <div className="text-[9px]">Urgent Requests</div>
        </div>
        <div className="bg-white w-[90px] h-[90px] rounded-[10px] shadow-md flex flex-col items-center px-[6px]">
          <div className="text-[36px] text-primary font-bold">2</div>
          <div className="text-[9px] text-center">
            {" "}
            Average Time (days) to resolve
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[697px] relative">
        {DATA.map((d: any, index) => (
          <div
            key={index}
            className="bg-white flex flex-col w-full h-[87px] bg-white shadow-md mt-[20px] p-[16px] gap-[10px] rounded-[12px]"
          >
            <div className="flex flex-row flex-1 justify-between">
              <div className="text-[14px]">{d.title}</div>
              <div className="text-[12px] text-inactive">11 Dec 2024</div>
            </div>
            <div className="flex flex-row flex-1 justify-between">
              <div className={`text-[14px] ${classStatus[d.status].color}`}>
                {classStatus[d.status].text}
              </div>
              {d?.isResolved ? (
                <div className="rounded-full bg-inactive py-[3px] px-[8px] text-[12px]">
                  <span className="text-[white] font-normal">Resolved</span>
                </div>
              ) : (
                <div className="rounded-full bg-primary py-[3px] px-[8px] text-[12px] ">
                  <span className="text-[white] font-normal">
                    Mark as Resolved
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="sticky bottom-4 right-4">
          <button className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 10H10.5M19.5 10H10.5M10.5 10V1M10.5 10V19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <FormMaintenanceComponent />
      </div>
    </div>
  );
}
