import React from "react";
import {
  openRequestQueryProps,
  urgentRequestQueryProps,
  averageResolutionQuery,
} from "../../interfaces/maintenance.interface";
import useDashboardMaintenanceHooks from "./dashboard-maintenance.hook";

const StatCard = ({
  value,
  label,
  className,
}: {
  value: number | string;
  label: string;
  className?: string;
}) => (
  <div
    className={`bg-white w-[90px] h-[90px] rounded-[10px] shadow-md flex flex-col items-center ${className}`}
  >
    <div className="text-[36px] text-primary font-bold">{value}</div>
    <div className="text-[9px] text-center">{label}</div>
  </div>
);

export interface DashboardMaintenanceComponentProps {
  openRequestQuery: openRequestQueryProps;
  urgentRequestQuery: urgentRequestQueryProps;
  averageResolutionQuery: averageResolutionQuery;
}
const DashboardMaintenanceComponent = (props: DashboardMaintenanceComponentProps) => {
  const { openRequest, urgentRequest, averageResolution, parsingDays } =
    useDashboardMaintenanceHooks(props);

  if (openRequest.loading || urgentRequest.loading || averageResolution.loading)
    return <p>Loading...</p>;
  if (openRequest.error || urgentRequest.error || averageResolution.error)
    return (
      <p>
        Error:{" "}
        {openRequest.error?.message ||
          urgentRequest.error?.message ||
          averageResolution.error?.message}
      </p>
    );

  return (
    <div>
      <div className="text-[20px] font-bold text-center mb-[22px]">Maintenance Request</div>
      <div className="flex flex-shrink flex-row">
        <StatCard value={openRequest.data?.openRequests ?? 0} label="Open Requests" />
        <StatCard
          className="mx-[20px]"
          value={urgentRequest.data?.openUrgentRequests ?? 0}
          label="Urgent Requests"
        />
        <StatCard
          value={parsingDays(averageResolution.data?.averageResolutionTime)}
          label="Average Time (days) to resolve"
        />
      </div>
    </div>
  );
};
export default DashboardMaintenanceComponent;
