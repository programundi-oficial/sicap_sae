<?php
	
	$banco_adm = "pgsql:host=31.220.20.142 port=5432 dbname=adm_sae; user=postgres password=2TaiyjcSpaQ0oggZEMb3";

	$pdo_adm = new PDO($banco_adm);
	$pdo_adm->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$banco_staf = "pgsql:host=93.188.167.38 port=5432 dbname=staff; user=postgres password=2TaiyjcSpaQ0oggZEM";

	$pdo_staf = new PDO($banco_staf);
	$pdo_staf->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

?>