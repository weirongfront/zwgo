/** When your routing table is too long, you can split it into small modules**/

const router = [
    {
        path: '/',
        component: () => import('@/views/home/dashboard'),
        name: 'dashboard',
        meta: {
            title: '首页',
            role:[0,1]
        }
    },{
        path: '/index',
        component: () => import('@/views/home/index'),
        name: 'home',
        meta: {
            title: '首页'
        }
    }
];

export default router;
