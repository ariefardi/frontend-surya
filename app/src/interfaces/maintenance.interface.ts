export interface MaintenanceProps {
  __typename: any;
  id: number;
  title: string;
  description: string;
  isResolved: boolean;
  statusDisplay: string;
  status: string;
  createdAt: Date;
}

export interface CreateMaintenanceProps {
  title: string;
  description: string;
  isResolved: boolean;

  status: string;
}

export interface getAllRequestProps {
  loading: boolean;
  error?: any;
  data:
    | {
        requests: MaintenanceProps[];
      }
    | undefined;
  refetch: () => void;
}

export interface openRequestQueryProps {
  loading: boolean;
  error?: any;
  data: { openRequests: number } | undefined;
  refetch: () => void;
}

export interface urgentRequestQueryProps {
  loading: boolean;
  error?: any;
  data: { openUrgentRequests: number } | undefined;
  refetch: () => void;
}

export interface averageResolutionQuery {
  loading: boolean;
  error?: any;
  data: { averageResolutionTime: number } | undefined;
  refetch: () => void;
}
