<?php
// Handles the contact form at /contact/. Bluehost shared hosting supports PHP's
// mail() function out of the box, so no external service or API key is needed.
$to = "Ohionativenursery@outlook.com";

function clean_field(string $value): string {
    // Strip line breaks so form input can't be used to inject extra mail headers.
    return trim(str_replace(["\r", "\n"], "", $value));
}

$name = isset($_POST['name']) ? clean_field($_POST['name']) : '';
$email = isset($_POST['email']) ? clean_field($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';
$honeypot = isset($_POST['website']) ? trim($_POST['website']) : '';

if ($honeypot !== '') {
    // Bot filled in the hidden field — silently pretend success.
    header("Location: /contact/thank-you.html");
    exit;
}

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Please go back and fill in your name, a valid email, and a message.";
    exit;
}

$subject = "New message from ohionativenursery.com contact form";
$body = "Name: $name\nEmail: $email\n\nMessage:\n$message\n";
$headers = "From: no-reply@ohionativenursery.com\r\nReply-To: $email";

if (mail($to, $subject, $body, $headers)) {
    header("Location: /contact/thank-you.html");
    exit;
} else {
    http_response_code(500);
    echo "Sorry, something went wrong sending your message. Please email us directly at $to.";
}
