<?php

function salvar_respoata_app($dados) {
    try {
        
		$lendo = json_decode( $dados["lista_respostas"] );
		
		$id_cliente_atual = "";
			
		foreach ( $lendo as $campo ) {
			
			if($id_cliente_atual !== $campo->id_cliente){
				
				$pdo_cliente = new PDO(get_conexao_cliente($campo->id_cliente));
				$pdo_cliente->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				$conect = $pdo_cliente;
				$conect->beginTransaction();			
				
				$id_cliente_atual = $campo->id_cliente;
			}
								
			
			$consulta = $conect->prepare(
			"INSERT INTO ad_avaliacao_resposta
			(  
			  data_hora_salvo,
			  id_estudante,
			  id_pergunta,
			  id_resposta,
			  data_hora_inicio_prova,
			  data_hora_resposta_questao
			)
			VALUES (  
			  :data_hora_salvo,
			  :id_estudante,
			  :id_pergunta,
			  :id_resposta,
			  :data_hora_inicio_prova,
			  :data_hora_resposta_questao
			);"
			);		
			$consulta->bindParam( ":data_hora_salvo", 				$dados["data_hora"], 				PDO::PARAM_STR );
			$consulta->bindParam( ":id_estudante", 					$campo->id_estudante, 				PDO::PARAM_STR );
			$consulta->bindParam( ":id_pergunta", 					$campo->id_pergunta, 				PDO::PARAM_STR );
			$consulta->bindParam( ":id_resposta", 					$campo->id_resposta, 				PDO::PARAM_STR );
			$consulta->bindParam( ":data_hora_inicio_prova", 		$campo->data_hora_inicio_prova,		PDO::PARAM_STR );
			$consulta->bindParam( ":data_hora_resposta_questao", 	$campo->data_hora_resposta_questao,	PDO::PARAM_STR );
			$consulta->execute();
						

		}
		
		$conect->commit();

				
		return return_true("DADOS SALVOS");
		
    } 
	catch (Exception $e) {
        //$conect->rollBack();        
        return return_erro($e->getMessage());
    }
}

?>