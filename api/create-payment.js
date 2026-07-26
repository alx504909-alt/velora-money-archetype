const crypto = require('crypto');

const ARCHETYPES = {
  creator: 'Создатель',
  expert: 'Эксперт',
  communicator: 'Коммуникатор',
  analyst: 'Аналитик',
  practitioner: 'Практик',
  intuitive: 'Интуит'
};

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    json(res, 405, { error: 'method_not_allowed' });
    return;
  }

  const shopId = process.env.YOOKASSA_SHOP_ID;
  const secretKey = process.env.YOOKASSA_SECRET_KEY;
  const publicBaseUrl = (process.env.PUBLIC_BASE_URL || `https://${req.headers.host || ''}`).replace(/\/$/, '');

  if (!shopId || !secretKey) {
    json(res, 500, { error: 'yookassa_env_missing' });
    return;
  }

  let body = {};
  try {
    body = typeof req.body === 'object' && req.body !== null ? req.body : JSON.parse(req.body || '{}');
  } catch (error) {
    json(res, 400, { error: 'invalid_json' });
    return;
  }

  const resultKey = String(body.resultKey || '').trim();
  const resultName = ARCHETYPES[resultKey];

  if (!resultName) {
    json(res, 400, { error: 'invalid_result_key' });
    return;
  }

  const returnUrl = `${publicBaseUrl}/success.html?pdf=${encodeURIComponent(resultKey)}`;
  const idempotenceKey = crypto.randomUUID();
  const auth = Buffer.from(`${shopId}:${secretKey}`).toString('base64');

  const paymentPayload = {
    amount: {
      value: '199.00',
      currency: 'RUB'
    },
    capture: true,
    confirmation: {
      type: 'redirect',
      return_url: returnUrl
    },
    description: `Velora — PDF-разбор: ${resultName}`,
    metadata: {
      product: 'velora_pdf',
      resultKey,
      resultName
    }
  };

  try {
    const response = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Idempotence-Key': idempotenceKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentPayload)
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      json(res, response.status, {
        error: 'yookassa_error',
        status: response.status,
        description: data.description || data.message || 'YooKassa request failed'
      });
      return;
    }

    const confirmationUrl = data && data.confirmation && data.confirmation.confirmation_url;
    if (!confirmationUrl) {
      json(res, 502, { error: 'confirmation_url_missing' });
      return;
    }

    json(res, 200, {
      paymentId: data.id,
      resultKey,
      resultName,
      returnUrl,
      confirmationUrl
    });
  } catch (error) {
    json(res, 500, { error: 'payment_create_failed', description: error.message });
  }
};
