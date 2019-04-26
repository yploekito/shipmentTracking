module.exports = function(req,res,next){
    let isLogin = req.session.login
    if(isLogin){
        next()
    }else{
        res.redirect('/')
    }
}