let express = require('express')
let router = express.Router()

let generalControllers = require('../controllers/generalControllers')

/*Require Controllers*/

/*GET Home page*/
router.get('/', generalControllers.homePageController)

/*GET Login page*/
router.get('/login', generalControllers.loginPageController)

/*GET Register page*/
router.get('/register', generalControllers.registerPageController)

module.exports = router