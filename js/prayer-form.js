// js/prayer-form.js
// Handles the inline prayer form.
// Endpoint is looked up from window.MFM_FORMS by data-form-key.

(function initPrayerForm() {
  const form = document.querySelector('[data-prayer-form]');
  if (!form) return;

  const formKey = form.getAttribute('data-form-key');
  const schema = formKey && window.MFM_FORMS ? window.MFM_FORMS[formKey] : null;
  const endpoint = schema && schema.endpoint;

  const success = document.getElementById('prayer-success');
  const error = document.getElementById('prayer-error');
  const submitBtn = form.querySelector('[data-prayer-submit]');
  const submitText = form.querySelector('[data-prayer-submit-text]');

  if (!endpoint) {
    console.warn('[prayer-form] No endpoint found for key:', formKey);
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (success) success.classList.add('hidden');
    if (error) error.classList.add('hidden');

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const originalText = submitText ? submitText.textContent : '';
    if (submitBtn) submitBtn.disabled = true;
    if (submitText) submitText.textContent = 'A enviar…';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        if (success) {
          success.classList.remove('hidden');
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        form.reset();
      } else {
        if (error) error.classList.remove('hidden');
      }
    } catch (err) {
      console.error('[prayer-form] Error:', err);
      if (error) error.classList.remove('hidden');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (submitText) submitText.textContent = originalText;
    }
  });
})();