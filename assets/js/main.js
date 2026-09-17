// Grafos Tech - interacoes basicas do site
(function () {
  // Menu mobile
  var toggle = document.querySelector('.nav__toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', open ? 'false' : 'true');
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  }

  // Ano dinamico no rodape
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Formulario de demonstracao - envio real via enviar.php
  var form = document.querySelector('#demo-form');
  if (!form) return;

  // marca de tempo para o anti-bot (time-trap no servidor)
  var tsField = form.querySelector('[name="ts"]');
  if (tsField) tsField.value = Date.now();

  var msg = form.querySelector('.form__msg');
  var btn = form.querySelector('button[type="submit"]');
  var btnLabel = btn ? btn.textContent : '';

  function showMsg(text, ok) {
    if (!msg) return;
    msg.textContent = text;
    msg.style.display = 'block';
    msg.classList.remove('form__msg--ok', 'form__msg--err');
    msg.classList.add(ok ? 'form__msg--ok' : 'form__msg--err');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }
    showMsg('Enviando...', true);

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
      .then(function (r) {
        return r.json().catch(function () { return { ok: r.ok, msg: '' }; });
      })
      .then(function (data) {
        if (data && data.ok) {
          showMsg(data.msg || 'Recebemos seus dados. Entramos em contato em breve.', true);
          form.reset();
          if (tsField) tsField.value = Date.now();
        } else {
          showMsg((data && data.msg) || 'Nao foi possivel enviar. Fale com a gente pelo WhatsApp.', false);
        }
      })
      .catch(function () {
        showMsg('Falha de conexao. Tente novamente ou fale pelo WhatsApp.', false);
      })
      .finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = btnLabel; }
      });
  });
})();
