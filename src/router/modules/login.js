/** When your routing table is too long, you can split it into small modules**/

const router = [
    {
        path: '/login',
        component: () => import('@/views/login'),
        name: 'login',
        meta: {title: '登录', noCache: true}
    },
    {
        path: '/register',
        component: () => import('@views/user/register'),
        name: 'register',
        meta: {title: '用户注册', noCache: true}
    }
];

export default router;
