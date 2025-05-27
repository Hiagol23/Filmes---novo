/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Roteirista
 * Data: 17/05/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************/

const message = require('../../modulo/config.js')
const roteiristaDAO = require('../../model/DAO/roteirista.js')

const inserirRoteirista = async function(roteirista, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(roteirista.nome_roteirista     == '' || roteirista.nome_roteirista == undefined || roteirista.nome_roteirista == null || roteirista.nome_roteirista.length > 100 ||
               roteirista.biografia           == '' || roteirista.biografia == undefined || roteirista.biografia == null || roteirista.biografia.length > 1000 ||
               roteirista.data_nascimento     == '' || roteirista.data_nascimento == undefined || roteirista.data_nascimento == null || roteirista.data_nascimento.length != 10 ||
               roteirista.tbl_sexo_id_sexo    == '' || roteirista.tbl_sexo_id_sexo == undefined)
            {
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let result = await roteiristaDAO.insertRoteirista(roteirista)
                return result ? message.SUCCESS_CREATED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarRoteirista = async function(id, roteirista, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
               roteirista.nome_roteirista     == '' || roteirista.nome_roteirista == undefined || roteirista.nome_roteirista == null || roteirista.nome_roteirista.length > 100 ||
               roteirista.biografia           == '' || roteirista.biografia == undefined || roteirista.biografia == null || roteirista.biografia.length > 1000 ||
               roteirista.data_nascimento     == '' || roteirista.data_nascimento == undefined || roteirista.data_nascimento == null || roteirista.data_nascimento.length != 10 ||
               roteirista.tbl_sexo_id_sexo    == '' || roteirista.tbl_sexo_id_sexo == undefined)
            {
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let resultID = await roteiristaDAO.selectByIdRoteirista(parseInt(id))

                if(resultID && resultID.length > 0){
                    roteirista.id_roteirista = parseInt(id)
                    let result = await roteiristaDAO.updateRoteirista(roteirista)
                    return result ? message.SUCCESS_UPDATED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL
                }else{
                    return message.ERROR_NOT_FOUND
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirRoteirista = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            let resultID = await roteiristaDAO.selectByIdRoteirista(parseInt(id))

            if(resultID && resultID.length > 0){
                let result = await roteiristaDAO.deleteRoteirista(parseInt(id))
                return result ? message.SUCCESS_DELETED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL
            }else{
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarRoteirista = async function(){
    try {
        let result = await roteiristaDAO.selectAllRoteirista()
        if(result && result.length > 0){
            return {
                status: true,
                status_code: 200,
                items: result.length,
                roteiristas: result
            }
        }else{
            return message.ERROR_NOT_FOUND
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarRoteirista = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            let result = await roteiristaDAO.selectByIdRoteirista(parseInt(id))
            if(result && result.length > 0){
                return {
                    status: true,
                    status_code: 200,
                    roteiristas: result
                }
            }else{
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirRoteirista,
    atualizarRoteirista,
    excluirRoteirista,
    listarRoteirista,
    buscarRoteirista
}
