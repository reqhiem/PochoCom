let express = require('express')
let router = express.Router()

//import the controller
let adminControllers = require('../controllers/admin/adminController')
//import the middlewares
let adminMiddlewares = require('../middlewares/adminMiddlewares')

/*EDICIONES*/
/*GET admin/ page, Render Ediciones View*/
router.get('/', adminMiddlewares.isLoggedIn,adminControllers.mainView)

//Agregar Edicion metodo POST
router.post('/edicion/agregar', adminControllers.agregarEdicion)

//Eliminar Edicion metodo GET
router.get('/edicion/eliminar/:id', adminControllers.eliminarEdicion)



/*POST admin/ page*/
router.post('/', adminControllers.loginController)

/*GET admin/login*/
router.get('/login', adminMiddlewares.isNotLoggedIn,adminControllers.loginView)

/*GET admin/logout*/
router.get('/logout', adminMiddlewares.isLoggedIn,adminControllers.logoutController)





/*CONTRIBUIDORES*/

//GET contrubidores/ page, Render contrubuidores View
router.get('/contribuidores', adminControllers.contribuidoresView)

router.get('/contribuidores/agregar', adminControllers.agregarContribuidorView)

//GET contrubidores/:id page, Render contrubuidores View By Id
router.get('/contribuidores/:id', (req,res)=>{
    res.render('admin/itemContribuidor')
})
/*
router.post('/contribuidores/agregar', adminControllers.agregarContribuidor)

//Eliminar Edicion metodo GET
router.get('/contribuidores/eliminar/:id', adminControllers.eliminarContribuidor)
*/


//ACTIVIDADES

//GET actividades/ page, Render actividades View
router.get('/actividades', adminControllers.actividadesView)


//GET actividades/agregar page
router.get('/actividades/agregar', adminControllers.agregarActividadView)

//GET actividades/agregar page
router.post('/actividades/agregar/:tipo', adminControllers.agregarActividad)





router.get('/agregar_actividad', (req,res)=>{
    res.render('admin/add_act')
})

router.get('/editar_actividad/:id', (req,res)=>{
    res.render('admin/edit_act')
})




router.get('/editar_contribuidor/:id', (req,res)=>{
    res.render('admin/edit_cont')
})

router.get('/actividades/:id', (req,res)=>{
    res.render('admin/itemActividades')
})






//
router.get('/test/:val/:clave', (req,res)=>{
    res.json(req.params)
})


module.exports = router