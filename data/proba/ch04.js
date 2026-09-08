/* ============================================================
   Probabilités — Chapitre 4 : Chaînes de Markov à temps discret
   Source : slides IMEN266 ch4 + Companion (Ross, ch. 4).
   Contenu rédigé pour la révision — à relire et valider.
   NB : les champs contenant du LaTeX utilisent String.raw pour
   préserver les backslashes. Ne jamais écrire la séquence ${ }.
   ============================================================ */
addChapter("proba", {
  id: "ch04",
  title: "Chapitre 4 — Chaînes de Markov à temps discret",
  short: "Ch. 4",
  lang: "fr",

  /* -------------------- RÉSUMÉ DE COURS -------------------- */
  summary: String.raw`
    <h3>1. Processus stochastique</h3>
    <p>Un <strong>processus stochastique</strong> est une famille de variables aléatoires
    $\{X_t,\ t\in I\}$ indexée par le temps : pour chaque instant $t$ fixé, $X_t$ est une variable
    aléatoire. Le temps peut être discret ($I=\{0,1,2,\dots\}$) ou continu ($I=[0,\infty)$), et les
    valeurs prises (l'<strong>espace d'états</strong>) peuvent elles aussi être discrètes ou
    continues. Ce chapitre traite le cas « temps discret, états discrets » : les chaînes de Markov à
    temps discret, notées DTMC (<em>discrete-time Markov chain</em>).</p>

    <h3>2. Chaîne de Markov à temps discret</h3>
    <p>Une suite $\{X_n,\ n\ge 0\}$ à valeurs dans un espace d'états dénombrable $S$ est une DTMC si,
    pour tous états $i,j$ et toute trajectoire passée :</p>
    <p>$$P(X_{n+1}=j\mid X_n=i,\ X_{n-1}=i_{n-1},\dots,X_0=i_0)=P(X_{n+1}=j\mid X_n=i)=P_{ij}.$$</p>
    <p>Cette égalité contient deux hypothèses distinctes :</p>
    <ul>
      <li>la <strong>propriété de Markov</strong> : conditionnellement à l'état présent $X_n$, le futur
          ne dépend pas du passé. Tout ce qu'il faut savoir pour prédire la suite est contenu dans
          l'état courant ;</li>
      <li>l'<strong>homogénéité temporelle</strong> : la probabilité de passer de $i$ à $j$ en un pas ne
          dépend pas de l'instant $n$. Une seule matrice $P$ décrit toute l'évolution.</li>
    </ul>
    <p>La <strong>matrice de transition</strong> $P=(P_{ij})$ est <em>stochastique</em> : ses
    coefficients sont positifs et <em>chaque ligne somme à 1</em> ($\sum_j P_{ij}=1$), car depuis l'état
    $i$ la chaîne va nécessairement quelque part. La ligne $i$ est le point de départ, la colonne $j$
    le point d'arrivée.</p>
    <div class="callout"><strong>Méthode de modélisation en cinq étapes.</strong>
      <p>(1) Définir $X_n$, l'état observé à l'instant $n$. (2) Écrire l'espace d'états $S$.
      (3) Vérifier la propriété de Markov et l'homogénéité. (4) Calculer $P$ et contrôler que chaque
      ligne somme à 1. (5) Dessiner le diagramme de transition.</p>
      <p>Si la description naturelle du système a de la mémoire (l'âge d'un outil, le temps qu'il a fait
      hier), il faut <em>agrandir l'état</em> jusqu'à ce qu'il contienne toute l'information utile : par
      exemple prendre pour état le couple (temps d'hier, temps d'aujourd'hui).</p></div>

    <h3>3. Comportement transitoire</h3>
    <p>Notons $a=[P(X_0=0),\ P(X_0=1),\ \dots]$ la <strong>distribution initiale</strong> (vecteur
    ligne) et $p_n=[P(X_n=0),\ P(X_n=1),\ \dots]$ la distribution à l'instant $n$. Alors :</p>
    <p>$$p_1=aP,\qquad p_2=aP^2,\qquad\dots,\qquad p_n=aP^n.$$</p>
    <p>Le vecteur ligne se place <em>à gauche</em> de la matrice. Les coefficients de $P^n$ sont les
    <strong>probabilités de transition en $n$ pas</strong> : $P^{(n)}_{ij}=P(X_n=j\mid X_0=i)$. Les
    <strong>équations de Chapman-Kolmogorov</strong> $P^{(m+n)}_{ij}=\sum_k P^{(m)}_{ik}P^{(n)}_{kj}$
    expriment qu'aller de $i$ à $j$ en $m+n$ pas, c'est passer par un état intermédiaire $k$ après
    $m$ pas ; matriciellement, $P^{(n)}=P^n$.</p>
    <p>La <strong>probabilité d'une trajectoire</strong> se factorise grâce à la propriété de Markov :
    $P(X_0=i_0,\ X_1=i_1,\dots,X_n=i_n)=a_{i_0}\,P_{i_0 i_1}\,P_{i_1 i_2}\cdots P_{i_{n-1} i_n}$.</p>

    <h3>4. Classification des états</h3>
    <ul>
      <li>$j$ est <strong>accessible</strong> depuis $i$ (noté $i\to j$) s'il existe $n\ge 0$ tel que
          $P^{(n)}_{ij}>0$. Si $i\to j$ et $j\to i$, les deux états <strong>communiquent</strong>. La
          communication découpe $S$ en <strong>classes</strong> ; la chaîne est <strong>irréductible</strong>
          si elle ne possède qu'une seule classe.</li>
      <li>Un état est <strong>récurrent</strong> si, partant de lui, on y revient avec probabilité 1
          ($f_i=1$), <strong>transitoire</strong> sinon ($f_i<1$). Critère : $i$ est récurrent si et
          seulement si $\sum_n P^{(n)}_{ii}=\infty$. Un état transitoire n'est visité qu'un nombre fini de
          fois ; un état récurrent est visité infiniment souvent. La récurrence est une propriété de classe.</li>
      <li>Un état récurrent est <strong>récurrent positif</strong> si le temps de retour moyen $m_i$ est
          fini. Dans une chaîne à espace d'états <em>fini</em>, tout état récurrent est récurrent positif,
          et une classe est récurrente si et seulement si elle est <strong>fermée</strong> (aucune
          transition n'en sort).</li>
      <li>Un état est <strong>absorbant</strong> si $P_{ii}=1$ : il forme à lui seul une classe fermée.</li>
      <li>La <strong>période</strong> de $i$ est $d(i)=\gcd\{n\ge 1 : P^{(n)}_{ii}>0\}$. L'état est
          <strong>apériodique</strong> si $d(i)=1$ ; une boucle $P_{ii}>0$ suffit à le garantir. La
          période est aussi une propriété de classe.</li>
    </ul>
    <div class="callout"><strong>Chaîne ergodique</strong> $=$ irréductible $+$ récurrente positive $+$
      apériodique. Pour ces chaînes, tout se passe bien : il existe une unique distribution stationnaire,
      et la chaîne converge vers elle quel que soit l'état de départ.</div>

    <h3>5. Comportement limite et distribution stationnaire</h3>
    <p>Si la chaîne est <strong>irréductible et récurrente positive</strong>, le système</p>
    <p>$$\pi=\pi P,\qquad \sum_{i\in S}\pi_i=1$$</p>
    <p>admet une <strong>unique</strong> solution $\pi$, appelée distribution stationnaire. Elle a deux
    interprétations : $\pi_i$ est la fraction de temps passée dans l'état $i$ sur le long terme, et
    $\pi_i=1/m_i$ où $m_i$ est le temps de retour moyen en $i$.</p>
    <p>Si la chaîne est de plus <strong>apériodique</strong> (donc ergodique), alors
    $\lim_{n\to\infty}P(X_n=i)=\pi_i$ pour <em>toute</em> distribution initiale $a$ : chaque ligne de
    $P^n$ converge vers $\pi$ et l'état de départ est oublié.</p>
    <div class="callout warn"><strong>Trois pièges.</strong>
      <p>Une chaîne irréductible mais <em>périodique</em> (par exemple un cycle à trois états) possède
      une unique distribution stationnaire, mais $P(X_n=i)$ oscille et n'a pas de limite.</p>
      <p>Une chaîne <em>réductible</em> peut avoir plusieurs distributions stationnaires, et la limite
      éventuelle dépend alors du point de départ.</p>
      <p>Dans le système $\pi=\pi P$, une équation est toujours redondante (les lignes de $P$ somment à 1).
      On en supprime une et on la remplace par la normalisation $\sum_i\pi_i=1$.</p></div>

    <h3>6. Coût et récompense à long terme</h3>
    <p>Si un coût $C(i)$ est payé chaque fois que la chaîne se trouve dans l'état $i$, le
    <strong>coût moyen par période</strong> sur le long terme vaut</p>
    <p>$$\lim_{n\to\infty}\frac1n\sum_{k=1}^n C(X_k)=\sum_{i\in S}C(i)\,\pi_i.$$</p>
    <p>À gauche, une moyenne le long d'une seule trajectoire (moyenne temporelle) ; à droite, une
    moyenne sur la population des états pondérée par $\pi$ (moyenne d'ensemble). Leur égalité est
    précisément ce que garantit l'ergodicité. Exemples traités en exercice : disponibilité d'une
    machine ($\pi_{\text{marche}}$), fraction de trajets sous la pluie sans parapluie ($p\,\pi_0$),
    âge moyen d'un outil en service ($\sum_i i\,\pi_i$), durée de vie moyenne d'un outil ($1/\pi_0$).</p>

    <h3>7. PageRank</h3>
    <p>Un surfeur aléatoire se déplace sur $n$ pages en suivant à chaque étape un lien sortant choisi
    uniformément : c'est une DTMC de matrice $P$, et le <strong>rang</strong> de la page $j$ est
    $\pi_j$, sa fréquence de visite à long terme. Deux défauts du graphe du web cassent l'ergodicité :
    les <strong>culs-de-sac</strong> (pages sans lien sortant, la ligne de $P$ est nulle et la masse de
    probabilité fuit) et les <strong>pièges</strong> (groupes de pages absorbants qui finissent par
    capter toute la masse).</p>
    <p>La solution est la <strong>taxation</strong> : avec probabilité $\beta$ le surfeur suit un lien,
    avec probabilité $1-\beta$ il saute vers une page uniformément au hasard. On remplace $P$ par</p>
    <p>$$G=\beta P+\frac{1-\beta}{n}\,\mathbf 1\mathbf 1^{\top},$$</p>
    <p>matrice strictement positive, donc ergodique : $\pi=\pi G$ a une solution unique, et
    l'<strong>itération de puissance</strong> $p_{k+1}=p_kG$ converge vers $\pi$ au taux $\beta$ :
    $\lVert p_k-\pi\rVert_1\le\beta^k\lVert p_0-\pi\rVert_1$. Une page sans aucun lien entrant reçoit
    exactement $\pi_j=(1-\beta)/n$.</p>
  `,

  /* -------------------- FICHE PARTIEL -------------------- */
  keyPoints: [
    {
      text: String.raw`<strong>Propriété de Markov et homogénéité.</strong> « Le futur ne dépend du passé qu'à
        travers le présent » : on ne garde que $X_n$. « Les probabilités ne dépendent pas de $n$ » : une seule
        matrice $P$. Chaque ligne de $P$ somme à 1 (ligne = départ, colonne = arrivée).`,
    },
    {
      text: String.raw`<strong>Modéliser en cinq étapes.</strong> Définir $X_n$, écrire $S$, vérifier Markov et
        homogénéité, calculer $P$ (lignes à 1), dessiner le diagramme. Si l'état naturel a de la mémoire,
        l'agrandir (par exemple en gardant les deux dernières observations).`,
      exos: ["ex-himart", "ex-umbrellas", "ex-tool"],
    },
    {
      text: String.raw`<strong>Transitoire : $p_n=aP^n$.</strong> Chapman-Kolmogorov donne $P^{(n)}=P^n$. Entre les
        instants 1 et 5 il y a 4 pas : $P(X_5=2\mid X_1=3)=(P^4)_{32}$. La probabilité d'une trajectoire est le
        produit des probabilités de chaque pas, multiplié par la probabilité initiale.`,
      exos: ["ex-transient4", "ex-pohang"],
    },
    {
      text: String.raw`<strong>Classification.</strong> Classes de communication ; irréductible si une seule
        classe. Récurrent (retour certain) ou transitoire. Chaîne finie : une classe est récurrente si et
        seulement si elle est fermée. Période $=\gcd$ des longueurs de retour ; une boucle $P_{ii}>0$ rend
        l'état apériodique. Ergodique $=$ irréductible $+$ récurrente positive $+$ apériodique.`,
    },
    {
      text: String.raw`<strong>Stationnaire : $\pi=\pi P$, $\sum_i\pi_i=1$.</strong> Solution unique si
        irréductible et récurrente positive ; si de plus apériodique, $\lim P(X_n=i)=\pi_i$ pour tout départ.
        Une équation de balance est redondante : la remplacer par la normalisation. Temps de retour moyen
        $m_i=1/\pi_i$.`,
      exos: ["ex-machine", "ex-pohang"],
    },
    {
      text: String.raw`<strong>Coût à long terme $=\sum_i C(i)\,\pi_i$.</strong> Moyenne temporelle sur une
        trajectoire $=$ moyenne d'ensemble pondérée par $\pi$. Pour optimiser un paramètre (nombre de
        parapluies, seuil de commande), écrire le coût moyen $\tau$ en fonction de ce paramètre, le minimiser,
        puis comparer les entiers voisins.`,
      exos: ["ex-kim", "ex-umbrellas", "ex-tool"],
    },
    {
      text: String.raw`<strong>PageRank.</strong> Traiter les culs-de-sac, puis taxer :
        $G=\beta P+\tfrac{1-\beta}{n}\mathbf 1\mathbf 1^\top$ est strictement positive donc ergodique.
        L'itération de puissance converge au taux $\beta$. Une page sans lien entrant a $\pi_j=(1-\beta)/n$.`,
      exos: ["ex-pagerank"],
    },
  ],

  /* -------------------- FORMULAIRE -------------------- */
  formulas: [
    { name: "Propriété de Markov", latex: String.raw`P(X_{n+1}=j\mid X_n=i,\dots,X_0=i_0)=P(X_{n+1}=j\mid X_n=i)=P_{ij}` },
    { name: "Matrice stochastique", note: "chaque ligne somme à 1", latex: String.raw`P_{ij}\ge 0,\qquad \sum_{j\in S}P_{ij}=1\quad\text{pour tout } i` },
    { name: "Chapman-Kolmogorov", latex: String.raw`P^{(m+n)}_{ij}=\sum_{k\in S}P^{(m)}_{ik}\,P^{(n)}_{kj},\qquad P^{(n)}=P^{n}` },
    { name: "Distribution à l'instant n", note: "a = distribution initiale (vecteur ligne)", latex: String.raw`p_n=aP^{n},\qquad P(X_n=j\mid X_0=i)=(P^n)_{ij}` },
    { name: "Probabilité d'une trajectoire", latex: String.raw`P(X_0=i_0,\dots,X_n=i_n)=a_{i_0}\,P_{i_0i_1}\,P_{i_1i_2}\cdots P_{i_{n-1}i_n}` },
    { name: "Critère de récurrence", latex: String.raw`i\ \text{récurrent}\iff \sum_{n\ge 1}P^{(n)}_{ii}=\infty` },
    { name: "Période", latex: String.raw`d(i)=\gcd\{\,n\ge 1: P^{(n)}_{ii}>0\,\}` },
    { name: "Distribution stationnaire", note: "unique si irréductible et récurrente positive", latex: String.raw`\pi=\pi P,\qquad \sum_{i\in S}\pi_i=1` },
    { name: "Limite (chaîne ergodique)", note: "pour toute distribution initiale", latex: String.raw`\lim_{n\to\infty}P(X_n=i)=\pi_i` },
    { name: "Temps de retour moyen", latex: String.raw`m_i=\frac{1}{\pi_i}` },
    { name: "Coût moyen à long terme", latex: String.raw`\lim_{n\to\infty}\frac1n\sum_{k=1}^{n}C(X_k)=\sum_{i\in S}C(i)\,\pi_i` },
    { name: "Chaîne à deux états", note: "a = P₀₁, b = P₁₀", latex: String.raw`\pi_0=\frac{b}{a+b},\qquad \pi_1=\frac{a}{a+b}` },
    { name: "PageRank : matrice taxée", latex: String.raw`G=\beta P+\frac{1-\beta}{n}\,\mathbf 1\mathbf 1^{\top}` },
    { name: "PageRank : convergence", latex: String.raw`\lVert p_k-\pi\rVert_1\le\beta^{k}\,\lVert p_0-\pi\rVert_1,\qquad \pi_j=\frac{1-\beta}{n}\ \text{si aucun lien n'entre en } j` },
  ],

  /* -------------------- QCM -------------------- */
  qcm: [
    {
      q: String.raw`Parmi ces modélisations, laquelle <strong>viole</strong> la propriété de Markov avec l'état proposé ?`,
      choices: [
        String.raw`Météo : le temps de demain dépend des deux derniers jours ; état $=$ temps du jour.`,
        String.raw`Météo : le temps de demain ne dépend que du temps d'aujourd'hui ; état $=$ temps du jour.`,
        String.raw`Stock : le stock de lundi prochain dépend du stock de ce lundi et de la demande de la semaine ; état $=$ stock du lundi.`,
        String.raw`Machine : en marche ou en panne, avec des probabilités de changement fixes ; état $=$ marche/panne.`,
      ],
      answer: 0,
      explanation: String.raw`Si demain dépend d'hier <em>et</em> d'aujourd'hui, l'état « temps du jour » ne suffit pas :
        le futur dépend du passé au-delà du présent. Le remède est d'agrandir l'état en prenant le couple
        (temps d'hier, temps d'aujourd'hui), qui redevient markovien.`,
    },
    {
      q: String.raw`Laquelle de ces matrices peut être une matrice de transition ?`,
      choices: [
        String.raw`$\begin{pmatrix}1{,}2&-0{,}2\\0&1\end{pmatrix}$`,
        String.raw`$\begin{pmatrix}0{,}3&0{,}5\\0{,}7&0{,}5\end{pmatrix}$`,
        String.raw`$\begin{pmatrix}0{,}5&0{,}5\\0{,}6&0{,}5\end{pmatrix}$`,
        String.raw`$\begin{pmatrix}0{,}3&0{,}7\\0{,}5&0{,}5\end{pmatrix}$`,
      ],
      answer: 3,
      explanation: String.raw`Il faut des coefficients positifs et des <em>lignes</em> qui somment à 1. La matrice
        $\begin{pmatrix}0{,}3&0{,}5\0{,}7&0{,}5\end{pmatrix}$ a des colonnes qui somment à 1, pas ses lignes ; celle
        qui contient $-0{,}2$ a un coefficient négatif ; celle dont la seconde ligne est $(0{,}6,\ 0{,}5)$ somme à $1{,}1$.`,
    },
    {
      q: String.raw`Soit $P=\begin{pmatrix}0{,}5&0{,}5\\0{,}2&0{,}8\end{pmatrix}$ sur les états $\{0,1\}$, avec $X_0=0$.
        Que vaut $P(X_2=0)$ ?`,
      choices: [
        String.raw`$0{,}25$`,
        String.raw`$0{,}35$`,
        String.raw`$0{,}50$`,
        String.raw`$0{,}65$`,
      ],
      answer: 1,
      explanation: String.raw`$P(X_2=0)=(P^2)_{00}=P_{00}P_{00}+P_{01}P_{10}=0{,}5\times 0{,}5+0{,}5\times 0{,}2=0{,}35$.
        Il faut sommer sur les deux chemins possibles ($0\to 0\to 0$ et $0\to 1\to 0$), pas seulement le premier.`,
    },
    {
      q: String.raw`Même matrice $P$, avec distribution initiale $a=(0{,}6,\ 0{,}4)$. Que vaut $P(X_0=0,\ X_1=1,\ X_2=1)$ ?`,
      choices: [
        String.raw`$0{,}20$`,
        String.raw`$0{,}24$`,
        String.raw`$0{,}30$`,
        String.raw`$0{,}40$`,
      ],
      answer: 1,
      explanation: String.raw`Probabilité d'une trajectoire : $a_0\,P_{01}\,P_{11}=0{,}6\times 0{,}5\times 0{,}8=0{,}24$.
        La propriété de Markov permet de multiplier les probabilités pas à pas.`,
    },
    {
      q: String.raw`Que vaut $P(X_5=2\mid X_1=3)$ pour une DTMC homogène de matrice $P$ ?`,
      choices: [
        String.raw`$(P^4)_{32}$`,
        String.raw`$(P^5)_{32}$`,
        String.raw`$(P^4)_{23}$`,
        String.raw`$(aP^4)_2$`,
      ],
      answer: 0,
      explanation: String.raw`De l'instant 1 à l'instant 5 il s'écoule 4 pas. Par homogénéité, seul le nombre de pas
        compte, et la ligne est l'état de départ (3), la colonne l'état d'arrivée (2). La distribution initiale $a$
        n'intervient pas puisqu'on conditionne sur $X_1$.`,
    },
    {
      q: String.raw`Que vaut $P(X_3=j\mid X_0=i,\ X_1=k)$ ?`,
      choices: [
        String.raw`$(P^3)_{ij}$`,
        String.raw`$(P^2)_{ij}$`,
        String.raw`$(P^2)_{kj}$`,
        String.raw`$P_{ik}\,(P^2)_{kj}$`,
      ],
      answer: 2,
      explanation: String.raw`Propriété de Markov : sachant $X_1=k$, l'information $X_0=i$ est inutile. Il reste 2 pas
        depuis $k$, donc $(P^2)_{kj}$. Le produit $P_{ik}(P^2)_{kj}$ serait la probabilité <em>jointe</em> du chemin
        sachant $X_0=i$, pas la conditionnelle demandée.`,
    },
    {
      q: String.raw`Distribution stationnaire de $P=\begin{pmatrix}0{,}5&0{,}5\\0{,}2&0{,}8\end{pmatrix}$ ?`,
      choices: [
        String.raw`$\pi=(2/7,\ 5/7)$`,
        String.raw`$\pi=(1/2,\ 1/2)$`,
        String.raw`$\pi=(5/7,\ 2/7)$`,
        String.raw`$\pi=(0{,}5,\ 0{,}8)$`,
      ],
      answer: 0,
      explanation: String.raw`Formule à deux états avec $a=P_{01}=0{,}5$ et $b=P_{10}=0{,}2$ :
        $\pi_0=\dfrac{b}{a+b}=\dfrac{0{,}2}{0{,}7}=\dfrac27$ et $\pi_1=\dfrac57$. Intuition : on quitte l'état 1
        rarement (0,2), on y passe donc la majorité du temps. Le vecteur $(0{,}5,\ 0{,}8)$ n'est même pas une distribution.`,
    },
    {
      q: String.raw`Chaîne à deux états de matrice $P=\begin{pmatrix}0&1\\1&0\end{pmatrix}$, avec $X_0=0$. Que vaut $\lim_{n\to\infty}P(X_n=0)$ ?`,
      choices: [
        String.raw`$0$`,
        String.raw`$1/2$`,
        String.raw`$1$`,
        String.raw`Cette limite n'existe pas.`,
      ],
      answer: 3,
      explanation: String.raw`La chaîne alterne de façon déterministe : $P(X_n=0)$ vaut $1,0,1,0,\dots$ et ne converge pas.
        La chaîne est irréductible et $\pi=(1/2,1/2)$ est bien l'unique distribution stationnaire (fraction de temps
        en chaque état), mais la période 2 empêche la convergence de $P(X_n=0)$.`,
    },
    {
      q: String.raw`Un joueur possède entre 0 et 3 euros ; à chaque partie il gagne ou perd 1 euro, et il s'arrête à 0 ou à 3
        (états absorbants). Combien cette chaîne possède-t-elle de distributions stationnaires ?`,
      choices: [
        String.raw`Aucune`,
        String.raw`Une seule`,
        String.raw`Exactement deux`,
        String.raw`Une infinité`,
      ],
      answer: 3,
      explanation: String.raw`Les vecteurs $(1,0,0,0)$ et $(0,0,0,1)$ vérifient tous deux $\pi=\pi P$, et toute
        combinaison $(\alpha,0,0,1-\alpha)$ avec $0\le\alpha\le 1$ aussi. La chaîne est réductible : l'unicité
        de $\pi$ demande l'irréductibilité.`,
    },
    {
      q: String.raw`Dans une chaîne à espace d'états <strong>fini</strong>, une classe de communication est récurrente si et seulement si :`,
      choices: [
        String.raw`elle contient un état absorbant`,
        String.raw`elle contient tous les états de la chaîne`,
        String.raw`elle est apériodique`,
        String.raw`aucune transition ne permet d'en sortir`,
      ],
      answer: 3,
      explanation: String.raw`Dans une chaîne finie, classe récurrente $\Leftrightarrow$ classe fermée. Une classe dont on
        peut sortir sera quittée un jour avec probabilité 1 (transitoire). L'absorption ou l'apériodicité n'ont rien
        à voir avec la récurrence.`,
    },
    {
      q: String.raw`Une chaîne de Markov est <strong>finie et irréductible</strong>. Que peut-on affirmer sans autre hypothèse ?`,
      choices: [
        String.raw`Elle est apériodique.`,
        String.raw`Elle est ergodique.`,
        String.raw`Elle est récurrente positive.`,
        String.raw`Elle possède un état absorbant.`,
      ],
      answer: 2,
      explanation: String.raw`Finie et irréductible implique récurrente positive (une seule classe, fermée, finie), donc $\pi$
        existe et est unique. Mais rien n'empêche la périodicité : le cycle $0\to 1\to 2\to 0$ est fini et irréductible
        sans être apériodique, donc sans être ergodique.`,
    },
    {
      q: String.raw`La chaîne $0\to 1\to 2\to 0$ est un cycle déterministe (période 3). Quelle modification la rend apériodique ?`,
      choices: [
        String.raw`Ajouter une boucle $P_{00}>0$ (rester en 0 avec une petite probabilité).`,
        String.raw`Ajouter un quatrième état dans le cycle.`,
        String.raw`Changer la distribution initiale.`,
        String.raw`Doubler toutes les probabilités de transition.`,
      ],
      answer: 0,
      explanation: String.raw`Avec une boucle, on peut revenir en 0 en 1 pas comme en 3 pas : $\gcd(1,3)=1$. Un cycle à quatre
        états serait de période 4. La distribution initiale ne change pas la structure de $P$, et doubler les probabilités
        détruit la matrice stochastique.`,
    },
    {
      q: String.raw`Dans une chaîne ergodique, $\pi_i=0{,}25$. En moyenne, combien de pas s'écoulent entre deux visites de l'état $i$ ?`,
      choices: [
        String.raw`$0{,}25$`,
        String.raw`$0{,}75$`,
        String.raw`$4$`,
        String.raw`On ne peut pas le savoir sans $P$.`,
      ],
      answer: 2,
      explanation: String.raw`Temps de retour moyen $m_i=1/\pi_i=4$. Si l'on passe un quart du temps en $i$, on y revient en
        moyenne tous les quatre pas.`,
    },
    {
      q: String.raw`Une chaîne ergodique a pour distribution stationnaire $\pi=(0{,}5,\ 0{,}3,\ 0{,}2)$, et le coût par période
        vaut $C=(0,\ 10,\ 50)$ selon l'état. Quel est le coût moyen par période à long terme ?`,
      choices: [
        String.raw`$10$`,
        String.raw`$13$`,
        String.raw`$20$`,
        String.raw`$60$`,
      ],
      answer: 1,
      explanation: String.raw`$\sum_i C(i)\pi_i=0\times 0{,}5+10\times 0{,}3+50\times 0{,}2=3+10=13$. La moyenne arithmétique
        des coûts ($20$) ignore le temps passé dans chaque état.`,
    },
    {
      q: String.raw`Pour une chaîne <strong>ergodique</strong>, laquelle de ces affirmations est <strong>fausse</strong> ?`,
      choices: [
        String.raw`Chaque ligne de $P^n$ converge vers $\pi$.`,
        String.raw`$\pi_i=1/m_i$ où $m_i$ est le temps de retour moyen en $i$.`,
        String.raw`$\pi$ est l'unique solution de $\pi=\pi P$ avec $\sum_i\pi_i=1$.`,
        String.raw`$\pi$ dépend de la distribution initiale $a$.`,
      ],
      answer: 3,
      explanation: String.raw`C'est tout l'intérêt de l'ergodicité : la distribution limite est la même quel que soit le point
        de départ, l'état initial est oublié. Les trois autres affirmations sont exactes.`,
    },
    {
      q: String.raw`Le temps de demain (sec ou pluvieux) dépend du temps des <strong>deux</strong> jours précédents. Combien d'états
        faut-il au minimum pour modéliser ce phénomène par une DTMC ?`,
      choices: [
        String.raw`2`,
        String.raw`3`,
        String.raw`4`,
        String.raw`C'est impossible : le processus n'est pas markovien.`,
      ],
      answer: 2,
      explanation: String.raw`On prend pour état le couple (temps d'hier, temps d'aujourd'hui) : $2\times 2=4$ états. Avec cet
        état agrandi, le temps de demain ne dépend que de l'état courant, et la propriété de Markov est retrouvée.`,
    },
    {
      q: String.raw`PageRank avec $\beta=0{,}85$ sur un web de $n=100$ pages. Quel est le rang d'une page vers laquelle aucun lien ne pointe ?`,
      choices: [
        String.raw`$0$`,
        String.raw`$0{,}0015$`,
        String.raw`$0{,}01$`,
        String.raw`$0{,}15$`,
      ],
      answer: 1,
      explanation: String.raw`Une telle page n'est atteinte que par le saut aléatoire : $\pi_j=\sum_i\pi_i\,G_{ij}
        =\sum_i\pi_i\,\tfrac{1-\beta}{n}=\tfrac{1-\beta}{n}=\tfrac{0{,}15}{100}=0{,}0015$. Sans taxation, son rang serait nul.`,
    },
    {
      q: String.raw`Pourquoi remplace-t-on $P$ par $G=\beta P+\tfrac{1-\beta}{n}\mathbf 1\mathbf 1^\top$ dans PageRank ?`,
      choices: [
        String.raw`Pour accélérer le calcul de $P^n$ en rendant la matrice creuse.`,
        String.raw`Pour que les lignes somment à $\beta$ au lieu de 1.`,
        String.raw`Pour rendre la matrice strictement positive, donc la chaîne ergodique : $\pi$ unique et convergence garantie.`,
        String.raw`Pour supprimer les pages sans lien entrant.`,
      ],
      answer: 2,
      explanation: String.raw`Tous les coefficients de $G$ sont $\ge(1-\beta)/n>0$ : la chaîne devient irréductible et apériodique
        (finie, donc récurrente positive), c'est-à-dire ergodique. Les pièges et culs-de-sac ne peuvent plus capter toute la
        masse, et l'itération de puissance converge au taux $\beta$.`,
    },
    {
      q: String.raw`Dans une chaîne finie, un état <strong>transitoire</strong> est visité, sur une trajectoire infinie :`,
      choices: [
        String.raw`un nombre fini de fois (avec probabilité 1)`,
        String.raw`une infinité de fois`,
        String.raw`exactement une fois`,
        String.raw`jamais`,
      ],
      answer: 0,
      explanation: String.raw`À chaque visite il y a une probabilité $1-f_i>0$ de ne jamais revenir : le nombre de visites est
        géométrique, donc fini presque sûrement. Sur le long terme, la chaîne finit dans une classe récurrente, et
        $\pi_i=0$ pour tout état transitoire.`,
    },
    {
      q: String.raw`Une chaîne est irréductible mais <strong>périodique</strong>. Que représente sa distribution stationnaire $\pi$ ?`,
      choices: [
        String.raw`La limite de $P(X_n=i)$ quand $n\to\infty$.`,
        String.raw`La distribution initiale la plus probable.`,
        String.raw`La fraction de temps passée dans chaque état sur le long terme.`,
        String.raw`Rien : elle n'existe pas dans le cas périodique.`,
      ],
      answer: 2,
      explanation: String.raw`Irréductible et récurrente positive suffit pour que $\pi$ existe, soit unique et s'interprète comme
        fraction de temps (et $\pi_i=1/m_i$). L'apériodicité n'est nécessaire que pour l'interprétation en termes de
        limite de $P(X_n=i)$.`,
    },
    {
      q: String.raw`Pour une chaîne irréductible à 3 états, combien d'équations <strong>indépendantes</strong> fournit le système $\pi=\pi P$ ?`,
      choices: [
        String.raw`1`,
        String.raw`2`,
        String.raw`3`,
        String.raw`4`,
      ],
      answer: 1,
      explanation: String.raw`Les lignes de $P$ sommant à 1, la somme des trois équations est une identité : l'une d'elles est
        redondante. On garde deux équations de balance et on ajoute la normalisation $\pi_0+\pi_1+\pi_2=1$ pour obtenir
        un système de trois équations à trois inconnues.`,
    },
  ],

  /* -------------------- EXERCICES -------------------- */
  exos: [
    {
      id: "ex-machine",
      title: "Machine en marche ou en panne",
      difficulty: "facile",
      tags: ["modélisation", "stationnaire", "deux états"],
      statement: String.raw`<p>Une machine est chaque jour soit en marche (état 1), soit en panne (état 0). Si elle est en
        marche, elle l'est encore le lendemain avec probabilité 0,98 ; sinon elle tombe en panne. Si elle est en panne,
        elle le reste le lendemain avec probabilité 0,03 ; sinon elle est réparée.</p>
        <p>(a) Modéliser l'état de la machine par une DTMC. (b) Calculer les probabilités stationnaires et interpréter.</p>`,
      solution: String.raw`
        <p><strong>(a)</strong> $X_n\in S=\{0,1\}$ est l'état de la machine le jour $n$. Avec la convention ligne $=$
        départ, colonne $=$ arrivée :</p>
        <p>$$P=\begin{pmatrix}0{,}03 & 0{,}97\\ 0{,}02 & 0{,}98\end{pmatrix}.$$</p>
        <p><strong>(b)</strong> La chaîne est finie et irréductible, donc récurrente positive, et $\pi=\pi P$ a une solution
        unique. Formule à deux états avec $a=P_{01}=0{,}97$ et $b=P_{10}=0{,}02$ :</p>
        <p>$$\pi_0=\frac{b}{a+b}=\frac{0{,}02}{0{,}99}\approx 0{,}0202,\qquad \pi_1=\frac{a}{a+b}\approx 0{,}9798.$$</p>
        <p>La machine est disponible environ 98 % du temps, et l'on retrouve l'état « panne » en moyenne tous les
        $m_0=1/\pi_0\approx 49{,}5$ jours.</p>`,
    },
    {
      id: "ex-pohang",
      title: "Météo à Pohang",
      difficulty: "moyen",
      tags: ["modélisation", "transitoire", "stationnaire"],
      statement: String.raw`<p>Le temps est ensoleillé (0), nuageux (1) ou pluvieux (2). Après un jour ensoleillé, le lendemain
        est nuageux avec probabilité 0,3 et pluvieux avec probabilité 0,2. Après un jour nuageux : ensoleillé 0,5, pluvieux
        0,3. Après un jour pluvieux : ensoleillé 0,4, nuageux 0,5.</p>
        <p>(a) Écrire la matrice $P$. (b) Il fait beau aujourd'hui : probabilité qu'il pleuve après-demain ?
        (c) Quelle fraction des jours est ensoleillée, nuageuse, pluvieuse sur le long terme ?</p>`,
      hints: [String.raw`Chaque ligne somme à 1 : la probabilité de « rester dans le même temps » complète la ligne.`],
      solution: String.raw`
        <p><strong>(a)</strong> $$P=\begin{pmatrix}0{,}5 & 0{,}3 & 0{,}2\\ 0{,}5 & 0{,}2 & 0{,}3\\ 0{,}4 & 0{,}5 & 0{,}1\end{pmatrix}.$$</p>
        <p><strong>(b)</strong> Avec $a=(1,0,0)$, on cherche $(aP^2)_2=(P^2)_{02}$, c'est-à-dire la ligne 0 de $P$ multipliée par la
        colonne 2 : $0{,}5\times 0{,}2+0{,}3\times 0{,}3+0{,}2\times 0{,}1=0{,}21$.</p>
        <p><strong>(c)</strong> On résout $\pi=\pi P$ avec $\sum\pi_i=1$ (deux équations de balance plus la normalisation) :
        $\pi\approx(0{,}479,\ 0{,}311,\ 0{,}210)$, soit environ 48 % de jours ensoleillés, 31 % nuageux et 21 % pluvieux.
        La chaîne est ergodique ($P_{00}>0$), ces fractions sont aussi les limites de $P(X_n=i)$.</p>`,
    },
    {
      id: "ex-transient4",
      title: "DTMC à quatre états : trajectoires et transitions multi-pas",
      difficulty: "moyen",
      tags: ["transitoire", "trajectoire", "Chapman-Kolmogorov"],
      statement: String.raw`<p>Soit une DTMC sur les états $\{1,2,3,4\}$ de distribution initiale $a=(0{,}3,\ 0{,}5,\ 0{,}1,\ 0{,}1)$ et de matrice</p>
        $$P=\begin{pmatrix}0{,}25&0{,}25&0{,}25&0{,}25\\ 0{,}1&0{,}2&0{,}3&0{,}4\\ 0{,}6&0{,}1&0{,}1&0{,}2\\ 0{,}2&0{,}2&0{,}2&0{,}4\end{pmatrix}.$$
        <p>Calculer (a) $P(X_0=1,\ X_1=2,\ X_2=3,\ X_3=3)$ ; (b) $P(X_5=2\mid X_1=3)$.</p>`,
      hints: [String.raw`(a) Dérouler la trajectoire un pas à la fois grâce à la propriété de Markov : $a_1\,P_{12}\,P_{23}\,P_{33}$.`],
      solution: String.raw`
        <p><strong>(a)</strong> La probabilité de la trajectoire se factorise :</p>
        <p>$$P(X_0=1,\ X_1=2,\ X_2=3,\ X_3=3)=a_1\,P_{12}\,P_{23}\,P_{33}=0{,}3\times 0{,}25\times 0{,}3\times 0{,}1=0{,}00225.$$</p>
        <p><strong>(b)</strong> Entre les instants 1 et 5 il y a 4 pas : $P(X_5=2\mid X_1=3)=(P^4)_{32}\approx 0{,}193$
        (calcul de $P^4$ à la machine).</p>`,
    },
    {
      id: "ex-himart",
      title: "Stock de PC chez Himart",
      difficulty: "difficile",
      tags: ["modélisation", "Poisson", "inventaire"],
      statement: String.raw`<p>Un magasin contrôle son stock de PC chaque vendredi soir. Si le stock est inférieur à 2, il commande
        de quoi remonter à 5 unités pour le lundi matin ; sinon il ne commande rien. La demande hebdomadaire suit une loi de
        Poisson de moyenne 3, et toute demande non satisfaite est perdue.</p>
        <p>Modéliser le stock du lundi matin par une DTMC : espace d'états et matrice de transition.</p>`,
      hints: [
        String.raw`Prendre pour état le nombre de PC en stock le lundi matin. Avec cette politique de commande, $S=\{2,3,4,5\}$.`,
        String.raw`Depuis l'état $i$, le stock du vendredi est $\max(i-D,0)$ ; s'il est inférieur à 2, on repart à 5. Lire $P(D=k)$ dans la table de Poisson(3).`,
      ],
      solution: String.raw`
        <p>$X_n$ = nombre de PC en stock le $n$-ième lundi matin. Comme on ne descend jamais sous 2 sans recommander à 5,
        $S=\{2,3,4,5\}$. Table de Poisson(3) : $P(D=0)=0{,}0498$, $P(D=1)=0{,}1494$, $P(D=2)=0{,}2240$, $P(D=3)=0{,}2240$,
        $P(D\ge 4)=0{,}3528$.</p>
        <p>Depuis l'état $i$, on termine la semaine à $i-D$ tant que $i-D\ge 2$ ; sinon on recommande et le lundi suivant
        commence à 5. Avec les lignes et colonnes ordonnées $2,3,4,5$ :</p>
        <p>$$P=\begin{pmatrix}
        0{,}0498 & 0 & 0 & 0{,}9502\\
        0{,}1494 & 0{,}0498 & 0 & 0{,}8008\\
        0{,}2240 & 0{,}1494 & 0{,}0498 & 0{,}5768\\
        0{,}2240 & 0{,}2240 & 0{,}1494 & 0{,}4026
        \end{pmatrix}$$</p>
        <p>Chaque ligne somme à 1. La colonne « 5 » regroupe deux cas : une demande nulle depuis l'état 5
        ($0{,}0498$), ou un réapprovisionnement ($P(D\ge 4)=0{,}3528$), d'où $0{,}4026$ sur la dernière ligne.</p>`,
    },
    {
      id: "ex-umbrellas",
      title: "Les parapluies",
      difficulty: "difficile",
      tags: ["modélisation", "stationnaire", "optimisation de coût"],
      statement: String.raw`<p>Une personne possède $r$ parapluies qu'elle répartit entre sa maison et son bureau au gré de ses
        trajets. Avant chaque trajet, il pleut avec probabilité $p$, indépendamment des autres trajets. S'il pleut et qu'un
        parapluie est disponible là où elle se trouve, elle l'emporte. Elle est mouillée s'il pleut et qu'aucun parapluie
        n'est disponible.</p>
        <p>(a) Modéliser par une DTMC. (b) Calculer la distribution stationnaire. (c) En déduire la fraction $\varphi$ de
        trajets où elle est mouillée. (d) Un trajet mouillé coûte $c$ et chaque parapluie coûte $d$ par trajet en entretien :
        quel nombre $r^*$ de parapluies minimise le coût moyen ?</p>`,
      hints: [
        String.raw`État $X_n$ = nombre de parapluies présents à l'endroit <em>d'où part</em> le trajet $n$, $S=\{0,1,\dots,r\}$.`,
        String.raw`Dans les équations de balance, essayer $\pi_1=\pi_2=\cdots=\pi_r$.`,
      ],
      solution: String.raw`
        <p><strong>(a)</strong> $X_n\in\{0,\dots,r\}$. Depuis l'état 0, tous les parapluies sont à l'autre endroit : on y arrive
        et l'état suivant est $r$. Depuis $i\ge 1$ : s'il ne pleut pas (probabilité $1-p$), on arrive avec $r-i$ parapluies ;
        s'il pleut (probabilité $p$), on en emporte un et l'on arrive avec $r-i+1$.</p>
        <p><strong>(b)</strong> Les équations de balance sont vérifiées par $\pi_1=\cdots=\pi_r$ et $\pi_0=(1-p)\pi_r$.
        Après normalisation :</p>
        <p>$$\pi_0=\frac{1-p}{\,r+1-p\,},\qquad \pi_1=\cdots=\pi_r=\frac{1}{\,r+1-p\,}.$$</p>
        <p><strong>(c)</strong> Mouillée si et seulement si l'état est 0 <em>et</em> il pleut :
        $\varphi=p\,\pi_0=\dfrac{p(1-p)}{r+1-p}$.</p>
        <p><strong>(d)</strong> Coût moyen par trajet $\tau(r)=c\,\varphi(r)+d\,r$. En traitant $r$ comme continu et en annulant
        la dérivée :
        $$r^*=-1+p+\sqrt{\frac{c\,p(1-p)}{d}},$$
        puis on compare $\tau$ aux deux entiers voisins et l'on garde le plus petit coût.</p>`,
    },
    {
      id: "ex-tool",
      title: "Âge d'un outil de machine",
      difficulty: "difficile",
      tags: ["modélisation", "stationnaire", "durée de vie"],
      statement: String.raw`<p>Un outil produit une pièce par heure. Un outil qui a déjà produit $i-1$ pièces tombe en panne
        pendant la production de la $i$-ième avec probabilité $p_i$ ; il est alors remplacé par un outil neuf pour l'heure
        suivante. Soit $X_n$ l'âge de l'outil (nombre de pièces déjà produites) au début de l'heure $n$.</p>
        <p>(a) Modéliser par une DTMC. (b) Calculer la distribution stationnaire. (c) Exprimer l'âge moyen d'un outil en
        service et la durée de vie moyenne d'un outil, et expliquer pourquoi ce ne sont pas les mêmes quantités.</p>`,
      solution: String.raw`
        <p><strong>(a)</strong> $S=\{0,1,2,\dots\}$. Depuis l'âge $i$, l'outil produit sa $(i+1)$-ième pièce : il passe à l'âge
        $i+1$ avec probabilité $1-p_{i+1}$ (il survit), ou revient à 0 avec probabilité $p_{i+1}$ (panne et remplacement).</p>
        <p><strong>(b)</strong> Les équations $\pi_{i+1}=\pi_i(1-p_{i+1})$ se résolvent en cascade :
        $\pi_i=\pi_0\prod_{k=1}^{i}(1-p_k)$, et la normalisation donne
        $$\pi_0=\frac{1}{1+(1-p_1)+(1-p_1)(1-p_2)+\cdots}.$$</p>
        <p><strong>(c)</strong> L'<em>âge moyen en service</em> est une moyenne temporelle avec récompense $C(i)=i$ :
        $\sum_i i\,\pi_i$. La <em>durée de vie</em> $L$ d'un outil vérifie $P(L=k)=(1-p_1)\cdots(1-p_{k-1})\,p_k$, et par la
        formule de la queue $E[L]=\sum_{k\ge 0}P(L>k)=1+(1-p_1)+(1-p_1)(1-p_2)+\cdots=1/\pi_0$. Ce sont deux quantités
        différentes : l'âge moyen observé pondère chaque âge par le temps qu'on y passe, alors que la durée de vie
        moyenne est le temps moyen entre deux remplacements (retours en 0).</p>`,
    },
    {
      id: "ex-kim",
      title: "Les déjeuners de Kim",
      difficulty: "moyen",
      tags: ["stationnaire", "coût", "ergodicité"],
      statement: String.raw`<p>Chaque midi, Kim mange coréen (0), chinois (1) ou un burger (2). Son choix du lendemain dépend de
        celui du jour selon
        $$P=\begin{pmatrix}0{,}3&0{,}3&0{,}4\\ 1&0&0\\ 0{,}5&0{,}5&0\end{pmatrix}.$$</p>
        <p>(a) Sur le long terme, quelle fraction de ses déjeuners sont des burgers ? (b) Si tous les étudiants du campus
        suivent le même comportement, quelle fraction d'entre eux mange chinois un jour donné ? (c) Un repas coûte 5 000 won
        (coréen), 6 000 won (chinois) ou 4 000 won (burger) : dépense moyenne par déjeuner sur le long terme ?</p>`,
      hints: [String.raw`Résoudre $\pi=\pi P$ avec la normalisation ; les fractions sont des multiples de $1/19$.`],
      solution: String.raw`
        <p>Résolution de $\pi=\pi P$ : $\pi=\left(\tfrac{10}{19},\ \tfrac{5}{19},\ \tfrac{4}{19}\right)\approx(0{,}526,\ 0{,}263,\ 0{,}211)$.
        La chaîne est ergodique ($P_{00}>0$ et tous les états communiquent).</p>
        <p><strong>(a)</strong> Fraction de temps (moyenne temporelle) : $\pi_2\approx 0{,}211$.</p>
        <p><strong>(b)</strong> Fraction de la population (moyenne d'ensemble) : $\pi_1\approx 0{,}263$. L'ergodicité garantit que
        les deux points de vue coïncident.</p>
        <p><strong>(c)</strong> $\sum_i C(i)\pi_i=5000\times\tfrac{10}{19}+6000\times\tfrac{5}{19}+4000\times\tfrac{4}{19}
        \approx 5\,053$ won par déjeuner.</p>`,
    },
    {
      id: "ex-pagerank",
      title: "PageRank sur trois pages, avec un piège",
      difficulty: "moyen",
      tags: ["PageRank", "ergodicité", "itération de puissance"],
      statement: String.raw`<p>Un mini-web comporte trois pages. La page 1 pointe vers les pages 2 et 3 ; la page 2 pointe vers la
        page 1 ; la page 3 ne pointe que vers elle-même.</p>
        <p>(a) Écrire la matrice $P$ du surfeur aléatoire et expliquer ce qui se passe sans taxation. (b) Écrire la matrice
        taxée $G$ pour $\beta=0{,}7$ et calculer les rangs. (c) Pourquoi la convergence de l'itération de puissance est-elle
        garantie ?</p>`,
      hints: [String.raw`$G=\beta P+\tfrac{1-\beta}{n}\mathbf 1\mathbf 1^\top$ : chaque coefficient de $P$ est multiplié par $\beta$ puis augmenté de $(1-\beta)/n=0{,}1$.`],
      solution: String.raw`
        <p><strong>(a)</strong> $$P=\begin{pmatrix}0&0{,}5&0{,}5\\ 1&0&0\\ 0&0&1\end{pmatrix}.$$
        La page 3 est un état absorbant (un <em>piège</em>) : la chaîne finit par y rester, et $\pi=(0,0,1)$. Les pages 1 et 2
        auraient un rang nul, ce qui ne reflète pas leur importance réelle.</p>
        <p><strong>(b)</strong> $$G=0{,}7P+0{,}1\,\mathbf 1\mathbf 1^\top=\begin{pmatrix}0{,}1&0{,}45&0{,}45\\ 0{,}8&0{,}1&0{,}1\\ 0{,}1&0{,}1&0{,}8\end{pmatrix}.$$
        La résolution de $\pi=\pi G$ donne $\pi=\left(\tfrac{34}{151},\ \tfrac{27}{151},\ \tfrac{90}{151}\right)\approx(0{,}225,\ 0{,}179,\ 0{,}596)$.
        La page 3 reste la mieux classée, mais les pages 1 et 2 retrouvent un rang positif.</p>
        <p><strong>(c)</strong> Tous les coefficients de $G$ sont strictement positifs, donc la chaîne est irréductible, apériodique
        et (finie) récurrente positive : elle est ergodique. L'itération $p_{k+1}=p_kG$ converge vers $\pi$ quel que soit
        $p_0$, et l'erreur décroît au moins comme $0{,}7^k$.</p>`,
    },
  ],
});
