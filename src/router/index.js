import {createRouter, createWebHistory} from 'vue-router'
const routes = [
    {
        path: "/test",
        name: "test",
        component: () => import('../views/test.vue'),
    },
    {
        path: "/",
        name: "layout",
        //redirect: "/",
        component: () => import('../layout/layout.vue'),
        children: [{
            path: "blogList",
            name: "blogList",
            component: () => import('../views/blogList.vue'),
        },
            {
                path: "blogOperations",
                name: "blogOperations",
                component: () => import('../views/blogOperations.vue'),
            },

        ]
    },
]
const router = createRouter({
    history: createWebHistory(), routes,
})

export default router
