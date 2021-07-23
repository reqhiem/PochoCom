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

module.exports = router