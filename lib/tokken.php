<?php
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    session_start();
    $tokken=sha1($_SERVER['REQUEST_TIME'] . "rportillo14");
	$_SESSION['hash']=$tokken;
	echo json_encode(array('tokken'=>$tokken));
}
?>