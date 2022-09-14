<?php

function verificar_versao_app() {
    try {
        $conect = $GLOBALS['pdo_adm'];
        $conect->beginTransaction();
						
        $consulta = $conect->prepare(
		"SELECT
		a.cod_versao,
		a.data_hora,
		a.url_download
		FROM app_versao a
		WHERE 1=1
		AND a.is_atual=TRUE"
        );		
		//$consulta->bindParam( ":cod_municipio", $dados["cod_municipio"], PDO::PARAM_STR );
        $consulta->execute();
		
		while ( $linha = $consulta->fetch( PDO::FETCH_ASSOC ) ) {
			$vetor[] = ( $linha );			
		}
								
		$conect->commit();
		
		if($vetor == NULL){
			return return_erro("NÃO FOI LOCALIZADO NENHUM DADO");
		}						
		return return_true($vetor);
    } 
	catch (Exception $e) {
        $conect->rollBack();        
        return return_erro($e->getMessage());
    }
}

?>