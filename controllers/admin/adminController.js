
//render the main dashboard
const mainView = (req,res) => {
    res.render('admin/dashboard')
}

// render the admin/login page
const loginView = (req,res) => {
    res.render('admin/login')
}

// login the user and save the cookies and session variables
const loginController = (req,res) => {
    // consult de DB to see if the user is in the DB
    let username = req.body.username;
    let password = req.body.password;
    // if the user is in the DB, then redirect to the main dashboard and set the cookies
    req.session.user = username
    req.session.rol = 'admin'
    res.redirect('/admin/')
}

const logoutController = (req,res) => {
    req.session.destroy()
    res.redirect('/admin/login')
}

module.exports = {
    mainView,
    loginView,
    loginController,
    logoutController
}