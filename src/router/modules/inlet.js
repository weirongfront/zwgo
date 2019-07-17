/*
 * @Author: Amanda
 * @Date: 2019-07-15 18:43:47
 * @Last Modified by:   Amanda
 * @Last Modified time: 2019-07-15 18:43:47
 *@Remark:  系统入口配置路由文件 */
const router = {
  path: '/inlet',
  component: ()=>import('@/views/inlet/inlet.vue'),
  name: 'inlet'
}

export default router;
