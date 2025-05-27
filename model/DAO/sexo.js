/**********************************************************************************
* objetivo: criar a comunicacao com o banco de dados para fazer o CRUD de sexo
* data: 17/05/2025
* autor: Hiago
* versao: 1.0
***********************************************************************************/

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Inserir um novo sexo
const insertSexo = async function(sexo) {
    try {
        let sql = `insert into tbl_sexo (nome)
                   values ('${sexo.nome}')`

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

// Atualizar sexo
const updateSexo = async function(sexo) {
    try {
        let sql = `update tbl_sexo set nome = '${sexo.nome}'
                   where id_sexo = ${sexo.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// Excluir sexo
const deleteSexo = async function(id) {
    try {
        let sql = `delete from tbl_sexo where id_sexo = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// Retornar todos os sexos existentes
const selectAllSexo = async function() {
    try {
        let sql = 'select * from tbl_sexo order by id_sexo desc'
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// Buscar um sexo pelo id
const selectByIdSexo = async function(id) {
    try {
        let sql = `select * from tbl_sexo where id_sexo = ${id}`

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
    insertSexo,
    updateSexo,
    deleteSexo,
    selectAllSexo,
    selectByIdSexo
}
