(function () {
  const layoutConfig = {
    title: "HBL 模板管理系統",
    menu: [
      { id: "hbl-data", label: "HBL 資料管理" },
      { id: "template-management", label: "HBL 模板管理" },
      { id: "rules", label: "模板套用規則" },
      { id: "preview", label: "HTML 預覽" }
    ]
  };

  function createLayout(options = {}) {
    const root = document.getElementById(options.rootId || "app");
    if (!root) return;

    root.innerHTML = `
      <div class="app-shell">
        <aside class="sidebar">
          <div class="sidebar-brand">
            <span class="brand-mark">HBL</span>
            <span>Template Admin</span>
          </div>
          <nav class="sidebar-nav" aria-label="Primary"></nav>
        </aside>
        <section class="main-shell">
          <header class="top-header">
            <h1 class="header-title">${layoutConfig.title}</h1>
            <div class="header-meta">
              <span>Mock Data Demo</span>
              <span class="user-chip"><span class="avatar">OP</span>Forwarder Ops</span>
            </div>
          </header>
          <main class="content" id="mainContent"></main>
        </section>
      </div>
    `;

    const nav = root.querySelector(".sidebar-nav");
    layoutConfig.menu.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `nav-item${index === 0 ? " is-active" : ""}`;
      button.dataset.page = item.id;
      button.textContent = item.label;
      nav.appendChild(button);
    });
  }

  function setActiveNav(pageId) {
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.toggle("is-active", item.dataset.page === pageId);
    });
  }

  window.HBLLayout = {
    createLayout,
    setActiveNav,
    menu: layoutConfig.menu
  };
})();
