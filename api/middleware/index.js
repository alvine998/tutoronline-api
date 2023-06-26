exports.middlewareHere = async (req, res, next) => {
    try {
        if(!req.header('x-app-id')){
            return res.status(401).send({
                message: "Choose your app_id!",
                code: 401
            })
        }
        if(req.header('bearer-token') !== "serversalesproperties2023"){
            return res.status(401).send({
                message: "Access Denied!",
                code: 401
            })
        }
        next()
    } catch (error) {
        console.log(error);
    }
}