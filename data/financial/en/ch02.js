/* ============================================================
   Financial Engineering — Chapter 2: Interest Rates (ENGLISH)
   Translation of data/financial/ch02.js. Same chapter id, same
   exercise ids, same quiz choice order and answers.
   Source: Chapter02_Interest Rates (lecture notes), following
   Hull, Options, Futures and Other Derivatives ("Interest Rates").
   NB: LaTeX fields use String.raw. Never write the sequence ${ }.
   In HTML fields, write "&lt;" (or \lt) for "<" followed by a letter.
   ============================================================ */
addChapter("fin-eng", {
  id: "ch02",
  title: "Chapter 2 — Interest Rates",
  short: "Ch. 2",
  lang: "en",

  /* -------------------- COURSE SUMMARY -------------------- */
  summary: String.raw`
    <h3>1. Types of rates</h3>
    <p>An <strong>interest rate</strong> in a particular situation defines the amount of money a borrower promises
    to pay the lender. For any given currency, many different rates are regularly quoted (mortgage rates, deposit
    rates, CD rates…). The rate that applies depends on the <strong>credit risk</strong>: the higher the risk that
    the borrower defaults, the higher the rate promised.</p>
    <ul>
      <li><strong>Treasury rates</strong>: the rates earned on Treasury bills (<em>T-bills</em>) and Treasury bonds
          (<em>T-bonds</em>), the instruments a government uses to borrow in its own currency (e.g. Korean Treasury
          rates). They are considered <em>totally risk-free</em>: an investor is certain that interest and principal
          will be paid as promised.</li>
      <li><strong>LIBOR</strong> (London Interbank Offered Rate): the rate at which a bank is prepared to make a
          large wholesale deposit with other banks. The deposit typically has an <strong>AA</strong> rating (the
          second-best S&amp;P rating): LIBOR is not totally free of credit risk, but close to it. For tax and
          regulatory reasons, derivative traders use LIBOR, rather than Treasury rates, as the risk-free rate.</li>
      <li><strong>CD rates</strong> (certificates of deposit): the rates at which large banks issue certificates of
          deposit in the money market.</li>
      <li><strong>Repo rate</strong> (repurchase agreement, RP): a holder of securities sells them and agrees to buy
          them back later at a slightly higher price. The repo rate is defined by the difference between the sale price
          and the repurchase price. The most common type is the <em>overnight repo</em> (renegotiated each day);
          longer arrangements are <em>term repos</em>.</li>
    </ul>
    <div class="callout"><strong>Current practice.</strong>
      <p>LIBOR was phased out between 2021 and 2023 in favour of reference rates based on repo or overnight
      transactions (SOFR in the US, KOFR in Korea, €STR in the euro area). The reasoning of the course (a "near
      risk-free" reference rate for derivatives) is unchanged.</p></div>

    <h3>2. Measuring a rate: compounding frequency</h3>
    <p>A quoted rate only makes sense together with its <strong>compounding frequency</strong> $m$ (the number of
    times per year interest is added to capital). An amount $A$ invested for $n$ years at rate $R_m$ compounded $m$
    times a year grows to $A(1+R_m/m)^{mn}$; with continuous compounding at rate $R_c$, it grows to $Ae^{R_cn}$.</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Compounding frequency</th><th>Value of 100 € after one year at 10%</th></tr></thead>
      <tbody>
        <tr><td>Annual ($m=1$)</td><td>110.00</td></tr>
        <tr><td>Semiannual ($m=2$)</td><td>110.25</td></tr>
        <tr><td>Quarterly ($m=4$)</td><td>110.38</td></tr>
        <tr><td>Monthly ($m=12$)</td><td>110.47</td></tr>
        <tr><td>Weekly ($m=52$)</td><td>110.51</td></tr>
        <tr><td>Daily ($m=365$)</td><td>110.52</td></tr>
        <tr><td>Continuous ($m\to\infty$)</td><td>$100\,e^{0.1}\approx 110.52$</td></tr>
      </tbody></table></div>
    <p>The final value increases with $m$ but stays bounded by the continuous limit. <strong>Conversion
    formulas</strong> between a continuous rate $R_c$ and the equivalent rate $R_m$ (same final value):</p>
    <p>$$R_c=m\ln\Big(1+\frac{R_m}{m}\Big)\qquad\Longleftrightarrow\qquad R_m=m\big(e^{R_c/m}-1\big).$$</p>
    <p>Example: 10% with semiannual compounding is equivalent to $2\ln(1.05)\approx 9.758\%$ continuously
    compounded. Rates used in option pricing are nearly always expressed with <strong>continuous compounding</strong>.</p>

    <h3>3. Zero rates</h3>
    <p>The $T$-year <strong>zero rate</strong> (spot rate, "zero", zero-coupon rate) is the rate earned on an
    investment that provides a single payoff, at time $T$ (no coupon, no intermediate cash flow). Zero rates as a
    function of maturity form the <strong>zero curve</strong>.</p>
    <p><strong>Example 2.3.1</strong> (used throughout): Treasury zero rates, continuously compounded.</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Maturity (years)</th><th>0.5</th><th>1.0</th><th>1.5</th><th>2.0</th></tr></thead>
      <tbody><tr><td>Zero rate (%, cont. comp.)</td><td>5.0</td><td>5.8</td><td>6.4</td><td>6.8</td></tr></tbody></table></div>

    <h3>4. Bond price, bond yield, par yield</h3>
    <p><strong>Theoretical price</strong>: discount <em>each</em> cash flow at the zero rate of <em>its own</em> date
    (notional principal 100). For a two-year bond paying a 6% coupon semiannually (3 every six months):</p>
    <p>$$3e^{-0.05\times 0.5}+3e^{-0.058\times 1.0}+3e^{-0.064\times 1.5}+103e^{-0.068\times 2.0}=98.39.$$</p>
    <p>The <strong>bond yield</strong> is the <em>single</em> discount rate $y$ which, applied to all cash flows, gives
    back the market price. If the market price is 98.39:</p>
    <p>$$3e^{-0.5y}+3e^{-1.0y}+3e^{-1.5y}+103e^{-2.0y}=98.39\quad\Longrightarrow\quad y\approx 6.76\%.$$</p>
    <p>There is no closed form: solve numerically (trial and error, Newton, solver). The yield is a kind of average
    of the zero rates weighted by the cash flows; here it is close to the 2-year zero rate (6.8%) because the final
    cash flow dominates.</p>
    <p>The <strong>par yield</strong> for a maturity is the <em>coupon rate</em> $c$ (not the coupon payment) that makes
    the bond price equal to its face value:</p>
    <p>$$\frac c2e^{-0.05\times 0.5}+\frac c2e^{-0.058\times 1.0}+\frac c2e^{-0.064\times 1.5}+\Big(100+\frac c2\Big)e^{-0.068\times 2.0}=100
    \quad\Longrightarrow\quad c\approx 6.87\%\ \text{(semiannual)}.$$</p>
    <div class="callout"><strong>General par yield formula.</strong>
      <p>With $m$ coupon payments per year, $d$ the present value of 1 € received at maturity and $A$ the present value
      of an annuity of 1 € on each coupon date:</p>
      <p>$$\text{par yield}=\frac{(1-d)\,m}{A}.$$</p>
      <p>In Example 2.3.1: $m=2$, $d=e^{-0.136}=0.87284$, $A=e^{-0.025}+e^{-0.058}+e^{-0.096}+e^{-0.136}=3.70027$,
      so $(1-0.87284)\times 2/3.70027\approx 6.87\%$. (The PDF refers to "Example 2.2": it means Example 2.3.1.)</p></div>

    <h3>5. Determining zero rates: the bootstrap</h3>
    <p>The <strong>bootstrap method</strong> rebuilds the zero curve from T-bill and coupon-bearing bond prices,
    one maturity at a time: each new bond introduces <em>only one</em> unknown rate, that of its maturity, since the
    earlier cash flows are discounted with the rates already found.</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Principal</th><th>Maturity (yrs)</th><th>Annual coupon*</th><th>Price</th><th>Zero rate found (cont.)</th></tr></thead>
      <tbody>
        <tr><td>100</td><td>0.25</td><td>0</td><td>97.5</td><td>10.127%</td></tr>
        <tr><td>100</td><td>0.50</td><td>0</td><td>94.9</td><td>10.469%</td></tr>
        <tr><td>100</td><td>1.00</td><td>0</td><td>90.0</td><td>10.536%</td></tr>
        <tr><td>100</td><td>1.50</td><td>8</td><td>96.0</td><td>10.681%</td></tr>
        <tr><td>100</td><td>2.00</td><td>12</td><td>101.6</td><td>10.808%</td></tr>
      </tbody></table></div>
    <p>* Half the stated annual coupon is paid every six months.</p>
    <ul>
      <li><strong>Zero-coupon bonds</strong>: 2.5 is earned on 97.5 over 3 months. Since $100=97.5\,e^{0.25R}$,
          $R=4\ln(100/97.5)=10.127\%$. Similarly $2\ln(100/94.9)=10.469\%$ and $\ln(100/90)=10.536\%$.</li>
      <li><strong>1.5 years</strong> (coupons of 4): $4e^{-0.10469\times 0.5}+4e^{-0.10536\times 1.0}+104e^{-1.5R}=96$, so
          $R=10.681\%$.</li>
      <li><strong>2 years</strong> (coupons of 6): $6e^{-0.10469\times 0.5}+6e^{-0.10536}+6e^{-0.10681\times 1.5}+106e^{-2R}=101.6$,
          so $R=10.808\%$.</li>
    </ul>
    <p>The resulting <strong>zero curve</strong> joins these points by linear interpolation (and is flat before 0.25
    years and after 2 years): here it is upward sloping, from 10.1% to 10.8%.</p>

    <h3>6. Forward rates</h3>
    <p><strong>Forward rates</strong> are the rates of interest <em>implied by current zero rates</em> for periods of
    time in the future. If $R_1$ and $R_2$ are the (continuously compounded) zero rates for maturities $T_1\lt T_2$,
    the forward rate for the period $[T_1,T_2]$ is</p>
    <p>$$f_{12}=\frac{R_2T_2-R_1T_1}{T_2-T_1}=R_2+(R_2-R_1)\frac{T_1}{T_2-T_1}.$$</p>
    <p>Idea: investing until $T_2$ at rate $R_2$ must earn as much as investing until $T_1$ at rate $R_1$ and then
    reinvesting at $f_{12}$: $e^{R_2T_2}=e^{R_1T_1}e^{f_{12}(T_2-T_1)}$. The formula is only <em>approximately</em> true
    when rates are not continuously compounded.</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Year $n$</th><th>Zero rate for an $n$-year investment (%)</th><th>Forward rate for year $n$ (%)</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>3.0</td><td></td></tr>
        <tr><td>2</td><td>4.0</td><td>$4.0\times 2-3.0\times 1=5.0$</td></tr>
        <tr><td>3</td><td>4.6</td><td>$4.6\times 3-4.0\times 2=5.8$</td></tr>
        <tr><td>4</td><td>5.0</td><td>$5.0\times 4-4.6\times 3=6.2$</td></tr>
        <tr><td>5</td><td>5.3</td><td>$5.3\times 5-5.0\times 4=6.5$</td></tr>
      </tbody></table></div>
    <div class="callout warn"><strong>Typo in Figure 2.5 of the PDF.</strong>
      <p>The PDF shows a 5-year zero rate of 5.5% with a forward rate of 6.5%. This is inconsistent:
      $5.5\times 5-5.0\times 4=7.5$. The original table (Hull) has 5.3% at 5 years, which does give 6.5%.</p></div>
    <p>The <strong>instantaneous forward rate</strong> for maturity $T$ applies to a very short period starting at
    $T$: it is the limit $T_2\to T_1$ of the formula, i.e., with $R$ the $T$-year zero rate,</p>
    <p>$$F(T)=R+T\frac{\partial R}{\partial T}.$$</p>
    <div class="callout"><strong>Ordering of rates and slope of the curve.</strong>
      <p>For an <strong>upward sloping</strong> curve: forward rate $\gt$ zero rate $\gt$ par yield. For a
      <strong>downward sloping</strong> curve, the opposite holds. Intuition: $f_{12}=R_2+(R_2-R_1)T_1/(T_2-T_1)$ exceeds
      $R_2$ as soon as $R_2>R_1$; the forward is the "marginal" rate pulling the average up. The par yield also
      discounts intermediate coupons at lower rates: it is an average of zero rates up to $T$, hence below $R_T$.
      (Proof on an example: see the dedicated exercise.)</p></div>

    <h3>7. Forward rate agreements (FRA)</h3>
    <p>An <strong>FRA</strong> is an over-the-counter (OTC) agreement that a certain rate will apply to a certain
    principal during a certain future time period. It is equivalent to exchanging interest at a predetermined rate
    $R_K$ for interest at the market rate.</p>
    <ul>
      <li>An FRA is valued by assuming that the <strong>forward rate</strong> $R_F$ (forward CD rate) is certain to be
          realized: its value is the present value of the difference between interest at $R_F$ and at $R_K$.</li>
      <li>For a period $[T_1,T_2]$, $R_F$ and $R_K$ are expressed with a compounding frequency matching the length
          $T_2-T_1$ (semiannual rate for a 6-month period, etc.). Interest paid at $T_2$ is $R_K(T_2-T_1)$ or
          $R_F(T_2-T_1)$ per unit of principal.</li>
    </ul>
    <p>$$V_{\text{receive }R_K}=L(R_K-R_F)(T_2-T_1)\,e^{-R_2T_2},\qquad V_{\text{receive }R_F}=L(R_F-R_K)(T_2-T_1)\,e^{-R_2T_2},$$</p>
    <p>where $L$ is the principal and $R_2$ the (continuously compounded) zero rate for maturity $T_2$.</p>
    <p><strong>Example 2.7.1.</strong> An FRA ensures that a company will receive 4% (semiannual) on 100 million €
    for six months starting in one year. The forward CD rate for the period is 5% (semiannual) and the 1.5-year zero
    rate is 4.5% (continuous). Value of the FRA, in millions:</p>
    <p>$$100\times(0.04-0.05)\times 0.5\times e^{-0.045\times 1.5}=-0.467.$$</p>
    <p>If the six-month rate observed in one year turns out to be 5.5% (semiannual), the company bears a cash flow of
    $100\times(0.04-0.055)\times 0.5=-0.75$ million in 1.5 years. The transaction may instead be settled at the
    one-year point, for an equivalent amount discounted at the observed rate: $-0.75/1.0275=-0.730$ million.</p>

    <h3>8. Duration</h3>
    <p>The <strong>(Macaulay) duration</strong> of a bond providing cash flows $c_i$ at times
    $t_1\lt t_2\lt\cdots\lt t_n$, with price $B=\sum_i c_ie^{-yt_i}$ and continuously compounded yield $y$, is</p>
    <p>$$D=\sum_{i=1}^n t_i\,\frac{c_ie^{-yt_i}}{B}.$$</p>
    <p>It is the <em>average of the cash-flow times</em>, weighted by each cash flow's share of the price: an
    "average" maturity. For a zero-coupon bond, $D=T$; with coupons, $D\lt T$. It matters because of the key
    relationship (which follows from $dB/dy=-\sum_it_ic_ie^{-yt_i}=-BD$):</p>
    <p>$$\frac{\Delta B}{B}\approx-D\,\Delta y.$$</p>
    <ul>
      <li><strong>Modified duration</strong>: if $y$ is compounded $m$ times a year, $D^*=\dfrac{D}{1+y/m}$ and
          $\dfrac{\Delta B}{B}\approx-\dfrac{D\,\Delta y}{1+y/m}=-D^*\Delta y$. (The PDF writes "$-D^*y$": the $\Delta$ is missing.)</li>
      <li><strong>Dollar duration</strong>: $D^{**}=D^*\times B$, so that $\Delta B\approx-D^{**}\Delta y$.</li>
      <li><strong>Portfolio</strong>: its duration is the average of the bonds' durations weighted by their prices
          (market values). The relationship describes the effect of small <em>parallel shifts</em> in the yield curve.</li>
      <li><strong>Immunization</strong>: by choosing assets with the same duration as liabilities (zero net
          duration), a financial institution eliminates its exposure to small parallel shifts. It is still exposed to
          shifts that are <em>large</em> or <em>nonparallel</em>.</li>
    </ul>

    <h3>9. Convexity</h3>
    <p>Two portfolios with the same duration react almost identically to a small yield change, but differently to a
    large one: the relationship between $\Delta B/B$ and $\Delta y$ is a (convex) <em>curve</em>, of which duration only
    gives the tangent at the origin. <strong>Convexity</strong> measures this curvature:</p>
    <p>$$C=\frac1B\frac{\partial^2B}{\partial y^2}=\frac{\sum_{i=1}^n c_it_i^2e^{-yt_i}}{B},\qquad
    \frac{\Delta B}{B}\approx-D\,\Delta y+\frac12C\,(\Delta y)^2.$$</p>
    <ul>
      <li>The $(\Delta y)^2$ term is always positive: for equal duration, the more convex bond gains more when rates
          fall and loses less when they rise.</li>
      <li>The convexity of a portfolio is <strong>greatest</strong> when payments are spread evenly over a long period,
          <strong>least</strong> when they are concentrated around one date (a zero-coupon bond has $C=T^2$).</li>
      <li>Used for portfolios, it allows larger shifts in the yield curve to be considered, but the shifts still have to
          be <em>parallel</em>.</li>
    </ul>
  `,

  /* -------------------- EXAM SHEET -------------------- */
  keyPoints: [
    {
      text: String.raw`<strong>Types of rates and credit risk.</strong> The higher the credit risk, the higher the promised
        rate. Treasury $=$ risk-free (government borrowing in its own currency); LIBOR $=$ AA-rated interbank deposit, near
        risk-free, used as the risk-free rate by derivative traders; CD; repo $=$ difference between sale and repurchase
        prices (overnight or term).`,
      exos: ["ex-repo"],
    },
    {
      text: String.raw`<strong>Compounding.</strong> $A(1+R_m/m)^{mn}$ versus $Ae^{R_cn}$. Conversion $R_c=m\ln(1+R_m/m)$ and
        $R_m=m(e^{R_c/m}-1)$. For the same quoted rate, the final value increases with $m$; for the same final value,
        $R_c\lt R_m$. Derivatives use continuous compounding.`,
      exos: ["ex-compounding"],
    },
    {
      text: String.raw`<strong>Price, yield, par yield.</strong> Price $=$ each cash flow discounted at <em>its</em> zero rate.
        Yield $y$ $=$ single rate giving back the price (numerical solution). Par yield $=$ coupon rate giving a price at
        par: $(1-d)m/A$.`,
      exos: ["ex-bond-yield"],
    },
    {
      text: String.raw`<strong>Bootstrap.</strong> Zero-coupon bonds: $R=\frac1T\ln(100/P)$. Then, maturity by maturity,
        discount the coupons with the rates already known and isolate the only unknown rate (that of the final cash flow).`,
      exos: ["ex-bootstrap"],
    },
    {
      text: String.raw`<strong>Forward rates.</strong> $f_{12}=\dfrac{R_2T_2-R_1T_1}{T_2-T_1}$ (exact with continuous
        compounding). Instantaneous forward: $R+T\,\partial R/\partial T$. Upward curve: forward $\gt$ zero $\gt$ par yield;
        downward: the reverse. Watch out for the typo in Figure 2.5 (5.3%, not 5.5%, at 5 years).`,
      exos: ["ex-forward", "ex-curve-order"],
    },
    {
      text: String.raw`<strong>FRA.</strong> Assume the forward rate $R_F$ is realized. Receiving $R_K$: value
        $L(R_K-R_F)(T_2-T_1)e^{-R_2T_2}$. $R_F$ and $R_K$ use the compounding of the period. If settled at $T_1$, discount
        the cash flow at the observed rate: divide by $1+R_{\text{observed}}(T_2-T_1)$.`,
      exos: ["ex-fra"],
    },
    {
      text: String.raw`<strong>Duration.</strong> $D=\sum t_i\,c_ie^{-yt_i}/B$ (weighted average of times);
        $\Delta B/B\approx-D\Delta y$. Modified $D^*=D/(1+y/m)$, dollar $D^{**}=D^*B$. Portfolio: price-weighted average.
        Zero-coupon: $D=T$.`,
      exos: ["ex-duration"],
    },
    {
      text: String.raw`<strong>Convexity and immunization.</strong> $C=\sum c_it_i^2e^{-yt_i}/B$;
        $\Delta B/B\approx-D\Delta y+\frac12C(\Delta y)^2$. Zero net duration $\Rightarrow$ protected against small parallel
        shifts, not large or nonparallel ones. Spread-out cash flows $\Rightarrow$ high convexity.`,
      exos: ["ex-convexity", "ex-immunization"],
    },
  ],

  /* -------------------- FORMULA SHEET -------------------- */
  formulas: [
    { name: "Compounding m times per year", note: "amount A invested for n years", latex: String.raw`A\Big(1+\frac{R_m}{m}\Big)^{mn}` },
    { name: "Continuous compounding", latex: String.raw`A\,e^{R_cn}` },
    { name: "Equivalent continuous rate", latex: String.raw`R_c=m\ln\Big(1+\frac{R_m}{m}\Big)` },
    { name: "Equivalent discrete rate", latex: String.raw`R_m=m\big(e^{R_c/m}-1\big)` },
    { name: "Zero rate of a zero-coupon bond", note: "price P, principal 100, maturity T, continuous rate", latex: String.raw`100=P\,e^{RT}\quad\Longleftrightarrow\quad R=\frac1T\ln\frac{100}{P}` },
    { name: "Theoretical bond price", note: "each cash flow c_i discounted at the zero rate R_i of its date t_i", latex: String.raw`B=\sum_{i=1}^n c_i\,e^{-R_it_i}` },
    { name: "Bond yield", note: "single y, solved numerically", latex: String.raw`\sum_{i=1}^n c_i\,e^{-yt_i}=B_{\text{market}}` },
    { name: "Par yield", note: "m coupons per year, d = PV of 1 at maturity, A = PV of an annuity of 1 on each coupon date", latex: String.raw`c=\frac{(1-d)\,m}{A}` },
    { name: "Forward rate", note: "continuous zero rates R_1, R_2 for maturities T_1 < T_2", latex: String.raw`f_{12}=\frac{R_2T_2-R_1T_1}{T_2-T_1}=R_2+(R_2-R_1)\frac{T_1}{T_2-T_1}` },
    { name: "Instantaneous forward rate", note: "R = zero rate for maturity T", latex: String.raw`F(T)=R+T\,\frac{\partial R}{\partial T}` },
    { name: "Value of an FRA (receive R_K)", note: "principal L, R_F = forward rate, R_2 = continuous zero rate at T_2", latex: String.raw`V=L\,(R_K-R_F)\,(T_2-T_1)\,e^{-R_2T_2}` },
    { name: "Value of an FRA (receive R_F)", latex: String.raw`V=L\,(R_F-R_K)\,(T_2-T_1)\,e^{-R_2T_2}` },
    { name: "Macaulay duration", note: "continuous y, B = sum of discounted cash flows", latex: String.raw`D=\sum_{i=1}^n t_i\,\frac{c_i\,e^{-yt_i}}{B}` },
    { name: "Duration-price relationship", latex: String.raw`\frac{\Delta B}{B}\approx-D\,\Delta y` },
    { name: "Modified duration", note: "y compounded m times per year", latex: String.raw`D^*=\frac{D}{1+y/m},\qquad \frac{\Delta B}{B}\approx-D^*\,\Delta y` },
    { name: "Dollar duration", latex: String.raw`D^{**}=D^*\,B,\qquad \Delta B\approx-D^{**}\,\Delta y` },
    { name: "Portfolio duration", note: "B_j = market value of bond j", latex: String.raw`D_P=\sum_j\frac{B_j}{\sum_k B_k}\,D_j` },
    { name: "Convexity", latex: String.raw`C=\frac1B\frac{\partial^2B}{\partial y^2}=\frac{\sum_{i=1}^n c_i\,t_i^2\,e^{-yt_i}}{B}` },
    { name: "Duration + convexity approximation", latex: String.raw`\frac{\Delta B}{B}\approx-D\,\Delta y+\frac12\,C\,(\Delta y)^2` },
  ],

  /* -------------------- QUIZ -------------------- */
  qcm: [
    {
      q: String.raw`Why is the rate promised by one borrower higher than another's, for the same currency and maturity?`,
      choices: [
        String.raw`Because its compounding frequency is lower.`,
        String.raw`Because its credit risk is higher.`,
        String.raw`Because it borrows in its own currency.`,
        String.raw`Because the rate is expressed with continuous compounding.`,
      ],
      answer: 1,
      explanation: String.raw`The applicable rate depends on credit risk: the higher the default risk, the higher the promised rate
        the lender requires. Borrowing in its own currency is, on the contrary, the situation of a government, whose rate is
        risk-free.`,
    },
    {
      q: String.raw`According to the course, which rate do derivative traders usually use as the risk-free rate?`,
      choices: [String.raw`LIBOR.`, String.raw`The T-bill rate.`, String.raw`The mortgage rate.`, String.raw`The deposit rate.`],
      answer: 0,
      explanation: String.raw`Treasury rates are truly risk-free, but for tax and regulatory reasons derivative traders use LIBOR,
        an AA-rated interbank rate close to risk-free (now replaced by rates such as SOFR).`,
    },
    {
      q: String.raw`A repo rate is defined by…`,
      choices: [
        String.raw`the coupon of the government bond used in the repo.`,
        String.raw`the difference between the sale price of the securities and their repurchase price.`,
        String.raw`the rate at which a bank deposits funds with another bank.`,
        String.raw`the one-day zero rate.`,
      ],
      answer: 1,
      explanation: String.raw`In a repurchase agreement, securities are sold with an agreement to buy them back at a slightly higher
        price; that price difference is the interest. The third answer describes LIBOR.`,
    },
    {
      q: String.raw`A rate of 10% with semiannual compounding is equivalent, with continuous compounding, to about:`,
      choices: [String.raw`$10.25\%$`, String.raw`$10.00\%$`, String.raw`$9.76\%$`, String.raw`$5.00\%$`],
      answer: 2,
      explanation: String.raw`$R_c=m\ln(1+R_m/m)=2\ln(1.05)\approx 9.758\%$. The continuous rate is smaller because continuous
        compounding "works harder": a lower quoted rate gives the same final value. $10.25\%$ is the equivalent
        <em>annual</em> rate.`,
    },
    {
      q: String.raw`A $T$-year <strong>zero rate</strong> is the rate earned on an investment that…`,
      choices: [
        String.raw`pays regular coupons until $T$.`,
        String.raw`starts at a future date and ends at $T$.`,
        String.raw`has a price equal to its face value.`,
        String.raw`provides a single payoff, at time $T$.`,
      ],
      answer: 3,
      explanation: String.raw`The zero (spot) rate corresponds to a single payment at $T$. An investment starting in the future
        relates to the forward rate; a price at par defines the par yield.`,
    },
    {
      q: String.raw`The <strong>bond yield</strong> is…`,
      choices: [
        String.raw`its coupon rate.`,
        String.raw`the zero rate for its maturity.`,
        String.raw`the single rate which, applied to all its cash flows, gives back its market price.`,
        String.raw`the coupon rate that makes its price equal to its face value.`,
      ],
      answer: 2,
      explanation: String.raw`The yield is a single discount rate. The last answer is the definition of the par yield; the
        theoretical price, on the other hand, uses a different zero rate for each cash flow.`,
    },
    {
      q: String.raw`With $m=2$ coupons per year, $d=0.9$ and $A=3.8$, the par yield is about:`,
      choices: [String.raw`$2.6\%$`, String.raw`$10.0\%$`, String.raw`$4.7\%$`, String.raw`$5.3\%$`],
      answer: 3,
      explanation: String.raw`$(1-d)m/A=(0.1\times 2)/3.8\approx 5.26\%$. Forgetting the factor $m$ gives $2.6\%$ (the rate per
        half-year).`,
    },
    {
      q: String.raw`In the bootstrap method, to find the 1.5-year zero rate from a bond with semiannual coupons, one…`,
      choices: [
        String.raw`discounts all cash flows at the same unknown rate $R$.`,
        String.raw`discounts the 0.5- and 1-year coupons with the zero rates already found, and isolates the rate of the final cash flow.`,
        String.raw`averages the 0.5- and 1-year rates.`,
        String.raw`uses the bond yield as the zero rate.`,
      ],
      answer: 1,
      explanation: String.raw`That is the whole principle: each bond brings only one unknown. Discounting all cash flows at the same
        rate would compute the <em>yield</em> of the bond, which is not the zero rate.`,
    },
    {
      q: String.raw`Continuous zero rates: 4% at 1 year and 5% at 2 years. The forward rate for the second year is:`,
      choices: [String.raw`$4.5\%$`, String.raw`$5.0\%$`, String.raw`$6.0\%$`, String.raw`$9.0\%$`],
      answer: 2,
      explanation: String.raw`$f_{12}=(R_2T_2-R_1T_1)/(T_2-T_1)=(5\times 2-4\times 1)/1=6\%$. It exceeds the 2-year zero rate because
        the curve is upward sloping: $f_{12}=R_2+(R_2-R_1)T_1/(T_2-T_1)=5+1=6$.`,
    },
    {
      q: String.raw`For an <strong>upward sloping</strong> yield curve, which ordering is correct (same maturity)?`,
      choices: [
        String.raw`par yield $\gt$ zero rate $\gt$ forward rate`,
        String.raw`zero rate $\gt$ forward rate $\gt$ par yield`,
        String.raw`forward rate $\gt$ zero rate $\gt$ par yield`,
        String.raw`all three are equal`,
      ],
      answer: 2,
      explanation: String.raw`The forward is the marginal rate, above the average; the zero rate is an average of forwards; the par
        yield is itself an average of the zero rates of the (shorter) coupon dates. For a downward sloping curve the order
        reverses; for a flat curve all three are equal.`,
    },
    {
      q: String.raw`An FRA is valued by assuming that…`,
      choices: [
        String.raw`the fixed rate $R_K$ will equal the market rate.`,
        String.raw`the forward rate $R_F$ is certain to be realized.`,
        String.raw`the zero rate will stay constant.`,
        String.raw`the principal is exchanged at time $T_1$.`,
      ],
      answer: 1,
      explanation: String.raw`The value is the present value of the difference between interest at the forward rate $R_F$ and at the
        fixed rate $R_K$, i.e. $L(R_K-R_F)(T_2-T_1)e^{-R_2T_2}$ when receiving $R_K$. The principal is never exchanged.`,
    },
    {
      q: String.raw`A company receives $R_K=4\%$ in an FRA while the forward rate for the period is $R_F=5\%$. For the company, the FRA has a value that is…`,
      choices: [String.raw`zero.`, String.raw`positive.`, String.raw`impossible to determine without the observed rate.`, String.raw`negative.`],
      answer: 3,
      explanation: String.raw`It receives 4% while the market expects 5%: $L(R_K-R_F)(T_2-T_1)e^{-R_2T_2}\lt 0$. In the course example,
        $-0.467$ million for 100 million over six months. The rate eventually observed changes the settlement, not today's value.`,
    },
    {
      q: String.raw`The duration of a 5-year zero-coupon bond is:`,
      choices: [String.raw`less than 5 years.`, String.raw`more than 5 years.`, String.raw`it depends on the yield.`, String.raw`exactly 5 years.`],
      answer: 3,
      explanation: String.raw`There is a single cash flow, at $t=5$, representing 100% of the price: $D=5\times 1=5$. With coupons,
        part of the weight sits on earlier dates, so $D\lt T$.`,
    },
    {
      q: String.raw`A bond is worth 100 and has a duration of 4 years (continuous yield). If the yield rises by 0.5 percentage points, duration predicts a price of about:`,
      choices: [String.raw`$98$`, String.raw`$96$`, String.raw`$102$`, String.raw`$99.5$`],
      answer: 0,
      explanation: String.raw`$\Delta B\approx-BD\Delta y=-100\times 4\times 0.005=-2$, hence a price of about 98. The price falls when
        the yield rises. Convexity would make the fall slightly smaller.`,
    },
    {
      q: String.raw`An institution has zero net duration (assets and liabilities with the same duration). It is still exposed to…`,
      choices: [
        String.raw`all shifts of the yield curve.`,
        String.raw`only small parallel shifts.`,
        String.raw`large or nonparallel shifts.`,
        String.raw`no interest rate risk at all.`,
      ],
      answer: 2,
      explanation: String.raw`Matching durations neutralizes the first-order effect, i.e. <em>small parallel</em> shifts. Large shifts
        (convexity effect) and changes in the shape of the curve (slope, curvature) are not hedged.`,
    },
    {
      q: String.raw`The convexity of a bond portfolio is greatest when payments are…`,
      choices: [
        String.raw`concentrated around a single date.`,
        String.raw`spread evenly over a long period.`,
        String.raw`all made in the very short term.`,
        String.raw`indexed to inflation.`,
      ],
      answer: 1,
      explanation: String.raw`$C=\sum c_it_i^2e^{-yt_i}/B$ is an average of the $t_i^2$: for a given average time (duration), it is larger
        the more dispersed the dates are. Payments concentrated around one date give the lowest convexity.`,
    },
  ],

  /* -------------------- EXERCISES -------------------- */
  exos: [
    {
      id: "ex-repo",
      title: "Types of rates and repo rate",
      difficulty: "facile",
      tags: ["types of rates", "repo", "LIBOR"],
      statement: String.raw`<p>(a) Rank the following rates from lowest to highest, for the same currency and maturity, and justify:
        loan rate to an unrated small business, T-bill rate, LIBOR.</p>
        <p>(b) A firm sells government securities for 10,000,000 € and agrees to buy them back the next day for
        10,001,200 €. What is the overnight repo rate, expressed as an annual rate (365-day basis)? Who lends, who borrows?</p>
        <p>(c) What is the difference between an overnight repo and a term repo?</p>
        <p>(d) T-bills are "totally risk-free". Why did derivative traders use LIBOR instead?</p>`,
      solution: String.raw`
        <p><strong>(a)</strong> T-bills $\lt$ LIBOR $\lt$ small-business loan. The rate depends on credit risk: the government
        borrows in its own currency and will certainly pay (risk-free); LIBOR corresponds to an AA-rated interbank deposit,
        close to risk-free; an unrated small business carries a much higher default risk.</p>
        <p><strong>(b)</strong> The interest is the price difference: 1,200 € for one day on 10,000,000 €, i.e.
        $1{,}200/10{,}000{,}000=0.012\%$ per day. As an annual rate (365 basis): $0.00012\times 365\approx 4.38\%$.
        The party that sells and buys back <em>borrows</em> 10 million, posting its securities as collateral; the
        counterparty <em>lends</em> and holds the securities overnight. It is a secured loan, hence a low rate.</p>
        <p><strong>(c)</strong> An overnight repo covers one night and is renegotiated each day (the most common type); a term
        repo fixes the terms over a longer period.</p>
        <p><strong>(d)</strong> For tax and regulatory reasons (treatment of T-bills, holding constraints). LIBOR, the rate at
        which banks lend to each other, better reflected their funding cost while staying close to risk-free. Since LIBOR's
        discontinuation, this role is played by overnight rates such as SOFR.</p>`,
    },
    {
      id: "ex-compounding",
      title: "Converting between compounding frequencies",
      difficulty: "facile",
      tags: ["compounding", "conversion"],
      statement: String.raw`<p>(a) A rate is 10% per annum with semiannual compounding. What is the equivalent rate with continuous
        compounding? With annual compounding?</p>
        <p>(b) A rate is 8% with continuous compounding. What is the equivalent rate with quarterly compounding?</p>
        <p>(c) 1,000 € is invested for 3 years at 6% continuously compounded. What does it grow to? Which monthly rate
        (compounded 12 times a year) would give the same final value?</p>
        <p>(d) Check the last row of the table in Figure 2.1 and explain why the values level off.</p>`,
      hints: [String.raw`Two rates are equivalent if they give the same final value: $e^{R_c}=(1+R_m/m)^m$.`],
      solution: String.raw`
        <p><strong>(a)</strong> $R_c=2\ln(1+0.10/2)=2\ln 1.05\approx 9.758\%$. Annual rate: $(1.05)^2-1=10.25\%$.</p>
        <p><strong>(b)</strong> $R_4=4\big(e^{0.08/4}-1\big)=4(e^{0.02}-1)\approx 8.081\%$.</p>
        <p><strong>(c)</strong> $1{,}000\,e^{0.06\times 3}=1{,}000\,e^{0.18}\approx 1{,}197.22$ €. Equivalent monthly rate:
        $R_{12}=12\big(e^{0.06/12}-1\big)\approx 6.015\%$. (The PDF writes "log": it means the natural logarithm.)</p>
        <p><strong>(d)</strong> Daily: $100(1+0.1/365)^{365}\approx 110.516$, shown as 110.52. The limit as $m\to\infty$ is
        $100\,e^{0.1}\approx 110.517$: beyond daily compounding the extra gain is negligible. That is why continuous
        compounding is an excellent approximation of frequent compounding.</p>
        <p>Remember: for the same final value, the more frequent the compounding, the lower the quoted rate
        ($R_1=10.25\%\gt R_2=10\%\gt R_c=9.758\%$).</p>`,
    },
    {
      id: "ex-bond-yield",
      title: "Price, yield and par yield of a bond",
      difficulty: "moyen",
      tags: ["bonds", "yield", "par yield"],
      statement: String.raw`<p>Zero rates (continuous compounding) are:</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>Maturity (years)</th><th>0.5</th><th>1.0</th><th>1.5</th><th>2.0</th></tr></thead>
          <tbody><tr><td>Zero rate (%)</td><td>4.0</td><td>4.4</td><td>4.7</td><td>5.0</td></tr></tbody></table></div>
        <p>Consider a bond with principal 100, maturity 2 years, paying a 6% annual coupon semiannually.</p>
        <p>(a) Compute its theoretical price. (b) Its market price equals the theoretical price. Check that its
        (continuous) yield is about 4.98%. (c) Compute the 2-year par yield with the formula $(1-d)m/A$. (d) Why is the
        price above 100?</p>`,
      hints: [
        String.raw`Discount factors: $e^{-0.02}$, $e^{-0.044}$, $e^{-0.0705}$, $e^{-0.1}$.`,
        String.raw`(b) Simply recompute the price with $y=4.98\%$ applied to all cash flows.`,
      ],
      solution: String.raw`
        <p><strong>(a)</strong> Discount factors:</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>$t$</th><th>Cash flow</th><th>$e^{-R_tt}$</th><th>Present value</th></tr></thead>
          <tbody>
            <tr><td>0.5</td><td>3</td><td>$e^{-0.020}=0.98020$</td><td>2.941</td></tr>
            <tr><td>1.0</td><td>3</td><td>$e^{-0.044}=0.95695$</td><td>2.871</td></tr>
            <tr><td>1.5</td><td>3</td><td>$e^{-0.0705}=0.93193$</td><td>2.796</td></tr>
            <tr><td>2.0</td><td>103</td><td>$e^{-0.100}=0.90484$</td><td>93.198</td></tr>
          </tbody></table></div>
        <p>Price: $B\approx 101.81$.</p>
        <p><strong>(b)</strong> We look for $y$ such that $3e^{-0.5y}+3e^{-y}+3e^{-1.5y}+103e^{-2y}=101.81$. By trial and error
        (or a solver): $y\approx 4.977\%$. Check with $y=4.98\%$: the computed price is 101.80, very close. As expected, $y$ is
        slightly below the 2-year zero rate (5%), because the intermediate coupons are discounted at lower rates.</p>
        <p><strong>(c)</strong> $d=e^{-0.1}=0.90484$, $A=0.98020+0.95695+0.93193+0.90484=3.77392$, $m=2$:</p>
        <p>$$\text{par yield}=\frac{(1-0.90484)\times 2}{3.77392}\approx 5.04\%\ \text{(semiannual)}.$$</p>
        <p><strong>(d)</strong> The coupon (6%) is above the par yield (5.04%), the coupon rate that would give exactly 100.
        The bond pays more than the market requires: it trades above par.</p>`,
    },
    {
      id: "ex-bootstrap",
      title: "Building the zero curve by bootstrapping",
      difficulty: "moyen",
      tags: ["bootstrap", "zero rates"],
      statement: String.raw`<p>The following instruments are observed (principal 100, half the annual coupon is paid every six months):</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>Maturity (years)</th><th>Annual coupon</th><th>Price</th></tr></thead>
          <tbody>
            <tr><td>0.25</td><td>0</td><td>98.8</td></tr>
            <tr><td>0.50</td><td>0</td><td>97.6</td></tr>
            <tr><td>1.00</td><td>0</td><td>95.0</td></tr>
            <tr><td>1.50</td><td>6</td><td>99.2</td></tr>
            <tr><td>2.00</td><td>7</td><td>100.4</td></tr>
          </tbody></table></div>
        <p>(a) Compute the (continuous) zero rates for 0.25, 0.5 and 1 year. (b) Deduce the 1.5-year zero rate. (c) Then the
        2-year rate. (d) Describe the shape of the curve and compute the forward rate between 1.5 and 2 years.</p>`,
      hints: [String.raw`(b) The coupons of 3 paid at 0.5 and 1 year are discounted with the rates found in (a); only one unknown remains, in $103e^{-1.5R}$.`],
      solution: String.raw`
        <p><strong>(a)</strong> For a zero-coupon bond, $R=\frac1T\ln(100/P)$:</p>
        <ul>
          <li>0.25 year: $4\ln(100/98.8)\approx 4.829\%$;</li>
          <li>0.5 year: $2\ln(100/97.6)\approx 4.859\%$;</li>
          <li>1 year: $\ln(100/95)\approx 5.129\%$.</li>
        </ul>
        <p><strong>(b)</strong> The coupons are 3. Their present values: $3e^{-0.04859\times 0.5}=3\times 0.976=2.928$
        (that is $3\times 97.6/100$) and $3e^{-0.05129}=3\times 0.95=2.850$. Hence</p>
        <p>$$103\,e^{-1.5R}=99.2-2.928-2.850=93.422\ \Rightarrow\ R=\frac{1}{1.5}\ln\frac{103}{93.422}\approx 6.507\%.$$</p>
        <p><strong>(c)</strong> Coupons of 3.5: $3.5\times 0.976=3.416$; $3.5\times 0.95=3.325$;
        $3.5\,e^{-0.06507\times 1.5}\approx 3.175$. Hence</p>
        <p>$$103.5\,e^{-2R}=100.4-3.416-3.325-3.175=90.484\ \Rightarrow\ R=\frac12\ln\frac{103.5}{90.484}\approx 6.720\%.$$</p>
        <p><strong>(d)</strong> The curve is upward sloping: 4.83%; 4.86%; 5.13%; 6.51%; 6.72%, with a sharp rise between 1
        and 1.5 years. Forward rate between 1.5 and 2 years:</p>
        <p>$$f=\frac{6.720\times 2-6.507\times 1.5}{0.5}\approx 7.36\%,$$</p>
        <p>above the 2-year zero rate, as expected for an upward sloping curve.</p>`,
    },
    {
      id: "ex-forward",
      title: "Forward rates and the instantaneous forward rate",
      difficulty: "moyen",
      tags: ["forward rates", "yield curve"],
      statement: String.raw`<p>(a) The (continuous) zero rates for 1, 2, 3, 4 and 5 years are 2.0%; 2.8%; 3.3%; 3.6%; 3.8%.
        Compute the forward rates for years 2 to 5.</p>
        <p>(b) Show that the formula $f_{12}=(R_2T_2-R_1T_1)/(T_2-T_1)$ follows from the absence of arbitrage between two investment strategies.</p>
        <p>(c) In Figure 2.5 of the course, the 5-year zero rate is shown as 5.5% and the forward rate for year 5 as 6.5%.
        Are these values consistent?</p>
        <p>(d) The zero curve is $R(T)=0.02+0.005\,T$. Give the instantaneous forward rate $F(T)$ and compare it with $R(T)$.</p>`,
      solution: String.raw`
        <p><strong>(a)</strong> With $T_2-T_1=1$ year, $f=R_nn-R_{n-1}(n-1)$:</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>Year</th><th>Computation</th><th>Forward</th></tr></thead>
          <tbody>
            <tr><td>2</td><td>$2.8\times 2-2.0\times 1$</td><td>3.6%</td></tr>
            <tr><td>3</td><td>$3.3\times 3-2.8\times 2$</td><td>4.3%</td></tr>
            <tr><td>4</td><td>$3.6\times 4-3.3\times 3$</td><td>4.5%</td></tr>
            <tr><td>5</td><td>$3.8\times 5-3.6\times 4$</td><td>4.6%</td></tr>
          </tbody></table></div>
        <p><strong>(b)</strong> Strategy 1: invest 1 € until $T_2$ at the zero rate $R_2$, getting $e^{R_2T_2}$. Strategy 2:
        invest until $T_1$ at rate $R_1$, and lock in today the reinvestment rate $f_{12}$ over $[T_1,T_2]$, getting
        $e^{R_1T_1}e^{f_{12}(T_2-T_1)}$. Both strategies are risk-free; if one paid more, one would borrow through the other
        and invest in it, with a certain profit. So $R_2T_2=R_1T_1+f_{12}(T_2-T_1)$, which gives the formula.</p>
        <p><strong>(c)</strong> No: $5.5\times 5-5.0\times 4=27.5-20=7.5\%$, not 6.5%. The original table (Hull) gives a 5-year
        zero rate of 5.3%: $5.3\times 5-20=6.5\%$. It is a typo in the PDF.</p>
        <p><strong>(d)</strong> $F(T)=R+T\,\partial R/\partial T=0.02+0.005\,T+0.005\,T=0.02+0.01\,T$. For $T\gt 0$,
        $F(T)-R(T)=0.005\,T\gt 0$: the curve being upward sloping, the instantaneous forward is above the zero rate, with
        twice the slope.</p>`,
    },
    {
      id: "ex-curve-order",
      title: "Forward, zero and par yield: proving the ordering",
      difficulty: "difficile",
      tags: ["yield curve", "par yield", "forward rates"],
      statement: String.raw`<p>The course states: for an upward sloping curve, forward rate $\gt$ zero rate $\gt$ par yield, and the
        opposite for a downward sloping curve ("Why? Prove it for simple examples").</p>
        <p>(a) Show that $f_{12}\gt R_2$ if and only if $R_2\gt R_1$.</p>
        <p>(b) Upward curve: continuous zero rates of 3% at 1 year and 4% at 2 years. Compute the forward rate for year 2,
        then the 2-year par yield of a bond with an <em>annual</em> coupon, and compare (converting the par yield into a
        continuous rate).</p>
        <p>(c) Same work for a downward curve: 5% at 1 year and 4% at 2 years.</p>
        <p>(d) Explain intuitively why the par yield sits on the side of short rates.</p>`,
      hints: [
        String.raw`(a) Write $f_{12}=R_2+(R_2-R_1)\dfrac{T_1}{T_2-T_1}$.`,
        String.raw`(b) Annual par yield: $c\,(e^{-0.03}+e^{-0.08})+100\,e^{-0.08}=100$.`,
      ],
      solution: String.raw`
        <p><strong>(a)</strong> $f_{12}=\dfrac{R_2T_2-R_1T_1}{T_2-T_1}=\dfrac{R_2(T_2-T_1)+(R_2-R_1)T_1}{T_2-T_1}=R_2+(R_2-R_1)\dfrac{T_1}{T_2-T_1}$.
        Since $T_1/(T_2-T_1)\gt 0$, $f_{12}\gt R_2\iff R_2\gt R_1$. The zero rate at $T_2$ is a (time-weighted) average of
        $R_1$ and $f_{12}$; if it is above $R_1$, the forward must be even higher.</p>
        <p><strong>(b)</strong> Forward: $(4\times 2-3)/1=5\%$. Par yield (annual coupon $c$, in % of face value):</p>
        <p>$$c=\frac{100\,(1-e^{-0.08})}{e^{-0.03}+e^{-0.08}}=\frac{7.688}{0.97045+0.92312}\approx 4.060\%\ \text{(annual)}.$$</p>
        <p>Continuous: $\ln(1.04060)\approx 3.980\%$. Hence $5\%\gt 4\%\gt 3.98\%$: forward $\gt$ zero $\gt$ par yield.</p>
        <p><strong>(c)</strong> Forward: $(4\times 2-5)/1=3\%$. Par yield: $c=7.688/(e^{-0.05}+e^{-0.08})=7.688/1.87435\approx 4.102\%$
        annual, i.e. $\ln(1.04102)\approx 4.020\%$ continuous. Hence $3\%\lt 4\%\lt 4.02\%$: the order is reversed.</p>
        <p><strong>(d)</strong> A par bond pays coupons before maturity; these coupons are discounted at the zero rates of their
        (shorter) dates. The par yield is therefore a kind of average of zero rates <em>up to</em> $T$, weighted by cash
        flows. If the curve rises, this average is pulled towards the lower short rates, hence below $R_T$; if it falls, it
        is above. The weight of the final principal keeps it close to $R_T$.</p>`,
    },
    {
      id: "ex-fra",
      title: "Valuing and settling an FRA",
      difficulty: "moyen",
      tags: ["FRA", "forward rates"],
      statement: String.raw`<p>A bank has entered into an FRA under which it <em>receives</em> a fixed rate $R_K=5\%$ (quarterly compounding) on
        a principal of 10 million €, for the three-month period starting in six months ($T_1=0.5$, $T_2=0.75$). Zero rates
        (continuous) are 4.0% at 6 months and 4.4% at 9 months.</p>
        <p>(a) Compute the continuous forward rate for the period, then convert it to quarterly compounding ($R_F$).
        (b) Compute the value of the FRA for the bank. (c) In six months, the observed quarterly rate for the period turns
        out to be 4.5%. What cash flow does the bank receive at $T_2$? What would the equivalent amount be if settlement
        took place at $T_1$? (d) Why does the result of (c) not contradict (b)?</p>`,
      hints: [String.raw`(a) $f=(R_2T_2-R_1T_1)/(T_2-T_1)$ then $R_4=4(e^{f/4}-1)$: the FRA covers a 3-month period, so the rate must be quarterly.`],
      solution: String.raw`
        <p><strong>(a)</strong> $f=\dfrac{0.044\times 0.75-0.04\times 0.5}{0.25}=\dfrac{0.033-0.020}{0.25}=5.2\%$ (continuous).
        Quarterly: $R_F=4\big(e^{0.052/4}-1\big)\approx 5.234\%$.</p>
        <p><strong>(b)</strong> The bank receives $R_K$:</p>
        <p>$$V=L(R_K-R_F)(T_2-T_1)e^{-R_2T_2}=10{,}000{,}000\times(0.05-0.05234)\times 0.25\times e^{-0.044\times 0.75}\approx-5{,}659\ \text{€}.$$</p>
        <p>The value is negative: the bank has agreed to receive 5% while the market expects 5.23% for that period.</p>
        <p><strong>(c)</strong> Cash flow at $T_2$: $10{,}000{,}000\times(0.05-0.045)\times 0.25=+12{,}500$ €. Settled at $T_1$,
        it is discounted over three months at the observed rate: $12{,}500/(1+0.045\times 0.25)=12{,}500/1.01125\approx 12{,}361$ €.</p>
        <p><strong>(d)</strong> The value in (b) is computed <em>today</em>, assuming the forward rate, the market's implied
        expectation, is realized. The rate actually observed (4.5%) turned out lower than expected, which worked in the
        bank's favour. A negative value does not rule out an ex post gain: it only says that, at current rates, the
        contract is unfavourable.</p>`,
    },
    {
      id: "ex-duration",
      title: "Computing and using duration",
      difficulty: "moyen",
      tags: ["duration", "bonds"],
      statement: String.raw`<p>A bond with principal 100 and maturity 3 years pays an annual coupon of 8 (at year end). Its yield is
        $y=7\%$ (continuous compounding).</p>
        <p>(a) Compute its price $B$ and its Macaulay duration $D$. (b) Use duration to estimate the price change if the
        yield rises by 10 basis points ($\Delta y=0.001$), and compare with the exact recomputed price. (c) Compute its dollar
        duration. (d) If the yield were expressed with annual compounding ($y=7\%$ annual) and the duration unchanged, what
        would the modified duration be?</p>`,
      hints: [String.raw`Build a table: $t_i$, $c_i$, $c_ie^{-yt_i}$, weight $c_ie^{-yt_i}/B$, then $t_i\times$ weight.`],
      solution: String.raw`
        <p><strong>(a)</strong></p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>$t_i$</th><th>$c_i$</th><th>$c_ie^{-0.07t_i}$</th><th>Weight</th><th>$t_i\times$ weight</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>8</td><td>7.459</td><td>0.0732</td><td>0.0732</td></tr>
            <tr><td>2</td><td>8</td><td>6.955</td><td>0.0682</td><td>0.1364</td></tr>
            <tr><td>3</td><td>108</td><td>87.543</td><td>0.8586</td><td>2.5759</td></tr>
            <tr><td>Total</td><td></td><td>$B=101.957$</td><td>1</td><td>$D=2.785$</td></tr>
          </tbody></table></div>
        <p>The duration (2.79 years) is below the maturity (3 years) because part of the value arrives earlier, through the coupons.</p>
        <p><strong>(b)</strong> $\Delta B\approx-BD\Delta y=-101.957\times 2.785\times 0.001\approx-0.2840$. Exact price with
        $y=7.1\%$: $8e^{-0.071}+8e^{-0.142}+108e^{-0.213}\approx 101.673$, i.e. $\Delta B=-0.2836$. The approximation is
        excellent for a small change.</p>
        <p><strong>(c)</strong> With continuous compounding, $D^*=D$: $D^{**}=D\times B\approx 2.785\times 101.957\approx 284.0$.
        A 1 basis point rise ($0.0001$) loses about $0.0284$ per 100 of principal.</p>
        <p><strong>(d)</strong> $D^*=D/(1+y/m)=2.785/1.07\approx 2.603$. With an annually compounded yield, $D^*$ is what links
        $\Delta B/B$ to $\Delta y$.</p>`,
    },
    {
      id: "ex-convexity",
      title: "Improving the approximation with convexity",
      difficulty: "difficile",
      tags: ["convexity", "duration"],
      statement: String.raw`<p>Take the bond from the previous exercise (principal 100, annual coupon 8, maturity 3 years, $y=7\%$
        continuous, $B=101.957$, $D=2.785$).</p>
        <p>(a) Compute its convexity $C$. (b) For a 2-point rise in yield ($\Delta y=+0.02$), estimate the price change with
        duration alone, then with duration and convexity, and compare with the exact price. (c) Same work for a 2-point fall.
        (d) What can be concluded about the sign of the error made by duration alone?</p>`,
      solution: String.raw`
        <p><strong>(a)</strong> $C=\sum t_i^2\times\text{weight}_i=1\times 0.0732+4\times 0.0682+9\times 0.8586\approx 8.074$.</p>
        <p><strong>(b)</strong> Duration alone: $\Delta B\approx-BD\Delta y=-101.957\times 2.785\times 0.02\approx-5.680$.
        With convexity: $\Delta B\approx B\big(-D\Delta y+\frac12C(\Delta y)^2\big)=101.957\times(-0.05571+0.00161)\approx-5.515$.
        Exact ($y=9\%$): $8e^{-0.09}+8e^{-0.18}+108e^{-0.27}\approx 96.439$, i.e. $\Delta B=-5.519$.</p>
        <p><strong>(c)</strong> Duration alone: $+5.680$. With convexity: $101.957\times(0.05571+0.00161)\approx+5.845$.
        Exact ($y=5\%$): $\Delta B=+5.848$.</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>$\Delta y$</th><th>Duration alone</th><th>Duration + convexity</th><th>Exact</th></tr></thead>
          <tbody>
            <tr><td>$+2\%$</td><td>$-5.680$</td><td>$-5.515$</td><td>$-5.519$</td></tr>
            <tr><td>$-2\%$</td><td>$+5.680$</td><td>$+5.845$</td><td>$+5.848$</td></tr>
          </tbody></table></div>
        <p><strong>(d)</strong> Duration alone <em>always underestimates</em> the price: it overstates the fall when rates rise
        and understates the rise when they fall. The price is a convex function of the yield, lying above its tangent. The
        always-positive term $\frac12C(\Delta y)^2$ corrects most of this gap.</p>`,
    },
    {
      id: "ex-immunization",
      title: "Immunizing a liability with duration",
      difficulty: "difficile",
      tags: ["immunization", "duration", "convexity", "portfolio"],
      statement: String.raw`<p>An insurer must pay 1,000,000 € in 5 years. The yield curve is flat at 5% (continuous). Two zero-coupon
        bonds are available, with maturities of 2 years and 10 years.</p>
        <p>(a) What are the present value and the duration of the liability? (b) How much should be invested in each
        zero-coupon bond so that the assets have the same present value and duration as the liability? (c) Compare the
        convexities of the assets and of the liability. (d) The curve shifts in parallel by $+1\%$, then (other scenario) by
        $-1\%$. In each case compute the value of the assets and of the liability. Conclude. (e) Against which type of rate
        movement is the insurer not protected?</p>`,
      hints: [
        String.raw`The duration of a zero-coupon bond is its maturity; that of a portfolio is the value-weighted average.`,
        String.raw`After a shift $\Delta y$, a zero-coupon bond with present value $V$ and maturity $T$ is worth $V\,e^{-\Delta y\,T}$.`,
      ],
      solution: String.raw`
        <p><strong>(a)</strong> $PV=1{,}000{,}000\,e^{-0.05\times 5}=1{,}000{,}000\,e^{-0.25}\approx 778{,}801$ €. Duration: 5 years (single cash flow).</p>
        <p><strong>(b)</strong> Let $w$ be the share invested in the 2-year bond: $2w+10(1-w)=5$, so $w=5/8=0.625$. Amounts:
        $0.625\times 778{,}801\approx 486{,}750$ € in the 2-year bond and $0.375\times 778{,}801\approx 292{,}050$ € in the 10-year bond.</p>
        <p><strong>(c)</strong> Convexity of a zero-coupon bond: $T^2$. Assets: $0.625\times 4+0.375\times 100=40$. Liability:
        $5^2=25$. The barbell portfolio is more convex than the liability.</p>
        <p><strong>(d)</strong></p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>Scenario</th><th>Assets</th><th>Liability</th><th>Surplus</th></tr></thead>
          <tbody>
            <tr><td>$+1\%$</td><td>$486{,}750e^{-0.02}+292{,}050e^{-0.10}\approx 741{,}370$</td><td>$1{,}000{,}000e^{-0.30}\approx 740{,}818$</td><td>$+552$</td></tr>
            <tr><td>$-1\%$</td><td>$486{,}750e^{0.02}+292{,}050e^{0.10}\approx 819{,}349$</td><td>$1{,}000{,}000e^{-0.20}\approx 818{,}731$</td><td>$+618$</td></tr>
          </tbody></table></div>
        <p>In both cases the assets move almost exactly like the liability (effect of zero net duration), and the insurer even
        earns a small surplus, thanks to the higher convexity of the assets.</p>
        <p><strong>(e)</strong> Immunization only protects against <em>parallel</em> shifts (the smaller, the better). If the curve
        changes shape (e.g. the 10-year rate rises while the 2-year rate falls), the assets may lose more than the liability.
        The portfolio must also be rebalanced over time, since durations change.</p>`,
    },
  ],

  /* -------------------- DEFINITIONS -------------------- */
  definitions: [
    { term: "Interest rate", abbr: "IR", def: String.raw`In a given situation, defines the amount of money a borrower promises to pay the lender. Depends on the currency, the maturity and the credit risk.` },
    { term: "Credit risk", def: String.raw`Risk that the borrower does not pay the promised interest or principal. The higher it is, the higher the promised rate.` },
    { term: "Treasury rate", def: String.raw`Rate earned on the bills (<strong>T-bills</strong>) and bonds (<strong>T-bonds</strong>) of a government borrowing in its own currency. Considered totally risk-free.` },
    { term: "London Interbank Offered Rate", abbr: "LIBOR", def: String.raw`Rate at which a bank is prepared to make a large wholesale deposit with other banks (AA-rated deposit). Close to risk-free; used by derivative traders as the risk-free rate, now replaced by rates such as SOFR.` },
    { term: "AA rating", def: String.raw`Second-best S&amp;P credit rating (after AAA): very low but non-zero default risk.` },
    { term: "Certificate of deposit", abbr: "CD", def: String.raw`Time deposit issued by a bank in the money market; its rate (CD rate) serves as a market reference rate, notably in FRAs.` },
    { term: "Repurchase agreement", abbr: "Repo / RP", def: String.raw`Sale of securities with an agreement to buy them back at a slightly higher price. The <strong>repo rate</strong> follows from the difference between the two prices; it is a secured loan.` },
    { term: "Overnight repo / term repo", def: String.raw`Overnight: for one night, renegotiated each day (the most common type). Term repo: terms fixed over a longer period.` },
    { term: "Compounding frequency", def: String.raw`Number $m$ of times per year interest is added to capital (1 annual, 2 semiannual, 4 quarterly, 12 monthly). A rate only makes sense together with it.` },
    { term: "Continuous compounding", def: String.raw`Limit $m\to\infty$: $A$ grows to $Ae^{R_cn}$ in $n$ years. Standard convention in option pricing.` },
    { term: "Equivalent rates", def: String.raw`Rates giving the same final value with different frequencies: $R_c=m\ln(1+R_m/m)$, $R_m=m(e^{R_c/m}-1)$.` },
    { term: "Zero rate", abbr: "zero / spot rate", def: String.raw`Rate earned on an investment that provides a single payoff, at maturity $T$.` },
    { term: "Zero curve", def: String.raw`Zero rates as a function of maturity. Obtained by bootstrapping T-bill and bond prices; upward sloping, flat or downward sloping.` },
    { term: "Theoretical bond price", def: String.raw`Sum of the cash flows (coupons and principal), each discounted at the zero rate of its date: $B=\sum_ic_ie^{-R_it_i}$.` },
    { term: "Face value (notional, principal)", def: String.raw`Amount repaid at maturity, on which coupons are computed (100 in the course examples).` },
    { term: "Coupon", def: String.raw`Periodic interest paid by a bond; a "6% coupon paid semiannually" means 3% of face value every six months.` },
    { term: "Bond yield", abbr: "yield", def: String.raw`Single discount rate $y$ which, applied to all cash flows, makes their present value equal to the market price. Computed numerically.` },
    { term: "Par yield", def: String.raw`Coupon rate that makes the price of a bond equal to its face value: $c=(1-d)m/A$.` },
    { term: "Annuity", def: String.raw`Series of equal payments at regular dates. In the par yield formula, $A$ is the present value of an annuity of 1 on each coupon date.` },
    { term: "Bootstrap method", def: String.raw`Building the zero curve maturity by maturity: each bond brings a single unknown rate, earlier cash flows being discounted with the rates already found.` },
    { term: "Linear interpolation", def: String.raw`Between two maturities with known zero rates, points are joined by a straight line; the curve is assumed flat before the first and after the last point.` },
    { term: "Forward rate", def: String.raw`Rate implied by current zero rates for a future period $[T_1,T_2]$: $f_{12}=(R_2T_2-R_1T_1)/(T_2-T_1)$.` },
    { term: "Instantaneous forward rate", def: String.raw`Forward rate for an infinitesimal period starting at $T$: $F(T)=R+T\,\partial R/\partial T$.` },
    { term: "Upward / downward sloping curve", def: String.raw`Upward: forward $\gt$ zero $\gt$ par yield. Downward: forward $\lt$ zero $\lt$ par yield. Flat: all three are equal.` },
    { term: "Forward Rate Agreement", abbr: "FRA", def: String.raw`OTC agreement fixing the rate $R_K$ applying to a principal $L$ over a future period $[T_1,T_2]$. Value when receiving $R_K$: $L(R_K-R_F)(T_2-T_1)e^{-R_2T_2}$.` },
    { term: "Over-the-counter", abbr: "OTC", def: String.raw`Traded directly between two parties, off exchange. FRAs are OTC products.` },
    { term: "Forward CD rate $R_F$", def: String.raw`Expected market rate for the FRA period, expressed with the compounding of that period. The FRA is valued assuming it is realized.` },
    { term: "Basis point", abbr: "bp", def: String.raw`One hundredth of a percentage point: $0.01\%=0.0001$. Usual unit for rate changes.` },
    { term: "Macaulay duration", def: String.raw`Average of cash-flow times weighted by each cash flow's share of the price: $D=\sum t_ic_ie^{-yt_i}/B$. Equal to $T$ for a zero-coupon bond; gives $\Delta B/B\approx-D\Delta y$.` },
    { term: "Modified duration", abbr: "D*", def: String.raw`$D^*=D/(1+y/m)$ when the yield is compounded $m$ times a year; then $\Delta B/B\approx-D^*\Delta y$. Equal to $D$ with continuous compounding.` },
    { term: "Dollar duration", abbr: "D**", def: String.raw`Product of modified duration and price: $D^{**}=D^*B$, so that $\Delta B\approx-D^{**}\Delta y$ (change in amount).` },
    { term: "Portfolio duration", def: String.raw`Average of the bonds' durations weighted by their market values. Measures the effect of small parallel shifts in the curve.` },
    { term: "Parallel shift", def: String.raw`Identical change $\Delta y$ in all rates, whatever the maturity. Underlying assumption of duration and convexity.` },
    { term: "Immunization", def: String.raw`Choosing assets with the same present value and duration as the liabilities (zero net duration): protects against small parallel shifts, not against large or nonparallel ones.` },
    { term: "Convexity", def: String.raw`$C=\frac1B\partial^2B/\partial y^2=\sum c_it_i^2e^{-yt_i}/B$. Corrects duration: $\Delta B/B\approx-D\Delta y+\frac12C(\Delta y)^2$. High when cash flows are spread out, low when they are concentrated.` },
    { term: "Barbell / bullet portfolio", def: String.raw`Barbell: cash flows grouped at both ends (short and long term), high convexity. Bullet: cash flows around a single date, low convexity, for equal duration.` },
  ],
});
