export type Department = {
  id: number;
  code: string;
  name: string;
  description: string | null;
};
export type Subject = {
  id: number;
  name: string;
  code: string;
  departmentId: number;
  createdAt: string;
  updatedAt: string;
  description: string | null;
  level: string | null;
  type: string | null;
};
