const {Router} = require('express');


const UserController = require('./app/Controllers/UserController');
const JobsController = require('./app/Controllers/SenhasController');
const LoginController = require('./app/Controllers/LoginController');

const AuthController = require('./app/Controllers/AuthController');
const PainelController = require('./app/Controllers/PainelController');
const { route } = require('./app');

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

// rotas das senhas
routes.get("/senha", JobsController.index);
routes.post("/senha", JobsController.add);
routes.get("/senha/:id", JobsController.edit);
routes.put("/senha/:id", JobsController.update);
routes.delete("/senha/:id", JobsController.delete);
// fim rotas do senhas


// criar guicher

routes.post("/guiche", PainelController.add)

// chamar senha 
routes.post("/chamar", PainelController.chamarSenha)

// trazer guiches

routes.get("/guiche", PainelController.trazerGuiches)





module.exports = routes;