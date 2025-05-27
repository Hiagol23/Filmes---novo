/**********************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de DiretorFilme
 * Data: 17/05/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************************/

const message = require('../../modulo/config.js')
const diretorFilmeDAO = require('../../model/DAO/diretor_filme.js')

const inserirDiretorFilme = async function (dados, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                dados.tbl_diretor_id_diretor == '' || dados.tbl_diretor_id_diretor == undefined ||
                dados.tbl_filme_id == '' || dados.tbl_filme_id == undefined
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let result = await diretorFilmeDAO.insertDiretorFilme(dados)
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

const atualizarDiretorFilme = async function (id, dados, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                id == '' || id == undefined || isNaN(id) || id <= 0 ||
                dados.tbl_diretor_id_diretor == '' || dados.tbl_diretor_id_diretor == undefined ||
                dados.tbl_filme_id == '' || dados.tbl_filme_id == undefined
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let resultID = await diretorFilmeDAO.selectByIdDiretorFilme(parseInt(id))
                if (resultID.length > 0) {
                    dados.id = parseInt(id)
                    let result = await diretorFilmeDAO.updateDiretorFilme(dados)
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

const excluirDiretorFilme = async function (id) {
    try {
        if (id == '' || id == undefined || isNaN(id) || id <= 0)
            return message.ERROR_REQUIRED_FIELDS // 400
        else {
            let resultID = await diretorFilmeDAO.selectByIdDiretorFilme(parseInt(id))
            if (resultID.length > 0) {
                let result = await diretorFilmeDAO.deleteDiretorFilme(parseInt(id))
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

const listarDiretorFilme = async function () {
    try {
        let dados = await diretorFilmeDAO.selectAllDiretorFilme()
        if (dados.length > 0) {
            return {
                status: true,
                status_code: 200,
                items: dados.length,
                diretor_filme: dados
            }
        } else {
            return message.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const buscarDiretorFilme = async function (id) {
    try {
        if (id == '' || id == undefined || isNaN(id) || id <= 0)
            return message.ERROR_REQUIRED_FIELDS // 400
        else {
            let dados = await diretorFilmeDAO.selectByIdDiretorFilme(parseInt(id))
            if (dados.length > 0) {
                return {
                    status: true,
                    status_code: 200,
                    diretor_filme: dados
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
    inserirDiretorFilme,
    atualizarDiretorFilme,
    excluirDiretorFilme,
    listarDiretorFilme,
    buscarDiretorFilme
}
