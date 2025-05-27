/*******************************************************************************************************
* Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de ator
* Data: 17/05/2025
* Autor: Hiago
* Versão: 1.0
******************************************************************************************************/
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//Função para inserir um novo ator
const insertAtor = async function(ator) {
    try {
        let sql = `insert into tbl_ator (
                        nome_ator,
                        biografia,
                        data_nascimento,
                        tbl_sexo_id_sexo
                    ) values (
                        '${ator.nome_ator}',
                        '${ator.biografia}',
                        '${ator.data_nascimento}',
                        ${ator.tbl_sexo_id_sexo}
                    )`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para atualizar um ator existente
const updateAtor = async function(ator) {
    try {
        let sql = `update tbl_ator set
                        nome_ator = '${ator.nome_ator}',
                        biografia = '${ator.biografia}',
                        data_nascimento = '${ator.data_nascimento}',
                        tbl_sexo_id_sexo = ${ator.tbl_sexo_id_sexo}
                    where id_ator = ${ator.id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para excluir um ator existente
const deleteAtor = async function(id) {
    try {
        let sql = `delete from tbl_ator where id_ator = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para retornar todos os atores existentes
const selectAllAtor = async function() {
    try {
        let sql = 'select * from tbl_ator order by id_ator desc'

        let result = await prisma.$queryRawUnsafe(sql)
        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para buscar um ator pelo ID
const selectByIdAtor = async function(id) {
    try {
        let sql = `select * from tbl_ator where id_ator = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)
        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertAtor,
    updateAtor,
    deleteAtor,
    selectAllAtor,
    selectByIdAtor
}
