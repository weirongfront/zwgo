/**
 * When your routing table is too long, you can split it into small modules
 * */
const router = {
  path: '/login',
  component: () => import('@/views/login/login.vue'),
  name: 'login',
  meta: { title: '用户登录'}
};

export default router;
