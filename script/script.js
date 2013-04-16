function disenoWeb(url){
	$('.content').empty();
}
function changeTitle(titulo){
	$('.titulo').html(titulo);
}
function clearForm(ele) {
    $(ele).find(':input').each(function() {
        switch(this.type) {
            case 'text':
            case 'textarea':
            case 'email':	
                $(this).val('');
                break;
        }
    });

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
function inicio(){
	changeTitle('Curriculum Vitae');
	$('.content').load('cv.html');
}
function nuevaPagina(){
	changeTitle($(this).data('title'));
	var url=$(this).attr('href');
	$('.content').load(url);
	return false;
}
function processJson(data) { 
    // 'data' is the json object returned from the server 
    $('.overlay').hide();
    d=document.createElement('div');
    $(d).addClass('msg');
    if(data.resultado=='error'){
    	$(d).addClass('error').html(data.msg);
    	 $('.content').prepend(d);
    	reload();
    }else{
    	$(d).addClass('sucess').html(data.msg);
    	reload();
    	clearForm('.formContacto');
    }
    setTimeout(function(){
    	$('.msg').remove();
    }, 9000);
}
function programacion(url){
	$('.content').empty();
}
function reload(){
	Recaptcha.reload();
	$.getJSON('lib/tokken.php', function(data){
			$('#tokken').val(data.tokken);
	});
}
function showRecaptcha(element) {
           Recaptcha.create("6LfxP70SAAAAAKVCKawU_Cn-hLd86bAV7bMEip5p", element, {
             theme: "white",
             lang: "es",
             callback: Recaptcha.focus_response_field});
}
function showRequest(formData, jqForm, options) { 
	$('.overlay').show();
}

$('.menu').on('click', nuevaPagina);
$('.contentJson').on('click', contenidoJson);
$('.content').on('focus', '.nombreCompleto', function(){
	var contenido=$('#captchaArea').html();
	if(contenido==''){
		showRecaptcha('captchaArea');
		$.getJSON('lib/tokken.php', function(data){
			$('#tokken').val(data.tokken);
		});
		$('.formContacto').ajaxForm({
			dataType:  'json', 
			beforeSubmit:  showRequest,
			success:   processJson
		});
	}
});
$(document).on('ready', inicio);

