# 那瑪夏小農夫 — Apps Script API 設計（B）

Base URL（部署後）：
`https://script.google.com/macros/s/{DEPLOYMENT_ID}/exec`

## 通用規格
- Header: `Content-Type: application/json`
- Response:
```json
{ "ok": true, "data": {}, "meta": { "requestId": "...", "ts": "..." } }
```
- Error:
```json
{ "ok": false, "error": { "code": "VALIDATION_ERROR", "message": "..." } }
```

---

## Inventory
### `GET /inventory/summary`
- 說明：讀取每個商品的即時庫存、警戒狀態、可賣量
- Query：`date=YYYY-MM-DD`（optional）

### `POST /inventory/txn`
- 說明：新增庫存異動（進貨/盤點調整/損耗）
- Request
```json
{
  "product_id": "P-LETTUCE-001",
  "txn_type": "purchase",
  "qty_in": 50,
  "qty_out": 0,
  "unit_cost": 21,
  "note": "早市進貨",
  "operator": "owner"
}
```

### `POST /inventory/count`
- 說明：提交盤點

---

## POS / Orders
### `GET /products`
- 說明：POS 快速選品列表

### `POST /orders`
- 說明：建立訂單（POS / LINE 共用）
- Request
```json
{
  "channel": "pos",
  "customer_name": "現場客",
  "items": [
    {"product_id": "P-LETTUCE-001", "qty": 2, "unit_price": 35}
  ],
  "discount_amount": 5,
  "payment_method": "cash",
  "note": ""
}
```

### `PATCH /orders/{id}/status`
- 說明：更新狀態（接單/出單/完成）

### `POST /orders/{id}/pay`
- 說明：紀錄付款（現金/轉帳/LinePay 先預留）

### `GET /reports/daily-close?date=YYYY-MM-DD`
- 說明：日結報表

---

## LINE 訂單
### `POST /line/orders`
- 說明：LIFF 表單送單；實作上可代理到 `POST /orders`，`channel=line`

### `GET /line/orders?status=pending`
- 說明：店家後台待處理訂單

---

## Dashboard
### `GET /dashboard/kpi?date=YYYY-MM-DD`
- 回傳：今日營收、毛利、損耗、庫存警戒數、客單價

### `GET /dashboard/top-products?range=7d`
- 回傳：熱賣品排行

### `GET /dashboard/trends?metric=net_sales&range=30d`
- 回傳：趨勢圖資料
