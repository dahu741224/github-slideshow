# 那瑪夏小農夫數位化系統（GitHub Pages + Apps Script）

此資料夾為第 1 週 MVP 的可部署骨架。

## 前端路由（C）
- `/home` 品牌官網
- `/pos` POS 收銀
- `/inventory` 庫存管理
- `/orders` LINE 訂單後台
- `/dashboard` 六維指揮中心

> 在 GitHub Pages 靜態環境建議使用 hash route：`#/home`、`#/pos` ...

## 部署步驟
1. GitHub Pages 指向 `namasia-farmer/`（或將檔案搬到 root）。
2. 部署 Apps Script Web App。
3. 將 `config.js` 的 `API_BASE_URL` 換成實際網址。

## 文件
- `docs/sheets-schema.md`：Google Sheets 表結構（A）
- `docs/api-spec.md`：Apps Script API（B）
- `docs/mvp-week1.md`：第 1 週排程（D）
