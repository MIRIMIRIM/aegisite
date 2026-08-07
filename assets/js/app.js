/* Docs "On this page" TOC from content headings (h2/h3 with ids). */
(function () {
  function buildToc(root) {
    var content = document.querySelector("main.docs-content");
    if (!content || !root) return;

    var list = root.querySelector("ul");
    if (!list) {
      list = document.createElement("ul");
      root.appendChild(list);
    }
    list.innerHTML = "";

    var headings = content.querySelectorAll("h2[id], h3[id]");
    if (!headings.length) {
      var wrap = root.closest("[data-toc]");
      if (wrap) wrap.hidden = true;
      var shell = root.closest(".docs-toc, .docs-toc-mobile");
      if (shell) shell.hidden = true;
      return;
    }

    var lastH2Item = null;
    var lastH2Sub = null;

    for (var i = 0; i < headings.length; i++) {
      var h = headings[i];
      var id = h.id;
      if (!id) continue;

      var li = document.createElement("li");
      var a = document.createElement("a");
      a.setAttribute("href", "#" + id);
      a.textContent = (h.textContent || "").replace(/\s+/g, " ").trim();
      li.appendChild(a);

      if (h.tagName === "H2") {
        list.appendChild(li);
        lastH2Item = li;
        lastH2Sub = null;
      } else if (!lastH2Item) {
        list.appendChild(li);
      } else {
        if (!lastH2Sub) {
          lastH2Sub = document.createElement("ul");
          lastH2Item.appendChild(lastH2Sub);
        }
        lastH2Sub.appendChild(li);
      }
    }
  }

  function init() {
    var nodes = document.querySelectorAll("[data-toc] .toc-nav");
    for (var i = 0; i < nodes.length; i++) {
      buildToc(nodes[i]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
