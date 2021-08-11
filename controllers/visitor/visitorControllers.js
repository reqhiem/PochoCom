let moment = require('moment');

let {
    Actividad,
    Edicion,
    Contribuidor, 
    sequelize} = require('../../models')

let Op = require('sequelize').Op;

// Pagina de logueo
const loginPageController = (req,res) =>{
    res.render('visitor/login', {page:'login'})
}

// Pagina de registro
const registerPageController = (req,res) =>{
    res.render('visitor/register', {page:'login'})
}

//EDICION
const edicionMainView = (req,res) =>{
    let _anio = req.params.anio;
    Edicion.findAll({
        where: {
            anio: _anio
        }
    }).then(ediciones => {
        let edicion = ediciones[0].dataValues;

        let dateInicio = new Date(edicion.fechaInicio);
        let dateCursor = new Date(dateInicio);
        let dateFin = new Date(edicion.fechaFin);

        edicion.fechaInicio = moment(edicion.fechaInicio).format('DD/MM/YYYY');
        edicion.fechaFin = moment(edicion.fechaFin).format('DD/MM/YYYY');
        
        let dateUno = moment(dateCursor).format('YYYY-MM-DD');
        console.log(dateUno);

        dateCursor.setDate(dateCursor.getDate() + 1);
        let dateDos = moment(dateCursor).format('YYYY-MM-DD');
        console.log(dateDos)

        dateCursor.setDate(dateCursor.getDate() + 1);
        let dateTres = moment(dateCursor).format('YYYY-MM-DD');
        console.log(dateTres)

        dateCursor.setDate(dateCursor.getDate() + 1);
        let dateCuatro = moment(dateCursor).format('YYYY-MM-DD');
        console.log(dateCuatro)

        dateCursor.setDate(dateCursor.getDate() + 1);
        let dateCinco = moment(dateCursor).format('YYYY-MM-DD');
        console.log(dateCinco)

        sequelize.query(`SELECT * FROM  pochoscom.actividads WHERE fechaInicio LIKE '${dateUno}%'`).then(actividadesone => {
            console.log(actividadesone);

            let actividadesOne = actividadesone;
            sequelize.query(`SELECT * FROM  pochoscom.actividads WHERE fechaInicio LIKE '${dateDos}%'`).then(actividadestwo => {
                console.log(actividadestwo);
    
                let actividadesTwo = actividadestwo;
                sequelize.query(`SELECT * FROM  pochoscom.actividads WHERE fechaInicio LIKE '${dateTres}%'`).then(actividadesthree => {
                    console.log(actividadesthree);
        
                    let actividadesThree = actividadesthree;
                    sequelize.query(`SELECT * FROM  pochoscom.actividads WHERE fechaInicio LIKE '${dateCuatro}%'`).then(actividadesfour => {
                        console.log(actividadesfour);
        
                        let actividadesFour = actividadesfour;
                        sequelize.query(`SELECT * FROM  pochoscom.actividads WHERE fechaInicio LIKE '${dateCinco}%'`).then(actividadescinco => {
                            console.log(actividadescinco);
            
                            let actividadesCinco = actividadescinco;
                            let dates = {dateUno, dateDos, dateTres, dateCuatro, dateCinco};

                            console.log(edicion)
                            console.log(actividadesThree[0])
                            actividadesThree[0].forEach(activity =>{
                                activity.fechaInicio = activity.fechaInicio.getHours() + ':' + activity.fechaInicio.getMinutes();
                                activity.fechaFin = activity.fechaFin.getHours() + ':' + activity.fechaFin.getMinutes();
                            })
                            Contribuidor.findAll().then(contribuidores => {
                                res.render('visitor/main', {contribuidores, actividadesOne, actividadesTwo, actividadesThree, actividadesFour, actividadesCinco, dates, edicion, title: 'Inicio', loggedIn: true})
                            })
                        })
                    })

                })
            })
        })
    })
}



// Menu de eventos
const homePageController = (req,res) =>{
    res.render('index', {page:'inicio'})
}


            
module.exports = {
    homePageController,
    loginPageController,
    registerPageController,
    edicionMainView
}