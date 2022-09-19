<?php

function converte_img_base64($path){	
	if($path == ""){
		return "";
	}
	$type = pathinfo($path, PATHINFO_EXTENSION);
	$data = file_get_contents($path);
	return 'data:image/' . $type . ';base64,' . base64_encode($data);
}

function validar_login($dados) {
    try {
        $conect = $GLOBALS['pdo_staf'];
        $conect->beginTransaction();
						
        $consulta = $conect->prepare(
		"SELECT
		count(u.id_usuario) as is_existe
		FROM usuarios u
		WHERE 1=1
		AND u.email_usuario = :email_usuario
		AND u.senha_usuario = :senha_usuario"
        );		
		$consulta->bindParam( ":email_usuario", $dados["login"], PDO::PARAM_STR );
		$consulta->bindParam( ":senha_usuario", $dados["senha"], PDO::PARAM_STR );
        $consulta->execute();
		$usuarios = $consulta->fetch( PDO::FETCH_ASSOC );
		
		if(intval($usuarios["is_existe"]) == intval("0")){
			$conect->rollBack();        
        	return return_erro("login não localizado");
		}
		
		$consulta = $conect->prepare(
		"SELECT	
		DISTINCT
		usc.ano_letivo,
		c.id_cliente,
		c.nome_cliente,
		c.img_logo
		FROM usuarios_sistemas_clientes usc
		JOIN usuarios u on u.id_usuario=usc.id_usuario
		JOIN clientes c on c.id_cliente=usc.id_cliente		
		WHERE 1=1
		AND usc.id_sistemas	= 4
		AND u.email_usuario	= :email_usuario
		AND u.senha_usuario	= :senha_usuario
		AND usc.is_ativo=TRUE
		AND usc.ano_letivo is not null
		ORDER BY 1,3"
        );		
		$consulta->bindParam( ":email_usuario", $dados["login"], PDO::PARAM_STR );
		$consulta->bindParam( ":senha_usuario", $dados["senha"], PDO::PARAM_STR );
        $consulta->execute();
		
		while ( $linha = $consulta->fetch( PDO::FETCH_ASSOC ) ) {
			//$vetor[] = ( $linha );			
			$vetor[] = array(
				'id_cliente'			=> $linha['id_cliente'],
				'ano_letivo'     		=> $linha['ano_letivo'],
				'nome_cliente'     		=> $linha['nome_cliente'],  
				'img_logo'  			=> converte_img_base64($linha['img_logo'])
			);
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

function get_avaliacao_diaginostica($dados){
	try {
		$pdo_cliente = new PDO($dados['conexao']);
		$pdo_cliente->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$conect = $pdo_cliente;
		$conect->beginTransaction();

		$consulta = $conect->prepare(
		"SELECT
		a.id,
		a.descricao
		FROM ad_avaliacao a
		JOIN anoletivo ano on ano.id_anoletivo=a.id_ano_letivo
		WHERE 1=1
		AND ano.ds_anoletivo 	= :ds_anoletivo
		AND a.is_excluido		= FALSE
		ORDER BY 2"
		);		
		$consulta->bindParam( ":ds_anoletivo", $dados["ano_letivo"], PDO::PARAM_STR );
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

function gerar_dados_avaliacao_offline($dados) {
    try {
        $pdo_cliente = new PDO($dados['conexao']);
		$pdo_cliente->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conect = $pdo_cliente;
        $conect->beginTransaction();
						
        $consulta = $conect->prepare(
		"SELECT
		aa.id,
		aa.descricao as desc_,
		aa.data_inicio,
		aa.data_fim
		FROM ad_avaliacao aa
		WHERE 1=1
		AND aa.id			= :id
		AND aa.is_excluido	= FALSE"
        );		
		$consulta->bindParam( ":id", $dados["id_avaliacao"], PDO::PARAM_STR );
        $consulta->execute();
		
		while ( $linha = $consulta->fetch( PDO::FETCH_ASSOC ) ) {
			//$vetor[] = ( $linha );	
			$vetor[] = array(
				'id'     				=> $linha['id'],
				'desc_'     			=> $linha['desc_'],  
				'data_inicio'  			=> $linha['data_inicio'], 
				'data_fim'  			=> $linha['data_fim'], 								
				'avaliacao_ano'    		=> lista_avaliacao_ano($conect, $linha['id'])
			);
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

function lista_avaliacao_ano($conect, $codigo){
	
	try {	
		
        $consulta = $conect->prepare(
		"SELECT
		aaa.id as id_avaliacao_ano,
		aaa.id_serie_ano_letivo,
		sa.descricao as serie_,
		aaa.tempo_de_prova
		FROM ad_avaliacao_ano aaa
		JOIN ad_avaliacao aa 		on aa.id=aaa.id_ad_avaliacao
		JOIN serie_anoletivo sa 	on sa.id_serie_anoletivo=aaa.id_serie_ano_letivo AND sa.id_anoletivo=aa.id_ano_letivo
		WHERE 1=1
		AND aaa.is_excluido		= FALSE
		AND aaa.id_ad_avaliacao	= :id_ad_avaliacao"
        );		
		$consulta->bindParam( ":id_ad_avaliacao", $codigo, PDO::PARAM_STR );
        $consulta->execute();
				        		
		while ( $linha = $consulta->fetch( PDO::FETCH_ASSOC ) ) {
			//$vetor[] = ( $linha );	
			$vetor[] = array(
				'id_avaliacao_ano'     	=> $linha['id_avaliacao_ano'],
				'id_serie_ano_letivo'   => $linha['id_serie_ano_letivo'],  
				'serie_' 				=> $linha['serie_'], 
				'tempo_de_prova'  		=> $linha['tempo_de_prova'],								
				'avaliacao_componetes'  => lista_avaliacao_componetes($conect, $linha['id_avaliacao_ano'])
			);
		}					
						
		return ($vetor);
		
    } 
	catch (Exception $e) {           
        return ($e->getMessage());
    }
}

function lista_avaliacao_componetes($conect, $codigo){
	
	try {	
		
        $consulta = $conect->prepare(
		"SELECT
		aai.id as id_avaliacao_item,
		ac.id as id_componente_curricular,
		ac.descricao as desc_componente_curricular,
		ascc.id as id_sub_componente_curricular,
		ascc.descricao as sub_componente_curricular,
		(
		  SELECT
		  count(aap.id) as qtd  
		  FROM ad_avaliacao_perguntas aap
		  WHERE 1=1
		  AND aap.is_atual			= TRUE
		  AND aap.id_avaliacao_item	= aai.id
		) as qtd_questao
		FROM ad_avaliacao_item aai
		JOIN ad_componente_curricular ac				on ac.id=aai.id_ad_componente_curricular
		JOIN ad_sub_componente_curricular ascc			on ascc.id=aai.id_ad_sub_componente_curricular
		WHERE 1=1
		AND aai.id_ad_avaliacao_ano	= :id_ad_avaliacao_ano"
        );		
		$consulta->bindParam( ":id_ad_avaliacao_ano", $codigo, PDO::PARAM_STR );
        $consulta->execute();
				        		
		while ( $linha = $consulta->fetch( PDO::FETCH_ASSOC ) ) {
			//$vetor[] = ( $linha );	
			$vetor[] = array(
				'id_avaliacao_item'     		=> $linha['id_avaliacao_item'],
				'id_componente_curricular'   	=> $linha['id_componente_curricular'],  
				'desc_componente_curricular' 	=> $linha['desc_componente_curricular'], 
				'id_sub_componente_curricular'  => $linha['id_sub_componente_curricular'], 
				'sub_componente_curricular'  	=> $linha['sub_componente_curricular'],
				'qtd_questao'  					=> $linha['qtd_questao'],
				'perguntas'  					=> lista_avaliacao_perguntas($conect, $linha['id_avaliacao_item'])
			);				
		}					
						
		return ($vetor);
		
    } 
	catch (Exception $e) {           
        return ($e->getMessage());
    }
}

function lista_avaliacao_perguntas($conect, $codigo){
	
	try {	
		
        $consulta = $conect->prepare(
		"SELECT
		aap.id as id_avaliacao_perguntas,
		aap.desc_pergunta,
		aap.descritor,
		aap.ordem_criacao
		FROM ad_avaliacao_perguntas aap
		WHERE 1=1
		AND aap.is_atual			= TRUE
		AND aap.id_avaliacao_item	= :id_avaliacao_item
		ORDER BY 4"
        );		
		$consulta->bindParam( ":id_avaliacao_item", $codigo, PDO::PARAM_STR );
        $consulta->execute();
				        		
		while ( $linha = $consulta->fetch( PDO::FETCH_ASSOC ) ) {
			//$vetor[] = ( $linha );	
			$vetor[] = array(
				'id_avaliacao_perguntas'    => $linha['id_avaliacao_perguntas'],
				'desc_pergunta'   			=> $linha['desc_pergunta'],  
				'descritor' 				=> $linha['descritor'], 
				'ordem_criacao'  			=> $linha['ordem_criacao'], 								
				'opcoes'  					=> lista_avaliacao_alternativas($conect, $linha['id_avaliacao_perguntas'])
			);				
		}					
						
		return ($vetor);
		
    } 
	catch (Exception $e) {           
        return ($e->getMessage());
    }
}

function lista_avaliacao_alternativas($conect, $codigo){
	
	try {	
		
        $consulta = $conect->prepare(
		"SELECT
		aapa.id as id_,
		aapa.desc_pergunta as desc_alternativa,
		aapa.img,
		aapa.is_correta
		FROM ad_avaliacao_perguntas_alternativas aapa
		WHERE 1=1
		AND aapa.id_ad_avaliacao_perguntas = :id_ad_avaliacao_perguntas"
        );		
		$consulta->bindParam( ":id_ad_avaliacao_perguntas", $codigo, PDO::PARAM_STR );
        $consulta->execute();
				        		
		while ( $linha = $consulta->fetch( PDO::FETCH_ASSOC ) ) {
			$vetor[] = ( $linha );							
		}					
						
		return ($vetor);
		
    } 
	catch (Exception $e) {           
        return ($e->getMessage());
    }
}

function gerar_dados_alunos_offline($dados) {
    try {
        $pdo_cliente = new PDO($dados['conexao']);
		$pdo_cliente->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conect = $pdo_cliente;
        $conect->beginTransaction();
						
        $consulta = $conect->prepare(
		"SELECT
		DISTINCT
		fx.id_serie_anoletivo,
		fx.serie_anoletivo,
		(
        	SELECT
            ins.id_cliente
            FROM instituicao ins
        ) as id_cliente
		FROM (
			SELECT
			sa.id_serie_anoletivo,
			sa.descricao as serie_anoletivo,
			lt.id_escola,
			lt.nm_escola,
			lt.desc_final as turma_,
			p.nome as estudante
			FROM lista_dados_turma lt
			JOIN matricula m 			on m.id_turma=lt.id_turma
			JOIN pessoa p 				on p.id_pessoa=m.id_aluno
			JOIN serie s 				on s.id_serie=m.id_serie
			JOIN serie_anoletivo sa 	on sa.id_serie=s.id_serie AND sa.id_anoletivo=lt.id_anoletivo
			WHERE 1=1
			AND lt.id_anoletivo = (
				SELECT
				DISTINCT
				aa.id_ano_letivo
				FROM ad_avaliacao_ano aaa
				JOIN ad_avaliacao aa 		on aa.id=aaa.id_ad_avaliacao
				JOIN serie_anoletivo sa 	on sa.id_serie_anoletivo=aaa.id_serie_ano_letivo AND sa.id_anoletivo=aa.id_ano_letivo
				WHERE 1=1
				AND aaa.is_excluido		= FALSE
				AND aaa.id_ad_avaliacao	= :id_avaliacao
			)
			AND sa.id_serie_anoletivo in (
			  SELECT
			  aaa.id_serie_ano_letivo
			  FROM ad_avaliacao_ano aaa
			  JOIN ad_avaliacao aa 		on aa.id=aaa.id_ad_avaliacao
			  JOIN serie_anoletivo sa 	on sa.id_serie_anoletivo=aaa.id_serie_ano_letivo AND sa.id_anoletivo=aa.id_ano_letivo
			  WHERE 1=1
			  AND aaa.is_excluido		= FALSE
			  AND aaa.id_ad_avaliacao	= :id_avaliacao
			)
			ORDER BY 2,4,5,6
		) fx
		ORDER BY 2"
        );		
		$consulta->bindParam( ":id_avaliacao", $dados["id_avaliacao"], PDO::PARAM_STR );
        $consulta->execute();
		
		while ( $linha = $consulta->fetch( PDO::FETCH_ASSOC ) ) {
			//$vetor[] = ( $linha );	
			$vetor[] = array(
				'id_serie_anoletivo'    => $linha['id_serie_anoletivo'],
				'serie_anoletivo'     	=> $linha['serie_anoletivo'], 
				'id_cliente'			=> $linha['id_cliente'],
				'escolas'    			=> gerar_dados_alunos_escola_offline($conect, $dados["id_avaliacao"], $linha['id_serie_anoletivo'])
			);				
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

function gerar_dados_alunos_escola_offline($conect, $id_avaliacao, $id_serie_anoletivo){
	
	try {	
		
        $consulta = $conect->prepare(
		"SELECT
		DISTINCT
		fx.id_escola,
		fx.nm_escola
		FROM (
			SELECT
			sa.id_serie_anoletivo,
			sa.descricao as serie_anoletivo,
			lt.id_escola,
			lt.nm_escola,
			lt.id_turma,
			lt.desc_final as turma_,
			p.nome as estudante
			FROM lista_dados_turma lt
			JOIN matricula m 			on m.id_turma=lt.id_turma
			JOIN pessoa p 				on p.id_pessoa=m.id_aluno
			JOIN serie s 				on s.id_serie=m.id_serie
			JOIN serie_anoletivo sa 	on sa.id_serie=s.id_serie AND sa.id_anoletivo=lt.id_anoletivo
			WHERE 1=1
			AND lt.id_anoletivo = (
				SELECT
				DISTINCT
				aa.id_ano_letivo
				FROM ad_avaliacao_ano aaa
				JOIN ad_avaliacao aa 		on aa.id=aaa.id_ad_avaliacao
				JOIN serie_anoletivo sa 	on sa.id_serie_anoletivo=aaa.id_serie_ano_letivo AND sa.id_anoletivo=aa.id_ano_letivo
				WHERE 1=1
				AND aaa.is_excluido		= FALSE
				AND aaa.id_ad_avaliacao	= :id_avaliacao
			)
			AND sa.id_serie_anoletivo in (
			  SELECT
			  aaa.id_serie_ano_letivo
			  FROM ad_avaliacao_ano aaa
			  JOIN ad_avaliacao aa 		on aa.id=aaa.id_ad_avaliacao
			  JOIN serie_anoletivo sa 	on sa.id_serie_anoletivo=aaa.id_serie_ano_letivo AND sa.id_anoletivo=aa.id_ano_letivo
			  WHERE 1=1
			  AND aaa.is_excluido		= FALSE
			  AND aaa.id_ad_avaliacao	= :id_avaliacao
			)
			ORDER BY 2,4,5,6
		) fx
		WHERE fx.id_serie_anoletivo = :id_serie_anoletivo
		ORDER BY 2"
        );		
		$consulta->bindParam( ":id_avaliacao", 			$id_avaliacao, 			PDO::PARAM_STR );	
		$consulta->bindParam( ":id_serie_anoletivo", 	$id_serie_anoletivo, 	PDO::PARAM_STR );
        $consulta->execute();
				        		
		while ( $linha = $consulta->fetch( PDO::FETCH_ASSOC ) ) {
			//$vetor[] = ( $linha );	
			$vetor[] = array(
				'id_escola'     		=> $linha['id_escola'],
				'nm_escola'   			=> $linha['nm_escola'],  												
				'avaliacao_turmas'  	=> gerar_dados_alunos_turma_offline($conect, $id_avaliacao, $id_serie_anoletivo, $linha['id_escola'])
			);
		}					
						
		return ($vetor);
		
    } 
	catch (Exception $e) {           
        return ($e->getMessage());
    }
}

function gerar_dados_alunos_turma_offline($conect, $id_avaliacao, $id_serie_anoletivo, $id_escola){
	
	try {	
		
        $consulta = $conect->prepare(
		"SELECT
		DISTINCT
		fx.id_turma,
		fx.turma_
		FROM (
			SELECT
			sa.id_serie_anoletivo,
			sa.descricao as serie_anoletivo,
			lt.id_escola,
			lt.nm_escola,
			lt.id_turma,
			lt.desc_final as turma_,
			p.nome as estudante
			FROM lista_dados_turma lt
			JOIN matricula m 			on m.id_turma=lt.id_turma
			JOIN pessoa p 				on p.id_pessoa=m.id_aluno
			JOIN serie s 				on s.id_serie=m.id_serie
			JOIN serie_anoletivo sa 	on sa.id_serie=s.id_serie AND sa.id_anoletivo=lt.id_anoletivo
			WHERE 1=1
			AND lt.id_anoletivo = (
				SELECT
				DISTINCT
				aa.id_ano_letivo
				FROM ad_avaliacao_ano aaa
				JOIN ad_avaliacao aa 		on aa.id=aaa.id_ad_avaliacao
				JOIN serie_anoletivo sa 	on sa.id_serie_anoletivo=aaa.id_serie_ano_letivo AND sa.id_anoletivo=aa.id_ano_letivo
				WHERE 1=1
				AND aaa.is_excluido		= FALSE
				AND aaa.id_ad_avaliacao	= :id_avaliacao
			)
			AND sa.id_serie_anoletivo in (
			  SELECT
			  aaa.id_serie_ano_letivo
			  FROM ad_avaliacao_ano aaa
			  JOIN ad_avaliacao aa 		on aa.id=aaa.id_ad_avaliacao
			  JOIN serie_anoletivo sa 	on sa.id_serie_anoletivo=aaa.id_serie_ano_letivo AND sa.id_anoletivo=aa.id_ano_letivo
			  WHERE 1=1
			  AND aaa.is_excluido		= FALSE
			  AND aaa.id_ad_avaliacao	= :id_avaliacao
			)
			ORDER BY 2,4,5,6
		) fx
		WHERE 1=1
		AND fx.id_escola 			= :id_escola
		AND fx.id_serie_anoletivo	= :id_serie_anoletivo
		ORDER BY 2"
        );	
		$consulta->bindParam( ":id_avaliacao", 			$id_avaliacao, 			PDO::PARAM_STR );
		$consulta->bindParam( ":id_escola", 			$id_escola, 			PDO::PARAM_STR );	
		$consulta->bindParam( ":id_serie_anoletivo", 	$id_serie_anoletivo, 	PDO::PARAM_STR );	
        $consulta->execute();
				        		
		while ( $linha = $consulta->fetch( PDO::FETCH_ASSOC ) ) {
			//$vetor[] = ( $linha );	
			$vetor[] = array(
				'id_turma'     			=> $linha['id_turma'],
				'turma_'   				=> $linha['turma_'],  												
				'estudantes'  			=> gerar_dados_alunos_estudantes_offline($conect, $id_avaliacao, $id_serie_anoletivo, $id_escola, $linha['id_turma'])
			);
		}					
						
		return ($vetor);
		
    } 
	catch (Exception $e) {           
        return ($e->getMessage());
    }
}

function gerar_dados_alunos_estudantes_offline($conect, $id_avaliacao, $id_serie_anoletivo, $id_escola, $id_turma){
	
	try {	
		
        $consulta = $conect->prepare(
		"SELECT
		DISTINCT
		fx.id_aluno,
		fx.estudante,
		fx.matricula_aluno,
		(
        	SELECT
            fd.data
            FROM format_data(fx.dt_nascimento||'') fd
        ) as dt_nascimento
		FROM (
			SELECT
			sa.id_serie_anoletivo,
			sa.descricao as serie_anoletivo,
			lt.id_escola,
			lt.nm_escola,
			lt.id_turma,
			lt.desc_final as turma_,
			m.id_aluno,
			al.matricula as matricula_aluno,
			p.dt_nascimento,
			p.nome as estudante
			FROM lista_dados_turma lt
			JOIN matricula m 			on m.id_turma=lt.id_turma
			JOIN aluno al 				on al.id_pessoa=m.id_aluno
			JOIN pessoa p 				on p.id_pessoa=m.id_aluno
			JOIN serie s 				on s.id_serie=m.id_serie
			JOIN serie_anoletivo sa 	on sa.id_serie=s.id_serie AND sa.id_anoletivo=lt.id_anoletivo
			WHERE 1=1
			AND lt.id_anoletivo = (
				SELECT
				DISTINCT
				aa.id_ano_letivo
				FROM ad_avaliacao_ano aaa
				JOIN ad_avaliacao aa 		on aa.id=aaa.id_ad_avaliacao
				JOIN serie_anoletivo sa 	on sa.id_serie_anoletivo=aaa.id_serie_ano_letivo AND sa.id_anoletivo=aa.id_ano_letivo
				WHERE 1=1
				AND aaa.is_excluido		= FALSE
				AND aaa.id_ad_avaliacao	= :id_avaliacao
			)
			AND sa.id_serie_anoletivo in (
			  SELECT
			  aaa.id_serie_ano_letivo
			  FROM ad_avaliacao_ano aaa
			  JOIN ad_avaliacao aa 		on aa.id=aaa.id_ad_avaliacao
			  JOIN serie_anoletivo sa 	on sa.id_serie_anoletivo=aaa.id_serie_ano_letivo AND sa.id_anoletivo=aa.id_ano_letivo
			  WHERE 1=1
			  AND aaa.is_excluido		= FALSE
			  AND aaa.id_ad_avaliacao	= :id_avaliacao
			)
			ORDER BY 2,4,5,6
		) fx
		WHERE 1=1
		AND fx.id_escola 			= :id_escola
		AND fx.id_serie_anoletivo	= :id_serie_anoletivo
		AND fx.id_turma				= :id_turma
		ORDER BY 2"
        );		
		$consulta->bindParam( ":id_avaliacao", 			$id_avaliacao, 			PDO::PARAM_STR );
		$consulta->bindParam( ":id_escola", 			$id_escola, 			PDO::PARAM_STR );	
		$consulta->bindParam( ":id_serie_anoletivo", 	$id_serie_anoletivo, 	PDO::PARAM_STR );	
		$consulta->bindParam( ":id_turma", 				$id_turma, 				PDO::PARAM_STR );	
        $consulta->execute();
				        		
		while ( $linha = $consulta->fetch( PDO::FETCH_ASSOC ) ) {
			$vetor[] = ( $linha );				
		}					
						
		return ($vetor);
		
    } 
	catch (Exception $e) {           
        return ($e->getMessage());
    }
}

?>