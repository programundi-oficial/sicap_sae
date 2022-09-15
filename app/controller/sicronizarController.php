<?php
//error_reporting( 0 ); 
header("Access-Control-Allow-Origin: *");

include "../database/config.php";
include "../function/functions.php";
include "../function/sicronizarFunction.php";

$opcao = $_POST["s"];

switch($opcao) {
	case  "1": f1();        
		break;
    case  "2": f2();        
		break;
    case  "3": f3();        
		break;
    case  "4": f4();        
		break;
    case  "5": f5();        
		break;
    case  "6": f6();        
		break;
    case  "7": f7();        
		break;
    case  "8": f8();        
		break;
    case  "9": f9();        
		break;
    case "10": f10();       
		break;
    case "11": f11();       
		break;
	default: 
		echo return_erro("Serviço não disponível!");
}

exit;



function f1() {	
   
	$lista_respostas 	= stripslashes($_POST["lista_respostas"]);
	$data_hora 			= data_time_atual();
	
	
	
	$dados = array(        
		'lista_respostas' 	=> $lista_respostas,
		'data_hora'			=> $data_hora
	);
    echo salvar_respoata_app($dados);
}



?>
