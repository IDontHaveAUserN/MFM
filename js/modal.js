// js/modal.js
// Universal modal for all site forms. Reads schemas from window.MFM_FORMS.

(function initSiteModal() {
  const modal = document.getElementById('site-modal');
  const modalBody = document.getElementById('site-modal-body');
  const closeBtn = document.getElementById('site-modal-close');

  if (!modal || !modalBody) return;

  // ---------- Render a form from a schema ----------
  function fieldHtml(f) {
    const req = f.required ? 'required' : '';
    const base = 'w-full px-3 py-2 rounded-lg bg-surface-container text-on-surface font-body-sm text-[12px] focus:outline-none focus:ring-2 focus:ring-brand-purple shadow-inner transition-colors';

    if (f.type === 'textarea') {
      return `
        <label class="block">
          <span class="block font-label-sm text-[11px] text-brand-purple font-semibold mb-1">${f.label}${f.required ? ' *' : ''}</span>
          <textarea name="${f.name}" rows="4" ${req}
            class="${base} resize-none"
            placeholder="${f.placeholder || ''}"></textarea>
        </label>`;
    }
    if (f.type === 'select') {
      const opts = f.options.map(o => `<option value="${o}">${o}</option>`).join('');
      return `
        <label class="block">
          <span class="block font-label-sm text-[11px] text-brand-purple font-semibold mb-1">${f.label}${f.required ? ' *' : ''}</span>
          <select name="${f.name}" ${req} class="${base}">
            <option value="">— Escolher —</option>
            ${opts}
          </select>
        </label>`;
    }
    if (f.type === 'checkbox') {
      return `
        <label class="flex items-center gap-2 cursor-pointer font-body-sm text-[12px] text-on-surface-variant">
          <input type="checkbox" name="${f.name}" value="sim" class="rounded accent-brand-ember" />
          <span>${f.label}</span>
        </label>`;
    }
    if (f.type === 'checkbox-group') {
      const boxes = f.options.map(o => `
        <label class="flex items-center gap-2 cursor-pointer font-body-sm text-[12px] text-on-surface-variant">
          <input type="checkbox" name="${f.name}[]" value="${o}" class="rounded accent-brand-ember" />
          <span>${o}</span>
        </label>`).join('');
      return `
        <div>
          <span class="block font-label-sm text-[11px] text-brand-purple font-semibold mb-1.5">${f.label}</span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">${boxes}</div>
        </div>`;
    }
    // Default: text, tel, email, number
    return `
      <label class="block">
        <span class="block font-label-sm text-[11px] text-brand-purple font-semibold mb-1">${f.label}${f.required ? ' *' : ''}</span>
        <input type="${f.type}" name="${f.name}" ${req}
          class="${base}"
          placeholder="${f.placeholder || ''}" />
      </label>`;
  }

  function renderForm(key) {
    const schema = window.MFM_FORMS && window.MFM_FORMS[key];
    if (!schema) {
      modalBody.innerHTML = '<p class="text-red-600">Formulário não encontrado.</p>';
      return;
    }

    const fieldsHtml = schema.fields.map(fieldHtml).join('');

    modalBody.innerHTML = `
      <div class="mb-space-md border-b pb-3 border-surface-container">
        <h3 class="font-headline-sm text-[20px] text-brand-purple font-bold leading-tight">${schema.title}</h3>
        <p class="font-body-sm text-[12px] text-on-surface-variant mt-1">${schema.subtitle || ''}</p>
      </div>

      <form data-modal-form data-endpoint="${schema.endpoint}">
        <input type="hidden" name="_subject" value="${schema.title}" />
        <input type="hidden" name="formulario" value="${key}" />
        <div class="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
          ${fieldsHtml}
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 mt-4 border-t border-surface-container">
          <p class="font-body-sm text-[11px] text-on-surface-variant">
            <span class="material-symbols-outlined text-[12px] align-middle text-brand-ember">lock</span>
            Os seus dados são enviados de forma segura ao Gabinete Pastoral.
          </p>
          <button type="submit" data-modal-submit
            class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-brand-gold to-brand-ember text-white font-label-sm text-[12px] font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-60">
            <span data-modal-submit-text>${schema.submitLabel || 'Enviar'}</span>
            <span class="material-symbols-outlined text-[16px]">local_fire_department</span>
          </button>
        </div>

        <div class="hidden mt-space-sm p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-body-sm text-[12px] text-center" data-modal-success>
          <span class="font-bold">A paz do Senhor:</span> O seu pedido foi enviado com sucesso. Entraremos em contacto em breve.
        </div>
        <div class="hidden mt-space-sm p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 font-body-sm text-[12px] text-center" data-modal-error>
          <span class="font-bold">Atenção:</span> Não foi possível enviar. Por favor tente novamente ou contacte-nos por telefone.
        </div>
      </form>
    `;

    // Attach submit handler
    const form = modalBody.querySelector('[data-modal-form]');
    const submitBtn = modalBody.querySelector('[data-modal-submit]');
    const submitTxt = modalBody.querySelector('[data-modal-submit-text]');
    const success = modalBody.querySelector('[data-modal-success]');
    const error = modalBody.querySelector('[data-modal-error]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      submitBtn.disabled = true;
      const original = submitTxt.textContent;
      submitTxt.textContent = 'A enviar…';
      success.classList.add('hidden');
      error.classList.add('hidden');

      try {
        const res = await fetch(form.dataset.endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          success.classList.remove('hidden');
          form.reset();
          // Auto-close after 2.5s
          setTimeout(closeModal, 2500);
        } else {
          error.classList.remove('hidden');
        }
      } catch (err) {
        console.error(err);
        error.classList.remove('hidden');
      } finally {
        submitBtn.disabled = false;
        submitTxt.textContent = original;
      }
    });
  }

  // ---------- Open / close ----------
  function openModal(key) {
    renderForm(key);
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    modalBody.innerHTML = '';
  }

  // ---------- Global event delegation ----------
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-modal]');
    if (trigger) {
      e.preventDefault();
      openModal(trigger.getAttribute('data-modal'));
      return;
    }
    // Click on backdrop closes
    if (e.target === modal) closeModal();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
})();