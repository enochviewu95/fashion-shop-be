module.exports = (req, res, next)=>{
    if(!req.user.isLoggedIn){
        return console.log('Not Authenticated')
    }
}