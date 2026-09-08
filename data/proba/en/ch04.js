/* ============================================================
   Probability — Chapter 4: Discrete-time Markov chains (ENGLISH)
   Translation of data/proba/ch04.js. Same chapter id, same
   exercise ids, same quiz choice order and answers.
   Source: IMEN266 slides ch4 + Companion (Ross, ch. 4).
   NB: LaTeX fields use String.raw. Never write the sequence ${ }.
   In HTML fields, write "&lt;" for "<" followed by a letter.
   ============================================================ */
addChapter("proba", {
  id: "ch04",
  title: "Chapter 4 — Discrete-time Markov chains",
  short: "Ch. 4",
  lang: "en",

  /* -------------------- COURSE SUMMARY -------------------- */
  summary: String.raw`
    <h3>1. Stochastic process</h3>
    <p>A <strong>stochastic process</strong> is a family of random variables
    $\{X_t,\ t\in I\}$ indexed by time: for each fixed instant $t$, $X_t$ is a random variable.
    Time can be discrete ($I=\{0,1,2,\dots\}$) or continuous ($I=[0,\infty)$), and the values taken
    (the <strong>state space</strong>) can also be discrete or continuous. This chapter deals with
    the "discrete time, discrete states" case: discrete-time Markov chains, abbreviated DTMC.</p>

    <h3>2. Discrete-time Markov chain</h3>
    <p>A sequence $\{X_n,\ n\ge 0\}$ with values in a countable state space $S$ is a DTMC if,
    for all states $i,j$ and every past trajectory:</p>
    <p>$$P(X_{n+1}=j\mid X_n=i,\ X_{n-1}=i_{n-1},\dots,X_0=i_0)=P(X_{n+1}=j\mid X_n=i)=P_{ij}.$$</p>
    <p>This equality contains two distinct assumptions:</p>
    <ul>
      <li>the <strong>Markov property</strong>: conditionally on the present state $X_n$, the future
          does not depend on the past. Everything needed to predict what comes next is contained in
          the current state;</li>
      <li><strong>time homogeneity</strong>: the probability of going from $i$ to $j$ in one step does
          not depend on the instant $n$. A single matrix $P$ describes the whole evolution.</li>
    </ul>
    <p>The <strong>transition matrix</strong> $P=(P_{ij})$ is <em>stochastic</em>: its entries are
    non-negative and <em>each row sums to 1</em> ($\sum_j P_{ij}=1$), since from state $i$ the chain
    necessarily goes somewhere. Row $i$ is the starting point, column $j$ the destination.</p>
    <div class="callout"><strong>Five-step modelling method.</strong>
      <p>(1) Define $X_n$, the state observed at time $n$. (2) Write the state space $S$.
      (3) Check the Markov property and homogeneity. (4) Compute $P$ and check that each row sums
      to 1. (5) Draw the transition diagram.</p>
      <p>If the natural description of the system has memory (the age of a tool, yesterday's
      weather), <em>enlarge the state</em> until it contains all the useful information: for
      instance take the pair (yesterday's weather, today's weather) as the state.</p></div>

    <h3>3. Transient behaviour</h3>
    <p>Let $a=[P(X_0=0),\ P(X_0=1),\ \dots]$ be the <strong>initial distribution</strong> (row
    vector) and $p_n=[P(X_n=0),\ P(X_n=1),\ \dots]$ the distribution at time $n$. Then:</p>
    <p>$$p_1=aP,\qquad p_2=aP^2,\qquad\dots,\qquad p_n=aP^n.$$</p>
    <p>The row vector goes <em>to the left</em> of the matrix. The entries of $P^n$ are the
    <strong>$n$-step transition probabilities</strong>: $P^{(n)}_{ij}=P(X_n=j\mid X_0=i)$. The
    <strong>Chapman-Kolmogorov equations</strong> $P^{(m+n)}_{ij}=\sum_k P^{(m)}_{ik}P^{(n)}_{kj}$
    say that going from $i$ to $j$ in $m+n$ steps means passing through some intermediate state $k$
    after $m$ steps; in matrix form, $P^{(n)}=P^n$.</p>
    <p>The <strong>probability of a trajectory</strong> factorises thanks to the Markov property:
    $P(X_0=i_0,\ X_1=i_1,\dots,X_n=i_n)=a_{i_0}\,P_{i_0 i_1}\,P_{i_1 i_2}\cdots P_{i_{n-1} i_n}$.</p>

    <h3>4. Classification of states</h3>
    <ul>
      <li>$j$ is <strong>accessible</strong> from $i$ (written $i\to j$) if there is some $n\ge 0$ with
          $P^{(n)}_{ij}>0$. If $i\to j$ and $j\to i$, the two states <strong>communicate</strong>.
          Communication splits $S$ into <strong>classes</strong>; the chain is <strong>irreducible</strong>
          if it has only one class.</li>
      <li>A state is <strong>recurrent</strong> if, starting from it, the chain returns to it with
          probability 1 ($f_i=1$), and <strong>transient</strong> otherwise ($f_i<1$). Criterion: $i$ is
          recurrent if and only if $\sum_n P^{(n)}_{ii}=\infty$. A transient state is visited only finitely
          many times; a recurrent state is visited infinitely often. Recurrence is a class property.</li>
      <li>A recurrent state is <strong>positive recurrent</strong> if the mean return time $m_i$ is
          finite. In a chain with a <em>finite</em> state space, every recurrent state is positive
          recurrent, and a class is recurrent if and only if it is <strong>closed</strong> (no transition
          leaves it).</li>
      <li>A state is <strong>absorbing</strong> if $P_{ii}=1$: it forms a closed class on its own.</li>
      <li>The <strong>period</strong> of $i$ is $d(i)=\gcd\{n\ge 1 : P^{(n)}_{ii}>0\}$. The state is
          <strong>aperiodic</strong> if $d(i)=1$; a self-loop $P_{ii}>0$ is enough to guarantee it. The
          period is also a class property.</li>
    </ul>
    <div class="callout"><strong>Ergodic chain</strong> $=$ irreducible $+$ positive recurrent $+$
      aperiodic. For these chains everything works out: there is a unique stationary distribution,
      and the chain converges to it whatever the starting state.</div>

    <h3>5. Limiting behaviour and stationary distribution</h3>
    <p>If the chain is <strong>irreducible and positive recurrent</strong>, the system</p>
    <p>$$\pi=\pi P,\qquad \sum_{i\in S}\pi_i=1$$</p>
    <p>has a <strong>unique</strong> solution $\pi$, called the stationary distribution. It has two
    interpretations: $\pi_i$ is the long-run fraction of time spent in state $i$, and
    $\pi_i=1/m_i$ where $m_i$ is the mean return time to $i$.</p>
    <p>If the chain is moreover <strong>aperiodic</strong> (hence ergodic), then
    $\lim_{n\to\infty}P(X_n=i)=\pi_i$ for <em>every</em> initial distribution $a$: each row of
    $P^n$ converges to $\pi$ and the starting state is forgotten.</p>
    <div class="callout warn"><strong>Three traps.</strong>
      <p>An irreducible but <em>periodic</em> chain (for instance a three-state cycle) has a unique
      stationary distribution, but $P(X_n=i)$ oscillates and has no limit.</p>
      <p>A <em>reducible</em> chain may have several stationary distributions, and the limit, when it
      exists, then depends on the starting point.</p>
      <p>In the system $\pi=\pi P$, one equation is always redundant (the rows of $P$ sum to 1).
      Drop one and replace it with the normalisation $\sum_i\pi_i=1$.</p></div>

    <h3>6. Long-run cost and reward</h3>
    <p>If a cost $C(i)$ is paid each time the chain is in state $i$, the long-run
    <strong>average cost per period</strong> is</p>
    <p>$$\lim_{n\to\infty}\frac1n\sum_{k=1}^n C(X_k)=\sum_{i\in S}C(i)\,\pi_i.$$</p>
    <p>On the left, an average along a single trajectory (time average); on the right, an average over
    the population of states weighted by $\pi$ (ensemble average). Their equality is precisely what
    ergodicity guarantees. Examples treated in the exercises: availability of a machine
    ($\pi_{\text{up}}$), fraction of trips in the rain without an umbrella ($p\,\pi_0$), mean age of a
    tool in service ($\sum_i i\,\pi_i$), mean lifetime of a tool ($1/\pi_0$).</p>

    <h3>7. PageRank</h3>
    <p>A random surfer moves across $n$ pages by following, at each step, an outgoing link chosen
    uniformly at random: this is a DTMC with matrix $P$, and the <strong>rank</strong> of page $j$ is
    $\pi_j$, its long-run visit frequency. Two defects of the web graph break ergodicity:
    <strong>dead ends</strong> (pages with no outgoing link, whose row of $P$ is zero so that
    probability mass leaks out) and <strong>spider traps</strong> (absorbing groups of pages that end
    up capturing all the mass).</p>
    <p>The remedy is <strong>taxation</strong>: with probability $\beta$ the surfer follows a link,
    with probability $1-\beta$ they jump to a page chosen uniformly at random. $P$ is replaced by</p>
    <p>$$G=\beta P+\frac{1-\beta}{n}\,\mathbf 1\mathbf 1^{\top},$$</p>
    <p>a strictly positive matrix, hence ergodic: $\pi=\pi G$ has a unique solution, and the
    <strong>power iteration</strong> $p_{k+1}=p_kG$ converges to $\pi$ at rate $\beta$:
    $\lVert p_k-\pi\rVert_1\le\beta^k\lVert p_0-\pi\rVert_1$. A page with no incoming link at all
    receives exactly $\pi_j=(1-\beta)/n$.</p>
  `,

  /* -------------------- KEY POINTS -------------------- */
  keyPoints: [
    {
      text: String.raw`<strong>Markov property and homogeneity.</strong> "The future depends on the past only
        through the present": keep only $X_n$. "The probabilities do not depend on $n$": a single
        matrix $P$. Each row of $P$ sums to 1 (row = origin, column = destination).`,
    },
    {
      text: String.raw`<strong>Model in five steps.</strong> Define $X_n$, write $S$, check Markov and
        homogeneity, compute $P$ (rows sum to 1), draw the diagram. If the natural state has memory,
        enlarge it (for instance by keeping the last two observations).`,
      exos: ["ex-himart", "ex-umbrellas", "ex-tool"],
    },
    {
      text: String.raw`<strong>Transient: $p_n=aP^n$.</strong> Chapman-Kolmogorov gives $P^{(n)}=P^n$. Between
        times 1 and 5 there are 4 steps: $P(X_5=2\mid X_1=3)=(P^4)_{32}$. The probability of a trajectory is
        the product of the probabilities of each step, times the initial probability.`,
      exos: ["ex-transient4", "ex-pohang"],
    },
    {
      text: String.raw`<strong>Classification.</strong> Communication classes; irreducible if a single
        class. Recurrent (certain return) or transient. Finite chain: a class is recurrent if and only if
        it is closed. Period $=\gcd$ of the return lengths; a self-loop $P_{ii}>0$ makes the state
        aperiodic. Ergodic $=$ irreducible $+$ positive recurrent $+$ aperiodic.`,
    },
    {
      text: String.raw`<strong>Stationary: $\pi=\pi P$, $\sum_i\pi_i=1$.</strong> Unique solution if
        irreducible and positive recurrent; if moreover aperiodic, $\lim P(X_n=i)=\pi_i$ for every start.
        One balance equation is redundant: replace it with the normalisation. Mean return time
        $m_i=1/\pi_i$.`,
      exos: ["ex-machine", "ex-pohang"],
    },
    {
      text: String.raw`<strong>Long-run cost $=\sum_i C(i)\,\pi_i$.</strong> Time average along a
        trajectory $=$ ensemble average weighted by $\pi$. To optimise a parameter (number of
        umbrellas, reorder threshold), write the average cost $\tau$ as a function of that parameter,
        minimise it, then compare the neighbouring integers.`,
      exos: ["ex-kim", "ex-umbrellas", "ex-tool"],
    },
    {
      text: String.raw`<strong>PageRank.</strong> Fix the dead ends, then tax:
        $G=\beta P+\tfrac{1-\beta}{n}\mathbf 1\mathbf 1^\top$ is strictly positive hence ergodic.
        The power iteration converges at rate $\beta$. A page with no incoming link has $\pi_j=(1-\beta)/n$.`,
      exos: ["ex-pagerank"],
    },
  ],

  /* -------------------- FORMULA SHEET -------------------- */
  formulas: [
    { name: "Markov property", latex: String.raw`P(X_{n+1}=j\mid X_n=i,\dots,X_0=i_0)=P(X_{n+1}=j\mid X_n=i)=P_{ij}` },
    { name: "Stochastic matrix", note: "each row sums to 1", latex: String.raw`P_{ij}\ge 0,\qquad \sum_{j\in S}P_{ij}=1\quad\text{for every } i` },
    { name: "Chapman-Kolmogorov", latex: String.raw`P^{(m+n)}_{ij}=\sum_{k\in S}P^{(m)}_{ik}\,P^{(n)}_{kj},\qquad P^{(n)}=P^{n}` },
    { name: "Distribution at time n", note: "a = initial distribution (row vector)", latex: String.raw`p_n=aP^{n},\qquad P(X_n=j\mid X_0=i)=(P^n)_{ij}` },
    { name: "Probability of a trajectory", latex: String.raw`P(X_0=i_0,\dots,X_n=i_n)=a_{i_0}\,P_{i_0i_1}\,P_{i_1i_2}\cdots P_{i_{n-1}i_n}` },
    { name: "Recurrence criterion", latex: String.raw`i\ \text{recurrent}\iff \sum_{n\ge 1}P^{(n)}_{ii}=\infty` },
    { name: "Period", latex: String.raw`d(i)=\gcd\{\,n\ge 1: P^{(n)}_{ii}>0\,\}` },
    { name: "Stationary distribution", note: "unique if irreducible and positive recurrent", latex: String.raw`\pi=\pi P,\qquad \sum_{i\in S}\pi_i=1` },
    { name: "Limit (ergodic chain)", note: "for every initial distribution", latex: String.raw`\lim_{n\to\infty}P(X_n=i)=\pi_i` },
    { name: "Mean return time", latex: String.raw`m_i=\frac{1}{\pi_i}` },
    { name: "Long-run average cost", latex: String.raw`\lim_{n\to\infty}\frac1n\sum_{k=1}^{n}C(X_k)=\sum_{i\in S}C(i)\,\pi_i` },
    { name: "Two-state chain", note: "a = P₀₁, b = P₁₀", latex: String.raw`\pi_0=\frac{b}{a+b},\qquad \pi_1=\frac{a}{a+b}` },
    { name: "PageRank: taxed matrix", latex: String.raw`G=\beta P+\frac{1-\beta}{n}\,\mathbf 1\mathbf 1^{\top}` },
    { name: "PageRank: convergence", latex: String.raw`\lVert p_k-\pi\rVert_1\le\beta^{k}\,\lVert p_0-\pi\rVert_1,\qquad \pi_j=\frac{1-\beta}{n}\ \text{if no link enters } j` },
  ],

  /* -------------------- QUIZ -------------------- */
  qcm: [
    {
      q: String.raw`Among these models, which one <strong>violates</strong> the Markov property with the proposed state?`,
      choices: [
        String.raw`Weather: tomorrow's weather depends on the last two days; state $=$ today's weather.`,
        String.raw`Weather: tomorrow's weather depends only on today's weather; state $=$ today's weather.`,
        String.raw`Inventory: next Monday's stock depends on this Monday's stock and on the week's demand; state $=$ Monday's stock.`,
        String.raw`Machine: up or down, with fixed switching probabilities; state $=$ up/down.`,
      ],
      answer: 0,
      explanation: String.raw`If tomorrow depends on yesterday <em>and</em> today, the state "today's weather" is not enough:
        the future depends on the past beyond the present. The remedy is to enlarge the state to the pair
        (yesterday's weather, today's weather), which is Markov again.`,
    },
    {
      q: String.raw`Which of these matrices can be a transition matrix?`,
      choices: [
        String.raw`$\begin{pmatrix}1.2&-0.2\\0&1\end{pmatrix}$`,
        String.raw`$\begin{pmatrix}0.3&0.5\\0.7&0.5\end{pmatrix}$`,
        String.raw`$\begin{pmatrix}0.5&0.5\\0.6&0.5\end{pmatrix}$`,
        String.raw`$\begin{pmatrix}0.3&0.7\\0.5&0.5\end{pmatrix}$`,
      ],
      answer: 3,
      explanation: String.raw`We need non-negative entries and <em>rows</em> that sum to 1. The matrix
        $\begin{pmatrix}0.3&0.5\\0.7&0.5\end{pmatrix}$ has columns summing to 1, not rows; the one containing
        $-0.2$ has a negative entry; the one whose second row is $(0.6,\ 0.5)$ sums to $1.1$.`,
    },
    {
      q: String.raw`Let $P=\begin{pmatrix}0.5&0.5\\0.2&0.8\end{pmatrix}$ on the states $\{0,1\}$, with $X_0=0$.
        What is $P(X_2=0)$?`,
      choices: [String.raw`$0.25$`, String.raw`$0.35$`, String.raw`$0.50$`, String.raw`$0.65$`],
      answer: 1,
      explanation: String.raw`$P(X_2=0)=(P^2)_{00}=P_{00}P_{00}+P_{01}P_{10}=0.5\times 0.5+0.5\times 0.2=0.35$.
        One must sum over both possible paths ($0\to 0\to 0$ and $0\to 1\to 0$), not only the first one.`,
    },
    {
      q: String.raw`Same matrix $P$, with initial distribution $a=(0.6,\ 0.4)$. What is $P(X_0=0,\ X_1=1,\ X_2=1)$?`,
      choices: [String.raw`$0.20$`, String.raw`$0.24$`, String.raw`$0.30$`, String.raw`$0.40$`],
      answer: 1,
      explanation: String.raw`Probability of a trajectory: $a_0\,P_{01}\,P_{11}=0.6\times 0.5\times 0.8=0.24$.
        The Markov property lets us multiply the probabilities step by step.`,
    },
    {
      q: String.raw`What is $P(X_5=2\mid X_1=3)$ for a homogeneous DTMC with matrix $P$?`,
      choices: [
        String.raw`$(P^4)_{32}$`,
        String.raw`$(P^5)_{32}$`,
        String.raw`$(P^4)_{23}$`,
        String.raw`$(aP^4)_2$`,
      ],
      answer: 0,
      explanation: String.raw`From time 1 to time 5, 4 steps elapse. By homogeneity only the number of steps matters,
        and the row is the starting state (3), the column the destination (2). The initial distribution $a$ plays
        no role since we condition on $X_1$.`,
    },
    {
      q: String.raw`What is $P(X_3=j\mid X_0=i,\ X_1=k)$?`,
      choices: [
        String.raw`$(P^3)_{ij}$`,
        String.raw`$(P^2)_{ij}$`,
        String.raw`$(P^2)_{kj}$`,
        String.raw`$P_{ik}\,(P^2)_{kj}$`,
      ],
      answer: 2,
      explanation: String.raw`Markov property: given $X_1=k$, the information $X_0=i$ is useless. Two steps remain
        from $k$, hence $(P^2)_{kj}$. The product $P_{ik}(P^2)_{kj}$ would be the <em>joint</em> probability of the
        path given $X_0=i$, not the requested conditional probability.`,
    },
    {
      q: String.raw`Stationary distribution of $P=\begin{pmatrix}0.5&0.5\\0.2&0.8\end{pmatrix}$?`,
      choices: [
        String.raw`$\pi=(2/7,\ 5/7)$`,
        String.raw`$\pi=(1/2,\ 1/2)$`,
        String.raw`$\pi=(5/7,\ 2/7)$`,
        String.raw`$\pi=(0.5,\ 0.8)$`,
      ],
      answer: 0,
      explanation: String.raw`Two-state formula with $a=P_{01}=0.5$ and $b=P_{10}=0.2$:
        $\pi_0=\dfrac{b}{a+b}=\dfrac{0.2}{0.7}=\dfrac27$ and $\pi_1=\dfrac57$. Intuition: state 1 is left
        rarely (0.2), so most of the time is spent there. The vector $(0.5,\ 0.8)$ is not even a distribution.`,
    },
    {
      q: String.raw`Two-state chain with matrix $P=\begin{pmatrix}0&1\\1&0\end{pmatrix}$, with $X_0=0$. What is $\lim_{n\to\infty}P(X_n=0)$?`,
      choices: [String.raw`$0$`, String.raw`$1/2$`, String.raw`$1$`, String.raw`This limit does not exist.`],
      answer: 3,
      explanation: String.raw`The chain alternates deterministically: $P(X_n=0)$ equals $1,0,1,0,\dots$ and does not converge.
        The chain is irreducible and $\pi=(1/2,1/2)$ is indeed the unique stationary distribution (fraction of time
        in each state), but the period 2 prevents $P(X_n=0)$ from converging.`,
    },
    {
      q: String.raw`A gambler holds between 0 and 3 euros; at each round they win or lose 1 euro, and they stop at 0 or at 3
        (absorbing states). How many stationary distributions does this chain have?`,
      choices: [String.raw`None`, String.raw`Exactly one`, String.raw`Exactly two`, String.raw`Infinitely many`],
      answer: 3,
      explanation: String.raw`The vectors $(1,0,0,0)$ and $(0,0,0,1)$ both satisfy $\pi=\pi P$, and so does every
        combination $(\alpha,0,0,1-\alpha)$ with $0\le\alpha\le 1$. The chain is reducible: uniqueness
        of $\pi$ requires irreducibility.`,
    },
    {
      q: String.raw`In a chain with a <strong>finite</strong> state space, a communication class is recurrent if and only if:`,
      choices: [
        String.raw`it contains an absorbing state`,
        String.raw`it contains every state of the chain`,
        String.raw`it is aperiodic`,
        String.raw`no transition allows leaving it`,
      ],
      answer: 3,
      explanation: String.raw`In a finite chain, recurrent class $\Leftrightarrow$ closed class. A class that can be left
        will eventually be left with probability 1 (transient). Absorption or aperiodicity have nothing to do
        with recurrence.`,
    },
    {
      q: String.raw`A Markov chain is <strong>finite and irreducible</strong>. What can be asserted without any further assumption?`,
      choices: [
        String.raw`It is aperiodic.`,
        String.raw`It is ergodic.`,
        String.raw`It is positive recurrent.`,
        String.raw`It has an absorbing state.`,
      ],
      answer: 2,
      explanation: String.raw`Finite and irreducible implies positive recurrent (a single class, closed, finite), so $\pi$
        exists and is unique. But nothing rules out periodicity: the cycle $0\to 1\to 2\to 0$ is finite and irreducible
        without being aperiodic, hence without being ergodic.`,
    },
    {
      q: String.raw`The chain $0\to 1\to 2\to 0$ is a deterministic cycle (period 3). Which modification makes it aperiodic?`,
      choices: [
        String.raw`Add a self-loop $P_{00}>0$ (stay in 0 with a small probability).`,
        String.raw`Add a fourth state to the cycle.`,
        String.raw`Change the initial distribution.`,
        String.raw`Double all the transition probabilities.`,
      ],
      answer: 0,
      explanation: String.raw`With a self-loop, one can return to 0 in 1 step as well as in 3 steps: $\gcd(1,3)=1$. A four-state
        cycle would have period 4. The initial distribution does not change the structure of $P$, and doubling the
        probabilities destroys the stochastic matrix.`,
    },
    {
      q: String.raw`In an ergodic chain, $\pi_i=0.25$. On average, how many steps elapse between two visits to state $i$?`,
      choices: [String.raw`$0.25$`, String.raw`$0.75$`, String.raw`$4$`, String.raw`It cannot be known without $P$.`],
      answer: 2,
      explanation: String.raw`Mean return time $m_i=1/\pi_i=4$. If a quarter of the time is spent in $i$, the chain returns
        there every four steps on average.`,
    },
    {
      q: String.raw`An ergodic chain has stationary distribution $\pi=(0.5,\ 0.3,\ 0.2)$, and the cost per period is
        $C=(0,\ 10,\ 50)$ depending on the state. What is the long-run average cost per period?`,
      choices: [String.raw`$10$`, String.raw`$13$`, String.raw`$20$`, String.raw`$60$`],
      answer: 1,
      explanation: String.raw`$\sum_i C(i)\pi_i=0\times 0.5+10\times 0.3+50\times 0.2=3+10=13$. The arithmetic mean
        of the costs ($20$) ignores the time spent in each state.`,
    },
    {
      q: String.raw`For an <strong>ergodic</strong> chain, which of these statements is <strong>false</strong>?`,
      choices: [
        String.raw`Each row of $P^n$ converges to $\pi$.`,
        String.raw`$\pi_i=1/m_i$ where $m_i$ is the mean return time to $i$.`,
        String.raw`$\pi$ is the unique solution of $\pi=\pi P$ with $\sum_i\pi_i=1$.`,
        String.raw`$\pi$ depends on the initial distribution $a$.`,
      ],
      answer: 3,
      explanation: String.raw`That is the whole point of ergodicity: the limiting distribution is the same whatever the starting
        point, the initial state is forgotten. The other three statements are correct.`,
    },
    {
      q: String.raw`Tomorrow's weather (dry or rainy) depends on the weather of the <strong>two</strong> previous days. How many states
        are needed at minimum to model this phenomenon with a DTMC?`,
      choices: [String.raw`2`, String.raw`3`, String.raw`4`, String.raw`It is impossible: the process is not Markov.`],
      answer: 2,
      explanation: String.raw`Take the pair (yesterday's weather, today's weather) as the state: $2\times 2=4$ states. With this
        enlarged state, tomorrow's weather depends only on the current state, and the Markov property is recovered.`,
    },
    {
      q: String.raw`PageRank with $\beta=0.85$ on a web of $n=100$ pages. What is the rank of a page that no link points to?`,
      choices: [String.raw`$0$`, String.raw`$0.0015$`, String.raw`$0.01$`, String.raw`$0.15$`],
      answer: 1,
      explanation: String.raw`Such a page is reached only through the random jump: $\pi_j=\sum_i\pi_i\,G_{ij}
        =\sum_i\pi_i\,\tfrac{1-\beta}{n}=\tfrac{1-\beta}{n}=\tfrac{0.15}{100}=0.0015$. Without taxation its rank would be zero.`,
    },
    {
      q: String.raw`Why is $P$ replaced by $G=\beta P+\tfrac{1-\beta}{n}\mathbf 1\mathbf 1^\top$ in PageRank?`,
      choices: [
        String.raw`To speed up the computation of $P^n$ by making the matrix sparse.`,
        String.raw`So that the rows sum to $\beta$ instead of 1.`,
        String.raw`To make the matrix strictly positive, hence the chain ergodic: unique $\pi$ and guaranteed convergence.`,
        String.raw`To remove the pages with no incoming link.`,
      ],
      answer: 2,
      explanation: String.raw`Every entry of $G$ is $\ge(1-\beta)/n>0$: the chain becomes irreducible and aperiodic
        (finite, hence positive recurrent), that is, ergodic. Traps and dead ends can no longer capture all the
        mass, and the power iteration converges at rate $\beta$.`,
    },
    {
      q: String.raw`In a finite chain, a <strong>transient</strong> state is visited, along an infinite trajectory:`,
      choices: [
        String.raw`finitely many times (with probability 1)`,
        String.raw`infinitely many times`,
        String.raw`exactly once`,
        String.raw`never`,
      ],
      answer: 0,
      explanation: String.raw`At each visit there is a probability $1-f_i>0$ of never coming back: the number of visits is
        geometric, hence finite almost surely. In the long run the chain ends up in a recurrent class, and
        $\pi_i=0$ for every transient state.`,
    },
    {
      q: String.raw`A chain is irreducible but <strong>periodic</strong>. What does its stationary distribution $\pi$ represent?`,
      choices: [
        String.raw`The limit of $P(X_n=i)$ as $n\to\infty$.`,
        String.raw`The most likely initial distribution.`,
        String.raw`The long-run fraction of time spent in each state.`,
        String.raw`Nothing: it does not exist in the periodic case.`,
      ],
      answer: 2,
      explanation: String.raw`Irreducible and positive recurrent is enough for $\pi$ to exist, be unique and be interpreted as a
        fraction of time (with $\pi_i=1/m_i$). Aperiodicity is only needed for the interpretation as the limit
        of $P(X_n=i)$.`,
    },
    {
      q: String.raw`For an irreducible chain with 3 states, how many <strong>independent</strong> equations does the system $\pi=\pi P$ provide?`,
      choices: [String.raw`1`, String.raw`2`, String.raw`3`, String.raw`4`],
      answer: 1,
      explanation: String.raw`Since the rows of $P$ sum to 1, the sum of the three equations is an identity: one of them is
        redundant. Keep two balance equations and add the normalisation $\pi_0+\pi_1+\pi_2=1$ to get a system
        of three equations in three unknowns.`,
    },
  ],

  /* -------------------- EXERCISES -------------------- */
  exos: [
    {
      id: "ex-machine",
      title: "Machine up or down",
      difficulty: "facile",
      tags: ["modelling", "stationary", "two states"],
      statement: String.raw`<p>Each day a machine is either up (state 1) or down (state 0). If it is up, it is still up
        the next day with probability 0.98; otherwise it breaks down. If it is down, it stays down the next day
        with probability 0.03; otherwise it is repaired.</p>
        <p>(a) Model the state of the machine as a DTMC. (b) Compute the stationary probabilities and interpret them.</p>`,
      solution: String.raw`
        <p><strong>(a)</strong> $X_n\in S=\{0,1\}$ is the state of the machine on day $n$. With the convention row $=$
        origin, column $=$ destination:</p>
        <p>$$P=\begin{pmatrix}0.03 & 0.97\\ 0.02 & 0.98\end{pmatrix}.$$</p>
        <p><strong>(b)</strong> The chain is finite and irreducible, hence positive recurrent, and $\pi=\pi P$ has a unique
        solution. Two-state formula with $a=P_{01}=0.97$ and $b=P_{10}=0.02$:</p>
        <p>$$\pi_0=\frac{b}{a+b}=\frac{0.02}{0.99}\approx 0.0202,\qquad \pi_1=\frac{a}{a+b}\approx 0.9798.$$</p>
        <p>The machine is available about 98% of the time, and the "down" state recurs on average every
        $m_0=1/\pi_0\approx 49.5$ days.</p>`,
    },
    {
      id: "ex-pohang",
      title: "Weather in Pohang",
      difficulty: "moyen",
      tags: ["modelling", "transient", "stationary"],
      statement: String.raw`<p>The weather is sunny (0), cloudy (1) or rainy (2). After a sunny day, the next day is cloudy
        with probability 0.3 and rainy with probability 0.2. After a cloudy day: sunny 0.5, rainy 0.3. After a rainy
        day: sunny 0.4, cloudy 0.5.</p>
        <p>(a) Write the matrix $P$. (b) It is sunny today: probability that it rains the day after tomorrow?
        (c) What fraction of days is sunny, cloudy, rainy in the long run?</p>`,
      hints: [String.raw`Each row sums to 1: the probability of "staying in the same weather" completes the row.`],
      solution: String.raw`
        <p><strong>(a)</strong> $$P=\begin{pmatrix}0.5 & 0.3 & 0.2\\ 0.5 & 0.2 & 0.3\\ 0.4 & 0.5 & 0.1\end{pmatrix}.$$</p>
        <p><strong>(b)</strong> With $a=(1,0,0)$, we want $(aP^2)_2=(P^2)_{02}$, that is, row 0 of $P$ multiplied by
        column 2: $0.5\times 0.2+0.3\times 0.3+0.2\times 0.1=0.21$.</p>
        <p><strong>(c)</strong> Solve $\pi=\pi P$ with $\sum\pi_i=1$ (two balance equations plus the normalisation):
        $\pi\approx(0.479,\ 0.311,\ 0.210)$, i.e. about 48% sunny days, 31% cloudy and 21% rainy.
        The chain is ergodic ($P_{00}>0$), so these fractions are also the limits of $P(X_n=i)$.</p>`,
    },
    {
      id: "ex-transient4",
      title: "Four-state DTMC: trajectories and multi-step transitions",
      difficulty: "moyen",
      tags: ["transient", "trajectory", "Chapman-Kolmogorov"],
      statement: String.raw`<p>Consider a DTMC on the states $\{1,2,3,4\}$ with initial distribution $a=(0.3,\ 0.5,\ 0.1,\ 0.1)$ and matrix</p>
        $$P=\begin{pmatrix}0.25&0.25&0.25&0.25\\ 0.1&0.2&0.3&0.4\\ 0.6&0.1&0.1&0.2\\ 0.2&0.2&0.2&0.4\end{pmatrix}.$$
        <p>Compute (a) $P(X_0=1,\ X_1=2,\ X_2=3,\ X_3=3)$; (b) $P(X_5=2\mid X_1=3)$.</p>`,
      hints: [String.raw`(a) Unroll the trajectory one step at a time using the Markov property: $a_1\,P_{12}\,P_{23}\,P_{33}$.`],
      solution: String.raw`
        <p><strong>(a)</strong> The probability of the trajectory factorises:</p>
        <p>$$P(X_0=1,\ X_1=2,\ X_2=3,\ X_3=3)=a_1\,P_{12}\,P_{23}\,P_{33}=0.3\times 0.25\times 0.3\times 0.1=0.00225.$$</p>
        <p><strong>(b)</strong> Between times 1 and 5 there are 4 steps: $P(X_5=2\mid X_1=3)=(P^4)_{32}\approx 0.193$
        (computing $P^4$ by machine).</p>`,
    },
    {
      id: "ex-himart",
      title: "PC inventory at Himart",
      difficulty: "difficile",
      tags: ["modelling", "Poisson", "inventory"],
      statement: String.raw`<p>A store checks its PC inventory every Friday evening. If the stock is below 2, it orders enough
        to bring it back up to 5 units for Monday morning; otherwise it orders nothing. Weekly demand follows a
        Poisson distribution with mean 3, and any unmet demand is lost.</p>
        <p>Model the Monday-morning stock as a DTMC: state space and transition matrix.</p>`,
      hints: [
        String.raw`Take as state the number of PCs in stock on Monday morning. With this ordering policy, $S=\{2,3,4,5\}$.`,
        String.raw`From state $i$, Friday's stock is $\max(i-D,0)$; if it is below 2, restart at 5. Read $P(D=k)$ from the Poisson(3) table.`,
      ],
      solution: String.raw`
        <p>$X_n$ = number of PCs in stock on the $n$-th Monday morning. Since we never go below 2 without reordering up to 5,
        $S=\{2,3,4,5\}$. Poisson(3) table: $P(D=0)=0.0498$, $P(D=1)=0.1494$, $P(D=2)=0.2240$, $P(D=3)=0.2240$,
        $P(D\ge 4)=0.3528$.</p>
        <p>From state $i$, the week ends at $i-D$ as long as $i-D\ge 2$; otherwise we reorder and the next Monday
        starts at 5. With rows and columns ordered $2,3,4,5$:</p>
        <p>$$P=\begin{pmatrix}
        0.0498 & 0 & 0 & 0.9502\\
        0.1494 & 0.0498 & 0 & 0.8008\\
        0.2240 & 0.1494 & 0.0498 & 0.5768\\
        0.2240 & 0.2240 & 0.1494 & 0.4026
        \end{pmatrix}$$</p>
        <p>Each row sums to 1. The column "5" gathers two cases: zero demand from state 5
        ($0.0498$), or a reorder ($P(D\ge 4)=0.3528$), hence $0.4026$ on the last row.</p>`,
    },
    {
      id: "ex-umbrellas",
      title: "The umbrellas",
      difficulty: "difficile",
      tags: ["modelling", "stationary", "cost optimisation"],
      statement: String.raw`<p>A person owns $r$ umbrellas, spread between home and office according to their trips.
        Before each trip it rains with probability $p$, independently of the other trips. If it rains and an
        umbrella is available where they are, they take it. They get wet if it rains and no umbrella is available.</p>
        <p>(a) Model as a DTMC. (b) Compute the stationary distribution. (c) Deduce the fraction $\varphi$ of
        trips on which they get wet. (d) A wet trip costs $c$ and each umbrella costs $d$ per trip in upkeep:
        which number $r^*$ of umbrellas minimises the average cost?</p>`,
      hints: [
        String.raw`State $X_n$ = number of umbrellas at the place <em>from which</em> trip $n$ starts, $S=\{0,1,\dots,r\}$.`,
        String.raw`In the balance equations, try $\pi_1=\pi_2=\cdots=\pi_r$.`,
      ],
      solution: String.raw`
        <p><strong>(a)</strong> $X_n\in\{0,\dots,r\}$. From state 0, all umbrellas are at the other place: we arrive there
        and the next state is $r$. From $i\ge 1$: if it does not rain (probability $1-p$), we arrive with $r-i$ umbrellas;
        if it rains (probability $p$), we take one along and arrive with $r-i+1$.</p>
        <p><strong>(b)</strong> The balance equations are satisfied by $\pi_1=\cdots=\pi_r$ and $\pi_0=(1-p)\pi_r$.
        After normalisation:</p>
        <p>$$\pi_0=\frac{1-p}{\,r+1-p\,},\qquad \pi_1=\cdots=\pi_r=\frac{1}{\,r+1-p\,}.$$</p>
        <p><strong>(c)</strong> Wet if and only if the state is 0 <em>and</em> it rains:
        $\varphi=p\,\pi_0=\dfrac{p(1-p)}{r+1-p}$.</p>
        <p><strong>(d)</strong> Average cost per trip $\tau(r)=c\,\varphi(r)+d\,r$. Treating $r$ as continuous and setting
        the derivative to zero:
        $$r^*=-1+p+\sqrt{\frac{c\,p(1-p)}{d}},$$
        then compare $\tau$ at the two neighbouring integers and keep the smaller cost.</p>`,
    },
    {
      id: "ex-tool",
      title: "Age of a machine tool",
      difficulty: "difficile",
      tags: ["modelling", "stationary", "lifetime"],
      statement: String.raw`<p>A tool produces one part per hour. A tool that has already produced $i-1$ parts breaks down
        while producing the $i$-th one with probability $p_i$; it is then replaced by a new tool for the next hour.
        Let $X_n$ be the age of the tool (number of parts already produced) at the beginning of hour $n$.</p>
        <p>(a) Model as a DTMC. (b) Compute the stationary distribution. (c) Express the mean age of a tool in
        service and the mean lifetime of a tool, and explain why they are not the same quantity.</p>`,
      solution: String.raw`
        <p><strong>(a)</strong> $S=\{0,1,2,\dots\}$. From age $i$, the tool produces its $(i+1)$-th part: it moves to age
        $i+1$ with probability $1-p_{i+1}$ (it survives), or returns to 0 with probability $p_{i+1}$ (breakdown and replacement).</p>
        <p><strong>(b)</strong> The equations $\pi_{i+1}=\pi_i(1-p_{i+1})$ are solved in cascade:
        $\pi_i=\pi_0\prod_{k=1}^{i}(1-p_k)$, and the normalisation gives
        $$\pi_0=\frac{1}{1+(1-p_1)+(1-p_1)(1-p_2)+\cdots}.$$</p>
        <p><strong>(c)</strong> The <em>mean age in service</em> is a time average with reward $C(i)=i$:
        $\sum_i i\,\pi_i$. The <em>lifetime</em> $L$ of a tool satisfies $P(L=k)=(1-p_1)\cdots(1-p_{k-1})\,p_k$, and by the
        tail-sum formula $E[L]=\sum_{k\ge 0}P(L>k)=1+(1-p_1)+(1-p_1)(1-p_2)+\cdots=1/\pi_0$. These are two
        different quantities: the observed mean age weights each age by the time spent there, whereas the mean
        lifetime is the mean time between two replacements (returns to 0).</p>`,
    },
    {
      id: "ex-kim",
      title: "Kim's lunches",
      difficulty: "moyen",
      tags: ["stationary", "cost", "ergodicity"],
      statement: String.raw`<p>Every noon, Kim eats Korean (0), Chinese (1) or a burger (2). Tomorrow's choice depends on
        today's according to
        $$P=\begin{pmatrix}0.3&0.3&0.4\\ 1&0&0\\ 0.5&0.5&0\end{pmatrix}.$$</p>
        <p>(a) In the long run, what fraction of Kim's lunches are burgers? (b) If every student on campus behaves the
        same way, what fraction of them eats Chinese on a given day? (c) A meal costs 5,000 won (Korean), 6,000 won
        (Chinese) or 4,000 won (burger): long-run average spending per lunch?</p>`,
      hints: [String.raw`Solve $\pi=\pi P$ with the normalisation; the fractions are multiples of $1/19$.`],
      solution: String.raw`
        <p>Solving $\pi=\pi P$: $\pi=\left(\tfrac{10}{19},\ \tfrac{5}{19},\ \tfrac{4}{19}\right)\approx(0.526,\ 0.263,\ 0.211)$.
        The chain is ergodic ($P_{00}>0$ and all states communicate).</p>
        <p><strong>(a)</strong> Fraction of time (time average): $\pi_2\approx 0.211$.</p>
        <p><strong>(b)</strong> Fraction of the population (ensemble average): $\pi_1\approx 0.263$. Ergodicity guarantees that
        the two viewpoints coincide.</p>
        <p><strong>(c)</strong> $\sum_i C(i)\pi_i=5000\times\tfrac{10}{19}+6000\times\tfrac{5}{19}+4000\times\tfrac{4}{19}
        \approx 5{,}053$ won per lunch.</p>`,
    },
    {
      id: "ex-pagerank",
      title: "PageRank on three pages, with a trap",
      difficulty: "moyen",
      tags: ["PageRank", "ergodicity", "power iteration"],
      statement: String.raw`<p>A tiny web has three pages. Page 1 links to pages 2 and 3; page 2 links to page 1; page 3
        links only to itself.</p>
        <p>(a) Write the random surfer's matrix $P$ and explain what happens without taxation. (b) Write the taxed
        matrix $G$ for $\beta=0.7$ and compute the ranks. (c) Why is the convergence of the power iteration guaranteed?</p>`,
      hints: [String.raw`$G=\beta P+\tfrac{1-\beta}{n}\mathbf 1\mathbf 1^\top$: each entry of $P$ is multiplied by $\beta$ and then increased by $(1-\beta)/n=0.1$.`],
      solution: String.raw`
        <p><strong>(a)</strong> $$P=\begin{pmatrix}0&0.5&0.5\\ 1&0&0\\ 0&0&1\end{pmatrix}.$$
        Page 3 is an absorbing state (a <em>spider trap</em>): the chain eventually stays there, and $\pi=(0,0,1)$. Pages 1 and 2
        would have rank zero, which does not reflect their real importance.</p>
        <p><strong>(b)</strong> $$G=0.7P+0.1\,\mathbf 1\mathbf 1^\top=\begin{pmatrix}0.1&0.45&0.45\\ 0.8&0.1&0.1\\ 0.1&0.1&0.8\end{pmatrix}.$$
        Solving $\pi=\pi G$ gives $\pi=\left(\tfrac{34}{151},\ \tfrac{27}{151},\ \tfrac{90}{151}\right)\approx(0.225,\ 0.179,\ 0.596)$.
        Page 3 remains the top-ranked one, but pages 1 and 2 recover a positive rank.</p>
        <p><strong>(c)</strong> Every entry of $G$ is strictly positive, so the chain is irreducible, aperiodic and (being finite)
        positive recurrent: it is ergodic. The iteration $p_{k+1}=p_kG$ converges to $\pi$ whatever $p_0$, and the error
        decreases at least like $0.7^k$.</p>`,
    },
  ],

  /* -------------------- DEFINITIONS -------------------- */
  definitions: [
    { term: "Stochastic process", def: String.raw`A family of random variables $\{X_t,\ t\in I\}$ indexed by time. Time can be discrete ($I=\{0,1,2,\dots\}$) or continuous, and the state space discrete or continuous.` },
    { term: "State space", def: String.raw`The set $S$ of values the process can take. In this chapter, $S$ is countable (often finite).` },
    { term: "Discrete-time Markov chain", abbr: "DTMC", def: String.raw`A sequence $\{X_n,\ n\ge 0\}$ with values in $S$ satisfying the Markov property and time homogeneity, fully described by its initial distribution $a$ and its transition matrix $P$.` },
    { term: "Markov property", def: String.raw`$P(X_{n+1}=j\mid X_n=i,X_{n-1},\dots,X_0)=P(X_{n+1}=j\mid X_n=i)$: given the present, the future does not depend on the past. If the natural description has memory, <strong>enlarge the state</strong> to recover it.` },
    { term: "Time homogeneity", def: String.raw`The transition probabilities $P_{ij}$ do not depend on the time $n$: a single matrix $P$ describes the whole evolution.` },
    { term: "Transition (stochastic) matrix", def: String.raw`$P=(P_{ij})$ with $P_{ij}=P(X_{n+1}=j\mid X_n=i)$. Non-negative entries and <strong>each row sums to 1</strong>. Row $=$ current state, column $=$ next state.` },
    { term: "Transition diagram", def: String.raw`Directed graph whose vertices are the states and whose arcs are the transitions with positive probability, labeled by $P_{ij}$. Used to read off classes, periods and absorbing states.` },
    { term: "Initial distribution", def: String.raw`Row vector $a=[P(X_0=0),P(X_0=1),\dots]$. The distribution at time $n$ is $p_n=aP^n$ (row vector to the left of the matrix).` },
    { term: "n-step transition probability", def: String.raw`$P^{(n)}_{ij}=P(X_n=j\mid X_0=i)$, the $(i,j)$ entry of the power $P^n$.` },
    { term: "Chapman-Kolmogorov equations", abbr: "C-K", def: String.raw`$P^{(m+n)}_{ij}=\sum_k P^{(m)}_{ik}P^{(n)}_{kj}$: going from $i$ to $j$ in $m+n$ steps means passing through some intermediate state $k$ after $m$ steps. In matrix form, $P^{(n)}=P^n$.` },
    { term: "Accessible state, communicating states", def: String.raw`$j$ is accessible from $i$ ($i\to j$) if there is $n\ge 0$ with $P^{(n)}_{ij}>0$. If $i\to j$ and $j\to i$, the two states <strong>communicate</strong> ($i\leftrightarrow j$).` },
    { term: "Communication class", def: String.raw`A maximal set of states that all communicate with each other. The relation "communicate" partitions $S$ into classes.` },
    { term: "Irreducible chain", def: String.raw`A chain with a single communication class: all states communicate.` },
    { term: "Recurrent / transient state", def: String.raw`Recurrent if, starting from $i$, the chain returns to $i$ with probability $f_i=1$ (visited infinitely often); transient if $f_i\lt 1$ (visited finitely many times). Criterion: $i$ recurrent $\iff\sum_n P^{(n)}_{ii}=\infty$. A class property.` },
    { term: "Positive recurrence", def: String.raw`A recurrent state whose mean return time $m_i$ is finite. In a finite-state chain, every recurrent state is positive recurrent.` },
    { term: "Closed class", def: String.raw`A class with no transition leaving it. In a finite chain, a class is recurrent if and only if it is closed.` },
    { term: "Absorbing state", def: String.raw`A state $i$ with $P_{ii}=1$: once reached, the chain never leaves. It forms a closed class by itself.` },
    { term: "Period, aperiodicity", def: String.raw`$d(i)=\gcd\{n\ge 1: P^{(n)}_{ii}>0\}$. The state is aperiodic if $d(i)=1$; a self-loop $P_{ii}>0$ suffices. A class property.` },
    { term: "Ergodic chain", def: String.raw`Irreducible $+$ positive recurrent $+$ aperiodic. There is then a unique stationary distribution $\pi$ and $P(X_n=i)\to\pi_i$ whatever the starting state.` },
    { term: "Stationary distribution", def: String.raw`A vector $\pi$ solving $\pi=\pi P$ with $\sum_i\pi_i=1$. Unique if the chain is irreducible and positive recurrent. $\pi_i$ is the long-run fraction of time spent in $i$.` },
    { term: "Balance equations", def: String.raw`The equations $\pi_j=\sum_i\pi_iP_{ij}$ of the system $\pi=\pi P$. One of them is always redundant: replace it with the normalization $\sum_i\pi_i=1$.` },
    { term: "Mean return time", def: String.raw`$m_i$ = expected number of steps to return to $i$ starting from $i$. For an irreducible positive recurrent chain, $m_i=1/\pi_i$.` },
    { term: "Limiting distribution", def: String.raw`$\lim_{n\to\infty}P(X_n=i)$. Exists and equals $\pi_i$ for every initial distribution if the chain is ergodic; a periodic chain has a stationary distribution but no limit.` },
    { term: "Long-run average cost (or reward)", def: String.raw`If a cost $C(i)$ is paid at each visit to $i$: $\lim\frac1n\sum_{k=1}^nC(X_k)=\sum_iC(i)\pi_i$. Time average along one path $=$ ensemble average weighted by $\pi$ (ergodicity).` },
    { term: "PageRank", def: String.raw`The rank of a web page $=$ its long-run visit frequency $\pi_j$ by a random surfer who at each step follows an outgoing link chosen uniformly at random.` },
    { term: "Dead end", def: String.raw`A page with no outgoing link: the corresponding row of $P$ is zero and probability mass "leaks". Breaks ergodicity.` },
    { term: "Spider trap", def: String.raw`A group of pages one can never leave (a closed class): it captures all the probability mass in the long run.` },
    { term: "Taxation (teleportation)", def: String.raw`With probability $\beta$ the surfer follows a link, with probability $1-\beta$ they jump to a uniformly random page: $G=\beta P+\frac{1-\beta}{n}\mathbf 1\mathbf 1^\top$, a strictly positive matrix, hence ergodic.` },
    { term: "Power iteration", def: String.raw`Computing $\pi$ via $p_{k+1}=p_kG$ from any $p_0$; converges at rate $\beta$: $\lVert p_k-\pi\rVert_1\le\beta^k\lVert p_0-\pi\rVert_1$.` },
  ],
});
