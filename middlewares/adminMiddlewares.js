
const isLoggedIn = (req,res,next) =>{
    if(!req.session.user){
        res.redirect('/admin/login');
    }else{
        next();
    }
}

const isNotLoggedIn = (req,res,next) =>{
    if(req.session.user){
        res.redirect('/admin');
    }else{
        next();
    }
}

module.exports = {
    isLoggedIn,
    isNotLoggedIn
}