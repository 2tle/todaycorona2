#!/usr/bin/php -q
<?php
require '/var/www/auto/Snoopy.class.php';

// 국내 확진 정보 구하기
$spy = new Snoopy;
$spy->fetch('http://ncov.mohw.go.kr/bdBoardList_Real.do');
preg_match_all('/<td class="w_bold">(.*?)<\/td>/is',$spy->results, $text);
$sended =array();
$text[1][0] = str_replace(' ','',$text[1][0]);
$text[1][1] = str_replace(' ','',$text[1][1]);
$text[1][2] = str_replace(' ','',$text[1][2]);
$sended['internal_gam'] = $text[1][0];
$sended['internal_clear'] = $text[1][1];
$sended['internal_die'] = $text[1][2];
$sended['internal_doing'] = $text[1][3];

// 세계 확진자 및 중국 구하기
preg_match_all('/<p>(.*?)<\/p>/is',$spy->results, $text);

$var1 = explode(' ',$text[0][0]);
$var2 = explode('(',$var1[3]);
$sended['external_gam'] = $var2[0];
$var2 = explode(')',$var1[4]);
$sended['external_die'] = $var2[0].'명';

preg_match_all('/<td>(.*?)<\/td>/is',$spy->results, $text);

$text[1][0] = str_replace(' ','',$text[1][0]);
$text[1][0] = str_replace(')','',$text[1][0]);
$var1 = explode('(사망',$text[1][0]);


$sended['china_gam'] = $var1[0];
$sended['china_die'] = $var1[1].'명';

preg_match_all('/<td class="w_bold">(.*?)<\/td>/is',$spy->results, $text);
$aaaa = count($text[1]);
$var1 = explode('(',$text[1][$aaaa-1]);
$var2 = explode(' ',$text[1][$aaaa-1]);
$sended['external_gam'] = $var1[0];
$var2 = explode(')',$var2[1]);
$sended['external_die'] = $var2[0].'명';  

$sended['internal_gam'] = str_replace('&nbsp;','',$sended['internal_gam']);
$sended['internal_die'] = str_replace('&nbsp;','',$sended['internal_die']);
$sended['internal_clear'] = str_replace('&nbsp;','',$sended['internal_clear']);
$sended['internal_doing'] = str_replace('&nbsp;','',$sended['internal_doing']);
var_dump($sended);
if((!$sended['internal_gam']) or (!$sended['internal_die'])or (!$sended['internal_clear'])or (!$sended['internal_doing'])or(!$sended['china_gam'])or(!$sended['china_die'])or(!$sended['external_gam'])or(!$sended['external_die'])) {
    exit;
}

$con = new mysqli("localhost",'ieelte','@@Ieelte1214','cov_db');
if(mysqli_query($con,'TRUNCATE main_tb')) {
    
} else {
    exit;
}
$query = "INSERT INTO main_tb (internal_gam,internal_die,internal_clear,internal_doing,china_gam,china_die,external_gam,external_die) VALUES ('".$sended['internal_gam']."','".$sended['internal_die']."','".$sended['internal_clear']."','".$sended['internal_doing']."','".$sended['china_gam']."','".$sended['china_die']."','".$sended['external_gam']."','".$sended['external_die']."')";
if(mysqli_query($con,$query)) {
    
} else {
    exit;
}                                                                                                                  




?>
