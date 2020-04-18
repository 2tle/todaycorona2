<?php
$con = new mysqli('localhost','ieelte','@@Ieelte1214','cov_db');
$row = 1;
if (($handle = fopen("scj.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $num = count($data);
        echo "<p> $num fields in line $row: <br /></p>\n";
        $row++;
        $query = "INSERT INTO scj_tb (idx,type,address,isClear) VALUES ('".$data[0]."','".$data[1]."','".$data[2]."','".$data[3]."')";
        mysqli_query($con,$query);
        
    }
    fclose($handle);
}
?>
