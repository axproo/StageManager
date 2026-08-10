import { defineStore } from 'pinia'
import { roleService } from '@/services/roleService'
import { departmentService } from '@/services/departmentService'
import type { Department, Role } from '@/types'

/** Regroupe Rôles (203) et Départements (204) : deux référentiels courts, souvent
 *  consultés ensemble (formulaires utilisateur/stagiaire), d'où un store partagé. */
export const useCatalogStore = defineStore('catalog', {
  state: () => ({ roles: [] as Role[], departments: [] as Department[], loaded: false }),
  actions: {
    async loadAll(force = false) {
      if (this.loaded && !force) return
      const [roles, departments] = await Promise.all([roleService.getAll(), departmentService.getAll()])
      this.roles = roles
      this.departments = departments
      this.loaded = true
    },
    async createRole(data: Omit<Role, 'id' | 'systeme'>, actorId: string) {
      const role = await roleService.create(data, actorId)
      this.roles.push(role)
      return role
    },
    async updateRole(id: string, patch: Partial<Role>, actorId: string) {
      const role = await roleService.update(id, patch, actorId)
      const idx = this.roles.findIndex((r) => r.id === id)
      if (idx >= 0) this.roles[idx] = role
      return role
    },
    async removeRole(id: string, actorId: string) {
      await roleService.remove(id, actorId)
      this.roles = this.roles.filter((r) => r.id !== id)
    },
    async createDepartment(data: Omit<Department, 'id'>, actorId: string) {
      const dept = await departmentService.create(data, actorId)
      this.departments.push(dept)
      return dept
    },
    async updateDepartment(id: string, patch: Partial<Department>, actorId: string) {
      const dept = await departmentService.update(id, patch, actorId)
      const idx = this.departments.findIndex((d) => d.id === id)
      if (idx >= 0) this.departments[idx] = dept
      return dept
    },
    async removeDepartment(id: string, actorId: string) {
      await departmentService.remove(id, actorId)
      this.departments = this.departments.filter((d) => d.id !== id)
    },
  },
  getters: {
    roleById: (state) => (id: string) => state.roles.find((r) => r.id === id),
    departmentById: (state) => (id: string) => state.departments.find((d) => d.id === id),
  },
})
