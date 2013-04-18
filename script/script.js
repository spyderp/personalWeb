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
	var texto='';
	var box='';
	$('.content').empty();
	$.getJSON(url, function(data){
		$.each(data, function(index, value) {
			var title = document.createElement('h4');
			$(title).html(value.seccion);
			$('.content').append(title);
			$.each(value.data, function(index2, value2){
				var box =document.createElement('div');
				var span =document.createElement('span');
				var table =document.createElement('table');
				$(box).addClass('rpgBox');
				$(box).append($('<div></div>').addClass('rpgImg '+value2.clase).html(span));
				$(box).append($('<div></div>').addClass('rpgName').html('Nombe: '+value2.nombre));
				$(box).append($('<div></div>').addClass('rpgLvl').html('Lv. '+value2.lvl));
				$(box).append($('<div></div>').addClass('rpgHp').html('HP '+value2.HP));
				$(box).append($('<div></div>').addClass('rpgMp').html('MP '+value2.MP));
				$(table).attr({
					cellpandding:0,
					border:0,
					cellspacing:0
				});
				$(table).append($('<tr></tr>').html('<td><span class="icon sword"></span></td><td>'+value2.str+' Str</td><td><span class="icon sombrero"></span></td><td>'+value2.str+' Int</td>'));
				$(table).append($('<tr></tr>').html('<td><span class="icon def"></span></td><td>'+value2.def+' Def</td><td><span class="icon fe"></span></td><td>'+value2.fe+' Faith</td>'));
				$(table).append($('<tr></tr>').html('<td><span class="icon agi"></span></td><td>'+value2.agi+' Agi</td><td><span class="icon suerte"></span></td><td>'+value2.luck+' Luck</td>'));
				$(box).append(table);
				$('.content').append(box);
			});
			
		});
		
	});
		
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

