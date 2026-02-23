/**
 * 那瑪夏小農夫 Apps Script API（MVP Scaffold）
 */
function doGet(e) {
  return handleRequest_('GET', e);
}

function doPost(e) {
  return handleRequest_('POST', e);
}

function handleRequest_(method, e) {
  var route = (e && e.parameter && e.parameter.route) || '/health';
  var requestId = Utilities.getUuid();

  try {
    if (method === 'GET' && route === '/health') return json_({ ok: true, data: { status: 'ok' }, meta: meta_(requestId) });
    if (method === 'GET' && route === '/products') return json_({ ok: true, data: listProducts_(), meta: meta_(requestId) });
    if (method === 'GET' && route === '/inventory/summary') return json_({ ok: true, data: inventorySummary_(), meta: meta_(requestId) });

    return json_({ ok: false, error: { code: 'NOT_FOUND', message: 'Route not found: ' + route }, meta: meta_(requestId) });
  } catch (err) {
    return json_({ ok: false, error: { code: 'INTERNAL_ERROR', message: err.message }, meta: meta_(requestId) });
  }
}

function listProducts_() {
  return [
    { id: 'P-LETTUCE-001', name: '有機奶油萵苣', sell_price: 35, unit: '把' },
    { id: 'P-CABBAGE-001', name: '高麗菜', sell_price: 50, unit: '顆' }
  ];
}

function inventorySummary_() {
  return [
    { product_id: 'P-LETTUCE-001', stock_qty: 52, stock_alert_qty: 15, is_alert: false, sellable_qty: 47 },
    { product_id: 'P-CABBAGE-001', stock_qty: 8, stock_alert_qty: 10, is_alert: true, sellable_qty: 7 }
  ];
}

function meta_(requestId) {
  return {
    requestId: requestId,
    ts: new Date().toISOString()
  };
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
