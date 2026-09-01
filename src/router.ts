import { createWebHashHistory, createRouter } from 'vue-router'

import LayoutView from './components/Layout.vue'
import SettingView from './components/Setting.vue'
import MainView from './components/Main.vue'
import SecurityView from './components/Security.vue'

const routes = [
    {
        path: '/', name: 'layout', component: LayoutView,
        children:[
            {
                path: '/', component: MainView
            },
            {
                path: 'main', component: MainView
            },
            {
                path: 'setting', component: SettingView
            },
            {
                path: 'security', component: SecurityView
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;