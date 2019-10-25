/** When your routing table is too long, you can split it into small modules**/

const router = [
    {
        path: '/custom',
        component: () => import('@views/home/dashboard'),
        name: 'custom',
        meta: {title: '用户管理', noCache: true},
        redirect:'/custom/list',
        role:[0],
        children:[
            {
                path: '/custom/list',
                component: () => import('@views/user/list'),
                name: 'custom-list',
                meta: {title: '用户列表', noCache: true},
                role:[0]
            }
        ]
    }
];

export default router;
