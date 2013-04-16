function changeTitle(titulo){
	$('.titulo').html(titulo);
}
function nuevaPagina(){
	changeTitle($(this).data('title'));
	var url=$(this).attr('href');
	$('.content').load(url);
	return false;
}
function contenidoJson(){
	changeTitle($(this).data('title'));
	var tipo = $(this).data('opcion');
	if(tipo==1){
		disenoWeb($(this).attr('href'));
	}else{
		programacion($(this).attr('href'));
	}
	return false;
}
function disenoWeb(url){
	$('.content').empty();
}
function programacion(url){
	$('.content').empty();
}
function showRecaptcha(element) {
           Recaptcha.create("6LfxP70SAAAAAKVCKawU_Cn-hLd86bAV7bMEip5p", element, {
             theme: "white",
             lang: "es",
             callback: Recaptcha.focus_response_field});
}
function processJson(data) { 
    // 'data' is the json object returned from the server 
    alert(data.msg);
    if(data.resultado=='error'){
    	reload();
    } 
}
function reload(){
	Recaptcha.reload();
	$.getJSON('lib/tokken.php', function(data){
			$('#tokken').val(data.tokken);
	});
}
$('.menu').on('click', nuevaPagina);
$('.contentJson').on('click', contenidoJson);
$('article').on('focus', '.nombreCompleto', function(){
	var contenido=$('#captchaArea').html();
	if(contenido==''){
		showRecaptcha('captchaArea');
		$.getJSON('lib/tokken.php', function(data){
			$('#tokken').val(data.tokken);
		});
		$('.formContacto').ajaxForm({
			dataType:  'json', 
			success:   processJson 
		});
	}
});


