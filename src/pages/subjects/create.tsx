import { useState, type FormEvent } from "react";
import { useCreate, useNavigation, useList } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Department } from "@/index";

export default function SubjectsCreate() {
  const { mutate, mutation } = useCreate();
  const { result, query } = useList<Department>({ resource: "departments", pagination: { mode: "off" } });
  const { list } = useNavigation();
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const variables = Object.fromEntries(new FormData(event.currentTarget));
    mutate({ resource: "subjects", values: { ...variables, departmentId: Number(variables.departmentId) } }, {
      onSuccess: () => list("subjects"),
      onError: error => setError(error.message),
    });
  }
  return <div className="p-6 max-w-xl space-y-4">
    <h1 className="page-title">Create Subject</h1>
    <form onSubmit={submit} className="space-y-4">
      <div><Label htmlFor="code">Code</Label><Input id="code" name="code" required maxLength={50} /></div>
      <div><Label htmlFor="name">Name</Label><Input id="name" name="name" required maxLength={255} /></div>
      <div><Label htmlFor="departmentId">Department</Label><select id="departmentId" name="departmentId" defaultValue="" disabled={query.isLoading || query.isError} required className="border rounded p-2 w-full">
        <option value="" disabled>Select a department</option>
        {result.data.map(department => <option key={department.id} value={department.id}>{department.name}</option>)}
      </select></div>
      <div><Label htmlFor="description">Description</Label><Textarea id="description" name="description" maxLength={255} /></div>
      <div><Label htmlFor="level">Level</Label><Input id="level" name="level" maxLength={50} /></div>
      <div><Label htmlFor="type">Type</Label><Input id="type" name="type" maxLength={50} /></div>
      {query.isLoading && <p role="status">Loading departments…</p>}
      {query.isError && <p role="alert">Unable to load departments. <button type="button" onClick={() => void query.refetch()}>Retry</button></p>}
      {!query.isLoading && !query.isError && result.data.length === 0 && <p role="status">Add a department before creating a subject.</p>}
      {error && <p role="alert">{error}</p>}
      <Button type="submit" disabled={mutation.isPending || query.isLoading || query.isError || result.data.length === 0}>Save Subject</Button>
    </form>
  </div>;
}
