const User = require('./Models/User');
const bcrypt = require('bcryptjs');
const yup = require('yup');
const { json } = require('express/lib/response');

class UserController {

   async index(req, res){
        const user = await User();
        let valor = user.findAll();
        const data = await valor;
        console.log(data)

        return res.status(200).json({
            message: "mostrando todos os dados do usuarios",
            data
        })

        
    }

    async add(req, res){
        const user = await User();

        // validação de campos pelo yup 
            let schema = yup.object().shape({

                nome: yup.string().required(),
                email: yup.string().email().required(),
                senha: yup.string().required(),
                telefone: yup.string().required()
            })

            
            if(!(await schema.isValid(req.body))){
                return res.status(400).json({
                    message: "dados invalidos"
                })
            }
        //   fim yup


   
        
        let userExistEmail = await user.findOne({ where: { email: req.body.email } });

        if(userExistEmail){
            console.log(userExistEmail)
            return res.status(400).json({
                message: "nome ou email já existe."
            })
        }
        
        let userExistNome = await user.findOne({ where: {nome: req.body.nome }});

        if(userExistNome){

            return res.status(400).json({
                message: "nome ou email já existe."
            })
        }


        const {nome, email, senha, telefone} = req.body;

        const data = {
            nome,
            email,
            senha,
            telefone
        }

        data.senha = await bcrypt.hash(data.senha, 8);

        try {
            await user.create(data)
            return res.status(200).json({
                message: "usuario cadastrado com sucesso!!"
            })
        } catch (error) {
            return res.status(400).json({
                message: "erro ao tentar inserir usuario"
            })
        }finally{
            console.log(req.body);
        }
        
        

    }


   async edit(req, res){

        let id = req.params.id;

        User.findById(id, function (err, adventure) {
            if(err)
            return res.status(400).json({
                erro:true 
            })

            let data = adventure;
            return res.status(200).json({
                message: `user ${id} `,
                data
            })

        });

    }

   async update(req, res){

        let id =  req.params.id;

        const {nome, email, senha, telefone} = req.body;

         const data = {
            nome,
            email,
            senha,
            telefone
         }

   if(data.senha){
            data.senha = await bcrypt.hash(data.senha, 8);

            User.findByIdAndUpdate(id, { nome: data.nome, email: data.email, senha: data.senha, telefone: data.telefone }, function(err, valid){
                if(err)
                return res.status(400).json({
                    erro:true 
                })
    
                return res.status(200).json({
                    message: `usuario editado com sucesso!!`,
                })
    
    
            })
        }else{
            User.findByIdAndUpdate(id, { nome: data.nome, email: data.email, telefone: data.telefone }, function(err, valid){
                if(err)
                return res.status(400).json({
                    erro:true 
                })
    
                return res.status(200).json({
                    message: `usuario editado com sucesso!!`,
                })
    
    
            })
        }
    }


    delete(req, res){

        let id =  req.params.id;

        User.findByIdAndRemove(id, function(err, valid){
            if(err)
            return res.status(400).json({
                erro:true 
            })


            return res.status(200).json({
                message: `usuario deletado com sucesso!!`,
            })
        })
    }





}

module.exports = new UserController();
