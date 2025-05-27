/**********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados no Banco de Dados MySQL
 * Data: 17/05/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************************/

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

//Inserir um novo registro
const insertRoteiristaNacionalidade = async function (dadosRoteiristaNacionalidade) {
    try {
        let sql = await prisma.tbl_roteirista_nacionalidade.create({
            data: dadosRoteiristaNacionalidade
        })
        return sql ? true : false
    } catch (error) {
        return false
    }
}

//Atualizar um registro existente
const updateRoteiristaNacionalidade = async function (dadosRoteiristaNacionalidade) {
    try {
        let sql = await prisma.tbl_roteirista_nacionalidade.update({
            where: {
                id_roteirista_nacionalidade: dadosRoteiristaNacionalidade.id
            },
            data: dadosRoteiristaNacionalidade
        })
        return sql ? true : false
    } catch (error) {
        return false
    }
}

//Excluir um registro
const deleteRoteiristaNacionalidade = async function (id) {
    try {
        let sql = await prisma.tbl_roteirista_nacionalidade.delete({
            where: {
                id_roteirista_nacionalidade: id
            }
        })
        return sql ? true : false
    } catch (error) {
        return false
    }
}

//Listar todos os registros
const selectAllRoteiristaNacionalidade = async function () {
    try {
        let sql = await prisma.tbl_roteirista_nacionalidade.findMany()
        return sql
    } catch (error) {
        return false
    }
}

//Buscar registro pelo ID
const selectByIdRoteiristaNacionalidade = async function (id) {
    try {
        let sql = await prisma.tbl_roteirista_nacionalidade.findMany({
            where: {
                id_roteirista_nacionalidade: id
            }
        })
        return sql
    } catch (error) {
        return false
    }
}

module.exports = {
    insertRoteiristaNacionalidade,
    updateRoteiristaNacionalidade,
    deleteRoteiristaNacionalidade,
    selectAllRoteiristaNacionalidade,
    selectByIdRoteiristaNacionalidade
}
