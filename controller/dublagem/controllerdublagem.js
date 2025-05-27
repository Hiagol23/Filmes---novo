/*******************************************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócio referente às requisições da API de dublagens
 * Data: 17/05/2025
 * Autor: Hiago
 * Versão: 1.0
 ******************************************************************************************************/

const dublagemDAO = require('../model/DAO/dublagem.js')

// Inserir nova dublagem
const inserirDublagem = async function (dublagem) {
    if (
        dublagem.dublagem_nativa == '' || dublagem.dublagem_nativa == undefined || dublagem.dublagem_nativa.length > 45 ||
        dublagem.tbl_idioma_id_idioma == '' || dublagem.tbl_idioma_id_idioma == undefined
    ) {
        return { status: 400, message: 'Campos obrigatórios não preenchidos corretamente.' }
    } else {
        let result = await dublagemDAO.insertDublagem(dublagem)

        if (result)
            return { status: 201, message: 'Dublagem inserida com sucesso.' }
        else
            return { status: 500, message: 'Erro ao inserir a dublagem no banco de dados.' }
    }
}

// Atualizar dublagem
const atualizarDublagem = async function (dublagem) {
    if (
        dublagem.id == '' || dublagem.id == undefined ||
        dublagem.dublagem_nativa == '' || dublagem.dublagem_nativa == undefined || dublagem.dublagem_nativa.length > 45 ||
        dublagem.tbl_idioma_id_idioma == '' || dublagem.tbl_idioma_id_idioma == undefined
    ) {
        return { status: 400, message: 'Campos obrigatórios não preenchidos corretamente.' }
    } else {
        let result = await dublagemDAO.updateDublagem(dublagem)

        if (result)
            return { status: 200, message: 'Dublagem atualizada com sucesso.' }
        else
            return { status: 500, message: 'Erro ao atualizar a dublagem no banco de dados.' }
    }
}

// Excluir dublagem
const excluirDublagem = async function (id) {
    if (id == '' || id == undefined) {
        return { status: 400, message: 'ID da dublagem não informado.' }
    } else {
        let result = await dublagemDAO.deleteDublagem(id)

        if (result)
            return { status: 200, message: 'Dublagem excluída com sucesso.' }
        else
            return { status: 500, message: 'Erro ao excluir a dublagem no banco de dados.' }
    }
}

// Listar todas as dublagens
const listarDublagens = async function () {
    let dublagens = await dublagemDAO.selectAllDublagem()

    if (dublagens)
        return { status: 200, dados: dublagens }
    else
        return { status: 404, message: 'Nenhuma dublagem encontrada.' }
}

// Buscar dublagem por ID
const buscarDublagemPorId = async function (id) {
    if (id == '' || id == undefined)
        return { status: 400, message: 'ID da dublagem não informado.' }
    else {
        let dublagem = await dublagemDAO.selectByIdDublagem(id)

        if (dublagem)
            return { status: 200, dados: dublagem }
        else
            return { status: 404, message: 'Dublagem não encontrada.' }
    }
}

module.exports = {
    inserirDublagem,
    atualizarDublagem,
    excluirDublagem,
    listarDublagens,
    buscarDublagemPorId
}
