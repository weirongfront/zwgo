module.exports = (route,db) => {
    route.get('/test', (req, res) => {
        let data = {msg:"我成功了"}
        common.sendSuccess(req,res,db,data);
    });
};