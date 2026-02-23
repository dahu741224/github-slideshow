# 那瑪夏小農夫 — Google Sheets 資料表結構（A）

> 設計原則：
> 1. 全部資料表皆有 `id`（字串 UUID）與時間欄位。  
> 2. 數值統一使用數字型別（Apps Script 內 parse / 驗證）。  
> 3. 不做跨表硬刪除，使用狀態欄位保留歷史。  

## 1) `products`（商品主檔）
| 欄位 | 型別 | 說明 | 範例 |
|---|---|---|---|
| id | String | 商品 ID（SKU） | `P-LETTUCE-001` |
| name | String | 商品名稱 | `有機奶油萵苣` |
| category | String | 分類 | `葉菜` |
| unit | String | 單位 | `把` |
| cost_per_unit | Number | 平均成本 | `22` |
| sell_price | Number | 建議售價 | `35` |
| stock_alert_qty | Number | 庫存警戒值 | `15` |
| is_active | Boolean | 是否上架 | `TRUE` |
| created_at | DateTime | 建立時間 | `2026-02-23T08:00:00+08:00` |
| updated_at | DateTime | 更新時間 | `2026-02-23T08:00:00+08:00` |

## 2) `inventory_txns`（庫存異動流水）
| 欄位 | 型別 | 說明 | 範例 |
|---|---|---|---|
| id | String | 異動 ID | `ITX-20260223-0001` |
| product_id | String | 商品 ID | `P-LETTUCE-001` |
| txn_type | Enum | `purchase` / `count_adjust` / `waste` / `sale` / `return` | `purchase` |
| qty_in | Number | 入庫數量 | `120` |
| qty_out | Number | 出庫數量 | `0` |
| unit_cost | Number | 本次成本 | `20` |
| ref_type | String | 來源單據類型 | `po` |
| ref_id | String | 來源單據 ID | `PO-20260223-01` |
| note | String | 備註 | `清晨採收` |
| operator | String | 操作者 | `owner` |
| created_at | DateTime | 建立時間 | `2026-02-23T06:12:00+08:00` |

## 3) `inventory_snapshot`（日盤點快照）
| 欄位 | 型別 | 說明 | 範例 |
|---|---|---|---|
| id | String | 快照 ID | `SNAP-20260223-P-LETTUCE-001` |
| snapshot_date | Date | 日期 | `2026-02-23` |
| product_id | String | 商品 ID | `P-LETTUCE-001` |
| opening_qty | Number | 期初 | `45` |
| closing_qty | Number | 期末 | `52` |
| counted_qty | Number | 實盤 | `50` |
| diff_qty | Number | 差異 | `-2` |
| waste_qty | Number | 損耗 | `3` |
| sellable_qty | Number | 可賣量（扣預留與損耗） | `47` |

## 4) `orders`（訂單主檔：POS + LINE）
| 欄位 | 型別 | 說明 | 範例 |
|---|---|---|---|
| id | String | 訂單 ID | `ORD-20260223-0007` |
| channel | Enum | `pos` / `line` / `web` | `line` |
| customer_name | String | 顧客名稱 | `陳小姐` |
| customer_phone | String | 電話 | `0912xxxxxx` |
| order_status | Enum | `pending` / `accepted` / `preparing` / `completed` / `cancelled` | `accepted` |
| subtotal | Number | 小計 | `420` |
| discount_amount | Number | 折扣金額 | `20` |
| total_amount | Number | 應收 | `400` |
| payment_method | Enum | `cash` / `bank_transfer` / `linepay_reserved` | `linepay_reserved` |
| payment_status | Enum | `unpaid` / `paid` / `refunded` | `unpaid` |
| note | String | 備註 | `17:30 自取` |
| created_at | DateTime | 建立時間 | `2026-02-23T14:15:00+08:00` |
| updated_at | DateTime | 更新時間 | `2026-02-23T14:20:00+08:00` |

## 5) `order_items`（訂單明細）
| 欄位 | 型別 | 說明 | 範例 |
|---|---|---|---|
| id | String | 明細 ID | `OI-20260223-014` |
| order_id | String | 訂單 ID | `ORD-20260223-0007` |
| product_id | String | 商品 ID | `P-LETTUCE-001` |
| product_name | String | 冗餘商品名（歷史保留） | `有機奶油萵苣` |
| qty | Number | 數量 | `8` |
| unit_price | Number | 單價 | `35` |
| unit_cost | Number | 成本 | `22` |
| line_total | Number | 小計 | `280` |

## 6) `payments`（付款紀錄）
| 欄位 | 型別 | 說明 | 範例 |
|---|---|---|---|
| id | String | 付款 ID | `PAY-20260223-003` |
| order_id | String | 訂單 ID | `ORD-20260223-0007` |
| payment_method | Enum | `cash` / `bank_transfer` / `linepay_reserved` | `bank_transfer` |
| paid_amount | Number | 金額 | `400` |
| paid_at | DateTime | 付款時間 | `2026-02-23T15:10:00+08:00` |
| txn_ref | String | 金流編號/末五碼 | `TXN88912` |
| status | Enum | `paid` / `pending` / `failed` | `pending` |

## 7) `daily_close`（日結）
| 欄位 | 型別 | 說明 | 範例 |
|---|---|---|---|
| id | String | 日結 ID | `DC-20260223` |
| close_date | Date | 日結日期 | `2026-02-23` |
| order_count | Number | 訂單數 | `43` |
| gross_sales | Number | 營收總額 | `18230` |
| discount_total | Number | 折扣總額 | `640` |
| net_sales | Number | 淨營收 | `17590` |
| cogs_total | Number | 銷貨成本 | `10920` |
| gross_profit | Number | 毛利 | `6670` |
| waste_cost | Number | 損耗成本 | `920` |
| avg_ticket | Number | 客單價 | `409.1` |
| closed_by | String | 結帳者 | `owner` |
| closed_at | DateTime | 日結時間 | `2026-02-23T21:05:00+08:00` |

## 8) `settings`（系統設定）
| 欄位 | 型別 | 說明 | 範例 |
|---|---|---|---|
| key | String | 設定鍵 | `SHOP_NAME` |
| value | String | 設定值 | `那瑪夏小農夫` |
| updated_at | DateTime | 更新時間 | `2026-02-23T08:00:00+08:00` |
