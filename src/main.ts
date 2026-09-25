import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI'
import '@/assets/styles/index.css'

const app = createApp(App)

Object.entries(components).forEach(([name, component]) => {
    app.component(name, component)
})

app.mount('#app')
