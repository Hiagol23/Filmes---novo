/***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD de sexo
 * data: 22/04/2025
 * autor: Hiago
 * versao: 1.0 
 ***************************************************************************************/

//A CONTROLLER TRATA OS DADOS
//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do arquo para realizar o CRUD de dados no banco de dados
const sexoDAO = require('../../model/DAO/sexo.js')


const inserirSexo = async function(sexo, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (sexo.nome == '' || sexo.nome == undefined || sexo.nome == null || sexo.nome.length > 100) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let resultSexo = await sexoDAO.insertSexo(sexo)

                if (resultSexo)
                    return message.SUCESS_CREATED_ITEM // 201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const atualizarSexo = async function(id, sexo, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                sexo.nome == '' || sexo.nome == undefined || sexo.nome == null || sexo.nome.length > 100
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let resultSexo = await sexoDAO.selectByIdSexo(parseInt(id))

                if (resultSexo != false || typeof(resultSexo) == 'object') {
                    if (resultSexo.length > 0) {
                        sexo.id = parseInt(id)
                        let result = await sexoDAO.updateSexo(sexo)

                        if (result) {
                            return message.SUCESS_UPDATED_ITEM // 200
                        } else {
                            return message.ERROR_INTERNAL_SERVER_MODEL // 500
                        }
                    } else {
                        return message.ERROR_NOT_FOUND // 404
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const excluirSexo = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            let resultSexo = await sexoDAO.selectByIdSexo(parseInt(id))

            if (resultSexo != false || typeof(resultSexo) == 'object') {
                if (resultSexo.length > 0) {
                    let result = await sexoDAO.deleteSexo(parseInt(id))

                    if (result) {
                        return message.SUCESS_DELETED_ITEM // 200
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return message.ERROR_NOT_FOUND // 404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const listarSexos = async function() {
    try {
        let dadosSexos = {}
        let resultSexo = await sexoDAO.selectAllSexo()

        if (resultSexo != false || typeof(resultSexo) == 'object') {
            if (resultSexo.length > 0) {
                dadosSexos.status = true
                dadosSexos.status_code = 200
                dadosSexos.items = resultSexo.length
                dadosSexos.sexos = resultSexo

                return dadosSexos
            } else {
                return message.ERROR_NOT_FOUND // 404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const buscarSexo = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            let dadosSexo = {}

            let resultSexo = await sexoDAO.selectByIdSexo(parseInt(id))

            if (resultSexo != false || typeof(resultSexo) == 'object') {
                if (resultSexo.length > 0) {
                    dadosSexo.status = true
                    dadosSexo.status_code = 200
                    dadosSexo.sexo = resultSexo

                    return dadosSexo
                } else {
                    return message.ERROR_NOT_FOUND // 404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    inserirSexo,
    atualizarSexo,
    excluirSexo,
    listarSexos,
    buscarSexo
}
