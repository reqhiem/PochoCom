
// Menu de eventos
const homePageController = (req,res) =>{
    res.render('index', {page:'inicio'})
}

// Pagina de logueo
const loginPageController = (req,res) =>{
    res.render('login', {page:'login'})
}

// Pagina de registro
const registerPageController = (req,res) =>{
    res.render('register', {page:'login'})
}

module.exports = {
    homePageController,
    loginPageController,
    registerPageController
}