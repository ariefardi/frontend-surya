import { DashboardMaintenanceComponentProps } from "./dashboard-maintenance.component";
const useDashboardMaintenanceHooks = (props: DashboardMaintenanceComponentProps) => {
  const parsingDays = (time?: number) => Math.ceil((time ?? 0) / 24);

  return {
    openRequest: props.openRequestQuery,
    urgentRequest: props.urgentRequestQuery,
    averageResolution: props.averageResolutionQuery,
    parsingDays,
  };
};

export default useDashboardMaintenanceHooks;
