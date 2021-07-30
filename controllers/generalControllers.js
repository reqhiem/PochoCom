
// Menu de eventos
const homePageController = (req,res) =>{
    res.render('index', {page:'inicio'})
}


module.exports = {
    homePageController
}