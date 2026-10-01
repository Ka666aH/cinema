import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import { createPinia } from 'pinia'
import components from '@/components/UI'
import '@/assets/styles/index.css'

const app = createApp(App)

Object.entries(components).forEach(([name, component]) => {
    app.component(name, component)
})

app.use(router)
app.use(createPinia())
app.mount('#app')
