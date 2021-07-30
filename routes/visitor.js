let express = require('express')
let router = express.Router()

let visitorControllers = require('../controllers/visitor/visitorControllers')

/*GET Login page*/
router.get('/login', visitorControllers.loginPageController)

/*GET Register page*/
router.get('/register', visitorControllers.registerPageController)

/*GET Edicion page*/

module.exports = router