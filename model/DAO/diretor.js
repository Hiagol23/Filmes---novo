/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de diretores
 * Data: 17/05/2025
 * Autor: Marcel
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo Diretor
const insertDiretor = async function(diretor){
  try {

      let sql = `insert into tbl_diretor  ( nome_diretor,
                                            biografia,
                                            data_nascimento,
                                            tbl_sexo_id_sexo
                                          ) 
                                          values 
                                          (
                                            '${diretor.nome_diretor}',
                                            '${diretor.biografia}',
                                            '${diretor.data_nascimento}',
                                            '${diretor.tbl_sexo_id_sexo}'
                                          )`

      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
          return true
      else
          return false
  } catch (error) {
      return false
  }
}

//Função para atualizar um Diretor existente
const updateDiretor = async function(diretor){
  try {
      let sql = `update tbl_diretor set   nome_diretor      = '${diretor.nome_diretor}',
                                          biografia         = '${diretor.biografia}',
                                          data_nascimento   = '${diretor.data_nascimento}',
                                          tbl_sexo_id_sexo  = '${diretor.tbl_sexo_id_sexo}'
                          where id_diretor = ${diretor.id_diretor}`

      let resultDiretor = await prisma.$executeRawUnsafe(sql)

      if(resultDiretor)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um Diretor existente
const deleteDiretor = async function(id){
  try {
    let sql = `delete from tbl_diretor where id_diretor = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os Diretores existentes
const selectAllDiretor = async function(){
  try {
    let sql = 'select * from tbl_diretor order by id_diretor desc'

    let result = await prisma.$queryRawUnsafe(sql)

    if(result)
      return result
    else
      return false
  } catch (error) {
    return false
  }
}

//Função para buscar um Diretor pelo ID
const selectByIdDiretor = async function(id){
  try {
    let sql = `select * from tbl_diretor where id_diretor = ${id}`

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
    insertDiretor,
    updateDiretor,
    deleteDiretor,
    selectAllDiretor,
    selectByIdDiretor
}
