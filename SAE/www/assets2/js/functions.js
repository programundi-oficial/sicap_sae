var url_server 			= "https://sicapsolucoes.com/sgedu/sistema-educacional/modulo-avaliacao/app/controller/";
var versao_app 			= "2";
var controller_versao 	= "indexController.php";
var is_mobile_app		= "true";

function chamar_toast(texto_alerta, tipo){
	let data_hora = new Date;
	let cod_toast = (data_hora.getDay()+""+data_hora.getHours()+""+data_hora.getMinutes()+""+data_hora.getSeconds());
		
	$(".cont_toast").append(`
		<div class="cont_${cod_toast} alert alert-${tipo}" role="alert">
			${texto_alerta}
		</div>
	`);
	setTimeout(function (){
		
		$(".cont_"+cod_toast).remove();
		
	},5000);
}

function verificar_versao_app(){
	
	let is_internet = is_connection();
	
	if(is_internet == "true"){
	   
		$.ajax({
			url: url_server+controller_versao,
			data: {	
				s: "1"
			},
			dataType: "json",
			type: "POST",
			success: function (json) {

				for (var i = 0; i < json.length; i++) {

					if (json[i].result == "true") {

						for(var i2 =0; i2 < json[i].lista_p.length; i2++){

							if(parseInt(versao_app) !== parseInt(json[i].lista_p[i2].cod_versao)){

								alert("fazer download de nova versão");
								window.open(json[i].lista_p[i2].url_download, "_blank");
							}	

							if(parseInt(versao_app) == parseInt(json[i].lista_p[i2].cod_versao)){
								chamar_toast("Aplicativo já está na versão mais atual.<br>Versão: "+json[i].lista_p[i2].cod_versao, "success");   
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

function checkConnection() {
	
    let networkState = navigator.connection.type;	
		
	if(networkState !== "none"){		
		$(".icon_wifi_ativo").show();
		$(".icon_wifi_desativo").hide();
	}
	
	if(networkState == "none"){		
		$(".icon_wifi_ativo").hide();
		$(".icon_wifi_desativo").show();
	}	
	
}

function is_connection(){
	
	if(is_mobile_app == "true"){
	   
		let network_state = navigator.connection.type;
		
		if(network_state !== "none"){		
			return "true";
		}

		if(network_state == "none"){		
			return "false";
		}
		
	}
	if(is_mobile_app !== "true"){
		return "true";
	}
}

function sair_app(){
	location.href = "login.html";
}

checkConnection();
setInterval(checkConnection, 5000);

