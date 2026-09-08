/* ============================================================
   i18n — chaînes d'interface.
   Deux langues : `fr` (défaut) et `en`. Pour en ajouter une :
   dupliquer un bloc, traduire les valeurs, puis ajouter le code
   à AVAILABLE_LANGS. Le bouton de langue (app.js) fait défiler
   AVAILABLE_LANGS dans l'ordre.
   Le CONTENU des cours (résumés, exos…) vit dans data/ ; chaque
   chapitre porte un champ `lang`, et app.js choisit la version
   dans la langue courante, avec repli sur le français.
   ============================================================ */
(function () {
  const STRINGS = {
    fr: {
      _label: "Français",
      site_name: "Révisions",
      site_tag: "fiches de partiel",
      home_title: "Mes matières",
      home_intro:
        "Pour chaque matière et chaque chapitre : un résumé de cours, les points à connaître pour le partiel, un QCM, des exercices corrigés, un formulaire et un lexique des définitions et sigles.",
      coming_soon: "à venir",
      ready: "prête",
      chapters_n: (n) => `${n} chapitre${n > 1 ? "s" : ""}`,
      exos_n: (n) => `${n} exercice${n > 1 ? "s" : ""}`,
      qcm_n: (n) => `${n} question${n > 1 ? "s" : ""}`,
      back_home: "Accueil",
      // Sections
      tab_summary: "Résumé de cours",
      tab_fiche: "À savoir pour le partiel",
      tab_qcm: "QCM",
      tab_exos: "Exercices",
      tab_formulas: "Formulaire",
      tab_defs: "Définitions",
      defs_search: "Rechercher un terme ou un sigle",
      defs_none: "Aucun terme ne correspond.",
      // Filtre de chapitre
      filter_all: "Tous les chapitres",
      filter_label: "Chapitre",
      // Exercices
      show_solution: "Voir la solution",
      hide_solution: "Masquer la solution",
      show_hint: "Un indice",
      next_hint: "Indice suivant",
      no_more_hints: "Plus d'indice",
      solution: "Solution",
      hint: "Indices",
      difficulty: "Difficulté",
      diff_facile: "facile",
      diff_moyen: "moyen",
      diff_difficile: "difficile",
      applied_in: "Exercices liés",
      // QCM
      question: "Question",
      question_of: ([i, n]) => `Question ${i} sur ${n}`,
      qcm_intro: "Une seule bonne réponse par question. La correction s'affiche dès que tu réponds.",
      score: "Score",
      best: "meilleur score",
      restart: "Recommencer",
      validate: "Valider",
      qcm_done: "QCM terminé",
      qcm_your_score: "Ton score",
      qcm_retry: "Refaire le QCM",
      qcm_perfect: "Sans faute.",
      qcm_good: "Solide. Revois les questions ratées.",
      qcm_mid: "À consolider : reprends la fiche et les exercices.",
      qcm_low: "Reprends le résumé de cours avant de refaire le QCM.",
      // États vides
      empty_section: "Rien ici pour ce chapitre pour l'instant.",
      coming_body: "Cette matière n'est pas encore prête. Elle sera ajoutée quand le cours correspondant sera disponible.",
      theme_dark: "Sombre",
      theme_light: "Clair",
      toggle_theme: "Changer de thème",
      toggle_lang: "Changer de langue",
    },

    en: {
      _label: "English",
      site_name: "Revision",
      site_tag: "exam study sheets",
      home_title: "My subjects",
      home_intro:
        "For each subject and each chapter: a course summary, the key points for the exam, a quiz, worked exercises, a formula sheet and a glossary of definitions and acronyms.",
      coming_soon: "coming soon",
      ready: "ready",
      chapters_n: (n) => `${n} chapter${n > 1 ? "s" : ""}`,
      exos_n: (n) => `${n} exercise${n > 1 ? "s" : ""}`,
      qcm_n: (n) => `${n} question${n > 1 ? "s" : ""}`,
      back_home: "Home",
      // Sections
      tab_summary: "Course summary",
      tab_fiche: "Key points for the exam",
      tab_qcm: "Quiz",
      tab_exos: "Exercises",
      tab_formulas: "Formula sheet",
      tab_defs: "Definitions",
      defs_search: "Search a term or an acronym",
      defs_none: "No matching term.",
      // Chapter filter
      filter_all: "All chapters",
      filter_label: "Chapter",
      // Exercises
      show_solution: "Show solution",
      hide_solution: "Hide solution",
      show_hint: "A hint",
      next_hint: "Next hint",
      no_more_hints: "No more hints",
      solution: "Solution",
      hint: "Hints",
      difficulty: "Difficulty",
      diff_facile: "easy",
      diff_moyen: "medium",
      diff_difficile: "hard",
      applied_in: "Related exercises",
      // Quiz
      question: "Question",
      question_of: ([i, n]) => `Question ${i} of ${n}`,
      qcm_intro: "One correct answer per question. The explanation appears as soon as you answer.",
      score: "Score",
      best: "best score",
      restart: "Restart",
      validate: "Check",
      qcm_done: "Quiz finished",
      qcm_your_score: "Your score",
      qcm_retry: "Retake the quiz",
      qcm_perfect: "Perfect score.",
      qcm_good: "Solid. Review the questions you missed.",
      qcm_mid: "Needs work: go back to the key points and the exercises.",
      qcm_low: "Reread the course summary before retaking the quiz.",
      // Empty states
      empty_section: "Nothing here for this chapter yet.",
      coming_body: "This subject is not ready yet. It will be added once the corresponding course is available.",
      theme_dark: "Dark",
      theme_light: "Light",
      toggle_theme: "Switch theme",
      toggle_lang: "Switch language",
    },
  };

  const AVAILABLE_LANGS = ["fr", "en"];

  const state = {
    lang: (function () {
      try {
        const s = localStorage.getItem("rev.lang");
        if (s && STRINGS[s]) return s;
      } catch (e) {}
      return "fr";
    })(),
  };

  window.I18N = {
    langs: AVAILABLE_LANGS,
    get current() {
      return state.lang;
    },
    label(code) {
      return (STRINGS[code] || {})._label || code;
    },
    set(lang) {
      if (!STRINGS[lang]) return;
      state.lang = lang;
      try {
        localStorage.setItem("rev.lang", lang);
      } catch (e) {}
    },
    /** Code de la langue suivante dans le cycle (pour le bouton). */
    next() {
      const i = AVAILABLE_LANGS.indexOf(state.lang);
      return AVAILABLE_LANGS[(i + 1) % AVAILABLE_LANGS.length];
    },
    t(key, arg) {
      const dict = STRINGS[state.lang] || STRINGS.fr;
      let v = dict[key];
      if (v === undefined) v = STRINGS.fr[key];
      if (typeof v === "function") return v(arg);
      return v === undefined ? key : v;
    },
  };
})();
