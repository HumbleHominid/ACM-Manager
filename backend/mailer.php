<?php

$fromEmail = 'noreply@acm.cs.mtech.edu';
$fromName = 'Montana Tech ACM Noreply';

function sendEmail($to, $subject, $message){
  $headers = "From: $fromEmail" . "\r\n" .
             "Reply-To: $fromEmail" . "\r\n" .
             'X-Mailer: PHP/' . phpversion();
  mail($to, $subject, $message, $headers, "-F '$fromName'");
}

?>
