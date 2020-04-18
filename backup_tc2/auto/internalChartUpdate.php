#!/usr/bin/php -q
<?php
$con = new mysqli('localhost','ieelte','@@Ieelte1214','cov_db');
$data = array();
$query = "SELECT * FROM main_tb";
$res = mysqli_query($con,$query);
while($row = mysqli_fetch_array($res)) {
    $data['internal_gam'] = $row['internal_gam'];
    $data['internal_die'] = $row['internal_die'];
    $data['internal_clear'] = $row['internal_clear'];
}
$data['date'] = date("Y-m-d", time());

$query = "INSERT INTO internal_chart_tb (internal_gam,internal_die,internal_clear,date) VALUES ('".$data['internal_gam']."','".$data['internal_die']."','".$data['internal_clear']."','".$data['date']."')";
if(mysqli_query($con,$query)) {
    exit;
} else {
    if(mysqli_query($con,$query)) {
        exit;
    } else {
        echo 'err';
    }
}
?>