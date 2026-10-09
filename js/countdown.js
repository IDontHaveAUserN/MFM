// js/countdown.js
// Countdown to the NEXT service (or currently running service).
// Edit the SERVICES array below to update the schedule — no other changes needed.

(function initServiceCountdown() {
  // ============================================================
  // SERVICE SCHEDULE
  // ------------------------------------------------------------
  // Fields:
  //   name        — displayed in the hero
  //   rule        — 'weekly' | 'nth' | 'last'
  //   day         — 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  //   nth         — only for rule: 'nth' (1..5)
  //   hour,minute — 24h start time
  //   durationMin — how many minutes the service lasts
  //   active      — set false to temporarily hide it
  // ============================================================

  const SERVICES = (window.MFM_SCHEDULE || []).slice();

  // ============================================================
  // DATE HELPERS
  // ============================================================

  function nthWeekdayOfMonth(year, month, weekday, nth) {
    const first = new Date(year, month, 1);
    const offset = (7 + weekday - first.getDay()) % 7;
    const dayOfMonth = 1 + offset + (nth - 1) * 7;
    const candidate = new Date(year, month, dayOfMonth);
    if (candidate.getMonth() !== month) return null;
    return candidate;
  }

  function lastWeekdayOfMonth(year, month, weekday) {
    const last = new Date(year, month + 1, 0);
    const offset = (7 + last.getDay() - weekday) % 7;
    return new Date(year, month, last.getDate() - offset);
  }

  function occurrenceInMonth(service, year, month) {
    let d = null;
    if (service.rule === 'weekly') {
      const first = new Date(year, month, 1);
      const offset = (7 + service.day - first.getDay()) % 7;
      d = new Date(year, month, 1 + offset);
    } else if (service.rule === 'nth') {
      d = nthWeekdayOfMonth(year, month, service.day, service.nth);
    } else if (service.rule === 'last') {
      d = lastWeekdayOfMonth(year, month, service.day);
    }
    if (!d) return null;
    d.setHours(service.hour, service.minute, 0, 0);
    return d;
  }

  function occurrencesWithin(service, now, daysAhead) {
    const results = [];
    const limit = new Date(now.getTime() + daysAhead * 86400000);

    let y = now.getFullYear();
    let m = now.getMonth();

    for (let i = 0; i < 3; i++) {
      if (service.rule === 'weekly') {
        const firstOfMonth = new Date(y, m, 1);
        const offset = (7 + service.day - firstOfMonth.getDay()) % 7;
        for (let w = 0; w < 5; w++) {
          const d = new Date(y, m, 1 + offset + w * 7);
          if (d.getMonth() !== m) break;
          d.setHours(service.hour, service.minute, 0, 0);
          if (d.getTime() >= now.getTime() - 86400000 && d.getTime() <= limit.getTime()) {
            results.push(d);
          }
        }
      } else {
        const d = occurrenceInMonth(service, y, m);
        if (d && d.getTime() >= now.getTime() - 86400000 && d.getTime() <= limit.getTime()) {
          results.push(d);
        }
      }
      m++;
      if (m > 11) { m = 0; y++; }
    }
    return results;
  }

  // ============================================================
  // FIND NEXT / CURRENT SERVICE
  // ============================================================

  function findNextOrCurrent(now) {
    const nowMs = now.getTime();
    let best = null;

    SERVICES.filter((s) => s.active !== false).forEach((service) => {
      const occurrences = occurrencesWithin(service, now, 35);

      occurrences.forEach((start) => {
        const endsAt = new Date(start.getTime() + service.durationMin * 60000);
        const isLive = nowMs >= start.getTime() && nowMs < endsAt.getTime();

        if (!isLive && start.getTime() <= nowMs) return;

        const candidate = { service, when: start, endsAt, isLive };

        if (!best) { best = candidate; return; }
        if (candidate.isLive && !best.isLive) { best = candidate; return; }
        if (!candidate.isLive && best.isLive) return;
        if (candidate.when.getTime() < best.when.getTime()) best = candidate;
      });
    });

    return best;
  }

  // ============================================================
  // RENDER
  // ============================================================
  function render() {
    const now = new Date();
    const next = findNextOrCurrent(now);

    const dEl = document.getElementById('countdown-days');
    const hEl = document.getElementById('countdown-hours');
    const mEl = document.getElementById('countdown-minutes');
    const sEl = document.getElementById('countdown-seconds');
    const nameEl = document.getElementById('countdown-service-name');

    const pad = (n) => String(n).padStart(2, '0');

    if (!next) {
      if (nameEl) nameEl.textContent = 'Sem cultos agendados';
      if (dEl) dEl.textContent = '--d';
      if (hEl) hEl.textContent = '--h';
      if (mEl) mEl.textContent = '--m';
      if (sEl) sEl.textContent = '--s';
      return;
    }

    if (next.isLive) {
      if (nameEl) nameEl.textContent = next.service.name + ' — Em curso';
      const remaining = Math.max(0, Math.floor((next.endsAt.getTime() - now.getTime()) / 1000));
      const rh = Math.floor(remaining / 3600);
      const rm = Math.floor((remaining % 3600) / 60);
      const rs = remaining % 60;

      if (dEl) dEl.textContent = '';
      if (hEl) hEl.textContent = pad(rh) + 'h';
      if (mEl) mEl.textContent = pad(rm) + 'm';
      if (sEl) sEl.textContent = pad(rs) + 's';
      return;
    }

    const diff = next.when.getTime() - now.getTime();
    const totalSeconds = Math.max(0, Math.floor(diff / 1000));
    const days    = Math.floor(totalSeconds / 86400);
    const hours   = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (nameEl) nameEl.textContent = next.service.name;
    if (dEl) dEl.textContent = days + 'd';
    if (hEl) hEl.textContent = pad(hours) + 'h';
    if (mEl) mEl.textContent = pad(minutes) + 'm';
    if (sEl) sEl.textContent = pad(seconds) + 's';
  }

  render();
  setInterval(render, 1000);
})();