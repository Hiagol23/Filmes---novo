/**********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados no Banco de Dados MySQL
 * Data: 17/05/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************************/

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

//Inserir um novo registro
const insertAtorNacionalidade = async function (dadosAtorNacionalidade) {
    try {
        let sql = await prisma.tbl_ator_nacionalidade.create({
            data: dadosAtorNacionalidade
        })
        return sql ? true : false
    } catch (error) {
        return false
    }
}

//Atualizar um registro existente
const updateAtorNacionalidade = async function (dadosAtorNacionalidade) {
    try {
        let sql = await prisma.tbl_ator_nacionalidade.update({
            where: {
                id_ator_nacionalidade: dadosAtorNacionalidade.id
            },
            data: dadosAtorNacionalidade
        })
        return sql ? true : false
    } catch (error) {
        return false
    }
}

//Excluir um registro
const deleteAtorNacionalidade = async function (id) {
    try {
        let sql = await prisma.tbl_ator_nacionalidade.delete({
            where: {
                id_ator_nacionalidade: id
            }
        })
        return sql ? true : false
    } catch (error) {
        return false
    }
}

//Listar todos os registros
const selectAllAtorNacionalidade = async function () {
    try {
        let sql = await prisma.tbl_ator_nacionalidade.findMany()
        return sql
    } catch (error) {
        return false
    }
}

//Buscar registro pelo ID
const selectByIdAtorNacionalidade = async function (id) {
    try {
        let sql = await prisma.tbl_ator_nacionalidade.findMany({
            where: {
                id_ator_nacionalidade: id
            }
        })
        return sql
    } catch (error) {
        return false
    }
}

module.exports = {
    insertAtorNacionalidade,
    updateAtorNacionalidade,
    deleteAtorNacionalidade,
    selectAllAtorNacionalidade,
    selectByIdAtorNacionalidade
}
