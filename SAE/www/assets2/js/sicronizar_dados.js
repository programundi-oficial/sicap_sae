var request = window.indexedDB.open('offline', 1);
var request2 = '';
var avaliacoes = {}
var controller_sicronizacao = "sicronizarController.php";

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

function sicronizar_dados_prova(){
	let is_internet 	= is_connection();
	let dados_prova 	= localStorage.getItem("resposta_aluno");	
	
	if(is_internet !== "true"){
		alert("Dispositivo sem Acesso a Internet.");
	}
	
	if(dados_prova == null){
	   alert("Não existe dados a serem Sincronizados.");
	}
	
	if(is_internet == "true"){
	   
		$.ajax({
			url: url_server+controller_sicronizacao,
			data: {	
				s: "1",
				lista_respostas: dados_prova
			},
			dataType: "json",
			type: "POST",
			success: function (json) {
				
				
				
				for (var i = 0; i < json.length; i++) {

					if (json[i].result == "true") {
						
						localStorage.removeItem("resposta_aluno");
						localStorage.removeItem("aluno_respondeu");	
						alert(json[i].lista_p);
						chamar_toast(json[i].lista_p, "success");
						lista_alunos_respondeu();

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

function lista_alunos_respondeu(){
	let aluno_respondeu 	= localStorage.getItem("aluno_respondeu");
	
	if(aluno_respondeu == null){
		localStorage.setItem("aluno_respondeu", "[]");
		aluno_respondeu 	= localStorage.getItem("aluno_respondeu");		
	}
	
	let dados = JSON.parse(aluno_respondeu);    
	
	console.log(dados);
	
	$(".lista_alunos_respondeu").html("");
	
	for (var i = 0; i < dados.length; i++) {
		$(".lista_alunos_respondeu").append(`
		<tr>
			<td>				
				${dados[i].desc_escola}				
			</td>			
			<td>${dados[i].desc_estudante}</td>
		</tr>
		<tr>
			<td colspan="2"><small>${dados[i].desc_turma}</small></td>
		</tr>
		`);	
	}
}

lista_alunos_respondeu();