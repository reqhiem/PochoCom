let express = require('express')
let router = express.Router()

let generalControllers = require('../controllers/generalControllers')

/*Require Controllers*/

/*GET Home page*/
router.get('/', generalControllers.homePageController)


module.exports = router