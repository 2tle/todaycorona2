#!/usr/bin/php -q
<?php
require '/var/www/auto/Snoopy.class.php';
$country= '';
$gam='';
$cntName = array();
$cntData = array();


// 국내 확진 정보 구하기
$spy = new Snoopy;
$spy->fetch('http://ncov.mohw.go.kr/bdBoardList_Real.do');
preg_match_all('/<td class="w_bold">(.*?)<\/td>/is',$spy->results, $text);
$tmp = $text[1];
if(!$tmp) {exit;}
$temp = array_pop($tmp);
$cnt  = count($tmp);
$iii = 4;
for($iii = 4; $iii < $cnt; $iii++) {
    $cntName[$iii-4] = $tmp[$iii];
}
$cnt = count($cntName);
for($i = 0;$i < $cnt ; $i++) {
    if($i == 0) {
        $country = $cntName[0];
    } else {
        $country = $country.'@'.$cntName[$i];
    }
}
preg_match_all('/<td>(.*?)<\/td>/is',$spy->results, $text1);
$tmp = $text1[1];
for($iii = 0; $iii < $cnt; $iii++) {
    $cntData[$iii] = $tmp[$iii];
}
for($i = 0;$i < $cnt ; $i++) {
    if($i == 0) {
        $gam = $cntData[0];
    } else {
        $gam = $gam.'@'.$cntData[$i];
    }
}
echo $country;
echo '<br>';
echo $gam;
$con = new mysqli('localhost','ieelte','@@Ieelte1214','cov_db');
$query = "TRUNCATE world_tb";
if(!mysqli_query($con,$query)) {
    exit;
}
$query = "INSERT INTO world_tb (str,gam) VALUES ('".$country."','".$gam."')";
if(!mysqli_query($con,$query)) {
    exit;
}
echo 1;


?>
