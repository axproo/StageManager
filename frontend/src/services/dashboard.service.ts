import type { DashboardStat, DashboardActivity, DashboardStagiaire } from '@/types/dashboard'

import statsData from '@/mocks/dashboardStats.json'
import activitiesData from '@/mocks/dashboardActivities.json'
import stagiairesData from '@/mocks/recentStagiaires.json'

export const dashboardService = {
  getStats(): DashboardStat[] {
    return statsData as DashboardStat[]
  },

  getActivities(): DashboardActivity[] {
    return activitiesData as DashboardActivity[]
  },

  getRecentStagiaires(): DashboardStagiaire[] {
    return stagiairesData as DashboardStagiaire[]
  },
}
