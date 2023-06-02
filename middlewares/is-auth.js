module.exports = (req, res, next)=>{
    if(!req.user){
        if(req.user.role !== "admin"){
            res.redirect("http://localhost:300/fashion-shop-fe/auth")
        }
    }
    next()
}