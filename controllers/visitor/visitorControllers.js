let {
    Actividad,
    Edicion,
    Contribuidor, 
    sequelize} = require('../../models')

// Pagina de logueo
const loginPageController = (req,res) =>{
    res.render('visitor/login', {page:'login'})
}

// Pagina de registro
const registerPageController = (req,res) =>{
    res.render('visitor/register', {page:'login'})
}

//EDICION
const edicionMainView = (req,res) =>{
    let _anio = req.params.anio;
    Edicion.findAll({
        where: {
            anio: _anio
        }
    }).then(ediciones => {
        let edicion = ediciones[0].dataValues;
        console.log(edicion);
        Actividad.findAll({
            include: [{
                model: Edicion,
                as: 'Edicion',
                where: {
                    anio: _anio
                }
            }]
        }).then(data => {
            let actividades = [];
            if(data.length > 0){
                actividades = data;
            }
            res.render('visitor/main', {data, edicion, title: 'Inicio', edicion:"2021", loggedIn: true})
        })
    })
}



// Menu de eventos
const homePageController = (req,res) =>{
    res.render('index', {page:'inicio'})
}


            
module.exports = {
    homePageController,
    loginPageController,
    registerPageController,
    edicionMainView
}