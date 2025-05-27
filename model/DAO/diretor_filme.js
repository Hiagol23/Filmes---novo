/**********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados no Banco de Dados MySQL
 * Data: 17/05/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************************/

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

//Inserir um novo registro
const insertDiretorFilme = async function (dadosDiretorFilme) {
    try {
        let sql = await prisma.tbl_diretor_filme.create({
            data: dadosDiretorFilme
        })
        return sql ? true : false
    } catch (error) {
        return false
    }
}

//Atualizar um registro existente
const updateDiretorFilme = async function (dadosDiretorFilme) {
    try {
        let sql = await prisma.tbl_diretor_filme.update({
            where: {
                id_diretor_filme: dadosDiretorFilme.id
            },
            data: dadosDiretorFilme
        })
        return sql ? true : false
    } catch (error) {
        return false
    }
}

//Excluir um registro
const deleteDiretorFilme = async function (id) {
    try {
        let sql = await prisma.tbl_diretor_filme.delete({
            where: {
                id_diretor_filme: id
            }
        })
        return sql ? true : false
    } catch (error) {
        return false
    }
}

//Listar todos os registros
const selectAllDiretorFilme = async function () {
    try {
        let sql = await prisma.tbl_diretor_filme.findMany()
        return sql
    } catch (error) {
        return false
    }
}

//Buscar registro pelo ID
const selectByIdDiretorFilme = async function (id) {
    try {
        let sql = await prisma.tbl_diretor_filme.findMany({
            where: {
                id_diretor_filme: id
            }
        })
        return sql
    } catch (error) {
        return false
    }
}

module.exports = {
    insertDiretorFilme,
    updateDiretorFilme,
    deleteDiretorFilme,
    selectAllDiretorFilme,
    selectByIdDiretorFilme
}
