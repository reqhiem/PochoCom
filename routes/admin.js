let express = require('express')
let router = express.Router()

//import the controller
let adminControllers = require('../controllers/admin/adminController')
//import the middlewares
let adminMiddlewares = require('../middlewares/adminMiddlewares')

// EDICIONES
// GET pagina admin/, Renderiza vista de las ediciones
router.get('/', adminMiddlewares.isLoggedIn,adminControllers.mainView)

// Agregar Edicion, metodo POST
router.post('/edicion/agregar', adminControllers.agregarEdicion)

// Eliminar Edicion, metodo GET
router.get('/edicion/eliminar/:id', adminControllers.eliminarEdicion)

// Actualizar Edicion, metodo POST
router.post('/edicion/actualizar/:id', adminControllers.actualizarEdicion)

// Editar Edicion, metodo GET
router.get('/edicion/editar/:id', adminControllers.editarEdicion)


// POST admin/ page
router.post('/', adminControllers.loginController)

// GET admin/login
router.get('/login', adminMiddlewares.isNotLoggedIn,adminControllers.loginView)

// GET admin/logout
router.get('/logout', adminMiddlewares.isLoggedIn,adminControllers.logoutController)


// CONTRIBUIDORES

// GET pagina contrubidores/, Renderiza vista de los contribuidores
router.get('/contribuidores', adminControllers.contribuidoresView)

// GET pagina contribuidores/agregar, Renderiza vista para agregar contribuidores
router.get('/contribuidores/agregar', adminControllers.agregarContribuidorView)

// GET pagina contribuidores/:id, Renderiza la vista de los contribuidores por ID
router.get('/contribuidores/:id', (req,res)=>{
    res.render('admin/itemContribuidor')
})

// Agregar Contribuidor, metodo POST
router.post('/contribuidores/agregar_cont', adminControllers.agregarContribuidor)

// Eliminar Contribuidor, metodo GET
router.get('/contribuidores/eliminar/:id', adminControllers.eliminarContribuidor)

// Actualizar Contribuidor, metodo POST
router.post('/contribuidores/actualizar/:id', adminControllers.actualizarContribuidor)

// Editar Contribuidor, metedo GET
router.get('/contribuidores/editar/:id', adminControllers.editarContribuidor)

// 
router.get('/editar_contribuidor/:id', (req, res) => {
    res.render('admin/edit_cont')
})


//ACTIVIDADES

// GET pagina actividades/, Renderiza la vista de Actividades
router.get('/actividades', adminControllers.actividadesView)

// GET pagina actividades/agregar
router.get('/actividades/agregar', adminControllers.agregarActividadView)

// POST pagina actividades/agregar
router.post('/actividades/agregar/:tipo', adminControllers.agregarActividad)

// Eliminar actividad, metodo GET
router.get('/actividades/eliminar/:id', adminControllers.eliminarActividad)

// Agregar actividad, metodo GET
router.get('/agregar_actividad', (req,res)=>{
    res.render('admin/add_act')
})

// Editar actividad, metodo GET
router.get('/editar_actividad/:id', (req,res)=>{
    res.render('admin/edit_act')
})


router.get('/actividades/:id', (req,res)=>{
    res.render('admin/itemActividades')
})






//
router.get('/test/:val/:clave', (req,res)=>{
    res.json(req.params)
})


module.exports = router