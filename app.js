// Вставь сюда платёжную ссылку ЮKassa, когда она будет готова.
// В ЮKassa нужно поставить Success/Return URL:
// https://alx504909-alt.github.io/velora-money-archetype/success.html
const PAYMENT_URL = 'https://yookassa.ru/my/i/al9lXdOSJCyY/l';

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
    text: 'Когда ты представляешь свой первый реальный онлайн-доход, что кажется самым естественным?',
    answers: [
      { text: 'Собрать красивый продукт, страницу, шаблон или контент-пак', weights: { A: 3, F: 1 }, signal: 'тебя тянет к форме, упаковке и созданию продукта' },
      { text: 'Объяснить людям тему проще, чем это делают другие', weights: { B: 3, D: 1 }, signal: 'ты видишь ценность в ясности и обучении' },
      { text: 'Раскачать внимание через посты, рекомендации и аудиторию', weights: { C: 3, A: 1 }, signal: 'для тебя важны отклик, доверие и распространение' },
      { text: 'Сделать инструмент, таблицу, автоматизацию или систему', weights: { D: 3, E: 1 }, signal: 'тебе ближе системное решение, а не хаотичное творчество' },
      { text: 'Взять понятную задачу и довести её до результата для клиента', weights: { E: 3, B: 1 }, signal: 'ты опираешься на действие и измеримый результат' },
      { text: 'Создать тест, разбор или атмосферный продукт, где человек узнаёт себя', weights: { F: 3, A: 1 }, signal: 'тебя тянет к смыслу, самоузнаванию и эмоциональному опыту' }
    ]
  },
  {
    text: 'За что тебе было бы не стыдно брать деньги уже в ближайший месяц?',
    answers: [
      { text: 'За упаковку идеи: название, визуал, лендинг, структуру продукта', weights: { A: 3, E: 1 }, signal: 'ты чувствуешь ценность в упаковке и доведении идеи до формы' },
      { text: 'За понятный гайд, чек-лист или объяснение сложной темы', weights: { B: 3, D: 1 }, signal: 'твоя опора — знания, структура и польза' },
      { text: 'За продвижение, контент, тексты или вовлечение аудитории', weights: { C: 3, B: 1 }, signal: 'тебе близка работа с вниманием людей' },
      { text: 'За анализ, сравнение, расчёт, подбор инструментов или автоматизацию', weights: { D: 3, B: 1 }, signal: 'ты доверяешь логике, данным и системности' },
      { text: 'За настройку, сборку, запуск или исправление конкретной проблемы', weights: { E: 3, D: 1 }, signal: 'ты ценишь конкретный результат больше красивых обещаний' },
      { text: 'За персональный разбор, интерпретацию, карту или тест', weights: { F: 3, C: 1 }, signal: 'ты видишь ценность в тонком персональном смысле' }
    ]
  },
  {
    text: 'Что чаще всего мешает тебе зарабатывать на идеях?',
    answers: [
      { text: 'Слишком много идей, сложно выбрать одну и закончить', weights: { A: 3, F: 1 }, signal: 'у тебя много творческого материала, но нужна фокусировка' },
      { text: 'Кажется, что надо ещё доучиться и стать увереннее', weights: { B: 3, D: 1 }, signal: 'тебе важна компетентность, иногда слишком важна' },
      { text: 'Устаю от переписок, продаж и необходимости постоянно быть на связи', weights: { C: 2, F: 1, E: 1 }, signal: 'общение может быть ресурсом, но без системы быстро выжигает' },
      { text: 'Слишком долго сравниваю варианты и не запускаю', weights: { D: 3, B: 1 }, signal: 'анализ сильный, но запуску нужны ограничения' },
      { text: 'Не хочу продавать воздух — нужен понятный результат', weights: { E: 3, D: 1 }, signal: 'ты доверяешь конкретике и факту выполненной работы' },
      { text: 'Сложно объяснить ценность того, что я чувствую и вижу', weights: { F: 3, A: 1 }, signal: 'у тебя есть ощущение смысла, которому нужна ясная формулировка' }
    ]
  },
  {
    text: 'Какой формат тебе проще довести до конца без насилия над собой?',
    answers: [
      { text: 'Визуальный мини-продукт, шаблон, подборка, упаковка', weights: { A: 3, F: 1 }, signal: 'тебе легче завершать продукт, когда есть образ и эстетика' },
      { text: 'Структурный материал: инструкция, урок, чек-лист', weights: { B: 3, E: 1 }, signal: 'тебе подходит формат “разложить по шагам”' },
      { text: 'Серия постов, канал, рассылка или комьюнити', weights: { C: 3, F: 1 }, signal: 'тебе важна живая реакция аудитории' },
      { text: 'Калькулятор, таблица, AI-промпт, система принятия решений', weights: { D: 3, A: 1 }, signal: 'ты тянешься к инструментам, которые дают вывод' },
      { text: 'Пакетная услуга: настроить, собрать, оформить, запустить', weights: { E: 3, D: 1 }, signal: 'тебе проще продавать готовый результат' },
      { text: 'Тест, архетип, карта, разбор личности или стиля', weights: { F: 3, B: 1 }, signal: 'тебе близок формат персонального узнавания' }
    ]
  },
  {
    text: 'Как ты обычно принимаешь решения, когда нет полной ясности?',
    answers: [
      { text: 'Смотрю, какой вариант выглядит живым и вдохновляющим', weights: { A: 2, F: 2 }, signal: 'образ и ощущение для тебя важны не меньше логики' },
      { text: 'Ищу объяснение, примеры и опыт тех, кто уже делал', weights: { B: 3, D: 1 }, signal: 'тебе важно понимать принцип, а не действовать вслепую' },
      { text: 'Спрашиваю людей, смотрю реакцию, тестирую на аудитории', weights: { C: 3, E: 1 }, signal: 'ты опираешься на обратную связь рынка' },
      { text: 'Сравниваю критерии, риски, цифры и сценарии', weights: { D: 3, B: 1 }, signal: 'у тебя сильная рациональная фильтрация' },
      { text: 'Делаю маленькое действие и смотрю, что получится', weights: { E: 3, A: 1 }, signal: 'ты проверяешь реальностью, а не только размышлением' },
      { text: 'Слушаю внутренний отклик, потом ищу форму для него', weights: { F: 3, A: 1 }, signal: 'твоя интуиция работает как ранний фильтр решений' }
    ]
  },
  {
    text: 'Что люди чаще всего получают рядом с тобой?',
    answers: [
      { text: 'Идею, стиль, красивую подачу, ощущение “хочу так же”', weights: { A: 3, C: 1 }, signal: 'ты создаёшь желание через форму и подачу' },
      { text: 'Понимание, порядок в голове, объяснение без воды', weights: { B: 3, D: 1 }, signal: 'ты умеешь переводить сложное в ясное' },
      { text: 'Энергию, контакт, вовлечение, желание обсудить', weights: { C: 3, F: 1 }, signal: 'ты включаешь людей через общение и эмоцию' },
      { text: 'Схему, таблицу, критерии, трезвый взгляд', weights: { D: 3, B: 1 }, signal: 'ты создаёшь порядок там, где был шум' },
      { text: 'Помощь руками: сделать, настроить, довести до конца', weights: { E: 3, D: 1 }, signal: 'ты полезен через действие, а не только совет' },
      { text: 'Точное узнавание себя, глубокий смысл, новый взгляд', weights: { F: 3, B: 1 }, signal: 'ты даёшь людям ощущение внутренней точности' }
    ]
  },
  {
    text: 'Какой тип продукта тебе кажется наиболее продаваемым для старта?',
    answers: [
      { text: 'Красивый цифровой набор с понятным результатом', weights: { A: 3, E: 1 }, signal: 'ты видишь потенциал в упакованной форме' },
      { text: 'Небольшой экспертный материал, который экономит ошибки', weights: { B: 3, D: 1 }, signal: 'ты продаёшь путь короче и понятнее' },
      { text: 'Контент-проект, где сначала собирается внимание', weights: { C: 3, A: 1 }, signal: 'тебе близка модель “аудитория → доверие → продукт”' },
      { text: 'Диагностический инструмент: тест, расчёт, подборка', weights: { D: 3, F: 1 }, signal: 'тебе интересен продукт, который выдаёт вывод на основе данных' },
      { text: 'Фиксированная услуга с быстрым результатом', weights: { E: 3, B: 1 }, signal: 'ты доверяешь продаже конкретного результата' },
      { text: 'Self-discovery продукт: карта, архетип, разбор', weights: { F: 3, A: 1 }, signal: 'тебе близок продукт на стыке смысла и персональности' }
    ]
  },
  {
    text: 'Если проект начнёт расти, что ты скорее захочешь автоматизировать?',
    answers: [
      { text: 'Создание визуалов, шаблонов и повторяемых упаковок', weights: { A: 3, D: 1 }, signal: 'тебе нужна система для масштабирования креатива' },
      { text: 'Выдачу знаний: уроки, базы, чек-листы, ответы', weights: { B: 3, D: 1 }, signal: 'ты хочешь превратить знания в продуктовую систему' },
      { text: 'Воронку контента, рассылку и прогрев', weights: { C: 3, D: 1 }, signal: 'тебе важен поток внимания без ручного выгорания' },
      { text: 'Сбор данных, сегментацию, расчёты и рекомендации', weights: { D: 3, E: 1 }, signal: 'ты мыслишь архитектурой и логикой сервиса' },
      { text: 'Повторяемые операции и выдачу готового результата', weights: { E: 3, D: 1 }, signal: 'ты хочешь масштабировать выполнение, а не только идеи' },
      { text: 'Персональные интерпретации и красивые PDF-разборы', weights: { F: 3, A: 1 }, signal: 'тебе интересна автоматизация персонального опыта' }
    ]
  },
  {
    text: 'Какой контент ты бы смог делать дольше всего?',
    answers: [
      { text: 'Визуальные идеи, подборки, before/after, эстетичные форматы', weights: { A: 3, C: 1 }, signal: 'тебе легче говорить через форму и визуальное желание' },
      { text: 'Объяснения, разборы, инструкции, “как это работает”', weights: { B: 3, D: 1 }, signal: 'ты устойчив в обучающем контенте' },
      { text: 'Живые посты, вопросы, истории, реакции аудитории', weights: { C: 3, F: 1 }, signal: 'тебя питает диалог и отклик' },
      { text: 'Сравнения, рейтинги, исследования, выводы', weights: { D: 3, B: 1 }, signal: 'тебе подходит аналитический контент' },
      { text: 'Практичные инструкции “сделай так” и кейсы результата', weights: { E: 3, B: 1 }, signal: 'твоя сила — прикладная полезность' },
      { text: 'Атмосферные смыслы, архетипы, психологичные наблюдения', weights: { F: 3, A: 1 }, signal: 'ты можешь удерживать внимание через узнавание' }
    ]
  },
  {
    text: 'Что для тебя будет честным обещанием продукта?',
    answers: [
      { text: '“Помогу красиво и понятно упаковать идею”', weights: { A: 3, E: 1 }, signal: 'твоя ценность — оформление идеи в продаваемую форму' },
      { text: '“Объясню проще и дам понятный порядок действий”', weights: { B: 3, D: 1 }, signal: 'твоя ценность — ясность и обучение' },
      { text: '“Помогу привлечь внимание и довести человека до действия”', weights: { C: 3, D: 1 }, signal: 'твоя ценность — движение людей по воронке' },
      { text: '“Разберу данные и покажу самый разумный вариант”', weights: { D: 3, B: 1 }, signal: 'твоя ценность — трезвый выбор и структура' },
      { text: '“Сделаю конкретную вещь под ключ”', weights: { E: 3, A: 1 }, signal: 'твоя ценность — готовый результат' },
      { text: '“Дам точное самоузнавание и первый мягкий шаг”', weights: { F: 3, C: 1 }, signal: 'твоя ценность — смысл, который превращается в действие' }
    ]
  },
  {
    text: 'Что тебе точно НЕ хочется строить?',
    answers: [
      { text: 'Сухую таблицу без образа, стиля и эмоции', weights: { A: 2, F: 2 }, signal: 'тебе важны эстетика и человеческое ощущение продукта' },
      { text: 'Поверхностный инфопродукт без глубины', weights: { B: 3, D: 1 }, signal: 'ты не хочешь продавать пустую упаковку' },
      { text: 'Проект без аудитории и живого отклика', weights: { C: 3, A: 1 }, signal: 'тебе важна реакция людей, а не только производство' },
      { text: 'Хаотичный проект без логики, метрик и системы', weights: { D: 3, E: 1 }, signal: 'тебе нужен порядок, иначе проект кажется ненадёжным' },
      { text: 'Долгую теорию без понятного действия', weights: { E: 3, B: 1 }, signal: 'тебе важно быстро видеть практический эффект' },
      { text: 'Холодный сервис без смысла и человеческой глубины', weights: { F: 3, C: 1 }, signal: 'тебе важен эмоциональный и смысловой слой' }
    ]
  },
  {
    text: 'Какой результат ты хочешь увидеть в конце теста?',
    answers: [
      { text: 'Какую идею продукта мне упаковать первой', weights: { A: 3, E: 1 }, signal: 'тебе нужен вывод, который превращается в продукт' },
      { text: 'В чём моя экспертность и как её монетизировать', weights: { B: 3, C: 1 }, signal: 'тебе важна уверенность в своей пользе' },
      { text: 'Как мне продвигаться без хаоса и лишних созвонов', weights: { C: 3, D: 1 }, signal: 'тебе нужен путь через внимание, но с границами' },
      { text: 'Какая система заработка мне подходит логически', weights: { D: 3, B: 1 }, signal: 'тебе нужен рациональный маршрут' },
      { text: 'Какой первый конкретный пакет/услугу можно продать', weights: { E: 3, A: 1 }, signal: 'тебе нужен ближайший продаваемый результат' },
      { text: 'Какой мой стиль денег и почему он ощущается моим', weights: { F: 3, B: 1 }, signal: 'тебе нужен смысл, который объясняет твой путь' }
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

  if (PAYMENT_URL) {
    window.location.href = PAYMENT_URL;
    return;
  }

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
