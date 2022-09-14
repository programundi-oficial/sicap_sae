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
	
	
	for (var i = 0; i < avaliacoes[0].lista_p[0].avaliacao_ano.length; i++) {
		
		if(parseInt(avaliacoes[0].lista_p[0].avaliacao_ano[i].id_serie_ano_letivo) == parseInt(dados[0].id_ano_escolar)){
			
			
			
			for (var i2 = 0; i2 < avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes.length; i2++) {
				
				let id_caderno_atual = get_caderno_atual();
				let id_questao_atual = $(".qtd_questoes_select option:selected").val();
				
				console.log("questoa atual: "+id_questao_atual);
				
				if(parseInt(id_caderno_atual) == parseInt(avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].id_avaliacao_item)){
				   	
					console.log("id_caderno_atual: "+id_caderno_atual);
					console.log("id_caderno: "+avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].id_avaliacao_item);
					
					if(avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].perguntas !== null){
					
				   								
					   	$(".cont_pergunta").html(avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].desc_componente_curricular+"<br>"+avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].sub_componente_curricular+"<br>"+avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].perguntas[id_questao_atual].ordem_criacao+"<hr>"+unescape(avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].perguntas[id_questao_atual].desc_pergunta));
						
					   	$(".cont_pergunta img").css("width", "100%");
					   	
					   	$(".lista_alternativas").html("");
					   
					   	for (var i4 = 0; i4 < avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].perguntas[id_questao_atual].opcoes.length; i4++) {
							
							$(".lista_alternativas").append(`
							<div class="form-check mb-2">
								<input type="radio" class="form-check-input" name="opc_" id="check_default_${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].perguntas[id_questao_atual].opcoes[i4].id_}" value="${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].perguntas[id_questao_atual].opcoes[i4].id_}">
								<label class="form-check-label" for="check_default_${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].perguntas[id_questao_atual].opcoes[i4].id_}">
									${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].perguntas[id_questao_atual].opcoes[i4].desc_alternativa}
								</label>
							</div>
							`);
							
						}
					   
					
					
					}	
				}
				
							
				
			}
			
		}
		   
	}
}

function set_lista_questao_atual(){
	let id_questao = $(".qtd_questoes_select option:selected").val();
	
	if(parseInt(id_questao) !== parseInt("-1")){
	   pergunta_mostrar();
	}
	
	
}

function seta_questao(tipo){
	let id_questao = $(".qtd_questoes_select option:selected").val();
	
	if(tipo == "+"){
		$(".qtd_questoes_select").val(parseInt(id_questao)+1);   
	}
	if(tipo == "-"){
		$(".qtd_questoes_select").val(parseInt(id_questao)-1);   
	}
	set_lista_questao_atual();
}

function get_caderno_atual(){
	let caderno_atual 	= localStorage.getItem("prova_caderno_atual");
	
	if(caderno_atual == null){	
		localStorage.setItem("prova_caderno_atual", 6);
		return get_caderno_atual();
	}
	
	return caderno_atual;
}

function cadernos_prova_mostrar(){
	let dados_estudante 	= localStorage.getItem("dados_estudante_prova");
	
	if(dados_estudante == null){		
		return;
	}
	
	let dados = JSON.parse(dados_estudante);    
	
	let id_caderno_atual = get_caderno_atual();
	
	$(".lista_cadernos_prova .theme-wrapper").html("");
	
	for (var i = 0; i < avaliacoes[0].lista_p[0].avaliacao_ano.length; i++) {
		
		if(parseInt(avaliacoes[0].lista_p[0].avaliacao_ano[i].id_serie_ano_letivo) == parseInt(dados[0].id_ano_escolar)){
			
			//console.log(avaliacoes[0].lista_p[0].avaliacao_ano[i].serie_);   
			//console.log(avaliacoes[0].lista_p[0].avaliacao_ano[i].tempo_de_prova); 
			
			for (var i2 = 0; i2 < avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes.length; i2++) {
				
				
				
				if(parseInt(id_caderno_atual) == parseInt(avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].id_avaliacao_item)){
					//console.log(avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].desc_componente_curricular);  
					console.log(avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].qtd_questao);  

					$(".qtd_questoes_select").html("");
					for (var i5 = 0; i5 < avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].qtd_questao; i5++) {
						$(".qtd_questoes_select").append("<option value='"+i5+"'>"+(i5+1)+"</option>");
					}

					
				}
				$(".lista_cadernos_prova .theme-wrapper").append(`
					<div class="mb-3">
						<h6 class="text-muted mb-2">${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].desc_componente_curricular} <br> ${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].sub_componente_curricular} (<span>0/${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].qtd_questao}</span>)</h6>
						<a onClick="set_caderno_prova(${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].id_avaliacao_item});" class="theme-item caderno_img_${avaliacoes[0].lista_p[0].avaliacao_ano[i].avaliacao_componetes[i2].id_avaliacao_item}" href="javascript:void(0);"> 
							<img src="assets/images/screenshots/light.jpg" alt="light theme"> 
						</a> 
					</div>
				`);
				
			}
			
		}
		   
	}
	$(".caderno_img_"+id_caderno_atual).addClass("active");
	pergunta_mostrar();
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
	aaa
	</div>
`);

$("body").append(`
	<div class="cont_aba_gabarito" onClick="abrir_gabarito_aba();">
		<i class="link-icon vertical_alinha" data-feather="check-square"></i> 
	</div>
	<div class="cont_aba_gabarito2" style=" display: none; ">
	aaa
	</div>
`);

$("body").append(`
	<div class="cont_backgroud" style=" display: none; ">
		 
	</div>
`);