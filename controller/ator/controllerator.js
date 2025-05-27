/*******************************************************************************************************
* Objetivo: Criar a lógica para manipular os dados de ator
* Data: 17/05/2025
* Autor: Hiago
* Versão: 1.0
*******************************************************************************************************/

const atorDAO = require('../model/DAO/ator')

//Inserir um novo ator
const inserirAtor = async function(ator) {
    return await atorDAO.insertAtor(ator)
}

//Atualizar um ator
const atualizarAtor = async function(ator) {
    return await atorDAO.updateAtor(ator)
}

//Excluir um ator
const excluirAtor = async function(id) {
    return await atorDAO.deleteAtor(id)
}

//Listar todos os atores
const listarAtores = async function() {
    return await atorDAO.selectAllAtor()
}

//Buscar ator por ID
const buscarAtor = async function(id) {
    return await atorDAO.selectByIdAtor(id)
}

module.exports = {
    inserirAtor,
    atualizarAtor,
    excluirAtor,
    listarAtores,
    buscarAtor
}
