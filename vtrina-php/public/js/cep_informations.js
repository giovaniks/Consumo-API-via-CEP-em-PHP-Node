import {
    message,
    loadingRequest
} from './main.js'


$(document).ready(()=>{

    function cepTable(obj){
        message('success',`
        <div class="table-responsive">
        <table class="table table-bordered bg-light">
            <thead class="text-light fw-bold bg-dark bg-gradient" style="font-size:12px;">
                <tr>
                    <th>CEP</th>
                    <th>Logradouro</th>
                    <th>Complemento</th>
                    <th>Bairro</th>
                    <th>Localidade</th>
                    <th>UF</th>
                    <th>IBGE</th>
                    <th>GIA</th>
                    <th>DDD</th>
                    <th>SIAFI</th>
                </tr>
            </thead>
            <tbody class="text-dark fw-bold" style="font-size:12px;">
                <tr>
                    <td>${obj.cep}</td>
                    <td>${obj.logradouro}</td>
                    <td>${obj.complemento}</td>
                    <td>${obj.bairro}</td>
                    <td>${obj.localidade}</td>
                    <td>${obj.uf}</td>
                    <td>${obj.ibge}</td>
                    <td>${obj.gia}</td>
                    <td>${obj.ddd}</td>
                    <td>${obj.siafi}</td>
                </tr>
            </tbody>
        </table>
        </div>
        `,'buscarInfos');
    }

    function findThisCep(cep){
        if(typeof(cep) !== 'undefined'){
            if(cep.trim().length === 8){
                let ajaxParams = {
                    "action":"buscarCep",
                    "cep":cep
                }
                $('.searchCep').prop("disabled",true);
                if(localStorage.getItem(`${cep}`)){
                    let cache = localStorage.getItem(`${cep}`);
                    cache = JSON.parse(cache);
                    cepTable(cache);
                    $('.searchCep').prop("disabled",false);
                }else{
                    $.post('/buscarCep',ajaxParams,(apiReturnData)=>{
                        try {
                            let viaData = JSON.parse(apiReturnData);
                            switch(viaData.resul){
                                case "success":
                                    let infos = JSON.parse(viaData.message);
                                    localStorage.setItem(`${cep}`,`${JSON.stringify(infos)}`);
                                    cepTable(infos);
                                break;
    
                                case "error":
                                    message('danger',viaData.message,'buscarInfos');
                                break;
                            }
                        } catch (error) {
                            message('warning',error,'buscarInfos');
                        }
                    }).then(()=>{
                        $('.searchCep').prop("disabled",false);
                    }).catch(()=>{
                        message('warning',`Ocorreu um erro : Não foi possível completar a requisição!<br>
                        Por favor, atualize a página e tente novamente...`,'buscarInfos');
                    });
                }

            }else{
                message('warning','Por favor, informe um CEP válido para iniciar a busca, digite apenas números!','buscarInfos');
            }
        }else{
            message('warning','Preencha o campo CEP para iniciar a busca!','buscarInfos');
        }
    }

    $(document).on('click','.searchCep',function(){
        loadingRequest('loadInfos');
        findThisCep($('.cepValue').val());
    });

});