import { createWebHashHistory, createRouter } from 'vue-router'

import LayoutView from './components/Layout.vue'
import MenuView from './components/Menu.vue'
import MainView from './components/Main.vue'

const routes = [
    {
        path: '/', name: 'layout', component: LayoutView,
        children:[
            {
                path: '/', component: MainView
            },
            {
                path: 'main', component: MainView
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;