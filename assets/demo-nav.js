(function () {
  const byPage = {
    "customer-list.html": [
      ["../index.html", "Demo 首頁"],
      ["customer-form.html", "開啟商業夥伴表單", true],
      ["booking-list.html", "Booking 管理"]
    ],
    "customer-form.html": [
      ["../index.html", "Demo 首頁"],
      ["customer-list.html", "返回列表"],
      ["booking-list.html", "下一步：Booking", true]
    ],
    "booking-list.html": [
      ["../index.html", "Demo 首頁"],
      ["booking-form.html", "開啟 Booking Detail", true],
      ["booking-multi-job.html", "多 Job 管理"]
    ],
    "booking-form.html": [
      ["../index.html", "Demo 首頁"],
      ["booking-list.html", "返回 Booking List"],
      ["booking-multi-job.html", "下一步：多 Job", true]
    ],
    "booking-multi-job.html": [
      ["booking-form.html", "返回 Booking"],
      ["job-detail.html", "建立後開啟 Job", true],
      ["../index.html", "Demo 首頁"]
    ],
    "job-list.html": [
      ["../index.html", "Demo 首頁"],
      ["job-detail.html", "開啟 Job Detail", true],
      ["execution-list.html", "Execution List"]
    ],
    "job-detail.html": [
      ["job-list.html", "返回 Job List"],
      ["execution-center.html", "Execution Center", true],
      ["document-center.html", "Document Center"],
      ["ap-ar-charge-management.html", "AP/AR"]
    ],
    "execution-list.html": [
      ["../index.html", "Demo 首頁"],
      ["execution-center.html", "開啟 Execution Center", true],
      ["job-detail.html", "Job Detail"]
    ],
    "execution-center.html": [
      ["execution-list.html", "返回 Execution List"],
      ["job-detail.html", "Job Detail"],
      ["document-flow.html", "Document Flow", true],
      ["document-center.html", "Document Center"]
    ],
    "document-flow.html": [
      ["job-detail.html", "返回 Job"],
      ["execution-center.html", "Execution Center"],
      ["document-center.html", "Document Center", true]
    ],
    "document-center.html": [
      ["../index.html", "Demo 首頁"],
      ["document-flow.html", "Document Flow"],
      ["job-detail.html", "Job Detail"],
      ["ap-ar-charge-management.html", "AP/AR", true]
    ],
    "ap-ar-charge-management.html": [
      ["job-detail.html", "返回 Job", true],
      ["document-center.html", "Document Center"],
      ["../index.html", "Demo 首頁"]
    ]
  };

  function currentPage() {
    const parts = window.location.pathname.split("/");
    return parts[parts.length - 1] || "index.html";
  }

  function render() {
    const links = byPage[currentPage()];
    if (!links || document.querySelector(".demo-nav")) return;

    const nav = document.createElement("div");
    nav.className = "demo-nav";
    nav.innerHTML = `
      <div class="demo-nav__brand">
        <span class="demo-nav__mark">FWD</span>
        <span>迅捷 Wireframe Demo</span>
      </div>
      <div class="demo-nav__links">
        ${links.map(([href, label, primary]) => `<a class="demo-nav__link${primary ? " is-primary" : ""}" href="${href}">${label}</a>`).join("")}
      </div>
    `;
    document.body.insertBefore(nav, document.body.firstChild);
  }

  function bindWireframeShortcuts() {
    const page = currentPage();
    const routes = {
      "customer-form.html": {
        "返回列表": "customer-list.html"
      },
      "document-flow.html": {
        "返回 Job": "job-detail.html",
        "開啟 Execution Center": "execution-center.html"
      },
      "document-center.html": {
        "返回主選單": "../index.html",
        "Document Flow": "document-flow.html",
        "開啟 Job": "job-detail.html"
      },
      "ap-ar-charge-management.html": {
        "返回 Job": "job-detail.html"
      },
      "execution-center.html": {
        "返回 Job": "job-detail.html",
        "Document Flow": "document-flow.html"
      }
    };

    document.addEventListener("click", (event) => {
      const target = event.target.closest("button, a");
      if (!target) return;
      const text = target.textContent.trim().replace(/\s+/g, " ");
      const href = routes[page] && routes[page][text];
      if (!href) return;
      event.preventDefault();
      event.stopPropagation();
      window.location.href = href;
    }, true);
  }

  document.addEventListener("DOMContentLoaded", render);
  document.addEventListener("DOMContentLoaded", bindWireframeShortcuts);
})();
