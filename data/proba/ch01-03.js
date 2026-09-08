/* ============================================================
   Probabilités — Chapitres 1 à 3 : Probabilités de base
   Source : slides IMEN266 ch1-3 + Companion (Ross, ch. 1-3).
   Contenu rédigé pour la révision — à relire et valider.
   NB : les champs contenant du LaTeX utilisent String.raw pour
   préserver les backslashes. Ne jamais écrire la séquence ${ }.
   ============================================================ */
addChapter("proba", {
  id: "ch01-03",
  title: "Chapitres 1 à 3 — Probabilités de base",
  short: "Ch. 1 à 3",
  lang: "fr",

  /* -------------------- RÉSUMÉ DE COURS -------------------- */
  summary: String.raw`
    <h3>1. Espace de probabilité et événements</h3>
    <p>L'<strong>univers</strong> $\Omega$ rassemble tous les résultats possibles d'une expérience
    aléatoire ; un <strong>événement</strong> est un sous-ensemble $A \subseteq \Omega$. Une
    <strong>mesure de probabilité</strong> $P$ associe à chaque événement un nombre et vérifie trois
    axiomes :</p>
    <ul>
      <li>$P(A) \ge 0$ pour tout événement $A$ ;</li>
      <li>$P(\Omega) = 1$ (et donc $P(\varnothing)=0$) ;</li>
      <li><strong>additivité dénombrable</strong> : si les $A_i$ sont deux à deux disjoints,
          $P\!\left(\bigcup_i A_i\right) = \sum_i P(A_i)$.</li>
    </ul>
    <p>Trois conséquences à connaître : $P(A^c) = 1 - P(A)$ ; si $A \subseteq B$ alors
    $P(A) \le P(B)$ ; et pour deux événements quelconques, la formule
    d'<strong>inclusion-exclusion</strong> $P(A\cup B) = P(A)+P(B)-P(A\cap B)$. Le terme
    $P(A\cap B)$ corrige le double comptage de l'intersection ; il disparaît seulement si $A$ et $B$
    sont disjoints.</p>

    <h3>2. Probabilité conditionnelle et indépendance</h3>
    <p>Pour $P(B) > 0$, on définit $P(A \mid B) = \dfrac{P(A\cap B)}{P(B)}$ : la probabilité de $A$
    une fois que l'on sait que $B$ s'est produit. On en déduit la <strong>règle de
    multiplication</strong> $P(A\cap B) = P(A\mid B)\,P(B) = P(B\mid A)\,P(A)$, qui sert à calculer
    la probabilité d'un enchaînement d'événements pas à pas.</p>
    <p>Deux événements $A$ et $B$ sont <strong>indépendants</strong> si et seulement si
    $P(A\cap B) = P(A)\,P(B)$, ce qui équivaut à $P(A\mid B)=P(A)$ : savoir que $B$ s'est produit
    ne change rien à la probabilité de $A$.</p>
    <div class="callout warn"><strong>Deux pièges classiques.</strong>
      <p>Disjoint n'est pas indépendant : si $A$ et $B$ sont disjoints avec $P(A)>0$ et $P(B)>0$,
      alors $P(A\cap B)=0\neq P(A)P(B)$. Ils ne sont donc <em>jamais</em> indépendants.</p>
      <p>Pour trois événements ou plus, l'<strong>indépendance mutuelle</strong> exige la règle du produit
      pour <em>toutes</em> les sous-collections, pas seulement pour les paires. L'indépendance deux à
      deux n'implique pas l'indépendance mutuelle.</p></div>

    <h3>3. Fiabilité : systèmes en série et en parallèle</h3>
    <p>On considère $n$ composants indépendants ; le composant $i$ fonctionne avec probabilité $p_i$.</p>
    <ul>
      <li><strong>Série</strong> (le système marche si <em>tous</em> les composants marchent) :
          $R_{\text{série}} = \prod_{i=1}^n p_i$. Ce produit est inférieur à chacun des $p_i$ : un
          système en série est moins fiable que son maillon le plus faible.</li>
      <li><strong>Parallèle</strong> (le système marche si <em>au moins un</em> composant marche) :
          $R_{\text{parallèle}} = 1 - \prod_{i=1}^n (1-p_i)$. On passe par le complément « tous en
          panne ». Ce nombre est supérieur à chacun des $p_i$ : la redondance améliore toujours la
          fiabilité.</li>
    </ul>

    <h3>4. Probabilités totales et règle de Bayes</h3>
    <p>Si $B_1,\dots,B_n$ forment une <strong>partition</strong> de $\Omega$ (événements deux à deux
    disjoints, dont la réunion est $\Omega$, avec $P(B_i)>0$), alors pour tout événement $A$ :</p>
    <p>$$P(A) = \sum_{i=1}^n P(A\mid B_i)\,P(B_i), \qquad
        P(B_j \mid A) = \frac{P(A\mid B_j)\,P(B_j)}{\sum_i P(A\mid B_i)\,P(B_i)}.$$</p>
    <p>La première formule (probabilités totales) découpe $A$ selon les cas $B_i$ ; la seconde (Bayes)
    renverse le conditionnement. On la lit : <strong>probabilité a posteriori $\propto$ a priori
    $\times$ vraisemblance</strong>.</p>
    <p>Attention au <strong>piège du taux de base</strong> : pour une maladie qui touche 0,4 % de la
    population, un test qui détecte 95 % des malades et innocente 96 % des non-malades ne donne, en cas
    de résultat positif, qu'environ 9 % de chances d'être réellement malade. Les faux positifs, pris
    sur une immense majorité de personnes saines, sont bien plus nombreux que les vrais positifs.</p>

    <h3>5. Variables aléatoires</h3>
    <p>Une variable aléatoire $X$ associe un nombre à chaque résultat de l'expérience. Sa
    <strong>fonction de répartition</strong> (cdf) $F(x)=P(X\le x)$ est croissante au sens large,
    continue à droite, et vérifie $\lim_{x\to-\infty}F(x)=0$ et $\lim_{x\to+\infty}F(x)=1$.</p>
    <ul>
      <li><strong>Discrète</strong> : décrite par sa fonction de masse (pmf) $p(x)=P(X=x)$, avec
          $p(x)\ge 0$ et $\sum_x p(x)=1$.</li>
      <li><strong>Continue</strong> : décrite par sa densité (pdf) $f\ge 0$ avec $\int_{\mathbb R} f = 1$.
          On a $P(a&lt;X\le b)=\int_a^b f(x)\,dx = F(b)-F(a)$, $f = F'$, et $P(X=x)=0$ en tout point :
          seuls les intervalles portent de la probabilité.</li>
    </ul>

    <h4>Les lois du cours</h4>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Loi</th><th>pmf ou pdf</th><th>Moyenne</th><th>Variance</th><th>Situation type</th></tr></thead>
      <tbody>
        <tr><td>Bernoulli$(p)$</td><td>$p^x(1-p)^{1-x}$, $x\in\{0,1\}$</td><td>$p$</td><td>$p(1-p)$</td><td>une pièce est-elle défectueuse ?</td></tr>
        <tr><td>Binomiale$(n,p)$</td><td>$\binom{n}{x}p^x(1-p)^{n-x}$</td><td>$np$</td><td>$np(1-p)$</td><td>nombre de succès sur $n$ essais fixés</td></tr>
        <tr><td>Géométrique$(p)$</td><td>$(1-p)^{x-1}p$, $x\ge 1$</td><td>$1/p$</td><td>$(1-p)/p^2$</td><td>rang du premier succès</td></tr>
        <tr><td>Binomiale négative$(r,p)$</td><td>$\binom{x-1}{r-1}p^r(1-p)^{x-r}$, $x\ge r$</td><td>$r/p$</td><td>$r(1-p)/p^2$</td><td>rang du $r$-ième succès</td></tr>
        <tr><td>Hypergéométrique$(N,K,n)$</td><td>$\dfrac{\binom{K}{x}\binom{N-K}{n-x}}{\binom{N}{n}}$</td><td>$nK/N$</td><td>$n\tfrac{K}{N}\tfrac{N-K}{N}\tfrac{N-n}{N-1}$</td><td>$n$ tirages sans remise parmi $N$ objets dont $K$ marqués</td></tr>
        <tr><td>Poisson$(\lambda)$</td><td>$e^{-\lambda}\lambda^x/x!$</td><td>$\lambda$</td><td>$\lambda$</td><td>nombre d'événements sur une période, à taux moyen $\lambda$</td></tr>
        <tr><td>Uniforme$(a,b)$</td><td>$1/(b-a)$ sur $[a,b]$</td><td>$\tfrac{a+b}{2}$</td><td>$\tfrac{(b-a)^2}{12}$</td><td>aucune valeur privilégiée</td></tr>
        <tr><td>Exponentielle$(\lambda)$</td><td>$\lambda e^{-\lambda x}$, $x\ge 0$</td><td>$1/\lambda$</td><td>$1/\lambda^2$</td><td>durée de vie, temps d'attente</td></tr>
        <tr><td>Erlang$(k,\lambda)$</td><td>$\dfrac{\lambda^k x^{k-1}e^{-\lambda x}}{(k-1)!}$, $x\ge 0$</td><td>$k/\lambda$</td><td>$k/\lambda^2$</td><td>somme de $k$ exponentielles indépendantes</td></tr>
        <tr><td>Normale$(\mu,\sigma^2)$</td><td>$\dfrac{1}{\sigma\sqrt{2\pi}}\,e^{-(x-\mu)^2/(2\sigma^2)}$</td><td>$\mu$</td><td>$\sigma^2$</td><td>somme de nombreux petits effets</td></tr>
      </tbody>
    </table></div>
    <p>Retenir la <em>situation</em> autant que la formule : la Binomiale compte les succès sur un
    nombre fixé d'essais ; la Géométrique et la Binomiale négative attendent le premier ou le
    $r$-ième succès ; la Poisson compte des événements qui surviennent à un taux moyen donné ;
    l'Hypergéométrique correspond à un tirage sans remise ; l'Erlang est une somme de $k$
    exponentielles indépendantes de même paramètre.</p>

    <h3>6. Espérance, LOTUS, variance</h3>
    <p>L'<strong>espérance</strong> est la moyenne pondérée des valeurs :
    $E[X]=\sum_x x\,p(x)$ dans le cas discret, $E[X]=\int_{\mathbb R} x f(x)\,dx$ dans le cas continu.
    La <strong>LOTUS</strong> (<em>law of the unconscious statistician</em>) permet de calculer
    $E[g(X)]=\sum_x g(x)\,p(x)$ ou $\int g(x) f(x)\,dx$ sans jamais chercher la loi de $g(X)$.</p>
    <p>La <strong>linéarité</strong> $E[aX+bY]=a\,E[X]+b\,E[Y]$ est toujours vraie, sans aucune hypothèse
    d'indépendance. En revanche $E[XY]=E[X]\,E[Y]$ et $\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)$
    demandent l'indépendance.</p>
    <p>La <strong>variance</strong> mesure la dispersion autour de la moyenne :
    $\operatorname{Var}(X)=E\big[(X-E[X])^2\big]=E[X^2]-(E[X])^2$, et $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$.
    Une translation ne change pas la variance ; un facteur $a$ la multiplie par $a^2$.</p>
    <div class="callout"><strong>Formule de la queue</strong> (valable pour $X\ge 0$).
      $E[X]=\sum_{k\ge 1}P(X\ge k)$ si $X$ est à valeurs entières, et $E[X]=\int_0^\infty P(X>x)\,dx$
      si $X$ est continue. Pratique quand la fonction de survie $P(X>x)$ est plus simple que la densité.</div>

    <h3>7. Absence de mémoire</h3>
    <p>Une loi est <strong>sans mémoire</strong> si le fait d'avoir déjà attendu ne change pas la loi
    de l'attente restante :</p>
    <p>$$P(X>m+n\mid X>m)=P(X>n)\ \ \text{(discret)}, \qquad P(X>s+t\mid X>s)=P(X>t)\ \ \text{(continu)}.$$</p>
    <p>Les seules lois sans mémoire sont la <strong>Géométrique</strong> (cas discret) et
    l'<strong>Exponentielle</strong> (cas continu). La preuve tient en une ligne : $P(X>k)=(1-p)^k$ ou
    $P(X>t)=e^{-\lambda t}$, et le quotient se simplifie. Un composant à durée de vie exponentielle qui a
    déjà servi est donc « comme neuf ». L'Erlang avec $k\ge 2$, l'Uniforme ou la Normale ne sont
    <em>pas</em> sans mémoire.</p>
  `,

  /* -------------------- FICHE PARTIEL -------------------- */
  keyPoints: [
    {
      text: String.raw`<strong>Conditionnelle et règle de multiplication.</strong>
        $P(A\mid B)=P(A\cap B)/P(B)$, donc $P(A\cap B)=P(A\mid B)\,P(B)$. Trois notations désignent le
        même événement : $P(A\cap B)$, $P(A,B)$ et $P(AB)$.`,
    },
    {
      text: String.raw`<strong>Indépendance.</strong> $P(A\cap B)=P(A)P(B)$. Disjoint n'est pas indépendant.
        L'indépendance mutuelle implique l'indépendance deux à deux, mais la réciproque est fausse.
        Contre-exemple : deux lancers d'une pièce équilibrée, $A$ = « pile au premier lancer »,
        $B$ = « pile au second », $C$ = « les deux lancers donnent le même côté ». Chaque paire est
        indépendante, mais $P(A\cap B\cap C)=\tfrac14\neq\tfrac18$.`,
    },
    {
      text: String.raw`<strong>Fiabilité.</strong> Série : $\prod p_i$, plus faible que le maillon le plus
        faible. Parallèle : $1-\prod(1-p_i)$, plus fort que le meilleur composant. Réflexe : pour
        « au moins un », passer par le complément « aucun ».`,
      exos: ["ex-series-parallel"],
    },
    {
      text: String.raw`<strong>Probabilités totales puis Bayes.</strong> Découper $A$ selon une partition
        $(B_i)$ : $P(A)=\sum_i P(A\mid B_i)P(B_i)$. Puis a posteriori $\propto$ a priori $\times$
        vraisemblance. Piège du taux de base : quand la cause est rare, même un bon test produit
        surtout des faux positifs.`,
      exos: ["ex-cooks", "ex-cancer", "ex-coins"],
    },
    {
      text: String.raw`<strong>Reconnaître la loi discrète à partir de la situation.</strong>
        Nombre fixé d'essais : Binomiale. Attente du premier succès : Géométrique. Attente du $r$-ième
        succès : Binomiale négative. Comptage à taux moyen fixé : Poisson. Tirage sans remise :
        Hypergéométrique.`,
      exos: ["ex-lathes", "ex-yield", "ex-poisson-cars"],
    },
    {
      text: String.raw`<strong>pmf, pdf, cdf.</strong> Dans le cas continu $P(X=x)=0$ et
        $P(a&lt;X\le b)=F(b)-F(a)=\int_a^b f$. Pour construire $F$ à partir de $f$, intégrer morceau par
        morceau et vérifier que $F$ part de 0 et finit à 1.`,
      exos: ["ex-polypdf"],
    },
    {
      text: String.raw`<strong>Lois continues clés.</strong> Uniforme, Exponentielle (sans mémoire),
        Erlang $=$ somme de $k$ exponentielles indépendantes, Normale. Pour identifier une Erlang à partir
        de sa moyenne et de sa variance : $\operatorname{Var}/E = 1/\lambda$, puis $k=\lambda E$.`,
      exos: ["ex-exp-life", "ex-erlang-msg"],
    },
    {
      text: String.raw`<strong>Espérance et variance.</strong> LOTUS pour $E[g(X)]$ ;
        $\operatorname{Var}(X)=E[X^2]-(E[X])^2$ ; $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$ ;
        linéarité de l'espérance sans hypothèse d'indépendance ; formule de la queue pour $X\ge 0$.`,
      exos: ["ex-findab", "ex-docsize"],
    },
    {
      text: String.raw`<strong>Absence de mémoire.</strong> Preuve type : écrire $P(X>k)=(1-p)^k$
        (Géométrique) ou $P(X>t)=e^{-\lambda t}$ (Exponentielle), puis simplifier le quotient
        $P(X>s+t)/P(X>s)$. Seules ces deux lois ont cette propriété.`,
      exos: ["ex-exp-life"],
    },
  ],

  /* -------------------- FORMULAIRE -------------------- */
  formulas: [
    { name: "Inclusion-exclusion", note: "deux événements", latex: String.raw`P(A\cup B)=P(A)+P(B)-P(A\cap B)` },
    { name: "Complément", latex: String.raw`P(A^c)=1-P(A)` },
    { name: "Probabilité conditionnelle", note: "P(B) > 0", latex: String.raw`P(A\mid B)=\frac{P(A\cap B)}{P(B)}` },
    { name: "Règle de multiplication", latex: String.raw`P(A\cap B)=P(A\mid B)\,P(B)=P(B\mid A)\,P(A)` },
    { name: "Indépendance", latex: String.raw`P(A\cap B)=P(A)\,P(B)\iff P(A\mid B)=P(A)` },
    { name: "Fiabilité en série", note: "tous les composants doivent fonctionner", latex: String.raw`R_{\text{série}}=\prod_{i=1}^{n}p_i` },
    { name: "Fiabilité en parallèle", note: "au moins un composant fonctionne", latex: String.raw`R_{\text{parallèle}}=1-\prod_{i=1}^{n}(1-p_i)` },
    { name: "Probabilités totales", note: "(B_i) partition de l'univers", latex: String.raw`P(A)=\sum_{i=1}^{n}P(A\mid B_i)\,P(B_i)` },
    { name: "Règle de Bayes", latex: String.raw`P(B_j\mid A)=\frac{P(A\mid B_j)\,P(B_j)}{\sum_i P(A\mid B_i)\,P(B_i)}` },
    { name: "Densité et fonction de répartition", latex: String.raw`f(x)=F'(x),\qquad P(a<X\le b)=F(b)-F(a)=\int_a^b f(x)\,dx` },
    { name: "Espérance", latex: String.raw`E[X]=\sum_x x\,p(x)\quad\text{ou}\quad E[X]=\int_{\mathbb R} x\,f(x)\,dx` },
    { name: "LOTUS", latex: String.raw`E[g(X)]=\sum_x g(x)\,p(x)\quad\text{ou}\quad E[g(X)]=\int_{\mathbb R} g(x)\,f(x)\,dx` },
    { name: "Variance", latex: String.raw`\operatorname{Var}(X)=E[X^2]-(E[X])^2,\qquad \operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)` },
    { name: "Formule de la queue", note: "X ≥ 0", latex: String.raw`E[X]=\sum_{k\ge 1}P(X\ge k)\quad\text{ou}\quad E[X]=\int_0^\infty P(X>x)\,dx` },
    { name: "Binomiale (n, p)", latex: String.raw`P(X=x)=\binom{n}{x}p^x(1-p)^{n-x},\qquad E[X]=np,\ \operatorname{Var}(X)=np(1-p)` },
    { name: "Géométrique (p)", note: "x ≥ 1, rang du premier succès", latex: String.raw`P(X=x)=(1-p)^{x-1}p,\qquad P(X>k)=(1-p)^k,\qquad E[X]=\tfrac1p` },
    { name: "Binomiale négative (r, p)", note: "x ≥ r, rang du r-ième succès", latex: String.raw`P(X=x)=\binom{x-1}{r-1}p^{r}(1-p)^{x-r},\qquad E[X]=\tfrac rp` },
    { name: "Hypergéométrique (N, K, n)", note: "n tirages sans remise, K objets marqués", latex: String.raw`P(X=x)=\frac{\binom{K}{x}\binom{N-K}{n-x}}{\binom{N}{n}},\qquad E[X]=\frac{nK}{N}` },
    { name: "Poisson (λ)", latex: String.raw`P(X=x)=\frac{e^{-\lambda}\lambda^x}{x!},\qquad E[X]=\operatorname{Var}(X)=\lambda` },
    { name: "Uniforme (a, b)", latex: String.raw`f(x)=\frac{1}{b-a}\ \text{sur }[a,b],\qquad E[X]=\frac{a+b}{2},\ \operatorname{Var}(X)=\frac{(b-a)^2}{12}` },
    { name: "Exponentielle (λ)", latex: String.raw`f(x)=\lambda e^{-\lambda x},\quad F(x)=1-e^{-\lambda x},\quad P(X>t)=e^{-\lambda t},\quad E[X]=\tfrac1\lambda` },
    { name: "Erlang (k, λ)", note: "somme de k exponentielles indépendantes", latex: String.raw`f(x)=\frac{\lambda^k x^{k-1}e^{-\lambda x}}{(k-1)!},\qquad P(X>x)=\sum_{r=0}^{k-1}\frac{e^{-\lambda x}(\lambda x)^r}{r!}` },
    { name: "Erlang : moyenne et variance", latex: String.raw`E[X]=\frac{k}{\lambda},\qquad \operatorname{Var}(X)=\frac{k}{\lambda^2},\qquad \frac{\operatorname{Var}(X)}{E[X]}=\frac1\lambda` },
    { name: "Absence de mémoire", note: "Géométrique et Exponentielle seulement", latex: String.raw`P(X>s+t\mid X>s)=P(X>t)` },
  ],

  /* -------------------- QCM -------------------- */
  qcm: [
    {
      q: String.raw`On sait que $P(A)=0{,}5$, $P(B)=0{,}4$ et $P(A\cup B)=0{,}7$. Que peut-on dire de $A$ et $B$ ?`,
      choices: [
        String.raw`Ils sont disjoints.`,
        String.raw`$A$ est inclus dans $B$.`,
        String.raw`Ces valeurs sont incompatibles avec les axiomes.`,
        String.raw`Ils sont indépendants.`,
      ],
      answer: 3,
      explanation: String.raw`Inclusion-exclusion : $P(A\cap B)=0{,}5+0{,}4-0{,}7=0{,}2$. Or $P(A)P(B)=0{,}5\times 0{,}4=0{,}2$
        aussi, donc $A$ et $B$ sont indépendants. Ils ne sont pas disjoints puisque $P(A\cap B)\neq 0$.`,
    },
    {
      q: String.raw`Deux événements $A$ et $B$ sont disjoints, avec $P(A)>0$ et $P(B)>0$. Sont-ils indépendants ?`,
      choices: [
        String.raw`Jamais.`,
        String.raw`Toujours : être disjoints est une forme forte d'indépendance.`,
        String.raw`Seulement si $P(A)=P(B)$.`,
        String.raw`Cela dépend de $P(A\cup B)$.`,
      ],
      answer: 0,
      explanation: String.raw`Disjoints signifie $P(A\cap B)=0$, alors que l'indépendance demanderait
        $P(A\cap B)=P(A)P(B)>0$. Intuition : si $A$ s'est produit, on est <em>sûr</em> que $B$ ne s'est pas
        produit, ce qui est le contraire de « ne rien apprendre ».`,
    },
    {
      q: String.raw`On lance deux dés équilibrés. Sachant que le premier dé montre 3, quelle est la probabilité que la somme vaille 7 ?`,
      choices: [
        String.raw`$1/36$`,
        String.raw`$1/12$`,
        String.raw`$1/6$`,
        String.raw`$1/3$`,
      ],
      answer: 2,
      explanation: String.raw`Il faut que le second dé montre exactement 4 : probabilité $1/6$. Remarque : sans
        information, $P(\text{somme}=7)=6/36=1/6$ également. L'événement « somme égale à 7 » est donc
        indépendant de la valeur du premier dé, ce qui est faux pour toute autre somme.`,
    },
    {
      q: String.raw`Une maladie touche 0,4 % de la population. Un test détecte 95 % des malades et donne un
        résultat négatif chez 96 % des personnes saines. Une personne est testée positive : quelle est,
        approximativement, la probabilité qu'elle soit réellement malade ?`,
      choices: [
        String.raw`$0{,}4\ \%$`,
        String.raw`$9\ \%$`,
        String.raw`$50\ \%$`,
        String.raw`$95\ \%$`,
      ],
      answer: 1,
      explanation: String.raw`Bayes : $P(M\mid T)=\dfrac{0{,}95\times 0{,}004}{0{,}95\times 0{,}004+0{,}04\times 0{,}996}\approx 0{,}087$.
        Sur 10 000 personnes, il y a environ 38 vrais positifs contre 398 faux positifs : la rareté de la maladie
        l'emporte sur la qualité du test.`,
    },
    {
      q: String.raw`Dans une boîte mail, 20 % des messages sont des spams. Le mot « gratuit » apparaît dans 60 %
        des spams et dans 5 % des messages légitimes. Un message contient « gratuit » : probabilité que ce soit un spam ?`,
      choices: [
        String.raw`$0{,}60$`,
        String.raw`$0{,}12$`,
        String.raw`$0{,}75$`,
        String.raw`$0{,}92$`,
      ],
      answer: 2,
      explanation: String.raw`$P(S\mid G)=\dfrac{0{,}6\times 0{,}2}{0{,}6\times 0{,}2+0{,}05\times 0{,}8}=\dfrac{0{,}12}{0{,}12+0{,}04}=0{,}75$.
        Le numérateur seul ($0{,}12$) est la probabilité <em>jointe</em> « spam et gratuit », pas la conditionnelle.`,
    },
    {
      q: String.raw`Des capteurs indépendants détectent chacun une intrusion avec probabilité 0,8. On les monte en
        parallèle (une détection suffit). Combien en faut-il au minimum pour que la probabilité de détection dépasse 99 % ?`,
      choices: [
        String.raw`2`,
        String.raw`3`,
        String.raw`5`,
        String.raw`10`,
      ],
      answer: 1,
      explanation: String.raw`Probabilité de détection avec $n$ capteurs : $1-0{,}2^n$. Avec 2 capteurs :
        $1-0{,}04=0{,}96$, insuffisant. Avec 3 : $1-0{,}008=0{,}992$. Il faut $0{,}2^n\le 0{,}01$, soit $n\ge 3$.`,
    },
    {
      q: String.raw`Une chaîne de production comporte 10 machines en série, chacune fiable à 95 % et indépendantes.
        La fiabilité de la chaîne est proche de :`,
      choices: [
        String.raw`$50\ \%$`,
        String.raw`$60\ \%$`,
        String.raw`$90\ \%$`,
        String.raw`$95\ \%$`,
      ],
      answer: 1,
      explanation: String.raw`$0{,}95^{10}\approx 0{,}60$. Dix composants « très fiables » en série donnent un système
        qui tombe en panne quatre fois sur dix : l'enchaînement dégrade vite la fiabilité.`,
    },
    {
      q: String.raw`Laquelle de ces fonctions n'est <strong>pas</strong> une fonction de masse valide ?`,
      choices: [
        String.raw`$p(x)=x/10$ pour $x\in\{1,2,3,4\}$`,
        String.raw`$p(x)=1/4$ pour $x\in\{1,2,3,4\}$`,
        String.raw`$p(x)=(3-x)/3$ pour $x\in\{0,1,2\}$`,
        String.raw`$p(x)=2^{-x}$ pour $x\in\{1,2,3,\dots\}$`,
      ],
      answer: 2,
      explanation: String.raw`Une pmf doit être positive et sommer à 1. Ici $(3+2+1)/3=2\neq 1$. Les trois autres
        somment bien à 1 (la dernière est une série géométrique : $\sum_{x\ge 1}2^{-x}=1$).`,
    },
    {
      q: String.raw`Laquelle de ces fonctions peut être la fonction de répartition d'une variable aléatoire ?`,
      choices: [
        String.raw`$F(x)=1-e^{-x}$ pour $x\ge 0$, et $F(x)=0$ pour $x<0$`,
        String.raw`$F(x)=e^{-x}$ pour $x\ge 0$, et $F(x)=0$ pour $x<0$`,
        String.raw`$F(x)=x^2$ pour tout $x\in\mathbb R$`,
        String.raw`$F(x)=\sin x$ pour tout $x\in\mathbb R$`,
      ],
      answer: 0,
      explanation: String.raw`Une cdf est croissante, tend vers 0 en $-\infty$ et vers 1 en $+\infty$. Seule
        $F(x)=1-e^{-x}$ convient (c'est l'Exponentielle de paramètre 1). La fonction $e^{-x}$ décroît, $x^2$ n'est
        pas bornée par 1 et $\sin x$ n'est pas monotone.`,
    },
    {
      q: String.raw`$X$ est uniforme sur $[0,10]$. Que vaut $P(X>7\mid X>4)$ ?`,
      choices: [
        String.raw`$0{,}3$`,
        String.raw`$0{,}5$`,
        String.raw`$0{,}7$`,
        String.raw`$0{,}75$`,
      ],
      answer: 1,
      explanation: String.raw`$P(X>7\mid X>4)=\dfrac{P(X>7)}{P(X>4)}=\dfrac{0{,}3}{0{,}6}=0{,}5$. Si l'Uniforme était sans
        mémoire on aurait trouvé $P(X>3)=0{,}7$ : ce n'est pas le cas, seule l'Exponentielle l'est parmi les lois continues.`,
    },
    {
      q: String.raw`La durée de vie d'un composant est exponentielle de paramètre $\lambda=0{,}1$ par heure. Il fonctionne
        depuis 10 heures. Quelle est la probabilité qu'il atteigne 30 heures de fonctionnement au total ?`,
      choices: [
        String.raw`$e^{-3}$`,
        String.raw`$e^{-1}$`,
        String.raw`$1-e^{-2}$`,
        String.raw`$e^{-2}$`,
      ],
      answer: 3,
      explanation: String.raw`Absence de mémoire : $P(X>30\mid X>10)=P(X>20)=e^{-0{,}1\times 20}=e^{-2}\approx 0{,}135$.
        Le composant usagé se comporte comme un composant neuf ; $e^{-3}$ serait la réponse en oubliant le conditionnement.`,
    },
    {
      q: String.raw`$X$ est géométrique de paramètre $p=0{,}2$ (rang du premier succès). Que vaut $P(X>3)$ ?`,
      choices: [
        String.raw`$0{,}008$`,
        String.raw`$0{,}1024$`,
        String.raw`$0{,}488$`,
        String.raw`$0{,}512$`,
      ],
      answer: 3,
      explanation: String.raw`$X>3$ signifie que les trois premiers essais sont des échecs : $P(X>3)=(1-p)^3=0{,}8^3=0{,}512$.
        La valeur $0{,}1024=0{,}8^3\times 0{,}2$ est $P(X=4)$, et $0{,}488$ est $P(X\le 3)$.`,
    },
    {
      q: String.raw`$X_1,X_2,X_3$ sont indépendantes et suivent toutes la loi Exponentielle$(\lambda)$. La somme $X_1+X_2+X_3$ suit :`,
      choices: [
        String.raw`Exponentielle$(3\lambda)$`,
        String.raw`Exponentielle$(\lambda/3)$`,
        String.raw`Erlang$(3,\lambda)$`,
        String.raw`Poisson$(3\lambda)$`,
      ],
      answer: 2,
      explanation: String.raw`C'est la définition de l'Erlang : $k$ phases exponentielles indépendantes de même taux mises
        bout à bout. Sa moyenne est $3/\lambda$, cohérente avec la linéarité de l'espérance. Une exponentielle de paramètre
        $3\lambda$ aurait une moyenne $1/(3\lambda)$, trois fois plus petite.`,
    },
    {
      q: String.raw`Un délai suit une loi Erlang de moyenne 300 ms et de variance 30 000 ms². Ses paramètres sont :`,
      choices: [
        String.raw`$k=3,\ \lambda=0{,}01$`,
        String.raw`$k=10,\ \lambda=0{,}1$`,
        String.raw`$k=1,\ \lambda=300$`,
        String.raw`$k=2,\ \lambda=0{,}5$`,
      ],
      answer: 0,
      explanation: String.raw`$E=k/\lambda=300$ et $\operatorname{Var}=k/\lambda^2=30\,000$. Le rapport
        $\operatorname{Var}/E=1/\lambda=100$ donne $\lambda=0{,}01$, puis $k=\lambda E=3$.`,
    },
    {
      q: String.raw`Le nombre de fautes de frappe par page suit une loi de Poisson de moyenne 2. Probabilité qu'une page contienne au moins une faute ?`,
      choices: [
        String.raw`$e^{-2}\approx 0{,}14$`,
        String.raw`$2e^{-2}\approx 0{,}27$`,
        String.raw`$1-3e^{-2}\approx 0{,}59$`,
        String.raw`$1-e^{-2}\approx 0{,}86$`,
      ],
      answer: 3,
      explanation: String.raw`« Au moins une » se calcule par le complément : $1-P(X=0)=1-e^{-2}$. La valeur $1-3e^{-2}$
        correspondrait à « au moins deux » ($1-P(X=0)-P(X=1)$).`,
    },
    {
      q: String.raw`Si $\operatorname{Var}(X)=v$, que vaut $\operatorname{Var}(3X-2)$ ?`,
      choices: [
        String.raw`$9v$`,
        String.raw`$3v$`,
        String.raw`$9v-2$`,
        String.raw`$3v-2$`,
      ],
      answer: 0,
      explanation: String.raw`$\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$ : le facteur 3 devient 9, et la translation
        $-2$ ne change pas la dispersion.`,
    },
    {
      q: String.raw`On sait que $E[X]=2$ et $\operatorname{Var}(X)=3$. Que vaut $E[X^2]$ ?`,
      choices: [
        String.raw`$1$`,
        String.raw`$5$`,
        String.raw`$7$`,
        String.raw`$13$`,
      ],
      answer: 2,
      explanation: String.raw`$\operatorname{Var}(X)=E[X^2]-(E[X])^2$ donc $E[X^2]=3+2^2=7$. En particulier
        $E[X^2]\neq(E[X])^2$ dès que la variable n'est pas constante.`,
    },
    {
      q: String.raw`$X$ prend les valeurs 1, 2 et 3 avec la même probabilité. Que vaut $E[X^2]$ ?`,
      choices: [
        String.raw`$2$`,
        String.raw`$4$`,
        String.raw`$14/3$`,
        String.raw`$6$`,
      ],
      answer: 2,
      explanation: String.raw`LOTUS : $E[X^2]=\tfrac13(1+4+9)=\tfrac{14}{3}$. La réponse $4=(E[X])^2$ est le piège
        classique ; la différence $\tfrac{14}{3}-4=\tfrac23$ est justement la variance.`,
    },
    {
      q: String.raw`Parmi ces affirmations sur des variables aléatoires $X$ et $Y$ quelconques, laquelle est <strong>fausse</strong> ?`,
      choices: [
        String.raw`$E[X+Y]=E[X]+E[Y]$`,
        String.raw`$\operatorname{Var}(aX)=a^2\operatorname{Var}(X)$`,
        String.raw`$E[XY]=E[X]\,E[Y]$ si $X$ et $Y$ sont indépendantes`,
        String.raw`$\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)$`,
      ],
      answer: 3,
      explanation: String.raw`La variance d'une somme n'est additive que si les variables sont indépendantes (ou au moins
        non corrélées). Exemple : avec $Y=X$, $\operatorname{Var}(2X)=4\operatorname{Var}(X)\neq 2\operatorname{Var}(X)$.
        La linéarité de l'espérance, elle, n'a besoin d'aucune hypothèse.`,
    },
    {
      q: String.raw`Trois événements $A$, $B$, $C$ sont indépendants deux à deux. Peut-on conclure qu'ils sont mutuellement indépendants ?`,
      choices: [
        String.raw`Non : il existe des contre-exemples avec deux lancers de pièce.`,
        String.raw`Oui, toujours.`,
        String.raw`Oui, à condition que $P(A)=P(B)=P(C)$.`,
        String.raw`Oui, à condition qu'ils soient disjoints.`,
      ],
      answer: 0,
      explanation: String.raw`Avec $A$ = « pile au premier lancer », $B$ = « pile au second », $C$ = « même côté aux deux
        lancers », chaque paire est indépendante mais $P(A\cap B\cap C)=\tfrac14\neq P(A)P(B)P(C)=\tfrac18$.`,
    },
    {
      q: String.raw`$X$ est à valeurs dans $\{0,1,2,\dots\}$ et vérifie $P(X\ge k)=2^{-k}$ pour tout $k\ge 1$. Que vaut $E[X]$ ?`,
      choices: [
        String.raw`$1/2$`,
        String.raw`$1$`,
        String.raw`$2$`,
        String.raw`$+\infty$`,
      ],
      answer: 1,
      explanation: String.raw`Formule de la queue : $E[X]=\sum_{k\ge 1}P(X\ge k)=\sum_{k\ge 1}2^{-k}=1$. Inutile de
        reconstruire la pmf ($P(X=0)=\tfrac12$, $P(X=1)=\tfrac14$, …) pour conclure.`,
    },
  ],

  /* -------------------- EXERCICES -------------------- */
  exos: [
    {
      id: "ex-series-parallel",
      title: "Systèmes en série et en parallèle",
      difficulty: "facile",
      tags: ["fiabilité", "indépendance"],
      statement: String.raw`<p>Trois composants indépendants fonctionnent avec les probabilités
        $p_1=0{,}9$, $p_2=0{,}8$ et $p_3=0{,}95$. Calculer la probabilité que le système fonctionne
        lorsqu'ils sont montés (a) en série ; (b) en parallèle.</p>`,
      hints: [
        String.raw`En série, <em>tous</em> les composants doivent fonctionner. En parallèle, il suffit qu'<em>au moins un</em> fonctionne : passer par le complément.`,
      ],
      solution: String.raw`
        <p><strong>(a) Série.</strong> $R=\prod p_i = 0{,}9\times 0{,}8\times 0{,}95 = 0{,}684$.</p>
        <p><strong>(b) Parallèle.</strong> Le système tombe en panne seulement si les trois composants tombent en panne :
        $R=1-\prod(1-p_i)=1-0{,}1\times 0{,}2\times 0{,}05=1-0{,}001=0{,}999$.</p>
        <p>La redondance fait passer la fiabilité de 68 % à 99,9 %, alors que la mise en série la fait descendre sous
        celle du plus mauvais composant.</p>`,
    },
    {
      id: "ex-cooks",
      title: "Les trois cuisiniers",
      difficulty: "moyen",
      tags: ["Bayes", "probabilités totales"],
      statement: String.raw`<p>Trois cuisiniers A, B et C préparent des gâteaux. Leurs gâteaux ratent avec
        probabilités respectives $0{,}02$, $0{,}03$ et $0{,}05$. A prépare 50 % des gâteaux du restaurant,
        B 30 % et C 20 %.</p>
        <p>(a) Quelle proportion des gâteaux du restaurant ratent ? (b) Un gâteau a raté : quelle est la
        probabilité qu'il ait été préparé par A ?</p>`,
      solution: String.raw`
        <p>Notons $R$ l'événement « le gâteau rate ». Les données sont $P(R\mid A)=0{,}02$, $P(R\mid B)=0{,}03$,
        $P(R\mid C)=0{,}05$ et $P(A)=0{,}5$, $P(B)=0{,}3$, $P(C)=0{,}2$. Les cuisiniers forment une partition.</p>
        <p><strong>(a) Probabilités totales.</strong></p>
        <p>$$P(R)=0{,}02\times 0{,}5+0{,}03\times 0{,}3+0{,}05\times 0{,}2=0{,}010+0{,}009+0{,}010=0{,}029.$$</p>
        <p><strong>(b) Bayes.</strong>
        $P(A\mid R)=\dfrac{P(R\mid A)\,P(A)}{P(R)}=\dfrac{0{,}010}{0{,}029}\approx 0{,}345$.</p>
        <p>Bien que A soit le cuisinier le plus fiable, il prépare la moitié des gâteaux : il reste le suspect le plus
        probable, à égalité avec C.</p>`,
    },
    {
      id: "ex-cancer",
      title: "Test de dépistage",
      difficulty: "moyen",
      tags: ["Bayes", "taux de base"],
      statement: String.raw`<p>Un test de dépistage est positif chez 95 % des malades et négatif chez 96 % des
        personnes saines. La maladie touche 0,4 % de la population. Calculer la probabilité qu'une personne
        dont le test est positif soit réellement malade.</p>`,
      hints: [
        String.raw`« Négatif chez 96 % des personnes saines » signifie que le taux de faux positifs est $P(T\mid M^c)=0{,}04$.`,
        String.raw`Écrire Bayes avec le dénominateur $P(T)=P(T\mid M)\,P(M)+P(T\mid M^c)\,P(M^c)$.`,
      ],
      solution: String.raw`
        <p>Notons $M$ « malade » et $T$ « test positif ». On a $P(T\mid M)=0{,}95$, $P(T\mid M^c)=0{,}04$ et $P(M)=0{,}004$.</p>
        <p>$$P(M\mid T)=\frac{0{,}95\times 0{,}004}{0{,}95\times 0{,}004+0{,}04\times 0{,}996}
        =\frac{0{,}0038}{0{,}04364}\approx 0{,}087.$$</p>
        <p>Environ 9 % seulement. Le taux de base de 0,4 % domine : sur 10 000 personnes testées, on attend 38 vrais
        positifs mais près de 400 faux positifs.</p>`,
    },
    {
      id: "ex-coins",
      title: "Pièce équilibrée ou pièce truquée",
      difficulty: "moyen",
      tags: ["Bayes", "mise à jour séquentielle"],
      statement: String.raw`<p>Un joueur possède deux pièces : une pièce équilibrée et une pièce truquée dont les
        deux côtés sont « pile ». Il en choisit une au hasard et la lance plusieurs fois.</p>
        <p>(a) Le premier lancer donne pile. Quelle est la probabilité que la pièce choisie soit l'équilibrée ?
        (b) Le deuxième lancer donne encore pile. Même question. (c) Le troisième lancer donne face. Même question.</p>`,
      solution: String.raw`
        <p>Notons $E$ « la pièce est équilibrée » et $D$ « la pièce est truquée », avec $P(E)=P(D)=\tfrac12$.
        La pièce truquée donne pile à coup sûr.</p>
        <p><strong>(a)</strong> Avec $H_1$ = « un pile » :
        $P(E\mid H_1)=\dfrac{P(H_1\mid E)\,P(E)}{P(H_1\mid E)\,P(E)+P(H_1\mid D)\,P(D)}
        =\dfrac{\tfrac12\cdot\tfrac12}{\tfrac12\cdot\tfrac12+1\cdot\tfrac12}=\dfrac13.$</p>
        <p><strong>(b)</strong> Avec $H_2$ = « deux piles de suite », $P(H_2\mid E)=\tfrac14$ :
        $P(E\mid H_2)=\dfrac{\tfrac14\cdot\tfrac12}{\tfrac14\cdot\tfrac12+1\cdot\tfrac12}=\dfrac15.$
        Chaque pile supplémentaire renforce l'hypothèse « truquée ».</p>
        <p><strong>(c)</strong> Un face est impossible avec la pièce truquée : $P(\text{face}\mid D)=0$, donc
        $P(E\mid \text{face})=1$. Une seule observation incompatible tranche définitivement.</p>`,
    },
    {
      id: "ex-lathes",
      title: "Sept machines, dont quatre tours",
      difficulty: "facile",
      tags: ["hypergéométrique", "pmf"],
      statement: String.raw`<p>Un atelier possède 7 machines, dont 4 tours. On en choisit 2 au hasard, sans remise.
        Soit $X$ le nombre de tours parmi les machines choisies. Donner la loi de $X$ et vérifier qu'il s'agit
        bien d'une fonction de masse.</p>`,
      solution: String.raw`
        <p>$X$ prend ses valeurs dans $\{0,1,2\}$ et suit une loi hypergéométrique :</p>
        <p>$$p(0)=\frac{\binom{4}{0}\binom{3}{2}}{\binom{7}{2}}=\frac{3}{21},\qquad
        p(1)=\frac{\binom{4}{1}\binom{3}{1}}{\binom{7}{2}}=\frac{12}{21},\qquad
        p(2)=\frac{\binom{4}{2}\binom{3}{0}}{\binom{7}{2}}=\frac{6}{21}.$$</p>
        <p>Les trois valeurs sont positives et $\tfrac{3+12+6}{21}=1$. On retrouve aussi
        $E[X]=n\tfrac{K}{N}=2\times\tfrac47=\tfrac87$, ce que confirme le calcul direct
        $\tfrac{12}{21}+2\times\tfrac{6}{21}=\tfrac{24}{21}$.</p>`,
    },
    {
      id: "ex-yield",
      title: "Rendement de 85 % : trois questions, trois lois",
      difficulty: "moyen",
      tags: ["Binomiale", "Géométrique", "Binomiale négative"],
      statement: String.raw`<p>Un procédé de fabrication a un rendement de 85 % : chaque pièce est défectueuse avec
        probabilité 0,15, indépendamment des autres. On produit 50 pièces.</p>
        <p>(a) Probabilité d'obtenir exactement 8 pièces défectueuses ? (b) Probabilité que la 10ᵉ pièce produite
        soit la première défectueuse ? (c) Probabilité que la 20ᵉ pièce produite soit la troisième défectueuse ?</p>`,
      hints: [String.raw`Chaque question correspond à une loi différente : nombre fixé d'essais, attente du premier succès, attente du $r$-ième succès. Ici le « succès » est une pièce défectueuse.`],
      solution: String.raw`
        <p><strong>(a) Binomiale$(50;\,0{,}15)$.</strong> $P(X=8)=\binom{50}{8}(0{,}15)^8(0{,}85)^{42}\approx 0{,}149$.</p>
        <p><strong>(b) Géométrique$(0{,}15)$.</strong> Neuf bonnes pièces puis une défectueuse :
        $P(X=10)=(0{,}85)^9\times 0{,}15\approx 0{,}035$.</p>
        <p><strong>(c) Binomiale négative$(3;\,0{,}15)$.</strong> Deux défectueuses parmi les 19 premières, puis une
        défectueuse en 20ᵉ position : $P(X=20)=\binom{19}{2}(0{,}15)^3(0{,}85)^{17}\approx 0{,}036$.</p>`,
    },
    {
      id: "ex-poisson-cars",
      title: "Arrivées de voitures à un péage",
      difficulty: "facile",
      tags: ["Poisson", "complément"],
      statement: String.raw`<p>Le nombre de voitures arrivant à un péage en une minute suit une loi de Poisson de
        moyenne $\lambda=8$. (a) Probabilité qu'il en arrive exactement 5 ? (b) Probabilité qu'il en arrive plus de 2 ?</p>`,
      solution: String.raw`
        <p><strong>(a)</strong> $P(X=5)=\dfrac{e^{-8}\,8^5}{5!}\approx 0{,}092$.</p>
        <p><strong>(b)</strong> On passe par le complément :
        $P(X>2)=1-\big[p(0)+p(1)+p(2)\big]=1-e^{-8}\!\left(1+8+\tfrac{8^2}{2}\right)\approx 0{,}986$.</p>
        <p>Réflexe à garder : on ne somme jamais une queue infinie à la main, on calcule le complément.</p>`,
    },
    {
      id: "ex-polypdf",
      title: "D'une densité polynomiale à la fonction de répartition",
      difficulty: "moyen",
      tags: ["densité", "cdf"],
      statement: String.raw`<p>Soit $X$ une variable continue de densité $f(x)=\tfrac34(1-x^2)$ pour $-1&lt;x<1$, et
        $f(x)=0$ ailleurs. Déterminer $F(x)$ sur tout $\mathbb R$, puis calculer $P(-0{,}5&lt;X<0{,}75)$.</p>`,
      solution: String.raw`
        <p>Pour $-1&lt;x\le 1$ : $F(x)=\displaystyle\int_{-1}^{x}\tfrac34(1-t^2)\,dt=\tfrac34\Big[t-\tfrac{t^3}{3}\Big]_{-1}^{x}
        =\tfrac14\big(2+3x-x^3\big)$.</p>
        <p>$$F(x)=\begin{cases}0,& x\le -1\\[4pt]\tfrac14(2+3x-x^3),& -1&lt;x\le 1\\[4pt]1,& x>1.\end{cases}$$</p>
        <p>On vérifie $F(-1)=0$ et $F(1)=\tfrac14(2+3-1)=1$. Ensuite
        $P(-0{,}5&lt;X<0{,}75)=F(0{,}75)-F(-0{,}5)\approx 0{,}957-0{,}156=0{,}801$.</p>`,
    },
    {
      id: "ex-exp-life",
      title: "Durée de vie exponentielle",
      difficulty: "facile",
      tags: ["Exponentielle", "sans mémoire"],
      statement: String.raw`<p>La durée de vie $X$ d'un organisme unicellulaire suit une loi exponentielle de paramètre
        $\lambda=0{,}1$ par heure. (a) Probabilité qu'il vive plus de 20 heures ? (b) Probabilité qu'il meure dans
        les 5 premières heures ? (c) Il a déjà vécu 10 heures : probabilité qu'il vive encore au moins 20 heures ?</p>`,
      solution: String.raw`
        <p><strong>(a)</strong> $P(X>20)=e^{-\lambda\times 20}=e^{-2}\approx 0{,}135$.</p>
        <p><strong>(b)</strong> $P(X\le 5)=F(5)=1-e^{-0{,}5}\approx 0{,}393$.</p>
        <p><strong>(c)</strong> Absence de mémoire : $P(X>30\mid X>10)=P(X>20)=e^{-2}\approx 0{,}135$, la même
        valeur qu'en (a). Le temps déjà vécu ne modifie pas la loi du temps restant.</p>`,
    },
    {
      id: "ex-erlang-msg",
      title: "Délai d'acheminement d'un message",
      difficulty: "difficile",
      tags: ["Erlang", "moyenne et variance"],
      statement: String.raw`<p>Le temps d'acheminement d'un message suit une loi Erlang de moyenne 300 ms et de
        variance 30 000 ms². (a) Déterminer $k$ et $\lambda$. (b) Probabilité que le message arrive en moins de
        600 ms ? (c) Probabilité qu'il mette plus de 900 ms ?</p>`,
      hints: [
        String.raw`$E[X]=k/\lambda$ et $\operatorname{Var}(X)=k/\lambda^2$ : le rapport $\operatorname{Var}/E$ donne directement $1/\lambda$.`,
        String.raw`Fonction de survie de l'Erlang : $P(X>x)=\sum_{r=0}^{k-1}\dfrac{e^{-\lambda x}(\lambda x)^r}{r!}$ (probabilité qu'une Poisson de moyenne $\lambda x$ soit inférieure à $k$).`,
      ],
      solution: String.raw`
        <p><strong>(a)</strong> $\dfrac{\operatorname{Var}(X)}{E[X]}=\dfrac1\lambda=\dfrac{30\,000}{300}=100$, donc
        $\lambda=0{,}01$ ms$^{-1}$, puis $k=\lambda\,E[X]=0{,}01\times 300=3$.</p>
        <p><strong>(b)</strong> Avec $\lambda x=6$ :
        $P(X\le 600)=1-e^{-6}\!\left(1+6+\tfrac{6^2}{2}\right)=1-25e^{-6}\approx 0{,}938$.</p>
        <p><strong>(c)</strong> Avec $\lambda x=9$ :
        $P(X>900)=e^{-9}\!\left(1+9+\tfrac{9^2}{2}\right)=50{,}5\,e^{-9}\approx 0{,}006$.</p>`,
    },
    {
      id: "ex-findab",
      title: "Retrouver les paramètres d'une cdf",
      difficulty: "difficile",
      tags: ["cdf", "espérance"],
      statement: String.raw`<p>La fonction de répartition d'une variable continue $X$ est $F(x)=ax+\tfrac{b}{3}x^3$ pour
        $0\le x\le 1$, avec $F(x)=0$ pour $x<0$ et $F(x)=1$ pour $x>1$. Sachant que $E[X]=0{,}6$, déterminer $a$ et $b$.</p>`,
      hints: [
        String.raw`Deux inconnues, donc deux conditions : la continuité $F(1)=1$ et la valeur de $E[X]$.`,
        String.raw`Densité : $f(x)=F'(x)=a+bx^2$, puis $E[X]=\int_0^1 x\,f(x)\,dx$.`,
      ],
      solution: String.raw`
        <p>Densité sur $[0,1]$ : $f(x)=F'(x)=a+bx^2$.</p>
        <p><strong>Condition 1</strong> ($F(1)=1$, ce qui équivaut à $\int_0^1 f=1$) : $a+\tfrac{b}{3}=1$.</p>
        <p><strong>Condition 2</strong> : $E[X]=\displaystyle\int_0^1 x(a+bx^2)\,dx=\tfrac{a}{2}+\tfrac{b}{4}=0{,}6$.</p>
        <p>De la première, $a=1-\tfrac{b}{3}$. Dans la seconde :
        $\tfrac12-\tfrac{b}{6}+\tfrac{b}{4}=0{,}6$, soit $\tfrac{b}{12}=0{,}1$, donc $b=1{,}2$ puis $a=0{,}6$.</p>
        <p>Vérification : $f(x)=0{,}6+1{,}2x^2\ge 0$ sur $[0,1]$, la densité est bien valide.</p>`,
    },
    {
      id: "ex-docsize",
      title: "Taille d'un document (loi à queue lourde)",
      difficulty: "difficile",
      tags: ["variance", "LOTUS", "Pareto"],
      statement: String.raw`<p>La taille $X$ d'un document (en Ko) a pour densité $f(x)=\dfrac{24}{x^4}$ pour $x\ge 2$,
        et $f(x)=0$ sinon. Calculer $E[X]$ puis $\operatorname{Var}(X)$.</p>`,
      hints: [String.raw`$\operatorname{Var}(X)=E[X^2]-(E[X])^2$ ; calculer $E[X]$ et $E[X^2]$ par LOTUS, en intégrant des puissances de $x$.`],
      solution: String.raw`
        <p>$E[X]=\displaystyle\int_2^\infty x\cdot\frac{24}{x^4}\,dx=24\int_2^\infty x^{-3}\,dx
        =24\Big[\frac{x^{-2}}{-2}\Big]_2^\infty=24\times\frac{1}{8}=3.$</p>
        <p>$E[X^2]=\displaystyle\int_2^\infty x^2\cdot\frac{24}{x^4}\,dx=24\int_2^\infty x^{-2}\,dx
        =24\times\frac{1}{2}=12.$</p>
        <p>$\operatorname{Var}(X)=12-3^2=3.$</p>
        <p>Remarque : avec une densité en $x^{-4}$, $E[X^2]$ converge de justesse ; une queue en $x^{-3}$ donnerait une
        variance infinie. C'est le comportement typique des tailles de fichiers ou de documents.</p>`,
    },
  ],

  /* -------------------- DÉFINITIONS -------------------- */
  definitions: [
    { term: "Univers et événement", def: String.raw`L'<strong>univers</strong> $\Omega$ est l'ensemble de tous les résultats possibles d'une expérience aléatoire. Un <strong>événement</strong> est un sous-ensemble $A\subseteq\Omega$ ; il est réalisé si le résultat obtenu lui appartient.` },
    { term: "Mesure de probabilité", def: String.raw`Application $P$ qui associe à chaque événement un nombre et vérifie les trois axiomes : $P(A)\ge 0$, $P(\Omega)=1$, et additivité dénombrable ($P(\bigcup_i A_i)=\sum_i P(A_i)$ pour des $A_i$ deux à deux disjoints).` },
    { term: "Événements disjoints (incompatibles)", def: String.raw`$A\cap B=\varnothing$ : ils ne peuvent pas se produire en même temps, donc $P(A\cup B)=P(A)+P(B)$. Disjoint <em>n'est pas</em> indépendant : deux événements disjoints de probabilité non nulle ne sont jamais indépendants.` },
    { term: "Inclusion-exclusion", def: String.raw`$P(A\cup B)=P(A)+P(B)-P(A\cap B)$. Le terme soustrait corrige le double comptage de l'intersection.` },
    { term: "Probabilité conditionnelle", def: String.raw`Pour $P(B)>0$, $P(A\mid B)=P(A\cap B)/P(B)$ : probabilité de $A$ sachant que $B$ s'est produit. Notations équivalentes de l'intersection : $P(A\cap B)$, $P(A,B)$, $P(AB)$.` },
    { term: "Règle de multiplication", def: String.raw`$P(A\cap B)=P(A\mid B)\,P(B)=P(B\mid A)\,P(A)$. Sert à calculer la probabilité d'un enchaînement d'événements pas à pas.` },
    { term: "Indépendance", def: String.raw`$A$ et $B$ sont indépendants si $P(A\cap B)=P(A)P(B)$, ce qui équivaut à $P(A\mid B)=P(A)$. L'<strong>indépendance mutuelle</strong> de plusieurs événements exige la règle du produit pour <em>toutes</em> les sous-collections ; l'indépendance deux à deux ne suffit pas.` },
    { term: "Partition", def: String.raw`Famille $B_1,\dots,B_n$ d'événements deux à deux disjoints dont la réunion est $\Omega$ (avec $P(B_i)>0$). Elle découpe toute situation en cas exhaustifs et exclusifs.` },
    { term: "Formule des probabilités totales", def: String.raw`Pour une partition $(B_i)$ : $P(A)=\sum_i P(A\mid B_i)\,P(B_i)$. On calcule $A$ en le découpant selon les cas $B_i$.` },
    { term: "Règle de Bayes", def: String.raw`$P(B_j\mid A)=\dfrac{P(A\mid B_j)P(B_j)}{\sum_i P(A\mid B_i)P(B_i)}$. Renverse le conditionnement : <strong>a posteriori</strong> $\propto$ <strong>a priori</strong> $\times$ <strong>vraisemblance</strong>.` },
    { term: "A priori, a posteriori, vraisemblance", def: String.raw`Dans Bayes, $P(B_j)$ est la probabilité <strong>a priori</strong> (avant observation), $P(A\mid B_j)$ la <strong>vraisemblance</strong> de l'observation sous l'hypothèse $B_j$, et $P(B_j\mid A)$ la probabilité <strong>a posteriori</strong> (après observation).` },
    { term: "Piège du taux de base", def: String.raw`Quand la cause est rare (a priori faible), même un test fiable produit surtout des faux positifs : la probabilité a posteriori d'être réellement atteint reste faible malgré un résultat positif.` },
    { term: "Fiabilité en série / en parallèle", def: String.raw`Composants indépendants de fiabilités $p_i$. <strong>Série</strong> (tous doivent marcher) : $R=\prod p_i$, inférieure au maillon le plus faible. <strong>Parallèle</strong> (au moins un suffit) : $R=1-\prod(1-p_i)$, supérieure au meilleur composant.` },
    { term: "Variable aléatoire", abbr: "v.a.", def: String.raw`Fonction $X$ qui associe un nombre à chaque résultat de l'expérience. <strong>Discrète</strong> si elle prend des valeurs isolées (entiers), <strong>continue</strong> si elle prend ses valeurs dans un intervalle.` },
    { term: "Fonction de répartition", abbr: "cdf", def: String.raw`<em>Cumulative distribution function</em> : $F(x)=P(X\le x)$. Croissante, continue à droite, tend vers 0 en $-\infty$ et vers 1 en $+\infty$. Dans le cas continu, $F'=f$ et $P(a\lt X\le b)=F(b)-F(a)$.` },
    { term: "Fonction de masse", abbr: "pmf", def: String.raw`<em>Probability mass function</em> d'une v.a. discrète : $p(x)=P(X=x)$, avec $p(x)\ge 0$ et $\sum_x p(x)=1$.` },
    { term: "Densité de probabilité", abbr: "pdf", def: String.raw`<em>Probability density function</em> d'une v.a. continue : $f\ge 0$ avec $\int_{\mathbb R}f=1$ et $P(a\lt X\le b)=\int_a^b f(x)\,dx$. En un point, $P(X=x)=0$ : seuls les intervalles portent de la probabilité.` },
    { term: "Espérance", def: String.raw`Moyenne pondérée des valeurs : $E[X]=\sum_x x\,p(x)$ (discret) ou $\int x f(x)\,dx$ (continu). <strong>Linéaire</strong> sans aucune hypothèse : $E[aX+bY]=aE[X]+bE[Y]$.` },
    { term: "LOTUS", abbr: "LOTUS", def: String.raw`<em>Law of the unconscious statistician</em> : $E[g(X)]=\sum_x g(x)p(x)$ ou $\int g(x)f(x)\,dx$. Permet de calculer l'espérance d'une fonction de $X$ sans chercher la loi de $g(X)$.` },
    { term: "Variance et écart-type", def: String.raw`$\operatorname{Var}(X)=E[(X-E[X])^2]=E[X^2]-(E[X])^2$ mesure la dispersion autour de la moyenne ; $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$. L'écart-type est $\sigma=\sqrt{\operatorname{Var}(X)}$. $\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)$ exige l'indépendance.` },
    { term: "Fonction de survie et formule de la queue", def: String.raw`$P(X>x)=1-F(x)$. Pour $X\ge 0$ : $E[X]=\sum_{k\ge 1}P(X\ge k)$ (entier) ou $E[X]=\int_0^\infty P(X>x)\,dx$ (continu).` },
    { term: "Absence de mémoire", def: String.raw`$P(X>s+t\mid X>s)=P(X>t)$ : avoir déjà attendu ne change pas la loi de l'attente restante. Seules lois sans mémoire : <strong>Géométrique</strong> (discret) et <strong>Exponentielle</strong> (continu).` },
    { term: "Loi de Bernoulli", def: String.raw`Bernoulli$(p)$ : $X\in\{0,1\}$, $P(X=1)=p$. Modélise un essai à deux issues (succès/échec). $E=p$, $\operatorname{Var}=p(1-p)$.` },
    { term: "Loi binomiale", def: String.raw`Binomiale$(n,p)$ : nombre de succès sur $n$ essais indépendants de probabilité $p$. $P(X=x)=\binom{n}{x}p^x(1-p)^{n-x}$, $E=np$, $\operatorname{Var}=np(1-p)$.` },
    { term: "Loi géométrique", def: String.raw`Géométrique$(p)$ : rang du premier succès, $P(X=x)=(1-p)^{x-1}p$ pour $x\ge 1$. $E=1/p$, $\operatorname{Var}=(1-p)/p^2$. Sans mémoire.` },
    { term: "Loi binomiale négative", def: String.raw`Binomiale négative$(r,p)$ : rang du $r$-ième succès, $P(X=x)=\binom{x-1}{r-1}p^r(1-p)^{x-r}$ pour $x\ge r$. $E=r/p$. Somme de $r$ géométriques indépendantes.` },
    { term: "Loi hypergéométrique", def: String.raw`Hypergéométrique$(N,K,n)$ : nombre d'objets marqués dans $n$ tirages <strong>sans remise</strong> parmi $N$ objets dont $K$ marqués. $P(X=x)=\binom{K}{x}\binom{N-K}{n-x}/\binom{N}{n}$, $E=nK/N$.` },
    { term: "Loi de Poisson", def: String.raw`Poisson$(\lambda)$ : nombre d'événements sur une période, à taux moyen $\lambda$. $P(X=x)=e^{-\lambda}\lambda^x/x!$, $E=\operatorname{Var}=\lambda$. Approche la Binomiale quand $n$ est grand et $p$ petit ($\lambda=np$).` },
    { term: "Loi uniforme", def: String.raw`Uniforme$(a,b)$ : densité $1/(b-a)$ sur $[a,b]$, aucune valeur privilégiée. $E=(a+b)/2$, $\operatorname{Var}=(b-a)^2/12$.` },
    { term: "Loi exponentielle", def: String.raw`Exponentielle$(\lambda)$ : densité $\lambda e^{-\lambda x}$ pour $x\ge 0$, $P(X>t)=e^{-\lambda t}$. Durées de vie et temps d'attente ; $E=1/\lambda$, $\operatorname{Var}=1/\lambda^2$. Sans mémoire.` },
    { term: "Loi d'Erlang", def: String.raw`Erlang$(k,\lambda)$ : somme de $k$ exponentielles indépendantes de paramètre $\lambda$. Densité $\lambda^k x^{k-1}e^{-\lambda x}/(k-1)!$, $E=k/\lambda$, $\operatorname{Var}=k/\lambda^2$. Pas sans mémoire si $k\ge 2$.` },
    { term: "Loi normale (gaussienne)", def: String.raw`Normale$(\mu,\sigma^2)$ : densité $\frac{1}{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/(2\sigma^2)}$, $E=\mu$, $\operatorname{Var}=\sigma^2$. Somme de nombreux petits effets indépendants.` },
  ],
});
