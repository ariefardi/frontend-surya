"use client";

import ListMaintenanceComponent from "@/app/src/components/list-maintenance/list-maintenance.component";
import DashboardMaintenanceComponent from "@/app/src/components/dashboard-maintenance/dashboard-maintenance.component";
import { useEffect } from "react";
import useHomeHooks from "./home.hook";
const HomeScreen = () => {
  const {
    getAllRequest,
    openRequestQuery,
    urgentRequestQuery,
    averageResolutionQuery,
    resolveRequest,
  } = useHomeHooks();

  return (
    <div className="relative flex justify-center items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="w-[697px] flex flex-col items-center just">
        <DashboardMaintenanceComponent
          openRequestQuery={openRequestQuery}
          urgentRequestQuery={urgentRequestQuery}
          averageResolutionQuery={averageResolutionQuery}
        />
        {getAllRequest && (
          <ListMaintenanceComponent getAllRequest={getAllRequest} resolveRequest={resolveRequest} />
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
