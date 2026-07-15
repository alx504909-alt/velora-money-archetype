# Публикация сегодня

## Вариант A — GitHub Pages через сайт GitHub
1. Создай новый репозиторий: `velora-money-archetype`.
2. Загрузи содержимое папки `/root/velora-money-archetype` в репозиторий.
3. Открой Settings → Pages.
4. Source: `Deploy from a branch`.
5. Branch: `main`, folder: `/root`.
6. Нажми Save.
7. Через 1–3 минуты ссылка будет вида:
   `https://USERNAME.github.io/velora-money-archetype/`

## Вариант B — GitHub через терминал
После создания пустого репозитория на GitHub:

```bash
cd /root/velora-money-archetype
git remote add origin https://github.com/USERNAME/velora-money-archetype.git
git push -u origin main
```

Потом включи GitHub Pages: Settings → Pages → Deploy from branch → main / root.

## Вариант C — Netlify Drop, самый быстрый
1. Открой https://app.netlify.com/drop
2. Перетащи ZIP-файл проекта.
3. Получи публичную ссылку за 1–2 минуты.

Подготовленный ZIP: `/root/velora-money-archetype-publish.zip`

## Проверка после публикации
- Открывается главная страница.
- Работает кнопка “Пройти тест”.
- Можно ответить на 10 вопросов.
- Показывается результат с блоком “Где деньги”.
- Кнопка “Получить PDF за 199 ₽” открывает модалку.
- На мобильном всё читается без горизонтального скролла.

## Важно
Сейчас реальная оплата не подключена. Кнопка PDF за 199 ₽ фиксирует интерес в `localStorage`. Это нормальный MVP-этап перед подключением оплаты.
