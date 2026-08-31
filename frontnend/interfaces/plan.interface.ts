export interface Plan {
  id: number;
  name: string;
  code: string;
  price: number;
  description?: string;
  clientCount?: number;
  updatedAt?: string;
}

export interface UpdatePlanPayload {
  name?: string;
  price?: number;
  description?: string;
  updateExistingClients?: boolean;
}
