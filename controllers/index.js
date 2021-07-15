var express = require('express');
var router = express.Router();

// For test connection to database
const {Sequelize} = require('sequelize')
// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('pochoscom', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql'
});

/* GET users listing. */
router.get('/', function(req, res) {
    let msg;
    try {
        sequelize.authenticate();
        msg = 'Connection has been established successfully.';
    } catch (error) {
        msg = 'Unable to connect to the database:';
    }
    res.render('index', {title: "Inicio", page: "inicio", msg: msg});
});

module.exports = router;