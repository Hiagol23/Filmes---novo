/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de roteiristas
 * Data: 17/05/2025
 * Autor: Marcel
 * Versão: 1.0
 ******************************************************************************************************/

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertRoteirista = async function(dadosRoteirista) {
    let sql = `insert into tbl_roteirista (
                    nome_roteirista,
                    biografia,
                    data_nascimento,
                    tbl_sexo_id_sexo
                ) values (
                    '${dadosRoteirista.nome_roteirista}',
                    '${dadosRoteirista.biografia}',
                    '${dadosRoteirista.data_nascimento}',
                    ${dadosRoteirista.tbl_sexo_id_sexo}
                )`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false
}

const updateRoteirista = async function(dadosRoteirista) {
    let sql = `update tbl_roteirista set
                    nome_roteirista = '${dadosRoteirista.nome_roteirista}',
                    biografia = '${dadosRoteirista.biografia}',
                    data_nascimento = '${dadosRoteirista.data_nascimento}',
                    tbl_sexo_id_sexo = ${dadosRoteirista.tbl_sexo_id_sexo}
                where id_roteirista = ${dadosRoteirista.id_roteirista}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false
}

const deleteRoteirista = async function(id) {
    let sql = `delete from tbl_roteirista where id_roteirista = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false
}

const selectAllRoteiristas = async function() {
    let sql = `select * from tbl_roteirista`

    let rsRoteiristas = await prisma.$queryRawUnsafe(sql)

    if (rsRoteiristas.length > 0)
        return rsRoteiristas
    else
        return false
}

const selectByIdRoteirista = async function(id) {
    let sql = `select * from tbl_roteirista where id_roteirista = ${id}`

    let rsRoteirista = await prisma.$queryRawUnsafe(sql)

    if (rsRoteirista.length > 0)
        return rsRoteirista
    else
        return false
}

module.exports = {
    insertRoteirista,
    updateRoteirista,
    deleteRoteirista,
    selectAllRoteiristas,
    selectByIdRoteirista
}
