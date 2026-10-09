// js/forms-data.js
// Central registry for every modal form on the site.
// To add a new form: add an object here + a button anywhere with data-modal="<key>".

window.MFM_FORMS = {

  // ---------- 1. Confirmar Presença (Sunday Service) ----------
  'visit-sunday': {
    title: 'Confirmar Presença — Domingo de Celebração',
    subtitle: 'Reserve o seu lugar. Vamos preparar tudo para recebê-lo bem.',
    submitLabel: 'Confirmar Presença',
    endpoint: 'https://formspree.io/f/xqpeqjvd', 
    fields: [
      { name: 'nome',       label: 'Nome Completo',            type: 'text',  required: true },
      { name: 'telefone',   label: 'WhatsApp / Telefone',      type: 'tel',   required: true },
      { name: 'email',      label: 'Email (opcional)',         type: 'email', required: false },
      { name: 'acompanhantes', label: 'Quantas pessoas vêm consigo? (incluindo você)',
        type: 'select', required: true,
        options: ['1','2','3','4','5','6+'] },
      { name: 'criancas',   label: 'Traz crianças? (MFM Kids)',
        type: 'select', required: true, options: ['Não','Sim — 1','Sim — 2','Sim — 3+'] },
      { name: 'observacoes', label: 'Alguma observação? (necessidade especial, primeira visita, etc.)',
        type: 'textarea', required: false }
    ]
  },

  'visit-study': {
    title: 'Juntar-me ao Estudo Bíblico de Segunda',
    subtitle: 'Ensino sistemático das Escrituras — todas as segundas, das 17h00 às 19h45.',
    submitLabel: 'Confirmar Participação',
    endpoint: 'https://formspree.io/f/xgaokqjb',
    fields: [
      { name: 'nome', label: 'Nome Completo', type: 'text', required: true },
      { name: 'telefone', label: 'WhatsApp / Telefone', type: 'tel', required: true },
      { name: 'email', label: 'Email (opcional)', type: 'email', required: false },
      {
        name: 'observacoes', label: 'Alguma pergunta ou tema que gostaria de estudar?',
        type: 'textarea', required: false
      }
    ]
  },

  // ---------- 2. Pontos de Oração da Vigília ----------
  'visit-vigil': {
    title: 'Pontos de Oração — Vigília do Fogo',
    subtitle: 'Envie os seus pontos de oração para serem apresentados na vigília de sexta-feira.',
    submitLabel: 'Enviar Pontos de Oração',
    endpoint: 'https://formspree.io/f/mbgdobnd',
    fields: [
      { name: 'nome',     label: 'Nome Completo',        type: 'text', required: true },
      { name: 'telefone', label: 'WhatsApp / Telefone',  type: 'tel',  required: true },
      { name: 'pontos',   label: 'Pontos de Oração (um por linha)', type: 'textarea', required: true,
        placeholder: 'Ex.:\n1. Restauração do meu casamento\n2. Emprego para o meu filho\n3. Cura da minha mãe' },
      { name: 'confidencial', label: 'Manter este pedido confidencial',
        type: 'checkbox', required: false }
    ]
  },

  // ---------- 3. Participar na Quarta-feira ----------
  'visit-wednesday': {
    title: 'Participar no Culto de Quarta-feira',
    subtitle: 'Culto de Vitória e Oração Profética — todas as quartas às 17h30.',
    submitLabel: 'Confirmar Participação',
    endpoint: 'https://formspree.io/f/xrpeqdnb',
    fields: [
      { name: 'nome',     label: 'Nome Completo',       type: 'text', required: true },
      { name: 'telefone', label: 'WhatsApp / Telefone', type: 'tel',  required: true },
      { name: 'pedido',   label: 'Motivo de oração / pedido profético (opcional)',
        type: 'textarea', required: false },
      { name: 'primeira_vez', label: 'É a sua primeira vez connosco?',
        type: 'select', required: true, options: ['Não','Sim'] }
    ]
  },

  // ---------- 4. Programas Anuais & Mensais ----------
  'programmes-interest': {
    title: 'Inscrever num Programa Anual',
    subtitle: 'Escolha o programa no qual deseja participar e enviaremos os detalhes.',
    submitLabel: 'Inscrever-me',
    endpoint: 'https://formspree.io/f/mjygwznw',
    fields: [
      { name: 'nome',     label: 'Nome Completo',       type: 'text', required: true },
      { name: 'telefone', label: 'WhatsApp / Telefone', type: 'tel',  required: true },
      { name: 'email',    label: 'Email',               type: 'email', required: false },
      { name: 'programa', label: 'Qual programa?',      type: 'select', required: true,
        options: [
          '70 Dias de Jejum e Oração (Agosto–Outubro)',
          'Dia Global de Evangelismo (Último Domingo de Maio)',
          'Oração sobre o Manto (Junho)',
          'Água de Fogo (Julho)',
          'Oração sobre o Instrumento de Trabalho (Setembro)',
          'Noite de Cross-Over (31 de Dezembro)'
        ]
      },
      { name: 'observacoes', label: 'Observações (opcional)', type: 'textarea', required: false }
    ]
  },

  // ---------- 5. Receber Avisos (newsletter) ----------
  'notices': {
    title: 'Receber Avisos da Igreja',
    subtitle: 'Cultos especiais, vigílias, programas anuais e novidades — direto no seu WhatsApp ou email.',
    submitLabel: 'Quero Receber',
    endpoint: 'https://formspree.io/f/xaeqokrb',
    fields: [
      { name: 'nome',     label: 'Nome Completo',       type: 'text', required: true },
      { name: 'contacto', label: 'WhatsApp ou Email',   type: 'text', required: true },
      { name: 'canal',    label: 'Prefere receber por:',
        type: 'select', required: true, options: ['WhatsApp','Email','Ambos'] },
      { name: 'interesses', label: 'Que tipo de avisos lhe interessam?',
        type: 'checkbox-group', required: false,
        options: ['Cultos semanais','Vigílias','Programas anuais','Estudos bíblicos','Eventos de jovens'] }
    ]
  },

  // ---------- 6. Ministérios — informação ----------
  'ministry-intercession': {
    title: 'Exército de Intercessão — Informações',
    subtitle: 'Guerreiros de oração a clamar dia e noite pela Guiné-Bissau.',
    submitLabel: 'Quero Juntar-me',
    endpoint: 'https://formspree.io/f/mqpeqjrd',
    fields: [
      { name: 'nome',     label: 'Nome Completo',       type: 'text', required: true },
      { name: 'telefone', label: 'WhatsApp / Telefone', type: 'tel',  required: true },
      { name: 'disponibilidade', label: 'Disponibilidade',
        type: 'select', required: true,
        options: ['Manhãs','Tardes','Noites','Fins de semana','Flexível'] },
      { name: 'motivacao', label: 'Por que deseja juntar-se?', type: 'textarea', required: false }
    ]
  },

  'ministry-youth': {
    title: 'Juventude de Fogo & Crianças',
    subtitle: 'Capacitando as novas gerações com fundamentos bíblicos inabaláveis.',
    submitLabel: 'Quero Participar',
    endpoint: 'https://formspree.io/f/mljgbvqp',
    fields: [
      { name: 'nome',     label: 'Nome Completo',       type: 'text', required: true },
      { name: 'telefone', label: 'WhatsApp / Telefone', type: 'tel',  required: true },
      { name: 'idade',    label: 'Idade',               type: 'number', required: true },
      { name: 'interesse', label: 'Que área lhe interessa?',
        type: 'checkbox-group', required: false,
        options: ['Louvor','Ensino','Evangelismo','Mídia','Acolhimento'] }
    ]
  },

  'ministry-bread': {
    title: 'Partilha do Pão — Informações',
    subtitle: 'Como os apóstolos em Atos 2:42–46, repartimos o pão de casa em casa.',
    submitLabel: 'Quero Saber Mais',
    endpoint: 'https://formspree.io/f/mzedrwny',
    fields: [
      { name: 'nome',     label: 'Nome Completo',       type: 'text', required: true },
      { name: 'telefone', label: 'WhatsApp / Telefone', type: 'tel',  required: true },
      { name: 'bairro',   label: 'Bairro onde mora',    type: 'text', required: true },
      { name: 'papel',    label: 'Como deseja participar?',
        type: 'select', required: true,
        options: ['Abrir a minha casa para um encontro','Participar de um encontro próximo','Ajudar com alimentos','Só quero saber mais'] }
    ]
  },

  'ministry-house-fellowship': {
    title: 'Culto Doméstico — Encontrar um Lar Perto',
    subtitle: 'Reuniões de casa em casa, seguindo Atos 2:46 e Atos 5:42.',
    submitLabel: 'Encontrar um Lar',
    endpoint: 'https://formspree.io/f/meaegdyn',
    fields: [
      { name: 'nome',     label: 'Nome Completo',       type: 'text', required: true },
      { name: 'telefone', label: 'WhatsApp / Telefone', type: 'tel',  required: true },
      { name: 'bairro',   label: 'Bairro onde mora',    type: 'text', required: true },
      { name: 'disponibilidade', label: 'Melhor dia para participar',
        type: 'select', required: true,
        options: ['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'] }
    ]
  },

  'ministry-couples': {
    title: 'Homens & Mulheres de Fé — Informações',
    subtitle: 'Edificação de casamentos e lares fortes segundo os mandamentos de Deus.',
    submitLabel: 'Quero Integrar',
    endpoint: 'https://formspree.io/f/xoejdbgb',
    fields: [
      { name: 'nome',     label: 'Nome Completo',       type: 'text', required: true },
      { name: 'telefone', label: 'WhatsApp / Telefone', type: 'tel',  required: true },
      { name: 'estado',   label: 'Estado civil',
        type: 'select', required: true,
        options: ['Solteiro(a)','Casado(a)','Noivo(a)','Viúvo(a)'] }
    ]
  },

  'prayer-request': {
    title: 'Pedido de Oração',
    subtitle: 'Apresente a sua causa ao Altar de Oração.',
    submitLabel: 'Enviar para o Altar',
    endpoint: 'https://formspree.io/f/mppqdeqn',
    fields: [
      { name: 'nome',     label: 'Nome Completo',        type: 'text', required: true },
      { name: 'telefone', label: 'WhatsApp / Telefone',  type: 'tel',  required: true },
      { name: 'pedido',   label: 'Motivo de oração',     type: 'textarea', required: true },
      { name: 'confidencial', label: 'Manter este pedido confidencial',
        type: 'checkbox', required: false }
    ]
  }
};