
// const express = require('express'); version common js
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });


const app = express();

// conectar la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectado'))
    .catch( error => console.log(error));


// Definir el puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;


// Abilitar pug
app.set('view engine', 'pug');

// Obtener el año actual 
app.use( ( req, res, next ) => {
    const date = new Date();

    res.locals.currentDate = date.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';

    return next();
});

// Agregar body parser para leer los daos del formulario 
app.use(express.urlencoded( { extended: true } ));

// Definir la carpeta publica 
app.use(express.static('public'));

// Agregar Router
app.use('/', router );

app.listen(port, host,() => {
    console.log(`El Servidor esta funcionando en el puerto ${port}`);
});
