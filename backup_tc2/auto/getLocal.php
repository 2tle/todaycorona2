#!/usr/bin/php -q
<?php
require './Snoopy.class.php';
$sended = array();
$snoopy = new Snoopy;
$snoopy->fetch('http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=');
preg_match_all('/<tr>(.*?)<\/tr>/is',$snoopy->results, $res);
$removed = array_shift($res[1]);
$removed = array_shift($res[1]);
$cnt = count($res[1]);
$arr = $res[1];
$var = array();
$tmparr = array();
for($i = 0;$i < $cnt ; $i++) {
    $arr[$i] = str_replace('-','0',$arr[$i]);
    
    $arr[$i] = str_replace('</th>','',$arr[$i]);
    $arr[$i] = str_replace('</td>','',$arr[$i]);
    $arr[$i] = str_replace('<th scope="row">','',$arr[$i]);
    $arr[$i] = str_replace('<td class="number">','',$arr[$i]);
    $arr[$i] = str_replace('<td header="status_con s_type1" class="number">','',$arr[$i]);
    $arr[$i] = str_replace('<td header="status_con s_type2" class="number">','',$arr[$i]);
    $arr[$i] = str_replace('<td header="status_con s_type3" class="number">','',$arr[$i]);
    
    $arr[$i] = str_replace('서울','',$arr[$i]);
    $arr[$i] = str_replace('부산','',$arr[$i]);
    $arr[$i] = str_replace('대구','',$arr[$i]);
    $arr[$i] = str_replace('인천','',$arr[$i]);
    $arr[$i] = str_replace('광주','',$arr[$i]);
    $arr[$i] = str_replace('대전','',$arr[$i]);
    $arr[$i] = str_replace('울산','',$arr[$i]);
    $arr[$i] = str_replace('세종','',$arr[$i]);
    $arr[$i] = str_replace('경기','',$arr[$i]);
    $arr[$i] = str_replace('강원','',$arr[$i]);
    $arr[$i] = str_replace('충북','',$arr[$i]);
    $arr[$i] = str_replace('충남','',$arr[$i]);
    $arr[$i] = str_replace('전북','',$arr[$i]);
    $arr[$i] = str_replace('전남','',$arr[$i]);
    $arr[$i] = str_replace('경북','',$arr[$i]);
    $arr[$i] = str_replace('경남','',$arr[$i]);
    $arr[$i] = str_replace('제주','',$arr[$i]);
    
    $tmparr[$i] = explode(' ',$arr[$i]);
    
    $var[$i] = $tmparr[$i][3].'명('.$tmparr[$i][5].'명)';
}
$con = new mysqli('localhost','ieelte','@@Ieelte1214','cov_db');
$query = "UPDATE loca_tb SET seoul = '".$var[0]."',busan = '".$var[1]."',daegu = '".$var[2]."',incheon = '".$var[3]."',gwangju = '".$var[4]."',daejeon = '".$var[5]."',ulsan = '".$var[6]."',sejong = '".$var[7]."',gyeonggi = '".$var[8]."',kyeongwon = '".$var[9]."',chungbuk = '".$var[10]."',chungnam = '".$var[11]."',jeonbuk = '".$var[12]."',jeonnam = '".$var[13]."',kyeongbuk = '".$var[14]."',kyeongnam = '".$var[15]."',jeju = '".$var[16]."'";

if(!mysqli_query($con,$query)) {
    exit;
} 


?>
