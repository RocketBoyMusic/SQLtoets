import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import MonacoLoader from './components/MonacoLoader.vue'

// Import pages
import QuestionsPage from './pages/QuestionsPage.vue'
import SolutionsPage from './pages/SolutionsPage.vue'

// Define routes
const routes = [
  { path: '/', component: QuestionsPage },
  { path: '/solutions', component: SolutionsPage }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Create and mount the app
const app = createApp(App)

// Register global components
app.component('MonacoLoader', MonacoLoader)

app.use(router)
app.mount('#app')
