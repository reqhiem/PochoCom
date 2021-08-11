
let moment = require('moment')
const {
    Actividad, 
    Usuario, 
    Edicion,
    Contribuidor,
    sequelize} = require('../../models')

//EDICIONES

//Rennderiza la pagina principal donde estara el dashboard
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

//Controladores para las funcionalidades de agregar, eliminar, editar y actualizar edicion

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

const editarEdicion = (req, res) => {
    Edicion.findOne({
        where: {
            id: Number(req.params.id)
        }
    }).then(edicion => {
        res.render('admin/edit_edi', { edicion, categoria: 'Editar edicion' })
    })
}


const actualizarEdicion = (req, res) => {
    let { anio, nombre, fechaInicio, fechaFin } = req.body
    let id = req.params.id
    Edicion.findOne({
        where: {
            id: id
        }
    }).then(edicion => {
        edicion.anio = req.body.anio;
        edicion.nombre = req.body.nombre;
        edicion.fechaInicio = req.body.fechaInicio;
        edicion.fechaFin = req.body.fechaFin;
        edicion.save();
        res.redirect('/admin/');
    })
}

//CONTRIBUIDORES

//Renderiza la pagina principal para contribuidor
const contribuidoresView = (req,res) => {
    Contribuidor.findAll().then(data => {
        res.render('admin/contribuidores', {data, categoria: 'Contribuidores'})
    })
}


//Renderiza la pagina para agregar un contribuidor
const agregarContribuidorView = (req,res) => {
    res.render('admin/add_cont', {categoria: 'Agregar contribuidor'})
}


//Controladores para las funcionalidades de agregar, eliminar, editar y actualizar contribuidor

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

const editarContribuidor = (req, res) => {
    Contribuidor.findOne({
        where: {
            id: Number(req.params.id)
        }
    }).then(contribuidor => {
        res.render('admin/edit_cont', { contribuidor, categoria: 'Editar contribuidor' })
    })
    
}

const actualizarContribuidor = (req, res) => {
    let { nombre, apellPaterno, apellMaterno, especialidad, descripcion, email } = req.body
    let id = req.params.id
    Contribuidor.findOne({
        where: {
            id: id
        }
    }).then(contribuidor => {
        contribuidor.nombre = req.body.nombre,
            contribuidor.apellPaterno = req.body.apellPaterno,
            contribuidor.apellMaterno = req.body.apellMaterno,
            contribuidor.especialidad = req.body.especialidad,
            contribuidor.descripcion = req.body.descripcion,
            contribuidor.email = req.body.email
        contribuidor.save();
        res.redirect('/admin/contribuidores');
    })
}

// ACTIVIDADES

//Renderiza la pagina principal de funcionalidades
const actividadesView = (req,res) => {
    Actividad.findAll().then(data => {
        console.log(data)
        data.forEach( actividad => {
            actividad.dataValues.fechaInicio = moment(actividad.dataValues.fechaInicio).format('MMMM Do YYYY, h:mm:ss a')
            actividad.dataValues.fechaFin = moment(actividad.dataValues.fechaFin).format('MMMM Do YYYY, h:mm:ss a')
        })
        res.render('admin/actividades', {data, categoria: 'Actividades'})
    })
}

//Renderiza el formulario para agregar acividades
const agregarActividadView = (req,res) => {
    res.render('admin/add_act', {categoria: 'Agregar actividad'})
}

//Controlador para la funcionalidad de agregar actividad 
//Dependiendo del tipo de actividad, este tendra un diferente comportamiento
const agregarActividad = (req,res) => {
    switch(req.params.tipo){
        case 'protocolar':
            let {nombre, descripcion, fechaInicio, fechaFin, enlaceReunion,  edicionAnio} = req.body
            
            Edicion.findOne({
                where: {
                    anio: edicionAnio
                }
            }).then(edicion => {
                let edicionId = edicion.dataValues.id;
                Actividad.create({
                    nombre: nombre,
                    descripcion: descripcion,
                    fechaInicio: new Date(fechaInicio),
                    fechaFin: new Date(fechaFin),
                    enlaceReunion: enlaceReunion,
                    isProtocolar: true,
                    isPonencia: false,
                    isPanel: false,
                    topico: '',
                    isConcurso: false,
                    bases: '',
                    EdicionId: edicionId
    
                }).then(actividad => {
                    console.log(actividad)
                    res.redirect('/admin/actividades')
                })
            })
            break;
        case 'ponencia':
            Edicion.findOne({
                where: {
                    anio: req.body.edicionAnio
                }
            }).then(edicion => {
                let edicionId = edicion.dataValues.id;
                Actividad.create({
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    fechaInicio: new Date(req.body.fechaInicio),
                    fechaFin: new Date(req.body.fechaFin),
                    enlaceReunion: req.body.enlaceReunion,
                    isProtocolar: false,
                    isPonencia: true,
                    isPanel: false,
                    topico: req.body.topico,
                    isConcurso: false,
                    bases: '',
                    EdicionId: edicionId
                }).then(actividad => {
                    //console.log(actividad)
                    res.redirect('/admin/actividades')
                })
            })
            break;
        case 'panel':
            Edicion.findOne({
                where: {
                    anio: req.body.edicionAnio
                }
            }).then(edicion => {
                let edicionId = edicion.dataValues.id;
                Actividad.create({
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    fechaInicio: new Date(req.body.fechaInicio),
                    fechaFin: new Date(req.body.fechaFin),
                    enlaceReunion: req.body.enlaceReunion,
                    isProtocolar: false,
                    isPonencia: false,
                    isPanel: true,
                    topico: req.body.topico,
                    isConcurso: true,
                    bases: '',
                    EdicionId: edicionId
                }).then(actividad => {
                    //console.log(actividad)
                    res.redirect('/admin/actividades')
                })
            })
            break;
        case 'concurso':
                Edicion.findOne({
                    where: {
                        anio: req.body.edicionAnio
                    }
                }).then(edicion => {
                    let edicionId = edicion.dataValues.id;
                    Actividad.create({
                        nombre: req.body.nombre,
                        descripcion: req.body.descripcion,
                        fechaInicio: new Date(req.body.fechaInicio),
                        fechaFin: new Date(req.body.fechaFin),
                        enlaceReunion: req.body.enlaceReunion,
                        isProtocolar: false,
                        isPonencia: false,
                        isPanel: false,
                        topico: '',
                        isConcurso: true,
                        bases: req.body.bases,
                        EdicionId: edicionId
                    }).then(actividad => {
                        //console.log(actividad)
                        res.redirect('/admin/actividades')
                    })
                })
                break;
    }

}

const eliminarActividad = (req,res) => {
    Actividad.destroy({
        where: {
            id: req.params.id
        }
    }).then(actividad => {
        res.redirect('/admin/actividades')
    })    
}


// Inicio de sesion para el administrador
const loginView = (req,res) => {
    res.render('admin/login')
}

//Guarda las cookies, las sesion del administrador y las variables de sesion
const loginController = (req,res) => {
    //consulta si el usuario esta en la BD
    let username = req.body.username;
    let password = req.body.password;
    //Al ser cierto, redirige a la pagina principal y configura las cookies
    req.session.user = username
    req.session.rol = 'admin'
    res.redirect('/admin/')
}

const logoutController = (req,res) => {
    req.session.destroy()
    res.redirect('/admin/login')
}


module.exports = {
    mainView, agregarEdicion, eliminarEdicion, actualizarEdicion, editarEdicion,
    loginView,
    loginController, logoutController,
    actividadesView, agregarActividadView, agregarActividad, eliminarActividad,
    contribuidoresView, agregarContribuidorView,
    agregarContribuidor, eliminarContribuidor, editarContribuidor, actualizarContribuidor
}