/**********************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de RoteiristaFilme
 * Data: 17/05/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************************/

const message = require('../../modulo/config.js')
const roteiristaFilmeDAO = require('../../model/DAO/roteirista_filme.js')

const inserirRoteiristaFilme = async function (dados, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                dados.tbl_roteirista_id_roteirista == '' || dados.tbl_roteirista_id_roteirista == undefined ||
                dados.tbl_filme_id == '' || dados.tbl_filme_id == undefined
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let result = await roteiristaFilmeDAO.insertRoteiristaFilme(dados)
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

const atualizarRoteiristaFilme = async function (id, dados, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                id == '' || id == undefined || isNaN(id) || id <= 0 ||
                dados.tbl_roteirista_id_roteirista == '' || dados.tbl_roteirista_id_roteirista == undefined ||
                dados.tbl_filme_id == '' || dados.tbl_filme_id == undefined
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let resultID = await roteiristaFilmeDAO.selectByIdRoteiristaFilme(parseInt(id))
                if (resultID.length > 0) {
                    dados.id = parseInt(id)
                    let result = await roteiristaFilmeDAO.updateRoteiristaFilme(dados)
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

const excluirRoteiristaFilme = async function (id) {
    try {
        if (id == '' || id == undefined || isNaN(id) || id <= 0)
            return message.ERROR_REQUIRED_FIELDS // 400
        else {
            let resultID = await roteiristaFilmeDAO.selectByIdRoteiristaFilme(parseInt(id))
            if (resultID.length > 0) {
                let result = await roteiristaFilmeDAO.deleteRoteiristaFilme(parseInt(id))
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

const listarRoteiristaFilme = async function () {
    try {
        let dados = await roteiristaFilmeDAO.selectAllRoteiristaFilme()
        if (dados.length > 0) {
            return {
                status: true,
                status_code: 200,
                items: dados.length,
                roteirista_filme: dados
            }
        } else {
            return message.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const buscarRoteiristaFilme = async function (id) {
    try {
        if (id == '' || id == undefined || isNaN(id) || id <= 0)
            return message.ERROR_REQUIRED_FIELDS // 400
        else {
            let dados = await roteiristaFilmeDAO.selectByIdRoteiristaFilme(parseInt(id))
            if (dados.length > 0) {
                return {
                    status: true,
                    status_code: 200,
                    roteirista_filme: dados
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
    inserirRoteiristaFilme,
    atualizarRoteiristaFilme,
    excluirRoteiristaFilme,
    listarRoteiristaFilme,
    buscarRoteiristaFilme
}
