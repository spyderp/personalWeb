<?php
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
	session_start();
	if(isset($_SESSION['hash']) && $_SESSION['hash']==$_POST['tokken']){
		if(!ifCaptcha()){
			$result='error';
			$message='El dato enviado en el captcha es invalido intente nuevamente';
		}else{
			if(!correo($_POST['nombres'], $_POST['correo'],$_POST['tema'],$_POST['descripcion'])){
				$result='error';
				$message='No se pudo enviar el correo intente nuevamente';
			}else{
				$result='ok';
				$message='Mensaje enviardo';
			}
		}
	}else{
		$result='error';
		$message='El formulario enviardo no es correcto intente nuevamente';
	}
	echo json_encode(array('resultado'=>$result, 'msg'=>$message));
}

function correo($nombre, $correo, $tema, $descripcion){
	require 'class.phpmailer.php';
	$mail = new PHPMailer;
	$mail->IsSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'smtp.secureserver.net';  // Specify main and backup server
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = 'contacto@ricardo-portillo.com';                            // SMTP username
	$mail->Password = 'Contacto00?';                           // SMTP password
	//$mail->SMTPSecure = 'tls';                            // Enable encryption, 'ssl' also accepteds
	$mail->From = 'contacto@ricardo-portillo.com';
	$mail->FromName = 'Ricardo-Portillo.com';
	$mail->AddAddress('portillo,ricardog@gmail.com');               
	$mail->AddBCC($correo);
	$mail->IsHTML(true);                                  // Set email format to HTML

	$mail->Subject = 'Envio de Contacto ';
	$mail->Body    = sprintf('
	<p>
	Este es un correo enviado desde la web: ricardo-portillo.com
	</p>
	<p><strong>Nombre:</strong> %s</p>
	<p><strong>Correo:</strong> %s</p>
	<p><strong>Tema:</strong> %s</p>
	<p><strong>Descripción:</strong> %s</p>
	', $nombre, $correo, $tema, $descripcion);
	if(!$mail->Send()) {
	   return false;
	}
	return true;
}

function ifCaptcha(){
  require_once('recaptchalib.php');
  $privatekey = "6LfxP70SAAAAAOE7I12VMdDiORwVsScXkdTILjC1";
  $resp = recaptcha_check_answer ($privatekey,
                                $_SERVER["REMOTE_ADDR"],
                                $_POST["recaptcha_challenge_field"],
                                $_POST["recaptcha_response_field"]);
  return $resp->is_valid;
}