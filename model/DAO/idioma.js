/**********************************************************************************
* objetivo: criar a comunicacao com o banco de dados para fazer o CRUD de idiomas
* data: 17/05/2025
* autor: Hiago
* versao: 1.0
***********************************************************************************/

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Inserir um novo idioma
const insertIdioma = async function(idioma) {
    try {
        let sql = `insert into tbl_idioma (idioma_filme)
                   values ('${idioma.idioma_filme}')`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Atualizar idioma
const updateIdioma = async function(idioma) {
    try {
        let sql = `update tbl_idioma set idioma_filme = '${idioma.idioma_filme}'
                   where id_idioma = ${idioma.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// Excluir idioma
const deleteIdioma = async function(id) {
    try {
        let sql = `delete from tbl_idioma where id_idioma = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// Retornar todos os idiomas existentes
const selectAllIdioma = async function() {
    try {
        let sql = 'select * from tbl_idioma order by id_idioma desc'
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// Buscar um idioma pelo id
const selectByIdIdioma = async function(id) {
    try {
        let sql = `select * from tbl_idioma where id_idioma = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    insertIdioma,
    updateIdioma,
    deleteIdioma,
    selectAllIdioma,
    selectByIdIdioma
}
