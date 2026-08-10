import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import { useUiStore } from './stores/ui'
import './styles/main.css'

function showFatalError(error: unknown) {
  const el = document.getElementById('app')
  if (!el) return
  const message = error instanceof Error ? error.message : String(error)
  el.innerHTML = `
    <div style="display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px;font-family:system-ui,sans-serif;">
      <div style="max-width:480px;text-align:center;">
        <p style="font-size:32px;margin-bottom:8px;">⚠️</p>
        <h1 style="font-size:18px;font-weight:600;color:#0f172a;margin-bottom:8px;">StageManager n'a pas pu démarrer</h1>
        <p style="font-size:14px;color:#64748b;margin-bottom:12px;">Une erreur inattendue est survenue. Détail technique :</p>
        <pre style="font-size:12px;color:#dc2626;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px;text-align:left;overflow:auto;">${message}</pre>
      </div>
    </div>
  `
}

async function bootstrap() {
  const app = createApp(App)
  app.use(createPinia())

  // Toute erreur de rendu Vue non interceptée s'affiche désormais à l'écran
  // au lieu de produire une page blanche silencieuse.
  app.config.errorHandler = (err) => {
     
    console.error('[StageManager] Erreur applicative :', err)
    showFatalError(err)
  }

  const auth = useAuthStore()
  const ui = useUiStore()
  ui.setTheme(ui.theme)

  await auth.restoreSession()

  app.use(router)
  app.mount('#app')
}

bootstrap().catch(showFatalError)
