/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Diretor
 * Data: 17/05/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const diretorDAO = require('../../model/DAO/diretor.js')

//Função para tratar a inserção de um novo diretor no DAO
const inserirDiretor = async function(diretor, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if (
                diretor.nome_diretor       == '' || diretor.nome_diretor       == undefined || diretor.nome_diretor       == null || diretor.nome_diretor.length > 100 ||
                diretor.biografia          == '' || diretor.biografia          == undefined || diretor.biografia          == null || diretor.biografia.length > 1000 ||
                diretor.data_nascimento    == '' || diretor.data_nascimento    == undefined || diretor.data_nascimento    == null || diretor.data_nascimento.length > 10 ||
                diretor.tbl_sexo_id_sexo   == '' || diretor.tbl_sexo_id_sexo   == undefined || isNaN(diretor.tbl_sexo_id_sexo)
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                let result = await diretorDAO.insertDiretor(diretor)

                if(result)
                    return message.SUCCESS_CREATED_ITEM //201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de um diretor no DAO
const atualizarDiretor = async function(id, diretor, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if (
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                diretor.nome_diretor       == '' || diretor.nome_diretor       == undefined || diretor.nome_diretor       == null || diretor.nome_diretor.length > 100 ||
                diretor.biografia          == '' || diretor.biografia          == undefined || diretor.biografia          == null || diretor.biografia.length > 1000 ||
                diretor.data_nascimento    == '' || diretor.data_nascimento    == undefined || diretor.data_nascimento    == null || diretor.data_nascimento.length > 10 ||
                diretor.tbl_sexo_id_sexo   == '' || diretor.tbl_sexo_id_sexo   == undefined || isNaN(diretor.tbl_sexo_id_sexo)
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                let resultExistente = await diretorDAO.selectByIdDiretor(parseInt(id))

                if(resultExistente && resultExistente.length > 0){
                    diretor.id_diretor = parseInt(id)
                    let result = await diretorDAO.updateDiretor(diretor)

                    if(result)
                        return message.SUCCESS_UPDATED_ITEM //200
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de um diretor no DAO
const excluirDiretor = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let resultExistente = await diretorDAO.selectByIdDiretor(parseInt(id))

            if(resultExistente && resultExistente.length > 0){
                let result = await diretorDAO.deleteDiretor(parseInt(id))

                if(result)
                    return message.SUCCESS_DELETED_ITEM //200
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de todos os diretores
const listarDiretor = async function(){
    try {
        let result = await diretorDAO.selectAllDiretor()
        let dadosDiretor = {}

        if(result && result.length > 0){
            dadosDiretor.status = true
            dadosDiretor.status_code = 200
            dadosDiretor.items = result.length
            dadosDiretor.diretores = result

            return dadosDiretor
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para buscar um diretor pelo ID
const buscarDiretor = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let result = await diretorDAO.selectByIdDiretor(parseInt(id))
            let dadosDiretor = {}

            if(result && result.length > 0){
                dadosDiretor.status = true
                dadosDiretor.status_code = 200
                dadosDiretor.diretor = result

                return dadosDiretor
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirDiretor,
    atualizarDiretor,
    excluirDiretor,
    listarDiretor,
    buscarDiretor
}
