/**********************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de AtorNacionalidade
 * Data: 17/05/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************************/

const message = require('../../modulo/config.js')
const atorNacionalidadeDAO = require('../../model/DAO/ator_nacionalidade.js')

const inserirAtorNacionalidade = async function (dados, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                dados.tbl_nacionalidade_id_nacionalidade == '' || dados.tbl_nacionalidade_id_nacionalidade == undefined ||
                dados.tbl_ator_id_ator == '' || dados.tbl_ator_id_ator == undefined
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let result = await atorNacionalidadeDAO.insertAtorNacionalidade(dados)
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

const atualizarAtorNacionalidade = async function (id, dados, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                id == '' || id == undefined || isNaN(id) || id <= 0 ||
                dados.tbl_nacionalidade_id_nacionalidade == '' || dados.tbl_nacionalidade_id_nacionalidade == undefined ||
                dados.tbl_ator_id_ator == '' || dados.tbl_ator_id_ator == undefined
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let resultID = await atorNacionalidadeDAO.selectByIdAtorNacionalidade(parseInt(id))
                if (resultID.length > 0) {
                    dados.id = parseInt(id)
                    let result = await atorNacionalidadeDAO.updateAtorNacionalidade(dados)
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

const excluirAtorNacionalidade = async function (id) {
    try {
        if (id == '' || id == undefined || isNaN(id) || id <= 0)
            return message.ERROR_REQUIRED_FIELDS // 400
        else {
            let resultID = await atorNacionalidadeDAO.selectByIdAtorNacionalidade(parseInt(id))
            if (resultID.length > 0) {
                let result = await atorNacionalidadeDAO.deleteAtorNacionalidade(parseInt(id))
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

const listarAtorNacionalidade = async function () {
    try {
        let dados = await atorNacionalidadeDAO.selectAllAtorNacionalidade()
        if (dados.length > 0) {
            return {
                status: true,
                status_code: 200,
                items: dados.length,
                ator_nacionalidade: dados
            }
        } else {
            return message.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const buscarAtorNacionalidade = async function (id) {
    try {
        if (id == '' || id == undefined || isNaN(id) || id <= 0)
            return message.ERROR_REQUIRED_FIELDS // 400
        else {
            let dados = await atorNacionalidadeDAO.selectByIdAtorNacionalidade(parseInt(id))
            if (dados.length > 0) {
                return {
                    status: true,
                    status_code: 200,
                    ator_nacionalidade: dados
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
    inserirAtorNacionalidade,
    atualizarAtorNacionalidade,
    excluirAtorNacionalidade,
    listarAtorNacionalidade,
    buscarAtorNacionalidade
}
