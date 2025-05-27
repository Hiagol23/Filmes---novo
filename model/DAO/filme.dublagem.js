/**********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados no Banco de Dados MySQL
 * Data: 17/05/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************************/

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Inserir um novo registro
const insertFilmeDublagem = async function (dadosFilmeDublagem) {
    try {
        let sql = await prisma.tbl_filme_dublagem.create({
            data: dadosFilmeDublagem
        })
        return sql ? true : false
    } catch (error) {
        return false
    }
}

// Atualizar um registro existente
const updateFilmeDublagem = async function (dadosFilmeDublagem) {
    try {
        let sql = await prisma.tbl_filme_dublagem.update({
            where: {
                id_filme_dublagem: dadosFilmeDublagem.id
            },
            data: dadosFilmeDublagem
        })
        return sql ? true : false
    } catch (error) {
        return false
    }
}

// Excluir um registro
const deleteFilmeDublagem = async function (id) {
    try {
        let sql = await prisma.tbl_filme_dublagem.delete({
            where: {
                id_filme_dublagem: id
            }
        })
        return sql ? true : false
    } catch (error) {
        return false
    }
}

// Listar todos os registros
const selectAllFilmeDublagem = async function () {
    try {
        let sql = await prisma.tbl_filme_dublagem.findMany()
        return sql
    } catch (error) {
        return false
    }
}

// Buscar registro pelo ID
const selectByIdFilmeDublagem = async function (id) {
    try {
        let sql = await prisma.tbl_filme_dublagem.findMany({
            where: {
                id_filme_dublagem: id
            }
        })
        return sql
    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilmeDublagem,
    updateFilmeDublagem,
    deleteFilmeDublagem,
    selectAllFilmeDublagem,
    selectByIdFilmeDublagem
}
