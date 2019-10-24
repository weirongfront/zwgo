/** When your routing table is too long, you can split it into small modules**/

const router = [
    {
        path: '/',
        component: () => import('@/views/home/dashboard'),
        name: 'home',
        meta: {title: '首页', noCache: true},
        redirect:'/user'
    }
];

export default router;
