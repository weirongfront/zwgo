/** When your routing table is too long, you can split it into small modules**/

const router = [
    {
        path: '/',
        component: () => import('@/views/layout/hmf'),
        name: '/',
        redirect:'/home',
        meta: {
            title: '首页'
        },
        children:[
            {
                path: '/home',
                component: () => import('@/views/home/index'),
                name: 'home',
                meta: {
                    title: '首页'
                }
            }
        ]
    }
];

export default router;
