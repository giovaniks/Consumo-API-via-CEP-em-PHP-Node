const { default: axios } = require("axios");

const searchCep = async (action,cep) =>{
    if(action === 'buscarCep'){
        if(typeof(cep) != 'undefined'){
            const apiData = await axios.get('https://viacep.com.br/ws/'+cep+'/json/');
            if(apiData.data){
                if(!apiData.data.erro){
                    const validateResponse = Object.entries(apiData.data);
                    validateResponse.map((param) => {
                        (param[1]) ? param[1] = param[1] : param[1] = 'Indefinido';
                    });
                    const formattedResponse = Object.fromEntries(validateResponse)
                    return {
                        "resul":"success",
                        "message":formattedResponse
                    }
                }else{
                    return {
                        "resul":"error",
                        "message":"Não foram encontrados dados referentes a este CEP!"
                    }
                }
            }else{
                return {"resul":"error",
                "message":"Ocorreu um erro ao realizar a consulta, por favor, tente novamente mais tarde!"
                }
            }
        }else{
            return{
                "resul":"error",
                "message":"Por favor, digite um CEP válido!"
            }
        }
    }else{
        return {
            "resul":"error",
            "message":"O parametro não é válido!"
        }
    }
}

module.exports = {
    searchCep
}