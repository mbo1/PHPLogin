<?php
	include('session.php');
?>

<!DOCTYPE html>
<html>
<head>
	<title>Login accepted</title>
</head>
<body>
	<h1>Welcome: <i><?php echo $login_session; ?></i> !</h1>
	<a href="logout.php">Logout</a>
</body>
</html>