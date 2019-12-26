/** When your routing table is too long, you can split it into small modules**/

const router = [
    {
        path: '/tools',
        component: () => import('@/views/layout/hmf'),
        name: 'tools',
        meta: {title: '工具类'},
        children:[
            {
                path: '/tools/qrcode',
                component: () => import('@/views/tools/qrcode'),
                name: 'qrcode',
                meta: {title: '二维码工具'}
            },
            {
                path: '/tools/notebook',
                component: () => import('@/views/tools/notebook'),
                name: 'notebook',
                meta: {title: '记事本'}
            },
            {
                path: '/tools/tree',
                component: () => import('@/views/tools/treemenu'),
                name: 'tree',
                meta: {title: '菜单配置'}
            }
        ]
    }
];

export default router;
