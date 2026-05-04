# agent.md｜迅捷 Forwarder 進出口管理系統 Wireframe 拼接網站指令

## 1. 專案目標

請將目前資料夾內既有的 HTML wireframe 檔案，整理、拼接、改造成一個可讓客戶線上操作與展示的互動式 Wireframe Demo 網站。

本專案的目的不是正式系統開發，也不是產出完整開發規格書，而是建立一個可供客戶、PM、工程師共同討論流程與畫面的高擬真原型。

重點是：

- 讓客戶可以像使用系統一樣點選選單、進入列表、打開表單、切換頁籤、操作按鈕、看到彈窗與狀態變化。
- 保留各 HTML wireframe 內已設計好的業務邏輯、欄位、頁籤、流程說明與互動示範。
- 將分散的 wireframe 統一成同一套網站導覽、視覺風格與頁面路由。
- 不要把 wireframe 改成正式資料庫 CRUD 系統。

## 2. 技術前提

此專案未來實際開發主體會是 PHP + FastAdmin + MySQL，但目前這一階段只需要產生可線上展示的前端 wireframe demo。

請依下列原則執行：

- 不要以 Odoo 模組或 Odoo 架構思考。
- 不要加入真實後端、登入權限、資料庫 migration、API 串接或正式 PHP 邏輯。
- 可以使用純 HTML / CSS / JavaScript。
- 若需要拆檔，請使用靜態網站結構，例如 `index.html`、`pages/*.html`、`assets/*.css`、`assets/*.js`。
- 所有資料使用假資料、範例資料、local mock data 即可。
- 按鈕操作以 modal、toast、tab switch、狀態切換、mock list update 表現，不需真的寫入資料庫。

## 3. 語言與視覺規則

- 介面語言以繁體中文為主，必要時保留英文物流欄位名稱，例如 Job、Booking、HBL、MBL、HAWB、MAWB、SI、AP、AR。
- 風格需延續現有 wireframe：白底卡片、淺藍背景、深藍主色、綠色代表完成、橘色代表待處理、紅色代表異常。
- 保留目前 wireframe 內的 `.topbar`、`.card`、`.tabs`、`.panel`、`.btn`、`.pill` 等視覺語彙，但可以抽成共用 CSS。
- 頁面需可在桌機瀏覽器良好展示，手機響應式可保留基本可讀即可。
- Demo 的畫面重點是「流程理解」與「可操作感」，不是正式 UI 美化。

## 4. 網站資訊架構

請建立一個入口首頁 `index.html`，作為客戶操作 Demo 的主選單。

建議主選單如下：

1. Dashboard / Demo 首頁
2. 商業夥伴基本檔
3. Booking 管理
4. Booking → 多 Job 管理
5. Job 管理
6. Execution Center
7. Document Flow
8. Document Center
9. AP / AR Charge Management
10. HBL / 文件預覽相關頁面（若從 Job 內已完整呈現，可不獨立）

每個功能都需要提供：

- 列表頁：讓客戶理解可查詢、篩選、選取資料。
- 表單頁：讓客戶看到新增 / 編輯的主要欄位、頁籤與操作流程。
- 操作入口：例如「查看」、「編輯」、「轉 Job」、「開啟 Execution」、「查看文件」、「進入費用管理」。
- 狀態展示：例如 Draft、Confirmed、Waiting、Sent、Final、Missing、Closed。

## 5. 必須納入的既有 wireframe 檔案

請優先整合下列檔案，並保留其核心內容與互動：

### 5.1 商業夥伴基本檔

來源檔：

- `doc/0.customer_master_wireframe.html`

整合方向：

- 建立商業夥伴列表頁。
- 點擊列表列或「編輯」後進入現有基本檔表單。
- 保留角色設定、聯絡人、地址主檔、文件用途 Mapping、帳務條件、預設費用、Job 使用紀錄。
- 注意：同一公司可同時具備 Customer、Shipper、Consignee、Notify、Oversea Agent、Supplier、Carrier、Billing Party 等角色。

### 5.2 Booking 管理

來源檔可參考：

- `doc/1-0.booking-quick-quote-to-booking-wireframe-v2.html`
- `doc/1-1.booking-multi-job-management-ocean-air-dual-mode.html`


整合方向：

- 建立 Booking List。
- 建立 Booking Detail。
- 保留 Quick Quote、Quote → Booking、FCL / LCL 決策、Quote 頁籤、下載報價單、轉 Job。
- 保留 Ocean / Air 雙模式。
- Booking 轉 Job 時需能進入「Booking → 多 Job 管理」。
- 一筆 Booking 可能轉成多筆 Job，Ocean 可依 SO / HBL / CBM / 客戶拆分，Air 可依 MAWB / HAWB / CW / 件重尺拆分。

### 5.3 Job 管理

來源檔：

- `doc/2-0.job-wireframe-ocean-air-dual-mode-full.html`

整合方向：

- 建立 Job List。
- 點擊 Job 後進入 Job Detail。
- 保留 Ocean / Air 雙模式切換。
- Job Detail 需保留 Job Summary、Shipment List、Shipment 明細、多段 Routing、Cargo、HBL 管理、Execution 進度、費用摘要、文件摘要。
- Job 頁面不應塞入過多正式操作，Execution、Document、AP/AR 應有獨立入口。
- 從 Job 內可以跳轉：Execution Center、Document Center、AP/AR Charge Management。

### 5.4 Execution Center

來源檔：

- `doc/3.execution-center-ocean-air-dual-mode-full-wireframe.html`

整合方向：

- 建立 Execution List / Workbench。
- 點擊待辦或 Job 後進入 Execution Detail。
- 保留 Ocean / Air 雙模式。
- Ocean 需保留 SI、MBL、出口報關、拖車 / 進倉、On Board。
- Air 需保留 Space、HAWB、進倉、報關、Security、MAWB、Flight、POD 等流程。
- Execution 是操作中心，不只是進度看板。
- 從 Execution 的文件節點可以跳轉 Document Flow 或 Document Center。

### 5.5 Document Flow

來源檔：

- `doc/2-1.document-flow-wireframe.html`

整合方向：

- Document Flow 是文件流程狀態控管頁。  
- 它不取代 Execution Center，也不取代 HBL / MBL 操作頁。
- 主要呈現文件來源、產生、確認、上傳、同步與歸檔流程。
- 從 Job / Execution / Document Center 都應可進入。

### 5.6 Document Center

來源檔：

- `doc/document-center-advanced-wireframe.html`
- `doc/4.document-center-wireframe.html`

整合方向：

- 建議優先使用進階版 `doc/document-center-advanced-wireframe.html`。
- Document Center 是全域文件中心，不需要先進 Job 才能查文件。
- 需保留全域搜尋、篩選、缺件管理、批次操作、文件預覽、版本、歸檔規則、操作記錄。
- 按鈕操作可以用 toast / modal 模擬，例如上傳文件、批次下載、標記歸檔、建立追件。

### 5.7 AP / AR Charge Management

來源檔：

- `doc/5.ap-ar-charge-management-wireframe.html`

整合方向：

- 建立費用管理入口。
- 可從 Job 的費用摘要進入此頁。
- 保留 AR 應收、AP 應付、Quote 帶入、Execution 成本帶入、GP 分析、請款 / 付款、審核流程。
- Job 頁籤只顯示費用摘要，正式費用操作在 AP/AR 獨立頁。

## 6. 頁面拼接規則

請不要只用 iframe 粗暴嵌入所有頁面。若原始檔案本身已使用 iframe / srcdoc，可先保留，但整體網站應盡量整理成可維護的多頁靜態結構。

建議做法：

- `index.html`：Demo 首頁與總覽。
- `pages/customer-list.html`
- `pages/customer-form.html`
- `pages/booking-list.html`
- `pages/booking-form.html`
- `pages/booking-multi-job.html`
- `pages/job-list.html`
- `pages/job-detail.html`
- `pages/execution-list.html`
- `pages/execution-center.html`
- `pages/document-flow.html`
- `pages/document-center.html`
- `pages/ap-ar-charge-management.html`
- `assets/app.css`
- `assets/app.js`

若時間有限，至少先完成：

1. 首頁導覽
2. 各功能列表頁
3. 各既有 wireframe detail 頁可從列表點入
4. 全站一致的頂部導覽與返回入口

## 7. 列表頁設計規則

所有列表頁都應具備基本展示能力：

- 頁面標題與說明
- KPI 或狀態摘要卡片
- 搜尋列
- 篩選區
- 表格列表
- 狀態 badge
- 操作按鈕，例如查看、編輯、複製、進入下一流程

列表頁不需要真的串接資料庫，請使用 5 到 10 筆 mock data。

範例狀態：

- Booking：Inquiry、Quoted、Booking Confirmed、Converted to Job、Cancelled
- Job：Draft、Active、In Execution、Pending Document、Closed
- Execution：Todo、Active、Waiting External、Done、Blocked
- Document：Missing、Draft、Pending Review、Final、Archived
- AP/AR：Draft、Pending Review、Approved、Invoiced、Paid

## 8. 表單頁設計規則

表單頁需保留目前 HTML wireframe 中的頁籤、欄位與流程邏輯。若要整理，請依以下方式：

- Header：顯示單號、狀態、主要操作按鈕。
- Summary：顯示 Job / Booking / Customer / Shipment 摘要。
- Tabs：保留原本頁籤。
- Main Content：保留原始欄位、表格、預覽、流程圖。
- Side Panel：可放待辦、狀態、來源、下一步操作。
- Modal：用於新增、確認、轉換、上傳、下載前提示。
- Toast：用於模擬儲存成功、下載成功、狀態已更新。

## 9. 互動行為要求

請至少實作下列前端互動：

- Tab 切換
- Ocean / Air 模式切換
- 列表點擊進入 Detail
- 返回列表
- Toast 提示
- Modal 開啟 / 關閉
- 假儲存 / 假下載 / 假送出
- 狀態切換，例如 Draft → Sent、Missing → Uploaded、Pending → Confirmed
- 批次選取與批次操作示範
- 表格列 hover / selected 效果

所有互動都只需前端 mock，不需資料庫。

## 10. 導覽與流程連結

請特別建立下列流程連結，讓客戶可以一路操作：

### Booking 到 Job

- Booking List → Booking Detail
- Booking Detail → Quote / Booking Confirmed
- Booking Detail → Booking → 多 Job 管理
- Booking → 多 Job 管理 → 建立 Job
- 建立後 → Job Detail

### Job 到 Execution

- Job List → Job Detail
- Job Detail → Execution 進度摘要
- Job Detail → Execution Center

### Execution 到文件

- Execution Center → SI / MBL / Customs / Trucking / On Board
- Execution Center → Document Flow
- Execution Center → Document Center

### Job 到費用

- Job Detail → 費用摘要
- 費用摘要 → AP/AR Charge Management

### Document Flow 到 Document Center

- Document Flow → 文件清單
- Document Flow → Document Center 搜尋 / 預覽 / 補傳

## 11. 不要做的事

請不要：

- 不要改成 Odoo。
- 不要建立正式資料庫 schema。
- 不要建立正式登入 / 權限系統。
- 不要過度重構導致原本 wireframe 的物流邏輯消失。
- 不要把 Job、Execution、Document、AP/AR 全部塞回單一頁。
- 不要把所有按鈕做成無效果；至少要有 toast 或 modal 表示操作。
- 不要移除 Ocean / Air 雙模式。
- 不要移除 FCL / LCL 決策與 Booking → 多 Job 的邏輯。
- 不要將 HBL 狀態直接綁死在 Job 狀態；HBL 有自己的 Draft、Pending Confirm、Confirmed、Issued、Released、Void 流程。

## 12. 建議交付結果

請產出一個可直接開啟的靜態網站資料夾，至少包含：

```text
/
├─ index.html
├─ agent.md
├─ pages/
│  ├─ customer-list.html
│  ├─ customer-form.html
│  ├─ booking-list.html
│  ├─ booking-form.html
│  ├─ booking-multi-job.html
│  ├─ job-list.html
│  ├─ job-detail.html
│  ├─ execution-list.html
│  ├─ execution-center.html
│  ├─ document-flow.html
│  ├─ document-center.html
│  └─ ap-ar-charge-management.html
├─ assets/
│  ├─ app.css
│  └─ app.js
└─ README.md
```

`README.md` 請簡單說明：

- 如何開啟 demo。
- 哪些頁面是從哪些 wireframe 整合而來。
- 哪些操作是 mock。
- 後續若要轉 PHP + FastAdmin + MySQL，哪些頁面可作為功能討論基礎。

## 13. 驗收標準

完成後請自行檢查：

- 首頁可以進入所有主要功能。
- 每個主要功能都有列表頁與 detail / form 頁。
- 各頁面頂部導覽一致。
- 主要按鈕有互動回饋。
- Ocean / Air 切換可操作。
- Booking → Job → Execution → Document → AP/AR 的路徑可被客戶理解。
- 原本 wireframe 的核心業務內容沒有被刪掉。
- 開啟 `index.html` 即可操作，不需要後端服務。

## 14. 專案定位提醒

這是一個「給客戶討論流程與畫面的線上 Wireframe Demo」，不是正式開發版。

Codex 在修改時應優先追求：

1. 流程可理解
2. 畫面可點擊
3. 頁面可串接
4. 業務邏輯不遺失
5. 工程師之後容易拆成 PHP + FastAdmin + MySQL 的正式功能

