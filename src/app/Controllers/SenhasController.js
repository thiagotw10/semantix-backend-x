const Senha = require('./Models/Senhas');
const yup = require('yup');
const { json } = require('express/lib/response');

class JobsController {
   



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
        const { prioridade } = req.body;
        let schema = yup.object().shape({
            prioridade: yup.string().required(),
        })

        
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                message: "prioridade precisa ter valor sim ou nao"
            })
        }

        console.log(prioridade)
        if(prioridade != 'sim' && prioridade != 'nao'){
            return res.status(400).json({
                message: "prioridade precisa ter valor sim ou nao"
            })
        }

        const modelSenha = await Senha()

        function gerarSequenciaAleatoria() {
            var sequencia = [];
            
            for (var i = 0; i < 5; i++) {
              var numeroAleatorio = Math.floor(Math.random() * 10); // Gera um número aleatório entre 0 e 9
              sequencia.push(numeroAleatorio);
            }
            
            return sequencia.join(''); // Junta os dígitos em uma única string
        }

        const senhaCriada = await modelSenha.create({
            senha: gerarSequenciaAleatoria(),
            prioridade: prioridade
        })

        if(senhaCriada){
            return res.status(200).json({
                message: "Senha criada com sucesso, guarde sua senha!!",
                senha: senhaCriada.senha
            })
        }
      
    }


    async edit(req, res){

    }

    async update(req, res){

    }


    async delete(req, res){
 
    }






}

module.exports = new JobsController();