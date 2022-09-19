var request = window.indexedDB.open('offline', 1);
var request2 = '';
var avaliacoes = {}

function pergunta_mostrar(){
	let dados_estudante 	= localStorage.getItem("dados_estudante_prova");
	
	if(dados_estudante == null){		
		return;
	}
	
	let dados = JSON.parse(dados_estudante);    
	/*
    dados[0].id_ano_escolar;
	dados[0].id_escola;
	dados[0].id_estudante;
	dados[0].id_turma;
	*/
	
	let id_caderno_atual = get_caderno_atual();
	let id_questao_atual = $(".qtd_questoes_select option:selected").val();
	
	for (var i = 0; i < avaliacoes[0].lista_p[0].avaliacao_ano.length; i++) {
		
		if(parseInt(avaliacoes[0].lista_p[0].avaliacao_ano[i].id_serie_ano_letivo) == parseInt(dados[0].id_ano_escolar)){
			
			
			
			for (var i2 = 0; i2 < avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes.length; i2++) {			
				
				
				
				if(parseInt(id_caderno_atual) == parseInt(avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].id_avaliacao_item)){
				   	//console.log("questoa atual: "+id_questao_atual);
					//console.log("id_caderno_atual: "+id_caderno_atual);
					//console.log("id_caderno: "+avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].id_avaliacao_item);
					
					if(avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].perguntas !== null){
					
				   								
					   	$(".cont_pergunta").html(avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].desc_componente_curricular+"<br>"+avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].sub_componente_curricular+"<br>"+avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].perguntas[id_questao_atual].ordem_criacao+"<hr>"+unescape(avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].perguntas[id_questao_atual].desc_pergunta));
						
					   	$(".cont_pergunta img").css("width", "100%");
					   	
					   	$(".lista_alternativas").html("");
					   
					   	for (var i4 = 0; i4 < avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].perguntas[id_questao_atual].opcoes.length; i4++) {
							
							$(".lista_alternativas").append(`
							<div class="form-check mb-4">
								<input type="radio" onClick="set_resposta_estudante(${dados[0].id_cliente},${dados[0].id_estudante},${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].perguntas[id_questao_atual].id_avaliacao_perguntas},${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].perguntas[id_questao_atual].opcoes[i4].id_},${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].id_avaliacao_item});" class="form-check-input" name="opc_${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].perguntas[id_questao_atual].id_avaliacao_perguntas}" id="check_default_${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].perguntas[id_questao_atual].opcoes[i4].id_}" value="${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].perguntas[id_questao_atual].opcoes[i4].id_}">
								<label class="form-check-label" for="check_default_${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].perguntas[id_questao_atual].opcoes[i4].id_}">
									${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].perguntas[id_questao_atual].opcoes[i4].desc_alternativa}
								</label>
							</div>
							`);
							
						}
					   						
						let id_resposta_aluno = localizar_reposta_pergunta_aluno(dados[0].id_cliente, dados[0].id_estudante, avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].perguntas[id_questao_atual].id_avaliacao_perguntas);
						$("#check_default_"+id_resposta_aluno).attr("checked", true);
						//console.log("respoat: "+id_resposta_aluno);
					
					}	
				}
				
							
				
			}
			
		}
		   
	}
	
	$(".cont_pergunta table").css("width", "100%");
}

function qtd_respotas_aluno_caderno_prova(id_cliente, id_estudante, id_avaliacao_item){
	let dados = localStorage.getItem("resposta_aluno");
	
	if (dados == null) {
		localStorage.setItem("resposta_aluno", "[]");
		dados = localStorage.getItem("resposta_aluno");
	} 
	
  	dados = JSON.parse(dados);
	let qtd_respondidas = 0;
	for (var i = 0; i < dados.length; i++) {
		if (dados[i].id_estudante == id_estudante && dados[i].id_avaliacao_item == id_avaliacao_item && dados[i].id_cliente == id_cliente) {
			qtd_respondidas++;
		}
	}
	return qtd_respondidas;
}

function localizar_reposta_pergunta_aluno(id_cliente, id_estudante, id_pergunta){
	let dados = localStorage.getItem("resposta_aluno");
	
	if (dados == null) {
		localStorage.setItem("resposta_aluno", "[]");
		dados = localStorage.getItem("resposta_aluno");
	} 
	
  	dados = JSON.parse(dados);

	for (var i = 0; i < dados.length; i++) {
		if (dados[i].id_estudante == id_estudante && dados[i].id_pergunta == id_pergunta && dados[i].id_cliente == id_cliente) {
			return dados[i].id_resposta;
		}
	}
}

function set_resposta_estudante(id_cliente, id_estudante, id_pergunta, id_resposta, id_avaliacao_item){
	let dados_estudante 	= localStorage.getItem("dados_estudante_prova");
	
	if(dados_estudante == null){		
		return;
	}
	
	dados_estudante = JSON.parse(dados_estudante);    
	
	let respot = apagar_resposta_aluno_existente(id_cliente, id_estudante, id_pergunta);
	
	console.log(respot);
	
	let resposta_aluno = localStorage.getItem("resposta_aluno");

	if (resposta_aluno == null) {
		localStorage.setItem("resposta_aluno", "[]");
		resposta_aluno = localStorage.getItem("resposta_aluno");
	} 
	
	
	
	let dados 					= JSON.parse(resposta_aluno);
	let a 						= new Object();
	let data_hora_fim			= new Date();
	
	a.id_cliente				= id_cliente;
	a.id_estudante 				= id_estudante;
	a.id_pergunta 				= id_pergunta;
	a.id_resposta 				= id_resposta;
	a.id_avaliacao_item 		= id_avaliacao_item;
	a.data_hora_inicio_prova 	= dados_estudante[0].horario_prova;
	a.data_hora_resposta_questao= data_hora_fim+"";
	
	dados.push(a);
	let b 				= JSON.stringify(dados, null, 0);
	localStorage.setItem("resposta_aluno", b);
	cadernos_prova_mostrar2();	
}

function localiza_resposta_aluno_existente(id_cliente, id_estudante, id_pergunta) {
  	let dados = localStorage.getItem("resposta_aluno");
	
	if (dados == null) {
		localStorage.setItem("resposta_aluno", "[]");
		dados = localStorage.getItem("resposta_aluno");
	} 
	
  	dados = JSON.parse(dados);

	for (var i = 0; i < dados.length; i++) {
		if (dados[i].id_estudante == id_estudante && dados[i].id_pergunta == id_pergunta && dados[i].id_cliente == id_cliente) {
			return i;
		}
	}
}

function apagar_resposta_aluno_existente(id_cliente, id_estudante, id_pergunta){	

	let r = localiza_resposta_aluno_existente(id_cliente, id_estudante, id_pergunta);
	
  	if (r == undefined) {
    	return "false";
  	} 
	else {
    	let w = apagar_resposta_aluno(r);
    	if (w == true) {
      		return "true";
    	} 
		else {
      		return "false";
    	}
  	}
}

function apagar_resposta_aluno(id) {

  let dados = localStorage.getItem("resposta_aluno");
  dados = JSON.parse(dados);

  delete dados[id];
  var novoDados = [];
  var j = 0;

  for (var i = 0; i < dados.length; i++) {
    if (dados[i] != null) {
      novoDados[j] = dados[i];
      j++;
    }
  }
  novoDados = JSON.stringify(novoDados, null, 0);
  localStorage.setItem("resposta_aluno", novoDados);
  return true;
}

function set_lista_questao_atual(){
	let id_questao = $(".qtd_questoes_select option:selected").val();
	
	if(parseInt(id_questao) !== parseInt("-1")){
	   pergunta_mostrar();
	}
	
	
}

function seta_questao(tipo){
	let id_questao = $(".qtd_questoes_select option:selected").val();
	
	let qtd_min = "";
	let qtd_max = "";
	$(".qtd_questoes_select option").each(function () {
		if(qtd_min == ""){
		   qtd_min = $(this).html();
		}
		qtd_max = $(this).html();
	});
	
	if(tipo == "+"){
		console.log(qtd_max);
		console.log(parseInt(id_questao)+1);
		if(parseInt(id_questao)+1 >= qtd_max){
			console.log("maximo");
			abrir_caderno_aba();
			alert("Verifica Próximo Caderno");
			return;
		}
		
		$(".qtd_questoes_select").val(parseInt(id_questao)+1); 
		
	}
	if(tipo == "-"){
		
		console.log("qtd_min:"+qtd_min);
		console.log(parseInt(id_questao));
		if((parseInt(id_questao)) < qtd_min){
			console.log("minimo");			
			return;
		}
		
		$(".qtd_questoes_select").val(parseInt(id_questao)-1); 
		
	}
	set_lista_questao_atual();
}

function get_caderno_atual(){
	let caderno_atual 	= localStorage.getItem("prova_caderno_atual");
	
	if(caderno_atual == null){	
		
		let dados_estudante = localStorage.getItem("dados_estudante_prova");	
		dados_estudante 	= JSON.parse(dados_estudante);
		dados_estudante[0].id_ano_escolar;
		
		let id_set = "";
		
		for(var i = 0; i < avaliacoes[0].lista_p[0].avaliacao_ano.length; i++){
			
			if(id_set == ""){
				localStorage.setItem("prova_caderno_atual", avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[0].id_avaliacao_item);				
				id_set = "a";
			}
			
		}
		
		
		return get_caderno_atual();
	}
	
	return caderno_atual;
}

function cadernos_prova_mostrar(){
	let dados_estudante 	= localStorage.getItem("dados_estudante_prova");
	
	if(dados_estudante == null){
		alert("Dados de Estudante não Localizado");
		//location.href = "index.html";
		return;
	}
	
	let dados = JSON.parse(dados_estudante);    
	
	let id_caderno_atual = get_caderno_atual();
	let qtd_respondidas  = "";
	
	$(".lista_cadernos_prova .theme-wrapper").html("");
	
	for (var i = 0; i < avaliacoes[0].lista_p[0].avaliacao_ano.length; i++) {
		
		if(parseInt(avaliacoes[0].lista_p[0].avaliacao_ano[i].id_serie_ano_letivo) == parseInt(dados[0].id_ano_escolar)){			
			
			for (var i2 = 0; i2 < avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes.length; i2++) {				
				
				if(parseInt(id_caderno_atual) == parseInt(avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].id_avaliacao_item)){					

					$(".qtd_questoes_select").html("");
					for (var i5 = 0; i5 < avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].qtd_questao; i5++) {
						$(".qtd_questoes_select").append("<option value='"+i5+"'>"+(i5+1)+"</option>");
					}
					
				}
				
				qtd_respondidas = "0";
				
				qtd_respondidas = qtd_respotas_aluno_caderno_prova(dados[0].id_cliente, dados[0].id_estudante, avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].id_avaliacao_item);
				
				$(".lista_cadernos_prova .theme-wrapper").append(`
					<div class="mb-3">
						<h6 class="text-muted mb-2">${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].desc_componente_curricular} <br> ${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].sub_componente_curricular} (<span>${qtd_respondidas}/${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].qtd_questao}</span>)</h6>
						<a onClick="set_caderno_prova(${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].id_avaliacao_item});" class="theme-item caderno_img_${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].id_avaliacao_item}" href="javascript:void(0);"> 
							<img src="img/c${i2+1}.png" alt="light theme"> 
						</a> 
					</div>
				`);
				
			}
			
		}
		   
	}
	$(".caderno_img_"+id_caderno_atual).addClass("active");
	pergunta_mostrar();
}

function cadernos_prova_mostrar2(){
	let dados_estudante 	= localStorage.getItem("dados_estudante_prova");
	
	if(dados_estudante == null){		
		return;
	}
	
	let dados = JSON.parse(dados_estudante);    
	
	let id_caderno_atual = get_caderno_atual();
	let qtd_respondidas  = "";
	
	$(".lista_cadernos_prova .theme-wrapper").html("");
	
	for (var i = 0; i < avaliacoes[0].lista_p[0].avaliacao_ano.length; i++) {
		
		if(parseInt(avaliacoes[0].lista_p[0].avaliacao_ano[i].id_serie_ano_letivo) == parseInt(dados[0].id_ano_escolar)){			
			
			for (var i2 = 0; i2 < avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes.length; i2++) {				
				
				
				
				qtd_respondidas = "0";
				
				qtd_respondidas = qtd_respotas_aluno_caderno_prova(dados[0].id_cliente, dados[0].id_estudante, avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].id_avaliacao_item);
				
				$(".lista_cadernos_prova .theme-wrapper").append(`
					<div class="mb-3">
						<h6 class="text-muted mb-2">${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].desc_componente_curricular} <br> ${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].sub_componente_curricular} (<span>${qtd_respondidas}/${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].qtd_questao}</span>)</h6>
						<a onClick="set_caderno_prova(${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].id_avaliacao_item});" class="theme-item caderno_img_${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].id_avaliacao_item}" href="javascript:void(0);"> 
							<img src="img/c${i2+1}.png" alt="light theme"> 
						</a> 
					</div>
				`);
				
			}
			
		}
		   
	}
	$(".caderno_img_"+id_caderno_atual).addClass("active");
	
}

function set_caderno_prova(id_caderno){
	
	localStorage.setItem("prova_caderno_atual", id_caderno);
	cadernos_prova_mostrar();
}

function abrir_relogio_aba(){
	if($(".cont_aba_relogio").hasClass("cont_aba_gabarito_ativo")){
		$(".cont_aba_relogio").removeClass("cont_aba_gabarito_ativo");	
		$(".cont_aba_relogio2").hide();
		$(".cont_backgroud").hide();
	}
	else{
		$(".cont_aba_relogio").addClass("cont_aba_gabarito_ativo");	
		$(".cont_aba_relogio2").show();	
		$(".cont_backgroud").show();
	}
}

function abrir_gabarito_aba(){
	if($(".cont_aba_gabarito").hasClass("cont_aba_gabarito_ativo")){
		$(".cont_aba_gabarito").removeClass("cont_aba_gabarito_ativo");	
		$(".cont_aba_gabarito2").hide();
		$(".cont_backgroud").hide();
	}
	else{
		$(".cont_aba_gabarito").addClass("cont_aba_gabarito_ativo");	
		$(".cont_aba_gabarito2").show();	
		$(".cont_backgroud").show();
	}
}

function abrir_modal_senha_acesso(){
	$(".senha_liberacao").val("");
	$(".modal_liberar_acesso").modal("show");
}

function finalizar_resposta_prova(){
	
	let r = confirm("Deseja realmente finalizar a avaliação?");

	if (r == false) {
		return false;
	}
	
	let dados_estudante 	= localStorage.getItem("dados_estudante_prova");
	
	if(dados_estudante == null){		
		return;
	}
	
	dados_estudante = JSON.parse(dados_estudante);
	
	let aluno_respondeu = localStorage.getItem("aluno_respondeu");

	if (aluno_respondeu == null) {
		localStorage.setItem("aluno_respondeu", "[]");
		aluno_respondeu = localStorage.getItem("aluno_respondeu");
	} 
	
	
	
	let dados 			= JSON.parse(aluno_respondeu);
	let a 				= new Object();
	let data_hora_fim	= new Date();
	console.log(data_hora_fim);
	
	a.id_escola			= dados_estudante[0].id_escola;
	a.desc_escola		= dados_estudante[0].desc_escola;
	a.id_estudante 		= dados_estudante[0].id_estudante;
	a.desc_estudante 	= dados_estudante[0].desc_estudante;
	a.id_turma 			= dados_estudante[0].id_turma;
	a.desc_turma 		= dados_estudante[0].desc_turma;
	a.data_inicio 		= dados_estudante[0].horario_prova;
	a.data_hora_fim		= data_hora_fim+"";
	
	dados.push(a);
	let b 				= JSON.stringify(dados, null, 0);
	localStorage.setItem("aluno_respondeu", b);	
	ligar_cont_finalizaou_prova();
	localStorage.removeItem("dados_estudante_prova");
	localStorage.removeItem("prova_caderno_atual");
	
}

function ligar_cont_finalizaou_prova(){
	let dados_estudante 	= localStorage.getItem("dados_estudante_prova");
	
	if(dados_estudante == null){		
		return;
	}
	
	dados_estudante = JSON.parse(dados_estudante);
	
	$(".page-content > .row > .col-12 > .row").html(`
	<div class="col-md-12 grid-margin stretch-card">
		<div class="card">
			<div class="card-body">
				<div class="cont_finalizou">
					<h4 style=" font-weight: 100; ">PARABÉNS <strong>${dados_estudante[0].desc_estudante}</strong>, AVALIAÇÃO FINALIZADA.</h4>
					<img class="mt-3" src="img/finalizou.gif" style="width: 100%;">
				</div>				
			</div>
		</div>
	</div>
	`);
	
	$(".cont_aba_relogio").hide();
	$(".cont_aba_relogio2").hide();
	
	$(".cont_aba_gabarito").hide();
	$(".cont_aba_gabarito2").hide();
	
	$(".cont_aba_caderno").hide();
	$(".cont_aba_caderno2").hide();
	
	$(".settings-sidebar").hide();
	$(".cont_backgroud").hide();
	
}

function validar_senha_liberar_acesso(){
	let senha_liberacao = $(".senha_liberacao").val();
	
	if(senha_liberacao == "2017"){
		localStorage.removeItem("prova_ativa");
	   	location.href = "index.html";
	}
}

function abrir_caderno_aba(){
	if($(".cont_aba_caderno").hasClass("cont_aba_caderno_ativo")){
		$(".cont_aba_caderno").removeClass("cont_aba_caderno_ativo");	
		$(".cont_aba_caderno2").hide();
		$(".cont_backgroud").hide();
	}
	else{
		$(".cont_aba_caderno").addClass("cont_aba_caderno_ativo");	
		$(".cont_aba_caderno2").show();	
		$(".cont_backgroud").show();
	}
}

function recadastrarRegistro(tabela, dados) {

    let request3 = request2.transaction([tabela], 'readwrite').objectStore(tabela).delete(1);

    request2.transaction([tabela], 'readwrite').oncomplete = (event) => {
        let transaction = request2.transaction([tabela], 'readwrite');

        request3 = transaction.objectStore(tabela).add(Object.assign({
            id: 1
        }, dados));

        transaction.oncomplete = (event) => {
            console.log('Cadastrado!');
        }
    }
}

request.onsuccess = () => {
    request2 = request.result

    request.result.transaction('avaliacao').objectStore('avaliacao').openCursor().onsuccess = (event) => {
        avaliacoes = event.target.result.value
		console.log(avaliacoes);
		cadernos_prova_mostrar();
				
    }
}

function set_nome_estudante(){
	let dados_estudante 	= localStorage.getItem("dados_estudante_prova");	
	dados_estudante 		= JSON.parse(dados_estudante);
	
	$(".nome_estudante p").html(dados_estudante[0].desc_estudante);
}


$("body > .main-wrapper > .sidebar").remove();
$("body > .main-wrapper > .page-wrapper").css("margin-left", "0");
$("body > .main-wrapper > .page-wrapper").css("width", "100%");

$("body > .main-wrapper > .page-wrapper > .navbar").css("left", "0");
$("body > .main-wrapper > .page-wrapper > .navbar").css("width", "100%");

$(".page-wrapper > .navbar > a").removeClass("sidebar-toggler");
$(".page-wrapper > .navbar > a").attr("href", "javascript:abrir_modal_senha_acesso();");
$(".page-wrapper > .navbar > a").addClass("btn_lock_2");
$(".page-wrapper > .navbar > a").html(`
	<i class="link-icon" data-feather="lock"></i>
`);

$("body").append(`
	<div class="cont_aba_relogio" onClick="abrir_relogio_aba();">
		<i class="link-icon vertical_alinha" data-feather="clock"></i> 
	</div>
	<div class="cont_aba_relogio2" style=" display: none; ">
		<hr>
	</div>
`);

$("body").append(`
	<div class="cont_aba_caderno" onClick="abrir_caderno_aba();">
		<i class="link-icon vertical_alinha" data-feather="grid"></i> 
	</div>
	<div class="cont_aba_caderno2 lista_cadernos_prova p-3" style=" display: none; ">
		<h6 class="text-muted mb-2">Cadernos de Avaliação</h6>
		<hr>
		<div class="theme-wrapper"></div>
	</div>
`);

$("body").append(`
	<div class="cont_aba_gabarito" onClick="abrir_gabarito_aba();">
		<i class="link-icon vertical_alinha" data-feather="check-square"></i> 
	</div>
	<div class="cont_aba_gabarito2" style="display: none;">		
		<div class="p-4" style="text-align: center;">
			<button onClick="finalizar_resposta_prova();" class="btn btn-success text-white fw-bolder btn-icon-text">Finalizar Avaliação</button>
		</div>
	</div>
`);

$("body").append(`
	<div class="cont_backgroud" style=" display: none; ">
		 
	</div>
`);

set_nome_estudante();