
// Pagina de logueo
const loginPageController = (req,res) =>{
    res.render('visitor/login', {page:'login'})
}

// Pagina de registro
const registerPageController = (req,res) =>{
    res.render('visitor/register', {page:'login'})
}

module.exports = {
    loginPageController,
    registerPageController
}