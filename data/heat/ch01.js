/* ============================================================
   Heat Transfer — Chapitre 1 : Introduction, modes de transfert
   et bilan d'énergie
   Source : Supplementary Lecture Notes, cours 1 (Introduction) et
   2 (Basic methodology). Contenu rédigé pour la révision — à relire
   et valider. Exemples chiffrés recalculés.
   NB : les champs contenant du LaTeX utilisent String.raw pour
   préserver les backslashes. Ne jamais écrire la séquence ${ }.
   Dans les champs HTML, écrire « &lt; » pour « < » suivi d'une lettre.
   ============================================================ */
addChapter("heat", {
  id: "ch01",
  title: "Chapitre 1 — Introduction et bilan d'énergie",
  short: "Ch. 1",
  lang: "fr",

  /* -------------------- RÉSUMÉ DE COURS -------------------- */
  summary: String.raw`
    <h3>1. Qu'est-ce que le transfert thermique ?</h3>
    <p>Le <strong>transfert thermique</strong> (<em>heat transfer</em>, HT) est le transport d'énergie thermique dans
    l'espace et dans le temps : « de l'énergie en transit due à une différence de température ». Il complète la
    thermodynamique, qui traite des états d'équilibre :</p>
    <ul>
      <li>le <strong>1<sup>er</sup> principe</strong> dit que l'énergie se conserve ;</li>
      <li>le <strong>2<sup>e</sup> principe</strong> dit que la chaleur va des zones chaudes vers les zones froides ;</li>
      <li>le <strong>transfert thermique</strong> répond à : <em>à quelle vitesse</em> (le taux, en W) et <em>de quelle
          manière</em> (répartition spatiale de la température) ?</li>
    </ul>
    <p>Il est central dans de nombreux domaines : systèmes énergétiques et automobile (mécanique), refroidissement des
    composants électroniques (électrique), contrôle des réactions (chimie), synthèse des matériaux.</p>
    <p><strong>Énergie thermique et température.</strong> L'énergie thermique est l'énergie cinétique des atomes, molécules
    et électrons (translation, vibration, rotation). La <strong>température</strong> mesure l'intensité de cette énergie :
    elle indique à quel point un corps est chaud et fixe le <em>sens</em> du transfert. Les porteurs d'énergie sont les
    particules (atomes, molécules, électrons), les <strong>phonons</strong> (quanta de vibration du réseau) et les
    <strong>photons</strong> (rayonnement électromagnétique).</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Grandeur</th><th>Symbole</th><th>Unité</th></tr></thead>
      <tbody>
        <tr><td>Énergie thermique</td><td>$E$, $Q$</td><td>J</td></tr>
        <tr><td>Taux de transfert (puissance)</td><td>$q$</td><td>W $=$ J/s</td></tr>
        <tr><td>Taux par unité de longueur</td><td>$q'=q/L$</td><td>W/m</td></tr>
        <tr><td>Flux (taux par unité de surface)</td><td>$q''=q/A$</td><td>W/m²</td></tr>
        <tr><td>Température</td><td>$T$</td><td>°C ou K, avec $T(\text{K})=T(°\text{C})+273{,}15$</td></tr>
      </tbody></table></div>
    <p>Quand °C ou K est au dénominateur (chaleur massique en J/kg·K, conductivité en W/m·K), passer de l'un à l'autre ne
    change pas la valeur numérique, car seules des <em>différences</em> de température interviennent.</p>

    <h3>2. Conduction</h3>
    <p>La <strong>conduction</strong> (diffusion de la chaleur) est le transfert dû au mouvement aléatoire des molécules,
    atomes et électrons dans un solide ou un fluide immobile. Macroscopiquement rien ne bouge, mais l'agitation microscopique
    se diffuse des zones chaudes vers les zones froides jusqu'à l'équilibre. Dans un fluide immobile, c'est l'agitation
    moléculaire qui domine ; dans un solide, ce sont les vibrations du réseau et les électrons libres.</p>
    <p><strong>Loi de Fourier</strong> (1D) : le taux est proportionnel à la surface et au <em>gradient</em> de température.</p>
    <p>$$q=-kA\frac{dT}{dx},\qquad q''=-k\frac{dT}{dx},\qquad \text{mur d'épaisseur }L:\ q=kA\frac{T_1-T_2}{L}.$$</p>
    <p>$k$ est la <strong>conductivité thermique</strong> (W/m·K). Le signe moins traduit le fait que la chaleur va dans le
    sens des températures décroissantes. Ordres de grandeur : aluminium $k=202$, eau $0{,}6$, air $0{,}026$ W/m·K.</p>
    <div class="callout"><strong>Analogie des phénomènes de transport.</strong>
      <div class="tbl-wrap"><table class="tbl">
        <thead><tr><th>Quantité transportée</th><th>Force motrice</th><th>Coefficient</th><th>Loi</th></tr></thead>
        <tbody>
          <tr><td>Quantité de mouvement</td><td>Gradient de vitesse</td><td>viscosité $\mu$</td><td>$\tau=\mu\,du/dx$ (loi de Newton)</td></tr>
          <tr><td>Énergie</td><td>Gradient de température</td><td>conductivité $k$</td><td>$q''=-k\,dT/dx$ (Fourier)</td></tr>
          <tr><td>Masse</td><td>Gradient de concentration</td><td>diffusivité $D_{AB}$</td><td>$j_A=-D_{AB}\,dm_A/dx$ (Fick)</td></tr>
        </tbody></table></div>
      <p>Le même mécanisme de diffusion gouverne les trois transferts : c'est ce qui permettra plus tard les analogies
      entre couche limite dynamique et thermique.</p></div>

    <h3>3. Convection</h3>
    <p>La <strong>convection</strong> est le transfert en présence d'un mouvement <em>d'ensemble</em> (macroscopique) du
    fluide : entre une paroi et un fluide, ou au sein d'un fluide en mouvement. Le champ de température dépend alors à la
    fois de la diffusion moléculaire et de l'énergie transportée par l'écoulement :</p>
    <p>$$\text{convection}=\text{conduction (diffusion)}+\text{advection (transport par l'écoulement)}.$$</p>
    <ul>
      <li>À la paroi, la vitesse du fluide est nulle (<strong>condition de non-glissement</strong>) : le transfert y est
          purement conductif. La convection contient donc toujours la conduction.</li>
      <li>L'écoulement peut être imposé de l'extérieur (<strong>convection forcée</strong> : ventilateur, pompe) ou induit
          par les forces de flottabilité (<strong>convection naturelle</strong> ou libre).</li>
    </ul>
    <p><strong>Loi de refroidissement de Newton</strong> :</p>
    <p>$$q=hA\,(T_s-T_\infty),\qquad q''=h\,(T_s-T_\infty),$$</p>
    <p>où $h$ est le <strong>coefficient de transfert convectif</strong> (W/m²·K), qui dépend des propriétés du fluide, de la
    vitesse, de la géométrie, etc.</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Mode</th><th>$h$ (W/m²·K)</th></tr></thead>
      <tbody>
        <tr><td>Convection naturelle — gaz</td><td>2 à 25</td></tr>
        <tr><td>Convection naturelle — liquides</td><td>50 à 1 000</td></tr>
        <tr><td>Convection forcée — gaz</td><td>25 à 250</td></tr>
        <tr><td>Convection forcée — liquides</td><td>50 à 20 000</td></tr>
        <tr><td>Avec changement de phase (ébullition, condensation)</td><td>2 500 à 100 000</td></tr>
      </tbody></table></div>
    <p>Le transfert est plus intense dans un liquide que dans un gaz ($k_\text{liq}\gt k_\text{gaz}$), et encore bien plus
    avec changement de phase, grâce à la chaleur latente.</p>

    <h3>4. Rayonnement</h3>
    <p>Le <strong>rayonnement</strong> est le transport d'énergie par ondes électromagnétiques, émises à cause des changements
    de configuration électronique de la matière. Toute surface à une température supérieure à 0 K rayonne. Il ne nécessite
    <strong>aucun milieu</strong> et devient important à haute température, en énergie solaire et dans l'espace.</p>
    <p><strong>Loi de Stefan-Boltzmann</strong> : la puissance émise par unité de surface (émittance, <em>emissive power</em>)
    varie comme $T^4$. Le maximum, atteint par le <strong>corps noir</strong>, vaut</p>
    <p>$$E_b=\sigma T^4,\qquad \sigma=5{,}67\times 10^{-8}\ \text{W/m}^2\text{K}^4 ;\qquad \text{surface réelle : } E=\varepsilon\sigma T^4,\ 0\le\varepsilon\le 1.$$</p>
    <p>$\varepsilon$ est l'<strong>émissivité</strong>, propriété optique de la surface. Pour un petit objet (surface $A$,
    émissivité $\varepsilon$) entouré d'une grande enceinte à $T_\text{sur}$ ($A\ll A_\text{sur}$, l'enceinte se comporte
    comme un corps noir, et on suppose absorptivité $=$ émissivité) :</p>
    <p>$$q=\varepsilon\sigma A\,(T^4-T_\text{sur}^4),\qquad q''=\varepsilon\sigma\,(T^4-T_\text{sur}^4).$$</p>
    <div class="callout warn"><strong>Toujours en kelvins.</strong>
      <p>Dans toute loi en $T^4$, les températures doivent être en <strong>kelvins</strong>. En conduction et en convection,
      seules des différences interviennent, et °C ou K donnent le même résultat.</p></div>
    <div class="callout"><strong>Résumé des trois lois de taux.</strong>
      <p>Conduction : $q=-kA\,dT/dx$. Convection : $q=hA(T_s-T_\infty)$. Rayonnement : $q=\varepsilon\sigma A(T^4-T_\text{sur}^4)$.</p></div>

    <h3>5. Méthodologie : modéliser un problème</h3>
    <p>Pour analyser un problème thermique, on le traduit en équations : c'est la <strong>modélisation</strong>. Deux outils :</p>
    <ol>
      <li>les <strong>équations de taux</strong> (lois constitutives) : Fourier, Newton, Stefan-Boltzmann, choisies selon les
          mécanismes identifiés ;</li>
      <li>les <strong>principes de conservation</strong> (masse, quantité de mouvement, énergie).</li>
    </ol>
    <p>Ensemble, ils donnent un modèle (équation différentielle, intégrale ou algébrique), qu'on résout par voie analytique,
    numérique, graphique ou expérimentale.</p>

    <h3>6. Conservation de l'énergie (bilan)</h3>
    <p>Premier principe : $Q-W=\Delta E$. En transfert thermique, il n'y a en général pas de travail, et le bilan sur un
    volume de contrôle s'écrit, en énergie puis en taux :</p>
    <p>$$E_\text{in}-E_\text{out}+E_g=E_\text{st},\qquad \dot E_\text{in}-\dot E_\text{out}+\dot E_g=\dot E_\text{st}.$$</p>
    <ul>
      <li>$\dot E_\text{in}$, $\dot E_\text{out}$ : phénomènes de <em>surface</em>, calculés avec les équations de taux
          (par exemple $\dot E_\text{in}=-kA\,dT/dx$, $\dot E_\text{out}=hA(T-T_\infty)$).</li>
      <li>$\dot E_g$ : génération <em>volumique</em> (effet Joule, réaction chimique, nucléaire) : $\dot E_g=\dot q\,V$.</li>
      <li>$\dot E_\text{st}$ : variation de l'énergie stockée. Si les énergies cinétique et potentielle sont négligeables :
          $\dot E_\text{st}=dU/dt$ avec $U=mc\,T$, donc $\dot E_\text{st}=mc\,dT/dt=\rho Vc\,dT/dt$ sans changement de phase.
          Avec changement de phase : $U=mcT+mh_l$ ($h_l$ : chaleur latente).</li>
    </ul>
    <div class="callout"><strong>Bilan sur une surface.</strong>
      <p>Une surface n'a ni volume ni masse : pas de génération ni de stockage. Le bilan devient $\dot E_\text{in}=\dot E_\text{out}$,
      par exemple $q''_\text{cond}=q''_\text{conv}+q''_\text{rad}$. C'est l'origine des conditions aux limites.</p></div>
  `,

  /* -------------------- FICHE PARTIEL -------------------- */
  keyPoints: [
    {
      text: String.raw`<strong>Rôle du transfert thermique.</strong> La thermodynamique dit <em>combien</em> et <em>dans quel sens</em>
        (1<sup>er</sup> et 2<sup>e</sup> principes) ; le transfert thermique dit <em>à quelle vitesse</em> ($q$ en W) et avec
        quelle répartition de température. Porteurs : particules, phonons, photons.`,
    },
    {
      text: String.raw`<strong>Conduction.</strong> Diffusion par agitation microscopique ; loi de Fourier $q=-kA\,dT/dx$,
        mur : $q=kA(T_1-T_2)/L$. Le flux suit le <em>gradient</em>, pas la simple différence de température.
        $k_\text{solide}\gt k_\text{liquide}\gt k_\text{gaz}$.`,
      exos: ["ex-modes"],
    },
    {
      text: String.raw`<strong>Convection.</strong> Conduction $+$ advection. Newton : $q=hA(T_s-T_\infty)$, $h$ n'est pas une
        propriété du fluide. Forcée ou naturelle ; ordres de grandeur : gaz en convection naturelle 2-25, liquides en
        convection forcée jusqu'à 20 000, changement de phase jusqu'à 100 000 W/m²·K.`,
      exos: ["ex-modes"],
    },
    {
      text: String.raw`<strong>Rayonnement.</strong> Ondes EM, pas de milieu. $E_b=\sigma T^4$, $E=\varepsilon\sigma T^4$.
        Petit objet dans grande enceinte : $q=\varepsilon\sigma A(T^4-T_\text{sur}^4)$, <strong>températures en K</strong>.
        Coefficient radiatif équivalent $h_r=\varepsilon\sigma(T+T_\text{sur})(T^2+T_\text{sur}^2)$.`,
      exos: ["ex-radiation"],
    },
    {
      text: String.raw`<strong>Méthodologie.</strong> Identifier les mécanismes $\Rightarrow$ équations de taux ; écrire la
        conservation $\Rightarrow$ modèle ; résoudre (analytique, numérique, expérimental).`,
    },
    {
      text: String.raw`<strong>Bilan d'énergie.</strong> $\dot E_\text{in}-\dot E_\text{out}+\dot E_g=\dot E_\text{st}$ avec
        $\dot E_\text{st}=\rho Vc\,dT/dt$ (ou $+\,mh_l$ si changement de phase) et $\dot E_g=\dot q V$. Sur une surface :
        $\dot E_\text{in}=\dot E_\text{out}$.`,
      exos: ["ex-energy-balance", "ex-phase-change"],
    },
  ],

  /* -------------------- FORMULAIRE -------------------- */
  formulas: [
    { name: "Loi de Fourier (1D)", note: "k : conductivité thermique [W/m·K]", latex: String.raw`q=-kA\frac{dT}{dx},\qquad q''=-k\frac{dT}{dx}` },
    { name: "Conduction à travers un mur plan", note: "épaisseur L, faces à T1 et T2", latex: String.raw`q=kA\,\frac{T_1-T_2}{L}` },
    { name: "Loi de refroidissement de Newton", note: "h : coefficient convectif [W/m²·K]", latex: String.raw`q=hA\,(T_s-T_\infty),\qquad q''=h\,(T_s-T_\infty)` },
    { name: "Émittance du corps noir (Stefan-Boltzmann)", note: "σ = 5,67×10⁻⁸ W/m²K⁴, T en K", latex: String.raw`E_b=\sigma T^4` },
    { name: "Émittance d'une surface réelle", note: "émissivité 0 ≤ ε ≤ 1", latex: String.raw`E=\varepsilon\sigma T^4` },
    { name: "Échange radiatif petit objet / grande enceinte", latex: String.raw`q=\varepsilon\sigma A\,(T^4-T_\text{sur}^4)` },
    { name: "Coefficient d'échange radiatif", note: "permet d'écrire q = h_r A (T − T_sur)", latex: String.raw`h_r=\varepsilon\sigma\,(T+T_\text{sur})(T^2+T_\text{sur}^2)` },
    { name: "Conservation de l'énergie (taux)", latex: String.raw`\dot E_\text{in}-\dot E_\text{out}+\dot E_g=\dot E_\text{st}` },
    { name: "Énergie stockée sans changement de phase", latex: String.raw`\dot E_\text{st}=\frac{dU}{dt}=mc\,\frac{dT}{dt}=\rho Vc\,\frac{dT}{dt}` },
    { name: "Énergie interne avec changement de phase", note: "h_l : chaleur latente", latex: String.raw`U=mc\,T+m\,h_l` },
    { name: "Génération volumique", note: "q̇ en W/m³", latex: String.raw`\dot E_g=\dot q\,V` },
    { name: "Bilan sur une surface", latex: String.raw`\dot E_\text{in}=\dot E_\text{out}\quad\text{ex. }\ -k\frac{dT}{dx}\Big|_s=h(T_s-T_\infty)+\varepsilon\sigma(T_s^4-T_\text{sur}^4)` },
  ],

  /* -------------------- QCM -------------------- */
  qcm: [
    {
      q: String.raw`Qu'apporte le transfert thermique par rapport à la thermodynamique classique ?`,
      choices: [
        String.raw`La conservation de l'énergie.`,
        String.raw`Le sens du transfert de chaleur.`,
        String.raw`La vitesse (le taux) du transfert et la répartition des températures.`,
        String.raw`La définition de la température.`,
      ],
      answer: 2,
      explanation: String.raw`La conservation est le 1<sup>er</sup> principe, le sens du transfert le 2<sup>e</sup>. Le transfert thermique
        répond à « à quelle vitesse ? » et « comment la température se répartit-elle ? ».`,
    },
    {
      q: String.raw`Selon la loi de Fourier, le flux conductif est proportionnel…`,
      choices: [
        String.raw`à la différence de température seule.`,
        String.raw`au gradient de température.`,
        String.raw`à la température absolue à la puissance 4.`,
        String.raw`à la vitesse du fluide.`,
      ],
      answer: 1,
      explanation: String.raw`$q''=-k\,dT/dx$ : c'est le gradient (différence de température <em>divisée</em> par la distance) qui compte.
        Une même différence de température sur une épaisseur deux fois plus grande donne un flux deux fois plus faible.`,
    },
    {
      q: String.raw`Pourquoi le transfert de chaleur à la paroi, en convection, est-il purement conductif ?`,
      choices: [
        String.raw`Parce que la paroi est isolée.`,
        String.raw`Parce que la vitesse du fluide y est nulle (condition de non-glissement).`,
        String.raw`Parce que le rayonnement y est dominant.`,
        String.raw`Parce que le coefficient $h$ y est infini.`,
      ],
      answer: 1,
      explanation: String.raw`À la paroi, le fluide adhère : pas de mouvement, donc pas d'advection. Le flux y vaut $-k_f\,\partial T/\partial y$,
        et c'est ce qui permettra de calculer $h$ à partir du profil de température.`,
    },
    {
      q: String.raw`Quel ordre de grandeur de $h$ correspond à la convection naturelle dans un gaz ?`,
      choices: [String.raw`2 à 25 W/m²·K`, String.raw`50 à 1 000 W/m²·K`, String.raw`50 à 20 000 W/m²·K`, String.raw`2 500 à 100 000 W/m²·K`],
      answer: 0,
      explanation: String.raw`Gaz en convection naturelle : 2-25 ; liquides en convection naturelle : 50-1 000 ; gaz en convection forcée : 25-250 ;
        liquides en convection forcée : 50-20 000 ; changement de phase : 2 500-100 000 W/m²·K.`,
    },
    {
      q: String.raw`Un corps noir passe de 300 K à 600 K. Sa puissance émise par unité de surface est multipliée par :`,
      choices: [String.raw`2`, String.raw`4`, String.raw`8`, String.raw`16`],
      answer: 3,
      explanation: String.raw`$E_b=\sigma T^4$ : doubler la température absolue multiplie l'émission par $2^4=16$. Attention à bien raisonner en
        kelvins : de 27 °C à 327 °C, c'est bien un doublement en K.`,
    },
    {
      q: String.raw`Quelle affirmation sur le rayonnement thermique est <strong>fausse</strong> ?`,
      choices: [
        String.raw`Il peut se propager dans le vide.`,
        String.raw`Toute surface au-dessus de 0 K rayonne.`,
        String.raw`L'émissivité d'une surface réelle peut dépasser 1.`,
        String.raw`Il devient prépondérant à haute température.`,
      ],
      answer: 2,
      explanation: String.raw`Le corps noir émet le maximum possible $\sigma T^4$ ; une surface réelle émet $\varepsilon\sigma T^4$ avec $0\le\varepsilon\le 1$.`,
    },
    {
      q: String.raw`Pour un volume de contrôle <em>sans</em> changement de phase, le terme de stockage $\dot E_\text{st}$ vaut :`,
      choices: [String.raw`$\dot q\,V$`, String.raw`$\rho Vc\,dT/dt$`, String.raw`$hA(T-T_\infty)$`, String.raw`$-kA\,dT/dx$`],
      answer: 1,
      explanation: String.raw`$\dot E_\text{st}=dU/dt=mc\,dT/dt=\rho Vc\,dT/dt$. $\dot qV$ est la génération ; $hA\Delta T$ et $-kA\,dT/dx$ sont
        des termes d'entrée ou de sortie (phénomènes de surface).`,
    },
    {
      q: String.raw`Dans un bilan d'énergie écrit sur une <strong>surface</strong>, quels termes disparaissent ?`,
      choices: [
        String.raw`Les termes d'entrée et de sortie.`,
        String.raw`La génération et le stockage.`,
        String.raw`Seulement le rayonnement.`,
        String.raw`Aucun terme.`,
      ],
      answer: 1,
      explanation: String.raw`Une surface n'a ni volume ni masse : $\dot E_g=\dot E_\text{st}=0$ et $\dot E_\text{in}=\dot E_\text{out}$, par exemple
        conduction arrivant $=$ convection $+$ rayonnement partant.`,
    },
    {
      q: String.raw`Pourquoi une conductivité en W/m·°C a-t-elle la même valeur numérique en W/m·K ?`,
      choices: [
        String.raw`Parce que 1 °C $=$ 273,15 K.`,
        String.raw`Parce qu'une différence de 1 °C est égale à une différence de 1 K.`,
        String.raw`Parce que $k$ ne dépend pas de la température.`,
        String.raw`Ce n'est vrai que pour les gaz.`,
      ],
      answer: 1,
      explanation: String.raw`Les deux échelles ne diffèrent que d'un décalage de 273,15 ; les écarts de température sont identiques. Ce n'est plus vrai
        dès que $T$ intervient en valeur absolue, comme dans $\sigma T^4$.`,
    },
    {
      q: String.raw`Quelle loi du transport de masse est l'analogue de la loi de Fourier ?`,
      choices: [String.raw`La loi de Newton pour la viscosité.`, String.raw`La loi de Fick.`, String.raw`La loi de Stefan-Boltzmann.`, String.raw`La loi de Wiedemann-Franz.`],
      answer: 1,
      explanation: String.raw`Fick : $j_A=-D_{AB}\,dm_A/dx$ (gradient de concentration), Fourier : $q''=-k\,dT/dx$, Newton : $\tau=\mu\,du/dy$
        (gradient de vitesse). Même mécanisme de diffusion.`,
    },
  ],

  /* -------------------- EXERCICES -------------------- */
  exos: [
    {
      id: "ex-modes",
      title: "Conduction et convection : calculs directs",
      difficulty: "facile",
      tags: ["Fourier", "Newton", "ordres de grandeur"],
      statement: String.raw`<p>(a) Un mur en brique de conductivité $k=0{,}72$ W/m·K, d'épaisseur $L=15$ cm et de surface $A=20$ m² a sa
        face intérieure à 25 °C et sa face extérieure à 5 °C. Calculer le flux $q''$ et le taux de transfert $q$.</p>
        <p>(b) Une plaque de 0,5 m² à $T_s=80$ °C est refroidie par de l'air à $T_\infty=20$ °C, avec $h=25$ W/m²·K. Quelle
        puissance perd-elle ? De quel type de convection s'agit-il probablement ?</p>
        <p>(c) On remplace l'air par de l'eau en écoulement forcé ($h=2\,000$ W/m²·K). Que devient la puissance ?</p>`,
      solution: String.raw`
        <p><strong>(a)</strong> $q''=k\,\dfrac{T_1-T_2}{L}=0{,}72\times\dfrac{25-5}{0{,}15}=96$ W/m², puis $q=q''A=96\times 20=1\,920$ W.
        Il suffit que la température varie linéairement dans le mur (régime permanent, $k$ constant), ce que l'on démontrera au chapitre 3.</p>
        <p><strong>(b)</strong> $q=hA(T_s-T_\infty)=25\times 0{,}5\times 60=750$ W. Une valeur de 25 W/m²·K est à la limite haute de la
        convection naturelle dans un gaz et à la limite basse de la convection forcée : probablement un léger écoulement d'air forcé.</p>
        <p><strong>(c)</strong> $q=2\,000\times 0{,}5\times 60=60\,000$ W, 80 fois plus. Les liquides évacuent beaucoup mieux la chaleur
        (conductivité et capacité thermique plus élevées) : c'est le principe du refroidissement liquide.</p>`,
    },
    {
      id: "ex-radiation",
      title: "Échange radiatif et coefficient radiatif",
      difficulty: "facile",
      tags: ["rayonnement", "Stefan-Boltzmann"],
      statement: String.raw`<p>Un petit objet de surface $A=0{,}2$ m² et d'émissivité $\varepsilon=0{,}8$ est à 500 K dans une grande pièce dont les parois
        sont à 300 K.</p>
        <p>(a) Calculer la puissance nette perdue par rayonnement. (b) Calculer le coefficient radiatif $h_r$ tel que
        $q=h_rA(T-T_\text{sur})$. (c) Un étudiant fait le calcul avec les températures en °C. Quelle erreur obtient-il ?</p>`,
      hints: [String.raw`$T^4-T_\text{sur}^4=(T-T_\text{sur})(T+T_\text{sur})(T^2+T_\text{sur}^2)$.`],
      solution: String.raw`
        <p><strong>(a)</strong> $q=\varepsilon\sigma A(T^4-T_\text{sur}^4)=0{,}8\times 5{,}67\times 10^{-8}\times 0{,}2\times(500^4-300^4)$.
        Avec $500^4=6{,}25\times 10^{10}$ et $300^4=8{,}1\times 10^{9}$ : $q\approx 493{,}5$ W.</p>
        <p><strong>(b)</strong> $h_r=\varepsilon\sigma(T+T_\text{sur})(T^2+T_\text{sur}^2)=0{,}8\times 5{,}67\times 10^{-8}\times 800\times 340\,000\approx 12{,}3$ W/m²·K.
        Vérification : $h_rA(T-T_\text{sur})=12{,}34\times 0{,}2\times 200\approx 493{,}5$ W. Ce coefficient est du même ordre qu'une
        convection naturelle : à ces températures, rayonnement et convection se valent.</p>
        <p><strong>(c)</strong> Avec 226,85 °C et 26,85 °C : $0{,}8\times 5{,}67\times 10^{-8}\times 0{,}2\times(226{,}85^4-26{,}85^4)\approx 24{,}0$ W,
        soit une puissance sous-estimée d'un facteur 20. En $T^4$, <strong>toujours travailler en kelvins</strong>.</p>`,
    },
    {
      id: "ex-energy-balance",
      title: "Bilan d'énergie instantané sur une plaque chaude",
      difficulty: "moyen",
      tags: ["bilan d'énergie", "convection", "rayonnement"],
      statement: String.raw`<p>Une plaque d'acier ($\rho=7\,800$ kg/m³, $c=450$ J/kg·K) de 0,5 m × 0,5 m et 1 cm d'épaisseur sort d'un four à
        500 K. Ses deux grandes faces échangent avec l'air à 300 K ($h=20$ W/m²·K) et, par rayonnement, avec un grand local à 300 K
        ($\varepsilon=0{,}7$). On néglige les bords.</p>
        <p>(a) Écrire le bilan d'énergie de la plaque. (b) Calculer les pertes par convection et par rayonnement à cet instant.
        (c) En déduire la vitesse de refroidissement initiale $dT/dt$. (d) Pourquoi ne peut-on pas en déduire directement le temps
        pour atteindre 300 K ?</p>`,
      hints: [String.raw`Pas de génération, pas d'entrée : $-\dot E_\text{out}=\dot E_\text{st}$. Surface d'échange : les deux faces, $A=2\times 0{,}25$ m².`],
      solution: String.raw`
        <p><strong>(a)</strong> $-\big[hA(T-T_\infty)+\varepsilon\sigma A(T^4-T_\text{sur}^4)\big]=\rho Vc\,\dfrac{dT}{dt}$, avec
        $A=0{,}5$ m² et $V=0{,}25\times 0{,}01=2{,}5\times 10^{-3}$ m³ (masse 19,5 kg).</p>
        <p><strong>(b)</strong> Convection : $20\times 0{,}5\times 200=2\,000$ W. Rayonnement :
        $0{,}7\times 5{,}67\times 10^{-8}\times 0{,}5\times(500^4-300^4)\approx 1\,080$ W. Total $\approx 3\,080$ W.</p>
        <p><strong>(c)</strong> $\dfrac{dT}{dt}=-\dfrac{3\,080}{7\,800\times 2{,}5\times 10^{-3}\times 450}=-\dfrac{3\,080}{8\,775}\approx-0{,}35$ K/s,
        soit environ 21 K par minute au début.</p>
        <p><strong>(d)</strong> Les pertes diminuent à mesure que la plaque refroidit (en $T-T_\infty$ et en $T^4-T_\text{sur}^4$) : la
        vitesse n'est pas constante. Il faut intégrer l'équation différentielle (non linéaire à cause du rayonnement), ce qui sera
        fait au chapitre 4 dans le cas convectif (méthode de la capacité globale).</p>`,
    },
    {
      id: "ex-phase-change",
      title: "Stockage d'énergie avec changement de phase",
      difficulty: "moyen",
      tags: ["bilan d'énergie", "chaleur latente"],
      statement: String.raw`<p>Un bloc de glace de 1 kg à 0 °C est placé dans un récipient qui lui fournit une puissance constante de 50 W
        (chaleur latente de fusion $h_{sf}=334$ kJ/kg, chaleur massique de l'eau liquide $c=4\,180$ J/kg·K).</p>
        <p>(a) Combien de temps faut-il pour fondre toute la glace ? (b) Combien de temps faut-il ensuite pour porter l'eau à 20 °C ?
        (c) Commenter : pourquoi le changement de phase est-il si efficace pour stocker ou évacuer de la chaleur ?</p>`,
      solution: String.raw`
        <p><strong>(a)</strong> Pendant la fusion, la température reste à 0 °C : $\dot E_\text{st}=h_{sf}\,dm/dt$. Énergie nécessaire :
        $mh_{sf}=334$ kJ, donc $t=334\,000/50=6\,680$ s $\approx 1$ h 51 min.</p>
        <p><strong>(b)</strong> $mc\Delta T=1\times 4\,180\times 20=83\,600$ J, soit $t=83\,600/50\approx 1\,672$ s $\approx 28$ min.</p>
        <p><strong>(c)</strong> Fondre 1 kg de glace demande autant d'énergie que chauffer 1 kg d'eau d'environ 80 K, sans variation de
        température. C'est pourquoi l'ébullition et la condensation donnent des coefficients $h$ de 2 500 à 100 000 W/m²·K : la chaleur
        latente absorbe une énergie énorme sous faible écart de température.</p>`,
    },
  ],

  /* -------------------- DÉFINITIONS -------------------- */
  definitions: [
    { term: "Transfert thermique", abbr: "HT", def: String.raw`<em>Heat transfer</em> : énergie en transit due à une différence de température. Étudie le taux (W) et la répartition spatiale du transport d'énergie thermique.` },
    { term: "Énergie thermique", def: String.raw`Énergie cinétique microscopique des atomes, molécules et électrons (translation, vibration, rotation). Unité : J.` },
    { term: "Température", def: String.raw`Mesure de l'intensité de l'énergie thermique ; elle détermine le sens du transfert (du chaud vers le froid). $T(\text{K})=T(°\text{C})+273{,}15$.` },
    { term: "Phonon", def: String.raw`Quantum d'énergie de vibration du réseau cristallin ; principal porteur de chaleur dans les solides non métalliques.` },
    { term: "Photon", def: String.raw`Quantum d'énergie électromagnétique ; porteur du transfert par rayonnement.` },
    { term: "Taux de transfert", abbr: "q", def: String.raw`Puissance thermique transférée, en W. Par unité de longueur $q'$ (W/m), par unité de surface $q''$ (flux, W/m²).` },
    { term: "Flux thermique", abbr: "q''", def: String.raw`Taux de transfert par unité de surface, en W/m².` },
    { term: "Conduction", def: String.raw`Transfert par mouvement aléatoire des particules (diffusion) dans un solide ou un fluide immobile, sans mouvement d'ensemble.` },
    { term: "Loi de Fourier", def: String.raw`Loi de taux de la conduction : $q''=-k\,dT/dx$. Le flux est proportionnel au gradient de température et orienté vers les températures décroissantes.` },
    { term: "Conductivité thermique", abbr: "k", def: String.raw`Propriété du matériau reliant flux et gradient de température, en W/m·K. Aluminium 202, eau 0,6, air 0,026.` },
    { term: "Convection", def: String.raw`Transfert en présence d'un mouvement d'ensemble du fluide : conduction (diffusion) $+$ advection (transport par l'écoulement).` },
    { term: "Advection", def: String.raw`Transport d'énergie par le mouvement macroscopique du fluide.` },
    { term: "Convection forcée / naturelle", def: String.raw`Forcée : écoulement imposé (pompe, ventilateur, vent). Naturelle (libre) : écoulement créé par la flottabilité due aux différences de masse volumique.` },
    { term: "Condition de non-glissement", def: String.raw`À une paroi solide, la vitesse du fluide est nulle ; le transfert à la paroi est donc purement conductif.` },
    { term: "Loi de refroidissement de Newton", def: String.raw`Loi de taux de la convection : $q''=h(T_s-T_\infty)$. Elle <em>définit</em> le coefficient $h$.` },
    { term: "Coefficient de transfert convectif", abbr: "h", def: String.raw`Coefficient de la loi de Newton, en W/m²·K. Dépend du fluide, de l'écoulement et de la géométrie ; ce n'est pas une propriété du matériau.` },
    { term: "Rayonnement thermique", def: String.raw`Transport d'énergie par ondes électromagnétiques émises par toute matière au-dessus de 0 K ; ne nécessite aucun milieu.` },
    { term: "Émittance", abbr: "E", def: String.raw`<em>Emissive power</em> : puissance rayonnée par unité de surface, en W/m².` },
    { term: "Corps noir", def: String.raw`Surface idéale qui émet (et absorbe) le maximum de rayonnement à une température donnée : $E_b=\sigma T^4$.` },
    { term: "Constante de Stefan-Boltzmann", abbr: "σ", def: String.raw`$\sigma=5{,}67\times 10^{-8}$ W/m²·K⁴.` },
    { term: "Émissivité", abbr: "ε", def: String.raw`Rapport entre l'émittance d'une surface réelle et celle du corps noir à la même température, $0\le\varepsilon\le 1$. Propriété optique de la surface.` },
    { term: "Coefficient radiatif", abbr: "h_r", def: String.raw`$h_r=\varepsilon\sigma(T+T_\text{sur})(T^2+T_\text{sur}^2)$ : permet d'écrire l'échange radiatif sous la forme $q=h_rA(T-T_\text{sur})$.` },
    { term: "Modélisation", def: String.raw`Traduction d'un problème physique en équations, à partir des équations de taux et des principes de conservation.` },
    { term: "Équations de taux", def: String.raw`Lois constitutives donnant le flux en fonction des températures : Fourier, Newton, Stefan-Boltzmann.` },
    { term: "Volume de contrôle", abbr: "CV", def: String.raw`Région de l'espace sur laquelle on écrit un bilan ; ses frontières forment la surface de contrôle.` },
    { term: "Bilan d'énergie", def: String.raw`$\dot E_\text{in}-\dot E_\text{out}+\dot E_g=\dot E_\text{st}$ : ce qui entre, moins ce qui sort, plus ce qui est généré, égale ce qui est stocké.` },
    { term: "Génération d'énergie", abbr: "Ė_g", def: String.raw`Conversion d'une autre forme d'énergie en chaleur dans le volume (effet Joule, réaction) : $\dot E_g=\dot qV$, $\dot q$ en W/m³.` },
    { term: "Énergie stockée", abbr: "Ė_st", def: String.raw`Variation de l'énergie interne : $\rho Vc\,dT/dt$ sans changement de phase.` },
    { term: "Chaleur latente", abbr: "h_l", def: String.raw`Énergie par unité de masse absorbée ou libérée lors d'un changement de phase, à température constante (fusion, vaporisation).` },
    { term: "Chaleur massique", abbr: "c, c_p", def: String.raw`Énergie nécessaire pour élever de 1 K la température de 1 kg de matière, en J/kg·K.` },
  ],
});
