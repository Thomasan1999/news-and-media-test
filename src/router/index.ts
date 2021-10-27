import Search from '@/views/Search.vue';
import ShoppingListContainer from '@/views/ShoppingListContainer.vue';
import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: '/lists/:id?',
        name: 'ShoppingListContainer',
        component: ShoppingListContainer
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    },
    {
        path: '*',
        redirect: '/lists'
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
