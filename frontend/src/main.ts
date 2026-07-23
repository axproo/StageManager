import { createApp } from 'vue'
import './style/global.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import createDynamicRouter from './router/index.ts'

async function initializeApp() {
    const app = createApp(App)

    app.config.errorHandler = (err, vm, info) => {
        console.error('Erreur capturée globalement:', err)
        console.log('Composant:', vm)
        console.log('Information: ', info)
    }

    app.use(createPinia())

    const router = await createDynamicRouter()
    app.use(router)
    app.mount('#app')
}
initializeApp()
