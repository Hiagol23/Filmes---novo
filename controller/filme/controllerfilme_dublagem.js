/**********************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de FilmeDublagem
 * Data: 17/05/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************************/

const message = require('../../modulo/config.js')
const filmeDublagemDAO = require('../../model/DAO/filme_dublagem.js')

const inserirFilmeDublagem = async function (dados, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                dados.tbl_dublagem_id_dublagem == '' || dados.tbl_dublagem_id_dublagem == undefined ||
                dados.tbl_filme_id == '' || dados.tbl_filme_id == undefined
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let result = await filmeDublagemDAO.insertFilmeDublagem(dados)
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

const atualizarFilmeDublagem = async function (id, dados, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                id == '' || id == undefined || isNaN(id) || id <= 0 ||
                dados.tbl_dublagem_id_dublagem == '' || dados.tbl_dublagem_id_dublagem == undefined ||
                dados.tbl_filme_id == '' || dados.tbl_filme_id == undefined
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let resultID = await filmeDublagemDAO.selectByIdFilmeDublagem(parseInt(id))
                if (resultID.length > 0) {
                    dados.id = parseInt(id)
                    let result = await filmeDublagemDAO.updateFilmeDublagem(dados)
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

const excluirFilmeDublagem = async function (id) {
    try {
        if (id == '' || id == undefined || isNaN(id) || id <= 0)
            return message.ERROR_REQUIRED_FIELDS // 400
        else {
            let resultID = await filmeDublagemDAO.selectByIdFilmeDublagem(parseInt(id))
            if (resultID.length > 0) {
                let result = await filmeDublagemDAO.deleteFilmeDublagem(parseInt(id))
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

const listarFilmeDublagem = async function () {
    try {
        let dados = await filmeDublagemDAO.selectAllFilmeDublagem()
        if (dados.length > 0) {
            return {
                status: true,
                status_code: 200,
                items: dados.length,
                filme_dublagem: dados
            }
        } else {
            return message.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const buscarFilmeDublagem = async function (id) {
    try {
        if (id == '' || id == undefined || isNaN(id) || id <= 0)
            return message.ERROR_REQUIRED_FIELDS // 400
        else {
            let dados = await filmeDublagemDAO.selectByIdFilmeDublagem(parseInt(id))
            if (dados.length > 0) {
                return {
                    status: true,
                    status_code: 200,
                    filme_dublagem: dados
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
    inserirFilmeDublagem,
    atualizarFilmeDublagem,
    excluirFilmeDublagem,
    listarFilmeDublagem,
    buscarFilmeDublagem
}