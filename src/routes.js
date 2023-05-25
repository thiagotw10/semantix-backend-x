const {Router} = require('express');


const UserController = require('./app/Controllers/UserController');
const JobsController = require('./app/Controllers/JobsController');
const LoginController = require('./app/Controllers/LoginController');

const AuthController = require('./app/Controllers/AuthController')

const routes = new Router();

// rota do login
routes.post("/login", AuthController.login);
// fim da rota do login


routes.use(AuthController.verifyToken)

// rotas do user
routes.get("/user", UserController.index);
routes.post("/user", UserController.add);
routes.get("/user/:id", UserController.edit);
routes.put("/user/:id", UserController.update);
routes.delete("/user/:id", UserController.delete);
// fim rotas do user

// rotas do jobs
routes.get("/jobs", JobsController.index);
routes.post("/jobs", JobsController.add);
routes.get("/jobs/:id", JobsController.edit);
routes.put("/jobs/:id", JobsController.update);
routes.delete("/jobs/:id", JobsController.delete);
// fim rotas do jobs




module.exports = routes;