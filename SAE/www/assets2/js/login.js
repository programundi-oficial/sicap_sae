var controller_login = "loginController.php";



function valid_prova_aberta(){
	let prova_ativa 	= localStorage.getItem("prova_ativa");
	
	if(prova_ativa == null){
		location.href = "index.html";
	}
	
	if(prova_ativa == "true"){
	   location.href = "prova.html";
	}
}

function valid_logado(){
	let dados_al 	= localStorage.getItem("dados_al");
	
	if(dados_al !== null){	
		valid_prova_aberta();		
		return;
	}
	
	if(dados_al == null){	
		window.indexedDB.deleteDatabase('offline');
		return;
	}
}

function login_p1(){
	
	let is_internet = is_connection();
	let login 		= $(".login_p").val();
	let senha		= $(".senha_p").val();
	
	if(is_internet == "true"){
	   
		$.ajax({
			url: url_server+controller_login,
			data: {	
				s: "1",
				login: login,
				senha: senha
			},
			dataType: "json",
			type: "POST",
			success: function (json) {
				
				let ano_letivo_loop = "";
				lista_acesso = json;
				
				for (var i = 0; i < json.length; i++) {

					if (json[i].result == "true") {
						
						$(".cont_login_1").hide();
						$(".cont_login_2").show();
						$(".ano_letivo_p").html("<option value='-1'>SELECIONE</option>");
						for(var i2 =0; i2 < json[i].lista_p.length; i2++){
							
							if(ano_letivo_loop !== json[i].lista_p[i2].ano_letivo){
								
								$(".ano_letivo_p").append("<option value='"+json[i].lista_p[i2].ano_letivo+"'>"+json[i].lista_p[i2].ano_letivo+"</option>");
								
								ano_letivo_loop = json[i].lista_p[i2].ano_letivo;
								
							}
														

						}


					} 
					if (json[i].result == "false") {
						alert(json[i].p1);
					}
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert("ERROR");

			}
		});
		
	}
	
}

function listar_municipio_login(ano_letivo){
	
	console.log(ano_letivo);
	let municipio_loop = "";
	
	for (var i = 0; i < lista_acesso.length; i++) {

		if (lista_acesso[i].result == "true") {
			
			$(".municipio_p").html("<option value='-1'>SELECIONE</option>");
			for(var i2 =0; i2 < lista_acesso[i].lista_p.length; i2++){
				
				if(parseInt(lista_acesso[i].lista_p[i2].ano_letivo) == parseInt(ano_letivo)){
				   
					if(municipio_loop !== lista_acesso[i].lista_p[i2].nome_cliente){

						$(".municipio_p").append("<option img='"+lista_acesso[i].lista_p[i2].img_logo+"' value='"+lista_acesso[i].lista_p[i2].id_cliente+"'>"+lista_acesso[i].lista_p[i2].nome_cliente+"</option>");

						municipio_loop = lista_acesso[i].lista_p[i2].nome_cliente;

					}
					
				}				
				

			}

		} 
		if (lista_acesso[i].result == "false") {
			alert(json[i].p1);
		}
	}
	
}

function get_avaliacao_municipio(id_municipio){
	
	let ano_letivo_p 	= $(".ano_letivo_p").val();	
	let is_internet 	= is_connection();
	
	
	if(is_internet == "true"){
	   
		$.ajax({
			url: url_server+controller_login,
			data: {	
				s: "2",
				ano_letivo: ano_letivo_p,
				id_cliente: id_municipio
			},
			dataType: "json",
			type: "POST",
			success: function (json) {
				
				
				
				for (var i = 0; i < json.length; i++) {

					if (json[i].result == "true") {
						
						
						$(".avaliacao_p").html("<option value='-1'>SELECIONE</option>");
						for(var i2 =0; i2 < json[i].lista_p.length; i2++){
							
							$(".avaliacao_p").append("<option value='"+json[i].lista_p[i2].id+"'>"+json[i].lista_p[i2].descricao+"</option>");						
														

						}


					} 
					if (json[i].result == "false") {
						alert(json[i].p1);
					}
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert("ERROR");

			}
		});
		
	}
}

function baixar_dados_avaliacao2(){
	$(".btn_bd").attr("disabled", true);
	
	let is_internet 	= is_connection();
	let ano_letivo_p 	= $(".ano_letivo_p").val();	
	let id_municipio 	= $(".municipio_p").val();	
	let id_avaliacao 	= $(".avaliacao_p").val();	
	
	if(is_internet == "true"){
	   
		$.ajax({
			url: url_server+controller_login,
			data: {	
				s: "3",
				ano_letivo: ano_letivo_p,
				id_cliente: id_municipio,
				id_avaliacao: id_avaliacao
			},
			dataType: "json",
			type: "POST",
			success: function (json) {
				
				
				
				for (var i = 0; i < json.length; i++) {

					if (json[i].result == "true") {
						dados_json = JSON.stringify(json, null, 0);
						
						cadastrarRegistro('avaliacao', json)
						
						//localStorage.setItem("dados_av", dados_json);
						chamar_toast("DADOS DE AVALIAÇÃO BAIXADOS COM SUCESSO", "success");					
						//get_dados_todos_alunos();

					} 
					if (json[i].result == "false") {
						alert(json[i].p1);
					}
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert("ERROR");

			}
		});
		
	}
	
}

function baixar_dados_avaliacao(){
	$(".btn_bd").attr("disabled", true);
	
	let is_internet 	= is_connection();
	let ano_letivo_p 	= $(".ano_letivo_p option:selected").val();	
	let id_municipio 	= $(".municipio_p option:selected").val();	
	let id_avaliacao 	= $(".avaliacao_p option:selected").val();	
	let img_municipio 	= $(".municipio_p option:selected").attr("img");
	
	if(is_internet == "true"){
	   
		$.ajax({
			url: url_server+controller_login,
			data: {	
				s: "4",
				ano_letivo: ano_letivo_p,
				id_cliente: id_municipio,
				id_avaliacao: id_avaliacao
			},
			dataType: "json",
			type: "POST",
			success: function (json) {
				
				
				
				for (var i = 0; i < json.length; i++) {

					if (json[i].result == "true") {
						dados_json = JSON.stringify(json, null, 0);
						localStorage.setItem("dados_al", dados_json);
						localStorage.setItem("logo_cliente", img_municipio);
						baixar_dados_avaliacao2();
						

					} 
					if (json[i].result == "false") {
						alert(json[i].p1);
					}
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert("ERROR");

			}
		});
		
	}
	
}


function cadastrarRegistro(tabela, dados) {
	
	let request = window.indexedDB.open('offline', 1);

    request.onsuccess = () => {
            console.log('Sucesso')
        }
	
	request.onupgradeneeded = (event) => {
		let db = event.target.result
		let objectStore = db.createObjectStore(tabela, {
			keyPath: 'id',
			autoIncrement: true
		})
		objectStore.add(dados);
		
		setTimeout(function() {
			location.href = "index.html";
		},500);
	}
}

valid_logado();

$(".login_p").val("");
$(".senha_p").val("");