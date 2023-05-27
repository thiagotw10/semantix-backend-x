const Senha = require('./Models/Senhas');
const Guiche = require('./Models/Guiches');
const SenhaGuiche = require('./Models/SenhaGuiche');

const yup = require('yup');
const { json } = require('express/lib/response');

class PainelController {
   



    async index(req, res){
        const modelSenha = await Senha()
        let valor = modelSenha.findAll()
        const data = await valor;
        console.log(data)

        return res.status(200).json({
            message: "mostrando todas as senhas geradas",
            data
        })

        
    }

    async add(req, res){
        // gerar senhas aleatorias
        const { numero_guiche } = req.body
        let schema = yup.object().shape({
            numero_guiche: yup.string().required(),
        })

        
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                message: "numero_guiche não existe ou estar vazio"
            })
        }

        

        console.log(numero_guiche)
        const modelGuiche = await Guiche()
        let guiche = await modelGuiche.findOne({where: {numero_guiche: numero_guiche} })

        if(guiche){
            return res.status(400).json({
                message: "Esse guichê já existe"
            })
        }

        await modelGuiche.create({
            numero_guiche: numero_guiche
        })

        return res.status(200).json({
            message: "Guicher criado"
        })

    }

    async chamarSenha(req, res){
        // gerar senhas aleatorias
        const modelSenha = await Senha()
        const modelGuiche = await Guiche()
        const modelSenhaGuiche = await SenhaGuiche()

        const { numero_guiche, numero_senha } = req.body

        let senha = await modelSenha.findOne({where: {senha: numero_senha, status: 'disponivel'}})
        let guiche = await modelGuiche.findOne({where: {numero_guiche: numero_guiche, status: 'disponivel'} })
        if(!guiche || !senha){
            return res.status(400).json({
                message: "A senha ou guichê estar indisponivel",
            })
        }
        console.log(senha)
        console.log(guiche)
        
        senha.status = 'indisponivel'
        senha.save()
        guiche.status = 'indisponivel'
        guiche.save()

        modelSenhaGuiche.create({
            id_senha: senha.id,
            id_guiche: guiche.id
        })


        return res.status(200).json({
            message: "senhas",
            guiche: guiche,
            senha: senha
        })
    }

    async trazerGuiches(req, res){
        // gerar senhas aleatorias
        const modelGuiche = await Guiche()

        const { numero_guiche } = req.body

        let guiche = await modelGuiche.findAll()
  

        return res.status(200).json({
            message: "guiches",
            guiches: guiche
        })
    }


    async edit(req, res){

    }

    async update(req, res){

    }


    async delete(req, res){
 
    }






}

module.exports = new PainelController();