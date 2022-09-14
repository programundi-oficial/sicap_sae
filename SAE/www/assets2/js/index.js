var request = window.indexedDB.open('offline', 1);
var request2 = '';
var avaliacoes = {}

function listar_serie(){
	
	let dados_al = localStorage.getItem("dados_al");

	let dados = JSON.parse(dados_al);

	for (var i = 0; i < dados.length; i++) {
	
		if(dados[i].result == "true"){
			
			$(".lista_ano_escolar").html("<option value='-1'>SELECIONE</option>");
			$(".lista_escola").html("<option value='-1'>SELECIONE</option>");
			$(".lista_turma").html("<option value='-1'>SELECIONE</option>");
			$(".lista_estudante").html("<option value='-1'>SELECIONE</option>");
			
						
			for (var i2 = 0; i2 < dados[i].lista_p.length; i2++) {			
				
				$(".lista_ano_escolar").append("<option value='"+dados[i].lista_p[i2].id_serie_anoletivo+"'>"+dados[i].lista_p[i2].serie_anoletivo+"</option>");							
				
			}
			
		}

	}
	
}

function set_ano(id_serie){
	
	if(parseInt(id_serie) !== parseInt("-1")){		
		$(".lista_ano_escolar").removeClass("error_valid");		
	}
	
	let dados_al = localStorage.getItem("dados_al");

	let dados = JSON.parse(dados_al);

	for (var i = 0; i < dados.length; i++) {
	
		if(dados[i].result == "true"){
			
			$(".lista_escola").html("<option value='-1'>SELECIONE</option>");
			$(".lista_turma").html("<option value='-1'>SELECIONE</option>");
			$(".lista_estudante").html("<option value='-1'>SELECIONE</option>");
			for (var i2 = 0; i2 < dados[i].lista_p.length; i2++) {								
				
				if(parseInt(id_serie) == parseInt(dados[i].lista_p[i2].id_serie_anoletivo)){
					
					for (var i3 = 0; i3 < dados[i].lista_p[i2].escolas.length; i3++) {
					
						$(".lista_escola").append("<option id_ano_escolar='"+dados[i].lista_p[i2].id_serie_anoletivo+"' value='"+dados[i].lista_p[i2].escolas[i3].id_escola+"'>"+dados[i].lista_p[i2].escolas[i3].nm_escola+"</option>");						

					}   
				}				
				
			}
			
		}

	}
}

function set_escola(){
	
	let lista_ano_escolar 	= $(".lista_ano_escolar option:selected").val();
	let lista_escola 		= $(".lista_escola option:selected").val();
	
	if(parseInt(lista_escola) !== parseInt("-1")){		
		$(".lista_escola").removeClass("error_valid");		 
	}
	
	let dados_al = localStorage.getItem("dados_al");

	let dados = JSON.parse(dados_al);

	for (var i = 0; i < dados.length; i++) {
	
		if(dados[i].result == "true"){
			
			
			$(".lista_turma").html("<option value='-1'>SELECIONE</option>");
			$(".lista_estudante").html("<option value='-1'>SELECIONE</option>");
			for (var i2 = 0; i2 < dados[i].lista_p.length; i2++) {
								
				if(parseInt(lista_ano_escolar) == parseInt(dados[i].lista_p[i2].id_serie_anoletivo)){
					
					for (var i3 = 0; i3 < dados[i].lista_p[i2].escolas.length; i3++) {
					
						if(parseInt(lista_escola) == parseInt(dados[i].lista_p[i2].escolas[i3].id_escola)){
							
						   for (var i4 = 0; i4 < dados[i].lista_p[i2].escolas[i3].avaliacao_turmas.length; i4++) {

								$(".lista_turma").append("<option value='"+dados[i].lista_p[i2].escolas[i3].avaliacao_turmas[i4].id_turma+"'>"+dados[i].lista_p[i2].escolas[i3].avaliacao_turmas[i4].turma_+"</option>");

							    
							}
							
						}						
						

					}   
				}				
				
			}
			
		}

	}
}

function set_turma(){
	let lista_ano_escolar 	= $(".lista_ano_escolar option:selected").val();
	let lista_escola 		= $(".lista_escola option:selected").val();
	let lista_turma 		= $(".lista_turma option:selected").val();
	
	if(parseInt(lista_turma) !== parseInt("-1")){		
		$(".lista_turma").removeClass("error_valid");		 
	}
	
	let dados_al = localStorage.getItem("dados_al");

	let dados = JSON.parse(dados_al);

	for (var i = 0; i < dados.length; i++) {
	
		if(dados[i].result == "true"){
			
			
			
			$(".lista_estudante").html("<option value='-1'>SELECIONE</option>");
			for (var i2 = 0; i2 < dados[i].lista_p.length; i2++) {								
				
				if(parseInt(lista_ano_escolar) == parseInt(dados[i].lista_p[i2].id_serie_anoletivo)){
					
					for (var i3 = 0; i3 < dados[i].lista_p[i2].escolas.length; i3++) {
					
						if(parseInt(lista_escola) == parseInt(dados[i].lista_p[i2].escolas[i3].id_escola)){
							
						   for (var i4 = 0; i4 < dados[i].lista_p[i2].escolas[i3].avaliacao_turmas.length; i4++) {
						   
							    if(parseInt(lista_turma) == parseInt(dados[i].lista_p[i2].escolas[i3].avaliacao_turmas[i4].id_turma)){
									
									for (var i5 = 0; i5 < dados[i].lista_p[i2].escolas[i3].avaliacao_turmas[i4].estudantes.length; i5++) {

										$(".lista_estudante").append("<option value='"+dados[i].lista_p[i2].escolas[i3].avaliacao_turmas[i4].estudantes[i5].id_aluno+"'> "+dados[i].lista_p[i2].escolas[i3].avaliacao_turmas[i4].estudantes[i5].estudante+"</option>");

									} 
									
								}
							    
							}
							
						}						
						

					}   
				}				
				
			}
			
		}

	}
}

function set_estudante(){
	let id_estudante		= $(".lista_estudante option:selected").val();
	
	if(parseInt(id_estudante) !== parseInt("-1")){		
		$(".lista_estudante").removeClass("error_valid");		 
	}
}

function calc_inicio_prova(){
	let ddd = $(".horario_prova").val();
	
	let data_prova = new Date(ddd);
	let data_atual = new Date();
		
	let difference = data_atual.getTime()-data_prova.getTime();
	
	let minutos_d 		= difference/(1000 * 60);
	let hora_calc		= parseInt(difference/(1000 * 3600)*-1);
	let minutos_calc 	= (parseInt(difference/(1000 * 60))*-1) - (hora_calc*60);
	let segundos_calc	= parseInt((difference/(1000)*-1)) - (minutos_calc * 60);
	
	let tempo_text 		= ("00" + hora_calc).slice(-2)+":"+("00" + minutos_calc).slice(-2)+":"+("00" + segundos_calc).slice(-2);
	
	
	if(minutos_d > 0){
	   //location.href = "prova.html";
		$("body").append(`
			<div class="cont_inicia_prova" style="position: fixed; bottom: 100px; z-index: 9999;width: 100%; text-align: center;">
				<button onClick="abrir_prova();" class="btn btn-success" onclick="">Iniciar Avaliação</button>
			</div>
		`);
		tempo_text = "00:00:00";
	}
	
	if(minutos_d < 0){	
		
	   	setTimeout(function(){
		   	calc_inicio_prova();
	   	},1000);
	}
	
	if($(".tempo_inicio").html() == undefined){
		$("body").append(`
		<div class="tempo_inicio">
			<p> </p>
			<button onClick="btn_modal_liberar_acesso();" style="position: fixed; right: 10px; bottom: 10px;">
				<i class="link-icon" data-feather="lock"></i>
			</button>
		</div>
		`);
	}
	
	$(".tempo_inicio p").html(tempo_text);
	
}

function validar_senha_liberar_acesso(){
	let senha_liberacao = $(".senha_liberacao").val();
	
	if(senha_liberacao == "2017"){
	   	$(".tempo_inicio").hide();
		$(".cont_inicia_prova").hide();
		$(".modal_liberar_acesso").modal("hide");
	}
	
}

function btn_modal_liberar_acesso(){
	$(".modal_liberar_acesso").modal("show");
}

function trocar_estudante(){
	localStorage.removeItem("dados_estudante_prova");
	location.reload();
}

function habilitar_estudante(){
	
	let id_ano_escolar 		= $(".lista_ano_escolar option:selected").val();
	let desc_ano_escolar 	= $(".lista_ano_escolar option:selected").text();
	
	let id_escola 			= $(".lista_escola option:selected").val();
	let desc_escola 		= $(".lista_escola option:selected").text();
	
	let id_turma 			= $(".lista_turma option:selected").val();
	let desc_turma 			= $(".lista_turma option:selected").text();
	
	let id_estudante		= $(".lista_estudante option:selected").val();
	let desc_estudante		= $(".lista_estudante option:selected").text();
	
	let horario_prova		= $(".horario_prova").val();
	
	if(parseInt(id_ano_escolar) == parseInt("-1")){
		chamar_toast("Selecione o Ano", "danger"); 
		$(".lista_ano_escolar").focus();
		$(".lista_ano_escolar").addClass("error_valid");
		return; 
	}
	
	if(parseInt(id_escola) == parseInt("-1")){
		chamar_toast("Selecione o Escola", "danger"); 
		$(".lista_escola").focus();
		$(".lista_escola").addClass("error_valid");
		return; 
	}
	
	if(parseInt(id_turma) == parseInt("-1")){
		chamar_toast("Selecione o Turma", "danger"); 
		$(".lista_turma").focus();
		$(".lista_turma").addClass("error_valid");
		return; 
	}
	
	if(parseInt(id_estudante) == parseInt("-1")){
		chamar_toast("Selecione o Estudante", "danger"); 
		$(".lista_estudante").focus();
		$(".lista_estudante").addClass("error_valid");
		return; 
	}
	
	if(horario_prova == ""){
		chamar_toast("Informe a Data de Início da Avaliação", "danger"); 
		$(".horario_prova").focus();
		$(".horario_prova").addClass("error_valid");
		return; 
	}
	
	localStorage.setItem("dados_estudante_prova", "[]");
	let dados_estudante 	= localStorage.getItem("dados_estudante_prova");
	
	let dados 			= JSON.parse(dados_estudante);
	let a 				= new Object();

	a.id_ano_escolar 	= id_ano_escolar;
	a.desc_ano_escolar 	= desc_ano_escolar;

	a.id_escola 		= id_escola;
	a.desc_escola 		= desc_escola;

	a.id_turma 			= id_turma;
	a.desc_turma 		= desc_turma;

	a.id_estudante 		= id_estudante;
	a.desc_estudante 	= desc_estudante;

	a.horario_prova		= horario_prova;

	dados.push(a);

	let b 		= JSON.stringify(dados, null, 0);
	localStorage.setItem("dados_estudante_prova", b);
	location.reload();
}

function abrir_prova(){
	location.href = "prova.html";
}

function get_estudante_prova_atual(){
	let dados_estudante 	= localStorage.getItem("dados_estudante_prova");
	
	if(dados_estudante == null){
		console.log("NOVO");
		listar_serie();
		return;
	}
	console.log("GRAVADO");
	let dados = JSON.parse(dados_estudante);
	
    
	
    for (var i = 0; i < dados.length; i++) {
		
		$(".lista_ano_escolar").html("<option value='-1'>" + dados[i].desc_ano_escolar + "</option>");
		$(".lista_escola").html("<option value='-1'>" + dados[i].desc_escola + "</option>");
		$(".lista_turma").html("<option value='-1'>" + dados[i].desc_turma + "</option>");
		$(".lista_estudante").html("<option value='-1'>" + dados[i].desc_estudante + "</option>");     
		$(".horario_prova").val(dados[i].horario_prova);
		
		$(".lista_ano_escolar").attr("disabled", true);
		$(".lista_escola").attr("disabled", true);
		$(".lista_turma").attr("disabled", true);
		$(".lista_estudante").attr("disabled", true);
		$(".horario_prova").attr("disabled", true);
		
    }
	
	calc_inicio_prova();
	
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
		console.log(avaliacoes)
    }
}

get_estudante_prova_atual();

verificar_versao_app();