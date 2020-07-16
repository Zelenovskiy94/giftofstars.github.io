<?php
$host = 'localhost'; // адрес сервера 
$database = 'starmapBASE'; // имя базы данных
$user = 'root'; // имя пользователя
$password = ''; // пароль

$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));


	function get_orders($link){
		$query  = "SELECT * FROM `orders`";
		$result = mysqli_query($link, $query);

		$data = mysqli_fetch_all($result);

		return $data;
	}
	$categories = get_orders($link);

	mysqli_close($link);

?>