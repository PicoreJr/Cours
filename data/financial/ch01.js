/* ============================================================
   Financial Engineering — Chapitre 1 : Marchés financiers
   Source : Chapter01_Financial Markets (notes de cours) +
   Reference A (Asset Classes and Financial Instruments) et
   Reference B (The Efficient Market Hypothesis), extraits de
   Bodie, Kane & Marcus, Investments (2023).
   Contenu rédigé pour la révision — à relire et valider.
   NB : les champs contenant du LaTeX utilisent String.raw pour
   préserver les backslashes. Ne jamais écrire la séquence ${ }.
   Dans les champs HTML, écrire « &lt; » pour « < » suivi d'une lettre.
   ============================================================ */
addChapter("fin-eng", {
  id: "ch01",
  title: "Chapitre 1 — Marchés financiers",
  short: "Ch. 1",
  lang: "fr",

  /* -------------------- RÉSUMÉ DE COURS -------------------- */
  summary: String.raw`
    <h3>1. Investissement, actifs réels et actifs financiers</h3>
    <p>Un <strong>investissement</strong> est l'engagement présent d'argent ou d'autres ressources dans
    l'espoir d'en tirer un bénéfice futur : on sacrifie de la consommation aujourd'hui pour une consommation
    planifiée plus tard.</p>
    <ul>
      <li>Les <strong>actifs réels</strong> servent directement à produire des biens et des services : terrains,
          bâtiments, machines, brevets, connaissances. Ils constituent la capacité productive de l'économie.</li>
      <li>Les <strong>actifs financiers</strong> ne contribuent pas directement à la production : ce sont des
          <em>droits</em> (créances) sur les revenus générés par les actifs réels (ou par l'État). Actions,
          obligations, options en sont des exemples.</li>
    </ul>
    <p>Si l'on ne peut pas posséder une usine automobile, on peut acheter des actions du constructeur : on
    reçoit alors une part du revenu tiré de la production. Le succès ou l'échec d'un actif financier dépend
    toujours de l'actif réel sous-jacent.</p>
    <div class="callout"><strong>Trois familles d'actifs financiers.</strong>
      <p><em>Titres à revenu fixe</em> (dette) : promettent un flux de revenus fixe ou calculé selon une
      formule (obligations d'État, obligations d'entreprise, bons du Trésor). <em>Actions</em> (capitaux
      propres) : part de propriété de l'entreprise, aucun paiement promis, rendement lié au succès de la
      firme, donc plus risqué. <em>Produits dérivés</em> : contrats dont le paiement dépend du prix d'autres
      actifs (le sous-jacent), utilisés pour couvrir ou transférer des risques.</p></div>

    <h3>2. Qu'est-ce qu'un marché financier ?</h3>
    <p>En économie, un <strong>marché financier</strong> est un mécanisme qui permet d'acheter et de vendre
    des titres financiers (actions, obligations) et d'autres biens fongibles, à faible coût de transaction et
    à des prix qui reflètent l'<strong>hypothèse d'efficience des marchés</strong> (EMH). Les marchés
    financiers facilitent :</p>
    <ul>
      <li>la <strong>levée de capitaux</strong> (marchés de capitaux) ;</li>
      <li>le <strong>transfert de risque</strong> (marchés dérivés) ;</li>
      <li>le <strong>commerce international</strong> (marchés des changes).</li>
    </ul>
    <p>Ils mettent en relation ceux qui ont besoin de capital et ceux qui en disposent.</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Marché</th><th>Ce qu'il apporte</th></tr></thead>
      <tbody>
        <tr><td>Marchés de capitaux : <strong>actions</strong></td><td>Financement par émission d'actions, puis négociation de celles-ci.</td></tr>
        <tr><td>Marchés de capitaux : <strong>obligations</strong></td><td>Financement par émission d'obligations, puis négociation.</td></tr>
        <tr><td><strong>Marché monétaire</strong></td><td>Financement et placement par dette à court terme.</td></tr>
        <tr><td><strong>Marchés dérivés</strong></td><td>Instruments de gestion du risque financier.</td></tr>
        <tr><td><strong>Marché des changes</strong></td><td>Échange de devises.</td></tr>
      </tbody></table></div>

    <h3>3. Rôle économique des marchés et acteurs (Réf. A)</h3>
    <ul>
      <li><strong>Rôle informationnel</strong> : les prix orientent l'allocation du capital. Le cours d'une
          action reflète les perspectives de l'entreprise ; à l'inverse, des engouements passagers peuvent
          conduire à une allocation gaspilleuse.</li>
      <li><strong>Choix du moment de consommation</strong> : on stocke sa richesse dans des actifs financiers
          pour consommer plus tard (un retraité dépense plus qu'il ne gagne).</li>
      <li><strong>Allocation du risque</strong> : une entreprise finance une usine en vendant obligations
          (investisseurs prudents) et actions (investisseurs tolérants au risque). Chacun choisit le risque qui
          lui convient et la firme lève le capital.</li>
      <li><strong>Séparation propriété / gestion</strong> : les actionnaires peuvent vendre leurs titres sans
          affecter la gestion. Contrepartie : le <strong>problème d'agence</strong> (les dirigeants
          maximisent-ils vraiment la valeur de la firme ? aléa moral). Garde-fous : rémunération incitative
          (stock-options), conseil d'administration, analystes et investisseurs institutionnels, menace d'OPA.</li>
      <li><strong>Gouvernance et éthique</strong> : la transparence est nécessaire pour des décisions éclairées ;
          scandales comptables (Enron, WorldCom), loi Sarbanes-Oxley aux États-Unis.</li>
    </ul>
    <p><strong>Les acteurs</strong> : les entreprises sont emprunteuses nettes, les ménages épargnants nets,
    l'État peut être l'un ou l'autre. Les <strong>intermédiaires financiers</strong> (banques commerciales,
    sociétés d'investissement, assureurs, fonds de pension, fonds communs) émettent leurs propres titres pour
    acheter ceux des autres ; les banques d'investissement conseillent l'émetteur et placent les titres sur
    le marché primaire.</p>
    <div class="callout"><strong>Les marchés sont concurrentiels : « il n'y a pas de repas gratuit ».</strong>
      <p><em>Arbitrage rendement-risque</em> : un rendement espéré plus élevé se paie par un risque plus élevé.
      Deux questions centrales : comment mesurer le risque d'un actif ? quel est le taux d'échange quantitatif
      entre risque et rendement ? Réponses dans la théorie moderne du portefeuille (Markowitz, Sharpe) et par
      la <em>diversification</em>.</p>
      <p><em>Gestion active</em> (chercher des titres sous-évalués, anticiper le marché) contre
      <em>gestion passive</em> (détenir un portefeuille efficient sans chercher à battre le marché).</p></div>
    <p><strong>Crise de 2008</strong> : la <em>titrisation</em> des prêts hypothécaires (Fannie Mae, Freddie
    Mac, puis acteurs privés) a étendu le modèle aux prêts <em>subprime</em> à fort risque de défaut. Le
    <em>risque systémique</em> est la possibilité qu'une défaillance dans un marché se propage aux autres
    (l'insolvabilité d'AIG a menacé les banques qui comptaient sur sa protection). Réponses : injection de
    capital dans les banques (assouplissement quantitatif), compensation centralisée des produits OTC
    standardisés comme les CDS (chambre de compensation, CCP), incitations fondées sur le risque. Le
    <em>TED spread</em> (écart entre le taux interbancaire LIBOR et le taux des bons du Trésor) mesure la
    tension du système bancaire.</p>

    <h3>4. Classes d'actifs et produits (Réf. A)</h3>
    <p><strong>Marché monétaire</strong> : titres de dette à court terme, négociables, liquides et peu
    risqués (« quasi-liquidités »).</p>
    <ul>
      <li><em>Bons du Trésor</em> (T-bills) : émis par l'État à 4, 13, 26 ou 52 semaines, achetables sur le
          marché secondaire, exonérés d'impôts locaux aux États-Unis.</li>
      <li><em>Certificat de dépôt</em> (CD) : dépôt à terme dans une banque, intérêts et principal versés à
          l'échéance seulement.</li>
      <li><em>Billet de trésorerie</em> (commercial paper, CP) : dette à court terme non garantie émise par de
          grandes entreprises ; variante adossée à des actifs (ABCP).</li>
      <li><em>Pension livrée</em> (repo) : un intermédiaire vend des titres d'État avec engagement de les
          racheter le lendemain à un prix légèrement supérieur ; taux de référence SOFR, KOFR.</li>
    </ul>
    <p><strong>Marché obligataire</strong> : titres à long terme.</p>
    <ul>
      <li><em>T-notes</em> (jusqu'à 10 ans) et <em>T-bonds</em> (10 à 30 ans), coupons semestriels ;
          <em>TIPS</em> : principal indexé sur l'inflation (CPI).</li>
      <li><em>Obligations d'entreprise</em> : garanties (secured), non garanties (debenture), subordonnées ;
          risque de défaut plus élevé que l'État. Options incorporées : <em>callable</em> (l'émetteur peut
          racheter à un prix fixé), <em>convertible</em> (le porteur peut convertir en un nombre fixé d'actions).</li>
    </ul>
    <p><strong>Actions</strong> : une action ordinaire donne une voix par action et une part des bénéfices.
    L'actionnaire est <em>créancier résiduel</em> (dernier servi sur les actifs et revenus) et à
    <em>responsabilité limitée</em> (il ne peut perdre que sa mise). L'<em>action de préférence</em> est un
    hybride : priorité sur les dividendes et les actifs, comme une obligation, mais sans droit de vote en général.</p>
    <p><strong>Indices boursiers</strong> : trois questions de construction (représentatif ? large ou étroit ?
    pondération ?). Le <em>Dow Jones</em> (30 valeurs, depuis 1896) est pondéré par les <em>prix</em> : il
    surpondère les actions chères et doit ajuster son diviseur lors d'une division d'actions. Le
    <em>S&amp;P 500</em> est pondéré par la <em>capitalisation</em> : insensible aux divisions d'actions,
    réplicable par un fonds indiciel ou un ETF. Autres : Kospi, Nikkei 225, FTSE, DAX, Hang Seng, TSX.</p>
    <p><strong>Marchés dérivés</strong> : les dérivés (actifs contingents) tirent leur valeur d'autres actifs.
    Options (call, put ; échéance ; prix d'exercice ; la prime augmente avec la durée restante), contrats à
    terme (position longue $=$ achat, courte $=$ vente), swaps, swaptions. Une option coûte une prime, un
    contrat à terme ne coûte rien à l'entrée.</p>

    <h3>5. L'hypothèse d'efficience des marchés (Réf. B)</h3>
    <p>Kendall (1953) n'a trouvé aucun motif prévisible dans les cours : les prix évoluent au hasard, comme une
    <strong>marche aléatoire</strong>. Ce n'est pas un signe d'irrationalité : dans un marché concurrentiel,
    dès qu'une information est disponible, les participants l'analysent et la <em>compétition</em> garantit
    que les prix la reflètent immédiatement. Un prix ne bouge donc qu'à l'arrivée d'une information nouvelle,
    par définition imprévisible.</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Forme de l'EMH</th><th>Information déjà reflétée dans les prix</th><th>Ce qui ne peut pas battre le marché</th></tr></thead>
      <tbody>
        <tr><td><strong>Faible</strong></td><td>Données de marché : prix passés, volumes, positions courtes, taux.</td><td>L'analyse technique (chartisme, niveaux de support et de résistance).</td></tr>
        <tr><td><strong>Semi-forte</strong></td><td>Toute l'information publique : comptes, produits, qualité du management, brevets, prévisions de résultats.</td><td>L'analyse fondamentale (bilans, bénéfices passés).</td></tr>
        <tr><td><strong>Forte</strong></td><td>Toute l'information pertinente, y compris celle des initiés.</td><td>Même les initiés (les délits d'initiés sont d'ailleurs réglementés : règle 10b-5, SEC).</td></tr>
      </tbody></table></div>
    <p>Les ensembles d'information sont emboîtés : forte $\supset$ semi-forte $\supset$ faible. Si le marché
    est efficient au sens fort, il l'est aussi au sens semi-fort et faible.</p>
    <p><strong>Implications</strong> : les partisans de l'EMH jugent la gestion active largement inutile et
    recommandent la gestion passive (fonds indiciels, ETF, « acheter et conserver »). Stratégie hybride : un
    cœur indiciel plus une poche gérée activement.</p>
    <div class="callout"><strong>Tester l'efficience : trois difficultés.</strong>
      <p><em>Ampleur</em> : un gérant qui améliore de 0,1 % par an la performance d'un fonds de plusieurs milliards
      crée beaucoup de valeur, mais cet effet est noyé dans la volatilité annuelle du marché et indétectable
      statistiquement. <em>Biais de sélection</em> : les stratégies gagnantes ne sont pas publiées, on n'observe que
      celles qui ont échoué. <em>Coup de chance</em> : parmi des milliers d'investisseurs, certains réussissent
      par hasard ; il faut vérifier que la performance se répète.</p></div>
    <p><strong>Tests et anomalies.</strong> Forme faible : sur horizon court, faible corrélation sérielle
    positive et <em>effet momentum</em> (Jegadeesh et Titman 1993 : les bonnes ou mauvaises performances
    récentes persistent) ; sur horizon long, corrélation négative et <em>effet de renversement</em> (DeBondt et
    Thaler 1985), interprétés comme sur-réaction à court terme puis correction. Forme semi-forte : effet
    <em>P/E</em> (Basu 1977, les faibles PER surperforment même après ajustement du bêta), effet
    <em>taille</em> (Banz 1981), effet <em>firme négligée</em> (Arbel et Strebel 1983), effet
    <em>liquidité</em> (Amihud et Mendelson 1986, prime exigée pour les titres illiquides), effet
    <em>book-to-market</em> (Fama et French 1992 : ratio élevé $\Rightarrow$ rendement moyen plus élevé, et le
    bêta n'explique plus rien une fois taille et book-to-market contrôlés), <em>dérive post-annonce de
    résultats</em> (Ball et Brown 1968, réaction lente des cours). Forme forte : on ne s'attend pas à ce
    qu'elle tienne, mais suivre les transactions des initiés ne rapporte rien de significatif (Seyhun 1986).</p>
    <p><strong>Verdict</strong> : la performance des gérants professionnels est globalement cohérente avec
    l'efficience. La plupart ne battent pas la stratégie passive et la performance passée ne prédit presque
    pas la performance future (Carhart 1997) ; les « superstars » (Lynch, Buffett, Templeton, Soros) sont
    l'exception.</p>

    <h3>6. Options</h3>
    <p>L'option la plus simple, le <strong>call européen</strong>, est un contrat par lequel, à une date
    future fixée (l'<strong>échéance</strong>, <em>expiry</em>), le détenteur <em>peut</em> acheter un actif
    donné (le <strong>sous-jacent</strong>) à un prix fixé à l'avance (le <strong>prix d'exercice</strong>,
    <em>strike</em> $K$). Le <strong>put</strong> est le droit de <em>vendre</em> ; ses gains sont
    symétriques de ceux du call. À l'échéance $T$, avec $S_T$ le prix du sous-jacent :</p>
    <p>$$\text{call}:\ \max(S_T-K,\,0),\qquad \text{put}:\ \max(K-S_T,\,0).$$</p>
    <p>Le détenteur n'exerce que si c'est avantageux ; l'option n'est jamais une obligation pour lui, mais
    elle en est une pour le vendeur (<em>writer</em>). Deux questions fondamentales : combien vaut ce droit
    (<em>valorisation</em>) ? comment le vendeur peut-il réduire le risque de son engagement
    (<em>couverture</em>) ?</p>
    <ul>
      <li><strong>Européenne</strong> : exerçable seulement à l'échéance. <strong>Américaine</strong> :
          exerçable à tout instant avant l'échéance. L'option américaine est plus riche mathématiquement
          (problème à frontière libre) : il faut à la fois la valoriser et déterminer <em>quand</em> l'exercer.</li>
      <li><strong>Dépendante du chemin</strong> (<em>path-dependent</em>) : la valeur dépend de toute
          l'histoire du prix, pas seulement de $S_T$. Trois familles : options à <strong>barrière</strong>
          (l'option naît ou meurt si le sous-jacent atteint un niveau donné avant l'échéance), options
          <strong>asiatiques</strong> (le paiement dépend d'une moyenne du prix), options
          <strong>lookback</strong> (le paiement dépend du maximum ou du minimum atteint).</li>
    </ul>

    <h3>7. Obligations, contrats à terme, dérivés de taux</h3>
    <p>Une <strong>obligation</strong> est un contrat payé d'avance qui verse un montant connu (la
    <strong>valeur faciale</strong> ou principal) à une date connue (la <strong>maturité</strong>). Elle peut
    aussi verser des <strong>coupons</strong> à dates fixes ; sans coupon, c'est une obligation
    <strong>zéro-coupon</strong>. Émise par un État ou une entreprise pour lever du capital, la prime versée
    à l'achat s'interprète comme un prêt à l'émetteur. Différence avec un dérivé : l'obligation est un
    produit « normal » dont les flux sont fixés par contrat, alors que la valeur d'un dérivé est
    <em>dérivée</em> du prix d'un autre actif.</p>
    <p>Un <strong>contrat forward</strong> est un accord entre deux parties : l'une s'engage à acheter à
    l'autre un actif spécifié, à un prix spécifié (le <strong>prix forward</strong>), à une date spécifiée
    (date de livraison ou maturité). Si l'on assimile le prix forward au prix d'exercice, le forward ressemble
    à une option, avec deux différences : l'actif <em>doit</em> être livré et payé (pas de choix), et aucun
    argent ne change de mains avant la livraison, alors que la prime d'une option est payée d'avance.</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Forward</th><th>Futures</th></tr></thead>
      <tbody>
        <tr><td>Contrat de gré à gré entre deux parties quelconques.</td><td>Négocié sur une bourse qui standardise date de livraison et taille du contrat.</td></tr>
        <tr><td>Aucun dépôt de garantie.</td><td><strong>Appel de marge</strong> : dépôt de garantie qui protège les deux parties contre le défaut.</td></tr>
        <tr><td>Le gain ou la perte n'est réalisé qu'à l'échéance.</td><td>Le contrat est réévalué <strong>chaque jour</strong> et la variation de valeur est payée par une partie à l'autre.</td></tr>
      </tbody></table></div>
    <p>Un <strong>dérivé de taux d'intérêt</strong> donne le droit de payer ou recevoir un montant notionnel à
    un taux donné. Ces produits servent aux investisseurs ayant des besoins de flux personnalisés ou une
    opinion sur les mouvements de taux (direction, volatilité) ; ils s'échangent surtout de gré à gré
    (<strong>OTC</strong>). Exemple : le <strong>swap de taux</strong> (IRS), échange de flux à taux fixe
    contre des flux à taux variable.</p>

    <h3>8. Types d'intervenants</h3>
    <ul>
      <li>Les <strong>hedgers</strong> (couverture) utilisent les dérivés pour <em>réduire</em> le risque lié
          aux mouvements futurs d'une variable de marché.</li>
      <li>Les <strong>spéculateurs</strong> les utilisent pour <em>parier</em> sur la direction future d'une
          variable de marché.</li>
      <li>Les <strong>arbitragistes</strong> prennent des positions compensées sur deux instruments ou plus
          pour verrouiller un profit sans risque.</li>
    </ul>

    <h3>9. Taux d'intérêt et valeur actuelle</h3>
    <p>Pour valoriser une option, la notion clé concernant les taux est la <strong>valeur actuelle</strong>
    (<em>actualisation</em>) : combien payer aujourd'hui pour recevoir avec certitude un montant $E$ à la date
    future $T$ ?</p>
    <p><strong>Capitalisation continue.</strong> À taux constant $r$, l'argent en banque $M(t)$ croît
    exponentiellement selon l'équation différentielle</p>
    <p>$$\frac{dM(t)}{M(t)}=r\,dt\qquad\Longrightarrow\qquad M(t)=C\,e^{rt},$$</p>
    <p>où $C$ est la constante d'intégration. En imposant $M(T)=E$ :</p>
    <p>$$M(t)=E\,e^{-r(T-t)}.$$</p>
    <p>C'est la valeur actuelle en $t$ du montant $E$ reçu en $T$. Si le taux est une fonction déterministe du
    temps $r(\cdot)$, on remplace $r(T-t)$ par l'intégrale :</p>
    <p>$$M(t)=E\exp\Big(-\int_t^T r(\xi)\,d\xi\Big).$$</p>
    <div class="callout"><strong>Capitalisation discrète.</strong>
      <p>Avec un taux annuel $r$ composé $m$ fois par an, $1$ unité placée pendant $T$ années devient
      $(1+r/m)^{mT}$ : $m=1$ (annuelle), $m=2$ (semestrielle), $m=12$ (mensuelle). Quand $m\to\infty$,
      $(1+r/m)^{mT}\to e^{rT}$ : la capitalisation continue est la limite. À taux nominal égal, plus $m$ est
      grand, plus le capital final est élevé et plus la valeur actuelle est faible.</p></div>
  `,

  /* -------------------- FICHE PARTIEL -------------------- */
  keyPoints: [
    {
      text: String.raw`<strong>Réel ou financier ?</strong> Un actif réel produit (usine, brevet, formation) ; un actif
        financier est un <em>droit</em> sur les revenus d'un actif réel (action, obligation, billet de banque, option).
        Le succès d'un actif financier dépend de l'actif réel sous-jacent.`,
      exos: ["ex-classify"],
    },
    {
      text: String.raw`<strong>Trois fonctions des marchés financiers</strong> : lever du capital (marchés de capitaux),
        transférer le risque (marchés dérivés), commerce international (changes). Subdivisions : actions, obligations,
        monétaire (court terme), dérivés, changes. Rôles économiques : information, timing de consommation, allocation
        du risque, séparation propriété/gestion (problème d'agence).`,
    },
    {
      text: String.raw`<strong>Classes d'actifs.</strong> Monétaire $=$ court terme, liquide, peu risqué (T-bills, CD, CP,
        repo). Obligataire $=$ long terme (T-notes, T-bonds, TIPS, obligations d'entreprise callable ou convertible).
        Actions : vote, créancier résiduel, responsabilité limitée. Indices : DJIA pondéré par les prix (diviseur ajusté
        aux splits), S&amp;P 500 pondéré par la capitalisation.`,
      exos: ["ex-index"],
    },
    {
      text: String.raw`<strong>EMH : trois formes emboîtées.</strong> Faible (données de marché) $\Rightarrow$ l'analyse
        technique est inutile. Semi-forte (toute l'info publique) $\Rightarrow$ l'analyse fondamentale est inutile.
        Forte (info des initiés incluse). Marche aléatoire $=$ conséquence de la compétition, pas de l'irrationalité.`,
      exos: ["ex-emh"],
    },
    {
      text: String.raw`<strong>Tester l'EMH.</strong> Trois difficultés : ampleur, biais de sélection, coup de chance.
        Anomalies à connaître : momentum (court terme) et renversement (long terme), effet P/E, taille, firme négligée,
        liquidité, book-to-market (Fama-French), dérive post-annonce. Verdict : la plupart des gérants ne battent pas
        la gestion passive.`,
      exos: ["ex-emh"],
    },
    {
      text: String.raw`<strong>Options : vocabulaire et payoffs.</strong> Call $=$ droit d'acheter, put $=$ droit de vendre,
        au strike $K$ à l'échéance $T$. Payoffs $\max(S_T-K,0)$ et $\max(K-S_T,0)$ ; profit $=$ payoff $-$ prime.
        Européenne (à l'échéance seulement) contre américaine (à tout moment : il faut aussi décider quand exercer).
        Path-dependent : barrière, asiatique (moyenne), lookback (max ou min).`,
      exos: ["ex-payoffs", "ex-exotic"],
    },
    {
      text: String.raw`<strong>Forward contre futures.</strong> Même engagement (livrer l'actif au prix convenu, rien
        payé à l'entrée, contrairement à la prime d'une option), mais le futures est standardisé, négocié en bourse, avec
        appel de marge et <em>règlement quotidien</em> des gains et pertes ; le forward règle tout à l'échéance.`,
      exos: ["ex-forward-futures"],
    },
    {
      text: String.raw`<strong>Trois intervenants.</strong> Hedger : réduit un risque existant. Spéculateur : parie sur
        une direction. Arbitragiste : positions compensées pour un profit sans risque. Dans un marché sans « repas
        gratuit », les opportunités d'arbitrage disparaissent vite.`,
      exos: ["ex-arbitrage"],
    },
    {
      text: String.raw`<strong>Actualisation.</strong> $dM/M=r\,dt\Rightarrow M(t)=Ce^{rt}$ ; avec $M(T)=E$,
        $M(t)=E\,e^{-r(T-t)}$. Taux variable : $E\exp(-\int_t^T r)$. Discret : $(1+r/m)^{mT}$, limite $e^{rT}$ quand
        $m\to\infty$. Une obligation se valorise en actualisant chacun de ses flux (coupons et principal).`,
      exos: ["ex-pv", "ex-bonds"],
    },
  ],

  /* -------------------- FORMULAIRE -------------------- */
  formulas: [
    { name: "Payoff d'un call européen", note: "K = prix d'exercice, S_T = prix du sous-jacent à l'échéance", latex: String.raw`C_T=\max(S_T-K,\,0)=(S_T-K)^+` },
    { name: "Payoff d'un put européen", latex: String.raw`P_T=\max(K-S_T,\,0)=(K-S_T)^+` },
    { name: "Profit de l'acheteur d'option", note: "la prime est payée d'avance", latex: String.raw`\text{profit}=\text{payoff}-\text{prime}` },
    { name: "Croissance à taux continu", latex: String.raw`\frac{dM(t)}{M(t)}=r\,dt\quad\Longrightarrow\quad M(t)=C\,e^{rt}` },
    { name: "Valeur actuelle (taux constant)", note: "valeur en t de E reçu en T", latex: String.raw`M(t)=E\,e^{-r(T-t)}` },
    { name: "Valeur actuelle (taux déterministe)", latex: String.raw`M(t)=E\exp\Big(-\int_t^T r(\xi)\,d\xi\Big)` },
    { name: "Capitalisation m fois par an", note: "m = 1 annuelle, 2 semestrielle, 12 mensuelle", latex: String.raw`M(T)=M(0)\Big(1+\frac{r}{m}\Big)^{mT},\qquad \lim_{m\to\infty}\Big(1+\frac{r}{m}\Big)^{mT}=e^{rT}` },
    { name: "Valeur actuelle (capitalisation discrète)", latex: String.raw`M(0)=\frac{E}{(1+r/m)^{mT}}` },
    { name: "Prix d'une obligation zéro-coupon", note: "valeur faciale F, maturité T", latex: String.raw`B(0)=F\,e^{-rT}` },
    { name: "Prix d'une obligation à coupons", note: "coupons c aux dates t_i, principal F en T", latex: String.raw`B(0)=\sum_{i} c\,e^{-r t_i}+F\,e^{-rT}` },
    { name: "Indice pondéré par les prix", note: "type Dow Jones ; le diviseur d est ajusté lors d'un split", latex: String.raw`I=\frac{\sum_i P_i}{d}` },
    { name: "Indice pondéré par la capitalisation", note: "type S&P 500 ; rendement = variation de la capitalisation totale", latex: String.raw`\frac{I_1}{I_0}=\frac{\sum_i P_i^{(1)}N_i}{\sum_i P_i^{(0)}N_i}` },
    { name: "Hiérarchie des formes de l'EMH", latex: String.raw`\text{forte}\ \supset\ \text{semi-forte}\ \supset\ \text{faible}` },
    { name: "TED spread", note: "le cours l'écrit « Treasury rate − LIBOR » ; la convention usuelle est LIBOR − T-bill (positif en période de stress)", latex: String.raw`\text{TED}=r_{\text{LIBOR}}-r_{\text{T-bill}}` },
  ],

  /* -------------------- QCM -------------------- */
  qcm: [
    {
      q: String.raw`Lequel de ces actifs est un <strong>actif financier</strong> ?`,
      choices: [
        String.raw`Une usine d'assemblage automobile.`,
        String.raw`Un brevet détenu par une entreprise pharmaceutique.`,
        String.raw`Une action Samsung Electronics.`,
        String.raw`Une formation universitaire.`,
      ],
      answer: 2,
      explanation: String.raw`L'action est un <em>droit</em> sur les revenus produits par les actifs réels de Samsung. L'usine,
        le brevet et la formation (capital humain) contribuent directement à la capacité productive : ce sont des actifs réels.`,
    },
    {
      q: String.raw`Selon la forme <strong>semi-forte</strong> de l'EMH, les cours reflètent déjà…`,
      choices: [
        String.raw`uniquement les prix et volumes passés.`,
        String.raw`toute l'information publiquement disponible.`,
        String.raw`toute l'information, y compris celle des initiés.`,
        String.raw`aucune information : les cours sont purement aléatoires.`,
      ],
      answer: 1,
      explanation: String.raw`Faible $=$ données de marché ; semi-forte $=$ toute l'information publique (comptes, produits,
        management, prévisions) ; forte $=$ tout, initiés compris. La marche aléatoire ne signifie pas absence d'information,
        mais qu'elle est déjà dans les prix.`,
    },
    {
      q: String.raw`Quelle méthode est rendue inutile par la forme <strong>faible</strong> de l'EMH ?`,
      choices: [
        String.raw`L'analyse fondamentale des bilans.`,
        String.raw`L'analyse technique (chartisme).`,
        String.raw`La diversification du portefeuille.`,
        String.raw`Le suivi des transactions des initiés.`,
      ],
      answer: 1,
      explanation: String.raw`L'analyse technique cherche des motifs récurrents dans les prix passés ; si ceux-ci sont déjà
        reflétés dans les cours (forme faible), elle ne peut produire de rendement anormal. L'analyse fondamentale est visée
        par la forme semi-forte, les initiés par la forme forte.`,
    },
    {
      q: String.raw`Un <strong>call européen</strong> de strike $K$ et d'échéance $T$ donne à son détenteur…`,
      choices: [
        String.raw`l'obligation d'acheter le sous-jacent au prix $K$ à la date $T$.`,
        String.raw`le droit de vendre le sous-jacent au prix $K$ à tout moment avant $T$.`,
        String.raw`le droit d'acheter le sous-jacent au prix $K$ à la date $T$ seulement.`,
        String.raw`le droit d'acheter le sous-jacent au prix $K$ à tout moment avant $T$.`,
      ],
      answer: 2,
      explanation: String.raw`Call $=$ droit d'<em>acheter</em> ; européen $=$ exerçable <em>à l'échéance seulement</em>.
        Le droit d'acheter à tout moment est un call américain ; le droit de vendre est un put ; une obligation d'acheter
        est un forward.`,
    },
    {
      q: String.raw`Un put de strike $K=50$ arrive à échéance avec $S_T=40$. Son payoff vaut :`,
      choices: [String.raw`$0$`, String.raw`$10$`, String.raw`$40$`, String.raw`$-10$`],
      answer: 1,
      explanation: String.raw`$\max(K-S_T,0)=\max(50-40,0)=10$ : le détenteur vend à 50 un actif qui n'en vaut que 40.
        Un payoff n'est jamais négatif ; c'est le <em>profit</em> (payoff moins prime) qui peut l'être.`,
    },
    {
      q: String.raw`Laquelle de ces options est <strong>dépendante du chemin</strong> ?`,
      choices: [
        String.raw`Un call européen.`,
        String.raw`Un put européen.`,
        String.raw`Une option asiatique.`,
        String.raw`Un forward.`,
      ],
      answer: 2,
      explanation: String.raw`Le payoff d'une option asiatique dépend d'une <em>moyenne</em> du prix sur la vie du contrat,
        donc de toute la trajectoire. Les options européennes et le forward ne dépendent que de $S_T$. Barrière et lookback
        sont les deux autres familles path-dependent.`,
    },
    {
      q: String.raw`Quelle affirmation est vraie pour un <strong>futures</strong> mais fausse pour un <strong>forward</strong> ?`,
      choices: [
        String.raw`L'actif doit être livré et payé à l'échéance.`,
        String.raw`Aucune prime n'est versée à la signature.`,
        String.raw`Les gains et pertes sont réglés chaque jour (appel de marge).`,
        String.raw`Le prix de livraison est fixé à l'avance.`,
      ],
      answer: 2,
      explanation: String.raw`Les deux contrats fixent un prix de livraison, n'exigent aucune prime et engagent à livrer.
        La différence tient à la standardisation en bourse, au dépôt de garantie et au <em>règlement quotidien</em> du
        futures ; le forward ne réalise le gain ou la perte qu'à l'échéance.`,
    },
    {
      q: String.raw`Un intervenant achète un actif sur une place où il cote 100 € et le revend simultanément 101 € sur une autre
        place. C'est un…`,
      choices: [String.raw`hedger.`, String.raw`spéculateur.`, String.raw`arbitragiste.`, String.raw`intermédiaire financier.`],
      answer: 2,
      explanation: String.raw`Positions compensées sur deux instruments (ou deux marchés) pour verrouiller un profit sans
        risque : c'est la définition de l'arbitrage. Le hedger réduit un risque existant, le spéculateur prend un pari
        directionnel.`,
    },
    {
      q: String.raw`À taux continu constant $r$, la valeur actuelle en $t$ d'un montant certain $E$ reçu en $T$ est :`,
      choices: [
        String.raw`$E\,e^{r(T-t)}$`,
        String.raw`$E\,e^{-r(T-t)}$`,
        String.raw`$E\,(1-r(T-t))$`,
        String.raw`$E/(1+r)^{T}$`,
      ],
      answer: 1,
      explanation: String.raw`De $dM/M=r\,dt$ on tire $M(t)=Ce^{rt}$, et $M(T)=E$ donne $M(t)=Ee^{-r(T-t)}$. La première
        réponse capitalise au lieu d'actualiser ; la dernière est la formule de capitalisation annuelle (avec $t=0$),
        pas continue.`,
    },
    {
      q: String.raw`Un montant est placé à 6 % nominal pendant un an. Quel mode de capitalisation donne le capital final le plus élevé ?`,
      choices: [String.raw`Annuelle.`, String.raw`Semestrielle.`, String.raw`Mensuelle.`, String.raw`Continue.`],
      answer: 3,
      explanation: String.raw`$(1+r/m)^{m}$ croît avec $m$ et tend vers $e^{r}$ : $1{,}06 \lt 1{,}03^2=1{,}0609 \lt
        (1+0{,}005)^{12}\approx 1{,}0617 \lt e^{0{,}06}\approx 1{,}0618$. La capitalisation continue est la limite.`,
    },
    {
      q: String.raw`Une obligation <strong>zéro-coupon</strong>…`,
      choices: [
        String.raw`ne verse rien, même à maturité.`,
        String.raw`verse uniquement sa valeur faciale à maturité.`,
        String.raw`verse des coupons mais pas de principal.`,
        String.raw`est un produit dérivé sur les taux.`,
      ],
      answer: 1,
      explanation: String.raw`Une obligation verse un montant connu (valeur faciale) à une date connue (maturité), et
        éventuellement des coupons entre-temps. Sans coupon, seul le principal est versé : l'obligation se vend donc en
        dessous de sa valeur faciale, à $F e^{-rT}$.`,
    },
    {
      q: String.raw`Quel indice est <strong>pondéré par les prix</strong> ?`,
      choices: [String.raw`S&amp;P 500`, String.raw`Dow Jones Industrial Average`, String.raw`Kospi 200`, String.raw`Un ETF indiciel`],
      answer: 1,
      explanation: String.raw`Le DJIA est la moyenne des prix de 30 valeurs : il surpondère les actions chères et doit
        ajuster son diviseur lors d'un split. Le S&amp;P 500 est pondéré par la capitalisation boursière, ce qui le rend
        insensible aux splits.`,
    },
    {
      q: String.raw`Lequel de ces titres relève du <strong>marché monétaire</strong> ?`,
      choices: [String.raw`Un bon du Trésor à 13 semaines.`, String.raw`Une obligation d'État à 30 ans.`, String.raw`Une action ordinaire.`, String.raw`Une obligation convertible.`],
      answer: 0,
      explanation: String.raw`Le marché monétaire regroupe la dette à court terme, liquide et peu risquée : T-bills, CD,
        billets de trésorerie, repo. Obligations à long terme, actions et convertibles relèvent des marchés de capitaux.`,
    },
    {
      q: String.raw`L'<strong>effet momentum</strong> (Jegadeesh et Titman 1993) désigne…`,
      choices: [
        String.raw`la persistance à court terme des bonnes ou mauvaises performances récentes.`,
        String.raw`la surperformance à long terme des titres qui ont le plus baissé.`,
        String.raw`la réaction lente des cours aux annonces de résultats.`,
        String.raw`le rendement supérieur des petites capitalisations.`,
      ],
      answer: 0,
      explanation: String.raw`Le momentum est une anomalie de forme faible sur horizon court. Le renversement (DeBondt et
        Thaler) est son pendant à long terme ; la dérive post-annonce (Ball et Brown) et l'effet taille (Banz) sont des
        anomalies de forme semi-forte.`,
    },
    {
      q: String.raw`Le <strong>biais de sélection</strong> dans les tests de l'EMH signifie que…`,
      choices: [
        String.raw`les gérants choisissent seulement les meilleurs titres.`,
        String.raw`on n'observe que les stratégies qui ont échoué, les gagnantes restant secrètes.`,
        String.raw`les investisseurs chanceux sont pris pour des experts.`,
        String.raw`une amélioration de 0,1 % par an est indétectable statistiquement.`,
      ],
      answer: 1,
      explanation: String.raw`Une stratégie qui rapporte n'est pas publiée : les résultats observables sont présélectionnés
        parmi les échecs, ce qui empêche d'évaluer la vraie capacité des gérants. Les deux dernières réponses décrivent le
        problème du coup de chance et celui de l'ampleur.`,
    },
  ],

  /* -------------------- EXERCICES -------------------- */
  exos: [
    {
      id: "ex-classify",
      title: "Actif réel ou actif financier ?",
      difficulty: "facile",
      tags: ["actifs", "définitions"],
      statement: String.raw`<p>Classer chacun des éléments suivants en actif réel ou actif financier, en justifiant :</p>
        <p>(a) un brevet ; (b) une formation universitaire ; (c) un billet de 10 € ; (d) une usine ; (e) une obligation
        d'État ; (f) une action de préférence ; (g) un contrat futures sur le pétrole.</p>`,
      solution: String.raw`
        <p>Le critère : un actif <strong>réel</strong> contribue directement à la capacité de production ; un actif
        <strong>financier</strong> est un droit sur les revenus produits par des actifs réels (ou par l'État).</p>
        <ul>
          <li><strong>(a) Brevet : réel.</strong> C'est de la connaissance protégée qui permet de produire (le cours cite
              explicitement les brevets parmi les actifs réels).</li>
          <li><strong>(b) Formation universitaire : réel.</strong> Du capital humain, qui accroît la productivité de la
              personne.</li>
          <li><strong>(c) Billet de 10 € : financier.</strong> Il ne produit rien par lui-même ; c'est une créance sur la
              banque centrale, un droit sur des biens et services futurs.</li>
          <li><strong>(d) Usine : réel.</strong> Capacité productive au sens le plus direct.</li>
          <li><strong>(e) Obligation d'État : financier.</strong> Titre à revenu fixe, créance sur l'État.</li>
          <li><strong>(f) Action de préférence : financier.</strong> Titre hybride entre action et obligation, droit
              prioritaire sur les dividendes de l'entreprise.</li>
          <li><strong>(g) Futures sur le pétrole : financier.</strong> Produit dérivé dont la valeur dépend du prix d'un
              actif réel (le pétrole) ; le contrat lui-même n'est qu'un engagement entre deux parties.</li>
        </ul>`,
    },
    {
      id: "ex-payoffs",
      title: "Payoffs et profits d'un call et d'un put",
      difficulty: "facile",
      tags: ["options", "payoff"],
      statement: String.raw`<p>Un call européen et un put européen sur la même action ont tous deux un strike $K=100$ € et
        la même échéance $T$. Le call coûte 8 €, le put 5 €.</p>
        <p>(a) Donner le payoff et le profit de l'<em>acheteur</em> du call, puis de l'acheteur du put, si à l'échéance
        $S_T=80$, $100$ ou $120$ €. (b) Pour quel $S_T$ l'acheteur du call est-il à l'équilibre (profit nul) ? Même
        question pour le put. (c) Quel est le profit maximal et la perte maximale de l'acheteur du put ? Du
        <em>vendeur</em> du put ?</p>`,
      hints: [String.raw`Payoff du call $=\max(S_T-K,0)$, du put $=\max(K-S_T,0)$ ; profit $=$ payoff $-$ prime, la prime étant payée d'avance quoi qu'il arrive.`],
      solution: String.raw`
        <p><strong>(a)</strong> Le payoff est ce que rapporte l'exercice ; le profit retranche la prime payée à l'origine.</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>$S_T$</th><th>Payoff call</th><th>Profit call</th><th>Payoff put</th><th>Profit put</th></tr></thead>
          <tbody>
            <tr><td>80</td><td>$\max(80-100,0)=0$</td><td>$0-8=-8$</td><td>$\max(100-80,0)=20$</td><td>$20-5=15$</td></tr>
            <tr><td>100</td><td>$0$</td><td>$-8$</td><td>$0$</td><td>$-5$</td></tr>
            <tr><td>120</td><td>$20$</td><td>$12$</td><td>$0$</td><td>$-5$</td></tr>
          </tbody></table></div>
        <p><strong>(b)</strong> Call : profit nul quand $S_T-K=8$, soit $S_T=108$ €. Put : $K-S_T=5$, soit $S_T=95$ €.
        L'acheteur d'un call gagne si l'action monte <em>au-delà</em> du strike plus la prime ; l'acheteur d'un put gagne si
        elle descend en dessous du strike moins la prime.</p>
        <p><strong>(c)</strong> Acheteur du put : perte maximale $=$ la prime, 5 € (si $S_T\ge 100$) ; profit maximal si
        l'action tombe à 0 : $100-5=95$ €. Le vendeur du put a la position exactement opposée : gain maximal 5 € (il
        garde la prime), perte maximale 95 €. C'est pourquoi le vendeur, qui a une <em>obligation</em> et non un droit,
        doit se poser la question de la couverture.</p>`,
    },
    {
      id: "ex-pv",
      title: "Valeur actuelle et modes de capitalisation",
      difficulty: "moyen",
      tags: ["actualisation", "taux d'intérêt"],
      statement: String.raw`<p>On souhaite recevoir avec certitude $E=10\,000$ € dans $T=5$ ans. Le taux nominal annuel est
        $r=4\,\%$.</p>
        <p>(a) Combien faut-il placer aujourd'hui avec une capitalisation continue ? (b) Même question avec une
        capitalisation annuelle, semestrielle, mensuelle. Commenter l'ordre des résultats. (c) Retrouver la formule
        $M(t)=Ee^{-r(T-t)}$ à partir de l'équation $dM/M=r\,dt$. (d) Le taux n'est plus constant mais vaut
        $r(t)=0{,}03+0{,}01\,t$ (en années). Quelle est la valeur actuelle de $E$ ?</p>`,
      hints: [
        String.raw`(b) Avec $m$ capitalisations par an, la valeur actuelle est $E/(1+r/m)^{mT}$.`,
        String.raw`(d) Remplacer $r(T-t)$ par $\int_0^T r(\xi)\,d\xi$.`,
      ],
      solution: String.raw`
        <p><strong>(a)</strong> $M(0)=E\,e^{-rT}=10\,000\,e^{-0{,}2}\approx 8\,187{,}31$ €.</p>
        <p><strong>(b)</strong> Avec $m$ capitalisations par an, $M(0)=E/(1+r/m)^{mT}$ :</p>
        <ul>
          <li>annuelle ($m=1$) : $10\,000/1{,}04^{5}\approx 8\,219{,}27$ € ;</li>
          <li>semestrielle ($m=2$) : $10\,000/1{,}02^{10}\approx 8\,203{,}48$ € ;</li>
          <li>mensuelle ($m=12$) : $10\,000/(1+0{,}04/12)^{60}\approx 8\,190{,}03$ €.</li>
        </ul>
        <p>Plus la capitalisation est fréquente, plus le placement fructifie vite, donc <em>moins</em> il faut placer
        aujourd'hui : annuelle $>$ semestrielle $>$ mensuelle $>$ continue. La capitalisation continue est la limite
        $m\to\infty$, car $(1+r/m)^{mT}\to e^{rT}$.</p>
        <p><strong>(c)</strong> $dM/M=r\,dt$ s'intègre en $\ln M(t)=rt+\text{cste}$, soit $M(t)=Ce^{rt}$. La condition
        terminale $M(T)=E$ donne $C=Ee^{-rT}$, d'où $M(t)=Ee^{rt}e^{-rT}=Ee^{-r(T-t)}$.</p>
        <p><strong>(d)</strong> $\int_0^5(0{,}03+0{,}01\,\xi)\,d\xi=0{,}03\times 5+0{,}01\times\frac{25}{2}=0{,}275$, donc
        $M(0)=10\,000\,e^{-0{,}275}\approx 7\,595{,}72$ €. Le taux moyen sur la période est $0{,}275/5=5{,}5\,\%$, plus
        élevé que 4 %, d'où une valeur actuelle plus faible qu'en (a).</p>`,
    },
    {
      id: "ex-bonds",
      title: "Prix d'une obligation zéro-coupon et d'une obligation à coupons",
      difficulty: "moyen",
      tags: ["obligations", "actualisation"],
      statement: String.raw`<p>Le taux continu est $r=5\,\%$ constant.</p>
        <p>(a) Quel est le prix aujourd'hui d'une obligation zéro-coupon de valeur faciale 1 000 € et de maturité 3 ans ?
        (b) Quel est le prix d'une obligation de même valeur faciale et même maturité, qui verse en plus un coupon annuel
        de 5 % (soit 50 €) à la fin de chaque année ? (c) Pourquoi la seconde vaut-elle presque exactement sa valeur
        faciale ? (d) En quoi ces obligations diffèrent-elles d'un produit dérivé ?</p>`,
      solution: String.raw`
        <p><strong>(a)</strong> Un seul flux, actualisé : $B=1\,000\,e^{-0{,}05\times 3}=1\,000\,e^{-0{,}15}\approx 860{,}71$ €.
        L'obligation se vend en dessous du pair, la différence étant l'intérêt gagné.</p>
        <p><strong>(b)</strong> Chaque flux est actualisé à sa propre date :</p>
        <p>$$B=50\,e^{-0{,}05}+50\,e^{-0{,}10}+1\,050\,e^{-0{,}15}\approx 47{,}56+45{,}24+903{,}74=996{,}55\ \text{€}.$$</p>
        <p><strong>(c)</strong> Le coupon (5 % annuel) est presque égal au taux d'actualisation ; si le taux de 5 % était
        composé annuellement au lieu de continûment, le prix serait exactement 1 000 €. Le petit écart vient de ce que
        $e^{0{,}05}\approx 1{,}0513 \gt 1{,}05$ : le taux continu de 5 % est un peu plus « fort » qu'un taux annuel de 5 %,
        donc l'obligation vaut un peu moins que le pair.</p>
        <p><strong>(d)</strong> Les flux de l'obligation sont fixés par contrat (montants et dates connus) ; sa valeur ne
        dépend que des taux d'actualisation. Un dérivé, lui, a un paiement <em>dérivé</em> du prix d'un autre actif (le
        sous-jacent) : son payoff est incertain et c'est ce qui en fait un outil de transfert de risque.</p>`,
    },
    {
      id: "ex-forward-futures",
      title: "Forward contre futures : règlement quotidien",
      difficulty: "moyen",
      tags: ["forward", "futures", "appel de marge"],
      statement: String.raw`<p>Lundi matin, un investisseur prend une position <em>longue</em> (achat) sur un actif pour livraison
        jeudi soir, au prix convenu de 100 €. Le prix de règlement de l'actif est de 102 € lundi soir, 99 € mardi soir,
        103 € mercredi soir et 105 € jeudi soir (prix à la livraison).</p>
        <p>(a) Si le contrat est un <strong>forward</strong>, quels sont les flux de trésorerie de l'investisseur chaque jour ?
        Quel est son gain total ? (b) Si le contrat est un <strong>futures</strong> (réévalué chaque soir au prix de
        règlement), quels sont les flux quotidiens ? Le gain total ? (c) Quel avantage le mécanisme du futures apporte-t-il
        à la bourse et aux deux parties ? (d) Citer les deux différences entre un forward et une option.</p>`,
      hints: [String.raw`Avec un futures, chaque soir l'investisseur reçoit (ou paie) la variation du prix de règlement depuis la veille, comme si le contrat était renégocié au nouveau prix.`],
      solution: String.raw`
        <p><strong>(a) Forward.</strong> Aucun argent ne change de mains avant la livraison : lundi, mardi, mercredi, flux
        nuls. Jeudi, l'investisseur paie 100 € et reçoit un actif valant 105 € : gain de $105-100=5$ €, réalisé en une fois à
        l'échéance.</p>
        <p><strong>(b) Futures.</strong> Le contrat est réévalué chaque jour et la variation est réglée via le compte de marge :</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>Jour</th><th>Prix de règlement</th><th>Variation</th><th>Flux pour la position longue</th></tr></thead>
          <tbody>
            <tr><td>Lundi</td><td>102</td><td>$102-100=+2$</td><td>$+2$ €</td></tr>
            <tr><td>Mardi</td><td>99</td><td>$99-102=-3$</td><td>$-3$ €</td></tr>
            <tr><td>Mercredi</td><td>103</td><td>$103-99=+4$</td><td>$+4$ €</td></tr>
            <tr><td>Jeudi</td><td>105</td><td>$105-103=+2$</td><td>$+2$ €</td></tr>
          </tbody></table></div>
        <p>Total : $2-3+4+2=5$ €, le même gain qu'avec le forward (en négligeant les intérêts sur les flux intermédiaires),
        mais étalé jour par jour.</p>
        <p><strong>(c)</strong> Le règlement quotidien et le dépôt de garantie (marge) limitent l'exposition au défaut : à
        tout moment, la dette de chaque partie envers l'autre n'est que la variation d'un jour, couverte par la marge. C'est
        ce qui permet de négocier des contrats standardisés en bourse entre inconnus, alors qu'un forward suppose la confiance
        entre deux parties identifiées.</p>
        <p><strong>(d)</strong> Dans un forward, l'actif <em>doit</em> être livré et payé (pas de choix d'exercice), et
        aucun argent n'est versé à la signature, alors que l'acheteur d'une option paie une prime d'avance et n'exerce que
        si c'est avantageux.</p>`,
    },
    {
      id: "ex-emh",
      title: "Quelle forme de l'EMH est en jeu ?",
      difficulty: "moyen",
      tags: ["EMH", "efficience", "anomalies"],
      statement: String.raw`<p>Pour chaque situation, dire si elle est <em>compatible</em> avec l'EMH ou si elle
        <em>contredit</em> une forme précise (faible, semi-forte, forte), et laquelle.</p>
        <p>(a) Un chartiste gagne régulièrement des rendements anormaux en achetant dès qu'un cours franchit son
        « niveau de résistance ». (b) Le cours d'une société cible bondit le jour de l'annonce d'une OPA, puis reste
        stable les semaines suivantes. (c) Un analyste obtient des rendements anormaux en achetant les titres à faible
        ratio cours/bénéfice publié. (d) Un directeur financier achète des actions de sa société une semaine avant la
        publication de résultats exceptionnels et réalise un gain important. (e) Sur 5 000 gérants, une dizaine ont
        battu l'indice dix années de suite. (f) Un fonds indiciel passif fait mieux que 80 % des fonds actifs sur dix ans.</p>`,
      solution: String.raw`
        <p><strong>(a) Contredit la forme faible.</strong> Les niveaux de résistance ne reposent que sur les prix passés ;
        s'ils permettaient de gagner, les données de marché ne seraient pas entièrement reflétées dans les cours.</p>
        <p><strong>(b) Compatible.</strong> C'est même le comportement attendu : le prix intègre l'information publique
        <em>immédiatement</em> à l'annonce, sans dérive ultérieure (figure des rendements anormaux cumulés avant OPA).</p>
        <p><strong>(c) Contredit la forme semi-forte.</strong> Le PER est une donnée comptable publique ; c'est l'effet
        P/E de Basu (1977), une anomalie de forme semi-forte. Réserve : il faut vérifier que le rendement reste anormal
        après ajustement du risque (bêta), ce qui, selon Basu, est le cas.</p>
        <p><strong>(d) Contredit la forme forte</strong>, mais pas les formes faible ou semi-forte : l'information n'était
        pas publique. On ne s'attend d'ailleurs pas à ce que la forme forte tienne, et ce type de transaction est
        réglementé (règle 10b-5 de la SEC).</p>
        <p><strong>(e) Compatible</strong>, a priori : c'est le problème du <em>coup de chance</em>. Si chaque année un
        gérant a une chance sur deux de battre l'indice, on attend $5\,000/2^{10}\approx 5$ gérants avec dix succès
        consécutifs par pur hasard. Il faudrait vérifier que leur performance se répète (Carhart 1997 : elle ne le fait
        presque jamais).</p>
        <p><strong>(f) Compatible.</strong> C'est précisément la prédiction de l'EMH : la gestion active coûte des frais
        sans apporter de rendement anormal en moyenne, donc la gestion passive fait mieux que la majorité des fonds actifs.</p>`,
    },
    {
      id: "ex-index",
      title: "Indice pondéré par les prix ou par la capitalisation",
      difficulty: "moyen",
      tags: ["indices", "actions"],
      statement: String.raw`<p>Un indice est construit sur trois actions :</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>Action</th><th>Prix jour 0</th><th>Prix jour 1</th><th>Nombre d'actions (millions)</th></tr></thead>
          <tbody>
            <tr><td>A</td><td>100</td><td>110</td><td>1</td></tr>
            <tr><td>B</td><td>50</td><td>45</td><td>4</td></tr>
            <tr><td>C</td><td>20</td><td>22</td><td>10</td></tr>
          </tbody></table></div>
        <p>(a) Calculer le rendement de l'indice entre le jour 0 et le jour 1 s'il est pondéré par les <em>prix</em> (type
        Dow Jones, diviseur initial $d=3$). (b) Même question s'il est pondéré par la <em>capitalisation</em> (type
        S&amp;P 500). Expliquer la différence. (c) Le jour 1 après clôture, l'action A est divisée par deux (split 2 pour 1 :
        son prix passe à 55). Quel nouveau diviseur $d$ garantit que l'indice pondéré par les prix ne saute pas ?
        (d) Que se passe-t-il pour l'indice pondéré par la capitalisation lors de ce split ?</p>`,
      hints: [String.raw`Indice pondéré par les prix : $I=\sum_i P_i/d$. Indice pondéré par la capitalisation : son rendement est celui de la capitalisation totale $\sum_i P_iN_i$.`],
      solution: String.raw`
        <p><strong>(a)</strong> $I_0=(100+50+20)/3=170/3\approx 56{,}67$ et $I_1=(110+45+22)/3=177/3=59$. Rendement :
        $177/170-1\approx +4{,}12\,\%$.</p>
        <p><strong>(b)</strong> Capitalisation jour 0 : $100\times 1+50\times 4+20\times 10=500$ millions. Jour 1 :
        $110\times 1+45\times 4+22\times 10=510$ millions. Rendement : $510/500-1=+2\,\%$.</p>
        <p>L'écart vient de la pondération. Dans l'indice par les prix, A (action chère) pèse $100/170\approx 59\,\%$ alors
        qu'elle ne représente que 20 % de la capitalisation ; sa hausse de 10 % tire l'indice. Dans l'indice par la
        capitalisation, B et C pèsent chacune 40 % et la baisse de B compense en partie.</p>
        <p><strong>(c)</strong> Après le split, la somme des prix est $55+45+22=122$ au lieu de 177 alors que rien n'a changé
        économiquement. On choisit $d$ tel que $122/d=59$, soit $d=122/59\approx 2{,}068$. C'est ainsi que le diviseur du
        Dow Jones, initialement égal au nombre de valeurs, a diminué au fil des splits.</p>
        <p><strong>(d)</strong> Rien : A compte désormais 2 millions d'actions à 55, soit toujours 110 millions de
        capitalisation. L'indice pondéré par la capitalisation est insensible aux splits, ce qui est l'une des raisons pour
        lesquelles le S&amp;P 500 est jugé meilleur que le DJIA et facile à répliquer par un fonds indiciel.</p>`,
    },
    {
      id: "ex-exotic",
      title: "Options dépendantes du chemin sur une trajectoire donnée",
      difficulty: "difficile",
      tags: ["options", "path-dependent", "barrière", "asiatique", "lookback"],
      statement: String.raw`<p>Le prix d'une action est observé à cinq dates $t=0,1,2,3,4$ (l'échéance est $T=4$) :</p>
        <p>$$S_0=100,\quad S_1=95,\quad S_2=105,\quad S_3=110,\quad S_4=90.$$</p>
        <p>Toutes les options ci-dessous ont un strike $K=100$ (sauf mention contraire) et l'échéance $T=4$. Calculer le
        payoff de chacune :</p>
        <p>(a) call européen ; put européen. (b) call asiatique et put asiatique, dont le payoff utilise la moyenne
        arithmétique $\bar S=\frac14(S_1+S_2+S_3+S_4)$ à la place de $S_T$. (c) call lookback à strike fixe, de payoff
        $\max(S_{\max}-K,0)$ ; put lookback à strike flottant, de payoff $S_{\max}-S_T$. (d) call à barrière
        désactivante « up-and-out » de barrière $H=108$ ; put à barrière activante « down-and-in » de barrière $H=92$.
        (e) Un put <em>américain</em> de strike 100 aurait-il pu faire mieux que le put européen ? À quelles dates
        aurait-on pu l'exercer avec profit ?</p>`,
      hints: [
        String.raw`Une option « out » meurt (payoff nul) dès que la barrière est touchée ; une option « in » ne naît que si la barrière est touchée.`,
        String.raw`Repérer d'abord $S_{\max}$, $S_{\min}$ et $\bar S$ sur la trajectoire.`,
      ],
      solution: String.raw`
        <p>Sur la trajectoire : $S_{\max}=110$ (en $t=3$), $S_{\min}=90$ (en $t=4$), $\bar S=(95+105+110+90)/4=100$.</p>
        <p><strong>(a) Européennes</strong> : seul $S_T=90$ compte. Call : $\max(90-100,0)=0$. Put : $\max(100-90,0)=10$.</p>
        <p><strong>(b) Asiatiques</strong> : on remplace $S_T$ par $\bar S=100$. Call : $\max(100-100,0)=0$ ; put :
        $\max(100-100,0)=0$. La moyenne lisse la chute finale : le put asiatique ne rapporte rien alors que le put européen
        rapporte 10. Les options asiatiques sont ainsi moins chères et moins manipulables par un mouvement de dernière
        minute.</p>
        <p><strong>(c) Lookback</strong>. Call à strike fixe : $\max(S_{\max}-K,0)=\max(110-100,0)=10$, alors que le call
        européen vaut 0 : l'option « se souvient » du sommet. Put à strike flottant : $S_{\max}-S_T=110-90=20$, c'est le
        gain de qui aurait vendu au plus haut et racheté à l'échéance. Ces options sont les plus chères de la famille.</p>
        <p><strong>(d) Barrières</strong>. Call up-and-out ($H=108$) : la barrière est franchie en $t=3$ ($S_3=110\ge 108$),
        l'option est désactivée, payoff $0$ (il l'aurait de toute façon été puisque $S_T\lt K$). Put down-and-in
        ($H=92$) : la barrière est touchée en $t=4$ ($S_4=90\le 92$), l'option est activée et vaut comme un put européen :
        $\max(100-90,0)=10$. Si la trajectoire s'était arrêtée à 93, le put down-and-in n'aurait jamais existé et aurait
        rapporté 0 malgré $S_T\lt K$.</p>
        <p><strong>(e) Put américain</strong>. Il aurait pu être exercé à toute date où $S_t\lt 100$ : en $t=1$ pour
        $100-95=5$, ou en $t=4$ pour $10$. Sur cette trajectoire, attendre l'échéance était optimal (10 $\gt$ 5), donc le
        put américain rapporte autant que l'européen, mais pas moins : le droit d'exercer à tout moment ne peut que
        valoir plus ou autant. La difficulté propre aux options américaines est que la décision d'exercice doit être prise
        <em>sans connaître la suite</em> de la trajectoire.</p>`,
    },
    {
      id: "ex-arbitrage",
      title: "Hedger, spéculateur, arbitragiste",
      difficulty: "difficile",
      tags: ["traders", "arbitrage", "forward", "actualisation"],
      statement: String.raw`<p>(a) Identifier le type d'intervenant dans chaque cas : (i) une compagnie aérienne achète des
        futures sur le kérosène pour fixer son coût de carburant ; (ii) un trader achète des calls sur un indice parce qu'il
        anticipe une hausse ; (iii) un fonds achète une action à Séoul et la vend au même instant plus cher à New York ;
        (iv) un exportateur vend à terme les dollars qu'il recevra dans trois mois.</p>
        <p>(b) Une action ne verse pas de dividende et cote $S_0=50$ €. Le taux continu sans risque est $r=5\,\%$. Un
        contrat forward de maturité un an sur cette action est proposé au prix $F=54$ €. Montrer qu'un arbitragiste peut
        verrouiller un profit sans risque, décrire précisément les opérations et calculer le profit à l'échéance.
        (c) Quel prix forward $F^*$ éliminerait l'arbitrage ? Que se passe-t-il si $F \lt F^*$ ?</p>`,
      hints: [
        String.raw`(b) Comparer le prix forward au coût de « fabriquer » soi-même la livraison : emprunter, acheter l'action aujourd'hui, la garder un an.`,
        String.raw`Emprunter $S_0$ à taux continu $r$ pendant $T$ coûte $S_0e^{rT}$ à rembourser.`,
      ],
      solution: String.raw`
        <p><strong>(a)</strong> (i) <em>Hedger</em> : la compagnie réduit un risque qu'elle subit déjà (prix du carburant).
        (ii) <em>Spéculateur</em> : pari directionnel sur la hausse, sans position à couvrir. (iii) <em>Arbitragiste</em> :
        positions compensées sur deux marchés, profit sans risque. (iv) <em>Hedger</em> : l'exportateur fixe aujourd'hui le
        taux de change de recettes futures.</p>
        <p><strong>(b)</strong> Stratégie en $t=0$ : emprunter 50 € à 5 % continu, acheter l'action, et prendre une
        position <em>courte</em> (vente) sur le forward à 54 €. Aucun flux net aujourd'hui. En $T=1$ : livrer l'action au
        titre du forward et encaisser 54 € ; rembourser l'emprunt, $50\,e^{0{,}05}\approx 52{,}56$ €. Profit certain :</p>
        <p>$$54-50\,e^{0{,}05}\approx 54-52{,}56=1{,}44\ \text{€},$$</p>
        <p>quel que soit le prix de l'action dans un an, puisque l'action est déjà en main et son prix de vente fixé.</p>
        <p><strong>(c)</strong> L'arbitrage disparaît quand le prix forward égale le coût de portage :
        $F^*=S_0e^{rT}=50\,e^{0{,}05}\approx 52{,}56$ €. Si $F\lt F^*$, on inverse : vendre l'action à découvert, placer
        les 50 € à 5 %, et acheter le forward ; en $T$ on récupère $52{,}56$ €, on paie $F$ pour recevoir l'action et l'on
        rend l'action empruntée, profit $F^*-F \gt 0$. Dans un marché concurrentiel (« pas de repas gratuit »), la
        pression des arbitragistes ramène $F$ vers $F^*$ : c'est la logique de valorisation par absence d'arbitrage qui
        sera aussi celle des options.</p>`,
    },
  ],
});
