(() => {
  const story = document.querySelector('.cabinet-story');
  const progress = document.getElementById('progress');
  const scene = document.getElementById('scene');
  const card = document.getElementById('archetypeCard');
  const cardTopline = document.getElementById('cardTopline');
  const cardSymbol = document.getElementById('cardSymbol');
  const cardTitle = document.getElementById('cardTitle');
  const cardText = document.getElementById('cardText');
  const panel = document.getElementById('panel');
  const panelKicker = document.getElementById('panelKicker');
  const panelTitle = document.getElementById('panelTitle');
  const panelText = document.getElementById('panelText');
  const chips = document.getElementById('chips');
  const compass = document.getElementById('compass');
  const thread = document.querySelector('.thread');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const railButtons = Array.from(document.querySelectorAll('#stepRail button'));
  const continueHint = document.getElementById('continueHint');

  const steps = [
    {
      symbol:'✦', card:'Импульс', topline:'Открытие 01',
      cardText:'Что тебя запускает: идея, контакт, система, действие или ощущение смысла?',
      kicker:'Глава 01', title:'Сначала — импульс',
      text:'Человек не читает сухое описание. Он как будто заглядывает на стол, где постепенно проявляется его карта работы.',
      chips:['интерес','энергия','начало'], compass:0, thread:'5%'
    },
    {
      symbol:'◇', card:'Выбор', topline:'Открытие 02',
      cardText:'Как ты принимаешь решения, когда нет полной ясности?',
      kicker:'Глава 02', title:'Потом — выбор маршрута',
      text:'Вместо обычного списка вопросов появляется ощущение: каждый ответ кладёт новую заметку на стол и двигает карту дальше.',
      chips:['решения','сценарий','направление'], compass:38, thread:'28%'
    },
    {
      symbol:'◐', card:'Тень', topline:'Открытие 03',
      cardText:'Где ты теряешь энергию и почему чужие советы могут не работать?',
      kicker:'Глава 03', title:'Дальше — честная тень',
      text:'Хороший self-discovery продукт не только гладит по голове. Он показывает место, где человек буксует — спокойно и без давления.',
      chips:['риск','блок','честность'], compass:86, thread:'52%'
    },
    {
      symbol:'✶', card:'Архетип', topline:'Открытие 04',
      cardText:'Главный рабочий стиль собирается из ответов в понятный образ.',
      kicker:'Глава 04', title:'Архетип проявляется',
      text:'В этот момент должен появиться эффект “это про меня”: не мистика ради мистики, а точный рабочий сценарий.',
      chips:['узнавание','стиль','сила'], compass:142, thread:'74%'
    },
    {
      symbol:'V', card:'Карта действий', topline:'Финальная печать',
      cardText:'PDF становится личной картой: направления, ошибки, идеи продуктов и первый план.',
      kicker:'Финал', title:'И только потом — PDF',
      text:'Платный разбор выглядит как логичное продолжение уже пережитого опыта, а не как внезапная кнопка оплаты.',
      chips:['PDF','7 дней','следующий шаг'], compass:210, thread:'96%'
    }
  ];

  let current = -1;
  let ticking = false;
  const clamp = (v,min,max) => Math.min(max, Math.max(min,v));

  function setStep(index) {
    const safe = clamp(index,0,steps.length-1);
    if (safe === current) return;
    current = safe;
    const data = steps[safe];

    if (panel && !reduced) panel.classList.add('swap');
    setTimeout(() => {
      cardTopline.textContent = data.topline;
      cardSymbol.textContent = data.symbol;
      cardTitle.textContent = data.card;
      cardText.textContent = data.cardText;
      panelKicker.textContent = data.kicker;
      panelTitle.textContent = data.title;
      panelText.textContent = data.text;
      chips.innerHTML = data.chips.map(chip => `<span>${chip}</span>`).join('');
      if (panel) panel.classList.remove('swap');
    }, reduced ? 0 : 110);

    scene.className = `scene step-${safe}`;
    railButtons.forEach(btn => btn.classList.toggle('active', Number(btn.dataset.step) === safe));
    if (continueHint) {
      continueHint.textContent = safe === steps.length - 1 ? 'Финал · можно переходить дальше' : `Листай дальше · ${safe + 1} из ${steps.length}`;
      continueHint.classList.toggle('done', safe === steps.length - 1);
    }
    if (compass) compass.style.setProperty('--compass-rot', `${data.compass}deg`);
    if (thread) thread.style.setProperty('--thread-x', data.thread);
    if (card && !reduced) {
      card.style.setProperty('--card-rot', `${[-3, 2, -1, 3, 0][safe]}deg`);
    }
  }

  function update() {
    ticking = false;
    if (!story) return;
    const rect = story.getBoundingClientRect();
    const travel = Math.max(1, rect.height - innerHeight);
    const raw = clamp((-rect.top) / travel, 0, 1);
    if (progress) progress.style.width = `${raw * 100}%`;
    const step = clamp(Math.floor(raw * steps.length), 0, steps.length - 1);
    setStep(step);

    if (!reduced && scene) {
      const glowX = 50 + Math.sin(raw * Math.PI * 2) * 14;
      const glowY = 30 + raw * 38;
      scene.style.filter = `saturate(${1 + raw * .08}) contrast(${1 + raw * .025})`;
      scene.style.setProperty('--glow-x', `${glowX}%`);
      scene.style.setProperty('--glow-y', `${glowY}%`);
    }
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }


  railButtons.forEach(button => {
    button.addEventListener('click', () => {
      const step = Number(button.dataset.step) || 0;
      const rect = story.getBoundingClientRect();
      const top = scrollY + rect.top;
      const travel = Math.max(1, story.offsetHeight - innerHeight);
      scrollTo({ top: top + travel * (step / steps.length + 0.025), behavior: reduced ? 'auto' : 'smooth' });
    });
  });

  setStep(0);
  update();
  addEventListener('scroll', requestUpdate, { passive:true });
  addEventListener('resize', requestUpdate);
})();
