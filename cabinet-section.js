// Integrated Velora cabinet section.
(function initVeloraCabinet(){
  const section = document.querySelector('.cabinet-section');
  if (!section) return;

  const scene = document.getElementById('cabinetScene');
  const card = document.getElementById('cabinetCard');
  const topline = document.getElementById('cabinetTopline');
  const symbol = document.getElementById('cabinetSymbol');
  const cardTitle = document.getElementById('cabinetCardTitle');
  const cardText = document.getElementById('cabinetCardText');
  const panel = document.getElementById('cabinetPanel');
  const kicker = document.getElementById('cabinetKicker');
  const title = document.getElementById('cabinetTitle');
  const text = document.getElementById('cabinetText');
  const chips = document.getElementById('cabinetChips');
  const hint = document.getElementById('cabinetHint');
  const railButtons = Array.from(document.querySelectorAll('#cabinetRail button')); // hidden in v15; kept for safe state sync
  const compass = document.getElementById('cabinetCompass');
  const thread = document.querySelector('.cabinet-thread');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const steps = [
    {topline:'Открытие 01', symbol:'✦', card:'Импульс', cardText:'Что тебя запускает: идея, контакт, система, действие или ощущение смысла?', kicker:'Глава 01', title:'Сначала — импульс', text:'Человек как будто заглядывает на стол, где постепенно проявляется его карта работы. Это делает тест не анкетой, а маленьким опытом.', chips:['интерес','энергия','начало'], compass:0, thread:'5%'},
    {topline:'Открытие 02', symbol:'◇', card:'Выбор', cardText:'Как ты принимаешь решения, когда нет полной ясности?', kicker:'Глава 02', title:'Потом — выбор маршрута', text:'Каждый ответ кладёт новую заметку на стол и двигает карту дальше: от ощущения к понятному рабочему сценарию.', chips:['решения','сценарий','направление'], compass:38, thread:'28%'},
    {topline:'Открытие 03', symbol:'◐', card:'Тень', cardText:'Где ты теряешь энергию и почему чужие советы могут не работать?', kicker:'Глава 03', title:'Дальше — честная тень', text:'Сильный self-discovery продукт показывает не только талант, но и место, где человек буксует — спокойно и без давления.', chips:['риск','блок','честность'], compass:86, thread:'52%'},
    {topline:'Открытие 04', symbol:'✶', card:'Архетип', cardText:'Главный рабочий стиль собирается из ответов в понятный образ.', kicker:'Глава 04', title:'Архетип проявляется', text:'Здесь должен появиться эффект “это про меня”: не мистика ради мистики, а точный рабочий сценарий.', chips:['узнавание','стиль','сила'], compass:142, thread:'74%'},
    {topline:'Финальная печать', symbol:'V', card:'Карта действий', cardText:'PDF становится личной картой: направления, ошибки, идеи продуктов и первый план.', kicker:'Финал', title:'И только потом — PDF', text:'Платный разбор выглядит как логичное продолжение уже пережитого опыта, а не как внезапная кнопка оплаты.', chips:['PDF','7 дней','следующий шаг'], compass:210, thread:'96%'}
  ];

  let current = -1;
  let ticking = false;
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  function setStep(step) {
    const safe = clamp(step, 0, steps.length - 1);
    if (safe === current) return;
    current = safe;
    const item = steps[safe];

    if (panel && !reduced) panel.classList.add('swap');
    setTimeout(() => {
      topline.textContent = item.topline;
      symbol.textContent = item.symbol;
      cardTitle.textContent = item.card;
      cardText.textContent = item.cardText;
      kicker.textContent = item.kicker;
      title.textContent = item.title;
      text.textContent = item.text;
      chips.innerHTML = item.chips.map(chip => `<span>${chip}</span>`).join('');
      hint.textContent = safe === steps.length - 1 ? 'Финал · переходи к тесту ниже' : `Листай дальше · ${safe + 1} из ${steps.length}`;
      hint.classList.toggle('done', safe === steps.length - 1);
      if (panel) panel.classList.remove('swap');
    }, reduced ? 0 : 110);

    scene.className = `cabinet-scene step-${safe}`;
    railButtons.forEach(button => button.classList.toggle('active', Number(button.dataset.step) === safe));
    if (compass) compass.style.setProperty('--compass-rot', `${item.compass}deg`);
    if (thread) thread.style.setProperty('--thread-x', item.thread);
    if (card && !reduced) card.style.setProperty('--card-rot', `${[-3, 2, -1, 3, 0][safe]}deg`);
  }

  function update() {
    ticking = false;
    const rect = section.getBoundingClientRect();
    const travel = Math.max(1, rect.height - innerHeight);
    const raw = clamp((-rect.top + innerHeight * 0.1) / travel, 0, 1);
    setStep(clamp(Math.floor(raw * steps.length), 0, steps.length - 1));
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
      const top = scrollY + section.getBoundingClientRect().top;
      const travel = Math.max(1, section.offsetHeight - innerHeight);
      scrollTo({ top: top + travel * (step / steps.length + 0.04), behavior: reduced ? 'auto' : 'smooth' });
    });
  });

  setStep(0);
  update();
  addEventListener('scroll', requestUpdate, { passive: true });
  addEventListener('resize', requestUpdate);
})();
