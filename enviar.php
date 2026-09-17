<?php
/**
 * Grafos Tech - Recebimento do formulario de demonstracao
 * ---------------------------------------------------------------------------
 * Requisitos: PHP 7.4+ habilitado no dominio (Plesk).
 *
 * ENTREGABILIDADE (ler antes de publicar):
 *   Por padrao usa a funcao mail() do PHP. Quando o site estiver no dominio
 *   final (grafostech.com.br), a notificacao vai para uma caixa do MESMO
 *   dominio (contato@grafostech.com.br) = entrega local confiavel.
 *   Em staging (cliente.inovatorio.com.br) o envio cruza dominios e pode
 *   cair em spam: use apenas para teste.
 *
 *   Para envio externo confiavel em producao, garanta SPF/DKIM do dominio
 *   remetente OU troque mail() por SMTP (PHPMailer). O ponto de troca esta
 *   sinalizado abaixo em [ENVIO].
 * ---------------------------------------------------------------------------
 */

// ============================ CONFIG =======================================
const TO_EMAIL       = 'contato@grafostech.com.br';   // destino das notificacoes
const FROM_EMAIL     = 'no-reply@grafostech.com.br';  // remetente (dominio do site em producao)
const FROM_NAME      = 'Site Grafos Tech';
const SUBJECT_PREFIX = '[Site] Nova solicitacao de demonstracao';
const MIN_SECONDS    = 3;   // tempo minimo (seg) entre carregar e enviar (anti-bot)
// ===========================================================================

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function fail($msg, $code = 400) {
  http_response_code($code);
  echo json_encode(['ok' => false, 'msg' => $msg], JSON_UNESCAPED_UNICODE);
  exit;
}
function done($msg) {
  echo json_encode(['ok' => true, 'msg' => $msg], JSON_UNESCAPED_UNICODE);
  exit;
}

// So aceita POST
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  fail('Metodo nao permitido.', 405);
}

// Honeypot: campo oculto que humano nao preenche -> finge sucesso pro bot
if (!empty($_POST['website'])) {
  done('Recebemos seus dados.');
}

// Time-trap: envio rapido demais = bot -> finge sucesso
$ts = isset($_POST['ts']) ? (int) $_POST['ts'] : 0;
if ($ts > 0 && (time() * 1000 - $ts) < MIN_SECONDS * 1000) {
  done('Recebemos seus dados.');
}

// Coleta + limpeza
function field($k) { return isset($_POST[$k]) ? trim((string) $_POST[$k]) : ''; }
function strip_crlf($s) { return str_replace(["\r", "\n", "%0a", "%0d", "%0A", "%0D"], '', $s); }

$nome    = field('nome');
$empresa = field('empresa');
$email   = field('email');
$tel     = field('tel');
$frota   = field('frota');
$msg     = field('msg');
$consent = field('consent');

// Validacao server-side
if ($nome === '' || $empresa === '' || $email === '') {
  fail('Preencha nome, empresa e e-mail.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  fail('Informe um e-mail valido.');
}
if ($consent === '') {
  fail('E necessario aceitar a Politica de Privacidade para enviar.');
}
if (mb_strlen($nome) > 120 || mb_strlen($empresa) > 160 || mb_strlen($tel) > 40 || mb_strlen($msg) > 4000) {
  fail('Um dos campos excede o tamanho permitido.');
}

// Monta o corpo
$body  = "Nova solicitacao de demonstracao pelo site Grafos Tech.\n\n";
$body .= "Nome:      {$nome}\n";
$body .= "Empresa:   {$empresa}\n";
$body .= "E-mail:    {$email}\n";
$body .= "Telefone:  {$tel}\n";
$body .= "Frota:     {$frota}\n";
$body .= "Operacao:\n{$msg}\n\n";
$body .= "--\n";
$body .= "IP:   " . ($_SERVER['REMOTE_ADDR'] ?? '-') . "\n";
$body .= "Data: " . date('d/m/Y H:i:s') . "\n";

$subject = SUBJECT_PREFIX . ' - ' . strip_crlf($empresa);

// [ENVIO] --- troque este bloco por PHPMailer/SMTP em producao se preciso ---
$headers  = 'From: ' . FROM_NAME . ' <' . FROM_EMAIL . '>' . "\r\n";
$headers .= 'Reply-To: ' . strip_crlf($nome) . ' <' . strip_crlf($email) . '>' . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= 'X-Mailer: PHP/' . phpversion();

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$sent = @mail(TO_EMAIL, $encodedSubject, $body, $headers);
// [/ENVIO] ------------------------------------------------------------------

if (!$sent) {
  fail('Nao foi possivel enviar agora. Fale com a gente pelo WhatsApp ou e-mail.', 500);
}

done('Recebemos seus dados. Nossa equipe entra em contato para agendar a demonstracao.');
