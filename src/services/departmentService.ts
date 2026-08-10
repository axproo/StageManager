import departmentsData from '@/mocks/departments.json'
import type { Department } from '@/types'
import { apiDelay, apiReject, generateId } from './apiDelay'
import { activityLogService } from './activityLogService'
import { userService } from './userService'

let departments: Department[] = JSON.parse(JSON.stringify(departmentsData))

export const departmentService = {
  async getAll(): Promise<Department[]> {
    return apiDelay([...departments])
  },

  async getById(id: string): Promise<Department | undefined> {
    return apiDelay(departments.find((d) => d.id === id))
  },

  async create(data: Omit<Department, 'id'>, actorId: string): Promise<Department> {
    const dept: Department = { ...data, id: generateId('dep') }
    departments = [...departments, dept]
    await activityLogService.record(actorId, 'CREATE', 'department', dept.id)
    return apiDelay(dept, 300)
  },

  async update(id: string, patch: Partial<Department>, actorId: string): Promise<Department> {
    departments = departments.map((d) => (d.id === id ? { ...d, ...patch } : d))
    await activityLogService.record(actorId, 'UPDATE', 'department', id)
    return apiDelay(departments.find((d) => d.id === id)!, 300)
  },

  async remove(id: string, actorId: string): Promise<void> {
    const stillUsed = userService._getAllSync().some((u) => u.departmentId === id)
    if (stillUsed) return apiReject('Impossible de supprimer un département contenant encore des membres.')
    departments = departments.filter((d) => d.id !== id)
    await activityLogService.record(actorId, 'DELETE', 'department', id)
    return apiDelay(undefined, 300)
  },
}
