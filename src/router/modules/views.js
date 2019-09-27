/** When your routing table is too long, you can split it into small modules**/

const router = [
	{
		path: '/views',
		component: () => import('@/views/views/index'),
		name: 'views',
		meta: {title: '视图', noCache: true}
	}
];

export default router;
