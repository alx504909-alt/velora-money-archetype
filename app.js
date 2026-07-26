// Безопасная схема оплаты:
// сайт отправляет выбранный архетип на backend, backend создаёт платёж ЮKassa
// и ставит return_url вида success.html?pdf=<архетип>.
// На GitHub Pages backend не работает; для продаж нужен Vercel/другой backend-хостинг.
const PAYMENT_API_URL = '/api/create-payment';

const EMPTY_SCORES = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };

const archetypes = {
  A: {
    key: 'creator',
    name: 'Создатель',
    short: 'идеи → продукт → упаковка',
    summary: 'Твоя сильная зона — превращать идеи, визуал и концепции в понятный цифровой продукт. Деньги чаще появляются не от “просто вдохновения”, а когда ты доводишь образ до конкретной формы: шаблон, мини-продукт, контент-пак, лендинг, визуальная упаковка.',
    profile: 'Ты быстрее многих видишь, как должна выглядеть идея, какой у неё стиль и почему человеку может захотеться это купить. Слабое место — перескакивать между вариантами и слишком долго доводить “до красиво”, когда уже пора тестировать спрос.',
    fits: ['Шаблоны, визуалы и наборы для контента', 'Мини-лендинги и упаковка офферов', 'Цифровые продукты: гайды, чек-листы, наборы', 'Контент-проекты с сильной эстетикой'],
    money: 'Деньги приходят, когда идея получает границы: кому это нужно, какой результат человек получит, сколько стоит и как купить. Твой лучший путь — быстро собирать красивую, но простую версию и проверять реакцию.',
    risk: 'Главный риск — создать много красивых заготовок, но не довести их до продажи. Тебе важно ограничивать объём: один продукт, одна аудитория, один тест спроса.',
    step: 'Выбери одну идею и за 48 часов упакуй её в страницу или PDF-черновик с ценой. Не улучшай всё сразу — сначала проверь, кликают ли люди на покупку.'
  },
  B: {
    key: 'expert',
    name: 'Эксперт',
    short: 'знание → структура → доверие',
    summary: 'Твоя сильная зона — объяснять, упрощать и превращать опыт в понятную инструкцию. Деньги чаще приходят, когда ты экономишь человеку время, ошибки и хаос: показываешь “делай так, не делай так”.',
    profile: 'Ты ценишь глубину и доказательность. Тебе важно понимать тему самому, прежде чем продавать. Это создаёт доверие, но может тормозить запуск: кажется, что надо ещё подготовиться.',
    fits: ['PDF-гайды и чек-листы', 'Мини-курсы и уроки', 'Разборы ошибок новичков', 'Экспертный блог или рассылка'],
    money: 'Твой продукт должен обещать не чудо, а ясность: “разберёшься быстрее”, “не совершишь типовые ошибки”, “получишь план”. Хорошо работают структурированные материалы и мини-обучение.',
    risk: 'Риск — недооценить свои знания и бесконечно собирать материал. Для рынка не нужен идеальный учебник; нужен конкретный полезный результат.',
    step: 'Сделай материал на одну узкую боль: “7 ошибок”, “первый план”, “как выбрать”. Продавай не знания вообще, а сокращение пути.'
  },
  C: {
    key: 'communicator',
    name: 'Коммуникатор',
    short: 'внимание → доверие → продажи',
    summary: 'Твоя сильная зона — люди, слова, вовлечение и распространение идей. Деньги чаще приходят через внимание: аудиторию, рекомендации, партнёрки, контент, простые воронки.',
    profile: 'Ты лучше раскрываешься, когда есть отклик. Можешь быстро почувствовать, какая формулировка зацепит людей. Но если нет продукта и границ, общение превращается в усталость.',
    fits: ['Telegram/Instagram-контент', 'Партнёрские подборки', 'Рассылки и комьюнити', 'Продвижение тестов, квизов и мини-продуктов'],
    money: 'Тебе важно строить не просто “общение”, а маршрут: пост → интерес → тест/лид-магнит → продукт. Тогда внимание превращается в деньги.',
    risk: 'Риск — много говорить, отвечать и поддерживать контакт, но не вести человека к покупке. Нужны простые CTA и автоматизация.',
    step: 'Выбери один канал и 5 дней подряд веди людей к одному действию: пройти тест, скачать материал или оставить заявку.'
  },
  D: {
    key: 'analyst',
    name: 'Аналитик',
    short: 'хаос → система → инструмент',
    summary: 'Твоя сильная зона — видеть структуру, сравнивать варианты, считать и собирать систему. Деньги чаще появляются там, где ты убираешь хаос: автоматизируешь, создаёшь таблицу, AI-инструмент, калькулятор или понятный процесс.',
    profile: 'Ты не любишь туманные обещания. Тебе важно, чтобы было логично: входные данные, критерии, вывод. Это сильная база для сервисов и инструментов, особенно в эпоху ИИ.',
    fits: ['AI-автоматизации', 'Калькуляторы и таблицы', 'Исследования ниш и конкурентов', 'Системы учёта, планирования и принятия решений'],
    money: 'Лучший оффер: “я превращу ваш хаос в систему”. Это можно продавать как шаблон, мини-сервис, аудит или автоматизацию.',
    risk: 'Риск — слишком долго анализировать и усложнять архитектуру. Рынок часто покупает простое решение одной боли, а не идеальную систему.',
    step: 'Собери маленький инструмент, который за 3 минуты даёт человеку понятный вывод: цену, план, нишу, список действий или диагностику.'
  },
  E: {
    key: 'practitioner',
    name: 'Практик',
    short: 'задача → действие → результат',
    summary: 'Твоя сильная зона — делать руками, настраивать, запускать и доводить до измеримого результата. Деньги чаще приходят за конкретику: “соберу”, “настрою”, “исправлю”, “запущу”.',
    profile: 'Ты сильнее там, где понятен результат. Тебе проще монетизировать не образ и не теорию, а готовое решение. Важно не застрять в бесконечной ручной работе.',
    fits: ['Быстрые фриланс-услуги', 'Настройка сервисов и ботов', 'Сборка лендингов и форм', 'Операционная помощь и готовые пакеты'],
    money: 'Хорошо работают пакетные услуги с фиксированным результатом: “лендинг за 2 дня”, “бот под ключ”, “настройка оплаты”, “упаковка PDF-продукта”.',
    risk: 'Риск — продавать время вместо результата. Тогда доход упирается в ручной труд. Нужны шаблоны, пакеты и повторяемый процесс.',
    step: 'Упакуй одну быструю услугу в фиксированный пакет: что входит, срок, цена, что получит клиент.'
  },
  F: {
    key: 'intuitive',
    name: 'Интуит',
    short: 'смысл → узнавание → опыт',
    summary: 'Твоя сильная зона — смыслы, эстетика, символы и точное ощущение “это про меня”. Деньги чаще приходят, когда продукт даёт человеку узнавание себя: тест, разбор, карта, атмосферный опыт, персональная интерпретация.',
    profile: 'Ты видишь тонкие связи и настроение, которые другим сложно назвать словами. Это ценно для self-discovery-продуктов, но важно не уходить в туманность: человеку нужен конкретный вывод и следующий шаг.',
    fits: ['Тесты и архетипы', 'PDF-разборы личности/денег/стиля', 'Атмосферные медиа-проекты', 'Мягкие воронки через самопознание'],
    money: 'Продаётся не “мистика ради мистики”, а аккуратное самопонимание: человек узнаёт себя, видит риск и получает маленькое действие.',
    risk: 'Риск — звучать красиво, но слишком абстрактно. Нужна связка: образ → объяснение → польза → действие.',
    step: 'Собери один короткий тест или разбор, где после красивого инсайта есть практичный вывод: что попробовать в ближайшие 7 дней.'
  }
};

const questions = [
  {
    text: 'Ты просыпаешься с мыслью “надо что-то менять”. Что ты делаешь первым делом?',
    answers: [
      { text: 'Открываю заметки и набрасываю образы, названия, идеи — пока не исчезло ощущение', weights: { A: 2, F: 2 }, signal: 'первый импульс у тебя часто приходит через образ, идею и внутреннее ощущение' },
      { text: 'Пытаюсь разложить хаос: что именно не работает, где причина, какой порядок действий', weights: { D: 3, B: 1 }, signal: 'ты ищешь логику и структуру прежде, чем действовать' },
      { text: 'Пишу человеку или смотрю, что обсуждают другие — мне важен живой отклик', weights: { C: 3, F: 1 }, signal: 'тебе важно сверяться с людьми и видеть реакцию' },
      { text: 'Выбираю маленькую задачу и делаю её, чтобы не зависнуть в мыслях', weights: { E: 3, A: 1 }, signal: 'тебя возвращает в реальность конкретное действие' }
    ]
  },
  {
    text: 'Представь: тебе дали свободный день для своего проекта. Что в конце дня даст ощущение “не зря”?',
    answers: [
      { text: 'Появился живой черновик: страница, визуал, структура продукта или понятная подача', weights: { A: 3, E: 1 }, signal: 'тебе важно видеть форму, которую уже можно показать' },
      { text: 'Я наконец понял(а), как это объяснять простыми словами', weights: { B: 3, C: 1 }, signal: 'твоя ценность раскрывается через ясное объяснение' },
      { text: 'Я убрал(а) путаницу: собрал(а) таблицу, схему, критерии или сценарий', weights: { D: 3, B: 1 }, signal: 'ты чувствуешь прогресс, когда появляется система' },
      { text: 'Я сделал(а) конкретный кусок работы, который можно использовать уже сейчас', weights: { E: 3, D: 1 }, signal: 'тебе важен практический результат, а не только идея' }
    ]
  },
  {
    text: 'Где у тебя чаще всего теряется энергия?',
    answers: [
      { text: 'Когда идея становится слишком обычной и теряет настроение', weights: { A: 2, F: 2 }, signal: 'для тебя важна не только польза, но и ощущение живого смысла' },
      { text: 'Когда нужно говорить “на продажу”, а внутри нет уверенности в глубине продукта', weights: { B: 2, F: 1, C: 1 }, signal: 'тебе важно, чтобы продукт был честным и достаточно глубоким' },
      { text: 'Когда вокруг слишком много переписок, комментариев и ожиданий', weights: { C: 2, E: 1, D: 1 }, signal: 'контакт может давать рост, но без границ быстро забирает ресурс' },
      { text: 'Когда всё слишком абстрактно и непонятно, что именно надо сделать', weights: { E: 2, D: 2 }, signal: 'тебе нужен конкретный следующий шаг и измеримый результат' }
    ]
  },
  {
    text: 'Что тебя чаще всего цепляет в чужих онлайн-проектах?',
    answers: [
      { text: 'Когда простая идея красиво и точно упакована', weights: { A: 3, C: 1 }, signal: 'ты замечаешь силу упаковки и первого впечатления' },
      { text: 'Когда автор объясняет так, что наконец становится понятно', weights: { B: 3, D: 1 }, signal: 'ты ценишь ясность, структуру и экономию ошибок' },
      { text: 'Когда вокруг проекта есть движение: люди обсуждают, сохраняют, пересылают', weights: { C: 3, A: 1 }, signal: 'ты видишь ценность в внимании и распространении' },
      { text: 'Когда продукт решает задачу без лишней красоты и обещаний', weights: { E: 2, D: 2 }, signal: 'ты доверяешь практичности и проверяемому результату' }
    ]
  },
  {
    text: 'Если бы нужно было заработать первые деньги без большого запуска, какой путь кажется наименее чужим?',
    answers: [
      { text: 'Собрать маленький красивый цифровой продукт и показать его аудитории', weights: { A: 3, F: 1 }, signal: 'тебе подходит путь через продуктовую форму и эстетическое желание' },
      { text: 'Сделать полезный материал по узкой проблеме: инструкция, чек-лист, разбор', weights: { B: 3, E: 1 }, signal: 'тебе ближе продажа ясности и сокращения пути' },
      { text: 'Запустить простой контент-маршрут: посты → интерес → тест или материал', weights: { C: 3, D: 1 }, signal: 'ты можешь превращать внимание в понятный маршрут' },
      { text: 'Взять конкретную задачу и быстро сделать её для одного клиента', weights: { E: 3, D: 1 }, signal: 'тебе проще монетизировать готовое действие' }
    ]
  },
  {
    text: 'Что людям рядом с тобой чаще всего становится легче?',
    answers: [
      { text: 'Почувствовать, как идея может выглядеть и зачем она вообще нужна', weights: { A: 3, F: 1 }, signal: 'ты помогаешь идеям обрести форму и настроение' },
      { text: 'Понять сложную тему без лишнего шума', weights: { B: 3, D: 1 }, signal: 'ты создаёшь ясность там, где было слишком много слов' },
      { text: 'Решиться обсудить, спросить, проявиться, начать контакт', weights: { C: 3, F: 1 }, signal: 'ты включаешь людей через контакт и эмоциональный отклик' },
      { text: 'Перестать расплываться и перейти к конкретному действию', weights: { E: 3, D: 1 }, signal: 'ты возвращаешь фокус к делу и результату' }
    ]
  },
  {
    text: 'Какой комплимент к твоей работе был бы самым точным?',
    answers: [
      { text: '“Ты сделал(а) это живым и заметным”', weights: { A: 3, C: 1 }, signal: 'твою силу видно в живости, форме и привлекательности подачи' },
      { text: '“После тебя стало понятно, что делать”', weights: { B: 2, D: 2 }, signal: 'твоя ценность — превращать туман в ясный порядок' },
      { text: '“Ты очень точно почувствовал(а), что со мной происходит”', weights: { F: 3, B: 1 }, signal: 'ты умеешь давать людям узнавание себя' },
      { text: '“Ты не говорил(а) лишнего — просто взял(а) и сделал(а)”', weights: { E: 3, D: 1 }, signal: 'ты силён/сильна в исполнении и прикладной пользе' }
    ]
  },
  {
    text: 'Когда проект буксует, что тебе помогает выбраться?',
    answers: [
      { text: 'Поменять подачу, найти новый образ, сделать идею снова живой', weights: { A: 3, F: 1 }, signal: 'для тебя форма и настроение могут заново включить движение' },
      { text: 'Сузить тему и объяснить её проще', weights: { B: 3, C: 1 }, signal: 'ты выходишь из хаоса через ясную формулировку' },
      { text: 'Показать людям и посмотреть честную реакцию', weights: { C: 3, E: 1 }, signal: 'тебе помогает рынок и внешний отклик' },
      { text: 'Убрать лишние шаги и оставить один проверяемый сценарий', weights: { D: 3, E: 1 }, signal: 'ты двигаешься лучше, когда система становится проще' }
    ]
  },
  {
    text: 'Что для тебя звучит как честный продукт, а не “продажа воздуха”?',
    answers: [
      { text: 'То, что человек может сохранить, применить или показать другим', weights: { A: 2, E: 2 }, signal: 'тебе важно, чтобы продукт имел форму и был применимым' },
      { text: 'То, что объясняет человеку его ошибку и даёт следующий шаг', weights: { B: 3, D: 1 }, signal: 'ты считаешь ценностью ясное понимание и корректировку действия' },
      { text: 'То, после чего человек говорит: “это очень похоже на меня”', weights: { F: 3, C: 1 }, signal: 'для тебя ценность может быть в точном самоузнавании' },
      { text: 'То, что экономит время, убирает ручную работу или решает задачу', weights: { D: 2, E: 2 }, signal: 'ты доверяешь пользе, которую можно почувствовать практически' }
    ]
  },
  {
    text: 'Какой формат тебе проще повторять регулярно, а не один раз на вдохновении?',
    answers: [
      { text: 'Короткие визуальные идеи, мини-сцены, подборки, образы', weights: { A: 3, F: 1 }, signal: 'тебе подходит регулярность через визуальные и смысловые формы' },
      { text: 'Разборы, инструкции, наблюдения, объяснения', weights: { B: 3, D: 1 }, signal: 'ты устойчив(а) в формате объяснения и структурирования' },
      { text: 'Посты с вопросами, историями, реакциями, диалогом', weights: { C: 3, F: 1 }, signal: 'тебе подходит контент, где есть живой отклик' },
      { text: 'Практические чек-листы, настройки, шаблоны, процессы', weights: { E: 2, D: 2 }, signal: 'тебе легче повторять то, что имеет понятный процесс' }
    ]
  },
  {
    text: 'Если убрать страх оценки, что тебе было бы интересно собрать первым?',
    answers: [
      { text: 'Красивую страницу/продукт, который хочется открыть просто из-за подачи', weights: { A: 3, F: 1 }, signal: 'тебя тянет к продуктам, где эстетика усиливает желание' },
      { text: 'Мини-гайд, где человек быстро понимает себя или задачу', weights: { B: 3, F: 1 }, signal: 'тебе близок формат ясного полезного разбора' },
      { text: 'Канал/воронку, где люди постепенно приходят к покупке через контент', weights: { C: 3, D: 1 }, signal: 'ты видишь деньги через внимание, доверие и маршрут' },
      { text: 'Инструмент, форму, калькулятор или автоматизацию', weights: { D: 3, E: 1 }, signal: 'тебе интересна механика, которая выдаёт понятный вывод' }
    ]
  },
  {
    text: 'Какой результат теста тебе был бы реально полезен?',
    answers: [
      { text: 'Понять, какую идею стоит упаковать первой и как её подать', weights: { A: 3, B: 1 }, signal: 'тебе нужен мост от идеи к понятной упаковке' },
      { text: 'Понять, на какой сильной стороне можно заработать без самозванца внутри', weights: { B: 2, F: 2 }, signal: 'тебе важна уверенность, основанная на реальной сильной стороне' },
      { text: 'Понять, где брать внимание и как не утонуть в общении', weights: { C: 3, D: 1 }, signal: 'тебе нужен маршрут продвижения с границами' },
      { text: 'Понять ближайший конкретный шаг: что сделать, проверить или продать', weights: { E: 3, D: 1 }, signal: 'тебе нужен вывод, который сразу переводится в действие' }
    ]
  }
];

let current = 0;
let scores = { ...EMPTY_SCORES };
let answerHistory = [];
let currentResult = null;

const $ = id => document.getElementById(id);

$('startBtn').onclick = () => {
  resetQuizState();
  trackEvent('quiz_start');
  $('start-screen').classList.add('hidden');
  $('question-screen').classList.remove('hidden');
  renderQuestion();
};

$('restartBtn').onclick = () => {
  resetQuizState();
  $('result-screen').classList.add('hidden');
  $('start-screen').classList.remove('hidden');
  location.hash = 'quiz';
};

$('buyBtn').onclick = () => recordInterest();
$('closeModal').onclick = () => closeModal();
$('modalOk').onclick = () => closeModal();
$('interestModal').onclick = e => { if (e.target.id === 'interestModal') closeModal(); };
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function resetQuizState() {
  current = 0;
  scores = { ...EMPTY_SCORES };
  answerHistory = [];
  currentResult = null;
}

function renderQuestion() {
  const question = questions[current];
  $('questionCount').textContent = `Вопрос ${current + 1} из ${questions.length}`;
  $('questionText').textContent = question.text;
  $('progressBar').style.width = `${(current / questions.length) * 100}%`;
  $('answers').innerHTML = question.answers
    .map((answer, index) => `<button class="answer" data-index="${index}">${answer.text}</button>`)
    .join('');
  document.querySelectorAll('.answer').forEach(button => {
    button.onclick = () => choose(Number(button.dataset.index));
  });
}

function choose(answerIndex) {
  const question = questions[current];
  const answer = question.answers[answerIndex];

  Object.entries(answer.weights).forEach(([letter, weight]) => {
    scores[letter] += weight;
  });

  const primary = Object.entries(answer.weights).sort((a, b) => b[1] - a[1])[0][0];
  answerHistory.push({
    question: question.text,
    answer: answer.text,
    weights: answer.weights,
    primary,
    signal: answer.signal
  });

  current += 1;
  if (current < questions.length) renderQuestion();
  else showResult();
}

function getRankedResults() {
  const recencyBonus = answerHistory.reduce((acc, item, index) => {
    acc[item.primary] = (acc[item.primary] || 0) + (index + 1) * 0.015;
    return acc;
  }, {});

  return Object.keys(scores)
    .map(letter => ({
      letter,
      score: scores[letter],
      adjusted: scores[letter] + (recencyBonus[letter] || 0),
      data: archetypes[letter]
    }))
    .sort((a, b) => b.adjusted - a.adjusted);
}

function buildDiagnostic(ranked) {
  const top = ranked[0];
  const second = ranked[1];
  const total = Object.values(scores).reduce((sum, value) => sum + value, 0);
  const share = Math.round((top.score / total) * 100);
  const gap = top.score - second.score;
  let confidence = 'смешанный';
  let confidenceText = 'Результат не “плоский”: у тебя есть несколько рабочих сторон. Главный архетип показывает ведущий способ зарабатывать, а вторичный — важный оттенок.';

  if (share >= 31 && gap >= 7) {
    confidence = 'очень выраженный';
    confidenceText = 'Ответы довольно уверенно сходятся в один паттерн. Это не значит, что другие стороны отсутствуют — просто этот способ создания ценности сейчас самый сильный.';
  } else if (share >= 27 && gap >= 4) {
    confidence = 'выраженный';
    confidenceText = 'У результата есть понятный лидер, но рядом виден второй стиль. Это хорошо: сильные продукты часто собираются на пересечении двух архетипов.';
  }

  return { top, second, share, gap, confidence, confidenceText };
}

function getTopSignals(letter, limit = 3) {
  return answerHistory
    .filter(item => item.weights[letter])
    .sort((a, b) => (b.weights[letter] || 0) - (a.weights[letter] || 0))
    .slice(0, limit)
    .map(item => item.signal);
}

function buildComboText(primary, secondary) {
  const pair = `${primary.letter}${secondary.letter}`;
  const reversePair = `${secondary.letter}${primary.letter}`;
  const custom = {
    AD: 'Твоя сильная связка — креатив + система. Не просто “красиво”, а красиво с логикой: тесты, шаблоны, калькуляторы, лендинги и продукты, где есть понятный механизм.',
    AF: 'Твоя сильная связка — эстетика + смысл. Подходят self-discovery-продукты, атмосферные тесты, визуальные PDF и бренды, где человек чувствует “это про меня”.',
    BD: 'Твоя сильная связка — экспертность + аналитика. Подходят разборы, инструкции, исследования, AI-гайды и продукты, которые экономят человеку ошибки.',
    BE: 'Твоя сильная связка — объяснение + результат. Хороший формат: практичный мини-курс, чек-лист, аудит или услуга, где теория сразу превращается в действие.',
    CD: 'Твоя сильная связка — внимание + система. Это не хаотичный блог, а контент-воронка: посты, тесты, рассылка, сегментация, продукт.',
    CF: 'Твоя сильная связка — контакт + узнавание. Подходят тесты, каналы, истории и мягкие продукты, которые люди хотят пересылать друзьям.',
    DE: 'Твоя сильная связка — система + исполнение. Подходят автоматизации, настройки, таблицы, сервисы под ключ и понятные операционные решения.',
    DF: 'Твоя сильная связка — логика + смысл. Это редкое сочетание для умных тестов, диагностик и персональных разборов: не эзотерика в воздухе, а вывод по структуре.',
    EF: 'Твоя сильная связка — действие + человеческая глубина. Хорошо заходят продукты/услуги, где человек получает не только файл, но и ощущение точного личного шага.'
  };
  return custom[pair] || custom[reversePair] || `Вторичный оттенок “${secondary.data.name}” важен: он показывает, через какую подачу или механику твой главный архетип может стать более продаваемым.`;
}

function showResult() {
  $('progressBar').style.width = '100%';
  const ranked = getRankedResults();
  const diagnostic = buildDiagnostic(ranked);
  const result = diagnostic.top.data;
  const secondary = diagnostic.second.data;
  currentResult = result;

  const signals = getTopSignals(diagnostic.top.letter);
  const comboText = buildComboText(diagnostic.top, diagnostic.second);

  $('question-screen').classList.add('hidden');
  $('result-screen').classList.remove('hidden');
  $('resultTitle').textContent = `Твой денежный архетип — ${result.name}`;
  $('resultSummary').textContent = result.summary;
  $('resultMeta').innerHTML = `
    <span>Уверенность: <strong>${diagnostic.confidence}</strong></span>
    <span>Сила архетипа: <strong>${diagnostic.share}%</strong></span>
    <span>Вторичный оттенок: <strong>${secondary.name}</strong></span>
  `;
  $('resultCombo').classList.remove('hidden');
  $('resultCombo').innerHTML = `<strong>${result.name} + ${secondary.name}:</strong> ${comboText}`;
  $('resultWhy').innerHTML = `
    <h3>Почему такой результат</h3>
    <p>${diagnostic.confidenceText}</p>
    <ul>${signals.map(signal => `<li>${signal}</li>`).join('')}</ul>
  `;
  $('resultProfile').textContent = result.profile;
  $('resultFits').innerHTML = result.fits.map(item => `<li>${item}</li>`).join('');
  $('resultMoney').textContent = result.money;
  $('resultRisk').textContent = result.risk;
  $('resultStep').textContent = result.step;

  trackEvent('quiz_finish', {
    result: result.name,
    secondary: secondary.name,
    confidence: diagnostic.confidence,
    share: diagnostic.share,
    scores,
    answers: answerHistory.map(item => ({ answer: item.answer, primary: item.primary }))
  });
  location.hash = 'quiz';
  $('result-screen').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function recordInterest() {
  const resultKey = currentResult && currentResult.key ? currentResult.key : '';
  const resultName = currentResult ? currentResult.name : 'unknown';
  const payload = {
    result: resultName,
    resultKey,
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

  if (!resultKey) {
    showPaymentIssue('Не удалось определить результат теста. Пройди тест ещё раз — так мы не выдадим неправильный PDF.');
    return;
  }

  localStorage.setItem('velora_selected_pdf', resultKey);
  localStorage.setItem('velora_selected_pdf_name', resultName);

  const buyBtn = $('buyBtn');
  const previousText = buyBtn.textContent;
  buyBtn.disabled = true;
  buyBtn.textContent = 'Открываем оплату…';

  try {
    const response = await fetch(PAYMENT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resultKey, resultName, amount: 199 })
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.confirmationUrl) {
      throw new Error(data.description || data.error || 'payment_api_failed');
    }

    window.location.href = data.confirmationUrl;
  } catch (error) {
    console.error('Payment error:', error);
    buyBtn.disabled = false;
    buyBtn.textContent = previousText;
    showPaymentIssue('Оплата временно не открылась. Мы уже готовим безопасную оплату через ЮKassa. Если ты уже оплатил(а), напиши нам — отправим нужный PDF вручную.');
  }
}

function showPaymentIssue(message) {
  const modal = $('interestModal');
  const title = $('modalTitle');
  const text = document.getElementById('modalText');
  if (title) title.textContent = 'Оплата временно недоступна';
  if (text) text.textContent = message;
  modal.classList.remove('hidden');
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

// Visual layer: premium light reveal, scroll progress and meaningful scroll-story.
(function initVeloraVisuals(){
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' });
    revealItems.forEach(item => io.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('in-view'));
  }

  const progress = document.getElementById('scrollProgress');
  const heroArt = document.querySelector('.hero-art');
  const heroImage = document.querySelector('.hero-art img');
  const storySection = document.querySelector('.story-section');
  const storyCards = Array.from(document.querySelectorAll('.story-card'));
  const mapNodes = Array.from(document.querySelectorAll('.map-node'));
  const pathActive = document.getElementById('mapPathActive');
  const oracleKicker = document.getElementById('oracleKicker');
  const oracleTitle = document.getElementById('oracleTitle');
  const oracleText = document.getElementById('oracleText');
  let currentStoryStep = -1;
  let ticking = false;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const setStoryStep = step => {
    if (!storyCards.length) return;
    const safeStep = clamp(step, 0, storyCards.length - 1);
    if (safeStep === currentStoryStep) return;
    currentStoryStep = safeStep;

    storyCards.forEach(card => card.classList.toggle('active', Number(card.dataset.step) === safeStep));
    mapNodes.forEach(node => node.classList.toggle('active', Number(node.dataset.step) === safeStep));

    const activeCard = storyCards.find(card => Number(card.dataset.step) === safeStep);
    if (activeCard) {
      if (oracleKicker) oracleKicker.textContent = `Станция ${String(safeStep + 1).padStart(2, '0')}`;
      if (oracleTitle) oracleTitle.textContent = activeCard.dataset.title || '';
      if (oracleText) oracleText.textContent = activeCard.dataset.text || '';
    }
  };

  const updateStory = () => {
    if (!storySection || !storyCards.length) return;
    const rect = storySection.getBoundingClientRect();
    const travel = Math.max(1, rect.height - innerHeight);
    const raw = clamp((-rect.top + innerHeight * 0.22) / travel, 0, 1);
    const smoothPath = raw * 850;
    if (pathActive) pathActive.style.strokeDashoffset = `${850 - smoothPath}`;
    const step = clamp(Math.floor(raw * storyCards.length), 0, storyCards.length - 1);
    setStoryStep(step);
  };

  const updateScroll = () => {
    ticking = false;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const ratio = clamp(scrollY / max, 0, 1);
    if (progress) progress.style.width = `${ratio * 100}%`;
    updateStory();

    if (!reducedMotion && heroArt && scrollY < innerHeight * 1.25) {
      heroArt.style.setProperty('--scroll-y', `${scrollY * -0.035}px`);
    }
  };

  const requestUpdate = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateScroll);
    }
  };

  setStoryStep(0);
  updateScroll();
  addEventListener('scroll', requestUpdate, { passive: true });
  addEventListener('resize', requestUpdate);

  mapNodes.forEach(node => {
    node.addEventListener('click', () => {
      const target = storyCards.find(card => card.dataset.step === node.dataset.step);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  if (reducedMotion || !heroArt) return;

  heroArt.addEventListener('pointermove', event => {
    const rect = heroArt.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroArt.style.animationPlayState = 'paused';
    heroArt.style.transform = `translateY(var(--scroll-y, 0px)) perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    if (heroImage) heroImage.style.transform = `scale(1.035) translate(${x * -10}px, ${y * -10}px)`;
  });

  heroArt.addEventListener('pointerleave', () => {
    heroArt.style.animationPlayState = 'running';
    heroArt.style.transform = '';
    if (heroImage) heroImage.style.transform = '';
  });
})();
