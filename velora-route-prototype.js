(() => {
  const route = document.querySelector('.route-story');
  const routeDone = document.getElementById('routeDone');
  const traveler = document.getElementById('traveler');
  const chapters = Array.from(document.querySelectorAll('.chapter'));
  const stops = Array.from(document.querySelectorAll('.stop'));
  const panelKicker = document.getElementById('panelKicker');
  const panelTitle = document.getElementById('panelTitle');
  const panelText = document.getElementById('panelText');
  const panelTags = document.getElementById('panelTags');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progressBar = document.getElementById('routeProgress');
  const hud = document.getElementById('routeHud');
  const labels = Array.from(document.querySelectorAll('.map-label'));
  const stage = document.querySelector('.route-stage');
  const panel = document.getElementById('routePanel');

  const data = [
    {
      kicker: 'Остановка 01', title: 'Импульс', hud: '01 · импульс', label: 'label-a', cam: ['-2%','2%','1.02','22%','69%'],
      text: 'Сначала человек чувствует: обычные советы по работе и деньгам ему не подходят. Нужен свой маршрут.',
      tags: ['энергия', 'интерес', 'первый отклик']
    },
    {
      kicker: 'Остановка 02', title: 'Выбор', hud: '02 · выбор маршрута', label: 'label-b', cam: ['4%','7%','1.06','34%','20%'],
      text: 'Ответы превращаются в координаты: как человек выбирает, где сопротивляется и какой формат действия ему ближе.',
      tags: ['решения', 'формат', 'сигналы']
    },
    {
      kicker: 'Остановка 03', title: 'Тень', hud: '03 · точка сопротивления', label: 'label-c', cam: ['-4%','0','1.07','70%','36%'],
      text: 'Красивый результат становится сильнее, когда показывает не только талант, но и место, где энергия утекает.',
      tags: ['риск', 'блок', 'честность']
    },
    {
      kicker: 'Остановка 04', title: 'Архетип', hud: '04 · архетип проявился', label: 'label-d', cam: ['5%','-4%','1.06','47%','70%'],
      text: 'Маршрут собирается в рабочий архетип: понятный сценарий, через который человеку проще создавать ценность.',
      tags: ['узнавание', 'сила', 'стиль работы']
    },
    {
      kicker: 'Финиш маршрута', title: 'Карта действий', hud: '05 · карта действий', label: 'label-e', cam: ['-6%','-5%','1.04','78%','73%'],
      text: 'Полный PDF ощущается как персональный путеводитель: направления, ошибки, идеи продуктов и первый план.',
      tags: ['PDF', '7 дней', 'следующий шаг']
    }
  ];
  let currentStep = -1;
  let ticking = false;
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  function setStep(step) {
    const safe = clamp(step, 0, data.length - 1);
    if (safe === currentStep) return;
    currentStep = safe;

    chapters.forEach(ch => ch.classList.toggle('active', Number(ch.dataset.step) === safe));
    stops.forEach(stop => stop.classList.toggle('active', Number(stop.dataset.step) === safe));

    const item = data[safe];
    if (panel && !reduced) panel.classList.add('swap');
    setTimeout(() => {
      panelKicker.textContent = item.kicker;
      panelTitle.textContent = item.title;
      panelText.textContent = item.text;
      panelTags.innerHTML = item.tags.map(tag => `<span>${tag}</span>`).join('');
      if (hud) hud.textContent = item.hud;
      if (panel) panel.classList.remove('swap');
    }, reduced ? 0 : 120);

    if (stage && item.cam && !reduced) {
      const [x, y, z, sx, sy] = item.cam;
      stage.style.setProperty('--cam-x', x);
      stage.style.setProperty('--cam-y', y);
      stage.style.setProperty('--cam-z', z);
      stage.style.setProperty('--spot-x', sx);
      stage.style.setProperty('--spot-y', sy);
    }

    labels.forEach(label => label.classList.toggle('hot', label.classList.contains(item.label)));
    stops.forEach(stop => stop.classList.toggle('reached', Number(stop.dataset.step) <= safe));

    if (traveler && !reduced) {
      traveler.classList.remove('pulse');
      void traveler.offsetWidth;
      traveler.classList.add('pulse');
    }
  }

  function update() {
    ticking = false;
    if (!route || !routeDone) return;

    const rect = route.getBoundingClientRect();
    const travel = Math.max(1, rect.height - innerHeight);
    const raw = clamp((-rect.top) / travel, 0, 1);
    if (progressBar) progressBar.style.width = `${raw * 100}%`;
    if (hud) hud.classList.toggle('on', raw > 0.015 && raw < 0.985);
    const eased = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;

    const total = routeDone.getTotalLength();
    routeDone.style.strokeDasharray = total;
    routeDone.style.strokeDashoffset = total - eased * total;

    if (traveler) {
      const svg = routeDone.ownerSVGElement;
      const box = svg.viewBox.baseVal;
      const point = routeDone.getPointAtLength(eased * total);
      traveler.style.left = `${point.x / box.width * 100}%`;
      traveler.style.top = `${point.y / box.height * 100}%`;
    }

    const step = clamp(Math.floor(raw * data.length), 0, data.length - 1);
    setStep(step);
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  stops.forEach(stop => {
    stop.addEventListener('click', () => {
      const step = Number(stop.dataset.step) || 0;
      const rect = route.getBoundingClientRect();
      const top = scrollY + rect.top;
      const travel = Math.max(1, route.offsetHeight - innerHeight);
      scrollTo({ top: top + travel * (step / data.length + 0.02), behavior: reduced ? 'auto' : 'smooth' });
    });
  });

  setStep(0);
  update();
  addEventListener('scroll', requestUpdate, { passive: true });
  addEventListener('resize', requestUpdate);
})();
