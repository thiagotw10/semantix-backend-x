const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
require('./config/Connection');


class App {

    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }


    middlewares(){
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use((req, res, next) =>{
            
            
            res.header("Access-Controll-Allow-Origin", "*");
            res.header("Access-Controll-Allow-Methods", "GET, POST, PUT, DELETE");
            res.header("Access-Controll-Allow-Headers", "Access, Content-type, Authorization, Acept, Origin, X-Requested-With")
      
            this.app.use(cors({origin: "https://semantix-api-2.herokuapp.com", credentials: true}));
            next();
        })
    }


    routes(){
        this.app.use(routes);
    }



}


module.exports = new App().app;
