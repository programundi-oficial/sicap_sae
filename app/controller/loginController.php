<?php
error_reporting( 0 ); 
header("Access-Control-Allow-Origin: *");

include "../database/config.php";
include "../function/functions.php";
include "../function/loginFunctions.php";

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
	
   	$login = $_POST["login"];
	$senha = $_POST["senha"];
	
	$dados = array(        
		'login' 	=> $login,
		'senha' 	=> $senha
	);
	
    echo validar_login($dados);
	
}

function f2(){
	
	$ano_letivo = $_POST["ano_letivo"];	
	$id_cliente = $_POST["id_cliente"];	
	$conexao 	= get_conexao_cliente($id_cliente);
	
	$dados = array(        
		'ano_letivo' 	=> $ano_letivo,
		'id_cliente' 	=> $id_cliente,
		'conexao'		=> $conexao
	);
    echo get_avaliacao_diaginostica($dados);
}

function f3(){
	
	$ano_letivo 	= $_POST["ano_letivo"];	
	$id_cliente 	= $_POST["id_cliente"];	
	$id_avaliacao 	= $_POST["id_avaliacao"];	
	$conexao 		= get_conexao_cliente($id_cliente);
	
	$dados = array(        
		'ano_letivo' 	=> $ano_letivo,
		'id_cliente' 	=> $id_cliente,
		'id_avaliacao'	=> $id_avaliacao,
		'conexao'		=> $conexao
	);
	
	echo gerar_dados_avaliacao_offline($dados);
}

function f4(){
	
	$ano_letivo 	= $_POST["ano_letivo"];	
	$id_cliente 	= $_POST["id_cliente"];	
	$id_avaliacao 	= $_POST["id_avaliacao"];	
	$conexao 		= get_conexao_cliente($id_cliente);
	
	$dados = array(        
		'ano_letivo' 	=> $ano_letivo,
		'id_cliente' 	=> $id_cliente,
		'id_avaliacao'	=> $id_avaliacao,
		'conexao'		=> $conexao
	);
	
	echo gerar_dados_alunos_offline($dados);
}

?>
