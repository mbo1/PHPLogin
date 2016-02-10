<?php
session_start(); // Starting Session
$error=''; // Variable To Store Error Message

if (isset($_POST['Login'])) {
	if (empty($_POST['user']) || empty($_POST['pass'])) {
		$error = "Username or Password is invalid";
	}
	else {
		// Define $username and $password
		$username=$_POST['user'];
		$password=$_POST['pass'];
		

		// To protect MySQL injection for Security purpose
		$username = stripslashes($username);
		$password = stripslashes($password);
		$username = mysql_real_escape_string($username);
		$password = mysql_real_escape_string($password);

		// Establishing Connection with Server by passing server_name, user_id and password as a parameter
		$mysqli = new mysqli("localhost", "root", "", "tests") or die("Could not connect to the environment.");;
		/* check connection */
		if (mysqli_connect_errno()) {
			printf("Connect failed: %s\n", mysqli_connect_error());
			exit();
		}

		// Retrieving password and account activation
		$query = "SELECT password, isactive FROM user where username='$username'";
		if ($result = $mysqli->query($query)) {
			// Get field values
			while ($finfo = $result->fetch_array()) {
				$hash = $finfo['password'];
				$isactive = $finfo['isactive'];
			}
			// Verifying password
			if (password_verify(md5($password), $hash)) {
				// Verifying if account is active
				if ($isactive) {
					$_SESSION['login_user']=$username; // Initializing Session
					header("location: login_success.php"); // Redirecting To Other Page
					echo("Pass OK");
				}
				else{
					$error = "Account is not active.";
				}
			} else {
				$error = "Username or Password is invalid.";
			}
			$result->close();
		} else {
			$error = "Username or Password is invalid";
		}

		// Showing error if any
		if ($error != "") {echo($error);}

		// Closing Connection
		//mysql_close($connection);
		$mysqli->close();
	}
}
?>