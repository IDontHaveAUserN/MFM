// js/schedule.js
// Single source of truth for all church services across the site.

window.MFM_SCHEDULE = [
  // ---- weekly ----
  {
    name: 'Culto de Domingo',
    rule: 'weekly', day: 0,
    hour: 9, minute: 0,
    durationMin: 210,
    active: true,
    category: 'weekly'
  },
  {
    name: 'Estudo Bíblico de Segunda',
    rule: 'weekly', day: 1,
    hour: 17, minute: 0,
    durationMin: 165,
    active: true,
    category: 'weekly'
  },
  {
    name: 'Culto Manna Water',
    rule: 'weekly', day: 3,
    hour: 17, minute: 0,
    durationMin: 225,
    active: true,
    category: 'weekly'
  },
  {
    name: 'Culto Doméstico',
    rule: 'weekly', day: 4,
    hour: 18, minute: 0,
    durationMin: 90,
    active: true,
    category: 'weekly'
  },

  // ---- monthly ----
  {
    name: 'Culto de Ação de Graças',
    rule: 'nth', day: 0, nth: 1,
    hour: 9, minute: 0,
    durationMin: 210,
    active: true,
    category: 'monthly'
  },
  {
    name: 'Vigília dos Intercessores',
    rule: 'nth', day: 5, nth: 3,
    hour: 22, minute: 0,
    durationMin: 300,
    active: true,
    category: 'monthly'
  },
  {
    name: 'Programa de Libertação do Fim de Semana',
    rule: 'nth', day: 6, nth: 3,
    hour: 22, minute: 0,
    durationMin: 300,
    active: true,
    category: 'monthly'
  },
  {
    name: 'O Poder Deve Mudar de Mãos (PMCH)',
    rule: 'nth', day: 6, nth: 1,
    hour: 7, minute: 0,
    durationMin: 270,
    active: true,
    category: 'monthly'
  },
  {
    name: 'Evangelismo',
    rule: 'last', day: 6,
    hour: 9, minute: 0,
    durationMin: 240,
    active: true,
    category: 'monthly'
  }
];