(function () {
  const templates = [
    {
      id: "general",
      name: "General HBL Template",
      type: "General",
      desc: "一般客戶與標準航線使用，版面簡潔，適合快速確認主要欄位。",
      active: true
    },
    {
      id: "lc",
      name: "LC HBL Template",
      type: "Letter of Credit",
      desc: "信用狀文件使用，欄位排列更正式，框線與簽核區更清楚。",
      active: true
    },
    {
      id: "usa",
      name: "USA HBL Template",
      type: "USA Filing",
      desc: "美國航線使用，加入 AMS、ISF、HS Code 等申報資訊區塊。",
      active: true
    }
  ];

  const hblRows = [
    {
      hbl_no: "HBL-TPE-240001",
      customer: "Pacific Star Trading",
      shipper: "Taiwan Precision Parts Co., Ltd.",
      consignee: "Pacific Star Trading LLC",
      notify_party: "Pacific Star Customs Broker",
      port_of_loading: "Keelung, Taiwan",
      port_of_discharge: "Los Angeles, USA",
      place_of_delivery: "Dallas, TX",
      vessel: "EVER FRONT",
      voyage: "091E",
      goods_description: "Auto parts and industrial components packed in cartons.",
      gross_weight: "12,480 KGS",
      measurement: "58.32 CBM",
      freight_term: "Freight Prepaid",
      incoterms: "FOB",
      issue_date: "2026-04-25",
      ams_info: "SCAC: EVRG / AMS HB/L filed",
      isf_info: "ISF 10+2 completed by consignee broker",
      hs_code: "8708.99",
      template: "USA HBL Template",
      status: "已套用"
    },
    {
      hbl_no: "HBL-TXG-240018",
      customer: "Green Ocean Foods",
      shipper: "Formosa Food Export Co.",
      consignee: "Green Ocean Foods BV",
      notify_party: "Same as Consignee",
      port_of_loading: "Taichung, Taiwan",
      port_of_discharge: "Rotterdam, Netherlands",
      place_of_delivery: "Rotterdam CFS",
      vessel: "COSCO HOPE",
      voyage: "223W",
      goods_description: "Frozen prepared food in reefer container.",
      gross_weight: "19,200 KGS",
      measurement: "66.10 CBM",
      freight_term: "Freight Collect",
      incoterms: "CIF",
      issue_date: "2026-04-24",
      ams_info: "N/A",
      isf_info: "N/A",
      hs_code: "1604.20",
      template: "LC HBL Template",
      status: "待確認"
    },
    {
      hbl_no: "HBL-KHH-240043",
      customer: "Metro Retail Group",
      shipper: "Bright Living Manufacturing",
      consignee: "Metro Retail Group Pty Ltd",
      notify_party: "Metro Logistics Team",
      port_of_loading: "Kaohsiung, Taiwan",
      port_of_discharge: "Sydney, Australia",
      place_of_delivery: "Sydney Warehouse",
      vessel: "ONE TRIUMPH",
      voyage: "157S",
      goods_description: "Household goods and plastic storage boxes.",
      gross_weight: "8,920 KGS",
      measurement: "46.80 CBM",
      freight_term: "Freight Prepaid",
      incoterms: "EXW",
      issue_date: "2026-04-23",
      ams_info: "N/A",
      isf_info: "N/A",
      hs_code: "3924.90",
      template: "General HBL Template",
      status: "草稿"
    }
  ];

  const rules = [
    {
      name: "USA 航線預設模板",
      customer: "All Customers",
      lane: "Trans-Pacific",
      pol: "Taiwan",
      pod: "USA",
      incoterms: "FOB / EXW",
      template: "USA HBL Template",
      priority: 1,
      status: "啟用"
    },
    {
      name: "信用狀客戶模板",
      customer: "Green Ocean Foods",
      lane: "Asia-Europe",
      pol: "Taichung",
      pod: "Rotterdam",
      incoterms: "CIF",
      template: "LC HBL Template",
      priority: 2,
      status: "啟用"
    },
    {
      name: "一般出口預設",
      customer: "All Customers",
      lane: "General",
      pol: "Any",
      pod: "Any",
      incoterms: "Any",
      template: "General HBL Template",
      priority: 9,
      status: "啟用"
    }
  ];

  const variables = [
    "{{hbl_no}}",
    "{{shipper}}",
    "{{consignee}}",
    "{{notify_party}}",
    "{{port_of_loading}}",
    "{{port_of_discharge}}",
    "{{place_of_delivery}}",
    "{{vessel}}",
    "{{voyage}}",
    "{{goods_description}}",
    "{{gross_weight}}",
    "{{measurement}}",
    "{{freight_term}}",
    "{{issue_date}}",
    "{{ams_info}}",
    "{{isf_info}}",
    "{{hs_code}}"
  ];

  let selectedHbl = hblRows[0];
  let selectedTemplate = "general";

  document.addEventListener("DOMContentLoaded", () => {
    window.HBLLayout.createLayout({ rootId: "app" });
    renderPages();
    bindGlobalEvents();
    showPage("hbl-data");
  });

  function bindGlobalEvents() {
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.addEventListener("click", () => showPage(item.dataset.page));
    });
  }

  function renderPages() {
    const main = document.getElementById("mainContent");
    main.innerHTML = `
      ${renderHblDataPage()}
      ${renderTemplateManagementPage()}
      ${renderTemplateEditorPage()}
      ${renderRulesPage()}
      ${renderPreviewPage()}
    `;

    bindModuleEvents();
    renderPreviewDocument();
  }

  function showPage(pageId) {
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.toggle("is-active", page.id === `page-${pageId}`);
    });
    window.HBLLayout.setActiveNav(pageId);
  }

  function renderHblDataPage() {
    const rows = hblRows
      .map((row, index) => `
        <tr>
          <td><strong>${row.hbl_no}</strong></td>
          <td>${row.customer}</td>
          <td>${row.shipper}</td>
          <td>${row.consignee}</td>
          <td>${row.port_of_loading}</td>
          <td>${row.port_of_discharge}</td>
          <td>${row.vessel} / ${row.voyage}</td>
          <td>${row.template}</td>
          <td>${statusBadge(row.status)}</td>
          <td>
            <div class="actions">
              <button class="btn btn-outline btn-sm" type="button">編輯</button>
              <button class="btn btn-soft btn-sm js-select-template" type="button" data-index="${index}">選擇模板</button>
              <button class="btn btn-primary btn-sm js-preview" type="button" data-index="${index}">預覽 HTML</button>
              <button class="btn btn-outline btn-sm" type="button">匯出 HTML</button>
            </div>
          </td>
        </tr>
      `)
      .join("");

    return `
      <section class="page" id="page-hbl-data">
        <div class="page-header">
          <div>
            <h2 class="page-title">HBL 資料管理</h2>
            <p class="page-subtitle">管理 HBL 資料、套用模板並產生 HTML 文件。</p>
          </div>
          <button class="btn btn-primary" type="button">新增 HBL</button>
        </div>
        <div class="stats-grid">
          <div class="card stat-card"><div class="stat-label">總筆數</div><div class="stat-value">${hblRows.length}</div></div>
          <div class="card stat-card"><div class="stat-label">已套用模板</div><div class="stat-value">1</div></div>
          <div class="card stat-card"><div class="stat-label">待確認</div><div class="stat-value">1</div></div>
          <div class="card stat-card"><div class="stat-label">草稿</div><div class="stat-value">1</div></div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">HBL 清單</h3>
            <div class="toolbar-group">
              <button class="btn btn-outline btn-sm" type="button">篩選</button>
              <button class="btn btn-outline btn-sm" type="button">批次匯出</button>
            </div>
          </div>
          <div class="card-body">
            <div class="table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>HBL No.</th>
                    <th>客戶</th>
                    <th>Shipper</th>
                    <th>Consignee</th>
                    <th>POL</th>
                    <th>POD</th>
                    <th>Vessel / Voyage</th>
                    <th>套用模板</th>
                    <th>狀態</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>${rows}</tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderTemplateManagementPage() {
    const cards = templates
      .map((template) => `
        <article class="card template-card">
          <div class="template-top">
            <div>
              <h3 class="template-name">${template.name}</h3>
              <div class="template-type">${template.type}</div>
            </div>
            ${template.active ? statusBadge("啟用") : statusBadge("停用")}
          </div>
          <div class="template-desc">${template.desc}</div>
          <div class="actions">
            <button class="btn btn-outline btn-sm js-edit-template" type="button" data-template="${template.id}">編輯</button>
            <button class="btn btn-primary btn-sm js-template-preview" type="button" data-template="${template.id}">預覽</button>
            <button class="btn btn-danger btn-sm" type="button">停用</button>
          </div>
        </article>
      `)
      .join("");

    return `
      <section class="page" id="page-template-management">
        <div class="page-header">
          <div>
            <h2 class="page-title">HBL 模板管理</h2>
            <p class="page-subtitle">維護不同情境使用的 HBL HTML 模板。</p>
          </div>
          <button class="btn btn-primary js-edit-template" type="button" data-template="general">新增模板</button>
        </div>
        <div class="template-grid">${cards}</div>
      </section>
    `;
  }

  function renderTemplateEditorPage() {
    return `
      <section class="page" id="page-template-editor">
        <div class="page-header">
          <div>
            <h2 class="page-title">模板編輯</h2>
            <p class="page-subtitle">編輯模板基本資料、HTML 與 CSS，並套用可用變數。</p>
          </div>
          <div class="toolbar-group">
            <button class="btn btn-outline js-back-templates" type="button">返回模板管理</button>
            <button class="btn btn-primary" type="button">儲存模板</button>
          </div>
        </div>
        <div class="editor-layout">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">模板內容</h3>
            </div>
            <div class="card-body">
              <div class="form-grid">
                <div class="form-field">
                  <label for="templateName">模板名稱</label>
                  <input class="input" id="templateName" type="text" value="General HBL Template">
                </div>
                <div class="form-field">
                  <label for="templateType">模板類型</label>
                  <select class="select" id="templateType">
                    <option>General</option>
                    <option>Letter of Credit</option>
                    <option>USA Filing</option>
                  </select>
                </div>
                <div class="form-field full">
                  <label for="htmlEditor">HTML 編輯區</label>
                  <textarea class="textarea" id="htmlEditor">&lt;section class="hbl-doc"&gt;
  &lt;h1&gt;House Bill of Lading&lt;/h1&gt;
  &lt;p&gt;HBL No: {{hbl_no}}&lt;/p&gt;
  &lt;p&gt;Shipper: {{shipper}}&lt;/p&gt;
  &lt;p&gt;Consignee: {{consignee}}&lt;/p&gt;
&lt;/section&gt;</textarea>
                </div>
                <div class="form-field full">
                  <label for="cssEditor">CSS 編輯區</label>
                  <textarea class="textarea" id="cssEditor">.hbl-doc {
  font-family: Arial, sans-serif;
  border: 1px solid #222;
  padding: 32px;
}

.hbl-doc h1 {
  text-align: center;
}</textarea>
                </div>
              </div>
            </div>
          </div>
          <aside class="card">
            <div class="card-header">
              <h3 class="card-title">可用變數列表</h3>
            </div>
            <div class="card-body">
              <div class="variables-list">
                ${variables.map((item) => `<button class="variable-pill" type="button">${item}</button>`).join("")}
              </div>
            </div>
          </aside>
        </div>
      </section>
    `;
  }

  function renderRulesPage() {
    const rows = rules
      .map((rule) => `
        <tr>
          <td><strong>${rule.name}</strong></td>
          <td>${rule.customer}</td>
          <td>${rule.lane}</td>
          <td>${rule.pol}</td>
          <td>${rule.pod}</td>
          <td>${rule.incoterms}</td>
          <td>${rule.template}</td>
          <td>${rule.priority}</td>
          <td>${statusBadge(rule.status)}</td>
        </tr>
      `)
      .join("");

    return `
      <section class="page" id="page-rules">
        <div class="page-header">
          <div>
            <h2 class="page-title">模板套用規則</h2>
            <p class="page-subtitle">依客戶、航線與條件自動指定模板。</p>
          </div>
          <button class="btn btn-primary" type="button">新增規則</button>
        </div>
        <div class="info-note">系統會依條件自動選擇模板，優先順序數字越小越早套用。</div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">規則清單</h3>
          </div>
          <div class="card-body">
            <div class="table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>規則名稱</th>
                    <th>客戶</th>
                    <th>航線</th>
                    <th>POL</th>
                    <th>POD</th>
                    <th>Incoterms</th>
                    <th>指定模板</th>
                    <th>優先順序</th>
                    <th>狀態</th>
                  </tr>
                </thead>
                <tbody>${rows}</tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderPreviewPage() {
    return `
      <section class="page" id="page-preview">
        <div class="page-header">
          <div>
            <h2 class="page-title">HTML 預覽</h2>
            <p class="page-subtitle">使用 mock HBL 資料即時預覽不同模板的文件外觀。</p>
          </div>
          <button class="btn btn-outline" type="button">匯出 HTML</button>
        </div>
        <div class="preview-layout">
          <aside class="card">
            <div class="card-header">
              <h3 class="card-title">HBL 資料摘要</h3>
            </div>
            <div class="card-body">
              <div class="form-field">
                <label for="previewTemplate">模板選擇</label>
                <select class="select" id="previewTemplate">
                  ${templates.map((template) => `<option value="${template.id}">${template.name}</option>`).join("")}
                </select>
              </div>
              <div class="summary-list" id="hblSummary"></div>
            </div>
          </aside>
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">模擬 HBL 文件</h3>
              <span class="badge badge-muted" id="previewTemplateLabel">General</span>
            </div>
            <div class="document-stage">
              <div id="documentPreview"></div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function bindModuleEvents() {
    document.querySelectorAll(".js-preview").forEach((button) => {
      button.addEventListener("click", () => {
        selectedHbl = hblRows[Number(button.dataset.index)];
        selectedTemplate = resolveTemplateId(selectedHbl.template);
        updatePreviewControls();
        showPage("preview");
      });
    });

    document.querySelectorAll(".js-select-template").forEach((button) => {
      button.addEventListener("click", () => {
        selectedHbl = hblRows[Number(button.dataset.index)];
        selectedTemplate = resolveTemplateId(selectedHbl.template);
        updatePreviewControls();
        showPage("preview");
      });
    });

    document.querySelectorAll(".js-template-preview").forEach((button) => {
      button.addEventListener("click", () => {
        selectedTemplate = button.dataset.template;
        updatePreviewControls();
        showPage("preview");
      });
    });

    document.querySelectorAll(".js-edit-template").forEach((button) => {
      button.addEventListener("click", () => {
        const template = templates.find((item) => item.id === button.dataset.template) || templates[0];
        document.getElementById("templateName").value = template.name;
        document.getElementById("templateType").value = template.type;
        showPage("template-editor");
      });
    });

    document.querySelector(".js-back-templates").addEventListener("click", () => showPage("template-management"));

    document.getElementById("previewTemplate").addEventListener("change", (event) => {
      selectedTemplate = event.target.value;
      renderPreviewDocument();
    });
  }

  function updatePreviewControls() {
    const select = document.getElementById("previewTemplate");
    if (select) select.value = selectedTemplate;
    renderPreviewDocument();
  }

  function renderPreviewDocument() {
    const preview = document.getElementById("documentPreview");
    const summary = document.getElementById("hblSummary");
    const label = document.getElementById("previewTemplateLabel");
    if (!preview || !summary || !label) return;

    const template = templates.find((item) => item.id === selectedTemplate) || templates[0];
    label.textContent = template.type;
    summary.innerHTML = renderSummary(selectedHbl);

    if (selectedTemplate === "lc") {
      preview.innerHTML = renderLcDocument(selectedHbl);
      return;
    }

    if (selectedTemplate === "usa") {
      preview.innerHTML = renderUsaDocument(selectedHbl);
      return;
    }

    preview.innerHTML = renderGeneralDocument(selectedHbl);
  }

  function renderSummary(row) {
    const items = [
      ["HBL No.", row.hbl_no],
      ["客戶", row.customer],
      ["Shipper", row.shipper],
      ["Consignee", row.consignee],
      ["POL / POD", `${row.port_of_loading} → ${row.port_of_discharge}`],
      ["Vessel / Voyage", `${row.vessel} / ${row.voyage}`],
      ["Freight Term", row.freight_term]
    ];

    return items
      .map(([label, value]) => `
        <div class="summary-item">
          <div class="summary-label">${label}</div>
          <div class="summary-value">${value}</div>
        </div>
      `)
      .join("");
  }

  function renderGeneralDocument(row) {
    return `
      <article class="hbl-document document-general">
        ${documentHeader(row, "House Bill of Lading", "General HBL Template")}
        <table class="doc-table">
          <tbody>
            <tr><th>Shipper</th><td>${row.shipper}</td><th>Consignee</th><td>${row.consignee}</td></tr>
            <tr><th>Notify Party</th><td>${row.notify_party}</td><th>Freight Term</th><td>${row.freight_term}</td></tr>
            <tr><th>POL</th><td>${row.port_of_loading}</td><th>POD</th><td>${row.port_of_discharge}</td></tr>
            <tr><th>Place of Delivery</th><td>${row.place_of_delivery}</td><th>Vessel / Voyage</th><td>${row.vessel} / ${row.voyage}</td></tr>
            <tr><th>Description</th><td colspan="3">${row.goods_description}</td></tr>
            <tr><th>Gross Weight</th><td>${row.gross_weight}</td><th>Measurement</th><td>${row.measurement}</td></tr>
          </tbody>
        </table>
        ${documentFooter()}
      </article>
    `;
  }

  function renderLcDocument(row) {
    return `
      <article class="hbl-document document-lc">
        ${documentHeader(row, "House Bill of Lading", "Letter of Credit Presentation Copy")}
        <div class="doc-section-title">Parties</div>
        <table class="doc-table">
          <tbody>
            <tr><th>Shipper</th><td colspan="3">${row.shipper}</td></tr>
            <tr><th>Consignee</th><td colspan="3">${row.consignee}</td></tr>
            <tr><th>Notify Party</th><td colspan="3">${row.notify_party}</td></tr>
          </tbody>
        </table>
        <div class="doc-section-title">Transport Details</div>
        <table class="doc-table">
          <tbody>
            <tr><th>Port of Loading</th><td>${row.port_of_loading}</td><th>Port of Discharge</th><td>${row.port_of_discharge}</td></tr>
            <tr><th>Place of Delivery</th><td>${row.place_of_delivery}</td><th>Vessel / Voyage</th><td>${row.vessel} / ${row.voyage}</td></tr>
            <tr><th>Freight Term</th><td>${row.freight_term}</td><th>Issue Date</th><td>${row.issue_date}</td></tr>
          </tbody>
        </table>
        <div class="doc-section-title">Cargo Description</div>
        <table class="doc-table">
          <tbody>
            <tr><th>Goods Description</th><td colspan="3">${row.goods_description}</td></tr>
            <tr><th>Gross Weight</th><td>${row.gross_weight}</td><th>Measurement</th><td>${row.measurement}</td></tr>
          </tbody>
        </table>
        ${documentFooter()}
      </article>
    `;
  }

  function renderUsaDocument(row) {
    return `
      <article class="hbl-document document-usa">
        ${documentHeader(row, "House Bill of Lading", "USA Filing Template")}
        <table class="doc-table">
          <tbody>
            <tr><th>Shipper</th><td>${row.shipper}</td><th>Consignee</th><td>${row.consignee}</td></tr>
            <tr><th>Notify Party</th><td>${row.notify_party}</td><th>Freight Term</th><td>${row.freight_term}</td></tr>
            <tr><th>POL</th><td>${row.port_of_loading}</td><th>POD</th><td>${row.port_of_discharge}</td></tr>
            <tr><th>Place of Delivery</th><td>${row.place_of_delivery}</td><th>Vessel / Voyage</th><td>${row.vessel} / ${row.voyage}</td></tr>
            <tr><th>Description</th><td colspan="3">${row.goods_description}</td></tr>
            <tr><th>Gross Weight</th><td>${row.gross_weight}</td><th>Measurement</th><td>${row.measurement}</td></tr>
          </tbody>
        </table>
        <div class="usa-blocks">
          <div class="usa-block"><strong>AMS Info</strong>${row.ams_info}</div>
          <div class="usa-block"><strong>ISF Info</strong>${row.isf_info}</div>
          <div class="usa-block"><strong>HS Code</strong>${row.hs_code}</div>
        </div>
        ${documentFooter()}
      </article>
    `;
  }

  function documentHeader(row, title, subtitle) {
    return `
      <header class="doc-header">
        <div>
          <h3 class="doc-title">${title}</h3>
          <div class="doc-subtitle">${subtitle}</div>
        </div>
        <div class="doc-no">
          <div>HBL No.</div>
          <div>${row.hbl_no}</div>
          <div class="doc-subtitle">Issue Date: ${row.issue_date}</div>
        </div>
      </header>
    `;
  }

  function documentFooter() {
    return `
      <footer class="doc-footer">
        <div class="signature-line">Carrier / Agent Signature</div>
        <div class="signature-line">Authorized Signature</div>
      </footer>
    `;
  }

  function statusBadge(status) {
    const className = status === "啟用" || status === "已套用"
      ? "badge-success"
      : status === "待確認"
        ? "badge-warning"
        : "badge-muted";
    return `<span class="badge ${className}">${status}</span>`;
  }

  function resolveTemplateId(templateName) {
    const match = templates.find((template) => template.name === templateName);
    return match ? match.id : "general";
  }
})();
