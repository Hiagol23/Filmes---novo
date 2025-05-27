/**********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados no Banco de Dados MySQL
 * Data: 17/05/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************************/

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Inserir um novo registro
const insertRoteiristaFilme = async function (dadosRoteiristaFilme) {
    try {
        let sql = await prisma.tbl_roteirista_filme.create({
            data: dadosRoteiristaFilme
        })
        return sql ? true : false
    } catch (error) {
        return false
    }
}

// Atualizar um registro existente
const updateRoteiristaFilme = async function (dadosRoteiristaFilme) {
    try {
        let sql = await prisma.tbl_roteirista_filme.update({
            where: {
                id_roteirista_filme: dadosRoteiristaFilme.id
            },
            data: dadosRoteiristaFilme
        })
        return sql ? true : false
    } catch (error) {
        return false
    }
}

// Excluir um registro
const deleteRoteiristaFilme = async function (id) {
    try {
        let sql = await prisma.tbl_roteirista_filme.delete({
            where: {
                id_roteirista_filme: id
            }
        })
        return sql ? true : false
    } catch (error) {
        return false
    }
}

// Listar todos os registros
const selectAllRoteiristaFilme = async function () {
    try {
        let sql = await prisma.tbl_roteirista_filme.findMany()
        return sql
    } catch (error) {
        return false
    }
}

// Buscar registro pelo ID
const selectByIdRoteiristaFilme = async function (id) {
    try {
        let sql = await prisma.tbl_roteirista_filme.findMany({
            where: {
                id_roteirista_filme: id
            }
        })
        return sql
    } catch (error) {
        return false
    }
}

module.exports = {
    insertRoteiristaFilme,
    updateRoteiristaFilme,
    deleteRoteiristaFilme,
    selectAllRoteiristaFilme,
    selectByIdRoteiristaFilme
}
