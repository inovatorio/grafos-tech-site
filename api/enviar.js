// Grafos Tech - Recebimento do formulario de demonstracao (Vercel Serverless Function)
// -----------------------------------------------------------------------------------
// Equivalente em Node do antigo enviar.php (mesma logica: honeypot, time-trap,
// validacao server-side, resposta JSON { ok, msg } consumida por assets/js/main.js).
//
// ENVIO DE E-MAIL (leia antes de publicar):
//   Usa SMTP via Nodemailer. Preencha as variaveis de ambiente no projeto Vercel
//   (Project Settings -> Environment Variables):
//     SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE ("true"/"false")
//     MAIL_TO    (destino das notificacoes, ex.: contato@grafostech.com.br)
//     MAIL_FROM  (remetente, precisa ter SPF/DKIM do dominio para nao cair em spam)
//   Sem essas variaveis configuradas, o endpoint responde 500 com uma mensagem
//   clara em vez de falhar silenciosamente.
// -----------------------------------------------------------------------------------

const nodemailer = require('nodemailer');

const MIN_SECONDS = 3; // tempo minimo (seg) entre carregar e enviar (anti-bot)
const SUBJECT_PREFIX = '[Site] Nova solicitacao de demonstracao';

function fail(res, code, msg) {
  res.status(code).json({ ok: false, msg });
}
function done(res, msg) {
  res.status(200).json({ ok: true, msg });
}
function stripCrlf(s) {
  return String(s || '').replace(/[\r\n]|%0a|%0d/gi, '');
}
function field(body, key) {
  const v = body ? body[key] : undefined;
  return typeof v === 'string' ? v.trim() : '';
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return fail(res, 405, 'Metodo nao permitido.');
  }

  const body = req.body || {};

  // Honeypot: campo oculto que humano nao preenche -> finge sucesso pro bot
  if (field(body, 'website') !== '') {
    return done(res, 'Recebemos seus dados.');
  }

  // Time-trap: envio rapido demais = bot -> finge sucesso
  const ts = parseInt(field(body, 'ts'), 10) || 0;
  if (ts > 0 && Date.now() - ts < MIN_SECONDS * 1000) {
    return done(res, 'Recebemos seus dados.');
  }

  const nome = field(body, 'nome');
  const empresa = field(body, 'empresa');
  const email = field(body, 'email');
  const tel = field(body, 'tel');
  const frota = field(body, 'frota');
  const msg = field(body, 'msg');
  const consent = field(body, 'consent');

  // Validacao server-side (mesmas regras do enviar.php)
  if (nome === '' || empresa === '' || email === '') {
    return fail(res, 400, 'Preencha nome, empresa e e-mail.');
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return fail(res, 400, 'Informe um e-mail valido.');
  }
  if (consent === '') {
    return fail(res, 400, 'E necessario aceitar a Politica de Privacidade para enviar.');
  }
  if (nome.length > 120 || empresa.length > 160 || tel.length > 40 || msg.length > 4000) {
    return fail(res, 400, 'Um dos campos excede o tamanho permitido.');
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, MAIL_TO, MAIL_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_TO || !MAIL_FROM) {
    console.error('enviar: variaveis de ambiente SMTP ausentes (SMTP_HOST/SMTP_USER/SMTP_PASS/MAIL_TO/MAIL_FROM).');
    return fail(
      res,
      500,
      'Formulario nao configurado (faltam credenciais de e-mail no servidor). Fale com a gente pelo WhatsApp.'
    );
  }

  const subject = `${SUBJECT_PREFIX} - ${stripCrlf(empresa)}`;
  const text =
    `Nova solicitacao de demonstracao pelo site Grafos Tech.\n\n` +
    `Nome:      ${nome}\n` +
    `Empresa:   ${empresa}\n` +
    `E-mail:    ${email}\n` +
    `Telefone:  ${tel}\n` +
    `Frota:     ${frota}\n` +
    `Operacao:\n${msg}\n\n` +
    `--\n` +
    `IP:   ${req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '-'}\n` +
    `Data: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}\n`;

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: SMTP_SECURE === 'true',
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `Site Grafos Tech <${MAIL_FROM}>`,
      to: MAIL_TO,
      replyTo: `${stripCrlf(nome)} <${stripCrlf(email)}>`,
      subject,
      text,
    });
  } catch (err) {
    console.error('enviar: falha ao enviar e-mail', err);
    return fail(res, 500, 'Nao foi possivel enviar agora. Fale com a gente pelo WhatsApp ou e-mail.');
  }

  return done(res, 'Recebemos seus dados. Nossa equipe entra em contato para agendar a demonstracao.');
};
