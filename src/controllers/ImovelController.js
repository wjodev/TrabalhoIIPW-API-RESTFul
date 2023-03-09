const { mapReduce } = require('../models/Imovel')
const Imovel = require('../models/Imovel')


class ImovelController {
    
   //cadastrar imóvel
    async cadastrar(req, res) {
        const { matricula, cep, endereco, cidade, estado } = req.body //requisição dados do frontEnd

        // Validação de dados inseridos - não deixar inserir campos vazios - erros são acomulados no vetor para retornar 
        const erros = {}
            const imovelExistente = await Imovel.findOne({ matricula });
        
            if (imovelExistente) {
              return res.status(400).json({erro: 'Já existe um imóvel com o mesmo matricula' });
            }

        if (!matricula ) {
            erros['matricula'] = 'O campo matricula deve ser preenchido'
        }
        if (!cep ) {
            erros['cep'] = 'O campo CEP deve ser preenchido'
        }
        if (!endereco ) {
            erros['endereco'] = 'O campo endereço deve ser preenchido'
        }
        if (!cidade) { 
            erros['cidade'] = 'O campo cidade deve ser preenchido'
        }
        if (!estado) {
            erros['estado'] = 'O campo estado deve ser preenchido'
        }
        
        if (Object.keys(erros).length > 0) { /*Caso tenha mais de 0 errros retorna os erros ao frontEnd */
            return res
                .status(422)
                .json({
                    mensagem: 'Resolva os erros a seguir antes de continuar',
                    erros /*Retorna os erros ao front*/
                })
        }

        //Sem errros na verificação segue para o create!
        
       Imovel.create({ 
            matricula: matricula,
            cep: cep,
            endereco: endereco,
            cidade: cidade,
            estado: estado
        })
        
        // sucesso
             
            .then( Imovel => {
                return res.status(201) //status 201 = created 
                    .json({
                        mensagem: 'imovel cadastrado com sucesso',
                        imoveis: Imovel
                    })
            })
            //erro
            .catch(erro => {
                
                return res.status(500) //status 500 = internal server error
                    .json({
                        mensagem: 'Erro ao cadastrar',
                        erro
                    })
            })
    }


    

     //listar todos os imóveis
     async listar(req, res) {
        const imoveis = await Imovel.find({})
        return res.status(200)
            .json({
                mensagem: 'Lista de imóveis',
                imoveis: imoveis
            })
    }


    

    //busca imovel pelo id
    async buscar(req, res) {
        const imovelId = req.params.id //requisisão id do objeto imóvel

        Imovel.findById(imovelId)
            .then(imovel => {
                if (!imovel) {
                    return res.status(404) //status 404 = not found
                        .json({
                            mensagem: 'imovel não encontrado'
                        })
                }

        
                return res.status(200) //status 200 = OK 
                    .json({
                        mensagem: 'imovel encontrado',
                        dados: imovel
                    })
            })
            .catch(erro => {
                return res.status(500) 
                    .json({
                        mensagem: 'erro interno ' + erro.message,
                    })
            })
    }


    //atualiza imovel
    async atualizar(req, res) {
        const imovelId = req.params.id
        const { matricula, cep, endereco, cidade, estado } = req.body

        Imovel.findById(imovelId)
            .then(imovel => {
                if (!imovel) {
                    return res.status(404)
                        .json({
                            mensagem: ' imóvel não encontrado'
                        })
                }

                const erros = {}

                const imovelExistente =  Imovel.findOne({ matricula: matricula });
        
            if (imovel.matricula !== matricula && imovelExistente) {
              return res.status(400).json({erro: 'Já existe um imóvel com o mesmo matricula' });
            }

                

                if (!matricula ) {
                    erros['matricula'] = 'O campo matricula deve ser preenchido'
                }
                if (!cep ) {
                    erros['cep'] = 'O campo CEP deve ser preenchido'
                }
                if (!endereco ) {
                    erros['endereco'] = 'O campo endereço deve ser preenchido'
                }
                if (!cidade) { 
                    erros['cidade'] = 'O campo cidade deve ser preenchido'
                }
                if (!estado) {
                    erros['estado'] = 'O campo estado deve ser preenchido'
                }

                
                if (Object.keys(erros).length > 0) {
                    return res
                        .status(422) //status 422 = unprocessable entity
                        .json({
                            mensagem: 'Resolva os erros: ',
                            erros
                        })
                }

                imovel.matricula = matricula
                imovel.cep = cep
                imovel.endereco = endereco
                imovel.cidade = cidade
                imovel.estado = estado

                imovel.save()
                .then(() => {
                    return res.status(200) //status 200 = OK
                        .json({
                                mensagem: 'imóvel atualizado com sucesso',
                                dados: imovel
                          })
                    })


            })
            .catch(erro => {
                return res.status(500) 
                    .json({
                        mensagem: 'erro interno ' + erro.message,
                    })
            })

    }



    //deletar imóvel 
    async deletar(req, res) {
        const imovelId = req.params.id

        Imovel.findByIdAndDelete(imovelId)
            .then((imovel) => {
                
                if (!imovel) {
                    return res.status(404)
                        .json({
                            mensagem: 'imóvel não encontrado'
                        })
                }
                return res.status(200)
                    .json({
                        mensagem: 'imóvel deletado com sucesso'
                    })
            })
            .catch(erro => {
                return res.status(500) 
                    .json({
                        mensagem: 'erro interno ' + erro.message
                    })
            })

    }
}

//exporta o controller imóvel
module.exports = new ImovelController()