/**********************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de AtorFilme
 * Data: 17/05/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************************/

const message = require('../../modulo/config.js')
const atorFilmeDAO = require('../../model/DAO/ator_filme.js')

const inserirAtorFilme = async function (dados, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                dados.tbl_ator_id_ator == '' || dados.tbl_ator_id_ator == undefined ||
                dados.tbl_filme_id == '' || dados.tbl_filme_id == undefined
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let result = await atorFilmeDAO.insertAtorFilme(dados)
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

const atualizarAtorFilme = async function (id, dados, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                id == '' || id == undefined || isNaN(id) || id <= 0 ||
                dados.tbl_ator_id_ator == '' || dados.tbl_ator_id_ator == undefined ||
                dados.tbl_filme_id == '' || dados.tbl_filme_id == undefined
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let resultID = await atorFilmeDAO.selectByIdAtorFilme(parseInt(id))
                if (resultID.length > 0) {
                    dados.id = parseInt(id)
                    let result = await atorFilmeDAO.updateAtorFilme(dados)
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

const excluirAtorFilme = async function (id) {
    try {
        if (id == '' || id == undefined || isNaN(id) || id <= 0)
            return message.ERROR_REQUIRED_FIELDS // 400
        else {
            let resultID = await atorFilmeDAO.selectByIdAtorFilme(parseInt(id))
            if (resultID.length > 0) {
                let result = await atorFilmeDAO.deleteAtorFilme(parseInt(id))
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

const listarAtorFilme = async function () {
    try {
        let dados = await atorFilmeDAO.selectAllAtorFilme()
        if (dados.length > 0) {
            return {
                status: true,
                status_code: 200,
                items: dados.length,
                ator_filme: dados
            }
        } else {
            return message.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const buscarAtorFilme = async function (id) {
    try {
        if (id == '' || id == undefined || isNaN(id) || id <= 0)
            return message.ERROR_REQUIRED_FIELDS // 400
        else {
            let dados = await atorFilmeDAO.selectByIdAtorFilme(parseInt(id))
            if (dados.length > 0) {
                return {
                    status: true,
                    status_code: 200,
                    ator_filme: dados
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
    inserirAtorFilme,
    atualizarAtorFilme,
    excluirAtorFilme,
    listarAtorFilme,
    buscarAtorFilme
}
