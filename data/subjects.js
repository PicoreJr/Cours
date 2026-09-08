/* ============================================================
   Registre des matières.
   Ce fichier définit la structure de données et les 4 matières
   (2 prêtes + 2 « à venir »). Les CHAPITRES sont ajoutés par les
   fichiers data/<matiere>/<chapitre>.js via addChapter(...).

   ----- POUR AJOUTER UNE MATIÈRE -----
   1. defineSubject({...}) ci-dessous (status: "coming" ou "ready").
      Le champ optionnel i18n: { en: { title, subtitle } } fournit
      les textes anglais ; sans lui, le français est affiché.
   2. Créer data/<matiere>/<chapitre>.js et y appeler addChapter.
   3. Ajouter les <script> correspondants dans index.html.

   ----- POUR AJOUTER UN CHAPITRE -----
   addChapter("<idMatiere>", { id, title, short, lang:"fr",
       summary, keyPoints, formulas, qcm, exos });
   Le français (lang:"fr") est la version de référence : elle fixe
   la liste et l'ordre des chapitres. Une traduction est un second
   appel addChapter avec le MÊME id et lang:"en" (fichier
   data/<matiere>/en/<chapitre>.js). Si un chapitre n'a pas de
   traduction, la version française est affichée.
   NB : pas d'icône ni d'émoticône dans l'interface — les matières
   sont numérotées automatiquement à l'affichage.
   (voir data/proba/ch01-03.js comme gabarit)
   ============================================================ */
(function () {
  window.RevData = { subjects: [], byId: {} };

  window.defineSubject = function (s) {
    s.chapters = s.chapters || []; // version de référence (fr)
    s.chaptersByLang = s.chaptersByLang || {}; // { en: [...] }
    s.i18n = s.i18n || {};
    RevData.subjects.push(s);
    RevData.byId[s.id] = s;
    return s;
  };

  window.addChapter = function (subjectId, chapter) {
    const s = RevData.byId[subjectId];
    if (!s) {
      console.warn("Matière inconnue:", subjectId);
      return;
    }
    // valeurs par défaut pour éviter les surprises à l'affichage
    chapter.keyPoints = chapter.keyPoints || [];
    chapter.formulas = chapter.formulas || [];
    chapter.qcm = chapter.qcm || [];
    chapter.exos = chapter.exos || [];
    const lang = chapter.lang || "fr";
    if (lang === "fr") {
      s.chapters.push(chapter);
    } else {
      s.chaptersByLang[lang] = s.chaptersByLang[lang] || [];
      s.chaptersByLang[lang].push(chapter);
    }
  };

  /* ---- Les 4 matières ---- */
  defineSubject({
    id: "proba",
    title: "Probabilités",
    subtitle: "Recherche Opérationnelle — modèles probabilistes (Ross)",
    status: "ready",
    i18n: {
      en: { title: "Probability", subtitle: "Operations Research — probabilistic models (Ross)" },
    },
  });

  defineSubject({
    id: "fin-eng",
    title: "Financial Engineering",
    subtitle: "Ingénierie financière — marchés, produits dérivés, actualisation",
    status: "ready",
    i18n: { en: { title: "Financial Engineering", subtitle: "Markets, derivatives, discounting" } },
  });

  defineSubject({
    id: "matiere-3",
    title: "Matière 3",
    subtitle: "À définir",
    status: "coming",
    i18n: { en: { title: "Subject 3", subtitle: "To be defined" } },
  });

  defineSubject({
    id: "matiere-4",
    title: "Matière 4",
    subtitle: "À définir",
    status: "coming",
    i18n: { en: { title: "Subject 4", subtitle: "To be defined" } },
  });
})();
