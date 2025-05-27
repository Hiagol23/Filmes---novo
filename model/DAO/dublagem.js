/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de dublagens
 * Data: 17/05/2025
 * Autor: Hiago
 * Versão: 1.0
 ******************************************************************************************************/
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Inserir nova dublagem
const insertDublagem = async function(dublagem) {
  try {
    let sql = `insert into tbl_dublagem (dublagem_nativa, tbl_idioma_id_idioma)
               values (
                 '${dublagem.dublagem_nativa}',
                 ${dublagem.tbl_idioma_id_idioma}
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

// Atualizar dublagem
const updateDublagem = async function(dublagem) {
  try {
    let sql = `update tbl_dublagem set 
                  dublagem_nativa = '${dublagem.dublagem_nativa}',
                  tbl_idioma_id_idioma = ${dublagem.tbl_idioma_id_idioma}
               where id_dublagem = ${dublagem.id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else
      return false
  } catch (error) {
    return false
  }
}

// Excluir dublagem
const deleteDublagem = async function(id) {
  try {
    let sql = `delete from tbl_dublagem where id_dublagem = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else
      return false
  } catch (error) {
    return false
  }
}

// Selecionar todas as dublagens
const selectAllDublagem = async function() {
  try {
    let sql = `select * from tbl_dublagem order by id_dublagem desc`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else
      return false
  } catch (error) {
    return false
  }
}

// Selecionar dublagem por ID
const selectByIdDublagem = async function(id) {
  try {
    let sql = `select * from tbl_dublagem where id_dublagem = ${id}`

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
  insertDublagem,
  updateDublagem,
  deleteDublagem,
  selectAllDublagem,
  selectByIdDublagem
}
