/**********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados no Banco de Dados MySQL
 * Data: 17/05/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************************/

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

//Inserir um novo registro
const insertDiretorNacionalidade = async function (dadosDiretorNacionalidade) {
    try {
        let sql = await prisma.tbl_nacionalidade_diretor.create({
            data: dadosDiretorNacionalidade
        })
        return sql ? true : false
    } catch (error) {
        return false
    }
}

//Atualizar um registro existente
const updateDiretorNacionalidade = async function (dadosDiretorNacionalidade) {
    try {
        let sql = await prisma.tbl_nacionalidade_diretor.update({
            where: {
                id_nacionalidade_diretor: dadosDiretorNacionalidade.id
            },
            data: dadosDiretorNacionalidade
        })
        return sql ? true : false
    } catch (error) {
        return false
    }
}

//Excluir um registro
const deleteDiretorNacionalidade = async function (id) {
    try {
        let sql = await prisma.tbl_nacionalidade_diretor.delete({
            where: {
                id_nacionalidade_diretor: id
            }
        })
        return sql ? true : false
    } catch (error) {
        return false
    }
}

//Listar todos os registros
const selectAllDiretorNacionalidade = async function () {
    try {
        let sql = await prisma.tbl_nacionalidade_diretor.findMany()
        return sql
    } catch (error) {
        return false
    }
}

//Buscar registro pelo ID
const selectByIdDiretorNacionalidade = async function (id) {
    try {
        let sql = await prisma.tbl_nacionalidade_diretor.findMany({
            where: {
                id_nacionalidade_diretor: id
            }
        })
        return sql
    } catch (error) {
        return false
    }
}

module.exports = {
    insertDiretorNacionalidade,
    updateDiretorNacionalidade,
    deleteDiretorNacionalidade,
    selectAllDiretorNacionalidade,
    selectByIdDiretorNacionalidade
}
