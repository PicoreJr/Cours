/* ============================================================
   Probability — Chapters 1 to 3: Basic probability (ENGLISH)
   Translation of data/proba/ch01-03.js. Same chapter id, same
   exercise ids, same quiz choice order and answers.
   Source: IMEN266 slides ch1-3 + Companion (Ross, ch. 1-3).
   NB: LaTeX fields use String.raw. Never write the sequence ${ }.
   In HTML fields, write "&lt;" for "<" followed by a letter.
   ============================================================ */
addChapter("proba", {
  id: "ch01-03",
  title: "Chapters 1 to 3 — Basic probability",
  short: "Ch. 1 to 3",
  lang: "en",

  /* -------------------- COURSE SUMMARY -------------------- */
  summary: String.raw`
    <h3>1. Probability space and events</h3>
    <p>The <strong>sample space</strong> $\Omega$ collects every possible outcome of a random
    experiment; an <strong>event</strong> is a subset $A \subseteq \Omega$. A
    <strong>probability measure</strong> $P$ assigns a number to each event and satisfies three
    axioms:</p>
    <ul>
      <li>$P(A) \ge 0$ for every event $A$;</li>
      <li>$P(\Omega) = 1$ (hence $P(\varnothing)=0$);</li>
      <li><strong>countable additivity</strong>: if the $A_i$ are pairwise disjoint,
          $P\!\left(\bigcup_i A_i\right) = \sum_i P(A_i)$.</li>
    </ul>
    <p>Three consequences to know: $P(A^c) = 1 - P(A)$; if $A \subseteq B$ then
    $P(A) \le P(B)$; and for any two events, the <strong>inclusion-exclusion</strong> formula
    $P(A\cup B) = P(A)+P(B)-P(A\cap B)$. The term $P(A\cap B)$ corrects the double counting of the
    intersection; it vanishes only when $A$ and $B$ are disjoint.</p>

    <h3>2. Conditional probability and independence</h3>
    <p>For $P(B) > 0$, define $P(A \mid B) = \dfrac{P(A\cap B)}{P(B)}$: the probability of $A$
    once we know that $B$ has occurred. This gives the <strong>multiplication rule</strong>
    $P(A\cap B) = P(A\mid B)\,P(B) = P(B\mid A)\,P(A)$, used to compute the probability of a
    sequence of events one step at a time.</p>
    <p>Two events $A$ and $B$ are <strong>independent</strong> if and only if
    $P(A\cap B) = P(A)\,P(B)$, which is equivalent to $P(A\mid B)=P(A)$: knowing that $B$
    occurred tells us nothing about $A$.</p>
    <div class="callout warn"><strong>Two classic traps.</strong>
      <p>Disjoint is not independent: if $A$ and $B$ are disjoint with $P(A)>0$ and $P(B)>0$,
      then $P(A\cap B)=0\neq P(A)P(B)$. They are therefore <em>never</em> independent.</p>
      <p>For three or more events, <strong>mutual independence</strong> requires the product rule
      for <em>every</em> sub-collection, not only for pairs. Pairwise independence does not imply
      mutual independence.</p></div>

    <h3>3. Reliability: series and parallel systems</h3>
    <p>Consider $n$ independent components; component $i$ works with probability $p_i$.</p>
    <ul>
      <li><strong>Series</strong> (the system works if <em>all</em> components work):
          $R_{\text{series}} = \prod_{i=1}^n p_i$. This product is smaller than each $p_i$: a series
          system is less reliable than its weakest link.</li>
      <li><strong>Parallel</strong> (the system works if <em>at least one</em> component works):
          $R_{\text{parallel}} = 1 - \prod_{i=1}^n (1-p_i)$. Go through the complement "all
          failed". This number is larger than each $p_i$: redundancy always improves reliability.</li>
    </ul>

    <h3>4. Law of total probability and Bayes' rule</h3>
    <p>If $B_1,\dots,B_n$ form a <strong>partition</strong> of $\Omega$ (pairwise disjoint events
    whose union is $\Omega$, with $P(B_i)>0$), then for every event $A$:</p>
    <p>$$P(A) = \sum_{i=1}^n P(A\mid B_i)\,P(B_i), \qquad
        P(B_j \mid A) = \frac{P(A\mid B_j)\,P(B_j)}{\sum_i P(A\mid B_i)\,P(B_i)}.$$</p>
    <p>The first formula (total probability) splits $A$ according to the cases $B_i$; the second
    (Bayes) reverses the conditioning. Read it as: <strong>posterior $\propto$ prior
    $\times$ likelihood</strong>.</p>
    <p>Beware of the <strong>base-rate fallacy</strong>: for a disease affecting 0.4% of the
    population, a test that detects 95% of sick people and clears 96% of healthy people gives, after
    a positive result, only about a 9% chance of actually being sick. False positives, drawn from an
    overwhelming majority of healthy people, far outnumber true positives.</p>

    <h3>5. Random variables</h3>
    <p>A random variable $X$ assigns a number to each outcome of the experiment. Its
    <strong>cumulative distribution function</strong> (cdf) $F(x)=P(X\le x)$ is non-decreasing,
    right-continuous, and satisfies $\lim_{x\to-\infty}F(x)=0$ and $\lim_{x\to+\infty}F(x)=1$.</p>
    <ul>
      <li><strong>Discrete</strong>: described by its probability mass function (pmf) $p(x)=P(X=x)$,
          with $p(x)\ge 0$ and $\sum_x p(x)=1$.</li>
      <li><strong>Continuous</strong>: described by its density (pdf) $f\ge 0$ with $\int_{\mathbb R} f = 1$.
          We have $P(a&lt;X\le b)=\int_a^b f(x)\,dx = F(b)-F(a)$, $f = F'$, and $P(X=x)=0$ at every
          point: only intervals carry probability.</li>
    </ul>

    <h4>The distributions of the course</h4>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Distribution</th><th>pmf or pdf</th><th>Mean</th><th>Variance</th><th>Typical situation</th></tr></thead>
      <tbody>
        <tr><td>Bernoulli$(p)$</td><td>$p^x(1-p)^{1-x}$, $x\in\{0,1\}$</td><td>$p$</td><td>$p(1-p)$</td><td>is one item defective?</td></tr>
        <tr><td>Binomial$(n,p)$</td><td>$\binom{n}{x}p^x(1-p)^{n-x}$</td><td>$np$</td><td>$np(1-p)$</td><td>number of successes in $n$ fixed trials</td></tr>
        <tr><td>Geometric$(p)$</td><td>$(1-p)^{x-1}p$, $x\ge 1$</td><td>$1/p$</td><td>$(1-p)/p^2$</td><td>trial of the first success</td></tr>
        <tr><td>Negative binomial$(r,p)$</td><td>$\binom{x-1}{r-1}p^r(1-p)^{x-r}$, $x\ge r$</td><td>$r/p$</td><td>$r(1-p)/p^2$</td><td>trial of the $r$-th success</td></tr>
        <tr><td>Hypergeometric$(N,K,n)$</td><td>$\dfrac{\binom{K}{x}\binom{N-K}{n-x}}{\binom{N}{n}}$</td><td>$nK/N$</td><td>$n\tfrac{K}{N}\tfrac{N-K}{N}\tfrac{N-n}{N-1}$</td><td>$n$ draws without replacement from $N$ items, $K$ of them marked</td></tr>
        <tr><td>Poisson$(\lambda)$</td><td>$e^{-\lambda}\lambda^x/x!$</td><td>$\lambda$</td><td>$\lambda$</td><td>number of events in a period, at mean rate $\lambda$</td></tr>
        <tr><td>Uniform$(a,b)$</td><td>$1/(b-a)$ on $[a,b]$</td><td>$\tfrac{a+b}{2}$</td><td>$\tfrac{(b-a)^2}{12}$</td><td>no preferred value</td></tr>
        <tr><td>Exponential$(\lambda)$</td><td>$\lambda e^{-\lambda x}$, $x\ge 0$</td><td>$1/\lambda$</td><td>$1/\lambda^2$</td><td>lifetime, waiting time</td></tr>
        <tr><td>Erlang$(k,\lambda)$</td><td>$\dfrac{\lambda^k x^{k-1}e^{-\lambda x}}{(k-1)!}$, $x\ge 0$</td><td>$k/\lambda$</td><td>$k/\lambda^2$</td><td>sum of $k$ independent exponentials</td></tr>
        <tr><td>Normal$(\mu,\sigma^2)$</td><td>$\dfrac{1}{\sigma\sqrt{2\pi}}\,e^{-(x-\mu)^2/(2\sigma^2)}$</td><td>$\mu$</td><td>$\sigma^2$</td><td>sum of many small effects</td></tr>
      </tbody>
    </table></div>
    <p>Remember the <em>situation</em> as much as the formula: the Binomial counts successes in a
    fixed number of trials; the Geometric and Negative binomial wait for the first or the $r$-th
    success; the Poisson counts events occurring at a given mean rate; the Hypergeometric is
    sampling without replacement; the Erlang is a sum of $k$ independent exponentials with the same
    rate.</p>

    <h3>6. Expectation, LOTUS, variance</h3>
    <p>The <strong>expectation</strong> is the weighted average of the values:
    $E[X]=\sum_x x\,p(x)$ in the discrete case, $E[X]=\int_{\mathbb R} x f(x)\,dx$ in the continuous case.
    <strong>LOTUS</strong> (the <em>law of the unconscious statistician</em>) lets us compute
    $E[g(X)]=\sum_x g(x)\,p(x)$ or $\int g(x) f(x)\,dx$ without ever finding the distribution of $g(X)$.</p>
    <p><strong>Linearity</strong> $E[aX+bY]=a\,E[X]+b\,E[Y]$ always holds, with no independence
    assumption. By contrast, $E[XY]=E[X]\,E[Y]$ and $\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)$
    require independence.</p>
    <p>The <strong>variance</strong> measures the spread around the mean:
    $\operatorname{Var}(X)=E\big[(X-E[X])^2\big]=E[X^2]-(E[X])^2$, and $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$.
    A shift does not change the variance; a factor $a$ multiplies it by $a^2$.</p>
    <div class="callout"><strong>Tail-sum formula</strong> (valid for $X\ge 0$).
      $E[X]=\sum_{k\ge 1}P(X\ge k)$ if $X$ is integer-valued, and $E[X]=\int_0^\infty P(X>x)\,dx$
      if $X$ is continuous. Handy when the survival function $P(X>x)$ is simpler than the density.</div>

    <h3>7. Memorylessness</h3>
    <p>A distribution is <strong>memoryless</strong> if having already waited does not change the
    distribution of the remaining wait:</p>
    <p>$$P(X>m+n\mid X>m)=P(X>n)\ \ \text{(discrete)}, \qquad P(X>s+t\mid X>s)=P(X>t)\ \ \text{(continuous)}.$$</p>
    <p>The only memoryless distributions are the <strong>Geometric</strong> (discrete case) and the
    <strong>Exponential</strong> (continuous case). The proof is one line: $P(X>k)=(1-p)^k$ or
    $P(X>t)=e^{-\lambda t}$, and the quotient simplifies. A component with an exponential lifetime that
    has already been in service is therefore "as good as new". The Erlang with $k\ge 2$, the Uniform
    and the Normal are <em>not</em> memoryless.</p>
  `,

  /* -------------------- KEY POINTS -------------------- */
  keyPoints: [
    {
      text: String.raw`<strong>Conditional probability and multiplication rule.</strong>
        $P(A\mid B)=P(A\cap B)/P(B)$, hence $P(A\cap B)=P(A\mid B)\,P(B)$. Three notations denote the
        same event: $P(A\cap B)$, $P(A,B)$ and $P(AB)$.`,
    },
    {
      text: String.raw`<strong>Independence.</strong> $P(A\cap B)=P(A)P(B)$. Disjoint is not independent.
        Mutual independence implies pairwise independence, but the converse is false.
        Counterexample: two tosses of a fair coin, $A$ = "heads on the first toss",
        $B$ = "heads on the second", $C$ = "both tosses show the same side". Every pair is
        independent, but $P(A\cap B\cap C)=\tfrac14\neq\tfrac18$.`,
    },
    {
      text: String.raw`<strong>Reliability.</strong> Series: $\prod p_i$, weaker than the weakest link.
        Parallel: $1-\prod(1-p_i)$, stronger than the best component. Reflex: for "at least one",
        go through the complement "none".`,
      exos: ["ex-series-parallel"],
    },
    {
      text: String.raw`<strong>Total probability, then Bayes.</strong> Split $A$ along a partition
        $(B_i)$: $P(A)=\sum_i P(A\mid B_i)P(B_i)$. Then posterior $\propto$ prior $\times$
        likelihood. Base-rate fallacy: when the cause is rare, even a good test mostly produces
        false positives.`,
      exos: ["ex-cooks", "ex-cancer", "ex-coins"],
    },
    {
      text: String.raw`<strong>Recognise the discrete distribution from the situation.</strong>
        Fixed number of trials: Binomial. Waiting for the first success: Geometric. Waiting for the
        $r$-th success: Negative binomial. Counting at a fixed mean rate: Poisson. Sampling without
        replacement: Hypergeometric.`,
      exos: ["ex-lathes", "ex-yield", "ex-poisson-cars"],
    },
    {
      text: String.raw`<strong>pmf, pdf, cdf.</strong> In the continuous case $P(X=x)=0$ and
        $P(a&lt;X\le b)=F(b)-F(a)=\int_a^b f$. To build $F$ from $f$, integrate piece by piece and
        check that $F$ starts at 0 and ends at 1.`,
      exos: ["ex-polypdf"],
    },
    {
      text: String.raw`<strong>Key continuous distributions.</strong> Uniform, Exponential (memoryless),
        Erlang $=$ sum of $k$ independent exponentials, Normal. To identify an Erlang from its mean and
        variance: $\operatorname{Var}/E = 1/\lambda$, then $k=\lambda E$.`,
      exos: ["ex-exp-life", "ex-erlang-msg"],
    },
    {
      text: String.raw`<strong>Expectation and variance.</strong> LOTUS for $E[g(X)]$;
        $\operatorname{Var}(X)=E[X^2]-(E[X])^2$; $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$;
        linearity of expectation with no independence assumption; tail-sum formula for $X\ge 0$.`,
      exos: ["ex-findab", "ex-docsize"],
    },
    {
      text: String.raw`<strong>Memorylessness.</strong> Standard proof: write $P(X>k)=(1-p)^k$
        (Geometric) or $P(X>t)=e^{-\lambda t}$ (Exponential), then simplify the quotient
        $P(X>s+t)/P(X>s)$. Only these two distributions have the property.`,
      exos: ["ex-exp-life"],
    },
  ],

  /* -------------------- FORMULA SHEET -------------------- */
  formulas: [
    { name: "Inclusion-exclusion", note: "two events", latex: String.raw`P(A\cup B)=P(A)+P(B)-P(A\cap B)` },
    { name: "Complement", latex: String.raw`P(A^c)=1-P(A)` },
    { name: "Conditional probability", note: "P(B) > 0", latex: String.raw`P(A\mid B)=\frac{P(A\cap B)}{P(B)}` },
    { name: "Multiplication rule", latex: String.raw`P(A\cap B)=P(A\mid B)\,P(B)=P(B\mid A)\,P(A)` },
    { name: "Independence", latex: String.raw`P(A\cap B)=P(A)\,P(B)\iff P(A\mid B)=P(A)` },
    { name: "Series reliability", note: "every component must work", latex: String.raw`R_{\text{series}}=\prod_{i=1}^{n}p_i` },
    { name: "Parallel reliability", note: "at least one component works", latex: String.raw`R_{\text{parallel}}=1-\prod_{i=1}^{n}(1-p_i)` },
    { name: "Total probability", note: "(B_i) partition of the sample space", latex: String.raw`P(A)=\sum_{i=1}^{n}P(A\mid B_i)\,P(B_i)` },
    { name: "Bayes' rule", latex: String.raw`P(B_j\mid A)=\frac{P(A\mid B_j)\,P(B_j)}{\sum_i P(A\mid B_i)\,P(B_i)}` },
    { name: "Density and cdf", latex: String.raw`f(x)=F'(x),\qquad P(a<X\le b)=F(b)-F(a)=\int_a^b f(x)\,dx` },
    { name: "Expectation", latex: String.raw`E[X]=\sum_x x\,p(x)\quad\text{or}\quad E[X]=\int_{\mathbb R} x\,f(x)\,dx` },
    { name: "LOTUS", latex: String.raw`E[g(X)]=\sum_x g(x)\,p(x)\quad\text{or}\quad E[g(X)]=\int_{\mathbb R} g(x)\,f(x)\,dx` },
    { name: "Variance", latex: String.raw`\operatorname{Var}(X)=E[X^2]-(E[X])^2,\qquad \operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)` },
    { name: "Tail-sum formula", note: "X ≥ 0", latex: String.raw`E[X]=\sum_{k\ge 1}P(X\ge k)\quad\text{or}\quad E[X]=\int_0^\infty P(X>x)\,dx` },
    { name: "Binomial (n, p)", latex: String.raw`P(X=x)=\binom{n}{x}p^x(1-p)^{n-x},\qquad E[X]=np,\ \operatorname{Var}(X)=np(1-p)` },
    { name: "Geometric (p)", note: "x ≥ 1, trial of the first success", latex: String.raw`P(X=x)=(1-p)^{x-1}p,\qquad P(X>k)=(1-p)^k,\qquad E[X]=\tfrac1p` },
    { name: "Negative binomial (r, p)", note: "x ≥ r, trial of the r-th success", latex: String.raw`P(X=x)=\binom{x-1}{r-1}p^{r}(1-p)^{x-r},\qquad E[X]=\tfrac rp` },
    { name: "Hypergeometric (N, K, n)", note: "n draws without replacement, K marked items", latex: String.raw`P(X=x)=\frac{\binom{K}{x}\binom{N-K}{n-x}}{\binom{N}{n}},\qquad E[X]=\frac{nK}{N}` },
    { name: "Poisson (λ)", latex: String.raw`P(X=x)=\frac{e^{-\lambda}\lambda^x}{x!},\qquad E[X]=\operatorname{Var}(X)=\lambda` },
    { name: "Uniform (a, b)", latex: String.raw`f(x)=\frac{1}{b-a}\ \text{on }[a,b],\qquad E[X]=\frac{a+b}{2},\ \operatorname{Var}(X)=\frac{(b-a)^2}{12}` },
    { name: "Exponential (λ)", latex: String.raw`f(x)=\lambda e^{-\lambda x},\quad F(x)=1-e^{-\lambda x},\quad P(X>t)=e^{-\lambda t},\quad E[X]=\tfrac1\lambda` },
    { name: "Erlang (k, λ)", note: "sum of k independent exponentials", latex: String.raw`f(x)=\frac{\lambda^k x^{k-1}e^{-\lambda x}}{(k-1)!},\qquad P(X>x)=\sum_{r=0}^{k-1}\frac{e^{-\lambda x}(\lambda x)^r}{r!}` },
    { name: "Erlang: mean and variance", latex: String.raw`E[X]=\frac{k}{\lambda},\qquad \operatorname{Var}(X)=\frac{k}{\lambda^2},\qquad \frac{\operatorname{Var}(X)}{E[X]}=\frac1\lambda` },
    { name: "Memorylessness", note: "Geometric and Exponential only", latex: String.raw`P(X>s+t\mid X>s)=P(X>t)` },
  ],

  /* -------------------- QUIZ -------------------- */
  qcm: [
    {
      q: String.raw`We know that $P(A)=0.5$, $P(B)=0.4$ and $P(A\cup B)=0.7$. What can be said about $A$ and $B$?`,
      choices: [
        String.raw`They are disjoint.`,
        String.raw`$A$ is included in $B$.`,
        String.raw`These values are incompatible with the axioms.`,
        String.raw`They are independent.`,
      ],
      answer: 3,
      explanation: String.raw`Inclusion-exclusion: $P(A\cap B)=0.5+0.4-0.7=0.2$. But $P(A)P(B)=0.5\times 0.4=0.2$
        as well, so $A$ and $B$ are independent. They are not disjoint since $P(A\cap B)\neq 0$.`,
    },
    {
      q: String.raw`Two events $A$ and $B$ are disjoint, with $P(A)>0$ and $P(B)>0$. Are they independent?`,
      choices: [
        String.raw`Never.`,
        String.raw`Always: being disjoint is a strong form of independence.`,
        String.raw`Only if $P(A)=P(B)$.`,
        String.raw`It depends on $P(A\cup B)$.`,
      ],
      answer: 0,
      explanation: String.raw`Disjoint means $P(A\cap B)=0$, whereas independence would require
        $P(A\cap B)=P(A)P(B)>0$. Intuition: if $A$ occurred, we are <em>certain</em> that $B$ did not,
        which is the opposite of "learning nothing".`,
    },
    {
      q: String.raw`Two fair dice are rolled. Given that the first die shows 3, what is the probability that the sum equals 7?`,
      choices: [String.raw`$1/36$`, String.raw`$1/12$`, String.raw`$1/6$`, String.raw`$1/3$`],
      answer: 2,
      explanation: String.raw`The second die must show exactly 4: probability $1/6$. Note that without any
        information, $P(\text{sum}=7)=6/36=1/6$ as well. The event "sum equals 7" is therefore independent
        of the value of the first die, which is false for every other sum.`,
    },
    {
      q: String.raw`A disease affects 0.4% of the population. A test detects 95% of sick people and gives a
        negative result for 96% of healthy people. A person tests positive: what is, approximately, the
        probability that they are actually sick?`,
      choices: [String.raw`$0.4\ \%$`, String.raw`$9\ \%$`, String.raw`$50\ \%$`, String.raw`$95\ \%$`],
      answer: 1,
      explanation: String.raw`Bayes: $P(S\mid T)=\dfrac{0.95\times 0.004}{0.95\times 0.004+0.04\times 0.996}\approx 0.087$.
        Out of 10,000 people there are about 38 true positives against 398 false positives: the rarity of the
        disease outweighs the quality of the test.`,
    },
    {
      q: String.raw`In a mailbox, 20% of messages are spam. The word "free" appears in 60% of spam messages and in 5%
        of legitimate ones. A message contains "free": what is the probability that it is spam?`,
      choices: [String.raw`$0.60$`, String.raw`$0.12$`, String.raw`$0.75$`, String.raw`$0.92$`],
      answer: 2,
      explanation: String.raw`$P(S\mid F)=\dfrac{0.6\times 0.2}{0.6\times 0.2+0.05\times 0.8}=\dfrac{0.12}{0.12+0.04}=0.75$.
        The numerator alone ($0.12$) is the <em>joint</em> probability "spam and free", not the conditional one.`,
    },
    {
      q: String.raw`Independent sensors each detect an intrusion with probability 0.8. They are placed in
        parallel (one detection is enough). How many are needed at minimum for the detection probability to exceed 99%?`,
      choices: [String.raw`2`, String.raw`3`, String.raw`5`, String.raw`10`],
      answer: 1,
      explanation: String.raw`Detection probability with $n$ sensors: $1-0.2^n$. With 2 sensors:
        $1-0.04=0.96$, not enough. With 3: $1-0.008=0.992$. We need $0.2^n\le 0.01$, i.e. $n\ge 3$.`,
    },
    {
      q: String.raw`A production line has 10 machines in series, each 95% reliable and independent.
        The reliability of the line is close to:`,
      choices: [String.raw`$50\ \%$`, String.raw`$60\ \%$`, String.raw`$90\ \%$`, String.raw`$95\ \%$`],
      answer: 1,
      explanation: String.raw`$0.95^{10}\approx 0.60$. Ten "very reliable" components in series give a system that
        fails four times out of ten: chaining degrades reliability quickly.`,
    },
    {
      q: String.raw`Which of these functions is <strong>not</strong> a valid probability mass function?`,
      choices: [
        String.raw`$p(x)=x/10$ for $x\in\{1,2,3,4\}$`,
        String.raw`$p(x)=1/4$ for $x\in\{1,2,3,4\}$`,
        String.raw`$p(x)=(3-x)/3$ for $x\in\{0,1,2\}$`,
        String.raw`$p(x)=2^{-x}$ for $x\in\{1,2,3,\dots\}$`,
      ],
      answer: 2,
      explanation: String.raw`A pmf must be non-negative and sum to 1. Here $(3+2+1)/3=2\neq 1$. The other three
        do sum to 1 (the last one is a geometric series: $\sum_{x\ge 1}2^{-x}=1$).`,
    },
    {
      q: String.raw`Which of these functions can be the cumulative distribution function of a random variable?`,
      choices: [
        String.raw`$F(x)=1-e^{-x}$ for $x\ge 0$, and $F(x)=0$ for $x<0$`,
        String.raw`$F(x)=e^{-x}$ for $x\ge 0$, and $F(x)=0$ for $x<0$`,
        String.raw`$F(x)=x^2$ for every $x\in\mathbb R$`,
        String.raw`$F(x)=\sin x$ for every $x\in\mathbb R$`,
      ],
      answer: 0,
      explanation: String.raw`A cdf is non-decreasing, tends to 0 at $-\infty$ and to 1 at $+\infty$. Only
        $F(x)=1-e^{-x}$ qualifies (it is the Exponential with rate 1). The function $e^{-x}$ decreases, $x^2$ is
        not bounded by 1 and $\sin x$ is not monotone.`,
    },
    {
      q: String.raw`$X$ is uniform on $[0,10]$. What is $P(X>7\mid X>4)$?`,
      choices: [String.raw`$0.3$`, String.raw`$0.5$`, String.raw`$0.7$`, String.raw`$0.75$`],
      answer: 1,
      explanation: String.raw`$P(X>7\mid X>4)=\dfrac{P(X>7)}{P(X>4)}=\dfrac{0.3}{0.6}=0.5$. If the Uniform were
        memoryless we would have found $P(X>3)=0.7$: it is not, only the Exponential is among continuous distributions.`,
    },
    {
      q: String.raw`The lifetime of a component is exponential with rate $\lambda=0.1$ per hour. It has been running
        for 10 hours. What is the probability that it reaches 30 hours of operation in total?`,
      choices: [String.raw`$e^{-3}$`, String.raw`$e^{-1}$`, String.raw`$1-e^{-2}$`, String.raw`$e^{-2}$`],
      answer: 3,
      explanation: String.raw`Memorylessness: $P(X>30\mid X>10)=P(X>20)=e^{-0.1\times 20}=e^{-2}\approx 0.135$.
        The used component behaves like a new one; $e^{-3}$ would be the answer if one forgot the conditioning.`,
    },
    {
      q: String.raw`$X$ is geometric with parameter $p=0.2$ (trial of the first success). What is $P(X>3)$?`,
      choices: [String.raw`$0.008$`, String.raw`$0.1024$`, String.raw`$0.488$`, String.raw`$0.512$`],
      answer: 3,
      explanation: String.raw`$X>3$ means that the first three trials are failures: $P(X>3)=(1-p)^3=0.8^3=0.512$.
        The value $0.1024=0.8^3\times 0.2$ is $P(X=4)$, and $0.488$ is $P(X\le 3)$.`,
    },
    {
      q: String.raw`$X_1,X_2,X_3$ are independent and all follow the Exponential$(\lambda)$ distribution. The sum $X_1+X_2+X_3$ follows:`,
      choices: [
        String.raw`Exponential$(3\lambda)$`,
        String.raw`Exponential$(\lambda/3)$`,
        String.raw`Erlang$(3,\lambda)$`,
        String.raw`Poisson$(3\lambda)$`,
      ],
      answer: 2,
      explanation: String.raw`This is the definition of the Erlang: $k$ independent exponential phases with the same rate
        placed end to end. Its mean is $3/\lambda$, consistent with linearity of expectation. An exponential with rate
        $3\lambda$ would have mean $1/(3\lambda)$, three times smaller.`,
    },
    {
      q: String.raw`A delay follows an Erlang distribution with mean 300 ms and variance 30,000 ms². Its parameters are:`,
      choices: [
        String.raw`$k=3,\ \lambda=0.01$`,
        String.raw`$k=10,\ \lambda=0.1$`,
        String.raw`$k=1,\ \lambda=300$`,
        String.raw`$k=2,\ \lambda=0.5$`,
      ],
      answer: 0,
      explanation: String.raw`$E=k/\lambda=300$ and $\operatorname{Var}=k/\lambda^2=30{,}000$. The ratio
        $\operatorname{Var}/E=1/\lambda=100$ gives $\lambda=0.01$, then $k=\lambda E=3$.`,
    },
    {
      q: String.raw`The number of typos per page follows a Poisson distribution with mean 2. Probability that a page contains at least one typo?`,
      choices: [
        String.raw`$e^{-2}\approx 0.14$`,
        String.raw`$2e^{-2}\approx 0.27$`,
        String.raw`$1-3e^{-2}\approx 0.59$`,
        String.raw`$1-e^{-2}\approx 0.86$`,
      ],
      answer: 3,
      explanation: String.raw`"At least one" is computed through the complement: $1-P(X=0)=1-e^{-2}$. The value $1-3e^{-2}$
        would correspond to "at least two" ($1-P(X=0)-P(X=1)$).`,
    },
    {
      q: String.raw`If $\operatorname{Var}(X)=v$, what is $\operatorname{Var}(3X-2)$?`,
      choices: [String.raw`$9v$`, String.raw`$3v$`, String.raw`$9v-2$`, String.raw`$3v-2$`],
      answer: 0,
      explanation: String.raw`$\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$: the factor 3 becomes 9, and the shift
        $-2$ does not change the spread.`,
    },
    {
      q: String.raw`We know that $E[X]=2$ and $\operatorname{Var}(X)=3$. What is $E[X^2]$?`,
      choices: [String.raw`$1$`, String.raw`$5$`, String.raw`$7$`, String.raw`$13$`],
      answer: 2,
      explanation: String.raw`$\operatorname{Var}(X)=E[X^2]-(E[X])^2$ so $E[X^2]=3+2^2=7$. In particular
        $E[X^2]\neq(E[X])^2$ as soon as the variable is not constant.`,
    },
    {
      q: String.raw`$X$ takes the values 1, 2 and 3 with equal probability. What is $E[X^2]$?`,
      choices: [String.raw`$2$`, String.raw`$4$`, String.raw`$14/3$`, String.raw`$6$`],
      answer: 2,
      explanation: String.raw`LOTUS: $E[X^2]=\tfrac13(1+4+9)=\tfrac{14}{3}$. The answer $4=(E[X])^2$ is the classic
        trap; the difference $\tfrac{14}{3}-4=\tfrac23$ is exactly the variance.`,
    },
    {
      q: String.raw`Among these statements about arbitrary random variables $X$ and $Y$, which one is <strong>false</strong>?`,
      choices: [
        String.raw`$E[X+Y]=E[X]+E[Y]$`,
        String.raw`$\operatorname{Var}(aX)=a^2\operatorname{Var}(X)$`,
        String.raw`$E[XY]=E[X]\,E[Y]$ if $X$ and $Y$ are independent`,
        String.raw`$\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)$`,
      ],
      answer: 3,
      explanation: String.raw`The variance of a sum is additive only when the variables are independent (or at least
        uncorrelated). Example: with $Y=X$, $\operatorname{Var}(2X)=4\operatorname{Var}(X)\neq 2\operatorname{Var}(X)$.
        Linearity of expectation, on the other hand, needs no assumption.`,
    },
    {
      q: String.raw`Three events $A$, $B$, $C$ are pairwise independent. Can we conclude that they are mutually independent?`,
      choices: [
        String.raw`No: there are counterexamples with two coin tosses.`,
        String.raw`Yes, always.`,
        String.raw`Yes, provided that $P(A)=P(B)=P(C)$.`,
        String.raw`Yes, provided that they are disjoint.`,
      ],
      answer: 0,
      explanation: String.raw`With $A$ = "heads on the first toss", $B$ = "heads on the second", $C$ = "same side on both
        tosses", every pair is independent but $P(A\cap B\cap C)=\tfrac14\neq P(A)P(B)P(C)=\tfrac18$.`,
    },
    {
      q: String.raw`$X$ takes values in $\{0,1,2,\dots\}$ and satisfies $P(X\ge k)=2^{-k}$ for every $k\ge 1$. What is $E[X]$?`,
      choices: [String.raw`$1/2$`, String.raw`$1$`, String.raw`$2$`, String.raw`$+\infty$`],
      answer: 1,
      explanation: String.raw`Tail-sum formula: $E[X]=\sum_{k\ge 1}P(X\ge k)=\sum_{k\ge 1}2^{-k}=1$. There is no need to
        rebuild the pmf ($P(X=0)=\tfrac12$, $P(X=1)=\tfrac14$, …) to conclude.`,
    },
  ],

  /* -------------------- EXERCISES -------------------- */
  exos: [
    {
      id: "ex-series-parallel",
      title: "Series and parallel systems",
      difficulty: "facile",
      tags: ["reliability", "independence"],
      statement: String.raw`<p>Three independent components work with probabilities
        $p_1=0.9$, $p_2=0.8$ and $p_3=0.95$. Compute the probability that the system works
        when they are arranged (a) in series; (b) in parallel.</p>`,
      hints: [
        String.raw`In series, <em>all</em> components must work. In parallel, it is enough that <em>at least one</em> works: go through the complement.`,
      ],
      solution: String.raw`
        <p><strong>(a) Series.</strong> $R=\prod p_i = 0.9\times 0.8\times 0.95 = 0.684$.</p>
        <p><strong>(b) Parallel.</strong> The system fails only if all three components fail:
        $R=1-\prod(1-p_i)=1-0.1\times 0.2\times 0.05=1-0.001=0.999$.</p>
        <p>Redundancy raises the reliability from 68% to 99.9%, whereas the series arrangement drops it below
        that of the worst component.</p>`,
    },
    {
      id: "ex-cooks",
      title: "The three cooks",
      difficulty: "moyen",
      tags: ["Bayes", "total probability"],
      statement: String.raw`<p>Three cooks A, B and C bake cakes. Their cakes fail with respective
        probabilities $0.02$, $0.03$ and $0.05$. A bakes 50% of the restaurant's cakes,
        B 30% and C 20%.</p>
        <p>(a) What proportion of the restaurant's cakes fail? (b) A cake has failed: what is the
        probability that it was baked by A?</p>`,
      solution: String.raw`
        <p>Let $R$ be the event "the cake fails". The data are $P(R\mid A)=0.02$, $P(R\mid B)=0.03$,
        $P(R\mid C)=0.05$ and $P(A)=0.5$, $P(B)=0.3$, $P(C)=0.2$. The cooks form a partition.</p>
        <p><strong>(a) Total probability.</strong></p>
        <p>$$P(R)=0.02\times 0.5+0.03\times 0.3+0.05\times 0.2=0.010+0.009+0.010=0.029.$$</p>
        <p><strong>(b) Bayes.</strong>
        $P(A\mid R)=\dfrac{P(R\mid A)\,P(A)}{P(R)}=\dfrac{0.010}{0.029}\approx 0.345$.</p>
        <p>Although A is the most reliable cook, A bakes half of the cakes: A remains the most likely culprit,
        tied with C.</p>`,
    },
    {
      id: "ex-cancer",
      title: "Screening test",
      difficulty: "moyen",
      tags: ["Bayes", "base rate"],
      statement: String.raw`<p>A screening test is positive for 95% of sick people and negative for 96% of
        healthy people. The disease affects 0.4% of the population. Compute the probability that a person
        whose test is positive is actually sick.</p>`,
      hints: [
        String.raw`"Negative for 96% of healthy people" means that the false-positive rate is $P(T\mid S^c)=0.04$.`,
        String.raw`Write Bayes with the denominator $P(T)=P(T\mid S)\,P(S)+P(T\mid S^c)\,P(S^c)$.`,
      ],
      solution: String.raw`
        <p>Let $S$ be "sick" and $T$ "positive test". We have $P(T\mid S)=0.95$, $P(T\mid S^c)=0.04$ and $P(S)=0.004$.</p>
        <p>$$P(S\mid T)=\frac{0.95\times 0.004}{0.95\times 0.004+0.04\times 0.996}
        =\frac{0.0038}{0.04364}\approx 0.087.$$</p>
        <p>Only about 9%. The base rate of 0.4% dominates: among 10,000 people tested, we expect 38 true
        positives but almost 400 false positives.</p>`,
    },
    {
      id: "ex-coins",
      title: "Fair coin or two-headed coin",
      difficulty: "moyen",
      tags: ["Bayes", "sequential updating"],
      statement: String.raw`<p>A player owns two coins: a fair coin and a rigged coin whose two sides are both
        "heads". They pick one at random and toss it several times.</p>
        <p>(a) The first toss gives heads. What is the probability that the chosen coin is the fair one?
        (b) The second toss gives heads again. Same question. (c) The third toss gives tails. Same question.</p>`,
      solution: String.raw`
        <p>Let $F$ be "the coin is fair" and $D$ "the coin is two-headed", with $P(F)=P(D)=\tfrac12$.
        The rigged coin always gives heads.</p>
        <p><strong>(a)</strong> With $H_1$ = "one heads":
        $P(F\mid H_1)=\dfrac{P(H_1\mid F)\,P(F)}{P(H_1\mid F)\,P(F)+P(H_1\mid D)\,P(D)}
        =\dfrac{\tfrac12\cdot\tfrac12}{\tfrac12\cdot\tfrac12+1\cdot\tfrac12}=\dfrac13.$</p>
        <p><strong>(b)</strong> With $H_2$ = "two heads in a row", $P(H_2\mid F)=\tfrac14$:
        $P(F\mid H_2)=\dfrac{\tfrac14\cdot\tfrac12}{\tfrac14\cdot\tfrac12+1\cdot\tfrac12}=\dfrac15.$
        Each additional heads strengthens the "rigged" hypothesis.</p>
        <p><strong>(c)</strong> Tails is impossible with the rigged coin: $P(\text{tails}\mid D)=0$, so
        $P(F\mid \text{tails})=1$. A single incompatible observation settles the matter for good.</p>`,
    },
    {
      id: "ex-lathes",
      title: "Seven machines, four of them lathes",
      difficulty: "facile",
      tags: ["hypergeometric", "pmf"],
      statement: String.raw`<p>A workshop owns 7 machines, 4 of which are lathes. Two are chosen at random, without
        replacement. Let $X$ be the number of lathes among the chosen machines. Give the distribution of $X$ and
        check that it is a valid probability mass function.</p>`,
      solution: String.raw`
        <p>$X$ takes values in $\{0,1,2\}$ and follows a hypergeometric distribution:</p>
        <p>$$p(0)=\frac{\binom{4}{0}\binom{3}{2}}{\binom{7}{2}}=\frac{3}{21},\qquad
        p(1)=\frac{\binom{4}{1}\binom{3}{1}}{\binom{7}{2}}=\frac{12}{21},\qquad
        p(2)=\frac{\binom{4}{2}\binom{3}{0}}{\binom{7}{2}}=\frac{6}{21}.$$</p>
        <p>The three values are non-negative and $\tfrac{3+12+6}{21}=1$. We also recover
        $E[X]=n\tfrac{K}{N}=2\times\tfrac47=\tfrac87$, confirmed by the direct computation
        $\tfrac{12}{21}+2\times\tfrac{6}{21}=\tfrac{24}{21}$.</p>`,
    },
    {
      id: "ex-yield",
      title: "85% yield: three questions, three distributions",
      difficulty: "moyen",
      tags: ["Binomial", "Geometric", "Negative binomial"],
      statement: String.raw`<p>A manufacturing process has an 85% yield: each part is defective with
        probability 0.15, independently of the others. 50 parts are produced.</p>
        <p>(a) Probability of exactly 8 defective parts? (b) Probability that the 10th part produced
        is the first defective one? (c) Probability that the 20th part produced is the third defective one?</p>`,
      hints: [String.raw`Each question matches a different distribution: fixed number of trials, waiting for the first success, waiting for the $r$-th success. Here a "success" is a defective part.`],
      solution: String.raw`
        <p><strong>(a) Binomial$(50;\,0.15)$.</strong> $P(X=8)=\binom{50}{8}(0.15)^8(0.85)^{42}\approx 0.149$.</p>
        <p><strong>(b) Geometric$(0.15)$.</strong> Nine good parts then a defective one:
        $P(X=10)=(0.85)^9\times 0.15\approx 0.035$.</p>
        <p><strong>(c) Negative binomial$(3;\,0.15)$.</strong> Two defective parts among the first 19, then a
        defective one in 20th position: $P(X=20)=\binom{19}{2}(0.15)^3(0.85)^{17}\approx 0.036$.</p>`,
    },
    {
      id: "ex-poisson-cars",
      title: "Cars arriving at a toll booth",
      difficulty: "facile",
      tags: ["Poisson", "complement"],
      statement: String.raw`<p>The number of cars arriving at a toll booth in one minute follows a Poisson distribution with
        mean $\lambda=8$. (a) Probability that exactly 5 arrive? (b) Probability that more than 2 arrive?</p>`,
      solution: String.raw`
        <p><strong>(a)</strong> $P(X=5)=\dfrac{e^{-8}\,8^5}{5!}\approx 0.092$.</p>
        <p><strong>(b)</strong> Go through the complement:
        $P(X>2)=1-\big[p(0)+p(1)+p(2)\big]=1-e^{-8}\!\left(1+8+\tfrac{8^2}{2}\right)\approx 0.986$.</p>
        <p>Reflex to keep: never sum an infinite tail by hand, compute the complement.</p>`,
    },
    {
      id: "ex-polypdf",
      title: "From a polynomial density to the cdf",
      difficulty: "moyen",
      tags: ["density", "cdf"],
      statement: String.raw`<p>Let $X$ be a continuous variable with density $f(x)=\tfrac34(1-x^2)$ for $-1&lt;x&lt;1$, and
        $f(x)=0$ elsewhere. Determine $F(x)$ on all of $\mathbb R$, then compute $P(-0.5&lt;X&lt;0.75)$.</p>`,
      solution: String.raw`
        <p>For $-1&lt;x\le 1$: $F(x)=\displaystyle\int_{-1}^{x}\tfrac34(1-t^2)\,dt=\tfrac34\Big[t-\tfrac{t^3}{3}\Big]_{-1}^{x}
        =\tfrac14\big(2+3x-x^3\big)$.</p>
        <p>$$F(x)=\begin{cases}0,& x\le -1\\[4pt]\tfrac14(2+3x-x^3),& -1&lt;x\le 1\\[4pt]1,& x>1.\end{cases}$$</p>
        <p>Check: $F(-1)=0$ and $F(1)=\tfrac14(2+3-1)=1$. Then
        $P(-0.5&lt;X&lt;0.75)=F(0.75)-F(-0.5)\approx 0.957-0.156=0.801$.</p>`,
    },
    {
      id: "ex-exp-life",
      title: "Exponential lifetime",
      difficulty: "facile",
      tags: ["Exponential", "memoryless"],
      statement: String.raw`<p>The lifetime $X$ of a single-cell organism follows an exponential distribution with rate
        $\lambda=0.1$ per hour. (a) Probability that it lives more than 20 hours? (b) Probability that it dies within
        the first 5 hours? (c) It has already lived 10 hours: probability that it lives at least 20 more hours?</p>`,
      solution: String.raw`
        <p><strong>(a)</strong> $P(X>20)=e^{-\lambda\times 20}=e^{-2}\approx 0.135$.</p>
        <p><strong>(b)</strong> $P(X\le 5)=F(5)=1-e^{-0.5}\approx 0.393$.</p>
        <p><strong>(c)</strong> Memorylessness: $P(X>30\mid X>10)=P(X>20)=e^{-2}\approx 0.135$, the same
        value as in (a). The time already lived does not change the distribution of the remaining time.</p>`,
    },
    {
      id: "ex-erlang-msg",
      title: "Message delivery delay",
      difficulty: "difficile",
      tags: ["Erlang", "mean and variance"],
      statement: String.raw`<p>The delivery time of a message follows an Erlang distribution with mean 300 ms and
        variance 30,000 ms². (a) Determine $k$ and $\lambda$. (b) Probability that the message arrives in less than
        600 ms? (c) Probability that it takes more than 900 ms?</p>`,
      hints: [
        String.raw`$E[X]=k/\lambda$ and $\operatorname{Var}(X)=k/\lambda^2$: the ratio $\operatorname{Var}/E$ directly gives $1/\lambda$.`,
        String.raw`Survival function of the Erlang: $P(X>x)=\sum_{r=0}^{k-1}\dfrac{e^{-\lambda x}(\lambda x)^r}{r!}$ (probability that a Poisson with mean $\lambda x$ is less than $k$).`,
      ],
      solution: String.raw`
        <p><strong>(a)</strong> $\dfrac{\operatorname{Var}(X)}{E[X]}=\dfrac1\lambda=\dfrac{30{,}000}{300}=100$, so
        $\lambda=0.01$ ms$^{-1}$, then $k=\lambda\,E[X]=0.01\times 300=3$.</p>
        <p><strong>(b)</strong> With $\lambda x=6$:
        $P(X\le 600)=1-e^{-6}\!\left(1+6+\tfrac{6^2}{2}\right)=1-25e^{-6}\approx 0.938$.</p>
        <p><strong>(c)</strong> With $\lambda x=9$:
        $P(X>900)=e^{-9}\!\left(1+9+\tfrac{9^2}{2}\right)=50.5\,e^{-9}\approx 0.006$.</p>`,
    },
    {
      id: "ex-findab",
      title: "Recovering the parameters of a cdf",
      difficulty: "difficile",
      tags: ["cdf", "expectation"],
      statement: String.raw`<p>The cumulative distribution function of a continuous variable $X$ is $F(x)=ax+\tfrac{b}{3}x^3$ for
        $0\le x\le 1$, with $F(x)=0$ for $x<0$ and $F(x)=1$ for $x>1$. Knowing that $E[X]=0.6$, determine $a$ and $b$.</p>`,
      hints: [
        String.raw`Two unknowns, hence two conditions: continuity $F(1)=1$ and the value of $E[X]$.`,
        String.raw`Density: $f(x)=F'(x)=a+bx^2$, then $E[X]=\int_0^1 x\,f(x)\,dx$.`,
      ],
      solution: String.raw`
        <p>Density on $[0,1]$: $f(x)=F'(x)=a+bx^2$.</p>
        <p><strong>Condition 1</strong> ($F(1)=1$, equivalent to $\int_0^1 f=1$): $a+\tfrac{b}{3}=1$.</p>
        <p><strong>Condition 2</strong>: $E[X]=\displaystyle\int_0^1 x(a+bx^2)\,dx=\tfrac{a}{2}+\tfrac{b}{4}=0.6$.</p>
        <p>From the first, $a=1-\tfrac{b}{3}$. In the second:
        $\tfrac12-\tfrac{b}{6}+\tfrac{b}{4}=0.6$, i.e. $\tfrac{b}{12}=0.1$, so $b=1.2$ and then $a=0.6$.</p>
        <p>Check: $f(x)=0.6+1.2x^2\ge 0$ on $[0,1]$, the density is valid.</p>`,
    },
    {
      id: "ex-docsize",
      title: "Document size (heavy-tailed distribution)",
      difficulty: "difficile",
      tags: ["variance", "LOTUS", "Pareto"],
      statement: String.raw`<p>The size $X$ of a document (in KB) has density $f(x)=\dfrac{24}{x^4}$ for $x\ge 2$,
        and $f(x)=0$ otherwise. Compute $E[X]$ and then $\operatorname{Var}(X)$.</p>`,
      hints: [String.raw`$\operatorname{Var}(X)=E[X^2]-(E[X])^2$; compute $E[X]$ and $E[X^2]$ with LOTUS, integrating powers of $x$.`],
      solution: String.raw`
        <p>$E[X]=\displaystyle\int_2^\infty x\cdot\frac{24}{x^4}\,dx=24\int_2^\infty x^{-3}\,dx
        =24\Big[\frac{x^{-2}}{-2}\Big]_2^\infty=24\times\frac{1}{8}=3.$</p>
        <p>$E[X^2]=\displaystyle\int_2^\infty x^2\cdot\frac{24}{x^4}\,dx=24\int_2^\infty x^{-2}\,dx
        =24\times\frac{1}{2}=12.$</p>
        <p>$\operatorname{Var}(X)=12-3^2=3.$</p>
        <p>Remark: with a density in $x^{-4}$, $E[X^2]$ barely converges; a tail in $x^{-3}$ would give an
        infinite variance. This is the typical behaviour of file or document sizes.</p>`,
    },
  ],

  /* -------------------- DEFINITIONS -------------------- */
  definitions: [
    { term: "Sample space and event", def: String.raw`The <strong>sample space</strong> $\Omega$ is the set of all possible outcomes of a random experiment. An <strong>event</strong> is a subset $A\subseteq\Omega$; it occurs if the outcome belongs to it.` },
    { term: "Probability measure", def: String.raw`A map $P$ assigning a number to each event and satisfying the three axioms: $P(A)\ge 0$, $P(\Omega)=1$, and countable additivity ($P(\bigcup_i A_i)=\sum_i P(A_i)$ for pairwise disjoint $A_i$).` },
    { term: "Disjoint (mutually exclusive) events", def: String.raw`$A\cap B=\varnothing$: they cannot occur together, so $P(A\cup B)=P(A)+P(B)$. Disjoint <em>is not</em> independent: two disjoint events with positive probability are never independent.` },
    { term: "Inclusion-exclusion", def: String.raw`$P(A\cup B)=P(A)+P(B)-P(A\cap B)$. The subtracted term corrects the double counting of the intersection.` },
    { term: "Conditional probability", def: String.raw`For $P(B)>0$, $P(A\mid B)=P(A\cap B)/P(B)$: the probability of $A$ given that $B$ has occurred. Equivalent notations for the intersection: $P(A\cap B)$, $P(A,B)$, $P(AB)$.` },
    { term: "Multiplication rule", def: String.raw`$P(A\cap B)=P(A\mid B)\,P(B)=P(B\mid A)\,P(A)$. Used to compute the probability of a chain of events step by step.` },
    { term: "Independence", def: String.raw`$A$ and $B$ are independent if $P(A\cap B)=P(A)P(B)$, equivalently $P(A\mid B)=P(A)$. <strong>Mutual independence</strong> of several events requires the product rule for <em>all</em> sub-collections; pairwise independence is not enough.` },
    { term: "Partition", def: String.raw`A family $B_1,\dots,B_n$ of pairwise disjoint events whose union is $\Omega$ (with $P(B_i)>0$). It splits any situation into exhaustive and exclusive cases.` },
    { term: "Law of total probability", def: String.raw`For a partition $(B_i)$: $P(A)=\sum_i P(A\mid B_i)\,P(B_i)$. Compute $A$ by splitting it according to the cases $B_i$.` },
    { term: "Bayes' rule", def: String.raw`$P(B_j\mid A)=\dfrac{P(A\mid B_j)P(B_j)}{\sum_i P(A\mid B_i)P(B_i)}$. Reverses the conditioning: <strong>posterior</strong> $\propto$ <strong>prior</strong> $\times$ <strong>likelihood</strong>.` },
    { term: "Prior, posterior, likelihood", def: String.raw`In Bayes' rule, $P(B_j)$ is the <strong>prior</strong> probability (before observation), $P(A\mid B_j)$ the <strong>likelihood</strong> of the observation under hypothesis $B_j$, and $P(B_j\mid A)$ the <strong>posterior</strong> probability (after observation).` },
    { term: "Base-rate fallacy", def: String.raw`When the cause is rare (low prior), even a reliable test produces mostly false positives: the posterior probability of actually being affected stays low despite a positive result.` },
    { term: "Series / parallel reliability", def: String.raw`Independent components with reliabilities $p_i$. <strong>Series</strong> (all must work): $R=\prod p_i$, lower than the weakest link. <strong>Parallel</strong> (at least one suffices): $R=1-\prod(1-p_i)$, higher than the best component.` },
    { term: "Random variable", abbr: "r.v.", def: String.raw`A function $X$ assigning a number to each outcome of the experiment. <strong>Discrete</strong> if it takes isolated values (integers), <strong>continuous</strong> if it takes values in an interval.` },
    { term: "Cumulative distribution function", abbr: "cdf", def: String.raw`$F(x)=P(X\le x)$. Non-decreasing, right-continuous, tends to 0 at $-\infty$ and to 1 at $+\infty$. In the continuous case, $F'=f$ and $P(a\lt X\le b)=F(b)-F(a)$.` },
    { term: "Probability mass function", abbr: "pmf", def: String.raw`For a discrete r.v.: $p(x)=P(X=x)$, with $p(x)\ge 0$ and $\sum_x p(x)=1$.` },
    { term: "Probability density function", abbr: "pdf", def: String.raw`For a continuous r.v.: $f\ge 0$ with $\int_{\mathbb R}f=1$ and $P(a\lt X\le b)=\int_a^b f(x)\,dx$. At a single point, $P(X=x)=0$: only intervals carry probability.` },
    { term: "Expectation", def: String.raw`Weighted average of the values: $E[X]=\sum_x x\,p(x)$ (discrete) or $\int x f(x)\,dx$ (continuous). <strong>Linear</strong> with no assumption: $E[aX+bY]=aE[X]+bE[Y]$.` },
    { term: "LOTUS", abbr: "LOTUS", def: String.raw`<em>Law of the unconscious statistician</em>: $E[g(X)]=\sum_x g(x)p(x)$ or $\int g(x)f(x)\,dx$. Computes the expectation of a function of $X$ without finding the distribution of $g(X)$.` },
    { term: "Variance and standard deviation", def: String.raw`$\operatorname{Var}(X)=E[(X-E[X])^2]=E[X^2]-(E[X])^2$ measures dispersion around the mean; $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$. The standard deviation is $\sigma=\sqrt{\operatorname{Var}(X)}$. $\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)$ requires independence.` },
    { term: "Survival function and tail formula", def: String.raw`$P(X>x)=1-F(x)$. For $X\ge 0$: $E[X]=\sum_{k\ge 1}P(X\ge k)$ (integer-valued) or $E[X]=\int_0^\infty P(X>x)\,dx$ (continuous).` },
    { term: "Memorylessness", def: String.raw`$P(X>s+t\mid X>s)=P(X>t)$: having already waited does not change the distribution of the remaining wait. The only memoryless distributions: <strong>Geometric</strong> (discrete) and <strong>Exponential</strong> (continuous).` },
    { term: "Bernoulli distribution", def: String.raw`Bernoulli$(p)$: $X\in\{0,1\}$, $P(X=1)=p$. Models a single trial with two outcomes (success/failure). $E=p$, $\operatorname{Var}=p(1-p)$.` },
    { term: "Binomial distribution", def: String.raw`Binomial$(n,p)$: number of successes in $n$ independent trials with probability $p$. $P(X=x)=\binom{n}{x}p^x(1-p)^{n-x}$, $E=np$, $\operatorname{Var}=np(1-p)$.` },
    { term: "Geometric distribution", def: String.raw`Geometric$(p)$: index of the first success, $P(X=x)=(1-p)^{x-1}p$ for $x\ge 1$. $E=1/p$, $\operatorname{Var}=(1-p)/p^2$. Memoryless.` },
    { term: "Negative binomial distribution", def: String.raw`Negative binomial$(r,p)$: index of the $r$-th success, $P(X=x)=\binom{x-1}{r-1}p^r(1-p)^{x-r}$ for $x\ge r$. $E=r/p$. Sum of $r$ independent geometrics.` },
    { term: "Hypergeometric distribution", def: String.raw`Hypergeometric$(N,K,n)$: number of marked objects in $n$ draws <strong>without replacement</strong> from $N$ objects of which $K$ are marked. $P(X=x)=\binom{K}{x}\binom{N-K}{n-x}/\binom{N}{n}$, $E=nK/N$.` },
    { term: "Poisson distribution", def: String.raw`Poisson$(\lambda)$: number of events over a period, at mean rate $\lambda$. $P(X=x)=e^{-\lambda}\lambda^x/x!$, $E=\operatorname{Var}=\lambda$. Approximates the Binomial when $n$ is large and $p$ small ($\lambda=np$).` },
    { term: "Uniform distribution", def: String.raw`Uniform$(a,b)$: density $1/(b-a)$ on $[a,b]$, no value is favored. $E=(a+b)/2$, $\operatorname{Var}=(b-a)^2/12$.` },
    { term: "Exponential distribution", def: String.raw`Exponential$(\lambda)$: density $\lambda e^{-\lambda x}$ for $x\ge 0$, $P(X>t)=e^{-\lambda t}$. Lifetimes and waiting times; $E=1/\lambda$, $\operatorname{Var}=1/\lambda^2$. Memoryless.` },
    { term: "Erlang distribution", def: String.raw`Erlang$(k,\lambda)$: sum of $k$ independent exponentials with parameter $\lambda$. Density $\lambda^k x^{k-1}e^{-\lambda x}/(k-1)!$, $E=k/\lambda$, $\operatorname{Var}=k/\lambda^2$. Not memoryless when $k\ge 2$.` },
    { term: "Normal (Gaussian) distribution", def: String.raw`Normal$(\mu,\sigma^2)$: density $\frac{1}{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/(2\sigma^2)}$, $E=\mu$, $\operatorname{Var}=\sigma^2$. Sum of many small independent effects.` },
  ],
});
