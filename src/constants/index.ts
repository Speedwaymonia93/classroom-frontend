export const DEPARTMENTS = ['math', 'science', 'history']

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((department) => ({
  value: department,
  label: department.charAt(0).toUpperCase() + department.slice(1),
}))