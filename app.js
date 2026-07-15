const archetypes = {
  A: {
    key: 'creator',
    name: 'Создатель',
    summary: 'Тебе легче зарабатывать через идеи, визуал, контент, упаковку и цифровые продукты.',
    fits: ['Цифровые продукты', 'Шаблоны', 'Контент-проекты', 'Визуальная упаковка'],
    money: 'Деньги приходят, когда ты превращаешь идеи в понятный продукт: шаблон, гайд, визуал, мини-сервис или контент-систему.',
    risk: 'Много идей, но сложно доводить до продажи.',
    step: 'Выбери одну идею и упакуй её в простой продукт за 3–7 дней.'
  },
  B: {
    key: 'expert',
    name: 'Эксперт',
    summary: 'Тебе легче зарабатывать через знания, объяснение, обучение, структуру и доверие.',
    fits: ['PDF-гайды', 'Чек-листы', 'Мини-курсы', 'Экспертный контент'],
    money: 'Деньги приходят, когда ты упрощаешь сложное и даёшь человеку ясную инструкцию, экономя ему время и ошибки.',
    risk: 'Можно долго готовиться и недооценивать свои знания.',
    step: 'Выбери одну тему, где ты уже полезен новичку, и сделай простой материал.'
  },
  C: {
    key: 'communicator',
    name: 'Коммуникатор',
    summary: 'Тебе легче зарабатывать через людей, слова, внимание, продвижение и аудиторию.',
    fits: ['Telegram/Instagram', 'Партнёрки', 'Рассылки', 'Комьюнити'],
    money: 'Деньги приходят через внимание и доверие: аудитория, рекомендации, партнёрки, нативные продукты и простые воронки.',
    risk: 'Много общения без понятного продукта может выжигать.',
    step: 'Сделай 5–7 материалов и веди людей к тесту или PDF.'
  },
  D: {
    key: 'analyst',
    name: 'Аналитик',
    summary: 'Тебе легче зарабатывать через логику, данные, системы, AI-инструменты и порядок.',
    fits: ['Автоматизации', 'Таблицы', 'AI-системы', 'Исследования ниш'],
    money: 'Деньги приходят, когда ты убираешь хаос: считаешь, сравниваешь, автоматизируешь и превращаешь процесс в систему.',
    risk: 'Можно слишком долго анализировать и откладывать запуск.',
    step: 'Сделай маленький инструмент или таблицу, решающую одну проблему.'
  },
  E: {
    key: 'practitioner',
    name: 'Практик',
    summary: 'Тебе легче зарабатывать через конкретное действие, настройку, сервисы и понятный результат.',
    fits: ['Фриланс-услуги', 'Настройка сервисов', 'Готовые решения', 'Операционная помощь'],
    money: 'Деньги приходят за быстрый измеримый результат: настроить, собрать, исправить, запустить или облегчить рутину.',
    risk: 'Можно застрять в ручной работе без системы.',
    step: 'Упакуй одну быструю услугу в понятный оффер.'
  },
  F: {
    key: 'intuitive',
    name: 'Интуит',
    summary: 'Тебе легче зарабатывать через смыслы, эстетику, символы, психологию и ощущение “это про меня”.',
    fits: ['Self-discovery продукты', 'Тесты', 'PDF-разборы', 'Атмосферные медиа'],
    money: 'Деньги приходят, когда ты даёшь человеку узнавание себя: тест, разбор, карту, эстетичный опыт или личный смысл.',
    risk: 'Можно быть слишком абстрактным без ясной пользы.',
    step: 'Собери один тест или разбор с понятным результатом для человека.'
  }
};

const questions = [
  ['Когда ты думаешь о заработке в интернете, что тебе ближе?', ['Придумать красивый продукт или контент', 'Делиться знаниями и объяснять', 'Общаться, продвигать, договариваться', 'Анализировать нишу и искать систему', 'Делать конкретную услугу и получать оплату', 'Создавать атмосферу, смыслы и необычный опыт']],
  ['Что тебе легче всего делать регулярно?', ['Генерировать идеи', 'Учить или объяснять', 'Вести канал, вовлекать, писать людям', 'Исследовать, сравнивать, считать', 'Выполнять понятные задачи', 'Чувствовать настроение, тренды и эстетику']],
  ['Какая работа меньше всего раздражает?', ['Создавать визуал, тексты, концепции', 'Делать инструкции, разборы, уроки', 'Работать с аудиторией', 'Строить таблицы, схемы и процессы', 'Настраивать, собирать, выполнять', 'Делать красивые и глубокие продукты']],
  ['Что чаще мешает тебе зарабатывать?', ['Много идей, но сложно закончить', 'Кажется, что я ещё недостаточно знаю', 'Устаю от общения и продаж', 'Слишком долго анализирую', 'Боюсь застрять в рутине', 'Сложно объяснить ценность того, что чувствую']],
  ['Какой формат продукта тебе ближе?', ['Шаблоны, визуалы, контент-паки', 'Гайд, курс, чек-лист', 'Канал, комьюнити, рассылка', 'Таблица, калькулятор, AI-система', 'Услуга или готовое решение', 'Тест, разбор, PDF, символическая система']],
  ['Что люди чаще ценят в тебе?', ['Креативность', 'Знания', 'Общительность', 'Умение разложить по полочкам', 'Надёжность и результат', 'Глубину и чувствительность']],
  ['Как ты обычно принимаешь решения?', ['По вдохновению и образу', 'Через знания и опыт', 'Через обратную связь людей', 'Через факты и анализ', 'Через практическую пользу', 'Через внутреннее ощущение']],
  ['Что тебе ближе как первый онлайн-проект?', ['Красивый цифровой продукт', 'Мини-курс или экспертный материал', 'Канал/аккаунт с аудиторией', 'AI-инструмент, таблица или автоматизация', 'Простая услуга за деньги', 'Тест, архетип или разбор личности']],
  ['Какой контент тебе проще делать?', ['Визуальный и вдохновляющий', 'Обучающий', 'Вовлекающий и разговорный', 'Аналитический', 'Практический “сделай так”', 'Эмоциональный, символичный, атмосферный']],
  ['Что ты хочешь получить от результата теста?', ['Идею продукта', 'Понимание своей экспертности', 'Понимание, как продвигаться', 'Чёткую систему действий', 'Пошаговый первый заработок', 'Глубокое описание себя и своего пути']]
];

const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
let current = 0;
let scores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
let currentResult = null;

const $ = id => document.getElementById(id);

$('startBtn').onclick = () => {
  trackEvent('quiz_start');
  $('start-screen').classList.add('hidden');
  $('question-screen').classList.remove('hidden');
  renderQuestion();
};

$('restartBtn').onclick = () => {
  current = 0;
  scores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
  currentResult = null;
  $('result-screen').classList.add('hidden');
  $('start-screen').classList.remove('hidden');
  location.hash = 'quiz';
};

$('buyBtn').onclick = () => recordInterest();
$('closeModal').onclick = () => closeModal();
$('modalOk').onclick = () => closeModal();
$('interestModal').onclick = e => { if (e.target.id === 'interestModal') closeModal(); };
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function renderQuestion() {
  const [text, answers] = questions[current];
  $('questionCount').textContent = `Вопрос ${current + 1} из ${questions.length}`;
  $('questionText').textContent = text;
  $('progressBar').style.width = `${(current / questions.length) * 100}%`;
  $('answers').innerHTML = answers
    .map((answer, index) => `<button class="answer" data-letter="${letters[index]}">${answer}</button>`)
    .join('');
  document.querySelectorAll('.answer').forEach(button => {
    button.onclick = () => choose(button.dataset.letter);
  });
}

function choose(letter) {
  scores[letter] += 1;
  current += 1;
  if (current < questions.length) renderQuestion();
  else showResult();
}

function showResult() {
  $('progressBar').style.width = '100%';
  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const result = archetypes[winner];
  currentResult = result;

  $('question-screen').classList.add('hidden');
  $('result-screen').classList.remove('hidden');
  $('resultTitle').textContent = `Твой денежный архетип — ${result.name}`;
  $('resultSummary').textContent = result.summary;
  $('resultFits').innerHTML = result.fits.map(item => `<li>${item}</li>`).join('');
  $('resultMoney').textContent = result.money;
  $('resultRisk').textContent = result.risk;
  $('resultStep').textContent = result.step;

  trackEvent('quiz_finish', { result: result.name, scores });
  location.hash = 'quiz';
  $('result-screen').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function recordInterest() {
  const payload = {
    result: currentResult ? currentResult.name : 'unknown',
    scores,
    clickedAt: new Date().toISOString(),
    price: 199,
    source: new URLSearchParams(window.location.search).get('utm_source') || 'direct'
  };

  trackEvent('pdf_interest', payload);
  const key = 'velora_pdf_interest';
  const previous = JSON.parse(localStorage.getItem(key) || '[]');
  previous.push(payload);
  localStorage.setItem(key, JSON.stringify(previous));
  console.log('PDF interest:', payload);
  $('interestModal').classList.remove('hidden');
}

function closeModal() {
  $('interestModal').classList.add('hidden');
}

function trackEvent(name, data = {}) {
  const key = 'velora_mvp_events';
  const event = { name, data, at: new Date().toISOString() };
  const events = JSON.parse(localStorage.getItem(key) || '[]');
  events.push(event);
  localStorage.setItem(key, JSON.stringify(events));
  console.log('MVP event:', event);
}
