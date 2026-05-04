(function () {
  const nav = [
    ["Demo", [
      ["index.html", "Dashboard / Demo 首頁"],
      ["pages/customer-list.html", "商業夥伴基本檔"],
      ["pages/booking-list.html", "Booking 管理"],
      ["pages/booking-multi-job.html", "Booking → 多 Job"]
    ]],
    ["Operation", [
      ["pages/job-list.html", "Job 管理"],
      ["pages/execution-list.html", "Execution List"],
      ["pages/document-flow.html", "Document Flow"],
      ["pages/document-center.html", "Document Center"],
      ["pages/ap-ar-charge-management.html", "AP / AR Charge"]
    ]],
    ["References", [
      ["modules/hbl_template/index.html", "HBL 模板預覽"],
      ["doc/document-center-advanced-wireframe.html", "原始 Wireframes"]
    ]]
  ];

  const pageTitles = {
    "/index.html": "迅捷 Forwarder Demo",
    "/pages/customer-list.html": "商業夥伴基本檔",
    "/pages/customer-form.html": "商業夥伴表單",
    "/pages/booking-list.html": "Booking 管理",
    "/pages/booking-form.html": "Booking Detail",
    "/pages/booking-multi-job.html": "Booking → 多 Job 管理",
    "/pages/job-list.html": "Job 管理",
    "/pages/job-detail.html": "Job Detail",
    "/pages/execution-list.html": "Execution List / Workbench",
    "/pages/execution-center.html": "Execution Center",
    "/pages/document-flow.html": "Document Flow",
    "/pages/document-center.html": "Document Center",
    "/pages/ap-ar-charge-management.html": "AP / AR Charge Management"
  };

  function rel(path) {
    const inPages = location.pathname.includes("/pages/");
    if (path === "index.html") return inPages ? "../index.html" : "index.html";
    if (path.startsWith("pages/")) return inPages ? `../${path}` : path;
    if (path.startsWith("doc/") || path.startsWith("modules/")) return inPages ? `../${path}` : path;
    return path;
  }

  function normalizedPath() {
    const pathname = location.pathname.replace(/\/$/, "/index.html");
    const projectIndex = pathname.indexOf("/forwarder-system/");
    return projectIndex >= 0 ? pathname.slice(projectIndex + "/forwarder-system".length) : pathname;
  }

  function renderLayout() {
    const root = document.querySelector("[data-shell]");
    if (!root) return;
    const current = normalizedPath();
    const content = root.innerHTML;
    const title = document.body.dataset.title || pageTitles[current] || "迅捷 Forwarder Demo";
    const subtitle = document.body.dataset.subtitle || "互動式 Wireframe Demo｜純前端 mock data，可直接開啟展示";

    root.innerHTML = `
      <div class="app-shell">
        <aside class="sidebar">
          <div class="brand">
            <div class="brand-mark">FWD</div>
            <div>
              <div class="brand-title">迅捷進出口管理</div>
              <div class="brand-sub">Wireframe Demo</div>
            </div>
          </div>
          <nav aria-label="Demo navigation">
            ${nav.map(([section, items]) => `
              <div class="nav-section">${section}</div>
              ${items.map(([href, label]) => {
                const target = `/${href}`;
                const active = current === target || (current === "/" && href === "index.html");
                return `<a class="nav-link${active ? " active" : ""}" href="${rel(href)}"><span class="nav-dot"></span>${label}</a>`;
              }).join("")}
            `).join("")}
          </nav>
        </aside>
        <section class="main-shell">
          <header class="topbar">
            <div>
              <h1 class="top-title">${title}</h1>
              <div class="top-subtitle">${subtitle}</div>
            </div>
            <div class="top-actions">
              <button class="btn gray" type="button" data-toast="這是展示原型：所有操作皆為前端 mock">Demo Mode</button>
              <a class="btn soft" href="${rel("index.html")}">回首頁</a>
            </div>
          </header>
          <main class="content">${content}</main>
        </section>
      </div>
      <div class="modal-mask" id="demoModal" role="dialog" aria-modal="true">
        <div class="modal">
          <div class="modal-head">
            <div class="modal-title" id="demoModalTitle">操作示範</div>
            <button class="close-x" type="button" data-close-modal>&times;</button>
          </div>
          <div class="modal-body" id="demoModalBody"></div>
          <div class="modal-foot">
            <button class="btn gray" type="button" data-close-modal>取消</button>
            <button class="btn primary" type="button" data-save-modal>確認</button>
          </div>
        </div>
      </div>
      <div class="toast" id="demoToast"></div>
    `;
  }

  function toast(message) {
    const el = document.getElementById("demoToast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("active");
    clearTimeout(window.__demoToastTimer);
    window.__demoToastTimer = setTimeout(() => el.classList.remove("active"), 2400);
  }

  function openModal(title, body) {
    const modal = document.getElementById("demoModal");
    document.getElementById("demoModalTitle").textContent = title || "操作示範";
    document.getElementById("demoModalBody").innerHTML = body || `
      <div class="grid-2">
        <div><label>狀態</label><select class="select"><option>Draft</option><option>Pending Review</option><option>Confirmed</option></select></div>
        <div><label>負責人</label><input class="field" value="Forwarder Ops"></div>
      </div>
      <div class="divider"></div>
      <label>備註</label><textarea placeholder="此處為 wireframe mock 操作，不會寫入資料庫。"></textarea>
    `;
    modal.classList.add("active");
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      const tab = event.target.closest("[data-tab-target]");
      if (tab) {
        const group = tab.closest("[data-tabs]");
        const target = tab.dataset.tabTarget;
        group.querySelectorAll("[data-tab-target]").forEach((item) => item.classList.toggle("active", item === tab));
        document.querySelectorAll(`[data-tab-panel="${group.dataset.tabs}"]`).forEach((panel) => panel.classList.toggle("active", panel.id === target));
      }

      const mode = event.target.closest("[data-mode]");
      if (mode) {
        const target = mode.dataset.mode;
        const scope = mode.closest("[data-mode-scope]") || document;
        scope.querySelectorAll("[data-mode]").forEach((item) => item.classList.toggle("active", item === mode));
        scope.querySelectorAll("[data-mode-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.modePanel === target));
      }

      const toastBtn = event.target.closest("[data-toast]");
      if (toastBtn) toast(toastBtn.dataset.toast);

      const modalBtn = event.target.closest("[data-modal]");
      if (modalBtn) openModal(modalBtn.dataset.modal, modalBtn.dataset.modalBody);

      if (event.target.closest("[data-close-modal]")) document.getElementById("demoModal").classList.remove("active");
      if (event.target.closest("[data-save-modal]")) {
        document.getElementById("demoModal").classList.remove("active");
        toast("操作已完成，狀態已更新");
      }

      const row = event.target.closest("tr[data-href]");
      if (row && !event.target.closest("a,button,input,select")) location.href = row.dataset.href;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderLayout();
    bindEvents();
  });
})();
