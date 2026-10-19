# Site da Grafos Tech

Site institucional da Grafos Tech (cliente da Inovatório). HTML/CSS/JS estático, publicado na Vercel a partir da branch `main`. Leia este arquivo inteiro antes de editar qualquer página.

## A empresa

- **O que vende:** roteirização e gestão de entregas (painel web + app do motorista) para **distribuidoras** e **autopeças**. Também atende indústrias e transportadoras.
- **Quem decide:** dono, gerente de logística ou, em autopeças, gerente de expedição. **Quem usa:** analista de logística ou a expedição, que monta as rotas; o gerente extrai os dados.
- **Dores reais, tiradas de reuniões de venda:**
  - rota montada à mão, nota por nota (10 a 15 min por motorista, todo dia);
  - "telefone sem fio": o cliente liga para o comercial, que liga para a logística ou a expedição, que liga para o motorista;
  - canhoto perdido, ou uma foto que não prova nada;
  - regras da rota na cabeça de uma pessoa ("quando ela sai de férias, a rota sai errada");
  - retrabalho na integração com o ERP.
- **Diferenciais:** facilidade de uso, suporte 24h em grupo de WhatsApp e o fato de ter nascido dentro de uma operação real.

## Tom de voz

- Direto, "chão de fábrica profissional", técnico quando precisa e simples no resto. Fale com "você".
- **Sem frases de efeito, metáforas forçadas ou slogans inventados.** O dono rejeitou textos assim, como "Se você não enxerga a rua…". Prefira frases literais, com a fala do cliente.
- Referência de tom: site da Paytrack (prova logo cedo, frases curtas de benefício).
- **Vocabulário por segmento:** distribuidora fala **"logística"**, autopeças fala **"expedição"**. As páginas de Distribuidora usam só "logística"; as de Autopeças, só "expedição"; as páginas gerais (home, Roteirização, Gestão, App) citam as duas.
- Slogan oficial (H1 da home): **"Tecnologia inteligente para logística"**. Não trocar.

## Fatos e provas liberados para publicar

- **Números (referência setembro/2026, do Deck Comercial v47):** +130 clientes, +70 mil rotas planejadas por mês, +1,6 milhão de entregas processadas por mês. Escreva "1,6 milhão" (singular).
- **Case de distribuidora (sem nome):** montar as rotas levava 4 h/dia com 2 pessoas; hoje 1 pessoa faz em 1h30.
- **Case de autopeças (sem nome):** montar as rotas ocupava 5 pessoas o dia inteiro; hoje são 3 pela manhã, quando o fluxo é maior, e 2 à tarde.
- **Depoimentos do Google (5 estrelas):** Pedro Ribeiro (**Balatore**, não "Balatori"), Ingleses Congelados e Edilene Caetano (Massa X, São Paulo). Os logos estão em `assets/img/depoimentos/`.
- **Clientes com logo** (`assets/img/clientes/`): 2R, Agrotimbó, Gessner, Auto Bitts, Dedé Autopeças, Disbracon, Scotti, Kanty, Caldão.
- **Integrações ERP:** TOTVS, TOTVS Protheus, Winthor, Omie, Senior, Sankhya, CIGAM, SSW, Topsystem. A integração é direta (banco de dados ou API), sem planilha. Sempre com o aviso de que as marcas não indicam parceria.
- **Suporte:** 24h em grupo de WhatsApp. Das 7h às 19h, resposta quase imediata. À noite tem plantão: se ninguém responder no grupo em 2 ou 3 minutos, liga-se para o número de plantão.
- **Implantação:** 30 a 45 dias (depende do ERP e da TI do cliente). Desde a primeira semana, rotas e canhotos já ficam mais rápidos. Dá para começar espelhando a rota do ERP.
- **Teste gratuito:** com as notas e alguns motoristas reais do cliente.
- **WhatsApp oficial:** (47) 99149-6641 (`wa.me/5547991496641`).
- **Recursos confirmados:**
  - pré-roteirização por região, janelas e agendamento, fixar primeira e última parada, bloqueio de vias por tipo de veículo;
  - tempo de descarga que se ajusta pela média, relatório de carregamento em ordem inversa;
  - sequência prevista contra a realizada, parada fora de rota, busca por NF ou CNPJ;
  - app Android/iPhone offline, Waze/Google Maps, foto do canhoto sem galeria, entrega parcial com motivo;
  - assinatura com nome e documento, Pix por QR Code, QR Code de volumes, "voltar depois", nova parada no meio da rota;
  - km com foto do painel, checklist e formulários, link de rastreio, localização só durante a rota.
- **História (2020):** a mãe da Pietra e do Lorenzo precisou se afastar por uma semana da loja de material de construção da família. A Pietra assumiu as entregas e se perdeu nos endereços. O Pedro, que vinha de TI, criou uma tela para dividir as rotas. O primeiro cliente de fora foi uma distribuidora de alimentos em Gaspar. Pietra, Lorenzo e Pedro são os fundadores. Equipe em Blumenau/SC.

## Não publicar

- "Não cobra por usuário" e "sem multa/sem prazo mínimo de contrato" (decisão do dono).
- Recursos que **ainda não existem:** validação de canhoto por IA/OCR, custo de frete/TMS, OTIF/Drop Size, baixa em lote no Retira, visão restrita por transportadora, portal de representantes.
- Concorrentes por nome (Fusion, Linkros etc.).
- **Nenhum conteúdo inventado:** números, logos, depoimentos ou pessoas. Em agosto de 2026, métricas e depoimentos fictícios foram tirados do ar por isso.
- Fotos com cara de IA. Fotos de pessoas vêm de bancos com licença comercial (Pexels) e precisam parecer naturais. Prefira prints reais do sistema.

## Visual

- Siga o Manual de Marca v2.1 (https://cliente.inovatorio.com.br/grafos-tech/manual-de-marca/) e o Design System no Claude (https://claude.ai/artifact/88F78XJpovDJ4oiBQnuU7v).
- **Cores:** os tokens ficam no `:root` de `assets/css/style.css` (laranja #E7581A, grafite #1F1F23, gelo #FAFAFA etc.). Proporção 60% neutros, 30% grafites, 10% laranja. O laranja é acento, nunca fundo de área grande.
- **Degradê da marca:** botão primário, símbolo e **texto pequeno** (rótulos como "Com a Grafos" e links das etapas). Não usar degradê como fundo de caixas.
- **Tipografia:** Montserrat em títulos, Inter no corpo. O H1 das internas tem o mesmo tamanho do H1 da home.
- **Home no desktop:** o hero e a faixa de clientes ocupam exatamente a primeira tela; "Antes da Grafos" só aparece ao rolar.
- **Seções:** alterne os fundos com a classe `.section--alt` (cinza claro), nunca com `style=` inline, e nunca coloque dois fundos iguais em sequência. O FAQ fica sempre em `.section--alt`.
- **Grades:** nenhum item sozinho na última linha. Confira em tablet (768 px).
- **Logos das entidades** (ADAC, ACATE, Blusoft): versões claras no rodapé escuro, em `assets/img/entidades/`.
- **Menu "Soluções":** só abre a lista (Distribuidora, Autopeças). A página `solucoes.html` foi removida e redireciona para `index.html#para-quem-e` (redirect em `vercel.json`).

## Como trabalhar

- **Servidor local:** `python3 -m http.server 8080 --bind 127.0.0.1` na raiz do projeto, depois abra http://localhost:8080.
- **Cache do CSS:** toda alteração em `style.css` exige trocar a versão `style.css?v=...` em **todas** as páginas (inclusive `blog/`). Sem isso, o navegador mostra o CSS antigo.
- **Conferência:** confira cada mudança em 390, 768 e 1366 px. Não pode haver rolagem horizontal, imagem quebrada ou item sozinho em grade.
- **Commits:** a pasta `.claude/` não entra em commit. Não fazer push nem merge na `main` sem o dono pedir.

## Trabalhando em vários chats ao mesmo tempo

- **Uma página (ou um assunto) por chat,** cada um na **sua própria branch**, num worktree separado. Nunca dois chats editando a mesma pasta.
- **Nomes de branch:** `pagina/<nome>` (ex.: `pagina/contato`, `pagina/blog`), criadas a partir de `design/alinhar-cores-manual` enquanto ela não for para a `main`.
- **`assets/css/style.css` é compartilhado.** Cada chat acrescenta suas regras **no fim do arquivo**, num bloco próprio marcado com
  `/* ===== <pagina>: <assunto> (AAAA-MM-DD) ===== */`, e não altera blocos de outras páginas. Mudanças globais (tokens, header, rodapé, componentes da home) ficam num chat só.
- **Versão do CSS:** troque com um sufixo da sua branch (ex.: `?v=20261020-contato`) para evitar conflito no mesmo valor.
- **Header e rodapé** estão copiados em todas as páginas. Só um chat por vez deve alterá-los, com find-and-replace em todas.
- **Ao terminar:** commit na branch do chat, e o merge na branch principal é feito por um chat só, resolvendo os conflitos de `style.css`.
- Registre aqui, na seção correspondente, qualquer decisão nova do dono, para que os outros chats saibam.

## Pendências conhecidas

- Página de Contato: revisar texto e formulário (o envio depende do SMTP em variáveis da Vercel; ver README).
- Blog: revisar textos e trocar as capas com cara de IA (fica por último).
- Material pedido ao dono: prints do sistema (devoluções, relatório de carregamento, busca por nota, dashboard, app na foto do canhoto), foto real da equipe e foto de sacolas com etiqueta QR Code de um cliente de autopeças (hoje usamos uma foto provisória do Pexels).
- Antes do domínio final: remover o `noindex` de staging (ver README).
