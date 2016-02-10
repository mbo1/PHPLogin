<?php
$username = "root";
$password = "";
$hostname = "localhost";
$dbhandle = mysql_connect($hostname, $username, $password) or die("Could not connect to the environment.");
$selected = mysql_select_db("tests", $dbhandle) or die("Could not connect to the database.");

if(isset($_POST['user'])  && isset($_POST['pass']) && isset($_POST['email'])) {
	$myusername = $_POST['user'];
	$mypassword = $_POST['pass'];
	$email = $_POST['email'];
	$myusername = stripslashes($myusername);
	$mypassword = stripslashes($mypassword);
	$email = stripslashes($email);
	$email = mysql_escape_string($email);

	//create encripted password
	$encryptedpassword = password_hash(md5($mypassword), PASSWORD_BCRYPT, array('cost' => 11));

	// Generate random 32 character hash and assign it to a local variable.
	// Example output: f4552671f8909587cf485ea990207f3b
	$hash = md5( rand(0,1000));

	$query = "INSERT INTO user (username, password, email, hash) VALUES('$myusername' ,'$encryptedpassword' ,'$email', '$hash')";
	mysql_query($query);

	//Send email
	date_default_timezone_set('Etc/UTC');
	require 'C:/xampp/php/phpmailer/PHPMailerAutoload.php';

	$mail = new PHPMailer;
	$mail->CharSet = "text/html; charset=UTF-8;";
	$mail->IsSMTP();
	$mail->IsHTML(true);
	$mail->SMTPDebug = 2;
	$mail->WordWrap = 80;
	//$mail->Debugoutput = 'html';
	$mail->Host = 'smtp.gmail.com';
	$mail->Port = 587;
	$mail->SMTPSecure = 'tls';
	$mail->SMTPAuth = true;

/*
=== Use those 3 links to enforce (less security applications) into your google account ===
https://www.google.com/settings/u/1/security/lesssecureapps
https://accounts.google.com/b/0/DisplayUnlockCaptcha
https://security.google.com/settings/security/activity?hl=en&pli=1
*/

	$mail->addAddress($email, $myusername);
	$mail->Username = "developmentemailtester@gmail.com";
	$mail->Password = "44f57f4816c980475407e72d5c6684ad";
	$mail->setFrom('noreply@yourwebsite.com', 'Login Application');
	$mail->Subject = 'Signup | Verification'; // Give the email a subject
	$message = '

    <h2>Thanks for signing up!</h2>
    <p></p>
    <p>Your account has been created, you can login with the following credentials after you have activated your account by pressing the url below.</p>
    <p></p>
    <p></p>
    <p></p>
    <p>
        <table style="width:20%">
            <tr>
                <td>Username:</td>
                <td>'.$_POST['user'].'</td>
            </tr>
            <tr>
                <td>Password</td>
                <td>'.$_POST['pass'].'</td>
            </tr>
        </table>
    </p>
    <p><a href="http://localhost:8080/ProgramsGoogleDrive/PHPLogin/verify.php?email='.$email.'&hash='.$hash.'">Please click this link to activate your account</a></p>

	'; // Our message above including the link
	$body = "<html>\n";
    $body .= "<body style=\"font-family:Verdana, Verdana, Geneva, sans-serif; font-size:12px; color:#666666;\">\n";
    $body .= $message;
    $body .= "</body>\n";
    $body .= "</html>\n";
	$mail->Body =$body;
	$mail->IsHTML(true);
	if (!$mail->send()) {
		echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
		echo("User created successfully! Email sent!");
		echo "<meta http-equiv=\"refresh\" content=\"0.5;URL=index.php\">";
	}
}

mysql_close();
?>

<!DOCTYPE html>
<html>
<head>
	<title>New user...</title>
</head>
<body>
	<h1>Signup!</h1>
	<form action="new_user.php" method="POST" accept-charset="utf-8">
		<p>Username:</p><input type="text" name="user" value="" required />
		<p>Email:</p><input type="email" name="email" value="" required />
		<p>Password:</p><input type="password" name="pass" value="" required />
		<p><input type="submit" name="Login" value="Signup!"></p>
	</form>

</body>
</html>