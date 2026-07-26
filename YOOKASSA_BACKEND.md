# Velora: правильное подключение ЮKassa через backend

## Почему нужен backend

GitHub Pages — статический сайт. В него нельзя вставлять `YOOKASSA_SECRET_KEY`, потому что любой посетитель увидит ключ в коде.

Правильная схема:

```text
Velora site → /api/create-payment → YooKassa → success.html?pdf=<архетип>
```

Так ЮKassa после оплаты вернёт человека сразу на страницу нужного PDF.

## Где лежит backend

```text
api/create-payment.js
```

Это serverless-функция для Vercel.

## Переменные окружения

В Vercel нужно добавить:

```text
YOOKASSA_SHOP_ID=<ID магазина ЮKassa>
YOOKASSA_SECRET_KEY=<секретный ключ ЮKassa>
PUBLIC_BASE_URL=https://<домен Vercel или будущий домен Velora>
```

Пример `PUBLIC_BASE_URL` после деплоя:

```text
https://velora-money-archetype.vercel.app
```

## Что делает функция

1. Получает архетип из сайта: `creator`, `expert`, `communicator`, `analyst`, `practitioner`, `intuitive`.
2. Создаёт платёж в ЮKassa на 199 ₽.
3. Ставит `return_url` строго под этот архетип:

```text
/success.html?pdf=creator
/success.html?pdf=expert
...
```

4. Возвращает `confirmationUrl`, куда сайт перенаправляет покупателя.

## Важно

Пока сайт открыт на GitHub Pages, `/api/create-payment` там работать не будет. Для полной автоматической оплаты нужно опубликовать проект на Vercel и использовать Vercel-ссылку как основную ссылку Velora.

GitHub Pages можно оставить как резервную/старую версию, но продажи лучше вести на Vercel.
