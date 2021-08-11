let express = require('express')
let router = express.Router()

let visitorControllers = require('../controllers/visitor/visitorControllers')

/*GET Login page*/
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












/* router.get('/contribuidores', (req,res)=>{
    res.render('visitor/contribuidores')
})

router.get('/actividades', (req,res)=>{
    res.render('visitor/actividades')
})

router.get('/inscribirse/:id', (req,res)=>{
    res.render('visitor/add_act')
})

router.get('/inscribirse_concurso/:id', (req,res)=>{
    res.render('visitor/add_con')
})

 */
module.exports = router