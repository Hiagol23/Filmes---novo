/**********************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de DiretorNacionalidade
 * Data: 17/05/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************************/

const message = require('../../modulo/config.js')
const diretorNacionalidadeDAO = require('../../model/DAO/diretor_nacionalidade.js')

const inserirDiretorNacionalidade = async function (dados, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                dados.tbl_nacionalidade_id_nacionalidade == '' || dados.tbl_nacionalidade_id_nacionalidade == undefined ||
                dados.tbl_diretor_id_diretor == '' || dados.tbl_diretor_id_diretor == undefined
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let result = await diretorNacionalidadeDAO.insertDiretorNacionalidade(dados)
                if (result)
                    return message.SUCCESS_CREATED_ITEM // 201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const atualizarDiretorNacionalidade = async function (id, dados, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                id == '' || id == undefined || isNaN(id) || id <= 0 ||
                dados.tbl_nacionalidade_id_nacionalidade == '' || dados.tbl_nacionalidade_id_nacionalidade == undefined ||
                dados.tbl_diretor_id_diretor == '' || dados.tbl_diretor_id_diretor == undefined
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let resultID = await diretorNacionalidadeDAO.selectByIdDiretorNacionalidade(parseInt(id))
                if (resultID.length > 0) {
                    dados.id = parseInt(id)
                    let result = await diretorNacionalidadeDAO.updateDiretorNacionalidade(dados)
                    if (result)
                        return message.SUCCESS_UPDATED_ITEM // 200
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL // 500
                } else {
                    return message.ERROR_NOT_FOUND // 404
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const excluirDiretorNacionalidade = async function (id) {
    try {
        if (id == '' || id == undefined || isNaN(id) || id <= 0)
            return message.ERROR_REQUIRED_FIELDS // 400
        else {
            let resultID = await diretorNacionalidadeDAO.selectByIdDiretorNacionalidade(parseInt(id))
            if (resultID.length > 0) {
                let result = await diretorNacionalidadeDAO.deleteDiretorNacionalidade(parseInt(id))
                if (result)
                    return message.SUCCESS_DELETED_ITEM // 200
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL // 500
            } else {
                return message.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const listarDiretorNacionalidade = async function () {
    try {
        let dados = await diretorNacionalidadeDAO.selectAllDiretorNacionalidade()
        if (dados.length > 0) {
            return {
                status: true,
                status_code: 200,
                items: dados.length,
                diretor_nacionalidade: dados
            }
        } else {
            return message.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const buscarDiretorNacionalidade = async function (id) {
    try {
        if (id == '' || id == undefined || isNaN(id) || id <= 0)
            return message.ERROR_REQUIRED_FIELDS // 400
        else {
            let dados = await diretorNacionalidadeDAO.selectByIdDiretorNacionalidade(parseInt(id))
            if (dados.length > 0) {
                return {
                    status: true,
                    status_code: 200,
                    diretor_nacionalidade: dados
                }
            } else {
                return message.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    inserirDiretorNacionalidade,
    atualizarDiretorNacionalidade,
    excluirDiretorNacionalidade,
    listarDiretorNacionalidade,
    buscarDiretorNacionalidade
}
