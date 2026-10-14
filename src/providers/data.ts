import type { BaseRecord, DataProvider } from "@refinedev/core";
import { API_URL } from "./constants";

async function request(path: string, init?: RequestInit) {
  const response = await fetch(`${API_URL}${path}`, init);
  const body = await response.json().catch(() => ({ message: "The server returned an invalid response" }));
  if (!response.ok) throw { message: body.message || "Request failed", statusCode: response.status };
  return body;
}
function subjectsOnly(resource: string) {
  if (resource !== "subjects") throw new Error(`Unsupported resource: ${resource}`);
}
export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters }) => {
    if (resource === "departments") return request("/departments");
    subjectsOnly(resource);
    const query = new URLSearchParams({ page: String(pagination?.currentPage ?? 1), pageSize: String(pagination?.pageSize ?? 10) });
    for (const filter of filters ?? []) {
      if ("field" in filter && filter.value) {
        if (filter.field === "name") query.set("search", String(filter.value));
        if (filter.field === "departmentId") query.set("departmentId", String(filter.value));
      }
    }
    return request(`/subjects?${query}`);
  },
  getOne: async ({ resource, id }) => { subjectsOnly(resource); return request(`/subjects/${encodeURIComponent(id)}`); },
  create: async <TData extends BaseRecord, TVariables = unknown>({ resource, variables }: { resource: string; variables: TVariables }) => {
    subjectsOnly(resource);
    return request("/subjects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(variables) }) as Promise<{ data: TData }>;
  },
  update: async () => { throw new Error("Subject editing is not implemented"); },
  deleteOne: async () => { throw new Error("Subject deletion is not implemented"); },
  getApiUrl: () => API_URL,
};
