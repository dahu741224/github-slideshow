# 那瑪夏小農夫 — 第 1 週 MVP 開發清單（D）

## Day 1（需求凍結 + 資料表）
- 建立 Google Sheet（8 張表）
- 完成欄位與資料驗證（enum、數字）
- 寫入 20 筆測試商品、3 筆測試訂單

## Day 2（Apps Script 基礎）
- 建立 `doGet/doPost` 路由分派
- 完成 `/products`、`/inventory/summary`
- 完成共用回應格式與錯誤碼

## Day 3（POS 最小可用）
- 前端 `/pos` 頁面
- 商品選取、加減數量、折扣、建立訂單
- 寫入 `orders` + `order_items` + `inventory_txns(sale)`

## Day 4（庫存管理）
- `/inventory` 頁面：進貨、盤點、損耗
- 庫存警戒提示與可賣量欄位
- 完成 `POST /inventory/txn`、`POST /inventory/count`

## Day 5（LINE 訂單）
- 簡化下單頁（先不接真實 LIFF，先留 LIFF ID 設定）
- `POST /line/orders` 寫入 `orders`
- `/orders` 後台更新狀態

## Day 6（Dashboard + 日結）
- `/dashboard` KPI 卡片與趨勢圖（近 7 日）
- 完成 `GET /dashboard/kpi`、`/reports/daily-close`

## Day 7（驗收 + 部署）
- SOP 串測：進貨→POS 銷售→日結→Dashboard
- GitHub Pages 部署前端
- Apps Script 發布 Web App，填入前端 `API_BASE_URL`
