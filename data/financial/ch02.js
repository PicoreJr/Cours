/* ============================================================
   Financial Engineering — Chapitre 2 : Taux d'intérêt
   Source : Chapter02_Interest Rates (notes de cours), qui suit
   Hull, Options, Futures and Other Derivatives (ch. « Interest
   Rates »). Contenu rédigé pour la révision — à relire et valider.
   Tous les exemples chiffrés du cours et des exercices ont été
   recalculés.
   NB : les champs contenant du LaTeX utilisent String.raw pour
   préserver les backslashes. Ne jamais écrire la séquence ${ }.
   Dans les champs HTML, écrire « &lt; » pour « < » suivi d'une lettre.
   ============================================================ */
addChapter("fin-eng", {
  id: "ch02",
  title: "Chapitre 2 — Taux d'intérêt",
  short: "Ch. 2",
  lang: "fr",

  /* -------------------- RÉSUMÉ DE COURS -------------------- */
  summary: String.raw`
    <h3>1. Types de taux</h3>
    <p>Un <strong>taux d'intérêt</strong> définit, dans une situation donnée, le montant que l'emprunteur promet
    de payer au prêteur. Pour une même devise, de nombreux taux sont cotés en permanence (taux hypothécaires,
    taux de dépôt, taux des certificats de dépôt…). Le taux applicable dépend du <strong>risque de
    crédit</strong> : plus le risque de défaut de l'emprunteur est élevé, plus le taux promis est élevé.</p>
    <ul>
      <li><strong>Taux du Trésor</strong> : taux gagné sur les bons du Trésor (<em>T-bills</em>) et les obligations
          d'État (<em>T-bonds</em>), instruments par lesquels un État emprunte dans sa propre devise (par exemple
          les taux du Trésor coréen). Ils sont considérés comme <em>totalement sans risque</em> : l'investisseur est
          certain que les intérêts et le principal seront payés comme promis.</li>
      <li><strong>LIBOR</strong> (<em>London Interbank Offered Rate</em>) : taux auquel une banque est prête à
          effectuer un dépôt de gros montant auprès d'autres banques. Le dépôt a typiquement une notation
          <strong>AA</strong> (la deuxième meilleure note de S&amp;P) : le LIBOR n'est pas totalement sans risque de
          crédit, mais il en est proche. Pour des raisons fiscales et réglementaires, les traders de dérivés
          utilisent en pratique le LIBOR, et non les taux du Trésor, comme taux sans risque.</li>
      <li><strong>Taux des CD</strong> (<em>certificates of deposit</em>) : taux auxquels les grandes banques émettent
          des certificats de dépôt sur le marché monétaire.</li>
      <li><strong>Taux de repo</strong> (pension livrée, <em>repurchase agreement</em>, RP) : un détenteur de titres
          les vend en s'engageant à les racheter plus tard à un prix légèrement supérieur. Le taux de repo est
          défini par l'écart entre le prix de vente et le prix de rachat. Le plus courant est le <em>repo
          overnight</em> (renégocié chaque jour) ; les arrangements plus longs sont des <em>term repos</em>.</li>
    </ul>
    <div class="callout"><strong>Remarque d'actualité.</strong>
      <p>Le LIBOR a été progressivement abandonné depuis 2021-2023 au profit de taux de référence fondés sur des
      transactions de repo ou overnight (SOFR aux États-Unis, KOFR en Corée, €STR en zone euro). Le raisonnement
      du cours (un taux de référence « presque sans risque » pour les dérivés) reste le même.</p></div>

    <h3>2. Mesurer un taux : la fréquence de capitalisation</h3>
    <p>Un taux annoncé n'a de sens qu'avec sa <strong>fréquence de capitalisation</strong> $m$ (nombre de fois par
    an où les intérêts sont ajoutés au capital). Un montant $A$ placé $n$ années au taux $R_m$ capitalisé $m$ fois
    par an devient $A(1+R_m/m)^{mn}$ ; en capitalisation continue au taux $R_c$, il devient $Ae^{R_cn}$.</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Fréquence de capitalisation</th><th>Valeur de 100 € au bout d'un an à 10 %</th></tr></thead>
      <tbody>
        <tr><td>Annuelle ($m=1$)</td><td>110,00</td></tr>
        <tr><td>Semestrielle ($m=2$)</td><td>110,25</td></tr>
        <tr><td>Trimestrielle ($m=4$)</td><td>110,38</td></tr>
        <tr><td>Mensuelle ($m=12$)</td><td>110,47</td></tr>
        <tr><td>Hebdomadaire ($m=52$)</td><td>110,51</td></tr>
        <tr><td>Quotidienne ($m=365$)</td><td>110,52</td></tr>
        <tr><td>Continue ($m\to\infty$)</td><td>$100\,e^{0{,}1}\approx 110{,}52$</td></tr>
      </tbody></table></div>
    <p>La valeur finale croît avec $m$ mais reste bornée par la limite continue. <strong>Formules de
    conversion</strong> entre un taux continu $R_c$ et le taux équivalent $R_m$ (même valeur finale) :</p>
    <p>$$R_c=m\ln\Big(1+\frac{R_m}{m}\Big)\qquad\Longleftrightarrow\qquad R_m=m\big(e^{R_c/m}-1\big).$$</p>
    <p>Exemple : 10 % à capitalisation semestrielle équivaut à $2\ln(1{,}05)\approx 9{,}758\,\%$ en continu. Les taux
    utilisés en valorisation d'options sont presque toujours exprimés en <strong>capitalisation continue</strong>.</p>

    <h3>3. Taux zéro-coupon</h3>
    <p>Le <strong>taux zéro-coupon</strong> de maturité $T$ (<em>zero rate</em>, <em>spot rate</em>, « zéro ») est
    le taux gagné sur un placement qui ne verse qu'un seul flux, à la date $T$ (ni coupon ni flux intermédiaire).
    L'ensemble des taux zéro en fonction de la maturité forme la <strong>courbe des taux zéro</strong>.</p>
    <p><strong>Exemple 2.3.1</strong> (utilisé dans toute la suite) : taux zéro du Trésor, en capitalisation continue.</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Maturité (années)</th><th>0,5</th><th>1,0</th><th>1,5</th><th>2,0</th></tr></thead>
      <tbody><tr><td>Taux zéro (%, continu)</td><td>5,0</td><td>5,8</td><td>6,4</td><td>6,8</td></tr></tbody></table></div>

    <h3>4. Prix d'une obligation, rendement, par yield</h3>
    <p><strong>Prix théorique</strong> : on actualise <em>chaque</em> flux au taux zéro de <em>sa propre</em> date
    (principal notionnel 100). Pour une obligation à 2 ans versant un coupon de 6 % par an en deux fois
    (3 tous les six mois) :</p>
    <p>$$3e^{-0{,}05\times 0{,}5}+3e^{-0{,}058\times 1{,}0}+3e^{-0{,}064\times 1{,}5}+103e^{-0{,}068\times 2{,}0}=98{,}39.$$</p>
    <p>Le <strong>rendement</strong> de l'obligation (<em>bond yield</em>) est le taux <em>unique</em> $y$ qui, appliqué
    à tous les flux, redonne le prix de marché. Si le prix de marché vaut 98,39 :</p>
    <p>$$3e^{-0{,}5y}+3e^{-1{,}0y}+3e^{-1{,}5y}+103e^{-2{,}0y}=98{,}39\quad\Longrightarrow\quad y\approx 6{,}76\,\%.$$</p>
    <p>Pas de formule fermée : on résout numériquement (essais successifs, Newton, solveur). Le rendement est une
    sorte de moyenne des taux zéro, pondérée par les flux ; ici il est proche du taux zéro à 2 ans (6,8 %), car le
    flux final domine.</p>
    <p>Le <strong>par yield</strong> d'une maturité est le <em>taux de coupon</em> $c$ (et non le montant du coupon)
    qui rend le prix de l'obligation égal à sa valeur faciale :</p>
    <p>$$\frac c2e^{-0{,}05\times 0{,}5}+\frac c2e^{-0{,}058\times 1{,}0}+\frac c2e^{-0{,}064\times 1{,}5}+\Big(100+\frac c2\Big)e^{-0{,}068\times 2{,}0}=100
    \quad\Longrightarrow\quad c\approx 6{,}87\,\%\ \text{(semestriel)}.$$</p>
    <div class="callout"><strong>Formule générale du par yield.</strong>
      <p>Avec $m$ coupons par an, $d$ la valeur actuelle de 1 € reçu à maturité et $A$ la valeur actuelle d'une
      annuité de 1 € versée à chaque date de coupon :</p>
      <p>$$\text{par yield}=\frac{(1-d)\,m}{A}.$$</p>
      <p>Dans l'exemple 2.3.1 : $m=2$, $d=e^{-0{,}136}=0{,}87284$, $A=e^{-0{,}025}+e^{-0{,}058}+e^{-0{,}096}+e^{-0{,}136}=3{,}70027$,
      d'où $(1-0{,}87284)\times 2/3{,}70027\approx 6{,}87\,\%$. (Le PDF renvoie à « Example 2.2 » : il s'agit de l'exemple 2.3.1.)</p></div>

    <h3>5. Déterminer les taux zéro : le bootstrap</h3>
    <p>La <strong>méthode du bootstrap</strong> reconstruit la courbe des taux zéro à partir des prix de T-bills et
    d'obligations à coupons, maturité par maturité : chaque nouvelle obligation n'introduit qu'<em>un seul</em> taux
    inconnu, celui de sa maturité, les flux intermédiaires étant actualisés avec les taux déjà trouvés.</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Principal</th><th>Maturité (ans)</th><th>Coupon annuel*</th><th>Prix</th><th>Taux zéro obtenu (continu)</th></tr></thead>
      <tbody>
        <tr><td>100</td><td>0,25</td><td>0</td><td>97,5</td><td>10,127 %</td></tr>
        <tr><td>100</td><td>0,50</td><td>0</td><td>94,9</td><td>10,469 %</td></tr>
        <tr><td>100</td><td>1,00</td><td>0</td><td>90,0</td><td>10,536 %</td></tr>
        <tr><td>100</td><td>1,50</td><td>8</td><td>96,0</td><td>10,681 %</td></tr>
        <tr><td>100</td><td>2,00</td><td>12</td><td>101,6</td><td>10,808 %</td></tr>
      </tbody></table></div>
    <p>* La moitié du coupon annuel est versée tous les six mois.</p>
    <ul>
      <li><strong>Zéro-coupons</strong> : sur 3 mois, on gagne 2,5 sur 97,5. Comme $100=97{,}5\,e^{0{,}25R}$,
          $R=4\ln(100/97{,}5)=10{,}127\,\%$. De même $2\ln(100/94{,}9)=10{,}469\,\%$ et $\ln(100/90)=10{,}536\,\%$.</li>
      <li><strong>1,5 an</strong> (coupons de 4) : $4e^{-0{,}10469\times 0{,}5}+4e^{-0{,}10536\times 1{,}0}+104e^{-1{,}5R}=96$, d'où
          $R=10{,}681\,\%$.</li>
      <li><strong>2 ans</strong> (coupons de 6) : $6e^{-0{,}10469\times 0{,}5}+6e^{-0{,}10536}+6e^{-0{,}10681\times 1{,}5}+106e^{-2R}=101{,}6$,
          d'où $R=10{,}808\,\%$.</li>
    </ul>
    <p>La <strong>courbe des taux zéro</strong> obtenue relie ces points par interpolation linéaire (et reste
    horizontale avant 0,25 an et après 2 ans) : elle est ici croissante, de 10,1 % à 10,8 %.</p>

    <h3>6. Taux forward</h3>
    <p>Les <strong>taux forward</strong> sont les taux, <em>impliqués par les taux zéro actuels</em>, qui s'appliquent
    à des périodes futures. Si $R_1$ et $R_2$ sont les taux zéro (continus) de maturités $T_1\lt T_2$, le taux
    forward pour la période $[T_1,T_2]$ est</p>
    <p>$$f_{12}=\frac{R_2T_2-R_1T_1}{T_2-T_1}=R_2+(R_2-R_1)\frac{T_1}{T_2-T_1}.$$</p>
    <p>Idée : placer jusqu'à $T_2$ au taux $R_2$ doit rapporter autant que placer jusqu'à $T_1$ au taux $R_1$ puis
    réinvestir au taux $f_{12}$ : $e^{R_2T_2}=e^{R_1T_1}e^{f_{12}(T_2-T_1)}$. La formule n'est qu'<em>approximativement</em>
    vraie si les taux ne sont pas en capitalisation continue.</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Année $n$</th><th>Taux zéro à $n$ ans (%)</th><th>Taux forward pour la $n$-ième année (%)</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>3,0</td><td></td></tr>
        <tr><td>2</td><td>4,0</td><td>$4{,}0\times 2-3{,}0\times 1=5{,}0$</td></tr>
        <tr><td>3</td><td>4,6</td><td>$4{,}6\times 3-4{,}0\times 2=5{,}8$</td></tr>
        <tr><td>4</td><td>5,0</td><td>$5{,}0\times 4-4{,}6\times 3=6{,}2$</td></tr>
        <tr><td>5</td><td>5,3</td><td>$5{,}3\times 5-5{,}0\times 4=6{,}5$</td></tr>
      </tbody></table></div>
    <div class="callout warn"><strong>Coquille dans la figure 2.5 du PDF.</strong>
      <p>Le PDF indique un taux zéro de 5,5 % à 5 ans avec un forward de 6,5 %. C'est incohérent :
      $5{,}5\times 5-5{,}0\times 4=7{,}5$. La table d'origine (Hull) donne 5,3 % à 5 ans, ce qui redonne bien 6,5 %.</p></div>
    <p>Le <strong>taux forward instantané</strong> de maturité $T$ s'applique à une très courte période commençant
    en $T$ : c'est la limite $T_2\to T_1$ de la formule, soit, avec $R$ le taux zéro à $T$ ans,</p>
    <p>$$F(T)=R+T\frac{\partial R}{\partial T}.$$</p>
    <div class="callout"><strong>Ordre des taux selon la pente de la courbe.</strong>
      <p>Pour une courbe <strong>croissante</strong> : taux forward $\gt$ taux zéro $\gt$ par yield. Pour une courbe
      <strong>décroissante</strong>, c'est l'inverse. Intuition : $f_{12}=R_2+(R_2-R_1)T_1/(T_2-T_1)$ dépasse $R_2$ dès
      que $R_2>R_1$ ; le forward est le taux « marginal » qui tire la moyenne vers le haut. Le par yield, lui, actualise
      aussi les coupons intermédiaires, à des taux plus faibles : c'est une moyenne des taux zéro jusqu'à $T$, donc
      inférieure à $R_T$. (Preuve sur un exemple : voir l'exercice dédié.)</p></div>

    <h3>7. Forward Rate Agreement (FRA)</h3>
    <p>Un <strong>FRA</strong> est un accord de gré à gré (OTC) fixant le taux qui s'appliquera à un principal donné
    sur une période future donnée. Il revient à échanger des intérêts au taux prédéterminé $R_K$ contre des intérêts
    au taux de marché.</p>
    <ul>
      <li>On valorise un FRA en supposant que le <strong>taux forward</strong> $R_F$ (taux CD forward) sera
          certainement réalisé : la valeur est la valeur actuelle de la différence entre les intérêts aux taux $R_F$
          et $R_K$.</li>
      <li>Pour une période $[T_1,T_2]$, $R_F$ et $R_K$ sont exprimés avec une capitalisation correspondant à la durée
          $T_2-T_1$ (taux semestriel pour une période de 6 mois, etc.). Les intérêts versés en $T_2$ sont $R_K(T_2-T_1)$
          ou $R_F(T_2-T_1)$ par unité de principal.</li>
    </ul>
    <p>$$V_{\text{reçoit }R_K}=L(R_K-R_F)(T_2-T_1)\,e^{-R_2T_2},\qquad V_{\text{reçoit }R_F}=L(R_F-R_K)(T_2-T_1)\,e^{-R_2T_2},$$</p>
    <p>où $L$ est le principal et $R_2$ le taux zéro (continu) de maturité $T_2$.</p>
    <p><strong>Exemple 2.7.1.</strong> Un FRA garantit à une entreprise de recevoir 4 % (semestriel) sur 100 millions d'€
    pendant six mois, dans un an. Le taux CD forward pour la période est 5 % (semestriel) et le taux zéro à 1,5 an est
    4,5 % (continu). Valeur du FRA, en millions :</p>
    <p>$$100\times(0{,}04-0{,}05)\times 0{,}5\times e^{-0{,}045\times 1{,}5}=-0{,}467.$$</p>
    <p>Si le taux à six mois constaté dans un an est finalement 5,5 % (semestriel), l'entreprise supporte en 1,5 an un
    flux de $100\times(0{,}04-0{,}055)\times 0{,}5=-0{,}75$ million. Le règlement peut aussi se faire dès la date d'un
    an, pour un montant équivalent actualisé au taux constaté : $-0{,}75/1{,}0275=-0{,}730$ million.</p>

    <h3>8. Duration</h3>
    <p>La <strong>duration (de Macaulay)</strong> d'une obligation versant les flux $c_i$ aux dates
    $t_1\lt t_2\lt\cdots\lt t_n$, de prix $B=\sum_i c_ie^{-yt_i}$ et de rendement continu $y$, est</p>
    <p>$$D=\sum_{i=1}^n t_i\,\frac{c_ie^{-yt_i}}{B}.$$</p>
    <p>C'est la <em>moyenne des dates de flux</em>, pondérée par la part de chaque flux dans le prix : une maturité
    « moyenne ». Pour un zéro-coupon, $D=T$ ; avec des coupons, $D\lt T$. Son intérêt vient de la relation clé
    (qui découle de $dB/dy=-\sum_it_ic_ie^{-yt_i}=-BD$) :</p>
    <p>$$\frac{\Delta B}{B}\approx-D\,\Delta y.$$</p>
    <ul>
      <li><strong>Duration modifiée</strong> : si $y$ est exprimé avec capitalisation $m$ fois par an, $D^*=\dfrac{D}{1+y/m}$
          et $\dfrac{\Delta B}{B}\approx-\dfrac{D\,\Delta y}{1+y/m}=-D^*\Delta y$. (Le PDF écrit « $-D^*y$ » : il manque le $\Delta$.)</li>
      <li><strong>Duration en valeur</strong> (<em>dollar duration</em>) : $D^{**}=D^*\times B$, de sorte que
          $\Delta B\approx-D^{**}\Delta y$.</li>
      <li><strong>Portefeuille</strong> : sa duration est la moyenne des durations des obligations, pondérée par leurs
          prix (valeurs de marché). La relation décrit l'effet de petits <em>déplacements parallèles</em> de la courbe des taux.</li>
      <li><strong>Immunisation</strong> : en choisissant des actifs de même duration que les passifs (duration nette
          nulle), une institution financière élimine son exposition aux petits déplacements parallèles. Elle reste
          exposée aux déplacements <em>importants</em> ou <em>non parallèles</em>.</li>
    </ul>

    <h3>9. Convexité</h3>
    <p>Deux portefeuilles de même duration réagissent presque pareil à une petite variation de rendement, mais
    différemment à une grande : la relation entre $\Delta B/B$ et $\Delta y$ est une <em>courbe</em> (convexe),
    dont la duration ne donne que la tangente à l'origine. La <strong>convexité</strong> mesure cette courbure :</p>
    <p>$$C=\frac1B\frac{\partial^2B}{\partial y^2}=\frac{\sum_{i=1}^n c_it_i^2e^{-yt_i}}{B},\qquad
    \frac{\Delta B}{B}\approx-D\,\Delta y+\frac12C\,(\Delta y)^2.$$</p>
    <ul>
      <li>Le terme en $(\Delta y)^2$ est toujours positif : à duration égale, l'obligation plus convexe gagne plus quand
          les taux baissent et perd moins quand ils montent.</li>
      <li>La convexité d'un portefeuille est <strong>maximale</strong> quand les paiements sont étalés régulièrement sur
          une longue période, <strong>minimale</strong> quand ils sont concentrés autour d'une date (un zéro-coupon
          a $C=T^2$).</li>
      <li>Utilisée pour des portefeuilles, elle permet de considérer des déplacements plus importants de la courbe,
          mais ceux-ci doivent toujours être <em>parallèles</em>.</li>
    </ul>
  `,

  /* -------------------- FICHE PARTIEL -------------------- */
  keyPoints: [
    {
      text: String.raw`<strong>Types de taux et risque de crédit.</strong> Plus le risque de crédit est élevé, plus le taux
        promis est élevé. Trésor $=$ sans risque (l'État emprunte dans sa devise) ; LIBOR $=$ dépôt interbancaire noté AA,
        presque sans risque, utilisé comme taux sans risque par les traders de dérivés ; CD ; repo $=$ écart entre prix de
        vente et prix de rachat (overnight ou term).`,
      exos: ["ex-repo"],
    },
    {
      text: String.raw`<strong>Capitalisation.</strong> $A(1+R_m/m)^{mn}$ contre $Ae^{R_cn}$. Conversion
        $R_c=m\ln(1+R_m/m)$ et $R_m=m(e^{R_c/m}-1)$. Pour un même taux affiché, la valeur finale croît avec $m$ ; à valeur
        finale égale, $R_c\lt R_m$. Les dérivés utilisent le continu.`,
      exos: ["ex-compounding"],
    },
    {
      text: String.raw`<strong>Prix, rendement, par yield.</strong> Prix $=$ chaque flux actualisé à <em>son</em> taux zéro.
        Rendement $y$ $=$ taux unique qui redonne le prix (résolution numérique). Par yield $=$ taux de coupon qui donne un
        prix égal au pair : $(1-d)m/A$.`,
      exos: ["ex-bond-yield"],
    },
    {
      text: String.raw`<strong>Bootstrap.</strong> Zéro-coupons : $R=\frac1T\ln(100/P)$. Puis, maturité par maturité,
        actualiser les coupons avec les taux déjà connus et isoler le seul taux inconnu (celui du dernier flux).`,
      exos: ["ex-bootstrap"],
    },
    {
      text: String.raw`<strong>Taux forward.</strong> $f_{12}=\dfrac{R_2T_2-R_1T_1}{T_2-T_1}$ (exact en continu). Forward
        instantané : $R+T\,\partial R/\partial T$. Courbe croissante : forward $\gt$ zéro $\gt$ par yield ; décroissante :
        l'inverse. Attention à la coquille de la figure 2.5 (5,3 % et non 5,5 % à 5 ans).`,
      exos: ["ex-forward", "ex-curve-order"],
    },
    {
      text: String.raw`<strong>FRA.</strong> On suppose le taux forward $R_F$ réalisé. Qui reçoit $R_K$ : valeur
        $L(R_K-R_F)(T_2-T_1)e^{-R_2T_2}$. $R_F$ et $R_K$ sont exprimés avec la capitalisation de la période. Si le règlement
        se fait en $T_1$, on actualise le flux au taux constaté : diviser par $1+R_{\text{constaté}}(T_2-T_1)$.`,
      exos: ["ex-fra"],
    },
    {
      text: String.raw`<strong>Duration.</strong> $D=\sum t_i\,c_ie^{-yt_i}/B$ (moyenne pondérée des dates) ;
        $\Delta B/B\approx-D\Delta y$. Modifiée $D^*=D/(1+y/m)$, en valeur $D^{**}=D^*B$. Portefeuille : moyenne pondérée par
        les prix. Zéro-coupon : $D=T$.`,
      exos: ["ex-duration"],
    },
    {
      text: String.raw`<strong>Convexité et immunisation.</strong> $C=\sum c_it_i^2e^{-yt_i}/B$ ;
        $\Delta B/B\approx-D\Delta y+\frac12C(\Delta y)^2$. Duration nette nulle $\Rightarrow$ protégé contre les petits
        déplacements parallèles, pas contre les grands ou non parallèles. Flux étalés $\Rightarrow$ forte convexité.`,
      exos: ["ex-convexity", "ex-immunization"],
    },
  ],

  /* -------------------- FORMULAIRE -------------------- */
  formulas: [
    { name: "Capitalisation m fois par an", note: "montant A placé n années", latex: String.raw`A\Big(1+\frac{R_m}{m}\Big)^{mn}` },
    { name: "Capitalisation continue", latex: String.raw`A\,e^{R_cn}` },
    { name: "Taux continu équivalent", latex: String.raw`R_c=m\ln\Big(1+\frac{R_m}{m}\Big)` },
    { name: "Taux discret équivalent", latex: String.raw`R_m=m\big(e^{R_c/m}-1\big)` },
    { name: "Taux zéro d'un zéro-coupon", note: "prix P, principal 100, maturité T, taux continu", latex: String.raw`100=P\,e^{RT}\quad\Longleftrightarrow\quad R=\frac1T\ln\frac{100}{P}` },
    { name: "Prix théorique d'une obligation", note: "chaque flux c_i actualisé au taux zéro R_i de sa date t_i", latex: String.raw`B=\sum_{i=1}^n c_i\,e^{-R_it_i}` },
    { name: "Rendement d'une obligation (bond yield)", note: "y unique, à résoudre numériquement", latex: String.raw`\sum_{i=1}^n c_i\,e^{-yt_i}=B_{\text{marché}}` },
    { name: "Par yield", note: "m coupons par an, d = VA de 1 à maturité, A = VA d'une annuité de 1 à chaque date de coupon", latex: String.raw`c=\frac{(1-d)\,m}{A}` },
    { name: "Taux forward", note: "taux zéro continus R_1, R_2 de maturités T_1 < T_2", latex: String.raw`f_{12}=\frac{R_2T_2-R_1T_1}{T_2-T_1}=R_2+(R_2-R_1)\frac{T_1}{T_2-T_1}` },
    { name: "Taux forward instantané", note: "R = taux zéro de maturité T", latex: String.raw`F(T)=R+T\,\frac{\partial R}{\partial T}` },
    { name: "Valeur d'un FRA (reçoit R_K)", note: "principal L, R_F = taux forward, R_2 = taux zéro continu à T_2", latex: String.raw`V=L\,(R_K-R_F)\,(T_2-T_1)\,e^{-R_2T_2}` },
    { name: "Valeur d'un FRA (reçoit R_F)", latex: String.raw`V=L\,(R_F-R_K)\,(T_2-T_1)\,e^{-R_2T_2}` },
    { name: "Duration de Macaulay", note: "y continu, B = somme des flux actualisés", latex: String.raw`D=\sum_{i=1}^n t_i\,\frac{c_i\,e^{-yt_i}}{B}` },
    { name: "Relation duration-prix", latex: String.raw`\frac{\Delta B}{B}\approx-D\,\Delta y` },
    { name: "Duration modifiée", note: "y capitalisé m fois par an", latex: String.raw`D^*=\frac{D}{1+y/m},\qquad \frac{\Delta B}{B}\approx-D^*\,\Delta y` },
    { name: "Duration en valeur (dollar duration)", latex: String.raw`D^{**}=D^*\,B,\qquad \Delta B\approx-D^{**}\,\Delta y` },
    { name: "Duration d'un portefeuille", note: "B_j = valeur de marché de l'obligation j", latex: String.raw`D_P=\sum_j\frac{B_j}{\sum_k B_k}\,D_j` },
    { name: "Convexité", latex: String.raw`C=\frac1B\frac{\partial^2B}{\partial y^2}=\frac{\sum_{i=1}^n c_i\,t_i^2\,e^{-yt_i}}{B}` },
    { name: "Approximation duration + convexité", latex: String.raw`\frac{\Delta B}{B}\approx-D\,\Delta y+\frac12\,C\,(\Delta y)^2` },
  ],

  /* -------------------- QCM -------------------- */
  qcm: [
    {
      q: String.raw`Pourquoi le taux promis par un emprunteur est-il plus élevé qu'un autre, à devise et maturité égales ?`,
      choices: [
        String.raw`Parce que sa fréquence de capitalisation est plus faible.`,
        String.raw`Parce que son risque de crédit est plus élevé.`,
        String.raw`Parce qu'il emprunte dans sa propre devise.`,
        String.raw`Parce que le taux est exprimé en capitalisation continue.`,
      ],
      answer: 1,
      explanation: String.raw`Le taux applicable dépend du risque de crédit : plus le risque de défaut est élevé, plus le
        prêteur exige un taux promis élevé. Emprunter dans sa propre devise est au contraire la situation de l'État, dont le
        taux est sans risque.`,
    },
    {
      q: String.raw`Selon le cours, quel taux les traders de dérivés utilisent-ils habituellement comme taux sans risque ?`,
      choices: [String.raw`Le LIBOR.`, String.raw`Le taux des T-bills.`, String.raw`Le taux hypothécaire.`, String.raw`Le taux de dépôt.`],
      answer: 0,
      explanation: String.raw`Les taux du Trésor sont vraiment sans risque, mais pour des raisons fiscales et réglementaires
        les traders de dérivés utilisent le LIBOR, taux interbancaire noté AA, proche du sans risque (aujourd'hui remplacé
        par des taux comme SOFR).`,
    },
    {
      q: String.raw`Un taux de repo est défini par…`,
      choices: [
        String.raw`le coupon de l'obligation d'État mise en pension.`,
        String.raw`l'écart entre le prix de vente des titres et leur prix de rachat.`,
        String.raw`le taux auquel une banque dépose des fonds chez une autre banque.`,
        String.raw`le taux zéro-coupon à un jour.`,
      ],
      answer: 1,
      explanation: String.raw`Dans une pension livrée, on vend des titres en s'engageant à les racheter à un prix légèrement
        supérieur ; cette différence de prix constitue l'intérêt. La troisième réponse décrit le LIBOR.`,
    },
    {
      q: String.raw`Un taux de 10 % à capitalisation semestrielle équivaut, en capitalisation continue, à environ :`,
      choices: [String.raw`$10{,}25\,\%$`, String.raw`$10{,}00\,\%$`, String.raw`$9{,}76\,\%$`, String.raw`$5{,}00\,\%$`],
      answer: 2,
      explanation: String.raw`$R_c=m\ln(1+R_m/m)=2\ln(1{,}05)\approx 9{,}758\,\%$. Le taux continu est plus petit car la
        capitalisation continue « travaille » plus : il faut un taux affiché plus faible pour la même valeur finale.
        $10{,}25\,\%$ est le taux <em>annuel</em> équivalent.`,
    },
    {
      q: String.raw`Un <strong>taux zéro-coupon</strong> de maturité $T$ est le taux gagné sur un placement qui…`,
      choices: [
        String.raw`verse des coupons réguliers jusqu'à $T$.`,
        String.raw`démarre à une date future et se termine en $T$.`,
        String.raw`a un prix égal à sa valeur faciale.`,
        String.raw`ne verse qu'un seul flux, à la date $T$.`,
      ],
      answer: 3,
      explanation: String.raw`Le taux zéro (spot rate) correspond à un paiement unique en $T$. Un placement démarrant dans le
        futur relève du taux forward ; un prix égal au pair définit le par yield.`,
    },
    {
      q: String.raw`Le <strong>rendement</strong> (bond yield) d'une obligation est…`,
      choices: [
        String.raw`son taux de coupon.`,
        String.raw`le taux zéro de sa maturité.`,
        String.raw`le taux unique qui, appliqué à tous ses flux, redonne son prix de marché.`,
        String.raw`le taux de coupon qui rend son prix égal à sa valeur faciale.`,
      ],
      answer: 2,
      explanation: String.raw`Le rendement est un taux d'actualisation unique (un « taux actuariel »). La dernière réponse est la
        définition du par yield ; le prix théorique, lui, utilise un taux zéro différent pour chaque flux.`,
    },
    {
      q: String.raw`Avec $m=2$ coupons par an, $d=0{,}9$ et $A=3{,}8$, le par yield vaut environ :`,
      choices: [String.raw`$2{,}6\,\%$`, String.raw`$10{,}0\,\%$`, String.raw`$4{,}7\,\%$`, String.raw`$5{,}3\,\%$`],
      answer: 3,
      explanation: String.raw`$(1-d)m/A=(0{,}1\times 2)/3{,}8\approx 5{,}26\,\%$. Oublier le facteur $m$ donne $2{,}6\,\%$
        (le taux par semestre).`,
    },
    {
      q: String.raw`Dans la méthode du bootstrap, pour trouver le taux zéro à 1,5 an à partir d'une obligation à coupons
        semestriels, on…`,
      choices: [
        String.raw`actualise tous les flux au même taux inconnu $R$.`,
        String.raw`actualise les coupons à 0,5 et 1 an avec les taux zéro déjà obtenus, et isole le taux du dernier flux.`,
        String.raw`fait la moyenne des taux à 0,5 et 1 an.`,
        String.raw`utilise le rendement de l'obligation comme taux zéro.`,
      ],
      answer: 1,
      explanation: String.raw`C'est tout le principe : chaque obligation n'apporte qu'une seule inconnue. Actualiser tous les flux
        au même taux reviendrait à calculer le <em>rendement</em> de l'obligation, qui n'est pas le taux zéro.`,
    },
    {
      q: String.raw`Taux zéro continus : 4 % à 1 an et 5 % à 2 ans. Le taux forward pour la deuxième année vaut :`,
      choices: [String.raw`$4{,}5\,\%$`, String.raw`$5{,}0\,\%$`, String.raw`$6{,}0\,\%$`, String.raw`$9{,}0\,\%$`],
      answer: 2,
      explanation: String.raw`$f_{12}=(R_2T_2-R_1T_1)/(T_2-T_1)=(5\times 2-4\times 1)/1=6\,\%$. Il dépasse le taux zéro à 2 ans
        car la courbe est croissante : $f_{12}=R_2+(R_2-R_1)T_1/(T_2-T_1)=5+1=6$.`,
    },
    {
      q: String.raw`Pour une courbe des taux <strong>croissante</strong>, quel ordre est correct (même maturité) ?`,
      choices: [
        String.raw`par yield $\gt$ taux zéro $\gt$ taux forward`,
        String.raw`taux zéro $\gt$ taux forward $\gt$ par yield`,
        String.raw`taux forward $\gt$ taux zéro $\gt$ par yield`,
        String.raw`les trois sont égaux`,
      ],
      answer: 2,
      explanation: String.raw`Le forward est le taux marginal, au-dessus de la moyenne ; le taux zéro est une moyenne des forwards ;
        le par yield est lui-même une moyenne des taux zéro des dates de coupon, plus courtes. Pour une courbe décroissante,
        l'ordre s'inverse ; pour une courbe plate, les trois sont égaux.`,
    },
    {
      q: String.raw`On valorise un FRA en supposant que…`,
      choices: [
        String.raw`le taux fixé $R_K$ sera égal au taux de marché.`,
        String.raw`le taux forward $R_F$ sera certainement réalisé.`,
        String.raw`le taux zéro restera constant.`,
        String.raw`le principal est échangé à la date $T_1$.`,
      ],
      answer: 1,
      explanation: String.raw`La valeur est la valeur actuelle de la différence entre les intérêts au taux forward $R_F$ et au taux
        fixé $R_K$, soit $L(R_K-R_F)(T_2-T_1)e^{-R_2T_2}$ pour qui reçoit $R_K$. Le principal n'est jamais échangé.`,
    },
    {
      q: String.raw`Une entreprise reçoit $R_K=4\,\%$ dans un FRA alors que le taux forward de la période est $R_F=5\,\%$. Le FRA a pour elle une valeur…`,
      choices: [String.raw`nulle.`, String.raw`positive.`, String.raw`impossible à déterminer sans le taux constaté.`, String.raw`négative.`],
      answer: 3,
      explanation: String.raw`Elle reçoit 4 % quand le marché anticipe 5 % : $L(R_K-R_F)(T_2-T_1)e^{-R_2T_2}\lt 0$. Dans l'exemple
        du cours, $-0{,}467$ million pour 100 millions sur six mois. Le taux finalement constaté change le règlement, pas la
        valeur d'aujourd'hui.`,
    },
    {
      q: String.raw`La duration d'une obligation zéro-coupon de maturité 5 ans vaut :`,
      choices: [String.raw`moins de 5 ans.`, String.raw`plus de 5 ans.`, String.raw`cela dépend du rendement.`, String.raw`exactement 5 ans.`],
      answer: 3,
      explanation: String.raw`Il n'y a qu'un flux, en $t=5$, qui représente 100 % du prix : $D=5\times 1=5$. Avec des coupons,
        une partie du poids est placée sur des dates antérieures, donc $D\lt T$.`,
    },
    {
      q: String.raw`Une obligation vaut 100, a une duration de 4 ans (rendement continu). Si le rendement monte de 0,5 point, la duration prédit un prix d'environ :`,
      choices: [String.raw`$98$`, String.raw`$96$`, String.raw`$102$`, String.raw`$99{,}5$`],
      answer: 0,
      explanation: String.raw`$\Delta B\approx-BD\Delta y=-100\times 4\times 0{,}005=-2$, d'où un prix d'environ 98. Le prix baisse
        quand le rendement monte. La convexité rendrait la baisse légèrement plus faible.`,
    },
    {
      q: String.raw`Une institution a une duration nette nulle (actifs et passifs de même duration). Elle reste exposée…`,
      choices: [
        String.raw`à tous les déplacements de la courbe des taux.`,
        String.raw`uniquement aux petits déplacements parallèles.`,
        String.raw`aux déplacements importants ou non parallèles.`,
        String.raw`à aucun risque de taux.`,
      ],
      answer: 2,
      explanation: String.raw`L'égalité des durations neutralise l'effet du premier ordre, donc les <em>petits</em> déplacements
        <em>parallèles</em>. Les grands déplacements (effet de convexité) et les déformations de la courbe (pente, courbure)
        ne sont pas couverts.`,
    },
    {
      q: String.raw`La convexité d'un portefeuille obligataire est la plus élevée quand les paiements sont…`,
      choices: [
        String.raw`concentrés autour d'une seule date.`,
        String.raw`étalés régulièrement sur une longue période.`,
        String.raw`tous versés à très court terme.`,
        String.raw`indexés sur l'inflation.`,
      ],
      answer: 1,
      explanation: String.raw`$C=\sum c_it_i^2e^{-yt_i}/B$ est une moyenne des $t_i^2$ : à moyenne des dates (duration) fixée, elle
        est d'autant plus grande que les dates sont dispersées. Des paiements concentrés autour d'une date donnent la plus
        faible convexité.`,
    },
  ],

  /* -------------------- EXERCICES -------------------- */
  exos: [
    {
      id: "ex-repo",
      title: "Types de taux et taux de repo",
      difficulty: "facile",
      tags: ["types de taux", "repo", "LIBOR"],
      statement: String.raw`<p>(a) Classer du plus faible au plus élevé les taux suivants, pour une même devise et une même maturité,
        en justifiant : taux d'un prêt à une PME non notée, taux des T-bills, LIBOR.</p>
        <p>(b) Un établissement vend des titres d'État pour 10 000 000 € et s'engage à les racheter le lendemain pour
        10 001 200 €. Quel est le taux de repo overnight, exprimé en taux annuel (base 365 jours) ? Qui prête, qui emprunte ?</p>
        <p>(c) Quelle est la différence entre un repo overnight et un term repo ?</p>
        <p>(d) Les T-bills sont « totalement sans risque ». Pourquoi les traders de dérivés utilisaient-ils plutôt le LIBOR ?</p>`,
      solution: String.raw`
        <p><strong>(a)</strong> T-bills $\lt$ LIBOR $\lt$ prêt à la PME. Le taux dépend du risque de crédit : l'État
        emprunte dans sa propre devise et paiera certainement (sans risque) ; le LIBOR correspond à un dépôt interbancaire
        noté AA, presque sans risque ; une PME non notée présente un risque de défaut bien plus élevé.</p>
        <p><strong>(b)</strong> L'intérêt est l'écart des prix : 1 200 € pour un jour sur 10 000 000 €, soit
        $1\,200/10\,000\,000=0{,}012\,\%$ par jour. En taux annuel (base 365) : $0{,}00012\times 365\approx 4{,}38\,\%$.
        Celui qui vend puis rachète <em>emprunte</em> 10 millions en donnant ses titres en garantie ; la contrepartie
        <em>prête</em> et détient les titres pendant la nuit. C'est un prêt garanti, d'où un taux faible.</p>
        <p><strong>(c)</strong> Le repo overnight porte sur une nuit et est renégocié chaque jour (le plus courant) ; le
        term repo fixe les conditions sur une durée plus longue.</p>
        <p><strong>(d)</strong> Pour des raisons fiscales et réglementaires (traitement des T-bills, contraintes de
        détention). Le LIBOR, taux auquel les banques se prêtent entre elles, reflétait mieux leur coût de financement tout
        en restant proche du sans risque. Depuis l'abandon du LIBOR, ce rôle est tenu par des taux overnight comme SOFR.</p>`,
    },
    {
      id: "ex-compounding",
      title: "Conversions entre fréquences de capitalisation",
      difficulty: "facile",
      tags: ["capitalisation", "conversion"],
      statement: String.raw`<p>(a) Un taux est de 10 % par an à capitalisation semestrielle. Quel est le taux équivalent en
        capitalisation continue ? En capitalisation annuelle ?</p>
        <p>(b) Un taux est de 8 % en capitalisation continue. Quel est le taux équivalent à capitalisation trimestrielle ?</p>
        <p>(c) On place 1 000 € pendant 3 ans à 6 % en capitalisation continue. Que devient ce placement ? Quel taux mensuel
        (capitalisé 12 fois par an) donnerait la même valeur finale ?</p>
        <p>(d) Vérifier la dernière ligne du tableau de la figure 2.1 et expliquer pourquoi les valeurs se stabilisent.</p>`,
      hints: [String.raw`Deux taux sont équivalents s'ils donnent la même valeur finale : $e^{R_c}=(1+R_m/m)^m$.`],
      solution: String.raw`
        <p><strong>(a)</strong> $R_c=2\ln(1+0{,}10/2)=2\ln 1{,}05\approx 9{,}758\,\%$. Taux annuel : $(1{,}05)^2-1=10{,}25\,\%$.</p>
        <p><strong>(b)</strong> $R_4=4\big(e^{0{,}08/4}-1\big)=4(e^{0{,}02}-1)\approx 8{,}081\,\%$.</p>
        <p><strong>(c)</strong> $1\,000\,e^{0{,}06\times 3}=1\,000\,e^{0{,}18}\approx 1\,197{,}22$ €. Taux mensuel équivalent :
        $R_{12}=12\big(e^{0{,}06/12}-1\big)\approx 6{,}015\,\%$. (Le PDF note « log » : il s'agit du logarithme népérien.)</p>
        <p><strong>(d)</strong> Quotidien : $100(1+0{,}1/365)^{365}\approx 110{,}516$, affiché 110,52. La limite quand $m\to\infty$
        est $100\,e^{0{,}1}\approx 110{,}517$ : au-delà d'une capitalisation quotidienne, le gain supplémentaire est
        négligeable. C'est pourquoi le continu est une excellente approximation des capitalisations fréquentes.</p>
        <p>Retenir : pour une même valeur finale, plus la capitalisation est fréquente, plus le taux affiché est faible
        ($R_1=10{,}25\,\%\gt R_2=10\,\%\gt R_c=9{,}758\,\%$).</p>`,
    },
    {
      id: "ex-bond-yield",
      title: "Prix, rendement et par yield d'une obligation",
      difficulty: "moyen",
      tags: ["obligations", "rendement", "par yield"],
      statement: String.raw`<p>Les taux zéro (capitalisation continue) sont :</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>Maturité (ans)</th><th>0,5</th><th>1,0</th><th>1,5</th><th>2,0</th></tr></thead>
          <tbody><tr><td>Taux zéro (%)</td><td>4,0</td><td>4,4</td><td>4,7</td><td>5,0</td></tr></tbody></table></div>
        <p>On considère une obligation de principal 100, maturité 2 ans, coupon de 6 % par an versé semestriellement.</p>
        <p>(a) Calculer son prix théorique. (b) Son prix de marché est égal au prix théorique. Vérifier que son rendement
        (continu) vaut environ 4,98 %. (c) Calculer le par yield à 2 ans avec la formule $(1-d)m/A$. (d) Pourquoi le prix
        est-il supérieur à 100 ?</p>`,
      hints: [
        String.raw`Facteurs d'actualisation : $e^{-0{,}02}$, $e^{-0{,}044}$, $e^{-0{,}0705}$, $e^{-0{,}1}$.`,
        String.raw`(b) Il suffit de recalculer le prix avec $y=4{,}98\,\%$ appliqué à tous les flux.`,
      ],
      solution: String.raw`
        <p><strong>(a)</strong> Facteurs d'actualisation :</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>$t$</th><th>Flux</th><th>$e^{-R_tt}$</th><th>Valeur actuelle</th></tr></thead>
          <tbody>
            <tr><td>0,5</td><td>3</td><td>$e^{-0{,}020}=0{,}98020$</td><td>2,941</td></tr>
            <tr><td>1,0</td><td>3</td><td>$e^{-0{,}044}=0{,}95695$</td><td>2,871</td></tr>
            <tr><td>1,5</td><td>3</td><td>$e^{-0{,}0705}=0{,}93193$</td><td>2,796</td></tr>
            <tr><td>2,0</td><td>103</td><td>$e^{-0{,}100}=0{,}90484$</td><td>93,198</td></tr>
          </tbody></table></div>
        <p>Prix : $B\approx 101{,}81$.</p>
        <p><strong>(b)</strong> On cherche $y$ tel que $3e^{-0{,}5y}+3e^{-y}+3e^{-1{,}5y}+103e^{-2y}=101{,}81$. Par essais
        successifs (ou solveur) : $y\approx 4{,}977\,\%$. Vérification avec $y=4{,}98\,\%$ : le prix calculé vaut 101,80, très
        proche. Comme attendu, $y$ est légèrement inférieur au taux zéro à 2 ans (5 %), car les coupons intermédiaires sont
        actualisés à des taux plus faibles.</p>
        <p><strong>(c)</strong> $d=e^{-0{,}1}=0{,}90484$, $A=0{,}98020+0{,}95695+0{,}93193+0{,}90484=3{,}77392$, $m=2$ :</p>
        <p>$$\text{par yield}=\frac{(1-0{,}90484)\times 2}{3{,}77392}\approx 5{,}04\,\%\ \text{(semestriel)}.$$</p>
        <p><strong>(d)</strong> Le coupon (6 %) est supérieur au par yield (5,04 %), le taux de coupon qui donnerait
        exactement 100. L'obligation verse plus que ce que le marché exige : elle cote au-dessus du pair.</p>`,
    },
    {
      id: "ex-bootstrap",
      title: "Construire la courbe des taux zéro par bootstrap",
      difficulty: "moyen",
      tags: ["bootstrap", "taux zéro"],
      statement: String.raw`<p>On observe les instruments suivants (principal 100, la moitié du coupon annuel est versée tous les six mois) :</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>Maturité (ans)</th><th>Coupon annuel</th><th>Prix</th></tr></thead>
          <tbody>
            <tr><td>0,25</td><td>0</td><td>98,8</td></tr>
            <tr><td>0,50</td><td>0</td><td>97,6</td></tr>
            <tr><td>1,00</td><td>0</td><td>95,0</td></tr>
            <tr><td>1,50</td><td>6</td><td>99,2</td></tr>
            <tr><td>2,00</td><td>7</td><td>100,4</td></tr>
          </tbody></table></div>
        <p>(a) Calculer les taux zéro (continus) à 0,25, 0,5 et 1 an. (b) En déduire le taux zéro à 1,5 an. (c) Puis celui à
        2 ans. (d) Décrire la forme de la courbe et calculer le taux forward entre 1,5 et 2 ans.</p>`,
      hints: [String.raw`(b) Les coupons de 3 versés à 0,5 et 1 an s'actualisent avec les taux trouvés en (a) ; il ne reste qu'une inconnue dans $103e^{-1{,}5R}$.`],
      solution: String.raw`
        <p><strong>(a)</strong> Pour un zéro-coupon, $R=\frac1T\ln(100/P)$ :</p>
        <ul>
          <li>0,25 an : $4\ln(100/98{,}8)\approx 4{,}829\,\%$ ;</li>
          <li>0,5 an : $2\ln(100/97{,}6)\approx 4{,}859\,\%$ ;</li>
          <li>1 an : $\ln(100/95)\approx 5{,}129\,\%$.</li>
        </ul>
        <p><strong>(b)</strong> Les coupons valent 3. Leurs valeurs actuelles : $3e^{-0{,}04859\times 0{,}5}=3\times 0{,}976=2{,}928$
        (c'est $3\times 97{,}6/100$) et $3e^{-0{,}05129}=3\times 0{,}95=2{,}850$. D'où</p>
        <p>$$103\,e^{-1{,}5R}=99{,}2-2{,}928-2{,}850=93{,}422\ \Rightarrow\ R=\frac{1}{1{,}5}\ln\frac{103}{93{,}422}\approx 6{,}507\,\%.$$</p>
        <p><strong>(c)</strong> Coupons de 3,5 : $3{,}5\times 0{,}976=3{,}416$ ; $3{,}5\times 0{,}95=3{,}325$ ;
        $3{,}5\,e^{-0{,}06507\times 1{,}5}\approx 3{,}175$. D'où</p>
        <p>$$103{,}5\,e^{-2R}=100{,}4-3{,}416-3{,}325-3{,}175=90{,}484\ \Rightarrow\ R=\frac12\ln\frac{103{,}5}{90{,}484}\approx 6{,}720\,\%.$$</p>
        <p><strong>(d)</strong> La courbe est croissante : 4,83 % ; 4,86 % ; 5,13 % ; 6,51 % ; 6,72 %, avec une forte hausse
        entre 1 et 1,5 an. Taux forward entre 1,5 et 2 ans :</p>
        <p>$$f=\frac{6{,}720\times 2-6{,}507\times 1{,}5}{0{,}5}\approx 7{,}36\,\%,$$</p>
        <p>supérieur au taux zéro à 2 ans, comme attendu pour une courbe croissante.</p>`,
    },
    {
      id: "ex-forward",
      title: "Taux forward et forward instantané",
      difficulty: "moyen",
      tags: ["taux forward", "courbe des taux"],
      statement: String.raw`<p>(a) Les taux zéro (continus) à 1, 2, 3, 4 et 5 ans sont 2,0 % ; 2,8 % ; 3,3 % ; 3,6 % ; 3,8 %.
        Calculer les taux forward pour les années 2 à 5.</p>
        <p>(b) Montrer que la formule $f_{12}=(R_2T_2-R_1T_1)/(T_2-T_1)$ découle de l'absence d'arbitrage entre deux stratégies de placement.</p>
        <p>(c) Dans la figure 2.5 du cours, le taux zéro à 5 ans est noté 5,5 % et le forward de la 5<sup>e</sup> année 6,5 %.
        Ces valeurs sont-elles cohérentes ?</p>
        <p>(d) La courbe des taux zéro est $R(T)=0{,}02+0{,}005\,T$. Donner le taux forward instantané $F(T)$ et le comparer à $R(T)$.</p>`,
      solution: String.raw`
        <p><strong>(a)</strong> Avec $T_2-T_1=1$ an, $f=R_nn-R_{n-1}(n-1)$ :</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>Année</th><th>Calcul</th><th>Forward</th></tr></thead>
          <tbody>
            <tr><td>2</td><td>$2{,}8\times 2-2{,}0\times 1$</td><td>3,6 %</td></tr>
            <tr><td>3</td><td>$3{,}3\times 3-2{,}8\times 2$</td><td>4,3 %</td></tr>
            <tr><td>4</td><td>$3{,}6\times 4-3{,}3\times 3$</td><td>4,5 %</td></tr>
            <tr><td>5</td><td>$3{,}8\times 5-3{,}6\times 4$</td><td>4,6 %</td></tr>
          </tbody></table></div>
        <p><strong>(b)</strong> Stratégie 1 : placer 1 € jusqu'à $T_2$ au taux zéro $R_2$, on obtient $e^{R_2T_2}$. Stratégie 2 :
        placer jusqu'à $T_1$ au taux $R_1$, et fixer dès aujourd'hui le taux $f_{12}$ de réinvestissement sur $[T_1,T_2]$ :
        on obtient $e^{R_1T_1}e^{f_{12}(T_2-T_1)}$. Les deux stratégies sont sans risque ; si l'une rapportait plus, on
        emprunterait selon l'autre pour y placer, avec un profit certain. Donc $R_2T_2=R_1T_1+f_{12}(T_2-T_1)$, d'où la formule.</p>
        <p><strong>(c)</strong> Non : $5{,}5\times 5-5{,}0\times 4=27{,}5-20=7{,}5\,\%$, pas 6,5 %. La table d'origine (Hull)
        donne un taux zéro de 5,3 % à 5 ans : $5{,}3\times 5-20=6{,}5\,\%$. C'est une coquille du PDF.</p>
        <p><strong>(d)</strong> $F(T)=R+T\,\partial R/\partial T=0{,}02+0{,}005\,T+0{,}005\,T=0{,}02+0{,}01\,T$. Pour $T\gt 0$,
        $F(T)-R(T)=0{,}005\,T\gt 0$ : la courbe étant croissante, le forward instantané est au-dessus du taux zéro, et sa pente
        est le double.</p>`,
    },
    {
      id: "ex-curve-order",
      title: "Forward, zéro et par yield : démontrer l'ordre",
      difficulty: "difficile",
      tags: ["courbe des taux", "par yield", "taux forward"],
      statement: String.raw`<p>Le cours affirme : pour une courbe croissante, taux forward $\gt$ taux zéro $\gt$ par yield, et
        l'inverse pour une courbe décroissante (« Why? Prove it for simple examples »).</p>
        <p>(a) Montrer que $f_{12}\gt R_2$ si et seulement si $R_2\gt R_1$.</p>
        <p>(b) Courbe croissante : taux zéro continus 3 % à 1 an et 4 % à 2 ans. Calculer le forward de la 2<sup>e</sup> année,
        puis le par yield à 2 ans d'une obligation à coupon <em>annuel</em>, et comparer (en convertissant le par yield en taux continu).</p>
        <p>(c) Même travail pour une courbe décroissante : 5 % à 1 an et 4 % à 2 ans.</p>
        <p>(d) Expliquer intuitivement pourquoi le par yield est du côté des taux courts.</p>`,
      hints: [
        String.raw`(a) Écrire $f_{12}=R_2+(R_2-R_1)\dfrac{T_1}{T_2-T_1}$.`,
        String.raw`(b) Par yield annuel : $c\,(e^{-0{,}03}+e^{-0{,}08})+100\,e^{-0{,}08}=100$.`,
      ],
      solution: String.raw`
        <p><strong>(a)</strong> $f_{12}=\dfrac{R_2T_2-R_1T_1}{T_2-T_1}=\dfrac{R_2(T_2-T_1)+(R_2-R_1)T_1}{T_2-T_1}=R_2+(R_2-R_1)\dfrac{T_1}{T_2-T_1}$.
        Comme $T_1/(T_2-T_1)\gt 0$, $f_{12}\gt R_2\iff R_2\gt R_1$. Le taux zéro à $T_2$ est une moyenne (pondérée par les
        durées) de $R_1$ et de $f_{12}$ ; s'il est au-dessus de $R_1$, le forward doit être encore au-dessus.</p>
        <p><strong>(b)</strong> Forward : $(4\times 2-3)/1=5\,\%$. Par yield (coupon annuel $c$, en % du nominal) :</p>
        <p>$$c=\frac{100\,(1-e^{-0{,}08})}{e^{-0{,}03}+e^{-0{,}08}}=\frac{7{,}688}{0{,}97045+0{,}92312}\approx 4{,}060\,\%\ \text{(annuel)}.$$</p>
        <p>En continu : $\ln(1{,}04060)\approx 3{,}980\,\%$. D'où $5\,\%\gt 4\,\%\gt 3{,}98\,\%$ : forward $\gt$ zéro $\gt$ par yield.</p>
        <p><strong>(c)</strong> Forward : $(4\times 2-5)/1=3\,\%$. Par yield : $c=7{,}688/(e^{-0{,}05}+e^{-0{,}08})=7{,}688/1{,}87435\approx 4{,}102\,\%$
        annuel, soit $\ln(1{,}04102)\approx 4{,}020\,\%$ en continu. D'où $3\,\%\lt 4\,\%\lt 4{,}02\,\%$ : l'ordre est inversé.</p>
        <p><strong>(d)</strong> Une obligation au pair verse des coupons avant la maturité ; ces coupons sont actualisés aux taux
        zéro de leurs dates, plus courtes. Le par yield est donc une sorte de moyenne des taux zéro <em>jusqu'à</em> $T$,
        pondérée par les flux. Si la courbe monte, cette moyenne est tirée vers les taux courts, plus bas, donc sous $R_T$ ;
        si elle descend, elle est au-dessus. Le poids du principal final explique qu'elle reste proche de $R_T$.</p>`,
    },
    {
      id: "ex-fra",
      title: "Valoriser et régler un FRA",
      difficulty: "moyen",
      tags: ["FRA", "taux forward"],
      statement: String.raw`<p>Une banque a conclu un FRA par lequel elle <em>reçoit</em> un taux fixe $R_K=5\,\%$ (capitalisation trimestrielle) sur
        un principal de 10 millions d'€, pour la période de trois mois commençant dans six mois ($T_1=0{,}5$, $T_2=0{,}75$).
        Les taux zéro (continus) sont 4,0 % à 6 mois et 4,4 % à 9 mois.</p>
        <p>(a) Calculer le taux forward continu pour la période, puis le convertir en capitalisation trimestrielle ($R_F$).
        (b) Calculer la valeur du FRA pour la banque. (c) Dans six mois, le taux trimestriel constaté pour la période est
        finalement 4,5 %. Quel flux la banque reçoit-elle en $T_2$ ? Quel serait le montant équivalent si le règlement avait
        lieu en $T_1$ ? (d) Pourquoi le résultat de (c) n'est-il pas en contradiction avec (b) ?</p>`,
      hints: [String.raw`(a) $f=(R_2T_2-R_1T_1)/(T_2-T_1)$ puis $R_4=4(e^{f/4}-1)$ : le FRA porte sur une période de 3 mois, donc le taux doit être trimestriel.`],
      solution: String.raw`
        <p><strong>(a)</strong> $f=\dfrac{0{,}044\times 0{,}75-0{,}04\times 0{,}5}{0{,}25}=\dfrac{0{,}033-0{,}020}{0{,}25}=5{,}2\,\%$ (continu).
        En trimestriel : $R_F=4\big(e^{0{,}052/4}-1\big)\approx 5{,}234\,\%$.</p>
        <p><strong>(b)</strong> La banque reçoit $R_K$ :</p>
        <p>$$V=L(R_K-R_F)(T_2-T_1)e^{-R_2T_2}=10\,000\,000\times(0{,}05-0{,}05234)\times 0{,}25\times e^{-0{,}044\times 0{,}75}\approx-5\,659\ \text{€}.$$</p>
        <p>La valeur est négative : la banque s'est engagée à recevoir 5 % alors que le marché anticipe 5,23 % pour cette période.</p>
        <p><strong>(c)</strong> Flux en $T_2$ : $10\,000\,000\times(0{,}05-0{,}045)\times 0{,}25=+12\,500$ €. Réglé en $T_1$, on
        l'actualise sur trois mois au taux constaté : $12\,500/(1+0{,}045\times 0{,}25)=12\,500/1{,}01125\approx 12\,361$ €.</p>
        <p><strong>(d)</strong> La valeur en (b) est calculée <em>aujourd'hui</em>, en supposant réalisé le taux forward, qui est
        l'anticipation implicite du marché. Le taux effectivement constaté (4,5 %) s'est révélé plus bas que prévu, ce qui a
        tourné en faveur de la banque. Une valeur négative n'interdit pas un gain ex post : elle dit seulement que, aux taux
        actuels, le contrat est défavorable.</p>`,
    },
    {
      id: "ex-duration",
      title: "Calculer une duration et l'utiliser",
      difficulty: "moyen",
      tags: ["duration", "obligations"],
      statement: String.raw`<p>Une obligation de principal 100, maturité 3 ans, verse un coupon annuel de 8 (en fin d'année). Son
        rendement est $y=7\,\%$ (capitalisation continue).</p>
        <p>(a) Calculer son prix $B$ et sa duration de Macaulay $D$. (b) Estimer par la duration la variation de prix si le
        rendement monte de 10 points de base ($\Delta y=0{,}001$), et comparer au prix exact recalculé. (c) Calculer sa duration
        en valeur. (d) Si le rendement était exprimé avec capitalisation annuelle ($y=7\,\%$ annuel) et la duration
        inchangée, quelle serait la duration modifiée ?</p>`,
      hints: [String.raw`Construire un tableau : $t_i$, $c_i$, $c_ie^{-yt_i}$, poids $c_ie^{-yt_i}/B$, puis $t_i\times$ poids.`],
      solution: String.raw`
        <p><strong>(a)</strong></p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>$t_i$</th><th>$c_i$</th><th>$c_ie^{-0{,}07t_i}$</th><th>Poids</th><th>$t_i\times$ poids</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>8</td><td>7,459</td><td>0,0732</td><td>0,0732</td></tr>
            <tr><td>2</td><td>8</td><td>6,955</td><td>0,0682</td><td>0,1364</td></tr>
            <tr><td>3</td><td>108</td><td>87,543</td><td>0,8586</td><td>2,5759</td></tr>
            <tr><td>Total</td><td></td><td>$B=101{,}957$</td><td>1</td><td>$D=2{,}785$</td></tr>
          </tbody></table></div>
        <p>La duration (2,79 ans) est inférieure à la maturité (3 ans) car une partie de la valeur arrive plus tôt, via les coupons.</p>
        <p><strong>(b)</strong> $\Delta B\approx-BD\Delta y=-101{,}957\times 2{,}785\times 0{,}001\approx-0{,}2840$. Prix exact
        avec $y=7{,}1\,\%$ : $8e^{-0{,}071}+8e^{-0{,}142}+108e^{-0{,}213}\approx 101{,}673$, soit $\Delta B=-0{,}2836$.
        L'approximation est excellente pour une petite variation.</p>
        <p><strong>(c)</strong> En capitalisation continue, $D^*=D$ : $D^{**}=D\times B\approx 2{,}785\times 101{,}957\approx 284{,}0$.
        Une hausse de 1 point de base ($0{,}0001$) fait perdre environ $0{,}0284$ par tranche de 100 de principal.</p>
        <p><strong>(d)</strong> $D^*=D/(1+y/m)=2{,}785/1{,}07\approx 2{,}603$. Avec un rendement annuel, c'est $D^*$ qui relie
        $\Delta B/B$ à $\Delta y$.</p>`,
    },
    {
      id: "ex-convexity",
      title: "Améliorer l'approximation par la convexité",
      difficulty: "difficile",
      tags: ["convexité", "duration"],
      statement: String.raw`<p>On reprend l'obligation de l'exercice précédent (principal 100, coupon annuel 8, maturité 3 ans,
        $y=7\,\%$ continu, $B=101{,}957$, $D=2{,}785$).</p>
        <p>(a) Calculer sa convexité $C$. (b) Pour une hausse de rendement de 2 points ($\Delta y=+0{,}02$), estimer la variation
        de prix avec la duration seule, puis avec duration et convexité, et comparer au prix exact. (c) Même travail pour une
        baisse de 2 points. (d) Que conclure sur le signe de l'erreur commise par la duration seule ?</p>`,
      solution: String.raw`
        <p><strong>(a)</strong> $C=\sum t_i^2\times\text{poids}_i=1\times 0{,}0732+4\times 0{,}0682+9\times 0{,}8586\approx 8{,}074$.</p>
        <p><strong>(b)</strong> Duration seule : $\Delta B\approx-BD\Delta y=-101{,}957\times 2{,}785\times 0{,}02\approx-5{,}680$.
        Avec convexité : $\Delta B\approx B\big(-D\Delta y+\frac12C(\Delta y)^2\big)=101{,}957\times(-0{,}05571+0{,}00161)\approx-5{,}515$.
        Exact ($y=9\,\%$) : $8e^{-0{,}09}+8e^{-0{,}18}+108e^{-0{,}27}\approx 96{,}439$, soit $\Delta B=-5{,}519$.</p>
        <p><strong>(c)</strong> Duration seule : $+5{,}680$. Avec convexité : $101{,}957\times(0{,}05571+0{,}00161)\approx+5{,}845$.
        Exact ($y=5\,\%$) : $\Delta B=+5{,}848$.</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>$\Delta y$</th><th>Duration seule</th><th>Duration + convexité</th><th>Exact</th></tr></thead>
          <tbody>
            <tr><td>$+2\,\%$</td><td>$-5{,}680$</td><td>$-5{,}515$</td><td>$-5{,}519$</td></tr>
            <tr><td>$-2\,\%$</td><td>$+5{,}680$</td><td>$+5{,}845$</td><td>$+5{,}848$</td></tr>
          </tbody></table></div>
        <p><strong>(d)</strong> La duration seule <em>sous-estime toujours</em> le prix : elle exagère la baisse quand les taux
        montent et minimise la hausse quand ils baissent. Le prix est une fonction convexe du rendement, située au-dessus de
        sa tangente. Le terme $\frac12C(\Delta y)^2$, toujours positif, corrige l'essentiel de cet écart.</p>`,
    },
    {
      id: "ex-immunization",
      title: "Immuniser un passif par la duration",
      difficulty: "difficile",
      tags: ["immunisation", "duration", "convexité", "portefeuille"],
      statement: String.raw`<p>Un assureur doit verser 1 000 000 € dans 5 ans. La courbe des taux est plate à 5 % (continu). Il dispose
        de deux obligations zéro-coupon, de maturités 2 ans et 10 ans.</p>
        <p>(a) Quelle est la valeur actuelle du passif et sa duration ? (b) Quels montants investir dans chaque zéro-coupon pour
        que les actifs aient la même valeur actuelle et la même duration que le passif ? (c) Comparer les convexités des actifs
        et du passif. (d) La courbe se déplace parallèlement de $+1\,\%$, puis (autre scénario) de $-1\,\%$. Calculer dans
        chaque cas la valeur des actifs et du passif. Conclure. (e) Contre quel type de mouvement de taux l'assureur n'est-il pas protégé ?</p>`,
      hints: [
        String.raw`La duration d'un zéro-coupon est sa maturité ; celle d'un portefeuille est la moyenne pondérée par les valeurs.`,
        String.raw`Après un déplacement $\Delta y$, un zéro-coupon de valeur actuelle $V$ et de maturité $T$ vaut $V\,e^{-\Delta y\,T}$.`,
      ],
      solution: String.raw`
        <p><strong>(a)</strong> $PV=1\,000\,000\,e^{-0{,}05\times 5}=1\,000\,000\,e^{-0{,}25}\approx 778\,801$ €. Duration : 5 ans (flux unique).</p>
        <p><strong>(b)</strong> Soit $w$ la part investie dans le zéro à 2 ans : $2w+10(1-w)=5$, d'où $w=5/8=0{,}625$. Montants :
        $0{,}625\times 778\,801\approx 486\,750$ € dans le 2 ans et $0{,}375\times 778\,801\approx 292\,050$ € dans le 10 ans.</p>
        <p><strong>(c)</strong> Convexité d'un zéro-coupon : $T^2$. Actifs : $0{,}625\times 4+0{,}375\times 100=40$. Passif :
        $5^2=25$. Le portefeuille « haltère » (barbell) est plus convexe que le passif.</p>
        <p><strong>(d)</strong></p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>Scénario</th><th>Actifs</th><th>Passif</th><th>Surplus</th></tr></thead>
          <tbody>
            <tr><td>$+1\,\%$</td><td>$486\,750e^{-0{,}02}+292\,050e^{-0{,}10}\approx 741\,370$</td><td>$1\,000\,000e^{-0{,}30}\approx 740\,818$</td><td>$+552$</td></tr>
            <tr><td>$-1\,\%$</td><td>$486\,750e^{0{,}02}+292\,050e^{0{,}10}\approx 819\,349$</td><td>$1\,000\,000e^{-0{,}20}\approx 818\,731$</td><td>$+618$</td></tr>
          </tbody></table></div>
        <p>Dans les deux cas, les actifs varient presque exactement comme le passif (effet de la duration nette nulle) et
        l'assureur dégage même un petit surplus, grâce à la convexité supérieure des actifs.</p>
        <p><strong>(e)</strong> L'immunisation ne protège que contre les déplacements <em>parallèles</em> (et d'autant mieux
        qu'ils sont petits). Si la courbe se déforme (par exemple le taux à 10 ans monte pendant que le taux à 2 ans baisse),
        les actifs peuvent perdre plus que le passif. Il faut aussi rééquilibrer au fil du temps, car les durations évoluent.</p>`,
    },
  ],

  /* -------------------- DÉFINITIONS -------------------- */
  definitions: [
    { term: "Taux d'intérêt", abbr: "IR", def: String.raw`Dans une situation donnée, définit le montant que l'emprunteur promet de payer au prêteur. Dépend de la devise, de la maturité et du risque de crédit.` },
    { term: "Risque de crédit", def: String.raw`Risque que l'emprunteur ne paie pas les intérêts ou le principal promis. Plus il est élevé, plus le taux promis est élevé.` },
    { term: "Taux du Trésor", def: String.raw`Taux gagné sur les bons (<strong>T-bills</strong>) et obligations (<strong>T-bonds</strong>) d'un État empruntant dans sa propre devise. Considéré comme totalement sans risque.` },
    { term: "London Interbank Offered Rate", abbr: "LIBOR", def: String.raw`Taux auquel une banque est prête à faire un dépôt de gros montant auprès d'autres banques (dépôt noté AA). Presque sans risque ; utilisé par les traders de dérivés comme taux sans risque, aujourd'hui remplacé par des taux comme SOFR.` },
    { term: "Notation AA", def: String.raw`Deuxième meilleure note de crédit de S&amp;P (après AAA) : risque de défaut très faible mais non nul.` },
    { term: "Certificat de dépôt", abbr: "CD", def: String.raw`Dépôt à terme émis par une banque sur le marché monétaire ; son taux (taux CD) sert de référence de taux de marché, notamment dans les FRA.` },
    { term: "Pension livrée", abbr: "Repo / RP", def: String.raw`<em>Repurchase agreement</em> : vente de titres avec engagement de les racheter à un prix légèrement supérieur. Le <strong>taux de repo</strong> découle de l'écart entre les deux prix ; c'est un prêt garanti.` },
    { term: "Repo overnight / term repo", def: String.raw`Overnight : sur une nuit, renégocié chaque jour (le plus courant). Term repo : conditions fixées sur une durée plus longue.` },
    { term: "Fréquence de capitalisation", def: String.raw`Nombre $m$ de fois par an où les intérêts sont ajoutés au capital (1 annuelle, 2 semestrielle, 4 trimestrielle, 12 mensuelle). Un taux n'a de sens qu'avec elle.` },
    { term: "Capitalisation continue", def: String.raw`Limite $m\to\infty$ : $A$ devient $Ae^{R_cn}$ en $n$ années. Convention quasi systématique en valorisation d'options.` },
    { term: "Taux équivalents", def: String.raw`Taux donnant la même valeur finale avec des fréquences différentes : $R_c=m\ln(1+R_m/m)$, $R_m=m(e^{R_c/m}-1)$.` },
    { term: "Taux zéro-coupon", abbr: "zero / spot rate", def: String.raw`Taux gagné sur un placement qui ne verse qu'un seul flux, à la maturité $T$.` },
    { term: "Courbe des taux zéro", def: String.raw`Taux zéro en fonction de la maturité. Obtenue par bootstrap à partir des prix de T-bills et d'obligations ; croissante, plate ou décroissante.` },
    { term: "Prix théorique d'une obligation", def: String.raw`Somme des flux (coupons et principal) actualisés chacun au taux zéro de sa date : $B=\sum_ic_ie^{-R_it_i}$.` },
    { term: "Valeur faciale (nominal, principal)", def: String.raw`Montant remboursé à maturité, sur lequel sont calculés les coupons (100 dans les exemples du cours).` },
    { term: "Coupon", def: String.raw`Intérêt périodique versé par une obligation ; un « coupon de 6 % semestriel » signifie 3 % du nominal tous les six mois.` },
    { term: "Rendement d'une obligation", abbr: "bond yield", def: String.raw`Taux d'actualisation unique $y$ qui, appliqué à tous les flux, égalise leur valeur actuelle et le prix de marché. Se calcule numériquement.` },
    { term: "Par yield", def: String.raw`Taux de coupon qui rend le prix d'une obligation égal à sa valeur faciale : $c=(1-d)m/A$.` },
    { term: "Annuité", def: String.raw`Suite de paiements égaux à dates régulières. Dans la formule du par yield, $A$ est la valeur actuelle d'une annuité de 1 à chaque date de coupon.` },
    { term: "Méthode du bootstrap", def: String.raw`Construction de la courbe des taux zéro maturité par maturité : chaque obligation n'apporte qu'un taux inconnu, les flux antérieurs étant actualisés avec les taux déjà trouvés.` },
    { term: "Interpolation linéaire", def: String.raw`Entre deux maturités où le taux zéro est connu, on relie les points par un segment ; la courbe est supposée horizontale avant le premier et après le dernier point.` },
    { term: "Taux forward", def: String.raw`Taux, impliqué par les taux zéro actuels, pour une période future $[T_1,T_2]$ : $f_{12}=(R_2T_2-R_1T_1)/(T_2-T_1)$.` },
    { term: "Taux forward instantané", def: String.raw`Taux forward pour une période infinitésimale commençant en $T$ : $F(T)=R+T\,\partial R/\partial T$.` },
    { term: "Courbe croissante / décroissante", def: String.raw`Croissante : forward $\gt$ zéro $\gt$ par yield. Décroissante : forward $\lt$ zéro $\lt$ par yield. Plate : les trois sont égaux.` },
    { term: "Forward Rate Agreement", abbr: "FRA", def: String.raw`Accord de gré à gré fixant le taux $R_K$ applicable à un principal $L$ sur une période future $[T_1,T_2]$. Valeur pour qui reçoit $R_K$ : $L(R_K-R_F)(T_2-T_1)e^{-R_2T_2}$.` },
    { term: "Gré à gré", abbr: "OTC", def: String.raw`<em>Over-the-counter</em> : négocié directement entre deux parties, hors bourse. Les FRA sont des produits OTC.` },
    { term: "Taux CD forward $R_F$", def: String.raw`Taux de marché anticipé pour la période du FRA, exprimé avec la capitalisation de cette période. On valorise le FRA en le supposant réalisé.` },
    { term: "Point de base", abbr: "pb / bp", def: String.raw`Un centième de point de pourcentage : $0{,}01\,\%=0{,}0001$. Unité usuelle des variations de taux.` },
    { term: "Duration de Macaulay", def: String.raw`Moyenne des dates de flux pondérée par la part de chaque flux dans le prix : $D=\sum t_ic_ie^{-yt_i}/B$. Égale à $T$ pour un zéro-coupon ; donne $\Delta B/B\approx-D\Delta y$.` },
    { term: "Duration modifiée", abbr: "D*", def: String.raw`$D^*=D/(1+y/m)$ quand le rendement est capitalisé $m$ fois par an ; alors $\Delta B/B\approx-D^*\Delta y$. Égale à $D$ en continu.` },
    { term: "Duration en valeur", abbr: "D** (dollar duration)", def: String.raw`Produit de la duration modifiée et du prix : $D^{**}=D^*B$, de sorte que $\Delta B\approx-D^{**}\Delta y$ (variation en montant).` },
    { term: "Duration d'un portefeuille", def: String.raw`Moyenne des durations des obligations pondérée par leurs valeurs de marché. Mesure l'effet de petits déplacements parallèles de la courbe.` },
    { term: "Déplacement parallèle", def: String.raw`Variation identique $\Delta y$ de tous les taux, quelle que soit la maturité. Hypothèse sous-jacente à la duration et à la convexité.` },
    { term: "Immunisation", def: String.raw`Choix d'actifs de même valeur actuelle et même duration que les passifs (duration nette nulle) : protège contre les petits déplacements parallèles, pas contre les grands ou non parallèles.` },
    { term: "Convexité", def: String.raw`$C=\frac1B\partial^2B/\partial y^2=\sum c_it_i^2e^{-yt_i}/B$. Corrige la duration : $\Delta B/B\approx-D\Delta y+\frac12C(\Delta y)^2$. Élevée quand les flux sont étalés, faible quand ils sont concentrés.` },
    { term: "Portefeuille haltère / concentré", abbr: "barbell / bullet", def: String.raw`Haltère : flux regroupés aux deux extrémités (court et long terme), forte convexité. Concentré : flux autour d'une seule date, faible convexité, à duration égale.` },
  ],
});
