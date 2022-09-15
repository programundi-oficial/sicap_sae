<?php

function remove_sql_caract($string) {  
	$string = strtoupper($string);
	$what = array('INSERT','SELECT','DELETE','UPDATE');    
	$by   = array('','','','');    
	return str_replace($what, $by, $string);
}

function remove_spacovazio_caract($string) {   
    $what = array(' ','  ','   ');    
    $by   = array('','','');    
    return str_replace($what, $by, $string);
}

function verifica_pasta($d,$p){		
	if (is_dir($d)) {
		if ($dh = opendir($d)) {			
			while (($file = readdir($dh)) !== false) {				
				if($file == '.' || $file == '..'){}
				else{					
					if($file == $p){					
						return true;
					}					
				}
			} 
			closedir($dh);
		}
	}	
}

function criar_pasta($d,$p){
	$t = verifica_pasta($d,$p);
	if($t == true){	}
	else{mkdir($d.$p) or die("erro ao criar diretório");}	
}

function data_time_atual(){
	date_default_timezone_set('America/recife');
	$date = date('Y-m-d H:i:s');
	return $date;
}

function dominio_atual(){
	return $_SERVER['HTTP_HOST'];
} 

function pegaip(){		
	if (!empty($_SERVER['HTTP_CLIENT_IP'])){
		$ip=$_SERVER['HTTP_CLIENT_IP'];
	}		
	elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
		$ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
	}
	else{
		$ip=$_SERVER['REMOTE_ADDR'];
	}		
	return $ip;
}

function geraSenha($tamanho, $maiusculas, $numeros, $simbolos){
	$lmin = 'abcdefghijklmnopqrstuvwxyz';
	$lmai = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$num = '1234567890';
	$simb = '!@#$%*-';
	$retorno = '';
	$caracteres = '';
	$caracteres .= $lmin;
	if ($maiusculas) $caracteres .= $lmai;
	if ($numeros) $caracteres .= $num;
	if ($simbolos) $caracteres .= $simb;
	$len = strlen($caracteres);
	for ($n = 1; $n <= $tamanho; $n++) {
	$rand = mt_rand(1, $len);
	$retorno .= $caracteres[$rand-1];
	}
	return $retorno;
}

function gera_numeros($tamanho, $maiusculas, $numeros, $simbolos){
	$lmin = '';
	$lmai = '';
	$num = '1234567890';
	$simb = '!@#$%*-';
	$retorno = '';
	$caracteres = '';
	$caracteres .= $lmin;
	if ($maiusculas) $caracteres .= $lmai;
	if ($numeros) $caracteres .= $num;
	if ($simbolos) $caracteres .= $simb;
	$len = strlen($caracteres);
	for ($n = 1; $n <= $tamanho; $n++) {
	$rand = mt_rand(1, $len);
	$retorno .= $caracteres[$rand-1];
	}
	return $retorno;
}

function remove_especial_caract($string) {   
    $what = array( 'ä','ã','à','á','â','ê','ë','è','é','ï','ì','í','ö','õ','ò','ó','ô','ü','ù','ú','û','À','Á','É','Í','Ó','Ú','ñ','Ñ','ç','Ç','-','(',')',',',';',':','|','!','"','#','$','%','&','/','=','?','~','^','>','<','ª','º','.','Ã','Ô','Ê','  ','Õ','Â','§','°','   ','Ü','    ','     ','      ','–',' 
','´','�');    
    $by   = array( 'a','a','a','a','a','e','e','e','e','i','i','i','o','o','o','o','o','u','u','u','u','A','A','E','I','O','U','n','n','c','C','','','','','','','','','','','','','','','','','','','','','','','','A','O','E','','O','A','','','','U','','','','','','','');    
    return str_replace($what, $by, $string);
}

function valida_cpf($p1) {	
	$digitos = substr($p1, 0, 9);	
	$novo_cpf = calc_digitos_posicoes( $digitos );	
	$novo_cpf = calc_digitos_posicoes( $novo_cpf, 11 );	
	if ( verifica_igualdade($p1) ) {return false;}	
	if ( $novo_cpf === $p1 ) {return true;} 
	else {return false;}
}

function valida_cnpj ($p1) {		
	$cnpj_original = $p1;		
	$primeiros_numeros_cnpj = substr( $p1, 0, 12 );		
	$primeiro_calculo = calc_digitos_posicoes($primeiros_numeros_cnpj, 5);		
	$segundo_calculo = calc_digitos_posicoes($primeiro_calculo, 6);		
	$cnpj = $segundo_calculo;        
	if (verifica_igualdade($p1)) {return false;}		
	if ($cnpj === $cnpj_original) {return true;}
}

function valida_cpf_cnpj_function ($p1){		
	if (verifica_cpf_cnpj($p1) === 'CPF'){return valida_cpf($p1);} 	
	elseif (verifica_cpf_cnpj($p1) === 'CNPJ'){return valida_cnpj($p1);} 	
	else {return false;}
}

function verifica_cpf_cnpj ($p1) {	
	if (strlen( $p1 ) === 11) {return 'CPF';} 
	elseif (strlen( $p1 ) === 14) {return 'CNPJ';} 
	else {return false;}
}

function verifica_igualdade($p1) {	
	$caracteres = str_split($p1);
	$todos_iguais = true;	
	$last_val = $caracteres[0];	
	foreach($caracteres as $val) {		
		if ($last_val != $val) {$todos_iguais = false;}		
		$last_val = $val;
	}	
	return $todos_iguais;
}

function calc_digitos_posicoes( $digitos, $posicoes = 10, $soma_digitos = 0) {		
	for ($i = 0; $i < strlen( $digitos ); $i++) {
		$soma_digitos = $soma_digitos + ( $digitos[$i] * $posicoes);			
		$posicoes--;			
		if ($posicoes < 2) {$posicoes = 9;}
	}		
	$soma_digitos = $soma_digitos % 11;		
	if ($soma_digitos < 2) {$soma_digitos = 0;} 
	else {$soma_digitos = 11 - $soma_digitos;}		
	$cpf = $digitos . $soma_digitos;		
	return $cpf;
}

function enviar_whasapp($numero, $texto_mensagem){
	
	$content = http_build_query(array(	
		'phone' => "55".$numero,
		'text' => $texto_mensagem
	));	 
	$context = stream_context_create(array(
		'http' => array(			
			'method'  => 'GET',
			'content' => $content,
		)
	)); 
	
	$url_final = "http://programundi.com.br/whatsapp/enviozap.php?text=".escape_php($texto_mensagem)."&phone=55".$numero;
	
	return file_get_contents($url_final, false, $context);
}

function return_erro($texto){
	 $erro = array(
        'result' => "false",
        'p1' => $texto
    );
    return "[".json_encode($erro)."]";
}

function return_true($texto){
	
	 $erro[]=[
	  'result' 		=> "true",		 
	  'lista_p' 	=> $texto
	];
	
    return json_encode($erro);
	
}

function escape_php($string) {  
    $what = array(' ','  ','   ','    ');    
    $by   = array('%20','%20%20','%20%20%20','%20%20%20%20');    
    return str_replace($what, $by, $string);
}

function contt_json_rell($json){
	
	return '[{"lista":'.$json.'}]';
	
}

function gerando_Relatorio_rodrigo($dados_json, $id_relatorio) {
	$curl = curl_init();

	curl_setopt_array($curl, [
		CURLOPT_RETURNTRANSFER  => 1,
		CURLOPT_URL             => 'https://suportegerencial.com/modulo-relatorio/app/controller/gerar_relatorio.php',
		CURLOPT_POST            => 1,
		CURLOPT_POSTFIELDS      => [
			s => '1',
			r => $id_relatorio,
			j => $dados_json
		]
	]);
	$resultado = curl_exec($curl);
	$erro = curl_error($resultado);

	curl_close($curl);
	return $resultado;
}



function pasta_isexiste($pasta){	
	if(is_dir($pasta)){
		$diretorio = dir($pasta);
		$listloop  = '';		
		while(($arquivo = $diretorio->read()) !== false){			
			$isvirgula = "";			
			if($listloop !== ""){ $isvirgula = ","; }
			if($arquivo  !== "." && $arquivo !== ".."){						
				$listloop = $listloop.$isvirgula.'{"p1":"'.$pasta."/".$arquivo.'","p2": "'.$arquivo.'"}';
			}
		}		
		if($listloop == ""){
			return '[{"p1":"false"}]';
		}
		return "[".$listloop."]";
		$diretorio->close();
	}
	else{
		return '[{"p1":"false"}]';
	}
}



function get_conexao_cliente($id_cliente){
	try {
        $conect = $GLOBALS['pdo_staf'];
        $conect->beginTransaction();
						
        $consulta = $conect->prepare(
		"SELECT
		'pgsql:host='||s.host_servidor_banco||' dbname='||s.dbname_servidor_banco||' port='||s.port_servidor_banco||' user='||user_servidor_banco||' password='||s.password_servidor_banco as conexao
		FROM sistemas_clientes s		
		WHERE 1=1
		AND s.id_clientes 	= :id_clientes	
		AND s.id_sistemas 	= 4
		AND s.is_bloqueado 	= FALSE"
        );		
		$consulta->bindParam( ":id_clientes", $id_cliente, PDO::PARAM_STR );		
        $consulta->execute();
		$sistemas_clientes = $consulta->fetch( PDO::FETCH_ASSOC );
				
		if($sistemas_clientes["conexao"] == null){
			$conect->rollBack();        
        	return "false";
		}
				
								
		$conect->commit();
		
								
		return $sistemas_clientes["conexao"];
    } 
	catch (Exception $e) {
        $conect->rollBack();        
        return "false";
    }
}


?>