<?php

class AjaxReturn{

    public static function mensagem($resul,$mensagem){
        echo json_encode(array(
            "resul"=>$resul,
            "message"=>$mensagem
        ));
    }

}


?>