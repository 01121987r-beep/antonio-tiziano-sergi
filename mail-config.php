<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Metodo non consentito']);
    exit;
}

/*
|--------------------------------------------------------------------------
| Configurazione SMTP (Gmail)
|--------------------------------------------------------------------------
| Compila solo la password app Gmail nel campo $smtpPassword.
| Per Gmail usa una "Password per le app", non la password principale.
*/
$recipientEmail = 'seranti.analogista@gmail.com';
$fromEmail = 'seranti.analogista@gmail.com';
$fromName = 'Sito Antonio Tiziano Sergi';

$smtpHost = 'smtp.gmail.com';
$smtpPort = 587;
$smtpSecure = 'tls'; // tls (587) oppure ssl (465)
$smtpUsername = 'seranti.analogista@gmail.com';
$smtpPassword = ''; // <- INSERISCI QUI LA PASSWORD APP DI GMAIL

/*
|--------------------------------------------------------------------------
| Raccolta e validazione dati
|--------------------------------------------------------------------------
*/
$source = trim((string)($_POST['form_source'] ?? 'contatto'));
$nome = trim((string)($_POST['nome'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$telefono = trim((string)($_POST['telefono'] ?? ''));
$messaggio = trim((string)($_POST['messaggio'] ?? ''));
$termini = isset($_POST['termini']) ? (string)$_POST['termini'] : '';

if ($nome === '' || $email === '' || $messaggio === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Compila tutti i campi obbligatori']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Email non valida']);
    exit;
}

if ($termini === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'È necessario accettare i termini']);
    exit;
}

if ($smtpPassword === '') {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Password SMTP non configurata in mail-config.php'
    ]);
    exit;
}

/*
|--------------------------------------------------------------------------
| Corpo email
|--------------------------------------------------------------------------
*/
$safeNome = mb_substr($nome, 0, 120);
$safeTelefono = mb_substr($telefono, 0, 40);
$safeMessaggio = mb_substr($messaggio, 0, 5000);
$safeSource = $source === 'prenotazione' ? 'Prenotazione colloquio' : 'Contatti sito';

$subject = '[Sito ATS] Nuova richiesta: ' . $safeSource;
$body = implode("\n", [
    'Hai ricevuto una nuova richiesta dal sito.',
    '',
    'Tipologia: ' . $safeSource,
    'Nome: ' . $safeNome,
    'Email: ' . $email,
    'Telefono: ' . ($safeTelefono !== '' ? $safeTelefono : 'Non indicato'),
    'Termini accettati: ' . ($termini !== '' ? 'Sì' : 'N/D'),
    '',
    'Messaggio:',
    $safeMessaggio
]);

/*
|--------------------------------------------------------------------------
| Invio con PHPMailer
|--------------------------------------------------------------------------
*/
$autoloadPaths = [
    __DIR__ . '/vendor/autoload.php',
    __DIR__ . '/phpmailer/vendor/autoload.php'
];

$autoloadFound = false;
foreach ($autoloadPaths as $autoloadPath) {
    if (file_exists($autoloadPath)) {
        require_once $autoloadPath;
        $autoloadFound = true;
        break;
    }
}

if (!$autoloadFound || !class_exists(\PHPMailer\PHPMailer\PHPMailer::class)) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'PHPMailer non trovato. Installa la libreria prima di inviare email.'
    ]);
    exit;
}

try {
    $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUsername;
    $mail->Password = $smtpPassword;
    $mail->SMTPSecure = $smtpSecure;
    $mail->Port = $smtpPort;
    $mail->CharSet = 'UTF-8';

    $mail->setFrom($fromEmail, $fromName);
    $mail->addAddress($recipientEmail);
    $mail->addReplyTo($email, $safeNome);
    $mail->Subject = $subject;
    $mail->Body = $body;
    $mail->isHTML(false);
    $mail->send();

    echo json_encode(['ok' => true, 'message' => 'Richiesta inviata con successo']);
} catch (\Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Invio SMTP fallito. Verifica host/porta/username/password.',
        'debug' => $e->getMessage()
    ]);
}
