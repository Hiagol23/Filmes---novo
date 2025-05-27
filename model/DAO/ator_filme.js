/**********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados no Banco de Dados MySQL
 * Data: 17/05/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************************/

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

//Inserir um novo registro
const insertAtorFilme = async function (dadosAtorFilme) {
    try {
        let sql = await prisma.tbl_ator_filme.create({
            data: dadosAtorFilme
        })
        return sql ? true : false
    } catch (error) {
        return false
    }
}

//Atualizar um registro existente
const updateAtorFilme = async function (dadosAtorFilme) {
    try {
        let sql = await prisma.tbl_ator_filme.update({
            where: {
                id_ator_elenco: dadosAtorFilme.id
            },
            data: dadosAtorFilme
        })
        return sql ? true : false
    } catch (error) {
        return false
    }
}

//Excluir um registro
const deleteAtorFilme = async function (id) {
    try {
        let sql = await prisma.tbl_ator_filme.delete({
            where: {
                id_ator_elenco: id
            }
        })
        return sql ? true : false
    } catch (error) {
        return false
    }
}

//Listar todos os registros
const selectAllAtorFilme = async function () {
    try {
        let sql = await prisma.tbl_ator_filme.findMany()
        return sql
    } catch (error) {
        return false
    }
}

//Buscar registro pelo ID
const selectByIdAtorFilme = async function (id) {
    try {
        let sql = await prisma.tbl_ator_filme.findMany({
            where: {
                id_ator_elenco: id
            }
        })
        return sql
    } catch (error) {
        return false
    }
}

module.exports = {
    insertAtorFilme,
    updateAtorFilme,
    deleteAtorFilme,
    selectAllAtorFilme,
    selectByIdAtorFilme
}
