/** When your routing table is too long, you can split it into small modules**/

const router = [
    {
        path: '/questionnaire',
        component: () => import('@/views/ques/questionnaire'),
        name: 'questionnaire',
        meta: {title: '问卷详情', noCache: true}
    },
    {
        path: '/report',
        component: () => import('@/views/ques/report'),
        name: 'report',
        meta: {title: '问卷报告', noCache: true}
    }
];

export default router;
