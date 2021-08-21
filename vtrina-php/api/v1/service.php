<?php

    require 'src/AjaxReturn.php';

    class Busca{

        static private $action;
        static private $cep;
        static private $fetch;
        static private $dataJson;

        public static function findThisCep(){
            self::$fetch = file_get_contents("https://viacep.com.br/ws/".self::$cep."/json/");
            if(self::$fetch !== NULL){
                    self::$dataJson = json_decode(self::$fetch,true);
                        if(self::$dataJson !== NULL){
                            if(self::$dataJson['erro'] !== true){
                                foreach(self::$dataJson as $key=>$value){
                                   !empty(self::$dataJson[$key])?self::$dataJson[$key] = self::$dataJson[$key] : self::$dataJson[$key] = 'Indefinido';
                                }
                                AjaxReturn::mensagem('success',json_encode(self::$dataJson));
                            }else{
                                AjaxReturn::mensagem('error','Não foram encontrados dados referentes a este CEP!');
                            }
                        }else{
                            AjaxReturn::mensagem('error','Não foram encontrados dados referentes a este CEP!');
                        }
            }else{
                AjaxReturn::mensagem('error','Ocorreu um erro : Não foi possivel completar a requisição! <br>
                Por favor, atualize a página e tente novamente...');
            }
        }

        public static function receivedAjaxRequest(){
            self::$action = filter_input(INPUT_POST,'action',FILTER_SANITIZE_STRING);
            self::$cep = filter_input(INPUT_POST,'cep',FILTER_SANITIZE_NUMBER_INT);
                switch(self::$action){
                    case 'buscarCep':
                        if(!empty(self::$cep)){
                            self::findThisCep();
                        }else{
                            AjaxReturn::mensagem('error','O cep informado não é válido!');
                        }
                    break;

                    default:
                        AjaxReturn::mensagem('error','Os parametros necessários não foram informados!');
                    break;
                }
        }

    }

    Busca::receivedAjaxRequest();


?>