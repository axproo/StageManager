import { defineStore } from 'pinia'

export type Lang = 'fr' | 'en'
export type Theme = 'light' | 'dark'

export const useUiStore = defineStore('ui', {
  state: () => ({
    lang: (localStorage.getItem('sm_lang') as Lang) || 'fr',
    theme: (localStorage.getItem('sm_theme') as Theme) || 'light',
    sidebarCollapsed: false,
  }),
  actions: {
    setLang(lang: Lang) {
      this.lang = lang
      localStorage.setItem('sm_lang', lang)
    },
    setTheme(theme: Theme) {
      this.theme = theme
      localStorage.setItem('sm_theme', theme)
      document.documentElement.classList.toggle('dark', theme === 'dark')
    },
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },
  },
})
