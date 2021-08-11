
let moment = require('moment')
const {
    Actividad, 
    Usuario, 
    Edicion,
    Contribuidor,
    sequelize} = require('../../models')

//EDICIONES
//render the main dashboard
const mainView = (req,res) => {
    Edicion.findAll().then(data => {
        //console.log(data)
        
        data.forEach( edicion => {
            edicion.dataValues.fechaInicio = moment(edicion.dataValues.fechaInicio).format('DD/MM/YYYY')
            edicion.dataValues.fechaFin = moment(edicion.dataValues.fechaFin).format('DD/MM/YYYY')
        })

        res.render('admin/dashboard', {data, categoria: 'Ediciones'})
    }) 
    
}
// add Edicion controller
const agregarEdicion = (req,res) =>{
    let {anio, nombre, fechaInicio, fechaFin} = req.body
    Edicion.create({
        anio: req.body.anio,
        nombre: req.body.nombre,
        fechaInicio: req.body.fechaInicio,
        fechaFin: req.body.fechaFin
    }).then(edicion => {
        res.redirect('/admin/')
    })
}

// delete Edicion controller
const eliminarEdicion = (req,res) => {
    let id = req.params.id
    Edicion.destroy({
        where: {
            id: id
        }
    }).then(edicion => {
        res.redirect('/admin/')
    })
}

//CONTRIBUIDORES

//render the contribuidores page
const contribuidoresView = (req,res) => {
    Contribuidor.findAll().then(data => {
        res.render('admin/contribuidores', {data, categoria: 'Contribuidores'})
    })
}


//render the agregarContribuidorView page
const agregarContribuidorView = (req,res) => {
    res.render('admin/add_cont', {categoria: 'Agregar contribuidor'})
}


//add contribudor controller
/*
const agregarContribuidor = (req,res) =>{
    let {nombre, apellPaterno, apellMaterno,especialidad,descripcion,email} = req.body
    Contribuidor.create({
        nombre: req.body.nombre,
        apellPaterno: req.body.apellPaterno,
        apellMaterno: req.body.apellMaterno,
        especialidad: req.body.especialidad,
        descripcion: req.body.descripcion,
        email: req.body.email
    }).then(Contribuidor => {
        res.redirect('/admin/contribuidores')
    })
}
const eliminarContribuidor = (req,res) => {
    let id = req.params.id
    Contribuidor.destroy({
        where: {
            id: id
        }
    }).then(edicion => {
        res.redirect('/admin/contribuidores')
    })
}
*/







// ACTIVIDADES
//View the main actividades page
const actividadesView = (req,res) => {
    Actividad.findAll().then(data => {
        console.log(data)
        res.render('admin/actividades', {data, categoria: 'Actividades'})
    })
}

//GET for actividades/agregar page
const agregarActividadView = (req,res) => {
    res.render('admin/add_act', {categoria: 'Agregar actividad'})
}

//handle agregarAcividad POST
const agregarActividad = (req,res) => {
    res.json(req.body + req.params)
}




// render the admin/login page
const loginView = (req,res) => {
    res.render('admin/login')
}

// login the user and save the cookies and session variables
const loginController = (req,res) => {
    // consult de DB to see if the user is in the DB
    let username = req.body.username;
    let password = req.body.password;
    // if the user is in the DB, then redirect to the main dashboard and set the cookies
    req.session.user = username
    req.session.rol = 'admin'
    res.redirect('/admin/')
}

const logoutController = (req,res) => {
    req.session.destroy()
    res.redirect('/admin/login')
}


module.exports = {
    mainView, agregarEdicion, eliminarEdicion,
    loginView,
    loginController, logoutController,
    actividadesView, agregarActividadView, agregarActividad,
    contribuidoresView, agregarContribuidorView
}