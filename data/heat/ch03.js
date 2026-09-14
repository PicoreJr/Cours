/* ============================================================
   Heat Transfer — Chapitre 3 : Conduction 1D stationnaire et ailettes
   Source : Supplementary Lecture Notes, cours 5 (1D steady conduction)
   et 6 (Extended surfaces), avec renvois à Incropera (tables 3.3, 3.4).
   Contenu rédigé pour la révision — à relire et valider.
   NB : LaTeX en String.raw, jamais la séquence ${ }, « &lt; » pour « < ».
   ============================================================ */
addChapter("heat", {
  id: "ch03",
  title: "Chapitre 3 — Conduction 1D stationnaire et ailettes",
  short: "Ch. 3",
  lang: "fr",

  /* -------------------- RÉSUMÉ DE COURS -------------------- */
  summary: String.raw`
    <h3>1. Mur plan : profil linéaire</h3>
    <p>En régime permanent 1D, l'équation se réduit à $\frac{d}{dx}\big(k\frac{dT}{dx}\big)=0$, et à $d^2T/dx^2=0$ si $k$ est constant. Avec
    $T(0)=T_1$ et $T(L)=T_2$ :</p>
    <p>$$T(x)=T_1+(T_2-T_1)\frac xL,\qquad q=-kA\frac{dT}{dx}=kA\,\frac{T_1-T_2}{L}.$$</p>
    <p>Le profil est linéaire et le taux est proportionnel à $\Delta T$ et inversement proportionnel à $L/kA$. Remarque : quand les deux
    températures sont imposées, le <em>profil</em> ne dépend pas du matériau ; seul le flux en dépend.</p>
    <p><strong>Mur composite</strong> (deux couches $k_a=1$ et $k_b=2$, $T_1=100$, $T_2=0$) : le flux est le même dans les deux couches
    ($q=\text{cste}$), donc le gradient est plus <em>faible</em> dans la couche la plus conductrice. La température est plus uniforme là où
    $k$ est grand. On traite chaque couche séparément et on raccorde par la continuité de $T$ et du flux à l'interface
    (ici $T_s=33{,}3$ °C).</p>

    <h3>2. Résistance thermique et analogie électrique</h3>
    <p>La relation $q=\Delta T/(L/kA)$ ressemble à la loi d'Ohm $i=\Delta V/R$ : la chaleur joue le rôle du courant, la température celui du
    potentiel. On définit la <strong>résistance thermique</strong> et le <strong>coefficient global d'échange</strong> $U$ :</p>
    <p>$$R_t\equiv\frac{\Delta T}{q}\ [\text{K/W}],\qquad q=\frac{T_{\infty,1}-T_{\infty,2}}{R_\text{tot}}=UA\,\Delta T,\qquad UA=\frac1{R_\text{tot}}.$$</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Élément</th><th>Résistance</th></tr></thead>
      <tbody>
        <tr><td>Mur plan (conduction)</td><td>$R=\dfrac{L}{kA}$</td></tr>
        <tr><td>Cylindre creux, longueur $L$</td><td>$R=\dfrac{\ln(r_2/r_1)}{2\pi Lk}$</td></tr>
        <tr><td>Sphère creuse</td><td>$R=\dfrac{1}{4\pi k}\Big(\dfrac1{r_1}-\dfrac1{r_2}\Big)$</td></tr>
        <tr><td>Convection</td><td>$R=\dfrac1{hA}$</td></tr>
        <tr><td>Contact entre deux solides</td><td>$R''_{t,c}=\dfrac{T_A-T_B}{q''_x}$ (par unité de surface)</td></tr>
        <tr><td>Rayonnement</td><td>$R=\dfrac1{h_rA}$</td></tr>
      </tbody></table></div>
    <p>Les résistances en <strong>série</strong> s'ajoutent (couches successives traversées par le même flux) ; en <strong>parallèle</strong>, on
    ajoute leurs inverses (chemins côte à côte soumis au même $\Delta T$). On en déduit les températures intermédiaires en « descendant » le
    circuit : $T_{i+1}=T_i-qR_i$.</p>
    <p><strong>Cylindre</strong> : $\frac1r\frac{d}{dr}\big(kr\frac{dT}{dr}\big)=0$ donne un profil <em>logarithmique</em> et
    $q_r=-k(2\pi rL)\frac{dT}{dr}=\dfrac{2\pi Lk(T_1-T_2)}{\ln(r_2/r_1)}$, <em>constant</em> en $r$ alors que le flux $q''_r$ diminue
    comme $1/r$.</p>
    <div class="callout"><strong>Rayon critique d'isolation.</strong>
      <p>Autour d'un cylindre, ajouter un isolant augmente la résistance de conduction $\ln(r_2/r_1)/2\pi Lk$ mais <em>diminue</em> la
      résistance de convection $1/(2\pi r_2Lh)$, car la surface extérieure grandit. La résistance totale est minimale (pertes maximales)
      pour $r_\text{cr}=k/h$ (cylindre), $2k/h$ (sphère). Si $r_1\lt r_\text{cr}$, un isolant fin <em>augmente</em> les pertes : utile pour
      refroidir un câble électrique, piège pour calorifuger un petit tube.</p></div>

    <h3>3. Conductivité et section variables</h3>
    <p>En 1D permanent sans génération, le <em>taux</em> $q$ se conserve le long du trajet :</p>
    <p>$$q=-A(x)\,k(T)\frac{dT}{dx}=\text{cste}\quad\Longrightarrow\quad q\int_{x_1}^{x_2}\frac{dx}{A(x)}=-\int_{T_1}^{T_2}k(T)\,dT.$$</p>
    <ul>
      <li>Forte conductivité $\Rightarrow$ faible gradient ; grande section $\Rightarrow$ faible gradient.</li>
      <li>Exemple 1 : $k=a+bT$ ($a,b\gt 0$) entre $T_H$ et $T_L$. Le gradient est plus faible côté chaud (où $k$ est grand) : le profil est
          <strong>concave</strong> (au-dessus de la droite).</li>
      <li>Exemple 2 : $A(x)\propto x^2$ (cône). $q=-kx^2\,dT/dx$ donne $T=C_1/x+C_2$ ; les constantes viennent des conditions aux limites.</li>
    </ul>

    <h3>4. Conduction avec génération interne</h3>
    <p>Avec génération, le taux n'est plus conservé et le <strong>circuit thermique ne s'applique plus</strong> : on résout l'équation.</p>
    <p><strong>Mur plan</strong> d'épaisseur $2L$ ($-L\le x\le L$), $k$ constant, $T(-L)=T_1$, $T(L)=T_2$ :</p>
    <p>$$\frac{d^2T}{dx^2}+\frac{\dot q}{k}=0\ \Longrightarrow\ T(x)=\frac{\dot qL^2}{2k}\Big(1-\frac{x^2}{L^2}\Big)+\frac{T_2-T_1}{2}\frac xL+\frac{T_1+T_2}{2}.$$</p>
    <ul>
      <li>Profil <strong>parabolique</strong>. Maximum en $x_m=\dfrac{k(T_2-T_1)}{2\dot qL}$ (qui tend vers 0 quand $\dot q\to\infty$).</li>
      <li>Surfaces à la même température $T_s$ : $T(x)=\dfrac{\dot qL^2}{2k}\Big(1-\dfrac{x^2}{L^2}\Big)+T_s$, maximum au centre
          $T_0=T_s+\dot qL^2/2k$.</li>
      <li>Le flux $q''(x)=\dot qx-\dfrac{k(T_2-T_1)}{2L}$ varie linéairement avec $x$.</li>
      <li>Si la surface échange par convection : bilan global $\dot q\,(AL)=hA(T_s-T_\infty)$ (pour la demi-épaisseur) donne directement
          $T_s=T_\infty+\dot qL/h$.</li>
    </ul>
    <p><strong>Cylindre plein</strong> de rayon $r_0$, surface à $T_s$ : $\dfrac1r\dfrac{d}{dr}\Big(r\dfrac{dT}{dr}\Big)+\dfrac{\dot q}k=0$ avec
    $dT/dr=0$ en $r=0$ :</p>
    <p>$$T(r)=\frac{\dot qr_0^2}{4k}\Big(1-\frac{r^2}{r_0^2}\Big)+T_s,\qquad q''_r=\frac{\dot qr}{2}.$$</p>
    <p><strong>Sphère pleine</strong> : $T(r)=\dfrac{\dot qr_0^2}{6k}\Big(1-\dfrac{r^2}{r_0^2}\Big)+T_s$.</p>

    <h3>5. Surfaces étendues (ailettes)</h3>
    <p>Pour augmenter $q=hA\Delta T$, on peut augmenter $h$ (liquide plutôt que gaz, convection forcée, écoulement diphasique ou turbulent),
    $\Delta T$, ou la surface $A$ : c'est le rôle des <strong>ailettes</strong> (dissipateurs de processeurs, radiateurs).</p>
    <p><strong>Équation de l'ailette</strong> (section $A_c$ et périmètre $P$ constants, régime permanent). Bilan sur une tranche $dx$ :
    $q_x=q_{x+dx}+dq_\text{conv}$ avec $q_x=-kA_c\,dT/dx$ et $dq_\text{conv}=hP\,dx\,(T-T_\infty)$ :</p>
    <p>$$\frac{d^2T}{dx^2}-\frac{hP}{kA_c}(T-T_\infty)=0\quad\Longleftrightarrow\quad\frac{d^2\theta}{dx^2}-m^2\theta=0,\qquad \theta=T-T_\infty,\ m^2=\frac{hP}{kA_c}.$$</p>
    <p>Solution générale $\theta=C_1e^{mx}+C_2e^{-mx}$. Pour une <strong>ailette infiniment longue</strong> ($\theta(0)=\theta_b$,
    $\theta(\infty)=0$) :</p>
    <p>$$\theta=\theta_b\,e^{-mx},\qquad q_f=-kA_c\frac{d\theta}{dx}\Big|_{x=0}=\sqrt{hPkA_c}\;\theta_b.$$</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Extrémité (Incropera, table 3.4)</th><th>Profil $\theta/\theta_b$</th><th>Taux $q_f$</th></tr></thead>
      <tbody>
        <tr><td>Convective ($h$)</td><td>$\dfrac{\cosh m(L-x)+(h/mk)\sinh m(L-x)}{\cosh mL+(h/mk)\sinh mL}$</td><td>$M\dfrac{\sinh mL+(h/mk)\cosh mL}{\cosh mL+(h/mk)\sinh mL}$</td></tr>
        <tr><td>Adiabatique</td><td>$\dfrac{\cosh m(L-x)}{\cosh mL}$</td><td>$M\tanh mL$</td></tr>
        <tr><td>Température imposée $\theta_L$</td><td>$\dfrac{(\theta_L/\theta_b)\sinh mx+\sinh m(L-x)}{\sinh mL}$</td><td>$M\dfrac{\cosh mL-\theta_L/\theta_b}{\sinh mL}$</td></tr>
        <tr><td>Infinie</td><td>$e^{-mx}$</td><td>$M$</td></tr>
      </tbody></table></div>
    <p>avec $M=\sqrt{hPkA_c}\,\theta_b$. En pratique, l'ailette se comporte comme infinie dès que $mL\gt 2{,}65$ ($\tanh mL\gt 0{,}99$).</p>
    <p><strong>Performance d'une ailette</strong> :</p>
    <ul>
      <li><strong>Résistance</strong> : $R_{t,f}=\theta_b/q_f$.</li>
      <li><strong>Efficacité</strong> (<em>effectiveness</em>) : $\varepsilon_f=\dfrac{q_f}{hA_{c,b}\theta_b}$ $=$ taux avec ailette / taux sans
          ailette (sur la surface de base qu'elle occupe). Une ailette ne se justifie que si $\varepsilon_f\ge 2$.</li>
      <li><strong>Rendement</strong> (<em>efficiency</em>) : $\eta_f=\dfrac{q_f}{hA_f\theta_b}$ $=$ taux réel / taux d'une ailette idéale
          entièrement à $T_b$ ($A_f$ : surface de l'ailette). Ailette adiabatique : $\eta_f=\tanh(mL)/(mL)$.</li>
    </ul>
    <div class="callout"><strong>Ce qui fait une bonne ailette.</strong>
      <p>$\varepsilon_f=\sqrt{kP/hA_c}$ pour une ailette infinie : matériau très conducteur (cuivre, aluminium), ailettes fines (grand $P/A_c$)
      et $h$ faible (les ailettes sont surtout utiles côté gaz).</p></div>
  `,

  /* -------------------- FICHE PARTIEL -------------------- */
  keyPoints: [
    {
      text: String.raw`<strong>Mur plan.</strong> $k$ constant, sans génération : $T$ linéaire, $q=kA(T_1-T_2)/L$. Composite : même $q$ dans chaque couche,
        gradient faible là où $k$ est grand ; continuité de $T$ et du flux à l'interface.`,
      exos: ["ex-composite-wall"],
    },
    {
      text: String.raw`<strong>Circuit thermique.</strong> $R=L/kA$, $\ln(r_2/r_1)/2\pi Lk$, $(1/r_1-1/r_2)/4\pi k$, $1/hA$, $R''_{t,c}$. Série : on ajoute ;
        parallèle : on ajoute les inverses. $q=\Delta T_\text{global}/R_\text{tot}=UA\Delta T$, puis $T_{i+1}=T_i-qR_i$.`,
      exos: ["ex-composite-wall"],
    },
    {
      text: String.raw`<strong>Rayon critique.</strong> $r_\text{cr}=k/h$ (cylindre), $2k/h$ (sphère). Si $r_1\lt r_\text{cr}$, isoler augmente d'abord les
        pertes (maximales pour $r_2=r_\text{cr}$).`,
      exos: ["ex-critical-radius"],
    },
    {
      text: String.raw`<strong>$k(T)$ ou $A(x)$ variables.</strong> $q$ conservé : $q\int dx/A=-\int k\,dT$. $k=k_0(1+\beta T)$ : $k$ moyen évalué à la
        température moyenne ; profil courbé (gradient faible là où $k$ est grand).`,
      exos: ["ex-variable-k"],
    },
    {
      text: String.raw`<strong>Génération.</strong> Pas de circuit : résoudre l'équation. Mur : parabole, $T_0=T_s+\dot qL^2/2k$ ; cylindre :
        $T_0=T_s+\dot qr_0^2/4k$ ; sphère : $/6k$. Bilan global : $T_s=T_\infty+\dot qL/h$ (mur), $\dot qr_0/2h$ (cylindre).`,
      exos: ["ex-generation"],
    },
    {
      text: String.raw`<strong>Ailettes.</strong> $\theta''-m^2\theta=0$, $m^2=hP/kA_c$. Infinie : $\theta=\theta_be^{-mx}$, $q_f=\sqrt{hPkA_c}\,\theta_b$.
        Adiabatique : $q_f=M\tanh mL$. $\varepsilon_f=q_f/hA_c\theta_b$ (utile si $\ge 2$), $\eta_f=q_f/hA_f\theta_b$. Infinie si $mL\gt 2{,}65$.`,
      exos: ["ex-fin"],
    },
  ],

  /* -------------------- FORMULAIRE -------------------- */
  formulas: [
    { name: "Mur plan : profil et taux", latex: String.raw`T(x)=T_1+(T_2-T_1)\frac xL,\qquad q=kA\frac{T_1-T_2}{L}` },
    { name: "Résistance thermique et coefficient global", latex: String.raw`R_t=\frac{\Delta T}{q},\qquad q=\frac{\Delta T}{R_\text{tot}}=UA\,\Delta T,\qquad UA=\frac1{R_\text{tot}}` },
    { name: "Résistances de conduction", note: "mur, cylindre (longueur L), sphère", latex: String.raw`R_\text{mur}=\frac{L}{kA},\quad R_\text{cyl}=\frac{\ln(r_2/r_1)}{2\pi Lk},\quad R_\text{sph}=\frac1{4\pi k}\Big(\frac1{r_1}-\frac1{r_2}\Big)` },
    { name: "Résistance de convection et de contact", latex: String.raw`R_\text{conv}=\frac1{hA},\qquad R''_{t,c}=\frac{T_A-T_B}{q''_x}` },
    { name: "Rayon critique d'isolation", latex: String.raw`r_\text{cr,cyl}=\frac kh,\qquad r_\text{cr,sph}=\frac{2k}h` },
    { name: "Conduction 1D à k(T) et A(x) variables", latex: String.raw`q\int_{x_1}^{x_2}\frac{dx}{A(x)}=-\int_{T_1}^{T_2}k(T)\,dT` },
    { name: "Mur avec génération (surfaces à T_s)", note: "épaisseur 2L", latex: String.raw`T(x)=\frac{\dot qL^2}{2k}\Big(1-\frac{x^2}{L^2}\Big)+T_s,\qquad T_s=T_\infty+\frac{\dot qL}{h}` },
    { name: "Cylindre plein avec génération", latex: String.raw`T(r)=\frac{\dot qr_0^2}{4k}\Big(1-\frac{r^2}{r_0^2}\Big)+T_s,\qquad T_s=T_\infty+\frac{\dot qr_0}{2h}` },
    { name: "Sphère pleine avec génération", latex: String.raw`T(r)=\frac{\dot qr_0^2}{6k}\Big(1-\frac{r^2}{r_0^2}\Big)+T_s` },
    { name: "Équation de l'ailette", note: "section constante, θ = T − T∞", latex: String.raw`\frac{d^2\theta}{dx^2}-m^2\theta=0,\qquad m^2=\frac{hP}{kA_c}` },
    { name: "Ailette infinie", latex: String.raw`\theta=\theta_b\,e^{-mx},\qquad q_f=\sqrt{hPkA_c}\,\theta_b=M` },
    { name: "Ailette à extrémité adiabatique", latex: String.raw`\frac{\theta}{\theta_b}=\frac{\cosh m(L-x)}{\cosh mL},\qquad q_f=M\tanh mL` },
    { name: "Efficacité, rendement, résistance d'ailette", latex: String.raw`\varepsilon_f=\frac{q_f}{hA_{c,b}\theta_b},\qquad \eta_f=\frac{q_f}{hA_f\theta_b},\qquad R_{t,f}=\frac{\theta_b}{q_f}` },
    { name: "Rendement d'une ailette adiabatique", latex: String.raw`\eta_f=\frac{\tanh mL}{mL}` },
  ],

  /* -------------------- QCM -------------------- */
  qcm: [
    {
      q: String.raw`Dans un mur composite de deux couches ($k_a\lt k_b$) en régime permanent, sans génération…`,
      choices: [
        String.raw`le flux est plus grand dans la couche la plus conductrice.`,
        String.raw`le gradient de température est plus faible dans la couche la plus conductrice.`,
        String.raw`le gradient de température est identique dans les deux couches.`,
        String.raw`la température est discontinue à l'interface parfaite.`,
      ],
      answer: 1,
      explanation: String.raw`Le flux $q''=-k\,dT/dx$ est le même partout (conservation) ; si $k$ est plus grand, $|dT/dx|$ est plus petit. Sans résistance de
        contact, $T$ est continue à l'interface.`,
    },
    {
      q: String.raw`La résistance thermique de conduction d'un cylindre creux de longueur $L$ vaut :`,
      choices: [String.raw`$\dfrac{r_2-r_1}{kA}$`, String.raw`$\dfrac{\ln(r_2/r_1)}{2\pi Lk}$`, String.raw`$\dfrac{1}{4\pi k}\Big(\dfrac1{r_1}-\dfrac1{r_2}\Big)$`, String.raw`$\dfrac{1}{2\pi r_2Lh}$`],
      answer: 1,
      explanation: String.raw`Profil logarithmique : $q_r=2\pi Lk(T_1-T_2)/\ln(r_2/r_1)$. La troisième est la sphère, la dernière la résistance de convection extérieure.`,
    },
    {
      q: String.raw`Un fil électrique de rayon 1 mm est gainé d'un isolant ($k=0{,}1$ W/m·K) dans de l'air ($h=10$ W/m²·K). Ajouter 4 mm d'isolant…`,
      choices: [
        String.raw`diminue les pertes, car on ajoute une résistance.`,
        String.raw`augmente les pertes, car $r_\text{cr}=1$ cm est supérieur au rayon extérieur.`,
        String.raw`ne change rien.`,
        String.raw`annule les pertes par convection.`,
      ],
      answer: 1,
      explanation: String.raw`$r_\text{cr}=k/h=0{,}01$ m. Tant que $r_2\lt r_\text{cr}$, la baisse de la résistance convective l'emporte sur la hausse de la résistance
        de conduction : les pertes augmentent (de 3,1 à 8,7 W/m pour 50 K d'écart), ce qui aide à refroidir le câble.`,
    },
    {
      q: String.raw`Pourquoi ne peut-on pas utiliser le circuit thermique dans un mur avec génération interne ?`,
      choices: [
        String.raw`Parce que $k$ varie.`,
        String.raw`Parce que le taux de transfert n'est plus constant à travers le mur.`,
        String.raw`Parce que le profil est linéaire.`,
        String.raw`Parce que la convection est interdite.`,
      ],
      answer: 1,
      explanation: String.raw`Une résistance suppose un même $q$ qui la traverse. Avec génération, $q''(x)$ varie ($q''=\dot qx+\dots$) : il faut résoudre l'équation.`,
    },
    {
      q: String.raw`Mur d'épaisseur $2L$ avec génération uniforme, surfaces à $T_s$. Si l'on double $\dot q$, l'écart $T_0-T_s$…`,
      choices: [String.raw`reste identique.`, String.raw`double.`, String.raw`quadruple.`, String.raw`est divisé par deux.`],
      answer: 1,
      explanation: String.raw`$T_0-T_s=\dot qL^2/2k$ est proportionnel à $\dot q$. Doubler l'épaisseur, en revanche, le quadruplerait.`,
    },
    {
      q: String.raw`Pour une ailette de section constante, le paramètre $m$ est défini par :`,
      choices: [String.raw`$m^2=\dfrac{kA_c}{hP}$`, String.raw`$m^2=\dfrac{hP}{kA_c}$`, String.raw`$m=\dfrac{hL}{k}$`, String.raw`$m^2=\dfrac{hA_c}{kP}$`],
      answer: 1,
      explanation: String.raw`Bilan : $kA_c\,\theta''=hP\,\theta$, donc $\theta''-m^2\theta=0$ avec $m^2=hP/kA_c$. $1/m$ est la longueur caractéristique de décroissance.`,
    },
    {
      q: String.raw`Le taux évacué par une ailette infiniment longue vaut :`,
      choices: [String.raw`$hA_f\theta_b$`, String.raw`$\sqrt{hPkA_c}\,\theta_b$`, String.raw`$\sqrt{hPkA_c}\,\theta_b\tanh mL$`, String.raw`$kA_c\theta_b/L$`],
      answer: 1,
      explanation: String.raw`$\theta=\theta_be^{-mx}$ et $q_f=-kA_c\theta'(0)=kA_cm\theta_b=\sqrt{hPkA_c}\,\theta_b$. Le $\tanh mL$ correspond à une extrémité adiabatique ; $hA_f\theta_b$ serait une ailette idéale.`,
    },
    {
      q: String.raw`L'<strong>efficacité</strong> $\varepsilon_f$ d'une ailette compare son taux à celui…`,
      choices: [
        String.raw`d'une ailette idéale entièrement à la température de base.`,
        String.raw`de la surface de base qu'elle occupe, sans ailette.`,
        String.raw`d'une ailette infinie.`,
        String.raw`du rayonnement.`,
      ],
      answer: 1,
      explanation: String.raw`Efficacité (<em>effectiveness</em>) : avec ailette / sans ailette. Le <em>rendement</em> $\eta_f$ compare à l'ailette idéale isotherme.`,
    },
    {
      q: String.raw`Quelle modification augmente l'efficacité d'une ailette infinie ?`,
      choices: [
        String.raw`Utiliser de l'acier inoxydable plutôt que de l'aluminium.`,
        String.raw`L'utiliser dans un liquide en ébullition ($h$ très grand).`,
        String.raw`La rendre plus fine (plus grand rapport $P/A_c$).`,
        String.raw`Augmenter sa section à périmètre fixé.`,
      ],
      answer: 2,
      explanation: String.raw`$\varepsilon_f=\sqrt{kP/hA_c}$ : il faut $k$ grand, $P/A_c$ grand et $h$ faible. C'est pourquoi on met des ailettes fines en aluminium côté air.`,
    },
    {
      q: String.raw`Un matériau a $k=a+bT$ avec $b\gt 0$. Entre une face chaude et une face froide, le profil permanent est…`,
      choices: [
        String.raw`linéaire.`,
        String.raw`plus pentu du côté chaud.`,
        String.raw`moins pentu du côté chaud (courbe au-dessus de la droite).`,
        String.raw`exponentiel.`,
      ],
      answer: 2,
      explanation: String.raw`$q''=-k(T)\,dT/dx$ est constant ; côté chaud $k$ est plus grand donc $|dT/dx|$ plus petit. La courbe se situe au-dessus du profil linéaire.`,
    },
  ],

  /* -------------------- EXERCICES -------------------- */
  exos: [
    {
      id: "ex-composite-wall",
      title: "Mur composite et circuit thermique",
      difficulty: "facile",
      tags: ["résistance thermique", "mur composite"],
      statement: String.raw`<p>Un mur de 1 m² est composé, de l'intérieur vers l'extérieur, d'un plâtre (2 cm, $k=0{,}2$ W/m·K), d'une brique (20 cm,
        $k=0{,}7$ W/m·K) et d'un isolant (5 cm, $k=0{,}04$ W/m·K). L'air intérieur est à 20 °C ($h_i=10$ W/m²·K), l'air extérieur à −5 °C
        ($h_o=25$ W/m²·K).</p>
        <p>(a) Dessiner le circuit thermique et calculer chaque résistance. (b) Calculer le taux de perte et le coefficient global $U$.
        (c) Calculer la température de chaque interface. (d) Quelle couche contrôle les pertes ?</p>`,
      solution: String.raw`
        <p><strong>(a)</strong> Cinq résistances en série (K/W) : $1/h_iA=0{,}100$ ; plâtre $0{,}02/0{,}2=0{,}100$ ; brique $0{,}2/0{,}7=0{,}286$ ;
        isolant $0{,}05/0{,}04=1{,}250$ ; $1/h_oA=0{,}040$. Total $R_\text{tot}=1{,}776$ K/W.</p>
        <p><strong>(b)</strong> $q=25/1{,}776\approx 14{,}1$ W ; $U=1/(R_\text{tot}A)\approx 0{,}56$ W/m²·K.</p>
        <p><strong>(c)</strong> On descend le circuit, $T_{i+1}=T_i-qR_i$ :</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>Position</th><th>Température (°C)</th></tr></thead>
          <tbody>
            <tr><td>Surface intérieure (plâtre)</td><td>$20-14{,}08\times 0{,}1=18{,}6$</td></tr>
            <tr><td>Plâtre / brique</td><td>$17{,}2$</td></tr>
            <tr><td>Brique / isolant</td><td>$13{,}2$</td></tr>
            <tr><td>Surface extérieure (isolant)</td><td>$-4{,}4$</td></tr>
          </tbody></table></div>
        <p><strong>(d)</strong> L'isolant représente 70 % de la résistance totale et encaisse 17,6 K des 25 K d'écart : c'est lui qui contrôle les
        pertes. La chute de température est proportionnelle à la résistance de chaque élément.</p>`,
    },
    {
      id: "ex-critical-radius",
      title: "Isoler un fil ou un tube : le rayon critique",
      difficulty: "moyen",
      tags: ["rayon critique", "cylindre", "isolation"],
      statement: String.raw`<p>(a) Montrer que la résistance par unité de longueur $R'(r_2)=\dfrac{\ln(r_2/r_1)}{2\pi k}+\dfrac{1}{2\pi r_2h}$ est minimale pour
        $r_2=k/h$.</p>
        <p>(b) Un fil de rayon $r_1=1$ mm est gainé d'un isolant ($k=0{,}1$ W/m·K) ; $h=10$ W/m²·K et l'écart surface du fil / air vaut 50 K.
        Calculer les pertes par mètre pour $r_2=1$ (nu), 5, 10 et 20 mm.</p>
        <p>(c) Un tube de vapeur de rayon extérieur 5 cm à 200 °C est isolé ($k=0{,}05$ W/m·K, $h=10$ W/m²·K, air à 25 °C). Calculer les pertes par
        mètre sans isolant, puis avec 2,5 cm et 5 cm d'isolant. Conclure.</p>`,
      hints: [String.raw`$dR'/dr_2=\dfrac{1}{2\pi kr_2}-\dfrac{1}{2\pi hr_2^2}$.`],
      solution: String.raw`
        <p><strong>(a)</strong> $dR'/dr_2=\dfrac{1}{2\pi r_2}\Big(\dfrac1k-\dfrac{1}{hr_2}\Big)=0\Rightarrow r_2=k/h$. La dérivée seconde y est positive :
        c'est un <em>minimum</em> de résistance, donc un maximum de pertes.</p>
        <p><strong>(b)</strong> $r_\text{cr}=0{,}1/10=10$ mm.</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>$r_2$ (mm)</th><th>$R'$ (m·K/W)</th><th>$q'$ (W/m)</th></tr></thead>
          <tbody>
            <tr><td>1 (nu)</td><td>15,9</td><td>3,1</td></tr>
            <tr><td>5</td><td>5,74</td><td>8,7</td></tr>
            <tr><td>10</td><td>5,26</td><td>9,5 (maximum)</td></tr>
            <tr><td>20</td><td>5,56</td><td>9,0</td></tr>
          </tbody></table></div>
        <p>La gaine triple les pertes : bon pour le refroidissement du câble.</p>
        <p><strong>(c)</strong> $r_\text{cr}=5$ mm $\ll r_1=5$ cm : toute épaisseur d'isolant réduit les pertes. Nu : $R'=1/(2\pi\times 0{,}05\times 10)=0{,}318$,
        $q'=175/0{,}318\approx 550$ W/m. Avec $r_2=7{,}5$ cm : $R'=1{,}503$, $q'\approx 116$ W/m. Avec $r_2=10$ cm : $R'=2{,}366$, $q'\approx 74$ W/m.
        Le rayon critique ne pose problème que pour les petits diamètres et les isolants peu performants.</p>`,
    },
    {
      id: "ex-generation",
      title: "Génération interne : mur et barreau",
      difficulty: "moyen",
      tags: ["génération", "profil parabolique"],
      statement: String.raw`<p>(a) Un mur de combustible d'épaisseur 10 cm ($L=5$ cm de demi-épaisseur, $k=20$ W/m·K) génère $\dot q=10^6$ W/m³. Ses deux faces
        sont refroidies par un fluide à 30 °C avec $h=1\,000$ W/m²·K. Calculer la température de surface puis la température maximale.
        (b) Un barreau cylindrique ($r_0=1$ cm, $k=15$ W/m·K) chauffé par effet Joule ($\dot q=10^7$ W/m³) a sa surface à 80 °C. Calculer la
        température au centre et le flux en surface. (c) Retrouver le flux en surface du barreau par un bilan global.</p>`,
      solution: String.raw`
        <p><strong>(a)</strong> Bilan sur une demi-épaisseur : toute l'énergie générée sort par la face, $\dot qL=h(T_s-T_\infty)$, donc
        $T_s=30+10^6\times 0{,}05/1\,000=80$ °C. Puis $T_0=T_s+\dot qL^2/2k=80+10^6\times 0{,}0025/40=142{,}5$ °C.</p>
        <p><strong>(b)</strong> $T_0-T_s=\dot qr_0^2/4k=10^7\times 10^{-4}/60\approx 16{,}7$ K, donc $T_0\approx 96{,}7$ °C. Flux en surface :
        $q''(r_0)=\dot qr_0/2=5\times 10^4$ W/m².</p>
        <p><strong>(c)</strong> Par mètre : énergie générée $\dot q\pi r_0^2$, sortie $q''\,2\pi r_0$, donc $q''=\dot qr_0/2$. Le flux croît linéairement
        avec $r$ à l'intérieur du barreau.</p>`,
    },
    {
      id: "ex-fin",
      title: "Ailette cylindrique en aluminium",
      difficulty: "moyen",
      tags: ["ailette", "efficacité", "rendement"],
      statement: String.raw`<p>Une ailette cylindrique en aluminium ($k=200$ W/m·K) de diamètre $D=5$ mm dépasse d'une paroi à 100 °C dans de l'air à 25 °C,
        avec $h=50$ W/m²·K.</p>
        <p>(a) Calculer $m$ et le taux évacué si l'ailette est très longue. À partir de quelle longueur peut-on la considérer comme infinie ?
        (b) L'ailette mesure en fait 5 cm avec une extrémité supposée adiabatique. Calculer $q_f$, le rendement et l'efficacité. (c) Même ailette
        infinie en acier inoxydable ($k=15$ W/m·K) : conclure sur le choix du matériau.</p>`,
      hints: [String.raw`$P=\pi D$, $A_c=\pi D^2/4$, donc $m=\sqrt{4h/kD}$.`],
      solution: String.raw`
        <p><strong>(a)</strong> $m=\sqrt{4h/kD}=\sqrt{4\times 50/(200\times 0{,}005)}=\sqrt{200}\approx 14{,}1$ m⁻¹. $\sqrt{hPkA_c}=\sqrt{50\times 0{,}0157\times 200\times 1{,}96\times 10^{-5}}$,
        et $q_f=\sqrt{hPkA_c}\,\theta_b\approx 0{,}0555\times 75\approx 4{,}17$ W. Infinie si $mL\gt 2{,}65$, soit $L\gt 0{,}19$ m.</p>
        <p><strong>(b)</strong> $mL=0{,}707$, $\tanh 0{,}707=0{,}609$ : $q_f=4{,}17\times 0{,}609\approx 2{,}54$ W. Rendement :
        $\eta_f=\tanh mL/mL\approx 0{,}86$. Efficacité : $\varepsilon_f=q_f/(hA_c\theta_b)=2{,}54/(50\times 1{,}96\times 10^{-5}\times 75)\approx 34$ : l'ailette
        évacue 34 fois plus que la petite surface qu'elle occupe.</p>
        <p><strong>(c)</strong> $m=\sqrt{4\times 50/(15\times 0{,}005)}\approx 51{,}6$ m⁻¹ et $q_f\approx 1{,}14$ W, près de 4 fois moins : la chaleur ne
        progresse pas assez loin dans un matériau peu conducteur. D'où l'aluminium et le cuivre pour les dissipateurs.</p>`,
    },
    {
      id: "ex-variable-k",
      title: "Mur à conductivité variable",
      difficulty: "difficile",
      tags: ["conductivité variable", "intégration"],
      statement: String.raw`<p>Un mur plan d'épaisseur $L=10$ cm a une conductivité $k=k_0(1+\beta T)$ avec $k_0=1$ W/m·K, $\beta=0{,}002$ K⁻¹ ($T$ en °C). Ses faces
        sont à $T_1=400$ °C ($x=0$) et $T_2=100$ °C ($x=L$).</p>
        <p>(a) Montrer que $q''=\dfrac{k_0}{L}\Big[(T_1-T_2)+\dfrac\beta2(T_1^2-T_2^2)\Big]$ et le calculer. (b) Montrer que ce résultat revient à utiliser
        une conductivité évaluée à la température moyenne. (c) Calculer la température au milieu du mur et comparer au profil linéaire.</p>`,
      hints: [String.raw`$q''\,dx=-k_0(1+\beta T)\,dT$, à intégrer de $0$ à $x$.`],
      solution: String.raw`
        <p><strong>(a)</strong> $q''$ est constant : $q''\int_0^Ldx=-k_0\int_{T_1}^{T_2}(1+\beta T)\,dT=k_0\Big[(T_1-T_2)+\frac\beta2(T_1^2-T_2^2)\Big]$.
        Numériquement : $q''=10\times[300+0{,}001\times(160\,000-10\,000)]=10\times 450=4\,500$ W/m².</p>
        <p><strong>(b)</strong> $(T_1-T_2)+\frac\beta2(T_1-T_2)(T_1+T_2)=(T_1-T_2)\big[1+\beta\bar T\big]$ avec $\bar T=(T_1+T_2)/2$, donc
        $q''=k(\bar T)(T_1-T_2)/L$, avec $k(\bar T)=k_0(1+0{,}002\times 250)=1{,}5$ W/m·K. Exact quand $k$ est linéaire en $T$.</p>
        <p><strong>(c)</strong> En $x=L/2$ : $k_0\big[(T_1-T)+\frac\beta2(T_1^2-T^2)\big]=q''L/2=225$, soit $0{,}001T^2+T-335=0$, d'où
        $T\approx 264{,}9$ °C, au-dessus des 250 °C du profil linéaire : le gradient est faible côté chaud (où $k$ est grand), le profil est
        concave.</p>`,
    },
  ],

  /* -------------------- DÉFINITIONS -------------------- */
  definitions: [
    { term: "Conduction 1D stationnaire", def: String.raw`Température fonction d'une seule coordonnée et indépendante du temps ; sans génération, le taux $q$ se conserve le long du trajet.` },
    { term: "Mur composite", def: String.raw`Mur formé de couches de matériaux différents traversées par le même flux ; se traite par résistances en série.` },
    { term: "Résistance thermique", abbr: "R_t", def: String.raw`$R_t=\Delta T/q$ en K/W ; analogue de la résistance électrique ($\Delta T\leftrightarrow\Delta V$, $q\leftrightarrow i$).` },
    { term: "Analogie électrique", def: String.raw`Représentation d'un problème de conduction/convection par un circuit de résistances : série, parallèle, loi d'Ohm thermique.` },
    { term: "Coefficient global d'échange", abbr: "U", def: String.raw`$UA=1/R_\text{tot}$, en W/m²·K : $q=UA\,\Delta T$ entre les deux fluides.` },
    { term: "Résistance de convection", def: String.raw`$R=1/hA$ : résistance entre une surface et le fluide.` },
    { term: "Résistance de contact", abbr: "R''_t,c", def: String.raw`Résistance à l'interface imparfaite entre deux solides (rugosités, lame d'air) : $R''_{t,c}=(T_A-T_B)/q''$, saut de température à l'interface.` },
    { term: "Profil logarithmique", def: String.raw`Distribution $T(r)$ dans un cylindre creux sans génération ; le taux $q_r$ est constant, le flux $q''_r$ décroît en $1/r$.` },
    { term: "Rayon critique d'isolation", abbr: "r_cr", def: String.raw`Rayon extérieur qui maximise les pertes d'un cylindre ($k/h$) ou d'une sphère ($2k/h$) isolés. En dessous, ajouter de l'isolant augmente les pertes.` },
    { term: "Conductivité variable", def: String.raw`$k=k(T)$ : on intègre $q\int dx/A=-\int k\,dT$. Si $k$ est linéaire en $T$, on peut utiliser $k$ à la température moyenne.` },
    { term: "Génération interne", def: String.raw`Production de chaleur dans le volume ($\dot q$, W/m³) ; rend le profil parabolique et le taux variable, le circuit thermique ne s'applique plus.` },
    { term: "Bilan global", def: String.raw`Bilan sur tout le corps en régime permanent : toute l'énergie générée sort par la surface ($\dot qV=hA(T_s-T_\infty)$).` },
    { term: "Surface étendue (ailette)", def: String.raw`Excroissance d'un solide qui augmente la surface d'échange avec le fluide pour accroître $q=hA\Delta T$.` },
    { term: "Excès de température", abbr: "θ", def: String.raw`$\theta=T-T_\infty$ ; $\theta_b$ à la base de l'ailette.` },
    { term: "Paramètre d'ailette", abbr: "m", def: String.raw`$m=\sqrt{hP/kA_c}$ (m⁻¹) ; $1/m$ est la longueur de décroissance de la température le long de l'ailette.` },
    { term: "Périmètre et section", abbr: "P, A_c", def: String.raw`$P$ : périmètre de la section de l'ailette (surface latérale par unité de longueur) ; $A_c$ : aire de la section droite, traversée par la conduction.` },
    { term: "Ailette infinie", def: String.raw`Ailette assez longue pour que $T\to T_\infty$ à l'extrémité : $\theta=\theta_be^{-mx}$, $q_f=\sqrt{hPkA_c}\,\theta_b$ ; valable si $mL\gt 2{,}65$.` },
    { term: "Extrémité adiabatique", def: String.raw`Hypothèse d'extrémité sans flux : $q_f=M\tanh mL$ avec $M=\sqrt{hPkA_c}\,\theta_b$.` },
    { term: "Efficacité d'ailette", abbr: "ε_f", def: String.raw`<em>Effectiveness</em> : $q_f/(hA_{c,b}\theta_b)$, taux avec ailette sur taux sans ailette. Une ailette n'est utile que si $\varepsilon_f\ge 2$.` },
    { term: "Rendement d'ailette", abbr: "η_f", def: String.raw`<em>Efficiency</em> : $q_f/(hA_f\theta_b)$, taux réel sur taux d'une ailette idéale entièrement à $T_b$ ; $\tanh mL/mL$ pour une extrémité adiabatique.` },
    { term: "Résistance d'ailette", abbr: "R_t,f", def: String.raw`$R_{t,f}=\theta_b/q_f$ ; permet d'insérer l'ailette dans un circuit thermique.` },
  ],
});
