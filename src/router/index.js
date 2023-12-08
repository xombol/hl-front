import { createRouter, createWebHistory } from 'vue-router';
import TableView from '../views/TableView.vue';

const routes = [
    {
        path: '/table-view',
        name: 'TableView',
        component: TableView
    },
    // Другие маршруты...
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
