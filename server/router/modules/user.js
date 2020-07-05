const userController = require('../../controller/user');
//用户模块路由
module.exports = (route) => {
    // 注册
    route.post('/user/register', userController.register);
    // 登录
    route.post('/user/login', userController.login);
    // 登出
    route.post('/user/logout', userController.logout);
    // 用户列表
    route.get('/user/list', userController.list);
    // 获取用户信息
    route.get('/user/info', userController.info);
    // 修改密码
    route.post('/user/updatePwd', userController.updatePwd);
    // 通过id设置用户状态
    route.post('/user/setStatusById', userController.setStatusById);
}