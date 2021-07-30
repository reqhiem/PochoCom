let express = require('express')
let router = express.Router()

//import the controller
let adminControllers = require('../controllers/admin/adminController')
//import the middlewares
let adminMiddlewares = require('../middlewares/adminMiddlewares')

/*GET admin/ page*/
router.get('/', adminMiddlewares.isLoggedIn,adminControllers.mainView)

/*POST admin/ page*/
router.post('/', adminControllers.loginController)

/*GET admin/login*/
router.get('/login', adminMiddlewares.isNotLoggedIn,adminControllers.loginView)

/*GET admin/logout*/
router.get('/logout', adminMiddlewares.isLoggedIn,adminControllers.logoutController)

router.get('/actividades', (req,res)=>{
    res.render('admin/actividades')
})

router.get('/contribuidores', (req,res)=>{
    res.render('admin/contribuidores')
})

router.get('/contribuidores/:id', (req,res)=>{
    res.render('admin/itemContribuidor')
})

module.exports = router