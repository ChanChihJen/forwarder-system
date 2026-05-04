# 迅捷 Forwarder Wireframe Demo

這是一個可直接開啟的靜態展示網站，用來把 `doc/` 目錄既有 HTML wireframe 整理成客戶可操作的 Demo。

## 如何開啟

直接用瀏覽器開啟 `index.html` 即可，不需要後端、資料庫或登入。

也可以在專案根目錄啟動簡單靜態伺服器：

```bash
python3 -m http.server 8000
```

再開啟 `http://localhost:8000/`。

## 整合來源

- 商業夥伴基本檔：`pages/customer-form.html`，來源 `doc/0.customer_master_wireframe.html`
- Booking 管理：`pages/booking-form.html`，來源 `doc/1-0.booking-quick-quote-to-booking-wireframe-v2.html`
- Booking 多 Job：`pages/booking-multi-job.html`，來源 `doc/1-1.booking-multi-job-management-ocean-air-dual-mode.html`
- Job 管理：`pages/job-detail.html`，來源 `doc/2-0.job-wireframe-ocean-air-dual-mode-full.html`
- Execution Center：`pages/execution-center.html`，來源 `doc/3.execution-center-ocean-air-dual-mode-full-wireframe.html`
- Document Flow：`pages/document-flow.html`，來源 `doc/2-1.document-flow-wireframe.html`
- Document Center：`pages/document-center.html`，來源 `doc/document-center-advanced-wireframe.html`
- AP / AR Charge Management：`pages/ap-ar-charge-management.html`，來源 `doc/5.ap-ar-charge-management-wireframe.html`

`doc/` 原檔保留不動；`pages/` 是客戶展示路由。先前重畫版頁面已移到 `pages/_backup-redesign/`，不放在主展示導覽。

## Mock 操作

Tab 切換、Ocean / Air 模式切換、列表點擊、modal、toast、假儲存、假下載、補傳文件、送審與狀態更新都是前端 mock，不會寫入資料庫。列表頁是延伸入口；主要 detail / workbench 頁面沿用原始 `doc/` wireframe。

## 後續轉正式系統

這些頁面可作為 PHP + FastAdmin + MySQL 的功能討論基礎。建議後續依模組拆成商業夥伴主檔、Booking、Job、Execution、Document、Charge 六個主要功能，再把 mock list、狀態、文件來源與費用帶入規則轉成正式資料表與 API。
