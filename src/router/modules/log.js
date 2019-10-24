/** When your routing table is too long, you can split it into small modules**/

const router = [
    {
        path: '/log',
        component: () => import('@views/home/dashboard'),
        name: 'log',
        meta: {title: '日志管理', noCache: true},
        redirect:'/log/list',
        children:[
            {
                path: '/log/list',
                component: () => import('@views/log/list'),
                name: 'log-list',
                meta: {title: '日志列表', noCache: true}
            }
        ]
    }
];

export default router;
