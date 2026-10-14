import { CreateButton } from '@/components/refine-ui/buttons/create'
import { DataTable } from '@/components/refine-ui/data-table/data-table'
import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import { ListView } from '@/components/refine-ui/views/list-view'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useList } from "@refinedev/core"
import type { Subject, Department } from '@/index'
import { useTable } from '@refinedev/react-table'
import { ColumnDef } from '@tanstack/react-table'

import { SearchIcon } from 'lucide-react'
import React, { useMemo } from 'react'

const SubjectsList = () => {

  const { result: departments, query: departmentsQuery } = useList<Department>({ resource: "departments", pagination: { mode: "off" } });
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedDepartment, setSelectedDepartment] = React.useState('all')  
  
  const departmentFilters = selectedDepartment === 'all' ? []:[
    { field: 'departmentId', operator: 'eq' as const, value: Number(selectedDepartment) }];
  
  const searchFilter = searchTerm ? [
    { field: 'name', operator: 'contains' as const, value: searchTerm },
  ] : [];
  
    const subjectsTable = useTable<Subject>(
    {
      columns: useMemo<ColumnDef<Subject>[]>(()=>[
        {
          id: 'code',
          accessorKey: 'code',
          size:100,
          header: () =><p className='column-title ml-2'>Code</p>,
          cell: ({getValue}) => <Badge>{getValue<string>()}</Badge>,

        },
        {
          id: 'name',
          accessorKey: 'name',
          size: 200,
          header: () => <p className='column-title'>Name</p>,
          cell: ({getValue}) => <span className='text-foreground'>{getValue<string>()}</span>,
          filterFn: 'includesString',
        },
        {
          id: 'departmentId',
          accessorKey: 'departmentId',
          size: 200,
          header: () => <p className='column-title'>Department</p>,
          cell: ({getValue}) => <Badge variant="secondary">{departments.data.find(department => department.id === getValue<number>())?.name ?? `Department ${getValue<number>()}`}</Badge>,
        },
        {
          id:'description',
          accessorKey: 'description',
          size: 300,
          header: () => <p className='column-title'>Description</p>,
          cell: ({getValue}) => <span className='truncate line-clamp-2'>{getValue<string>()}</span>,
        },
        {
          id:'level',
          accessorKey: 'level',
          size: 100,
          header: () => <p className='column-title'>Level</p>,
          cell: ({getValue}) => <span className='text-foreground'>{getValue<string>()}</span>,
        },
        {
          id:'type',
          accessorKey: 'type',
          size: 100,
          header: () => <p className='column-title'>Type</p>,
          cell: ({getValue}) => <span className='text-foreground'>{getValue<string>()}</span>,
        }
      ],[departments.data]),

      refineCoreProps: {
        resource: 'subjects',
        pagination: {pageSize: 10, mode: 'server'},
        filters: {
          permanent: [...departmentFilters, ...searchFilter]
        },
        sorters: {
          initial:[
            {field: 'id', order: 'desc'}
          ]
        },
    }
  }
  )
  
  return (
   <ListView>
    <Breadcrumb />
    <h1 className='page-title'>Subjects List</h1>
    <div className='intro-row '>
    <p className="">Browse and manage your subjects </p>
    <div className="actions-row">
      <div className="search-field">
        <SearchIcon className='search-icon' />
        <Input type="text" placeholder='Search...' 
        className='pl-10 w-full'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
     <div className="flex gap-2 w-full sm:w-auto">
      <Select
        value={selectedDepartment}
        onValueChange={setSelectedDepartment}
      >
        <SelectTrigger className="w-full sm:w-auto">
          <SelectValue placeholder="Filter by department" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          {
            departments.data.map((option) => (
              <SelectItem key={option.id} value={String(option.id)}>
                {option.name}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>

<CreateButton />
     </div>
     
    </div>
    </div>

    {departmentsQuery.isError && <p role="alert">Unable to load departments. <button onClick={() => void departmentsQuery.refetch()}>Retry</button></p>}
    {subjectsTable.refineCore.tableQuery.isError ? <p role="alert">Unable to load subjects. <button onClick={() => void subjectsTable.refineCore.tableQuery.refetch()}>Retry</button></p> : <DataTable table={subjectsTable} />}
   </ListView>
  )
}

export default SubjectsList