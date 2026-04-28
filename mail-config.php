<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'ok' => false,
        'error' => 'Metodo non consentito'
    ]);
    exit;
}

/*
|--------------------------------------------------------------------------
| Configurazione email
|--------------------------------------------------------------------------
| Inserisci qui i dati reali del cliente.
| Nota: mail() richiede un server con invio email configurato.
*/
$recipientEmail = 'info@antoniotizianosergi.it'; // Destinatario richieste
$fromEmail = 'no-reply@antoniotizianosergi.it';  // Mittente tecnico dominio
$fromName = 'Sito Antonio Tiziano Sergi';

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
    echo json_encode([
        'ok' => false,
        'error' => 'Compila tutti i campi obbligatori'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        'ok' => false,
        'error' => 'Email non valida'
    ]);
    exit;
}

if ($source === 'prenotazione' && $termini === '') {
    http_response_code(422);
    echo json_encode([
        'ok' => false,
        'error' => 'È necessario accettare i termini'
    ]);
    exit;
}

/*
|--------------------------------------------------------------------------
| Costruzione email
|--------------------------------------------------------------------------
*/
$safeNome = mb_substr($nome, 0, 120);
$safeTelefono = mb_substr($telefono, 0, 40);
$safeMessaggio = mb_substr($messaggio, 0, 5000);
$safeSource = $source === 'prenotazione' ? 'Prenotazione colloquio' : 'Contatti sito';

$subject = '[Sito ATS] Nuova richiesta: ' . $safeSource;
$bodyLines = [
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
];
$body = implode("\n", $bodyLines);

$headers = [
    'From: ' . $fromName . ' <' . $fromEmail . '>',
    'Reply-To: ' . $safeNome . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8'
];

$sent = mail($recipientEmail, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Invio email fallito. Verifica configurazione server.'
    ]);
    exit;
}

echo json_encode([
    'ok' => true,
    'message' => 'Richiesta inviata con successo'
]);

