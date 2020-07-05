module.exports = (route,redis) => {
    route.get('/test', (req, res) => {
        let data = {msg:"我成功了"}
        route.success(res,data);
    });
};