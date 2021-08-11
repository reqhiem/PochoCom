let express = require('express')
let router = express.Router()

let visitorControllers = require('../controllers/visitor/visitorControllers')

/*GET página de*/
router.get('/login', visitorControllers.loginPageController)

/*GET Register page*/
router.get('/register', visitorControllers.registerPageController)

/*GET Edicion page*/


/*GET Home page*/
router.get('/', visitorControllers.homePageController)





/*GET Login page*/
router.get('/login', visitorControllers.loginPageController)

/*GET Register page*/
router.get('/register', visitorControllers.registerPageController)


/*GET Edicion page*/
router.get('/edicion/:anio', visitorControllers.edicionMainView)


module.exports = router