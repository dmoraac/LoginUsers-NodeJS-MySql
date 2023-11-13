// 1-Invocamos a express
const express = require('express');
const app = express();

// 2-Seteamos urlencoded para capturar los datos del formulario.
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// 3-Invocamos a dotenv.
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

// 4- Seteamos el directorio public o assets.
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + 'public'));

// 5-Establecemos el motor de plantillas EJS.
app.set('view engine', 'ejs');

// 6-Invocamos a bcryptjs.
const bcryptjs = require('bcryptjs');

// 7-Variables de sesión.
const session = require('express-session');
app.use(session({
    secret:'secret',
    resave: 'true',
    saveUninitialized: true
}));

// 8-Invocamos al módulo de conexión de la Base de Datos.
const connection = require('./database/db');

// 9- Establecemos las Rutas.
app.get('/login', (req, res) => {
    res.render('login')
});

app.get('/register', (req, res) => {
    res.render('register')
});

app.get('/users', (req, res) => {
    res.render('users')
});


// 10-Métodos CRUD con la Base de Datos.

// 10.1- Método para INSERTAR DATOS DE USUARIO en la Base de Datos.
app.post('/register', async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const last_name1 = req.body.last_name1;
    const last_name2 = req.body.last_name2;
    const user = req.body.user;
    const password = req.body.password;

    let passwordHash = await bcryptjs.hash(password, 8);

    connection.query('INSERT INTO tbl_user SET ?', {id:id, name:name, last_name1:last_name1, last_name2:last_name2, user:user, password:passwordHash}, async (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.render('register', {
                alert: true,
                alertTitle: 'Registro de Usuario',
                alertMessage: '¡Registro exitoso!',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: ''
            });
        }
    });
});


// Método para CONSULTAR datos en la Base de Datos.

app.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM tbl_user', (err, users) => {
            if(err){
                res.json(err);
            }
            res.render('users', {
                data: users
            });
        });
    });
};

// 11-Autenticación.
app.post('/auth', async (req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    let passwordHaash = await bcryptjs.hash(password, 8);

    if(user && password){
        connection.query('SELECT * FROM tbl_user WHERE user = ?', [user], async (error, results) => {
            if ((results.length == 0) || !(await bcryptjs.compare(password, results[0].password))){
                res.render('login', {
                    alert: true,
                    alertTitle: 'Acceso Denegado',
                    alertMessage: 'Verifique su usuario y/o contraseña',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 3000,
                    ruta: 'login'
                });
                } else {
                    req.session.loggedin = true;
                    req.session.name = results[0].name;
                    req.session.last_name1 = results[0].last_name1;
                    res.render('login', {
                        alert: true,
                        alertTitle: 'Acceso Autorizado',
                        alertMessage: 'Por favor, espere...',
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 3000,
                        ruta: ''
                    });
                }
        });
    } else {
        res.render('login', {
            alert: true,
            alertTitle: 'Acceso Denegado',
            alertMessage: 'Verifique su usuario y/o contraseña',
            alertIcon: 'error',
            showConfirmButton: true,
            timer: 3000,
            ruta: 'login'
        });
    }
});

// 12-Auth Pages
app.get('/', (req, res) => {
    if(req.session.loggedin){
        res.render('index',  {
            login:true,
            name:req.session.name,
            last_name1: req.session.last_name1
         });
    }else{
        res.render('login');
    }
});


// 13-CERRAR SESION
app.get('/logout', (req, res) => {
req.session.destroy(() => {
        res.redirect('/');
    });
});

app.listen(3000, (req, res) => {
    console.log('Server running in http://localhost:3000');
});