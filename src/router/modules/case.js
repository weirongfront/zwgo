/** When your routing table is too long, you can split it into small modules**/

const router = [
    {
        path: '/case',
        component: () => import('@/views/layout/hmf'),
        name: 'case',
        meta: {title: '案例'},
        children:[
            {
                path: '/case/lock',
                component: () => import('@/views/case/lock'),
                name: 'lock',
                meta: {title: '时钟'}
            }
        ]
    }
];

export default router;
