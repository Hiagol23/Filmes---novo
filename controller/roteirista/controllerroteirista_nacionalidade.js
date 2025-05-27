/**********************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de RoteiristaNacionalidade
 * Data: 17/05/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************************/

const message = require('../../modulo/config.js')
const roteiristaNacionalidadeDAO = require('../../model/DAO/roteirista_nacionalidade.js')

const inserirRoteiristaNacionalidade = async function (dados, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                dados.tbl_nacionalidade_id_nacionalidade == '' || dados.tbl_nacionalidade_id_nacionalidade == undefined ||
                dados.tbl_roteirista_id_roteirista == '' || dados.tbl_roteirista_id_roteirista == undefined
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let result = await roteiristaNacionalidadeDAO.insertRoteiristaNacionalidade(dados)
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

const atualizarRoteiristaNacionalidade = async function (id, dados, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                id == '' || id == undefined || isNaN(id) || id <= 0 ||
                dados.tbl_nacionalidade_id_nacionalidade == '' || dados.tbl_nacionalidade_id_nacionalidade == undefined ||
                dados.tbl_roteirista_id_roteirista == '' || dados.tbl_roteirista_id_roteirista == undefined
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let resultID = await roteiristaNacionalidadeDAO.selectByIdRoteiristaNacionalidade(parseInt(id))
                if (resultID.length > 0) {
                    dados.id = parseInt(id)
                    let result = await roteiristaNacionalidadeDAO.updateRoteiristaNacionalidade(dados)
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

const excluirRoteiristaNacionalidade = async function (id) {
    try {
        if (id == '' || id == undefined || isNaN(id) || id <= 0)
            return message.ERROR_REQUIRED_FIELDS // 400
        else {
            let resultID = await roteiristaNacionalidadeDAO.selectByIdRoteiristaNacionalidade(parseInt(id))
            if (resultID.length > 0) {
                let result = await roteiristaNacionalidadeDAO.deleteRoteiristaNacionalidade(parseInt(id))
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

const listarRoteiristaNacionalidade = async function () {
    try {
        let dados = await roteiristaNacionalidadeDAO.selectAllRoteiristaNacionalidade()
        if (dados.length > 0) {
            return {
                status: true,
                status_code: 200,
                items: dados.length,
                roteirista_nacionalidade: dados
            }
        } else {
            return message.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const buscarRoteiristaNacionalidade = async function (id) {
    try {
        if (id == '' || id == undefined || isNaN(id) || id <= 0)
            return message.ERROR_REQUIRED_FIELDS // 400
        else {
            let dados = await roteiristaNacionalidadeDAO.selectByIdRoteiristaNacionalidade(parseInt(id))
            if (dados.length > 0) {
                return {
                    status: true,
                    status_code: 200,
                    roteirista_nacionalidade: dados
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
    inserirRoteiristaNacionalidade,
    atualizarRoteiristaNacionalidade,
    excluirRoteiristaNacionalidade,
    listarRoteiristaNacionalidade,
    buscarRoteiristaNacionalidade
}
