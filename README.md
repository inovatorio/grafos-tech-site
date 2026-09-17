# Grafos Tech - Site institucional

Repositorio dedicado ao site da Grafos Tech (cliente Inovatorio Marketing e Design).

## Status
- Versao: ICP Distribuidoras + Auto Pecas (rodada de 19/08/2026)
- Publicado na Vercel a partir deste repositorio (branch `main`).
- O site em cliente.inovatorio.com.br/grafos-tech/site/ (Plesk/PHP) segue com a versao anterior (Industria/Transportadora), nao foi alterado por este deploy.
- robots.txt e meta noindex de staging: remover antes de considerar o dominio final.

## Estrutura
- Site estatico (HTML/CSS/JS).
- Formulario de contato: `api/enviar.js`, funcao serverless Node (Vercel), substitui o antigo `enviar.php` (mantido no repo so como referencia historica, nao e executado na Vercel).

## Configurar o envio de e-mail do formulario
A funcao `api/enviar.js` usa SMTP via Nodemailer. Sem isso configurado, o formulario responde com erro controlado em vez de falhar silenciosamente. Em Vercel: Project Settings -> Environment Variables:

| Variavel | Exemplo |
|---|---|
| `SMTP_HOST` | smtp.seuservidor.com |
| `SMTP_PORT` | 587 |
| `SMTP_USER` | usuario SMTP |
| `SMTP_PASS` | senha/senha de app SMTP |
| `SMTP_SECURE` | `true` (porta 465) ou `false` (587/STARTTLS) |
| `MAIL_TO` | contato@grafostech.com.br |
| `MAIL_FROM` | no-reply@grafostech.com.br (precisa de SPF/DKIM do dominio para nao cair em spam) |
