# CLAUDE.md

Site de **révisions** (fiches de partiel) — statique, sans build, hors-ligne, déployable sur
GitHub Pages. Une matière prête (**Probabilités**) + 3 emplacements « à venir ». Chaque matière est
découpée en **chapitres**, et chaque chapitre expose 5 sections : Résumé de cours, À savoir pour le
partiel (fiche liée aux exos), QCM interactif, Exercices corrigés, Formulaire.

## Contraintes importantes
- **Style de l'interface** : aucune émoticône ni icône décorative, pas de footer. Les matières sont
  numérotées automatiquement (01, 02…) à l'accueil. Titres en serif (Source Serif 4), texte en Inter,
  mise en page aérée (colonne de lecture `--readw`).
- **Aucun outil de build.** Pas de bundler, pas de framework, pas de `npm`. On édite les fichiers,
  on ouvre `index.html`. Le site doit marcher **à la fois** en `file://` (double-clic) et sur
  **GitHub Pages** → chemins **relatifs**, **routage par hash**, et **données en modules JS**
  (jamais de `fetch`, qui est bloqué en `file://`).
- **Python et Node sont installés** sur la machine mais ne servent **pas** au site. Python sert
  seulement à l'outillage ponctuel (extraction de PDF, petit serveur de test). Ne pas introduire
  d'étape de build.

## Lancer en local
- Le plus simple : ouvrir `index.html` dans le navigateur.
- Pour tester avec un vrai serveur (recommandé, évite les surprises `file://`) :
  ```bash
  python -m http.server 8123
  ```
  puis ouvrir http://127.0.0.1:8123/index.html
  (le binaire est `C:\Users\lemou\AppData\Local\Programs\Python\Python312\python.exe`).

## Déployer sur GitHub Pages
`git init` → push → activer Pages sur la branche. Le fichier `.nojekyll` (présent) fait servir les
dossiers tels quels. Rien d'autre à configurer (chemins relatifs + hash router).

## Arborescence
```
index.html            coquille : charge KaTeX, le CSS, i18n, les données, puis app.js
.nojekyll             pour GitHub Pages
assets/
  css/style.css       thème sombre/clair via [data-theme] + variables CSS
  js/i18n.js          chaînes d'interface (fr + en) ; bouton de langue = cycle sur AVAILABLE_LANGS
  js/app.js           routeur hash, rendu des sections, moteur QCM, thème, rendu maths
vendor/katex/         KaTeX vendoré (katex.min.js/.css + auto-render + fonts) → maths hors-ligne
data/
  subjects.js         registre + les 4 matières (defineSubject / addChapter)
  proba/ch01-03.js    contenu du chapitre (fr, version de référence)
  proba/ch04.js       contenu du chapitre (fr, version de référence)
  proba/en/*.js       traductions anglaises (même id, lang:"en") ; repli sur le fr si absente
proba/                MATÉRIEL SOURCE du cours (PDF slides + companions, notebooks) — non servi
```

## Ordre de chargement (index.html)
`i18n.js` → `data/subjects.js` (définit le registre) → `data/proba/*.js` (ajoutent les chapitres)
→ `assets/js/app.js` (lit `window.RevData` au boot). KaTeX est chargé en `defer` : disponible au
`DOMContentLoaded`, donc avant le premier rendu. **Respecter cet ordre** en ajoutant des `<script>`.

## Routage (hash)
- `#/` → accueil (cartes matières)
- `#/{matiere}` → matière (section `summary`, tous chapitres)
- `#/{matiere}/{section}/{chapitre|all}` → section précise
  (`section` ∈ `summary | fiche | qcm | exos | formulas`)

## Modèle de données (un chapitre)
```js
addChapter("proba", {
  id: "ch04", title: "Ch. 4 — …", short: "Ch. 4", lang: "fr",
  summary: String.raw`<html avec $maths$>`,
  keyPoints: [ { text: String.raw`…`, exos: ["ex-machine"] } ],   // fiche → liens vers exos
  formulas:  [ { name, note?, latex: String.raw`P=aP^n` } ],       // latex PUR (sans $)
  qcm:       [ { q, choices:[…], answer: <index>, explanation } ],
  exos:      [ { id, title, difficulty:"facile|moyen|difficile", tags:[],
                 statement, hints?:[…], solution } ],
});
```

## ⚠️ Convention LaTeX (à respecter absolument)
Dans un template literal JS, `\lambda` perd son backslash → KaTeX casse. **Tous les champs
contenant du LaTeX sont écrits avec `String.raw`** (préserve les backslashes). Règles :
- Écrire les maths inline en `$...$`, display en `$$...$$` (auto-render dans le prose) ; pour
  `formulas.latex`, donner le TeX **pur, sans délimiteurs** (rendu en displayMode par `app.js`).
- **Ne jamais** écrire la séquence `${` (interpolation) ni de backtick `` ` `` à l'intérieur d'un
  `String.raw` : ne pas coller `{` juste après un `$`. Pour un ensemble, écrire `$\{0,1\}$`.
- **Le signe `<` suivi d'une lettre casse le HTML** : `$a<X\le b$` est lu par le navigateur comme
  l'ouverture d'une balise `<X…>` et avale le texte jusqu'au `>` suivant. Dans tous les champs injectés
  en HTML (summary, keyPoints, qcm, exos), écrire `&lt;` (ex. `$a&lt;X\le b$`). Seul `formulas.latex`
  (rendu par `katex.render`, pas par `innerHTML`) accepte un `<` brut.
- Éviter le `$` littéral pour l'argent (écrire « won », « € »), sinon KaTeX le prend pour des maths.
- Les énoncés d'exos (`statement`) et les solutions sont du HTML avec des `<p>` ; le résumé utilise
  les classes `callout`, `callout warn`, `tbl-wrap` + `table.tbl` (définies dans `style.css`).

## Ajouter du contenu
- **Un chapitre** : créer `data/{matiere}/{chapitre}.js` (copier un fichier existant comme gabarit),
  `addChapter(...)`, puis ajouter le `<script>` dans `index.html` (après `subjects.js`).
- **Une matière** : `defineSubject({ id, title, subtitle, status:"ready"|"coming" })` dans
  `data/subjects.js`, puis ses chapitres.
- La fiche partiel pointe vers un exo via `keyPoints[].exos = ["<id d'exo du même chapitre>"]` ;
  `app.js` ouvre et déroule l'exo cible.

## Persistance (localStorage)
- `rev.theme` (dark/light), `rev.lang`, `rev.qcm.{matiere}.{chapitre}` (meilleur score).
  Tous les accès sont en `try/catch` (peut échouer en `file://` selon le navigateur).

## i18n
Interface via `window.I18N.t(clé)`, en **français** et en **anglais**. Le bouton `#langBtn` (à côté du
bouton de thème) fait défiler `AVAILABLE_LANGS` et affiche le code de la langue suivante. Pour ajouter
une langue : dupliquer un bloc dans `assets/js/i18n.js`, traduire, l'ajouter à `AVAILABLE_LANGS`.
**Contenu** : le français est la version de référence (liste et ordre des chapitres). Une traduction
est un `addChapter` avec le **même `id`** et `lang:"en"` (fichiers `data/{matiere}/en/*.js`, chargés
après les fichiers fr). `app.js` (`chaptersOf`) substitue la traduction quand elle existe, sinon
affiche le français. Les QCM traduits doivent garder **le même ordre de choix et le même `answer`**
(le meilleur score est stocké par id de chapitre, indépendamment de la langue). Titres et sous-titres
de matière : champ `i18n: { en: { title, subtitle } }` dans `defineSubject`.

## Matériel source
Le cours d'origine est dans `proba/imen266-2026-main/` (IMEN266, Ross — *Introduction to
Probability Models*) : slides + companions (PDF), notebooks. Le contenu du site en est tiré à la
main (⚠️ **à relire/valider** par l'utilisateur). Extraction PDF possible avec `pymupdf` (déjà
installé) si besoin de re-vérifier une définition ou un énoncé.
