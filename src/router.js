import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/all',
            name: 'all',
        },
        {
            path: '/undo',
            name: 'undo',
        },
        {
            path: '/complete',
            name: 'complete',
        }, {
            path: '*',
            redirect: 'all'
        }
    ]
})