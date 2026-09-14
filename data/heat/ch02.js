/* ============================================================
   Heat Transfer — Chapitre 2 : Loi de Fourier et équation de la chaleur
   Source : Supplementary Lecture Notes, cours 3 (Fourier's law) et
   4 (Heat conduction equation). Contenu rédigé pour la révision —
   à relire et valider. Exemples chiffrés recalculés.
   NB : LaTeX en String.raw, jamais la séquence ${ }, « &lt; » pour « < ».
   ============================================================ */
addChapter("heat", {
  id: "ch02",
  title: "Chapitre 2 — Loi de Fourier et équation de la chaleur",
  short: "Ch. 2",
  lang: "fr",

  /* -------------------- RÉSUMÉ DE COURS -------------------- */
  summary: String.raw`
    <h3>1. La loi de Fourier en 3D</h3>
    <p>En une dimension, $q=-kA\,dT/dx$. En trois dimensions, le flux est un <strong>vecteur</strong> :</p>
    <p>$$\mathbf q''=-k\,\nabla T=-k\Big(\frac{\partial T}{\partial x}\mathbf i+\frac{\partial T}{\partial y}\mathbf j+\frac{\partial T}{\partial z}\mathbf k\Big).$$</p>
    <ul>
      <li>Le taux est proportionnel au <strong>gradient</strong> de température (≈ différence de température / distance), pas à la
          différence de température seule.</li>
      <li>Le signe moins indique que la chaleur va des hautes vers les basses températures ; le vecteur flux est
          <strong>perpendiculaire aux isothermes</strong>.</li>
      <li>$k$ est une propriété du matériau et de son état thermodynamique ($T$, $P$) : sa variation avec la température doit être
          prise en compte sur de grands écarts de température.</li>
      <li>Un matériau <strong>isotrope</strong> a le même $k$ dans toutes les directions. Sinon (bois, composites, cristaux), $k$ devient
          un tenseur d'ordre 2 $k_{ij}$.</li>
    </ul>

    <h3>2. Vue microscopique</h3>
    <p><strong>Porteurs d'énergie</strong> : phonons (quanta de vibration du réseau), particules (électrons, molécules, atomes), photons
    (quanta d'énergie électromagnétique).</p>
    <p>Le <strong>libre parcours moyen</strong> (<em>mean free path</em>, MFP) est la distance moyenne qu'un porteur parcourt sans
    collision. Il sépare le régime microscopique (dimensions comparables au MFP) du régime macroscopique où la loi de Fourier
    s'applique. Pour des particules de diamètre $d$ et de densité numérique $n$ :</p>
    <p>$$l=\frac{1}{\sqrt 2\,\pi d^2 n}.$$</p>

    <h3>3. Conductivité thermique</h3>
    <p>En général, $k_\text{solide}\gt k_\text{liquide}\gt k_\text{gaz}$.</p>
    <ul>
      <li><strong>Solides</strong> : $k=k_\text{électrons}+k_\text{réseau}$. Les bons conducteurs électriques sont de bons conducteurs
          thermiques (<strong>loi de Wiedemann-Franz</strong>). Les cristaux bien ordonnés conduisent mieux que les matériaux amorphes
          (diffusion des phonons aux joints de grains). Quand l'épaisseur d'un film devient comparable au MFP, un
          <strong>effet de taille</strong> apparaît (diffusion aux frontières) et $k$ diminue.</li>
      <li><strong>Gaz</strong> (théorie cinétique) : $k=\frac13\rho\,c_v\,\bar v\,l$.
          <ul>
            <li>$k$ augmente avec $T$, car la vitesse moléculaire moyenne $\bar v$ augmente.</li>
            <li>$k$ est <em>presque indépendant de la pression</em> : quand $P$ augmente, la densité $n$ (donc $\rho$) augmente mais
                le libre parcours $l\propto 1/n$ diminue d'autant.</li>
          </ul></li>
    </ul>
    <p>La <strong>diffusivité thermique</strong> combine conduction et stockage :</p>
    <p>$$\alpha\equiv\frac{k}{\rho c_p}\quad[\text{m}^2/\text{s}]=\frac{\text{conductivité}}{\text{masse volumique}\times\text{chaleur massique}}.$$</p>

    <h3>4. Équation de la chaleur</h3>
    <p><strong>Démonstration en 1D.</strong> Bilan sur une tranche d'épaisseur $\Delta x$ et de section $A$ :</p>
    <ul>
      <li>stockage : $\dot E_\text{st}=\rho cA\Delta x\,\partial T/\partial t$ ;</li>
      <li>entrée et sortie : $\dot E_\text{in}=q_xA$, $\dot E_\text{out}=q_{x+\Delta x}A$ avec, par Taylor,
          $q_{x+\Delta x}=q_x+\dfrac{\partial q_x}{\partial x}\Delta x+O(\Delta x^2)$ ;</li>
      <li>génération : $\dot E_g=\dot q A\Delta x$ ($\dot q$ en W/m³) ;</li>
      <li>Fourier : $q_x=-k\,\partial T/\partial x$.</li>
    </ul>
    <p>En divisant par $A\Delta x$ et en faisant $\Delta x\to 0$ :</p>
    <p>$$\rho c\,\frac{\partial T}{\partial t}=\frac{\partial}{\partial x}\Big(k\frac{\partial T}{\partial x}\Big)+\dot q.$$</p>
    <p><strong>En 3D</strong> (coordonnées cartésiennes) :</p>
    <p>$$\rho c\,\frac{\partial T}{\partial t}=\frac{\partial}{\partial x}\Big(k\frac{\partial T}{\partial x}\Big)+\frac{\partial}{\partial y}\Big(k\frac{\partial T}{\partial y}\Big)+\frac{\partial}{\partial z}\Big(k\frac{\partial T}{\partial z}\Big)+\dot q.$$</p>
    <p><strong>Cylindriques</strong> $(r,\phi,z)$ :
    $\rho c_p\dfrac{\partial T}{\partial t}=\dfrac1r\dfrac{\partial}{\partial r}\Big(kr\dfrac{\partial T}{\partial r}\Big)+\dfrac{1}{r^2}\dfrac{\partial}{\partial\phi}\Big(k\dfrac{\partial T}{\partial\phi}\Big)+\dfrac{\partial}{\partial z}\Big(k\dfrac{\partial T}{\partial z}\Big)+\dot q$.</p>
    <p><strong>Sphériques</strong> $(r,\phi,\theta)$ :
    $\rho c_p\dfrac{\partial T}{\partial t}=\dfrac{1}{r^2}\dfrac{\partial}{\partial r}\Big(kr^2\dfrac{\partial T}{\partial r}\Big)+\dfrac{1}{r^2\sin^2\theta}\dfrac{\partial}{\partial\phi}\Big(k\dfrac{\partial T}{\partial\phi}\Big)+\dfrac{1}{r^2\sin\theta}\dfrac{\partial}{\partial\theta}\Big(k\sin\theta\dfrac{\partial T}{\partial\theta}\Big)+\dot q$.</p>
    <div class="callout"><strong>Sens physique.</strong>
      <p>Terme par terme, l'équation est le bilan $\dot E_\text{st}=\dot E_\text{in}-\dot E_\text{out}+\dot E_g$ par unité de volume.
      Tout champ de température de conduction doit la vérifier <em>en tout point</em> : c'est un test immédiat pour rejeter une
      « solution » proposée. Par exemple, sans génération et à $k$ constant, $T(x,t)=xt$ est impossible, car
      $\partial T/\partial t=x$ alors que $\partial^2T/\partial x^2=0$.</p></div>
    <p><strong>Cas particuliers</strong> :</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Hypothèses</th><th>Équation</th></tr></thead>
      <tbody>
        <tr><td>1D</td><td>$\rho c\,\partial T/\partial t=\partial_x(k\,\partial_xT)+\dot q$</td></tr>
        <tr><td>1D, permanent</td><td>$\dfrac{d}{dx}\Big(k\dfrac{dT}{dx}\Big)+\dot q=0$</td></tr>
        <tr><td>1D, $k$ constant</td><td>$\dfrac{\partial T}{\partial t}=\alpha\dfrac{\partial^2T}{\partial x^2}+\dfrac{\dot q}{\rho c}$</td></tr>
        <tr><td>1D, $k$ constant, sans génération</td><td>$\dfrac{\partial T}{\partial t}=\alpha\dfrac{\partial^2T}{\partial x^2}$</td></tr>
        <tr><td>1D, permanent, $k$ constant, sans génération</td><td>$\dfrac{d^2T}{dx^2}=0$ : profil <strong>linéaire</strong></td></tr>
      </tbody></table></div>
    <div class="callout"><strong>Conductivité ou diffusivité ?</strong>
      <p>En régime <strong>permanent</strong>, $k$ est le seul paramètre : il fixe le flux. En régime <strong>transitoire</strong>,
      $\alpha=k/\rho c_p$ contrôle le rapport entre la diffusion et le stockage de chaleur, donc la vitesse à laquelle la température
      change. Plus grande conductivité $\Rightarrow$ plus de chaleur transférée ; plus grande diffusivité $\Rightarrow$ variation de
      température plus rapide. Exemple : air $\alpha=0{,}0263/(1{,}1614\times 1\,007)\approx 2{,}25\times 10^{-5}$ m²/s, fer
      $\alpha\approx 2{,}3\times 10^{-5}$ m²/s : diffusivités voisines malgré des conductivités qui diffèrent d'un facteur 3 000.</p>
      <p>Analogie : la <strong>viscosité cinématique</strong> $\nu=\mu/\rho$ (m²/s) est le rapport diffusion de quantité de mouvement /
      inertie, comme l'accélération $a=F/m$ est le rapport force / inertie.</p></div>

    <h3>5. Conditions initiales et aux limites</h3>
    <p>Une solution doit vérifier l'équation, la <strong>condition initiale</strong> $T(x,y,z,0)=f(x,y,z)$ et les <strong>conditions aux
    limites</strong>, qui sont des lois de conservation appliquées à la frontière :</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Type</th><th>Expression (face $x=0$)</th><th>Exemples</th></tr></thead>
      <tbody>
        <tr><td>1<sup>re</sup> espèce (Dirichlet) : température imposée</td><td>$T(0,t)=T_0$</td><td>surface régulée, interface de changement de phase</td></tr>
        <tr><td>2<sup>e</sup> espèce (Neumann) : flux imposé</td><td>$-k\,\partial T/\partial x\big|_{0}=q''_0$</td><td>chauffage électrique en surface</td></tr>
        <tr><td>Surface isolée (adiabatique)</td><td>$\partial T/\partial x\big|_{0}=0$</td><td>paroi calorifugée, plan de symétrie</td></tr>
        <tr><td>Condition mixte (surface exposée à l'air)</td><td>$-k\,\partial T/\partial x\big|_{0}=h\big[T_\infty-T(0,t)\big]+\varepsilon\sigma\big[T_\text{sur}^4-T(0,t)^4\big]$</td><td>ni $T$ ni flux connus : $q''_\text{cond}=q''_\text{conv}+q''_\text{rad}$</td></tr>
      </tbody></table></div>

    <h3>6. Démonstration intégrale</h3>
    <p>Pour un volume $V_0$ de frontière $S_0$ et de normale sortante $\mathbf n$, la conservation s'écrit</p>
    <p>$$\frac{d}{dt}\int_{V_0}E\,dV=-\oint_{S_0}\mathbf q''\cdot\mathbf n\,dS+\int_{V_0}\dot q\,dV.$$</p>
    <p>Le théorème de la divergence transforme l'intégrale de surface : $\oint_{S_0}\mathbf q''\cdot\mathbf n\,dS=\int_{V_0}\nabla\cdot\mathbf q''\,dV$.
    Le volume étant arbitraire, les intégrandes sont égaux : $\rho c\,\partial T/\partial t=-\nabla\cdot\mathbf q''+\dot q=\nabla\cdot(k\nabla T)+\dot q$.</p>
  `,

  /* -------------------- FICHE PARTIEL -------------------- */
  keyPoints: [
    {
      text: String.raw`<strong>Fourier 3D.</strong> $\mathbf q''=-k\nabla T$ : vecteur perpendiculaire aux isothermes, du chaud vers le froid.
        $k$ dépend de $T$ ; tenseur $k_{ij}$ si le matériau est anisotrope.`,
    },
    {
      text: String.raw`<strong>Conductivité.</strong> $k_\text{sol}\gt k_\text{liq}\gt k_\text{gaz}$. Solides : électrons $+$ phonons (Wiedemann-Franz,
        cristal $\gt$ amorphe, effet de taille si épaisseur ~ MFP). Gaz : $k=\frac13\rho c_v\bar vl$, croît avec $T$, quasi indépendant
        de $P$.`,
      exos: ["ex-gas-conductivity"],
    },
    {
      text: String.raw`<strong>Équation de la chaleur.</strong> $\rho c\,\partial_tT=\nabla\cdot(k\nabla T)+\dot q$ $=$ bilan local. Savoir la démontrer
        en 1D (tranche $\Delta x$, Taylor, Fourier) et reconnaître les formes cylindrique et sphérique.`,
      exos: ["ex-check-solution", "ex-wall-profile"],
    },
    {
      text: String.raw`<strong>Cas particuliers.</strong> $k$ constant : $\partial_tT=\alpha\nabla^2T+\dot q/\rho c$. Permanent sans génération, 1D :
        $T$ linéaire. Tester une solution proposée en la substituant.`,
      exos: ["ex-check-solution"],
    },
    {
      text: String.raw`<strong>$k$ contre $\alpha$.</strong> Permanent : seul $k$ compte. Transitoire : $\alpha=k/\rho c_p$ (m²/s) règle la vitesse de
        variation de $T$. Air et fer ont des $\alpha$ voisins ($\approx 2{,}3\times 10^{-5}$ m²/s).`,
      exos: ["ex-diffusivity"],
    },
    {
      text: String.raw`<strong>Conditions aux limites.</strong> 1<sup>re</sup> espèce $T$ imposée ; 2<sup>e</sup> espèce flux imposé (isolé :
        $\partial T/\partial x=0$) ; mixte : $-k\,\partial_xT=h(T-T_\infty)+\varepsilon\sigma(T^4-T_\text{sur}^4)$. Ce sont des bilans sur la frontière.`,
      exos: ["ex-bc"],
    },
  ],

  /* -------------------- FORMULAIRE -------------------- */
  formulas: [
    { name: "Loi de Fourier (3D)", latex: String.raw`\mathbf q''=-k\,\nabla T=-k\Big(\frac{\partial T}{\partial x}\mathbf i+\frac{\partial T}{\partial y}\mathbf j+\frac{\partial T}{\partial z}\mathbf k\Big)` },
    { name: "Libre parcours moyen", note: "d : diamètre des particules, n : densité numérique", latex: String.raw`l=\frac{1}{\sqrt2\,\pi d^2 n}` },
    { name: "Conductivité d'un gaz (théorie cinétique)", latex: String.raw`k=\frac13\,\rho\,c_v\,\bar v\,l` },
    { name: "Diffusivité thermique", latex: String.raw`\alpha=\frac{k}{\rho\,c_p}\quad[\text{m}^2/\text{s}]` },
    { name: "Équation de la chaleur (cartésiennes)", latex: String.raw`\rho c\,\frac{\partial T}{\partial t}=\frac{\partial}{\partial x}\Big(k\frac{\partial T}{\partial x}\Big)+\frac{\partial}{\partial y}\Big(k\frac{\partial T}{\partial y}\Big)+\frac{\partial}{\partial z}\Big(k\frac{\partial T}{\partial z}\Big)+\dot q` },
    { name: "Équation de la chaleur (cylindriques)", latex: String.raw`\rho c_p\frac{\partial T}{\partial t}=\frac1r\frac{\partial}{\partial r}\Big(kr\frac{\partial T}{\partial r}\Big)+\frac1{r^2}\frac{\partial}{\partial\phi}\Big(k\frac{\partial T}{\partial\phi}\Big)+\frac{\partial}{\partial z}\Big(k\frac{\partial T}{\partial z}\Big)+\dot q` },
    { name: "Équation de la chaleur (sphériques)", latex: String.raw`\rho c_p\frac{\partial T}{\partial t}=\frac1{r^2}\frac{\partial}{\partial r}\Big(kr^2\frac{\partial T}{\partial r}\Big)+\frac1{r^2\sin^2\theta}\frac{\partial}{\partial\phi}\Big(k\frac{\partial T}{\partial\phi}\Big)+\frac1{r^2\sin\theta}\frac{\partial}{\partial\theta}\Big(k\sin\theta\frac{\partial T}{\partial\theta}\Big)+\dot q` },
    { name: "k constant", latex: String.raw`\frac{\partial T}{\partial t}=\alpha\,\nabla^2T+\frac{\dot q}{\rho c}` },
    { name: "1D, permanent", latex: String.raw`\frac{d}{dx}\Big(k\frac{dT}{dx}\Big)+\dot q=0` },
    { name: "Forme intégrale de la conservation", latex: String.raw`\frac{d}{dt}\int_{V_0}\rho cT\,dV=-\oint_{S_0}\mathbf q''\cdot\mathbf n\,dS+\int_{V_0}\dot q\,dV` },
    { name: "Condition de 1re espèce", latex: String.raw`T(0,t)=T_0` },
    { name: "Condition de 2e espèce / isolée", latex: String.raw`-k\frac{\partial T}{\partial x}\Big|_{x=0}=q''_0,\qquad \frac{\partial T}{\partial x}\Big|_{x=0}=0` },
    { name: "Condition mixte (face x = 0, milieu en x > 0)", latex: String.raw`-k\frac{\partial T}{\partial x}\Big|_{x=0}=h\big[T_\infty-T(0,t)\big]+\varepsilon\sigma\big[T_\text{sur}^4-T(0,t)^4\big]` },
  ],

  /* -------------------- QCM -------------------- */
  qcm: [
    {
      q: String.raw`Le vecteur flux conductif en un point est…`,
      choices: [
        String.raw`tangent aux isothermes.`,
        String.raw`perpendiculaire aux isothermes, orienté vers les températures croissantes.`,
        String.raw`perpendiculaire aux isothermes, orienté vers les températures décroissantes.`,
        String.raw`toujours parallèle à l'axe $x$.`,
      ],
      answer: 2,
      explanation: String.raw`$\mathbf q''=-k\nabla T$ : le gradient est normal aux isothermes et pointe vers les $T$ croissantes ; le signe moins inverse le sens.`,
    },
    {
      q: String.raw`D'après la théorie cinétique, que devient la conductivité d'un gaz si l'on double sa pression à température constante ?`,
      choices: [String.raw`Elle double.`, String.raw`Elle est divisée par deux.`, String.raw`Elle reste pratiquement inchangée.`, String.raw`Elle est multipliée par 4.`],
      answer: 2,
      explanation: String.raw`$k=\frac13\rho c_v\bar vl$ : $\rho$ double mais le libre parcours moyen $l\propto 1/n$ est divisé par deux ; $\bar v$ ne dépend que de $T$.`,
    },
    {
      q: String.raw`Pourquoi un film très mince peut-il avoir une conductivité plus faible que le matériau massif ?`,
      choices: [
        String.raw`Parce que sa masse volumique est plus faible.`,
        String.raw`Parce que son épaisseur devient comparable au libre parcours moyen des porteurs (diffusion aux frontières).`,
        String.raw`Parce que la loi de Wiedemann-Franz ne s'applique plus.`,
        String.raw`Parce que le rayonnement y domine.`,
      ],
      answer: 1,
      explanation: String.raw`C'est l'effet de taille : les porteurs (phonons, électrons) heurtent les frontières avant de parcourir leur libre parcours moyen,
        ce qui réduit le transport. On sort alors du régime macroscopique.`,
    },
    {
      q: String.raw`Quelle est l'unité de la diffusivité thermique $\alpha$ ?`,
      choices: [String.raw`W/m·K`, String.raw`m²/s`, String.raw`J/kg·K`, String.raw`W/m²·K`],
      answer: 1,
      explanation: String.raw`$\alpha=k/(\rho c_p)$ : (W/m·K) / (kg/m³ · J/kg·K) $=$ m²/s, la même unité que la viscosité cinématique $\nu$.`,
    },
    {
      q: String.raw`En régime <strong>permanent</strong> 1D, sans génération, avec $k$ constant, le profil de température est :`,
      choices: [String.raw`exponentiel.`, String.raw`parabolique.`, String.raw`linéaire.`, String.raw`logarithmique.`],
      answer: 2,
      explanation: String.raw`$d^2T/dx^2=0$ donne $T=C_1x+C_2$. Un profil parabolique apparaît avec génération ; logarithmique en cylindrique.`,
    },
    {
      q: String.raw`À $k$ constant et sans génération, laquelle de ces fonctions peut être un champ de température transitoire 1D ?`,
      choices: [
        String.raw`$T=xt$`,
        String.raw`$T=e^{-\alpha t}\sin x$`,
        String.raw`$T=x^2+t$`,
        String.raw`$T=e^{t}\sin x$`,
      ],
      answer: 1,
      explanation: String.raw`Pour $e^{-\alpha t}\sin x$ : $\partial_tT=-\alpha e^{-\alpha t}\sin x$ et $\alpha\,\partial_{xx}T=-\alpha e^{-\alpha t}\sin x$. Égalité vérifiée.
        Pour $x^2+t$, il faudrait $1=2\alpha$ : faux en général (et dimensionnellement incohérent).`,
    },
    {
      q: String.raw`Deux matériaux ont la même conductivité, mais le second a une capacité thermique volumique $\rho c_p$ dix fois plus grande. En transitoire, le second…`,
      choices: [
        String.raw`s'échauffe dix fois plus vite.`,
        String.raw`s'échauffe plus lentement : sa diffusivité est dix fois plus faible.`,
        String.raw`se comporte exactement comme le premier.`,
        String.raw`conduit dix fois moins de chaleur en régime permanent.`,
      ],
      answer: 1,
      explanation: String.raw`$\alpha=k/\rho c_p$ est dix fois plus petit : une partie plus grande de la chaleur est stockée localement, la température
        évolue plus lentement. En régime permanent, seul $k$ compte, donc les deux conduisent autant.`,
    },
    {
      q: String.raw`La condition $\partial T/\partial x=0$ en une frontière correspond à…`,
      choices: [String.raw`une température imposée.`, String.raw`une surface isolée ou un plan de symétrie.`, String.raw`une convection très intense.`, String.raw`une interface de changement de phase.`],
      answer: 1,
      explanation: String.raw`Flux nul : c'est un cas particulier de la condition de 2<sup>e</sup> espèce. Un plan de symétrie a le même effet, car rien ne le traverse.`,
    },
    {
      q: String.raw`Dans l'équation de la chaleur, le terme $\frac{\partial}{\partial x}\big(k\,\partial T/\partial x\big)$ représente…`,
      choices: [
        String.raw`le stockage d'énergie par unité de volume.`,
        String.raw`le flux net de conduction entrant par unité de volume.`,
        String.raw`la génération interne.`,
        String.raw`les pertes par convection.`,
      ],
      answer: 1,
      explanation: String.raw`C'est $-\partial q''_x/\partial x$ : ce qui entre moins ce qui sort, par unité de volume. $\rho c\,\partial T/\partial t$ est le stockage, $\dot q$ la génération.`,
    },
  ],

  /* -------------------- EXERCICES -------------------- */
  exos: [
    {
      id: "ex-check-solution",
      title: "Une solution proposée est-elle possible ?",
      difficulty: "facile",
      tags: ["équation de la chaleur", "vérification"],
      statement: String.raw`<p>Un milieu 1D a une conductivité constante et une diffusivité $\alpha$. Dire si les champs suivants peuvent être solutions
        de l'équation de la chaleur, et le cas échéant quelle génération $\dot q$ il faudrait.</p>
        <p>(a) $T(x,t)=xt$ sans génération. (b) $T(x,t)=T_0+Ae^{-\alpha\lambda^2t}\sin(\lambda x)$ sans génération.
        (c) $T(x)=T_0+ax+bx^2$ en régime permanent. (d) $T(x,t)=T_0+ct$ uniforme en espace.</p>`,
      hints: [String.raw`Substituer dans $\partial_tT=\alpha\,\partial_{xx}T+\dot q/(\rho c)$ et comparer.`],
      solution: String.raw`
        <p><strong>(a) Impossible.</strong> $\partial_tT=x$ mais $\alpha\,\partial_{xx}T=0$ ; il faudrait $\dot q=\rho cx$, variable dans l'espace, alors
        qu'on a supposé $\dot q=0$.</p>
        <p><strong>(b) Possible.</strong> $\partial_tT=-\alpha\lambda^2Ae^{-\alpha\lambda^2t}\sin\lambda x$ et $\partial_{xx}T=-\lambda^2Ae^{-\alpha\lambda^2t}\sin\lambda x$,
        donc $\partial_tT=\alpha\,\partial_{xx}T$. C'est le mode de base de la méthode de séparation des variables.</p>
        <p><strong>(c) Possible avec génération.</strong> $0=k\cdot 2b+\dot q$, donc $\dot q=-2kb$ uniforme. Si $b\lt 0$, il y a génération ; si
        $b=0$, on retrouve le profil linéaire sans génération.</p>
        <p><strong>(d) Possible avec génération uniforme</strong> $\dot q=\rho c\,c$ : sans gradient, pas de conduction, et toute l'énergie générée est
        stockée. C'est la situation d'un corps isolé chauffé uniformément.</p>`,
    },
    {
      id: "ex-diffusivity",
      title: "Conductivité ou diffusivité ?",
      difficulty: "facile",
      tags: ["diffusivité", "propriétés"],
      statement: String.raw`<p>Propriétés à 300 K :</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>Matériau</th><th>$k$ (W/m·K)</th><th>$\rho$ (kg/m³)</th><th>$c_p$ (J/kg·K)</th></tr></thead>
          <tbody>
            <tr><td>Air</td><td>0,0263</td><td>1,1614</td><td>1 007</td></tr>
            <tr><td>Fer</td><td>80,2</td><td>7 870</td><td>447</td></tr>
            <tr><td>Eau</td><td>0,613</td><td>997</td><td>4 179</td></tr>
            <tr><td>Cuivre</td><td>401</td><td>8 933</td><td>385</td></tr>
          </tbody></table></div>
        <p>(a) Calculer la diffusivité de chaque matériau. (b) Classer les matériaux selon la chaleur qu'ils conduisent en régime permanent,
        puis selon la rapidité de leur réponse en transitoire. (c) Estimer la profondeur affectée $\sqrt{\alpha t}$ au bout de 60 s dans le
        fer et dans l'eau.</p>`,
      solution: String.raw`
        <p><strong>(a)</strong> $\alpha=k/\rho c_p$ : air $2{,}25\times 10^{-5}$ ; fer $2{,}28\times 10^{-5}$ ; eau $1{,}47\times 10^{-7}$ ; cuivre
        $1{,}17\times 10^{-4}$ m²/s.</p>
        <p><strong>(b)</strong> Régime permanent (selon $k$) : cuivre $\gt$ fer $\gt$ eau $\gt$ air. Transitoire (selon $\alpha$) : cuivre $\gt$
        fer $\approx$ air $\gg$ eau. L'air conduit 3 000 fois moins que le fer mais sa température change aussi vite, car il stocke très peu
        d'énergie ($\rho c_p$ minuscule). L'eau, avec sa grande capacité thermique, est le plus « lent ».</p>
        <p><strong>(c)</strong> Fer : $\sqrt{2{,}28\times 10^{-5}\times 60}\approx 3{,}7$ cm. Eau : $\sqrt{1{,}47\times 10^{-7}\times 60}\approx 0{,}9$ mm.
        L'ordre de grandeur $\delta\sim\sqrt{\alpha t}$ sera justifié au chapitre 4.</p>`,
    },
    {
      id: "ex-wall-profile",
      title: "Lire un profil de température instantané",
      difficulty: "moyen",
      tags: ["équation de la chaleur", "bilan d'énergie"],
      statement: String.raw`<p>À un instant donné, la température dans un mur plan d'épaisseur $L=1$ m et de surface $A=10$ m² vaut
        $T(x)=900-300x-50x^2$ (°C, $x$ en m). Le mur a $k=40$ W/m·K, $\rho=1\,600$ kg/m³, $c=4\,000$ J/kg·K et une génération uniforme
        $\dot q=1\,000$ W/m³.</p>
        <p>(a) Calculer le taux de chaleur entrant en $x=0$ et sortant en $x=L$. (b) Calculer l'énergie générée et le taux de variation de
        l'énergie stockée dans le mur. (c) Calculer $\partial T/\partial t$ en $x=0$, $x=0{,}5$ m et $x=L$. Commenter.</p>`,
      hints: [String.raw`$q_x=-kA\,dT/dx$ avec $dT/dx=-300-100x$.`],
      solution: String.raw`
        <p><strong>(a)</strong> $dT/dx=-300-100x$. En $x=0$ : $q_\text{in}=-kA(-300)=40\times 10\times 300=120$ kW. En $x=1$ :
        $q_\text{out}=-40\times 10\times(-400)=160$ kW.</p>
        <p><strong>(b)</strong> $\dot E_g=\dot qAL=1\,000\times 10=10$ kW. Bilan : $\dot E_\text{st}=120-160+10=-30$ kW : le mur se refroidit.</p>
        <p><strong>(c)</strong> $\rho c\,\partial_tT=k\,\partial_{xx}T+\dot q=40\times(-100)+1\,000=-3\,000$ W/m³, donc
        $\partial_tT=-3\,000/(1\,600\times 4\,000)\approx-4{,}69\times 10^{-4}$ K/s, <em>identique</em> en tout point car la dérivée seconde est
        constante. Vérification globale : $\rho cAL\,\partial_tT=6{,}4\times 10^{7}\times(-4{,}69\times 10^{-4})=-30$ kW.</p>`,
    },
    {
      id: "ex-bc",
      title: "Écrire les conditions aux limites",
      difficulty: "moyen",
      tags: ["conditions aux limites"],
      statement: String.raw`<p>Écrire mathématiquement les conditions aux limites (et la condition initiale) des situations suivantes, pour un mur
        occupant $0\le x\le L$ :</p>
        <p>(a) Le mur, initialement à $T_i$, a sa face $x=0$ brusquement portée à $T_0$ et sa face $x=L$ isolée.
        (b) La face $x=0$ reçoit un flux solaire absorbé $q''_\text{sol}$ et perd par convection vers l'air ($h$, $T_\infty$) ; la face $x=L$ est en
        contact avec un bain de glace fondante. (c) La face $x=L$ échange par convection ($h$, $T_\infty$) et par rayonnement avec un grand
        environnement à $T_\text{sur}$ ($\varepsilon$). (d) Un mur symétrique chauffé par génération interne, étudié sur sa moitié.</p>`,
      solution: String.raw`
        <p><strong>(a)</strong> CI : $T(x,0)=T_i$. CL : $T(0,t)=T_0$ (1<sup>re</sup> espèce) et $\partial_xT(L,t)=0$ (isolé).</p>
        <p><strong>(b)</strong> Bilan sur la face $x=0$ (le mur est du côté $x\gt 0$) : ce qui entre dans le mur par conduction égale le flux
        solaire moins la convection : $-k\,\partial_xT(0,t)=q''_\text{sol}-h\big[T(0,t)-T_\infty\big]$. En $x=L$ : $T(L,t)=0$ °C (interface de
        changement de phase).</p>
        <p><strong>(c)</strong> La conduction qui arrive à la face sort par convection et rayonnement :
        $-k\,\partial_xT(L,t)=h\big[T(L,t)-T_\infty\big]+\varepsilon\sigma\big[T(L,t)^4-T_\text{sur}^4\big]$, températures en K dans le terme radiatif.</p>
        <p><strong>(d)</strong> Au plan médian $x=0$ : $\partial_xT(0,t)=0$ (symétrie, flux nul) ; à la surface, la condition réelle (température ou
        convection).</p>
        <p>Méthode générale : écrire un bilan sur la frontière, $\dot E_\text{in}=\dot E_\text{out}$, en orientant soigneusement les flux.</p>`,
    },
    {
      id: "ex-gas-conductivity",
      title: "Conductivité d'un gaz et libre parcours moyen",
      difficulty: "difficile",
      tags: ["théorie cinétique", "libre parcours moyen", "microéchelle"],
      statement: String.raw`<p>On modélise l'air comme un gaz de molécules de diamètre $d\approx 3{,}7\times 10^{-10}$ m.</p>
        <p>(a) À 300 K et 1 atm, la densité numérique vaut $n=P/(k_BT)$ avec $k_B=1{,}38\times 10^{-23}$ J/K. Calculer $n$ puis le libre
        parcours moyen $l$. (b) À partir de $k=\frac13\rho c_v\bar vl$, expliquer pourquoi $k$ ne dépend presque pas de la pression mais augmente avec
        la température. (c) Dans un double vitrage sous vide partiel, l'espace entre les vitres fait 1 cm. En dessous de quelle pression
        environ la conductivité du gaz commence-t-elle à chuter ? Pourquoi ?</p>`,
      hints: [String.raw`$l=1/(\sqrt2\pi d^2n)$ et $n\propto P$ : $l\propto 1/P$.`],
      solution: String.raw`
        <p><strong>(a)</strong> $n=101\,325/(1{,}38\times 10^{-23}\times 300)\approx 2{,}45\times 10^{25}$ m⁻³. Alors
        $l=1/(\sqrt2\,\pi\times(3{,}7\times 10^{-10})^2\times 2{,}45\times 10^{25})\approx 6{,}7\times 10^{-8}$ m, soit environ 67 nm.</p>
        <p><strong>(b)</strong> $\rho\propto n\propto P$ tandis que $l\propto 1/n\propto 1/P$ : le produit $\rho l$ est indépendant de $P$. $c_v$ (par unité
        de masse) ne dépend pas de $P$ et $\bar v\propto\sqrt T$. Donc $k$ ne dépend pas de $P$ et croît avec $T$.</p>
        <p><strong>(c)</strong> Le raisonnement tient tant que $l\ll$ dimension du système. Si $l$ atteint l'ordre de 1 cm, les molécules vont
        d'une vitre à l'autre sans collision : $l$ est plafonné par la géométrie et $k$ devient proportionnel à $n$, donc à $P$. $l=10^{-2}$ m
        correspond à $P\approx 101\,325\times 6{,}7\times 10^{-8}/10^{-2}\approx 0{,}7$ Pa. Sous ~1 Pa, la conduction du gaz chute : c'est le
        principe de l'isolation sous vide (bouteilles isothermes).</p>`,
    },
  ],

  /* -------------------- DÉFINITIONS -------------------- */
  definitions: [
    { term: "Gradient de température", abbr: "∇T", def: String.raw`Vecteur des dérivées spatiales de $T$, normal aux isothermes et orienté vers les températures croissantes.` },
    { term: "Isotherme", def: String.raw`Surface (ou ligne) d'égale température ; le flux conductif la traverse perpendiculairement.` },
    { term: "Matériau isotrope / anisotrope", def: String.raw`Isotrope : $k$ identique dans toutes les directions. Anisotrope : $k$ dépend de la direction et devient un tenseur $k_{ij}$ (bois, composites).` },
    { term: "Porteurs d'énergie", def: String.raw`Phonons, particules (électrons, molécules, atomes) et photons.` },
    { term: "Libre parcours moyen", abbr: "MFP", def: String.raw`<em>Mean free path</em> : distance moyenne parcourue par un porteur entre deux collisions, $l=1/(\sqrt2\pi d^2n)$. Sépare microéchelle et macroéchelle.` },
    { term: "Loi de Wiedemann-Franz", def: String.raw`Relie conductivités thermique et électrique des métaux : les bons conducteurs électriques sont de bons conducteurs thermiques.` },
    { term: "Diffusion aux joints de grains", def: String.raw`Dispersion des phonons aux frontières entre cristallites ; explique que les matériaux amorphes ou polycristallins conduisent moins bien.` },
    { term: "Effet de taille", def: String.raw`Baisse de conductivité quand la dimension du système (film mince) devient comparable au libre parcours moyen, par diffusion aux frontières.` },
    { term: "Théorie cinétique des gaz", def: String.raw`Modèle donnant $k=\frac13\rho c_v\bar vl$ : $k$ augmente avec $T$ et dépend peu de $P$.` },
    { term: "Diffusivité thermique", abbr: "α", def: String.raw`$\alpha=k/\rho c_p$ (m²/s) : rapport entre diffusion et stockage de chaleur ; règle la vitesse des variations de température en transitoire.` },
    { term: "Capacité thermique volumique", abbr: "ρc_p", def: String.raw`Énergie stockée par unité de volume pour 1 K d'élévation de température, en J/m³·K.` },
    { term: "Viscosité cinématique", abbr: "ν", def: String.raw`$\nu=\mu/\rho$ (m²/s) : diffusivité de la quantité de mouvement, analogue de $\alpha$.` },
    { term: "Équation de la chaleur", def: String.raw`$\rho c\,\partial_tT=\nabla\cdot(k\nabla T)+\dot q$ : bilan d'énergie local qu'un champ de température de conduction doit vérifier en tout point.` },
    { term: "Génération volumique", abbr: "q̇", def: String.raw`Puissance thermique produite par unité de volume, en W/m³.` },
    { term: "Régime permanent (stationnaire)", def: String.raw`Températures indépendantes du temps : $\partial T/\partial t=0$.` },
    { term: "Régime transitoire (instationnaire)", def: String.raw`Températures variables dans le temps ; le terme de stockage $\rho c\,\partial_tT$ intervient.` },
    { term: "Développement de Taylor", def: String.raw`$q_{x+\Delta x}=q_x+(\partial q_x/\partial x)\Delta x+O(\Delta x^2)$ : outil de passage du bilan sur une tranche à l'équation différentielle.` },
    { term: "Théorème de la divergence", def: String.raw`$\oint_S\mathbf q\cdot\mathbf n\,dS=\int_V\nabla\cdot\mathbf q\,dV$ : transforme le flux à travers une surface fermée en intégrale de volume.` },
    { term: "Condition initiale", abbr: "CI", def: String.raw`Distribution de température à $t=0$ : $T(x,y,z,0)=f(x,y,z)$.` },
    { term: "Condition de 1re espèce", abbr: "Dirichlet", def: String.raw`Température imposée à la frontière : surface régulée, interface de changement de phase.` },
    { term: "Condition de 2e espèce", abbr: "Neumann", def: String.raw`Flux imposé à la frontière, $-k\,\partial T/\partial n=q''_0$ ; cas isolé : $\partial T/\partial n=0$.` },
    { term: "Condition mixte (convective)", def: String.raw`Surface exposée à un fluide (et à un environnement) : $q''_\text{cond}=q''_\text{conv}+q''_\text{rad}$ ; ni $T$ ni le flux ne sont connus a priori.` },
    { term: "Surface adiabatique", def: String.raw`Surface parfaitement isolée, sans flux : $\partial T/\partial n=0$. Un plan de symétrie se comporte de même.` },
  ],
});
