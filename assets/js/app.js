/* ============================================================
   app.js — routeur + rendu + moteur QCM + thème.
   Site statique, sans build. Routage par hash pour marcher
   en file:// comme sur GitHub Pages.
   Données : window.RevData (cf. data/subjects.js + data/proba/*).
   Maths : KaTeX (vendor/katex) via renderMathInElement.
   ============================================================ */
(function () {
  "use strict";
  const t = (k, a) => window.I18N.t(k, a);
  const DATA = window.RevData || { subjects: [], byId: {} };

  const SECTIONS = [
    { id: "summary", label: "tab_summary" },
    { id: "fiche", label: "tab_fiche" },
    { id: "qcm", label: "tab_qcm" },
    { id: "exos", label: "tab_exos" },
    { id: "formulas", label: "tab_formulas" },
    { id: "defs", label: "tab_defs" },
  ];

  const app = () => document.getElementById("app");
  const crumbEl = () => document.getElementById("crumbs");
  let pendingExo = null; // {chapterId, exoId} à ouvrir après le rendu

  /* ---------- utilitaires ---------- */
  function el(html) {
    const d = document.createElement("div");
    d.innerHTML = html.trim();
    return d.firstElementChild;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }
  function pad2(n) {
    return String(n).padStart(2, "0");
  }
  function typesetMath(root) {
    if (!window.renderMathInElement) return;
    try {
      window.renderMathInElement(root, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true },
        ],
        throwOnError: false,
        ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code", "option"],
      });
    } catch (e) {
      console.warn("KaTeX:", e);
    }
  }
  // Chapitres dans la langue courante : la liste française fait
  // référence (ordre, ids) ; une traduction remplace le chapitre de
  // même id quand elle existe, sinon on garde la version française.
  function chaptersOf(subject) {
    const base = subject.chapters || [];
    const lang = window.I18N.current;
    if (lang === "fr") return base;
    const alt = (subject.chaptersByLang || {})[lang] || [];
    return base.map((c) => alt.find((a) => a.id === c.id) || c);
  }
  // Titre / sous-titre d'une matière dans la langue courante.
  function subjText(subject, key) {
    const tr = (subject.i18n || {})[window.I18N.current];
    return (tr && tr[key]) || subject[key] || "";
  }

  /* ---------- routage ---------- */
  // #/                       -> accueil
  // #/{subject}              -> matière, section summary, tous chapitres
  // #/{subject}/{section}    -> section, tous chapitres
  // #/{subject}/{section}/{chapterId|all}
  function parseHash() {
    const h = location.hash.replace(/^#\/?/, "");
    const parts = h.split("/").filter(Boolean).map(decodeURIComponent);
    return { subject: parts[0] || null, section: parts[1] || null, chapter: parts[2] || null };
  }
  function go(path) {
    location.hash = path;
  }

  function render() {
    const r = parseHash();
    const root = app();
    root.innerHTML = "";
    if (!r.subject) return renderHome(root);
    const subject = DATA.byId[r.subject];
    if (!subject) return renderHome(root);
    if (subject.status === "coming") return renderComing(root, subject);
    const section = SECTIONS.find((s) => s.id === r.section) ? r.section : "summary";
    const chapterFilter = r.chapter || "all";
    renderSubject(root, subject, section, chapterFilter);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  /* ---------- accueil ---------- */
  function setCrumbs(nodes) {
    const c = crumbEl();
    c.innerHTML = "";
    nodes.forEach((n, i) => {
      if (i) c.appendChild(el(`<span class="sep">/</span>`));
      c.appendChild(n);
    });
  }

  function renderHome(root) {
    setCrumbs([]);
    root.appendChild(
      el(`<section class="hero wrap">
            <h1>${esc(t("home_title"))}</h1>
            <p>${esc(t("home_intro"))}</p>
          </section>`)
    );
    const grid = el(`<section class="subject-grid wrap"></section>`);
    DATA.subjects.forEach((s, i) => {
      const nCh = chaptersOf(s).length;
      const nQ = sectionCount(s, "qcm");
      const nE = sectionCount(s, "exos");
      if (s.status === "coming") {
        grid.appendChild(
          el(`<div class="subject-card coming">
                <div class="subject-index">${pad2(i + 1)}</div>
                <h3>${esc(subjText(s, "title"))}</h3>
                <p>${esc(subjText(s, "subtitle"))}</p>
                <div class="meta"><span class="pill soon">${esc(t("coming_soon"))}</span></div>
              </div>`)
        );
      } else {
        grid.appendChild(
          el(`<a class="subject-card" href="#/${s.id}">
                <div class="subject-index">${pad2(i + 1)}</div>
                <h3>${esc(subjText(s, "title"))}</h3>
                <p>${esc(subjText(s, "subtitle"))}</p>
                <div class="meta">
                  <span class="pill ready">${esc(t("ready"))}</span>
                  <span>${esc(t("chapters_n", nCh))}</span>
                  <span>${esc(t("qcm_n", nQ))}</span>
                  <span>${esc(t("exos_n", nE))}</span>
                </div>
              </a>`)
        );
      }
    });
    root.appendChild(grid);
  }

  function renderComing(root, subject) {
    setCrumbs([homeLink()]);
    root.appendChild(
      el(`<section class="subject-head wrap">
            <h1>${esc(subjText(subject, "title"))}</h1><p>${esc(subjText(subject, "subtitle"))}</p>
          </section>`)
    );
    root.appendChild(el(`<div class="wrap"><div class="empty">${esc(t("coming_body"))}</div></div>`));
  }

  function homeLink() {
    return el(`<a href="#/">${esc(t("back_home"))}</a>`);
  }

  /* ---------- matière ---------- */
  function renderSubject(root, subject, section, chapterFilter) {
    const sLabel = t(SECTIONS.find((s) => s.id === section).label);
    setCrumbs([homeLink(), el(`<a href="#/${subject.id}">${esc(subjText(subject, "title"))}</a>`), el(`<span>${esc(sLabel)}</span>`)]);

    root.appendChild(
      el(`<section class="subject-head wrap">
            <h1>${esc(subjText(subject, "title"))}</h1><p>${esc(subjText(subject, "subtitle"))}</p>
          </section>`)
    );

    // onglets
    const tabs = el(`<nav class="tabs wrap"></nav>`);
    SECTIONS.forEach((s) => {
      const count = sectionCount(subject, s.id);
      const btn = el(
        `<button class="tab ${s.id === section ? "active" : ""}">
           <span>${esc(t(s.label))}</span>
           ${count != null ? `<span class="count">${count}</span>` : ""}
         </button>`
      );
      btn.addEventListener("click", () => go(`#/${subject.id}/${s.id}/${chapterFilter}`));
      tabs.appendChild(btn);
    });
    root.appendChild(tabs);

    // filtre de chapitre
    const chaps = chaptersOf(subject);
    if (chaps.length > 1) {
      const cf = el(`<div class="chapfilter wrap"><span class="lbl">${esc(t("filter_label"))}</span></div>`);
      const mkChip = (id, label) => {
        const chip = el(`<button class="chip ${chapterFilter === id ? "active" : ""}">${esc(label)}</button>`);
        chip.addEventListener("click", () => go(`#/${subject.id}/${section}/${id}`));
        return chip;
      };
      cf.appendChild(mkChip("all", t("filter_all")));
      chaps.forEach((c) => cf.appendChild(mkChip(c.id, c.short || c.title)));
      root.appendChild(cf);
    }

    // barre de recherche (section définitions)
    let search = null;
    if (section === "defs" && sectionCount(subject, "defs") > 0) {
      search = el(
        `<div class="defsearch-wrap wrap">
           <input class="defsearch" type="search" placeholder="${esc(t("defs_search"))}" aria-label="${esc(t("defs_search"))}">
         </div>`
      );
      root.appendChild(search);
    }

    // corps
    const body = el(`<div class="section-body wrap"></div>`);
    root.appendChild(body);
    const visible = chapterFilter === "all" ? chaps : chaps.filter((c) => c.id === chapterFilter);

    const renderer = {
      summary: renderSummary,
      fiche: renderFiche,
      qcm: renderQcm,
      exos: renderExos,
      formulas: renderFormulas,
      defs: renderDefs,
    }[section];

    visible.forEach((ch) => {
      const block = el(`<div class="chapter-block"></div>`);
      if (chaps.length > 1) block.appendChild(el(`<h2>${esc(ch.title)}</h2>`));
      renderer(block, subject, ch);
      body.appendChild(block);
    });

    typesetMath(body);
    if (search) initDefSearch(search.querySelector("input"), body);

    // ouverture d'un exo ciblé depuis la fiche
    if (section === "exos" && pendingExo) {
      const target = document.getElementById("exo-" + pendingExo.chapterId + "-" + pendingExo.exoId);
      pendingExo = null;
      if (target) {
        const sol = target.querySelector(".solbox");
        const btn = target.querySelector("[data-sol-btn]");
        if (sol && sol.hidden) toggleSolution(btn, sol);
        target.classList.add("target");
        setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
        setTimeout(() => target.classList.remove("target"), 2400);
      }
    }
  }

  function sectionCount(subject, sid) {
    if (sid === "summary") return null;
    let n = 0;
    chaptersOf(subject).forEach((c) => {
      if (sid === "qcm") n += (c.qcm || []).length;
      else if (sid === "exos") n += (c.exos || []).length;
      else if (sid === "formulas") n += (c.formulas || []).length;
      else if (sid === "fiche") n += (c.keyPoints || []).length;
      else if (sid === "defs") n += (c.definitions || []).length;
    });
    return n;
  }

  /* ---------- section : résumé ---------- */
  function renderSummary(block, subject, ch) {
    if (!ch.summary) return block.appendChild(el(`<div class="empty">${esc(t("empty_section"))}</div>`));
    block.appendChild(el(`<article class="card prose">${ch.summary}</article>`));
  }

  /* ---------- section : fiche (points clés) ---------- */
  function renderFiche(block, subject, ch) {
    const kps = ch.keyPoints || [];
    if (!kps.length) return block.appendChild(el(`<div class="empty">${esc(t("empty_section"))}</div>`));
    const card = el(`<div class="card kp-list"></div>`);
    kps.forEach((kp, i) => {
      const row = el(`<div class="keypoint"><div class="kp-num">${pad2(i + 1)}</div><div class="kp-body">${kp.text}</div></div>`);
      const links = (kp.exos || [])
        .map((exoId) => {
          const exo = (ch.exos || []).find((e) => e.id === exoId);
          if (!exo) return null;
          const a = el(`<span class="exolink">${esc(exo.title)}</span>`);
          a.addEventListener("click", () => {
            pendingExo = { chapterId: ch.id, exoId: exoId };
            go(`#/${subject.id}/exos/${ch.id}`);
          });
          return a;
        })
        .filter(Boolean);
      if (links.length) {
        const wrap = el(`<div class="kp-links"><span class="lbl">${esc(t("applied_in"))}</span></div>`);
        links.forEach((a) => wrap.appendChild(a));
        row.querySelector(".kp-body").appendChild(wrap);
      }
      card.appendChild(row);
    });
    block.appendChild(card);
  }

  /* ---------- section : formulaire ---------- */
  function renderFormulas(block, subject, ch) {
    const fs = ch.formulas || [];
    if (!fs.length) return block.appendChild(el(`<div class="empty">${esc(t("empty_section"))}</div>`));
    const card = el(`<div class="card"></div>`);
    fs.forEach((f) => {
      const row = el(
        `<div class="formula">
           <div class="f-name">${esc(f.name)}${f.note ? `<span class="f-note">${esc(f.note)}</span>` : ""}</div>
           <div class="f-tex"></div>
         </div>`
      );
      const tex = row.querySelector(".f-tex");
      try {
        window.katex.render(f.latex, tex, { displayMode: true, throwOnError: false });
      } catch (e) {
        tex.textContent = f.latex;
      }
      card.appendChild(row);
    });
    block.appendChild(card);
  }

  /* ---------- section : définitions (lexique + sigles) ---------- */
  function renderDefs(block, subject, ch) {
    const defs = ch.definitions || [];
    if (!defs.length) return block.appendChild(el(`<div class="empty">${esc(t("empty_section"))}</div>`));
    const card = el(`<div class="card def-list"></div>`);
    defs.forEach((d) => {
      card.appendChild(
        el(
          `<div class="def">
             <div class="def-head">
               <span class="def-term">${d.term}</span>
               ${d.abbr ? `<span class="def-abbr">${esc(d.abbr)}</span>` : ""}
             </div>
             <div class="def-body">${d.def}</div>
           </div>`
        )
      );
    });
    block.appendChild(card);
  }
  // Filtre en direct : on compare le texte normalisé (minuscules, sans
  // accents) de chaque définition à la requête ; les chapitres sans
  // résultat sont masqués.
  function normalize(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  function initDefSearch(input, body) {
    const empty = el(`<div class="empty" hidden>${esc(t("defs_none"))}</div>`);
    body.appendChild(empty);
    const rows = [...body.querySelectorAll(".def")].map((node) => ({ node, text: normalize(node.textContent) }));
    input.addEventListener("input", () => {
      const q = normalize(input.value.trim());
      let shown = 0;
      rows.forEach((r) => {
        const ok = !q || r.text.includes(q);
        r.node.hidden = !ok;
        if (ok) shown++;
      });
      body.querySelectorAll(".chapter-block").forEach((blk) => {
        blk.hidden = !blk.querySelector(".def:not([hidden])");
      });
      empty.hidden = shown > 0;
    });
  }

  /* ---------- section : exercices ---------- */
  function toggleSolution(btn, sol) {
    sol.hidden = !sol.hidden;
    if (btn) btn.textContent = sol.hidden ? t("show_solution") : t("hide_solution");
  }
  function renderExos(block, subject, ch) {
    const exos = ch.exos || [];
    if (!exos.length) return block.appendChild(el(`<div class="empty">${esc(t("empty_section"))}</div>`));
    exos.forEach((exo) => {
      const node = el(`<div class="exo" id="exo-${ch.id}-${exo.id}"></div>`);
      const diff = exo.difficulty || "moyen";
      node.appendChild(
        el(
          `<div class="exo-head">
             <div class="exo-title">${esc(exo.title)}</div>
             <span class="diff ${diff}">${esc(t("diff_" + diff))}</span>
           </div>`
        )
      );
      node.appendChild(el(`<div class="exo-statement">${exo.statement}</div>`));
      if (exo.tags && exo.tags.length) {
        node.appendChild(el(`<div class="exo-tags">${exo.tags.map((tg) => `<span class="tag">${esc(tg)}</span>`).join("")}</div>`));
      }
      const actions = el(`<div class="exo-actions"></div>`);

      // indices progressifs (optionnels)
      let hintBox = null;
      let hintShown = 0;
      if (exo.hints && exo.hints.length) {
        hintBox = el(`<div class="hintbox" hidden><h4>${esc(t("hint"))}</h4></div>`);
        const hintBtn = el(`<button class="btn">${esc(t("show_hint"))}</button>`);
        hintBtn.addEventListener("click", () => {
          if (hintShown < exo.hints.length) {
            hintBox.hidden = false;
            const p = el(`<p>${exo.hints[hintShown]}</p>`);
            hintBox.appendChild(p);
            typesetMath(p);
            hintShown++;
          }
          hintBtn.textContent = hintShown >= exo.hints.length ? t("no_more_hints") : t("next_hint");
          hintBtn.disabled = hintShown >= exo.hints.length;
        });
        actions.appendChild(hintBtn);
      }

      const solBox = el(`<div class="solbox" hidden><h4>${esc(t("solution"))}</h4>${exo.solution}</div>`);
      const solBtn = el(`<button class="btn primary" data-sol-btn>${esc(t("show_solution"))}</button>`);
      solBtn.addEventListener("click", () => toggleSolution(solBtn, solBox));
      actions.appendChild(solBtn);

      node.appendChild(actions);
      if (hintBox) node.appendChild(hintBox);
      node.appendChild(solBox);
      block.appendChild(node);
    });
  }

  /* ---------- section : QCM ---------- */
  function scoreKey(subject, ch) {
    return "rev.qcm." + subject.id + "." + ch.id;
  }
  function renderQcm(block, subject, ch) {
    const qs = ch.qcm || [];
    if (!qs.length) return block.appendChild(el(`<div class="empty">${esc(t("empty_section"))}</div>`));

    const state = { answered: 0, correct: 0, total: qs.length };
    let best = null;
    try {
      const raw = localStorage.getItem(scoreKey(subject, ch));
      if (raw) best = JSON.parse(raw);
    } catch (e) {}

    const head = el(
      `<div class="qcm-head">
         <span class="qcm-intro">${esc(t("qcm_intro"))}</span>
         <div class="scorebar">
           <span data-score>${esc(t("score"))} 0/${state.total}</span>
           ${best ? `<span class="best">${esc(t("best"))} ${best.correct}/${best.total}</span>` : ""}
         </div>
       </div>`
    );
    block.appendChild(head);
    const scoreSpan = head.querySelector("[data-score]");
    const container = el(`<div></div>`);
    block.appendChild(container);

    function updateScore() {
      scoreSpan.textContent = `${t("score")} ${state.correct}/${state.total}`;
      if (state.answered === state.total) finish();
    }

    function finish() {
      const pct = Math.round((state.correct / state.total) * 100);
      let msg = t("qcm_low");
      if (pct === 100) msg = t("qcm_perfect");
      else if (pct >= 75) msg = t("qcm_good");
      else if (pct >= 50) msg = t("qcm_mid");
      try {
        if (!best || state.correct > best.correct) {
          localStorage.setItem(scoreKey(subject, ch), JSON.stringify({ correct: state.correct, total: state.total }));
        }
      } catch (e) {}
      const res = el(
        `<div class="qcm-result">
           <div class="big">${state.correct}/${state.total}</div>
           <p>${esc(t("qcm_your_score"))} : ${pct} %. ${esc(msg)}</p>
           <button class="btn primary" data-retry>${esc(t("qcm_retry"))}</button>
         </div>`
      );
      res.querySelector("[data-retry]").addEventListener("click", () => {
        rebuild();
        container.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      container.appendChild(res);
      res.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function rebuild() {
      state.answered = 0;
      state.correct = 0;
      container.innerHTML = "";
      try {
        const raw = localStorage.getItem(scoreKey(subject, ch));
        best = raw ? JSON.parse(raw) : best;
      } catch (e) {}
      buildQuestions();
      scoreSpan.textContent = `${t("score")} 0/${state.total}`;
    }

    function buildQuestions() {
      qs.forEach((q, qi) => {
        const qnode = el(
          `<div class="q">
             <div class="q-num">${esc(t("question_of", [qi + 1, state.total]))}</div>
             <div class="q-text">${q.q}</div>
           </div>`
        );
        const choicesWrap = el(`<div class="choices"></div>`);
        let locked = false;
        q.choices.forEach((choice, ci) => {
          const c = el(`<div class="choice"><span class="mark">${String.fromCharCode(65 + ci)}</span><span class="choice-text">${choice}</span></div>`);
          c.addEventListener("click", () => {
            if (locked) return;
            locked = true;
            state.answered++;
            const isCorrect = ci === q.answer;
            if (isCorrect) state.correct++;
            [...choicesWrap.children].forEach((node, ni) => {
              node.classList.add("locked");
              if (ni === q.answer) node.classList.add("correct");
            });
            if (!isCorrect) c.classList.add("wrong");
            if (q.explanation) {
              const ex = el(`<div class="explain">${q.explanation}</div>`);
              qnode.appendChild(ex);
              typesetMath(ex);
            }
            updateScore();
          });
          choicesWrap.appendChild(c);
        });
        qnode.appendChild(choicesWrap);
        container.appendChild(qnode);
        typesetMath(qnode);
      });
    }

    buildQuestions();
  }

  /* ---------- thème ---------- */
  function initTheme() {
    let theme = "dark";
    try {
      theme = localStorage.getItem("rev.theme") || "dark";
    } catch (e) {}
    applyTheme(theme);
  }
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const lbl = document.getElementById("themeLabel");
    // le bouton annonce le thème vers lequel on bascule
    if (lbl) lbl.textContent = theme === "dark" ? t("theme_light") : t("theme_dark");
  }
  function toggleTheme() {
    const cur = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = cur === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem("rev.theme", next);
    } catch (e) {}
  }

  /* ---------- bouton de langue ---------- */
  // Même principe que le bouton de thème : le bouton affiche la langue
  // vers laquelle on bascule (EN quand le site est en français, etc.).
  function initLang() {
    const btn = document.getElementById("langBtn");
    if (!btn) return;
    if (window.I18N.langs.length < 2) {
      btn.style.display = "none";
      return;
    }
    btn.addEventListener("click", () => {
      window.I18N.set(window.I18N.next());
      applyStaticText();
      render();
    });
  }

  function applyStaticText() {
    const lang = window.I18N.current;
    document.documentElement.lang = lang;
    document.getElementById("siteName").textContent = t("site_name");
    document.getElementById("siteTag").textContent = t("site_tag");
    document.title = t("site_name") + " · " + t("site_tag");
    const lb = document.getElementById("langLabel");
    if (lb) lb.textContent = window.I18N.next().toUpperCase();
    const langBtn = document.getElementById("langBtn");
    if (langBtn) langBtn.title = t("toggle_lang") + " (" + window.I18N.label(window.I18N.next()) + ")";
    const themeBtn = document.getElementById("themeBtn");
    if (themeBtn) themeBtn.title = t("toggle_theme");
    applyTheme(document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");
  }

  /* ---------- démarrage ---------- */
  function boot() {
    initTheme();
    applyStaticText();
    initLang();
    document.getElementById("themeBtn").addEventListener("click", toggleTheme);
    document.getElementById("brandBtn").addEventListener("click", () => go("#/"));
    window.addEventListener("hashchange", render);
    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
