/* ===================== demos.js : interactive tools for the Thesis guide (mounted by page.js on [data-demo]) ===================== */
const DEMOS = {};
const bdt = (n) => (Math.round(n) || 0).toLocaleString('en-IN');
function demoBox(title, sub, ...kids) { return h('div', { class: 'demo' }, h('h3', null, title), sub ? h('p', { class: 'sub' }, sub) : null, ...kids); }
function scoreGame(root, title, sub, items, choices, explainKey) {
  /* items: [{t, a, w}] ; choices: [{v, l}] */
  let score = 0, done = 0;
  const head = h('div', { class: 'qhead' }), list = h('div', { class: 'game' });
  const paint = () => { head.textContent = ''; head.append(h('span', null, `${done} of ${items.length} answered`), h('span', null, `Score ${score}`)); };
  items.forEach((it) => {
    const why = h('div', { class: 'gwhy' });
    const btns = choices.map((c) => h('button', { type: 'button', class: 'btn sm', onclick: () => {
      if (row.dataset.done) return; row.dataset.done = '1'; done++;
      const ok = c.v === it.a; if (ok) score++;
      btns.forEach((b, i) => { b.disabled = true; if (choices[i].v === it.a) b.classList.add('right'); else if (b === btns[choices.indexOf(c)]) b.classList.add('wrong'); });
      why.append(h('b', null, ok ? 'Correct. ' : 'Not quite: ' + choices.find((x) => x.v === it.a).l + '. '), it.w || '');
      paint();
    } }, c.l));
    const row = h('div', { class: 'grow' }, h('div', { class: 'gq' }, it.t), h('div', { class: 'row tight' }, btns), why);
    list.append(row);
  });
  paint();
  root.append(demoBox(title, sub, head, list, h('div', { class: 'row gap' }, h('button', { type: 'button', class: 'btn', onclick: () => { clear(root); scoreGame(root, title, sub, items, choices, explainKey); } }, 'Start again'))));
}

/* ================= Topic 1: planning ================= */

/* ================= Chapter 10: LaTeX playground (shared with the CSE 308 site) ================= */
const TEX_SAMPLES = {
  hello: [
    '\\documentclass{article}',
    '\\begin{document}',
    'Hello World! % your content goes here...',
    '',
    'Words are separated by one or more spaces.',
    'Paragraphs are separated by one or more blank lines.',
    '',
    "Single quotes: `text'. Double quotes: ``text''.",
    'Special characters must be escaped: \\$ \\% \\& \\# \\_ \\{ \\}',
    '\\end{document}'].join('\n'),
  exercise1: String.raw`\documentclass{article}
\begin{document}
% Exercise 1: fix the errors (hint: special characters!)
In March 2006, Congress raised that ceiling an additional $0.79
trillion to $8.97 trillion, which is approximately 68% of GDP. As of
October 4, 2008, the "Emergency Economic Stabilization Act of
2008" raised the current debt ceiling to $11.3 trillion.
\end{document}`,
  math: String.raw`\documentclass{article}
\usepackage{amsmath}
\begin{document}
Let $a$ and $b$ be distinct positive integers, and let $c = a - b + 1$.
The roots of a quadratic equation are given by
\begin{equation}
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
\label{eq:quad}
\end{equation}
where $a$, $b$ and $c$ are the coefficients; see \eqref{eq:quad}.
\begin{align*}
(x+1)^3 &= (x+1)(x+1)(x+1) \\
        &= (x+1)(x^2 + 2x + 1) \\
        &= x^3 + 3x^2 + 3x + 1
\end{align*}
\end{document}`,
  exercise2: String.raw`\documentclass{article}
\usepackage{amsmath}
\begin{document}
% Exercise 2: make the maths match the target (hint: $...$ and \infty)
Let $X_1, X_2, \ldots, X_n$ be a sequence of independent and identically
distributed random variables with \operatorname{E}[X_i] = \mu and
$\operatorname{Var}[X_i] = \sigma^2 < infinity$, and let
S_n = \frac{1}{n}\sum_{i=1}^{n} X_i
denote their mean. Then as $n$ approaches infinity, the random variables
\sqrt{n}(S_n - \mu) converge in distribution to a normal $N(0, \sigma^2)$.
\end{document}`,
  report: String.raw`\documentclass[12pt]{article}
\usepackage{amsmath}
\usepackage{graphicx}
\title{Smart Library Management System}
\author{Team Alpha, CSE 308}
\date{\today}
\begin{document}
\maketitle
\begin{abstract}
We propose a web-based system that lets students search, reserve and renew books.
\end{abstract}
\tableofcontents

\section{Introduction}\label{sec:intro}
Libraries still track loans on paper. Section~\ref{sec:method} explains our approach.

\subsection{Objectives}
\begin{itemize}
  \item Let students \textbf{search} and \emph{reserve} books online.
  \item Calculate fines automatically.
\end{itemize}

\section{Methodology}\label{sec:method}
We follow the iterative model shown in Figure~\ref{fig:model}.
\begin{figure}[h]
  \centering
  \includegraphics[width=0.5\textwidth]{iterative-model.png}
  \caption{The iterative development model.}
  \label{fig:model}
\end{figure}
\end{document}`,
  figtab: String.raw`\documentclass{article}
\usepackage{graphicx}
\usepackage{caption}
\usepackage{subcaption}
\begin{document}
Table~\ref{tab:budget} lists the cost; Figure~\ref{fig:three} shows three graphs.
\begin{table}[h]
\centering
\caption{Budget of the new system}
\label{tab:budget}
\begin{tabular}{|l|r|}
\hline
Item & Cost (Tk) \\ \hline
Laptop & 1,50,000 \\
Developer & 50,000 \\ \hline
\end{tabular}
\end{table}

\begin{figure}[h]
  \centering
  \begin{subfigure}[b]{0.3\textwidth}
    \centering
    \includegraphics[width=\textwidth]{graph1}
    \caption{$y=x$}
  \end{subfigure}
  \hfill
  \begin{subfigure}[b]{0.3\textwidth}
    \centering
    \includegraphics[width=\textwidth]{graph2}
    \caption{$y=3\sin x$}
  \end{subfigure}
  \caption{Three simple graphs}
  \label{fig:three}
\end{figure}
\end{document}`,
  algo: String.raw`\documentclass{article}
\usepackage{algorithm}
\usepackage{algpseudocode}
\begin{document}
\begin{algorithm}
\caption{Withdraw cash}
\begin{algorithmic}[1]
\Require PIN is verified
\State $b \gets$ balance of the account
\If{$amount \leq b$}
    \State $b \gets b - amount$
    \State dispense cash
\Else
    \State show an error: insufficient funds
\EndIf
\Return $b$
\end{algorithmic}
\end{algorithm}
\end{document}`,
  cite: String.raw`\documentclass{article}
\usepackage{biblatex}
\addbibresource{citation.bib}
\begin{document}
ATMs were first studied as self-service systems~\cite{batiz2008}.
Requirements should follow the IEEE recommended practice~\cite{ieee830}.

\printbibliography
\end{document}`
};
/* exercises: the corrected source is compiled as the target page shown beside the student's own output */
const TEX_TARGETS = {
  exercise1: [   // an array, not String.raw: the LaTeX quotes `` would end a template literal
    '\\documentclass{article}',
    '\\begin{document}',
    'In March 2006, Congress raised that ceiling an additional \\$0.79',
    'trillion to \\$8.97 trillion, which is approximately 68\\% of GDP. As of',
    "October 4, 2008, the ``Emergency Economic Stabilization Act of",
    "2008'' raised the current debt ceiling to \\$11.3 trillion.",
    '\\end{document}'].join('\n'),
  exercise2: String.raw`\documentclass{article}
\usepackage{amsmath}
\begin{document}
Let $X_1, X_2, \ldots, X_n$ be a sequence of independent and identically
distributed random variables with $\operatorname{E}[X_i] = \mu$ and
$\operatorname{Var}[X_i] = \sigma^2 < \infty$, and let
\begin{equation*}
S_n = \frac{1}{n}\sum_{i=1}^{n} X_i
\end{equation*}
denote their mean. Then as $n$ approaches infinity, the random variables
$\sqrt{n}(S_n - \mu)$ converge in distribution to a normal $N(0, \sigma^2)$.
\end{document}`
};
const TEX_TASKS = {
  exercise1: 'The source has mistakes with special characters. Edit it until <b>Your output</b> (right) looks exactly like the <b>Target</b> (left). Start with the first error in the log.',
  exercise2: 'Some of the maths is written as plain text. Edit the source until <b>Your output</b> (right) looks exactly like the <b>Target</b> (left): put maths inside <code>$…$</code>, give the big formula its own <code>equation*</code>, and write ∞ as <code>\\infty</code>.'
};
DEMOS['tex-play'] = (root) => {
  const pick = root.getAttribute('data-sample') || 'hello';
  const names = { hello: 'Hello world', exercise1: 'Exercise 1', math: 'Maths', exercise2: 'Exercise 2', report: 'Report', figtab: 'Tables & figures', algo: 'Algorithm', cite: 'Citations', thesis: 'Thesis chapter' };
  const show = (root.getAttribute('data-list') || pick).split(',');
  const ta = h('textarea', { class: 'tex-src', spellcheck: 'false', 'aria-label': 'LaTeX source' });
  const view = h('div', { class: 'tex-page' }), log = h('div', { class: 'tex-log' }), status = h('span', { class: 'small muted' });
  const target = h('div', { class: 'tex-page target', 'aria-label': 'Target output' }), match = h('div', { class: 'tex-match', 'aria-live': 'polite' }), task = h('p', { class: 'tex-task' });
  const area = h('div');
  let timer = 0, cur = pick;
  /* the visible text of a page, ignoring spacing and KaTeX's hidden MathML copy */
  const looks = (el) => { const c = el.cloneNode(true); c.querySelectorAll('.katex-mathml').forEach((x) => x.remove()); return c.textContent.replace(/\s+/g, ''); };
  function build() {
    const w = TeX.wrapSnippet(ta.value);
    const r = TeX.compile(w.src, { bib: TEX_BIB });
    r.errors.forEach((e) => { e.line = Math.max(1, e.line - w.shift); });
    view.innerHTML = r.html || '<p class="tx-note">(empty page)</p>';
    clear(log);
    if (w.wrapped && ta.value.trim()) log.append(h('div', { class: 'tl-warn' }, h('b', null, 'Note: '), 'no \\documentclass, so this was compiled as the body of an article that loads the course packages. In Overleaf, paste it between \\begin{document} and \\end{document}.'));
    if (!r.errors.length && !r.warnings.length) log.append(h('div', { class: 'tl-ok' }, '✓ Compiled with no errors.'));
    r.errors.forEach((e) => log.append(h('div', { class: 'tl-err' }, h('b', null, `! l.${e.line} `), e.msg)));
    r.warnings.forEach((w) => log.append(h('div', { class: 'tl-warn' }, h('b', null, 'Warning: '), w)));
    if (!TEX_TARGETS[cur]) return;
    target.innerHTML = TeX.compile(TEX_TARGETS[cur], { bib: TEX_BIB }).html;
    const ok = !r.errors.length && looks(view) === looks(target);
    area.querySelector('.tex-split').classList.toggle('matched', ok);
    match.className = 'tex-match ' + (ok ? 'ok' : 'no');
    match.textContent = ok ? '✓ Your output matches the target. Well done!'
      : r.errors.length ? `✗ Not matching yet: ${r.errors.length} error${r.errors.length > 1 ? 's' : ''} in the log. Fix the first one, then compare the two pages again.`
        : '✗ It compiles, but your output still differs from the target. Compare the two pages word by word.';
  }
  function layout() {
    clear(area);
    if (TEX_TARGETS[cur]) {
      task.innerHTML = TEX_TASKS[cur];
      ta.classList.add('ex-src');
      view.classList.add('mine');
      ta.style.height = (TEX_SAMPLES[cur].split('\n').length * 1.55 + 1.4) + 'em';
      area.append(task, h('div', { class: 'gap' }, ta, log), match,
        h('div', { class: 'tex-split tx-exm' },
          h('div', null, h('div', { class: 'tex-lab tgt' }, 'Target ', h('i', null, '· what it should look like')), target),
          h('div', null, h('div', { class: 'tex-lab' }, 'Your output ', h('i', null, '· updates as you type')), view)));
    } else {
      ta.classList.remove('ex-src');
      view.classList.remove('mine');
      ta.style.height = '';
      area.append(h('div', { class: 'tex-split' }, h('div', null, ta, log), view));
    }
  }
  const load = (k) => { cur = k; ta.value = TEX_SAMPLES[k]; layout(); build(); };
  ta.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(build, 250); });
  ta.addEventListener('keydown', (e) => { if (e.key === 'Tab') { e.preventDefault(); const s = ta.selectionStart; ta.setRangeText('  ', s, ta.selectionEnd, 'end'); build(); } });
  const bar = h('div', { class: 'row tight' }, show.length > 1 ? seg(show.map((k) => ({ v: k, l: names[k] })), pick, load).el : null, h('button', { type: 'button', class: 'btn sm', onclick: () => load(cur) }, 'Reset'), status);
  load(pick);
  TeX.loadKatex((ok) => { status.textContent = ok ? 'Maths: KaTeX' : 'Maths shown as source (offline)'; build(); });
  root.append(demoBox('LaTeX playground', TEX_TARGETS[pick] ? 'An exercise: the page on the left is the target, the page on the right is what your source produces. Errors appear in the log with the line number and LaTeX’s own wording.'
    : 'Edit the source on the left; the page on the right updates as you type. Errors appear in the log with the line number and LaTeX’s own wording. This previewer knows the commands in this course, not all of LaTeX — use Overleaf for real reports.',
  bar, area));
};


/* thesis-specific samples */
TEX_SAMPLES.thesis = String.raw`\documentclass{article}
\usepackage{graphicx}
\usepackage{biblatex}
\addbibresource{references.bib}
\begin{document}
\section{Results and Discussion}\label{sec:results}
Table~\ref{tab:main} compares our model with two baselines.
Continued pre-training improves macro-F1 by 3.1 points,
in line with earlier findings on domain adaptation~\cite{devlin2019bert}.

\begin{table}[h]
  \centering
  \caption{Macro-F1 on the test set (mean of 5 runs).}
  \label{tab:main}
  \begin{tabular}{lc}
    \hline
    Model & Macro-F1 \\
    \hline
    TF-IDF + LR & 0.68 \\
    BanglaBERT & 0.78 \\
    \textbf{Ours} & \textbf{0.81} \\
    \hline
  \end{tabular}
\end{table}

\subsection{Error analysis}
Most remaining errors involve sarcasm (31\%), as shown in
Section~\ref{sec:results}.

\printbibliography
\end{document}`;
TEX_SAMPLES.cite = String.raw`\documentclass{article}
\usepackage{biblatex}
\addbibresource{references.bib}
\begin{document}
We read papers in three passes~\cite{keshav2007}.
Our model builds on BERT~\cite{devlin2019bert} and the
transformer architecture~\cite{vaswani2017attention}.

\printbibliography
\end{document}`;


/* ===================================================================================== */
/* =============================  Part A: the research process  ======================== */
/* ===================================================================================== */
const fmt = (x, d) => (Number.isFinite(x) ? x.toFixed(d == null ? 3 : d) : '—');
function outBox() { return h('div', { class: 'out tout' }); }
function copyBtn(getText, label) {
  const b = h('button', { type: 'button', class: 'btn sm', onclick: () => {
    const t = getText();
    const done = () => { const o = b.textContent; b.textContent = 'Copied ✓'; setTimeout(() => { b.textContent = o; }, 1400); };
    if (navigator.clipboard) navigator.clipboard.writeText(t).then(done, () => {});
  } }, label || 'Copy');
  return b;
}

/* ---------- chapter 1 ---------- */
DEMOS['thesis-or-project'] = (root) => scoreGame(root, 'Research or development?', 'Is each idea a research question (new knowledge, answered with evidence) or a development project (a working product)?', [
  { t: 'Build a mobile app that shows bus routes in Dhaka.', a: 'D', w: 'A product; no question is answered.' },
  { t: 'Does adding live GPS data reduce the error of bus-arrival predictions compared with timetable-based predictions?', a: 'R', w: 'An effect, a comparison and a measurable outcome.' },
  { t: 'Create a website for the department’s alumni association.', a: 'D', w: 'A useful product, but not research.' },
  { t: 'Which of three open speech-recognition models has the lowest word error rate on Chittagonian speech, and why?', a: 'R', w: 'A comparison with an explanation.' },
  { t: 'Develop an attendance system with face recognition.', a: 'D', w: 'Becomes research only with a question, e.g. how accuracy drops with masks or poor light.' },
  { t: 'How do first-year students use AI chatbots for programming assignments, and which uses do they consider cheating?', a: 'R', w: 'An empirical question about people.' },
  { t: 'Implement a library management system with barcode scanning.', a: 'D', w: 'A product built to specification.' },
  { t: 'Does synthetic data augmentation improve detection of rare rice diseases in field photos?', a: 'R', w: 'A testable effect.' }],
  [{ v: 'R', l: 'Research' }, { v: 'D', l: 'Development' }]);

DEMOS['timeline'] = (root) => {
  let tasks = [
    { n: 'Topic and supervisor', s: 1, d: 1 }, { n: 'Reading and literature review', s: 1, d: 4 }, { n: 'Proposal and defence', s: 3, d: 1 },
    { n: 'Data collection', s: 3, d: 3 }, { n: 'Baselines and method', s: 4, d: 3 }, { n: 'Experiments and analysis', s: 6, d: 4 },
    { n: 'Progress presentation', s: 6, d: 1 }, { n: 'Writing the thesis', s: 8, d: 4 }, { n: 'Paper submission', s: 11, d: 2 }, { n: 'Final defence', s: 12, d: 1 }];
  const months = 12;
  const tbl = h('div'), chart = h('div', { class: 'gantt' }), info = outBox();
  function draw() {
    clear(tbl);
    const rows = tasks.map((t, i) => {
      const up = (k, v) => { t[k] = k === 'n' ? v : Math.max(1, Math.min(24, parseInt(v, 10) || 1)); drawChart(); };
      return h('tr', null,
        h('td', null, textInput(t.n, { oninput: (e) => up('n', e.target.value), 'aria-label': 'Task', style: { width: '100%' } })),
        h('td', null, numInput(t.s, { min: 1, max: 24, oninput: (e) => up('s', e.target.value), 'aria-label': 'Start month', style: { width: '70px' } })),
        h('td', null, numInput(t.d, { min: 1, max: 24, oninput: (e) => up('d', e.target.value), 'aria-label': 'Months', style: { width: '70px' } })),
        h('td', null, h('button', { type: 'button', class: 'btn sm', 'aria-label': 'Remove task', onclick: () => { tasks.splice(i, 1); draw(); } }, '✕')));
    });
    tbl.append(h('div', { class: 'scrollx' }, h('table', { class: 'doc edit' }, h('thead', null, h('tr', null, ['Task', 'Start month', 'Months', ''].map((x) => h('th', null, x)))), h('tbody', null, rows))),
      h('div', { class: 'row gap' }, h('button', { type: 'button', class: 'btn', onclick: () => { tasks.push({ n: 'New task', s: 1, d: 1 }); draw(); } }, '+ Add task'),
        h('button', { type: 'button', class: 'btn', onclick: () => { tasks = tasks.slice().sort((a, b) => a.s - b.s); draw(); } }, 'Sort by start')));
    drawChart();
  }
  function drawChart() {
    clear(chart);
    const end = Math.max(months, ...tasks.map((t) => t.s + t.d - 1));
    chart.style.setProperty('--wk', end);
    chart.append(h('div', { class: 'g-lab g-head' }, 'Month →'), ...range(end).map((w) => h('div', { class: 'g-wk g-head' }, String(w + 1))));
    tasks.forEach((t, i) => {
      chart.append(h('div', { class: 'g-lab' }, t.n || '(unnamed)'));
      chart.append(h('div', { class: 'g-track', style: { gridColumn: `2 / span ${end}` } },
        h('div', { class: 'g-bar c' + (i % 4), style: { gridColumn: `${t.s} / span ${t.d}` }, title: `${t.n}: months ${t.s}–${t.s + t.d - 1}` }, t.d > 1 ? `M${t.s}–${t.s + t.d - 1}` : `M${t.s}`)));
    });
    const last = Math.max(0, ...tasks.map((t) => t.s + t.d - 1));
    const writing = tasks.find((t) => /writ/i.test(t.n));
    info.innerHTML = `Plan length: <b>${last} months</b>` + (last > months ? ` — <b class="bad">over the ${months}-month limit</b>` : '') +
      (writing ? ` · writing gets <b>${writing.d} month${writing.d > 1 ? 's' : ''}</b>` + (writing.d < 3 ? ' (plan at least 3)' : '') : ' · <b>no writing task?</b>');
  }
  draw();
  root.append(demoBox('One-year thesis planner', 'A typical plan by month. Change starts and lengths to fit your department’s deadlines; the summary warns if the plan runs late or leaves too little time for writing.', tbl, chart, info));
};

/* ---------- chapter 2 ---------- */
DEMOS['topic-score'] = (root) => {
  const crit = [['Interest', 2], ['Feasibility (time, skills, compute)', 3], ['Data availability', 3], ['Novelty', 2], ['Supervisor expertise', 2], ['Measurable outcome', 2], ['Usefulness', 1]];
  const topics = ['Bangla fake-news detection', 'Rice-leaf disease detection on phones', 'LLM chatbot for course rules'];
  const sc = [[5, 3, 3, 3, 4, 4, 4], [4, 4, 4, 3, 3, 5, 5], [5, 3, 4, 2, 2, 2, 3]];
  const wrap = h('div'), out = outBox();
  function draw() {
    clear(wrap);
    const head = h('tr', null, h('th', null, 'Criterion'), h('th', null, 'Weight'), topics.map((t, j) => h('th', null, textInput(t, { 'aria-label': 'Topic ' + (j + 1), style: { width: '100%', minWidth: '140px' }, oninput: (e) => { topics[j] = e.target.value; paint(); } }))));
    const rows = crit.map((c, i) => h('tr', null, h('td', null, c[0]),
      h('td', null, selectEl([1, 2, 3], c[1], (v) => { c[1] = +v; paint(); })),
      topics.map((_, j) => h('td', null, selectEl([1, 2, 3, 4, 5], sc[j][i], (v) => { sc[j][i] = +v; paint(); })))));
    wrap.append(h('div', { class: 'scrollx' }, h('table', { class: 'doc edit' }, h('thead', null, head), h('tbody', null, rows))));
    paint();
  }
  function paint() {
    const max = crit.reduce((a, c) => a + c[1] * 5, 0);
    const res = topics.map((t, j) => ({ t, s: crit.reduce((a, c, i) => a + c[1] * sc[j][i], 0), weak: crit.filter((c, i) => sc[j][i] <= 2 && /Feasib|Data/.test(c[0])).map((c) => c[0].split(' (')[0]) }));
    const best = res.reduce((a, b) => (b.s > a.s ? b : a));
    out.innerHTML = res.map((r) => `<div class="barrow"><span class="bl">${esc(r.t || '(unnamed)')}</span><span class="bb"><i style="width:${(100 * r.s / max).toFixed(0)}%"></i></span><b>${r.s} / ${max}</b>` +
      (r.weak.length ? ` <span class="bad">⚠ weak on ${r.weak.join(' and ')}</span>` : '') + '</div>').join('') +
      `<p class="small">Highest: <b>${esc(best.t)}</b>. A high total with weak feasibility or data is still risky — fix those first, then discuss with your supervisor.</p>`;
  }
  draw();
  root.append(demoBox('Topic scorer', 'Rate each candidate topic from 1 (poor) to 5 (excellent). Weights say how much a criterion matters to you; feasibility and data weigh most by default.', wrap, out));
};

DEMOS['rq-check'] = (root) => {
  const ex = ['Can AI detect fake news?', 'Build a chatbot for the library.', 'Does continued pre-training on code-mixed text improve macro-F1 of Bangla sentiment classification compared with fine-tuning BanglaBERT alone?',
    'How do CSE undergraduates use AI assistants for programming assignments, and which uses do they consider dishonest?'];
  const ta = h('textarea', { rows: 3, class: 'wide', 'aria-label': 'Research question' }), out = outBox();
  ta.value = ex[0];
  function check() {
    const q = ta.value.trim(), lw = q.toLowerCase(), words = q.split(/\s+/).filter(Boolean).length;
    const tests = [
      [/\?\s*$/.test(q), 'It is phrased as a question.', 'End with a question mark: research starts from a question.'],
      [!/^(build|develop|create|make|design|implement)\b/i.test(q), 'It is not a task.', 'Starts with a task verb (build, develop…). Ask what you want to find out instead.'],
      [/^(does|do|is|are|can|how|which|what|why|to what extent|when|will)\b/i.test(q), 'It starts with a question word.', 'Start with Does / How / Which / To what extent…'],
      [/\b(than|compared|versus|vs\.?|baseline|over|against|with and without|alone)\b/i.test(q), 'It names a comparison.', 'Add a comparison: better than what? (a baseline, an alternative, before/after).'],
      [/\b(accuracy|f1|recall|precision|error|auc|latency|time|rate|score|throughput|energy|cost|satisfaction|sus|bleu|chrf|map|iou|dice|mae|rmse|reliab|use|consider)\w*/i.test(lw), 'It names an outcome or measure.', 'Say how the answer is measured (e.g. macro-F1, task time, error rate).'],
      [/\b(data|dataset|text|images?|comments?|users?|students?|patients?|developers?|farmers?|bangla|bengali|traffic|network|devices?|code|apps?)\b/i.test(lw), 'It names the data or population.', 'Name the data or the people the question is about.'],
      [!/\b(good|better|best|smart|efficient|effective|improve)\b/i.test(lw) || /\b(than|compared|baseline|f1|accuracy|error|rate|time)\b/i.test(lw), 'No vague, unmeasured words.', 'Words like “better” or “effective” need a measure and a comparison.'],
      [words >= 10 && words <= 50, `A sensible length (${words} words).`, words < 10 ? `Very short (${words} words): probably too broad.` : `Long (${words} words): consider sub-questions.`]];
    const ok = tests.filter((t) => t[0]).length;
    out.innerHTML = '<ul class="chk">' + tests.map((t) => `<li class="${t[0] ? 'ok' : 'no'}">${t[0] ? '✓ ' + t[1] : '✗ ' + t[2]}</li>`).join('') + '</ul>' +
      `<p><b>${ok} of ${tests.length}</b> checks passed. ${ok >= 7 ? 'A precise question — now check FINER with your supervisor.' : 'Revise and check again.'}</p><p class="small muted">A rough automatic check of wording only; it cannot judge whether the question is novel or feasible.</p>`;
  }
  ta.addEventListener('input', check);
  check();
  root.append(demoBox('Research-question checker', 'Type a research question. The checker looks for a question form, a comparison, a measurable outcome, the data or population, and vague words.',
    h('div', { class: 'row tight' }, ex.map((x, i) => h('button', { type: 'button', class: 'btn sm', onclick: () => { ta.value = x; check(); } }, 'Example ' + (i + 1)))), ta, out));
};

/* ---------- chapter 3 ---------- */
DEMOS['query-build'] = (root) => {
  const rows = [['Bangla, Bengali'], ['sentiment, opinion, emotion'], ['social media, Facebook, YouTube comments']];
  const wrap = h('div'), out = h('pre', { class: 'code nonum qstr' }), links = h('div', { class: 'row tight' }), simple = h('p', { class: 'small' });
  const phrase = (s) => (/\s/.test(s) ? `"${s}"` : s);
  function draw() {
    clear(wrap);
    rows.forEach((r, i) => wrap.append(h('div', { class: 'row tight' }, h('span', { class: 'small', style: { minWidth: '86px' } }, `Concept ${i + 1}`),
      textInput(r[0], { style: { flex: '1' }, 'aria-label': `Concept ${i + 1} synonyms`, oninput: (e) => { r[0] = e.target.value; build(); } }),
      h('button', { type: 'button', class: 'btn sm', 'aria-label': 'Remove concept', onclick: () => { rows.splice(i, 1); draw(); } }, '✕'))));
    wrap.append(h('div', { class: 'row tight' }, h('button', { type: 'button', class: 'btn sm', onclick: () => { if (rows.length < 5) { rows.push(['']); draw(); } } }, '+ Add concept')));
    build();
  }
  function build() {
    const groups = rows.map((r) => r[0].split(',').map((x) => x.trim()).filter(Boolean)).filter((g) => g.length);
    const q = groups.map((g) => (g.length > 1 ? '(' + g.map(phrase).join(' OR ') + ')' : phrase(g[0]))).join('\nAND ');
    out.textContent = q || '(type some keywords)';
    const flat = q.replace(/\n/g, ' '), first = groups.map((g) => g[0]).join(' ');
    simple.innerHTML = `For Google Scholar, a short query of the main terms often works better: <code>${esc(first)}</code>`;
    const enc = encodeURIComponent;
    clear(links);
    [['Google Scholar', 'https://scholar.google.com/scholar?q=' + enc(first)], ['Semantic Scholar', 'https://www.semanticscholar.org/search?q=' + enc(first)],
     ['IEEE Xplore', 'https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=' + enc(flat)], ['ACM DL', 'https://dl.acm.org/action/doSearch?AllField=' + enc(flat)],
     ['arXiv', 'https://arxiv.org/search/?searchtype=all&query=' + enc(first)], ['PubMed', 'https://pubmed.ncbi.nlm.nih.gov/?term=' + enc(flat)]]
      .forEach(([n, u]) => links.append(h('a', { class: 'btn sm', href: u, target: '_blank', rel: 'noopener' }, n + ' ↗')));
    links.append(copyBtn(() => flat, 'Copy string'));
  }
  draw();
  root.append(demoBox('Search-query builder', 'One concept per row; separate synonyms with commas. Synonyms are joined with OR, concepts with AND; multi-word terms get quotes. Open the search directly in a database.', wrap, out, simple, links));
};

/* ---------- chapter 4 ---------- */
DEMOS['prisma'] = (root) => {
  const v = { db: 412, other: 18, dup: 96, title: 210, abs: 70, notret: 3, ft: 14 };
  const labels = { db: 'Records from databases', other: 'Records from other sources (snowballing)', dup: 'Duplicates removed', title: 'Excluded on title', abs: 'Excluded on abstract', notret: 'Full text not available', ft: 'Excluded after full-text reading' };
  const form = h('div', { class: 'grid2' }), fig_ = h('div', { class: 'prisma-box' }), msg = h('p', { class: 'small' });
  Object.keys(v).forEach((k) => form.append(field(labels[k], numInput(v[k], { min: 0, oninput: (e) => { v[k] = Math.max(0, parseInt(e.target.value, 10) || 0); draw(); } }))));
  function draw() {
    const ident = v.db + v.other, screened = ident - v.dup, abstracts = screened - v.title, sought = abstracts - v.abs, assessed = sought - v.notret, incl = assessed - v.ft;
    const bad = [screened, abstracts, sought, assessed, incl].some((x) => x < 0);
    const W = 640, k = [], box = (x, y, w, t, cls) => k.push(R(x, y, w, 46, t, { cls: cls || 'dg-fill1', tcls: 'dg-s' }));
    const rows = [['Identified: ' + ident, 'Duplicates removed: ' + v.dup], ['Screened (titles): ' + screened, 'Excluded: ' + v.title], ['Abstracts assessed: ' + abstracts, 'Excluded: ' + v.abs],
      ['Full texts sought: ' + sought, 'Not available: ' + v.notret], ['Full texts assessed: ' + assessed, 'Excluded: ' + v.ft]];
    rows.forEach(([a, b], i) => { const y = 8 + i * 66; box(20, y, 300, a, i ? 'dg-fill1' : 'dg-fill2'); box(380, y, 240, b, 'dg-fill3'); k.push(L([[320, y + 23], [380, y + 23]], { end: 'arrow', cls: 'dg-thin' })); k.push(L([[170, y + 46], [170, y + 66]], { end: 'arrow', cls: 'dg-thin' })); });
    box(20, 8 + 5 * 66, 300, 'Included in the review: ' + incl, 'dg-fill2');
    clear(fig_).append(D.svg(W, 8 + 6 * 66, 'PRISMA flow diagram', k));
    msg.innerHTML = bad ? '<b class="bad">The numbers do not add up: an exclusion is larger than what is left.</b>' : `Report these numbers in your methodology; <b>${incl}</b> papers enter the review.`;
  }
  draw();
  root.append(demoBox('PRISMA flow counter', 'Enter the counts from your search log. The flow diagram updates; every number must follow from the one above it.', form, msg, fig_));
};

DEMOS['venue-check'] = (root) => {
  const items = [['Indexed in Scopus, Web of Science or DBLP', 2], ['Published by a known society or publisher (ACM, IEEE, Springer, Elsevier, ACL…)', 1], ['Has a CORE rank or an SJR quartile', 2],
    ['Editors and reviewers are real, verifiable researchers', 1], ['Review takes weeks to months, with real reviewer comments', 1],
    ['Promises acceptance in days or “guaranteed publication”', -3], ['Asks for fees before review, or hides the fees', -2], ['Sent you an unsolicited flattering email', -2],
    ['Extremely broad scope (“science, engineering and management”)', -1], ['Shows an impact factor from an unknown “index”', -2]];
  const state = items.map(() => false), out = outBox(), list = h('div');
  items.forEach(([t], i) => list.append(h('label', { class: 'chkline' }, h('input', { type: 'checkbox', onchange: (e) => { state[i] = e.target.checked; paint(); } }), ' ' + t)));
  function paint() {
    const s = items.reduce((a, [, w], i) => a + (state[i] ? w : 0), 0), neg = items.some(([, w], i) => w < 0 && state[i]);
    out.innerHTML = `Score <b>${s}</b> · ` + (neg && s < 3 ? '<b class="bad">Likely predatory — do not submit; cite only with great care.</b>' : s >= 5 ? '<b class="good">Looks trustworthy.</b> Still check the rank fits your goal.' : s >= 2 ? 'Some good signs; check further and ask your supervisor.' : 'Not enough evidence yet — check the indexes and rankings.');
  }
  paint();
  root.append(demoBox('Is this venue trustworthy?', 'Tick every statement that is true for the journal or conference you are considering.', list, out));
};

/* ---------- chapter 5 ---------- */
DEMOS['lit-matrix'] = (root) => {
  const KEY = 'th-litmatrix', cols = ['Paper (author, year)', 'Problem', 'Data', 'Method', 'Metric and result', 'Limitations', 'Relevance to my RQ'];
  const sample = [['Rahman 2019', 'Bangla sentiment', 'product reviews, 8k', 'TF-IDF + SVM', 'accuracy 78%', 'formal text only', 'baseline'],
    ['Islam 2021', 'Bangla sentiment', 'product reviews, 12k', 'BiLSTM', 'accuracy 82%', 'no code-mixed text', 'baseline'], ['Das 2023', 'Bangla sentiment', 'news comments, 20k', 'BanglaBERT', 'macro-F1 0.81', 'partly code-mixed; one domain', 'closest work']];
  let rows;
  try { rows = JSON.parse(lsGet(KEY) || 'null'); } catch (e) { rows = null; }
  if (!Array.isArray(rows) || !rows.length) rows = sample.map((r) => r.slice());
  const wrap = h('div'), note = h('p', { class: 'small muted' });
  const save = () => { note.textContent = lsSet(KEY, JSON.stringify(rows)) ? 'Saved in this browser.' : 'Could not save (private window?). Export to keep your work.'; };
  function draw() {
    clear(wrap);
    wrap.append(h('div', { class: 'scrollx' }, h('table', { class: 'doc edit litm' }, h('thead', null, h('tr', null, cols.map((c) => h('th', null, c)), h('th'))),
      h('tbody', null, rows.map((r, i) => h('tr', null, cols.map((_, j) => h('td', null, h('textarea', { rows: 2, 'aria-label': cols[j], oninput: (e) => { r[j] = e.target.value; save(); } }, r[j] || ''))),
        h('td', null, h('button', { type: 'button', class: 'btn sm', 'aria-label': 'Remove row', onclick: () => { rows.splice(i, 1); save(); draw(); } }, '✕'))))))));
  }
  const csv = () => [cols, ...rows].map((r) => r.map((c) => '"' + String(c || '').replace(/"/g, '""') + '"').join(',')).join('\n');
  const dl = h('a', { class: 'btn sm', download: 'literature-matrix.csv', href: '#', onclick: (e) => { e.currentTarget.href = URL.createObjectURL(new Blob([csv()], { type: 'text/csv' })); } }, 'Export CSV');
  draw(); save();
  root.append(demoBox('Your literature matrix', 'One row per paper, the same columns for all. Your rows are saved in this browser; export to CSV to use them in a spreadsheet or your thesis.',
    h('div', { class: 'row tight' }, h('button', { type: 'button', class: 'btn sm', onclick: () => { rows.push(cols.map(() => '')); save(); draw(); } }, '+ Add paper'), dl,
      h('button', { type: 'button', class: 'btn sm', onclick: () => { rows = sample.map((r) => r.slice()); save(); draw(); } }, 'Load example'),
      h('button', { type: 'button', class: 'btn sm', onclick: () => { if (confirm('Clear all rows?')) { rows = [cols.map(() => '')]; save(); draw(); } } }, 'Clear')), wrap, note));
};

/* ---------- chapter 6 ---------- */
DEMOS['synth-game'] = (root) => scoreGame(root, 'Sort the sentences', 'Synthesis groups and compares papers and leads somewhere; summary describes one paper at a time.', [
  { t: 'Rahman et al. [3] used an SVM and achieved 78% accuracy.', a: 'S', w: 'One paper, described on its own.' },
  { t: 'Feature-based models [3, 4] reach below 80%, while transformer models [5, 6] reach 85–88% on the same benchmark.', a: 'Y', w: 'Groups and compares across papers.' },
  { t: 'All three studies use product reviews; none evaluates informal social-media text.', a: 'Y', w: 'Identifies a pattern — and a gap.' },
  { t: 'Das et al. [5] proposed a BanglaBERT model. They trained it for 4 epochs.', a: 'S', w: 'Details of one paper.' },
  { t: 'While [7] reports that augmentation helps small datasets, [8] finds no effect, possibly because [8] used much larger data.', a: 'Y', w: 'Contrasts findings and explains the difference.' },
  { t: 'Islam [4] is a paper about LSTM.', a: 'S', w: 'A description without comparison.' },
  { t: 'Most work evaluates accuracy only; robustness to spelling variation, common in Banglish, remains untested.', a: 'Y', w: 'A gap drawn from many papers.' }],
  [{ v: 'S', l: 'Summary' }, { v: 'Y', l: 'Synthesis' }]);

/* ---------- chapter 7 ---------- */
DEMOS['design-game'] = (root) => scoreGame(root, 'Match the question to a design', 'Pick the design that best answers each question.', [
  { t: 'Does model A classify skin lesions more accurately than model B on the same dataset?', a: 'E', w: 'Controlled comparison of methods: an experiment.' },
  { t: 'Can we build a browser extension that warns users about phishing pages, and does it work?', a: 'D', w: 'Build an artefact, then evaluate it.' },
  { t: 'What do 300 students think about online exams?', a: 'S', w: 'Opinions of many people: a survey.' },
  { t: 'How often do Android apps on GitHub include hard-coded API keys?', a: 'M', w: 'Measure what happens in existing data: mining.' },
  { t: 'How would a routing protocol perform in a 2,000-node network?', a: 'X', w: 'Too big to test live: simulation.' },
  { t: 'How did one hospital adopt an electronic queue system, and what problems arose?', a: 'C', w: 'One real setting in depth: case study.' },
  { t: 'Does a visual tool help students learn recursion faster than slides alone?', a: 'E', w: 'An experiment with two groups of students.' }],
  [{ v: 'E', l: 'Experiment' }, { v: 'D', l: 'Design science' }, { v: 'S', l: 'Survey' }, { v: 'M', l: 'Data mining' }, { v: 'X', l: 'Simulation' }, { v: 'C', l: 'Case study' }]);

DEMOS['metric-game'] = (root) => scoreGame(root, 'Metric match', 'Which metric best matches each situation?', [
  { t: 'Detecting a rare disease (2% positive) where missing a patient is dangerous.', a: 'R', w: 'Recall (sensitivity) of the positive class, with precision reported too.' },
  { t: 'Predicting house prices in taka.', a: 'M', w: 'MAE is in taka and easy to explain.' },
  { t: 'Finding cars and rickshaws in traffic images with bounding boxes.', a: 'P', w: 'Mean average precision (mAP) for detection.' },
  { t: 'Ranking search results for a query.', a: 'N', w: 'nDCG rewards relevant results near the top.' },
  { t: 'Balanced classification of three sentiment classes with similar sizes.', a: 'A', w: 'Accuracy is fine when classes are balanced (macro-F1 also works).' },
  { t: 'Five-class topic classification where one class is 70% of the data.', a: 'F', w: 'Macro-F1 gives each class equal weight.' },
  { t: 'How easy users find a new app.', a: 'S', w: 'System Usability Scale (with task success and time).' }],
  [{ v: 'A', l: 'Accuracy' }, { v: 'F', l: 'Macro-F1' }, { v: 'R', l: 'Recall' }, { v: 'M', l: 'MAE' }, { v: 'P', l: 'mAP' }, { v: 'N', l: 'nDCG' }, { v: 'S', l: 'SUS' }]);

/* ---------- chapter 8 ---------- */
DEMOS['leak-game'] = (root) => scoreGame(root, 'Spot the leak', 'Decide whether each setup leaks information from the test set into training.', [
  { t: 'Images are split randomly, but each patient has 5 images.', a: 'L', w: 'The same patient appears in train and test: split by patient.' },
  { t: 'Stock prices from 2015–2022 are shuffled and split randomly.', a: 'L', w: 'Future data helps predict the past: split by time.' },
  { t: 'The scaler is fitted on the training set only, then applied to the test set.', a: 'N', w: 'Correct practice.' },
  { t: 'The best epoch is chosen by looking at test accuracy.', a: 'L', w: 'Tuning on the test set: use validation data.' },
  { t: 'Duplicate tweets were removed before splitting into train and test.', a: 'N', w: 'Removing duplicates first prevents leakage.' },
  { t: 'Feature selection is done on the whole dataset before cross-validation.', a: 'L', w: 'Selection saw the test folds: do it inside each fold.' },
  { t: 'Frames from 30 videos are split so that each video is entirely in one split.', a: 'N', w: 'Grouping by video prevents near-duplicate leakage.' }],
  [{ v: 'L', l: 'Leak' }, { v: 'N', l: 'No leak' }]);

DEMOS['confusion'] = (root) => {
  const v = { TP: 90, FN: 10, FP: 30, TN: 870 };
  const grid = h('div', { class: 'cm' }), out = outBox();
  const inp = (k) => numInput(v[k], { min: 0, 'aria-label': k, style: { width: '90px' }, oninput: (e) => { v[k] = Math.max(0, parseInt(e.target.value, 10) || 0); paint(); } });
  grid.append(h('div'), h('div', { class: 'cm-h' }, 'Predicted positive'), h('div', { class: 'cm-h' }, 'Predicted negative'),
    h('div', { class: 'cm-h' }, 'Actually positive'), h('div', { class: 'cm-c tp' }, 'TP ', inp('TP')), h('div', { class: 'cm-c fn' }, 'FN ', inp('FN')),
    h('div', { class: 'cm-h' }, 'Actually negative'), h('div', { class: 'cm-c fp' }, 'FP ', inp('FP')), h('div', { class: 'cm-c tn' }, 'TN ', inp('TN')));
  function paint() {
    const { TP, FN, FP, TN } = v, n = TP + FN + FP + TN, d = (a, b) => (b ? a / b : NaN);
    const P = d(TP, TP + FP), Rc = d(TP, TP + FN), Sp = d(TN, TN + FP), Acc = d(TP + TN, n), F1 = d(2 * P * Rc, P + Rc), Bal = (Rc + Sp) / 2;
    const mcc = d(TP * TN - FP * FN, Math.sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN)));
    out.innerHTML = '<div class="scrollx"><table class="doc"><tbody>' + [['Accuracy', Acc, '(TP+TN) ÷ all'], ['Precision', P, 'TP ÷ (TP+FP)'], ['Recall / sensitivity', Rc, 'TP ÷ (TP+FN)'], ['Specificity', Sp, 'TN ÷ (TN+FP)'],
      ['F1', F1, '2PR ÷ (P+R)'], ['Balanced accuracy', Bal, '(recall + specificity) ÷ 2'], ['MCC', mcc, 'correlation of prediction and truth']].map(([a, b, c]) => `<tr><td>${a}</td><td><b>${fmt(b)}</b></td><td class="small muted">${c}</td></tr>`).join('') + '</tbody></table></div>' +
      `<p class="small">${n} items, ${((TP + FN) / n * 100 || 0).toFixed(1)}% positive. ` + (Acc - F1 > 0.15 ? '<b>Accuracy is much higher than F1: the classes are imbalanced — report F1, recall and precision.</b>' : '') + '</p>';
  }
  paint();
  root.append(demoBox('Confusion-matrix calculator', 'Type the four counts from your test set. All common metrics are computed at once — note how accuracy can look excellent while precision or recall is poor.',
    h('div', { class: 'row tight' }, [['Phishing detector', [90, 10, 30, 870]], ['Balanced', [450, 50, 60, 440]], ['Predicts all negative', [0, 20, 0, 980]]].map(([n, a]) =>
      h('button', { type: 'button', class: 'btn sm', onclick: () => { [v.TP, v.FN, v.FP, v.TN] = a; grid.querySelectorAll('input').forEach((x, i) => { x.value = [a[0], a[1], a[2], a[3]][i]; }); paint(); } }, n))), grid, out));
};

/* Student t distribution: two-sided p-value via the regularised incomplete beta function */
function betacf(a, b, x) {
  let qab = a + b, qap = a + 1, qam = a - 1, c = 1, d = 1 - qab * x / qap;
  if (Math.abs(d) < 1e-30) d = 1e-30;
  d = 1 / d; let hh = d;
  for (let m = 1; m <= 200; m++) {
    const m2 = 2 * m; let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1 + aa * d; if (Math.abs(d) < 1e-30) d = 1e-30; c = 1 + aa / c; if (Math.abs(c) < 1e-30) c = 1e-30; d = 1 / d; hh *= d * c;
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1 + aa * d; if (Math.abs(d) < 1e-30) d = 1e-30; c = 1 + aa / c; if (Math.abs(c) < 1e-30) c = 1e-30; d = 1 / d;
    const del = d * c; hh *= del; if (Math.abs(del - 1) < 3e-12) break;
  }
  return hh;
}
function lgamma(z) { const g = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5]; let x = z, y = z, t = x + 5.5; t -= (x + 0.5) * Math.log(t); let s = 1.000000000190015; for (let j = 0; j < 6; j++) s += g[j] / ++y; return -t + Math.log(2.5066282746310005 * s / x); }
function ibeta(x, a, b) { if (x <= 0) return 0; if (x >= 1) return 1; const bt = Math.exp(lgamma(a + b) - lgamma(a) - lgamma(b) + a * Math.log(x) + b * Math.log(1 - x)); return x < (a + 1) / (a + b + 2) ? bt * betacf(a, b, x) / a : 1 - bt * betacf(b, a, 1 - x) / b; }
const tPvalue = (t, df) => ibeta(df / (df + t * t), df / 2, 0.5);

DEMOS['ttest'] = (root) => {
  const a = h('textarea', { rows: 2, class: 'wide', 'aria-label': 'Method A results' }), b = h('textarea', { rows: 2, class: 'wide', 'aria-label': 'Method B results' }), out = outBox();
  a.value = '0.80, 0.82, 0.81, 0.79, 0.83'; b.value = '0.78, 0.80, 0.80, 0.77, 0.80';
  const nums = (s) => s.split(/[\s,;]+/).map(Number).filter((x) => Number.isFinite(x));
  const mean = (x) => x.reduce((p, q) => p + q, 0) / x.length, sd = (x) => { const m = mean(x); return Math.sqrt(x.reduce((p, q) => p + (q - m) ** 2, 0) / (x.length - 1)); };
  function paint() {
    const A = nums(a.value), B = nums(b.value);
    if (A.length !== B.length || A.length < 2) { out.innerHTML = '<b class="bad">Give the same number (at least 2) of paired results for A and B — one per seed or fold, in the same order.</b>'; return; }
    const d = A.map((x, i) => x - B[i]), n = d.length, md = mean(d), s = sd(d), t = md / (s / Math.sqrt(n)), df = n - 1, p = s > 0 ? tPvalue(t, df) : (md === 0 ? 1 : 0);
    out.innerHTML = `<p>A: <b>${fmt(mean(A))} ± ${fmt(sd(A))}</b> · B: <b>${fmt(mean(B))} ± ${fmt(sd(B))}</b> (mean ± sd, n = ${n})</p>` +
      `<p>Mean difference A − B = <b>${fmt(md, 4)}</b>, sd of differences = ${fmt(s, 4)}, t = <b>${fmt(t, 2)}</b>, df = ${df}, two-sided p = <b>${p < 0.0001 ? '&lt; 0.0001' : fmt(p, 4)}</b>.</p>` +
      `<p>${p < 0.05 ? `<b class="good">The difference is statistically significant at the 5% level.</b>` : '<b>Not significant at the 5% level</b> — you cannot claim one method is better.'} Effect size (Cohen’s d for paired data) = ${fmt(md / s, 2)}.</p>` +
      `<p class="small muted">${n < 6 ? 'With few runs the test has little power; consider more seeds or folds, or the Wilcoxon signed-rank test if the differences are far from normal.' : 'Check that the differences are roughly normal; otherwise use the Wilcoxon signed-rank test.'}</p>`;
  }
  a.addEventListener('input', paint); b.addEventListener('input', paint); paint();
  root.append(demoBox('Paired t-test', 'Paste the results of two methods on the same seeds or folds (same order). The tool reports means, the paired t-test and the effect size.',
    field('Method A', a), field('Method B', b), out));
};

/* ---------- chapter 9 ---------- */
DEMOS['ethics-game'] = (root) => scoreGame(root, 'Judge the practice', 'Judge each research practice.', [
  { t: 'Reporting the mean and standard deviation of all five runs.', a: 'Y', w: 'Honest reporting of all runs.' },
  { t: 'Dropping two runs that did not support the hypothesis, without saying so.', a: 'N', w: 'Falsification by selection.' },
  { t: 'Paraphrasing a paper’s idea in your own words and citing it.', a: 'Y', w: 'Correct use of sources.' },
  { t: 'Using an AI tool to write the literature review and submitting it as your own.', a: 'N', w: 'Misrepresents authorship; usually prohibited.' },
  { t: 'Using an AI tool to suggest search keywords, then checking the papers yourself.', a: 'Y', w: 'Usually acceptable if allowed — and declared.' },
  { t: 'Copying a figure from a paper into your thesis without a citation.', a: 'N', w: 'Plagiarism; redraw and cite, or get permission.' },
  { t: 'Surveying students anonymously after explaining the purpose and that they may stop at any time.', a: 'Y', w: 'Informed, voluntary, anonymous.' },
  { t: 'Uploading identifiable patient records to a public chatbot to summarise them.', a: 'N', w: 'A privacy breach.' }],
  [{ v: 'Y', l: 'Acceptable' }, { v: 'N', l: 'Not acceptable' }]);

/* ---------- chapter 10 ---------- */
DEMOS['abstract-build'] = (root) => {
  const parts = [['Context', 'the field and why it matters', 'Social-media comments in Bangladesh often mix Bangla and English written in Latin script (Banglish).'],
    ['Problem', 'the gap or difficulty', 'Sentiment models trained on formal Bangla perform poorly on such code-mixed text, and no labelled Banglish dataset exists.'],
    ['Approach', 'what you did', 'We collected and labelled 5,000 Facebook comments and compared six models, including BanglaBERT with continued pre-training on one million unlabelled code-mixed comments.'],
    ['Results', 'the main numbers', 'Continued pre-training raised macro-F1 from 0.78 to 0.81 (p = 0.004, five seeds); sarcasm caused 31% of the remaining errors.'],
    ['Conclusion', 'what it means', 'Domain-adaptive pre-training is a cheap and effective step for code-mixed Bangla; we release the dataset and code.']];
  const tas = parts.map(([n, hint, ex]) => { const t = h('textarea', { rows: 2, class: 'wide', 'aria-label': n, placeholder: hint }); t.value = ex; return t; });
  const out = h('div', { class: 'abs-out' }), info = h('p', { class: 'small' });
  function paint() {
    const txt = tas.map((t) => t.value.trim()).filter(Boolean).join(' ');
    out.textContent = txt;
    const wc = txt.split(/\s+/).filter(Boolean).length, num = /\d/.test(tas[3].value);
    info.innerHTML = `<b>${wc} words</b> ` + (wc < 150 ? '(short — most theses ask for 150–300)' : wc > 300 ? '(long — trim to 300)' : '(within 150–300)') +
      ' · ' + (num ? 'results contain numbers ✓' : '<b class="bad">add numbers to the results sentence</b>');
  }
  tas.forEach((t) => t.addEventListener('input', paint)); paint();
  root.append(demoBox('Abstract builder', 'Write one or two sentences for each move. The abstract is assembled below with a word count. Write it last, after the results.',
    ...parts.map(([n], i) => field(n, tas[i])), h('div', { class: 'row tight' }, copyBtn(() => out.textContent, 'Copy abstract'), h('button', { type: 'button', class: 'btn sm', onclick: () => { tas.forEach((t) => { t.value = ''; }); paint(); } }, 'Clear')), out, info));
};

/* ---------- chapter 11 ---------- */
DEMOS['viva-cards'] = (root) => {
  const Q = [
    ['Big picture', 'Summarise your thesis in two minutes.', 'Problem → gap → question → method → main result → meaning.'], ['Big picture', 'What is your main contribution?', 'Name it concretely, with a number if you can.'],
    ['Big picture', 'Why does this problem matter?', 'Who benefits, and what changes if it is solved?'], ['Literature', 'What is the closest work to yours, and how do you differ?', 'Name the paper and the exact difference.'],
    ['Literature', 'Why did you not compare with method X?', 'Give the reason (scope, resources, relevance) honestly; say what you expect.'], ['Method', 'Why did you choose this dataset?', 'Relevance, availability, size, labels — and its limits.'],
    ['Method', 'How did you split the data, and how did you prevent leakage?', 'Describe the split unit (patient, video, time).'], ['Method', 'How did you choose the hyperparameters?', 'On validation data, with the same budget for baselines.'],
    ['Method', 'Why this metric?', 'Link it to the question and the class balance.'], ['Results', 'Is the improvement significant?', 'Mean ± sd over runs and the test you used.'],
    ['Results', 'Which part of your method helps most?', 'Point to the ablation study.'], ['Results', 'Where does your method fail?', 'Error analysis with examples.'],
    ['Results', 'Would the results hold on other data?', 'External validity: what you tested and what you did not.'], ['Ethics', 'How did you handle consent and privacy?', 'Approval, anonymisation, storage.'],
    ['Ethics', 'Did you use AI tools? How?', 'Describe and justify; it is declared in the thesis.'], ['Future', 'If you had six more months, what would you do?', 'The most valuable next step, not a wish list.'],
    ['Future', 'How could this be used in practice?', 'Deployment, users, risks.'], ['Big picture', 'What did you learn about doing research?', 'One honest reflection.']];
  const cats = ['All', ...new Set(Q.map((q) => q[0]))];
  let cat = 'All', cur = 0, order = shuffle(range(Q.length));
  const card = h('div', { class: 'vcard' }), hint = h('p', { class: 'small muted' });
  const pool = () => order.filter((i) => cat === 'All' || Q[i][0] === cat);
  function show() {
    const p = pool(), q = Q[p[cur % p.length]];
    card.innerHTML = `<span class="small">${esc(q[0])} · ${(cur % p.length) + 1} of ${p.length}</span><p class="vq">${esc(q[1])}</p>`; hint.textContent = '';
    hint.dataset.tip = q[2];
  }
  const s = seg(cats.map((c) => ({ v: c, l: c })), 'All', (v) => { cat = v; cur = 0; show(); });
  show();
  root.append(demoBox('Viva practice cards', 'Answer each question aloud in under a minute, then reveal a tip on what a good answer contains.', s.el, card,
    h('div', { class: 'row tight' }, h('button', { type: 'button', class: 'btn sm', onclick: () => { hint.textContent = '💡 ' + hint.dataset.tip; } }, 'Show tip'),
      h('button', { type: 'button', class: 'btn pri sm', onclick: () => { cur++; show(); } }, 'Next question'), h('button', { type: 'button', class: 'btn sm', onclick: () => { order = shuffle(range(Q.length)); cur = 0; show(); } }, 'Shuffle')), hint));
};

/* ===================================================================================== */
/* ===============================  Part B: research fields  ============================ */
/* ===================================================================================== */
function seeded(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function gauss(r) { const u = Math.max(1e-9, r()), v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
function canvasEl(w, hh, label) { const c = h('canvas', { width: w, height: hh, class: 'dcanvas', role: 'img', 'aria-label': label }); return c; }
const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#888';

/* ---------- chapter 12: machine learning ---------- */
DEMOS['overfit'] = (root) => {
  let seed = 7, deg = 3, train = [], test = [];
  const cv = canvasEl(520, 300, 'Polynomial fit to noisy data'), curve = canvasEl(520, 300, 'Training and test error against polynomial degree'), out = outBox();
  const slider = h('input', { type: 'range', min: 0, max: 12, value: deg, 'aria-label': 'Polynomial degree', oninput: (e) => { deg = +e.target.value; draw(); } });
  const f = (x) => Math.sin(2.6 * x) * 0.8;
  function gen() { const r = seeded(seed); const mk = (n) => range(n).map(() => { const x = r() * 2 - 1; return [x, f(x) + gauss(r) * 0.22]; }); train = mk(14); test = mk(40); }
  function fit(d) {
    const n = d + 1, A = range(n).map(() => new Array(n + 1).fill(0));
    train.forEach(([x, y]) => { const p = range(n).map((k) => x ** k); for (let i = 0; i < n; i++) { for (let j = 0; j < n; j++) A[i][j] += p[i] * p[j]; A[i][n] += p[i] * y; } });
    for (let i = 0; i < n; i++) A[i][i] += 1e-9;
    for (let i = 0; i < n; i++) { let m = i; for (let r = i + 1; r < n; r++) if (Math.abs(A[r][i]) > Math.abs(A[m][i])) m = r; [A[i], A[m]] = [A[m], A[i]];
      for (let r = 0; r < n; r++) if (r !== i) { const k = A[r][i] / A[i][i]; for (let c = i; c <= n; c++) A[r][c] -= k * A[i][c]; } }
    const w = range(n).map((i) => A[i][n] / A[i][i]);
    return (x) => w.reduce((s, wk, k) => s + wk * x ** k, 0);
  }
  const rmse = (g, pts) => Math.sqrt(pts.reduce((s, [x, y]) => s + (g(x) - y) ** 2, 0) / pts.length);
  function draw() {
    const g = fit(deg), c = cv.getContext('2d'), W = cv.width, H = cv.height, X = (x) => (x + 1) / 2 * (W - 40) + 20, Y = (y) => H / 2 - y * (H / 2 - 20);
    c.clearRect(0, 0, W, H); c.lineWidth = 1; c.strokeStyle = css('--line'); c.beginPath(); c.moveTo(20, H / 2); c.lineTo(W - 20, H / 2); c.stroke();
    c.strokeStyle = css('--ink-3'); c.setLineDash([4, 4]); c.beginPath(); for (let i = 0; i <= 200; i++) { const x = -1 + i / 100; i ? c.lineTo(X(x), Y(f(x))) : c.moveTo(X(x), Y(f(x))); } c.stroke(); c.setLineDash([]);
    c.strokeStyle = css('--ac'); c.lineWidth = 3; c.beginPath(); for (let i = 0; i <= 400; i++) { const x = -1 + i / 200, y = Math.max(-1.6, Math.min(1.6, g(x))); i ? c.lineTo(X(x), Y(y)) : c.moveTo(X(x), Y(y)); } c.stroke();
    test.forEach(([x, y]) => { c.strokeStyle = css('--accent'); c.lineWidth = 1.5; c.beginPath(); c.arc(X(x), Y(y), 4, 0, 7); c.stroke(); });
    train.forEach(([x, y]) => { c.fillStyle = css('--ink'); c.beginPath(); c.arc(X(x), Y(y), 5, 0, 7); c.fill(); });
    const errs = range(13).map((d) => { const gg = fit(d); return [rmse(gg, train), rmse(gg, test)]; });
    const c2 = curve.getContext('2d'), W2 = curve.width, H2 = curve.height, mx = Math.min(1.2, Math.max(...errs.flat())), XX = (d) => 30 + d / 12 * (W2 - 50), YY = (e) => H2 - 20 - Math.min(e, mx) / mx * (H2 - 34);
    c2.clearRect(0, 0, W2, H2); c2.fillStyle = css('--ink-3'); c2.font = '12px sans-serif'; c2.fillText('degree →', W2 - 70, H2 - 4); c2.fillText('error', 2, 12);
    [[0, css('--ink')], [1, css('--accent')]].forEach(([k, col]) => { c2.strokeStyle = col; c2.lineWidth = 2.5; c2.beginPath(); errs.forEach((e, d) => (d ? c2.lineTo(XX(d), YY(e[k])) : c2.moveTo(XX(d), YY(e[k])))); c2.stroke(); });
    c2.strokeStyle = css('--ac'); c2.setLineDash([3, 3]); c2.beginPath(); c2.moveTo(XX(deg), 10); c2.lineTo(XX(deg), H2 - 20); c2.stroke(); c2.setLineDash([]);
    const [tr, te] = errs[deg], best = errs.reduce((b, e, d) => (e[1] < errs[b][1] ? d : b), 0);
    out.innerHTML = `Degree <b>${deg}</b>: training RMSE <b>${fmt(tr)}</b>, test RMSE <b>${fmt(te)}</b>. ` + (deg < best - 1 ? 'Underfitting: too simple to follow the curve.' : deg > best + 2 ? '<b>Overfitting:</b> training error keeps falling, test error rises.' : 'Close to the best trade-off.') + ` Lowest test error at degree <b>${best}</b>.`;
  }
  gen(); draw();
  root.append(demoBox('Polynomial fit: training versus test error', 'Fit polynomials of growing degree to 14 noisy training points (filled) and check them on 40 new test points (hollow). The right-hand chart plots training (dark) and test (orange) error for every degree.',
    h('div', { class: 'row tight' }, h('label', { class: 'fld' }, 'Polynomial degree ', slider), h('button', { type: 'button', class: 'btn sm', onclick: () => { seed++; gen(); draw(); } }, 'New data')), out, h('div', { class: 'fitrow' }, cv, curve)));
};

/* ---------- chapter 13: AI search ---------- */
DEMOS['astar'] = (root) => {
  const Wc = 22, Hc = 13, S = [1, 6], G = [20, 6];
  let walls = new Set(), algo = 'astar';
  const key = (x, y) => x + ',' + y, grid = h('div', { class: 'agrid', style: { gridTemplateColumns: `repeat(${Wc}, 1fr)` } }), out = outBox();
  function randomWalls() { const r = seeded(Date.now() % 100000); walls = new Set(); for (let i = 0; i < 70; i++) { const x = 1 + Math.floor(r() * (Wc - 2)), y = Math.floor(r() * Hc); if (key(x, y) !== key(...S) && key(x, y) !== key(...G)) walls.add(key(x, y)); } }
  function defaultWalls() { walls = new Set(); for (let y = 1; y < 12; y++) walls.add(key(10, y)); for (let x = 5; x < 16; x++) walls.add(key(x, 2)); }
  function search(useH) {
    const hfun = ([x, y]) => (useH ? Math.abs(x - G[0]) + Math.abs(y - G[1]) : 0);
    const open = [[hfun(S), 0, S]], g = new Map([[key(...S), 0]]), prev = new Map(), closed = new Set();
    while (open.length) {
      open.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
      const [, gc, cur] = open.shift(), k = key(...cur);
      if (closed.has(k)) continue; closed.add(k);
      if (k === key(...G)) break;
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
        const nx = cur[0] + dx, ny = cur[1] + dy, nk = key(nx, ny);
        if (nx < 0 || ny < 0 || nx >= Wc || ny >= Hc || walls.has(nk) || closed.has(nk)) return;
        const ng = gc + 1;
        if (ng < (g.has(nk) ? g.get(nk) : Infinity)) { g.set(nk, ng); prev.set(nk, k); open.push([ng + hfun([nx, ny]), ng, [nx, ny]]); }
      });
    }
    const path = []; let p = key(...G); if (prev.has(p) || p === key(...S)) { while (p) { path.push(p); p = prev.get(p); } }
    return { closed, path: new Set(path), len: path.length ? path.length - 1 : null };
  }
  function draw() {
    const bfs = search(false), ast = search(true), r = algo === 'astar' ? ast : bfs;
    clear(grid);
    for (let y = 0; y < Hc; y++) for (let x = 0; x < Wc; x++) {
      const k = key(x, y), cls = k === key(...S) ? 'st' : k === key(...G) ? 'gl' : walls.has(k) ? 'wall' : r.path.has(k) ? 'path' : r.closed.has(k) ? 'seen' : '';
      grid.append(h('button', { type: 'button', class: 'acell ' + cls, 'aria-label': cls === 'st' ? 'start' : cls === 'gl' ? 'goal' : `cell ${x},${y}`, onclick: () => { if (cls === 'st' || cls === 'gl') return; walls.has(k) ? walls.delete(k) : walls.add(k); draw(); } }, cls === 'st' ? 'S' : cls === 'gl' ? 'G' : ''));
    }
    out.innerHTML = `Breadth-first search expanded <b>${bfs.closed.size}</b> cells · A* (Manhattan heuristic) expanded <b>${ast.closed.size}</b> cells · ` +
      (ast.len == null ? '<b class="bad">no path</b>' : `both found a shortest path of <b>${ast.len}</b> steps.`);
  }
  defaultWalls();
  const s = seg([{ v: 'astar', l: 'Show A*' }, { v: 'bfs', l: 'Show BFS' }], 'astar', (v) => { algo = v; draw(); });
  draw();
  root.append(demoBox('Path-finding grid', 'Find a path from S (green) to G (red). Click cells to add or remove walls. Shaded cells were expanded by the search; the heuristic lets A* expand far fewer while still finding a shortest path.',
    h('div', { class: 'row tight' }, s.el, h('button', { type: 'button', class: 'btn sm', onclick: () => { randomWalls(); draw(); } }, 'Random walls'), h('button', { type: 'button', class: 'btn sm', onclick: () => { walls = new Set(); draw(); } }, 'Clear walls'), h('button', { type: 'button', class: 'btn sm', onclick: () => { defaultWalls(); draw(); } }, 'Reset')), grid, out));
};

/* ---------- chapter 14: NLP ---------- */
DEMOS['tfidf'] = (root) => {
  const ta = h('textarea', { rows: 6, class: 'wide', 'aria-label': 'Documents, one per line' }), out = outBox();
  ta.value = ['The new phone has a great camera and a great battery.', 'The battery died after one day; terrible phone.', 'Camera quality is great but the price is high.',
    'এই ফোনের ক্যামেরা খুব ভালো, দামও কম।', 'ব্যাটারি একদিনও টেকে না, খুব খারাপ ফোন।'].join('\n');
  const STOP = new Set('the a an and or but is are was were of to in on for with this that it has have had be after one is also very'.split(' '));
  const tok = (s) => (s.toLowerCase().match(/[\p{L}\p{M}\p{N}]+/gu) || []).filter((w) => !STOP.has(w) && w.length > 1);
  function paint() {
    const docs = ta.value.split('\n').map((s) => s.trim()).filter(Boolean), toks = docs.map(tok), N = docs.length, df = new Map();
    toks.forEach((t) => new Set(t).forEach((w) => df.set(w, (df.get(w) || 0) + 1)));
    const rows = toks.map((t, i) => {
      const tf = new Map(); t.forEach((w) => tf.set(w, (tf.get(w) || 0) + 1));
      const sc = [...tf].map(([w, c]) => [w, (c / t.length) * Math.log((1 + N) / (1 + df.get(w))) + 0]).sort((a, b) => b[1] - a[1]).slice(0, 4);
      return `<tr><td>${i + 1}</td><td class="small">${esc(docs[i]).slice(0, 80)}</td><td>${sc.map(([w, s]) => `<span class="chip">${esc(w)} <small>${s.toFixed(3)}</small></span>`).join(' ')}</td></tr>`;
    });
    out.innerHTML = `<p class="small">${N} documents · vocabulary ${df.size} words. Words in every document get an IDF near zero; words frequent in one document but rare elsewhere score highest.</p>` +
      '<div class="scrollx"><table class="doc"><thead><tr><th>#</th><th>Document</th><th>Top TF-IDF terms</th></tr></thead><tbody>' + rows.join('') + '</tbody></table></div>';
  }
  ta.addEventListener('input', paint); paint();
  root.append(demoBox('TF-IDF explorer', 'One document per line, in Bangla, English or both. The tokeniser splits on letters (Unicode-aware), removes a few English stop words and ranks each document’s terms by TF-IDF.', ta, out));
};

/* ---------- chapter 15: computer vision ---------- */
DEMOS['convolve'] = (root) => {
  const K = { Identity: [0, 0, 0, 0, 1, 0, 0, 0, 0], 'Box blur': [1, 1, 1, 1, 1, 1, 1, 1, 1].map((x) => x / 9), 'Gaussian blur': [1, 2, 1, 2, 4, 2, 1, 2, 1].map((x) => x / 16),
    Sharpen: [0, -1, 0, -1, 5, -1, 0, -1, 0], 'Edges (Laplacian)': [0, 1, 0, 1, -4, 1, 0, 1, 0], 'Sobel x': [-1, 0, 1, -2, 0, 2, -1, 0, 1], 'Sobel y': [-1, -2, -1, 0, 0, 0, 1, 2, 1], Emboss: [-2, -1, 0, -1, 1, 1, 0, 1, 2] };
  const W = 200, H = 140, src = canvasEl(W, H, 'Input image'), dst = canvasEl(W, H, 'Output image');
  let kern = K['Sobel x'].slice();
  const kgrid = h('div', { class: 'kgrid' });
  const img = (() => { const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
    const gr = g.createLinearGradient(0, 0, W, 0); gr.addColorStop(0, '#222'); gr.addColorStop(1, '#ddd'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.fillStyle = '#f5f5f5'; g.fillRect(20, 20, 60, 60); g.fillStyle = '#111'; g.beginPath(); g.arc(140, 50, 30, 0, 7); g.fill();
    g.fillStyle = '#888'; g.beginPath(); g.moveTo(100, 130); g.lineTo(140, 85); g.lineTo(180, 130); g.fill(); g.fillStyle = '#000'; g.font = 'bold 22px sans-serif'; g.fillText('CS', 30, 120);
    const d = g.getImageData(0, 0, W, H).data, a = new Float32Array(W * H); for (let i = 0; i < W * H; i++) a[i] = 0.299 * d[4 * i] + 0.587 * d[4 * i + 1] + 0.114 * d[4 * i + 2]; return a; })();
  function put(cv, arr) { const g = cv.getContext('2d'), im = g.createImageData(W, H); for (let i = 0; i < W * H; i++) { const v = Math.max(0, Math.min(255, arr[i])); im.data[4 * i] = im.data[4 * i + 1] = im.data[4 * i + 2] = v; im.data[4 * i + 3] = 255; } g.putImageData(im, 0, 0); }
  function run() {
    const o = new Float32Array(W * H), edge = kern.reduce((a, b) => a + b, 0) === 0;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { let s = 0; for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) { const xx = Math.min(W - 1, Math.max(0, x + i)), yy = Math.min(H - 1, Math.max(0, y + j)); s += kern[(j + 1) * 3 + i + 1] * img[yy * W + xx]; } o[y * W + x] = edge ? 128 + s / 2 : s; }
    put(dst, o);
  }
  function grid() { clear(kgrid); kern.forEach((v, i) => kgrid.append(h('input', { type: 'number', step: '0.1', value: String(+v.toFixed(3)), 'aria-label': 'kernel ' + i, oninput: (e) => { kern[i] = parseFloat(e.target.value) || 0; run(); } }))); }
  const sel = selectEl(Object.keys(K), 'Sobel x', (v) => { kern = K[v].slice(); grid(); run(); });
  put(src, img); grid(); run();
  root.append(demoBox('Kernel playground', 'Each output pixel is the weighted sum of the 3×3 neighbourhood of the input pixel. Pick a kernel or type your own weights. Kernels summing to 0 (edges) are shown around mid-grey.',
    h('div', { class: 'row tight' }, field('Kernel', sel)), h('div', { class: 'convrow' }, h('div', null, h('div', { class: 'small' }, 'Input'), src), h('div', null, h('div', { class: 'small' }, 'Kernel'), kgrid), h('div', null, h('div', { class: 'small' }, 'Output'), dst))));
};

/* ---------- chapter 16: security ---------- */
DEMOS['avalanche'] = (root) => {
  const a = textInput('Transfer 500 taka to account 1234', { style: { width: '100%' }, 'aria-label': 'Message A' }), b = textInput('Transfer 900 taka to account 1234', { style: { width: '100%' }, 'aria-label': 'Message B' });
  const out = outBox(), bits = h('div', { class: 'bitgrid' });
  const hex = (buf) => [...new Uint8Array(buf)].map((x) => x.toString(16).padStart(2, '0')).join('');
  async function paint() {
    if (!(window.crypto && crypto.subtle)) { out.innerHTML = '<b class="bad">This browser does not offer the Web Crypto API here (it needs https or a local file).</b>'; return; }
    const enc = new TextEncoder(), [ha, hb] = await Promise.all([crypto.subtle.digest('SHA-256', enc.encode(a.value)), crypto.subtle.digest('SHA-256', enc.encode(b.value))]);
    const A = new Uint8Array(ha), B = new Uint8Array(hb); let diff = 0; clear(bits);
    for (let i = 0; i < 32; i++) for (let k = 7; k >= 0; k--) { const d = ((A[i] >> k) & 1) !== ((B[i] >> k) & 1); if (d) diff++; bits.append(h('i', { class: d ? 'd' : '' })); }
    out.innerHTML = `<p class="mono small">A: ${hex(ha)}<br>B: ${hex(hb)}</p><p><b>${diff} of 256 bits</b> differ (${(diff / 2.56).toFixed(1)}%). A good hash changes about half the bits for any small change in the input — so the hash reveals nothing about how similar the inputs are.</p>`;
  }
  a.addEventListener('input', paint); b.addEventListener('input', paint); paint();
  root.append(demoBox('SHA-256 avalanche', 'Two messages that differ by one character get completely different SHA-256 hashes. Each square below is one bit; orange bits differ.', field('Message A', a), field('Message B', b), out, bits));
};

/* ---------- chapter 17: biomedical ---------- */
DEMOS['screening'] = (root) => {
  let sens = 95, spec = 95, prev = 1;
  const out = outBox(), dots = h('div', { class: 'dotgrid' });
  const sl = (label, val, min, max, step, set) => h('label', { class: 'fld' }, label, h('input', { type: 'range', min, max, step, value: val, oninput: (e) => { set(+e.target.value); paint(); } }));
  function paint() {
    const N = 1000, sick = Math.round(N * prev / 100), tp = Math.round(sick * sens / 100), fn = sick - tp, healthy = N - sick, tn = Math.round(healthy * spec / 100), fp = healthy - tn;
    const ppv = tp / (tp + fp || 1), npv = tn / (tn + fn || 1);
    clear(dots);
    [['tp', tp], ['fn', fn], ['fp', fp], ['tn', tn]].forEach(([c, n]) => { for (let i = 0; i < n; i++) dots.append(h('i', { class: c })); });
    out.innerHTML = `Sensitivity <b>${sens}%</b> · specificity <b>${spec}%</b> · prevalence <b>${prev}%</b><br>Of 1,000 people: <span class="lg tp">■</span> ${tp} sick, detected · <span class="lg fn">■</span> ${fn} sick, missed · <span class="lg fp">■</span> ${fp} healthy, false alarm · <span class="lg tn">■</span> ${tn} healthy, cleared<br>` +
      `<b>PPV ${(ppv * 100).toFixed(1)}%</b>: a positive result is right this often. <b>NPV ${(npv * 100).toFixed(1)}%</b>: a negative result is right this often.` + (ppv < 0.5 ? ' <b class="bad">Most positives are false alarms — confirm with a second test.</b>' : '');
  }
  root.append(demoBox('Screening calculator', 'Move the sliders. Even a test with high sensitivity and specificity gives mostly false positives when the disease is rare.',
    h('div', { class: 'grid3' }, sl('Sensitivity (%)', sens, 50, 100, 1, (v) => { sens = v; }), sl('Specificity (%)', spec, 50, 100, 0.5, (v) => { spec = v; }), sl('Prevalence (%)', prev, 0.5, 50, 0.5, (v) => { prev = v; })), out, dots));
  paint();
};

/* ---------- chapter 18: data science ---------- */
DEMOS['kmeans'] = (root) => {
  const cv = canvasEl(520, 320, 'k-means clustering'), out = outBox();
  let pts = [], cents = [], assign = [], k = 3, it = 0, phase = 'assign', seed = 3;
  const COLS = ['#4338A0', '#C2410C', '#1D7A3E', '#B42318', '#0E7490', '#7C3AED'];
  function data() { const r = seeded(seed); pts = []; const n = 3 + (seed % 2); for (let c = 0; c < n; c++) { const cx = 60 + r() * 400, cy = 50 + r() * 220; for (let i = 0; i < 45; i++) pts.push([cx + gauss(r) * 28, cy + gauss(r) * 24]); } init(); }
  function init() { const r = seeded(seed * 7 + k); cents = range(k).map(() => pts[Math.floor(r() * pts.length)].slice()); assign = pts.map(() => -1); it = 0; phase = 'assign'; draw(); }
  const sse = () => pts.reduce((s, p, i) => s + (assign[i] < 0 ? 0 : (p[0] - cents[assign[i]][0]) ** 2 + (p[1] - cents[assign[i]][1]) ** 2), 0);
  function step() {
    if (phase === 'assign') { let ch = 0; pts.forEach((p, i) => { let b = 0, bd = Infinity; cents.forEach((c, j) => { const d = (p[0] - c[0]) ** 2 + (p[1] - c[1]) ** 2; if (d < bd) { bd = d; b = j; } }); if (assign[i] !== b) ch++; assign[i] = b; }); phase = 'update'; it++; draw(); return ch; }
    cents = cents.map((c, j) => { const m = pts.filter((_, i) => assign[i] === j); return m.length ? [m.reduce((s, p) => s + p[0], 0) / m.length, m.reduce((s, p) => s + p[1], 0) / m.length] : c; }); phase = 'assign'; draw(); return 1;
  }
  function run() { for (let i = 0; i < 200; i++) { if (phase === 'update') { step(); continue; } if (step() === 0) break; } }
  function draw() {
    const c = cv.getContext('2d'); c.clearRect(0, 0, cv.width, cv.height);
    pts.forEach((p, i) => { c.fillStyle = assign[i] < 0 ? css('--ink-3') : COLS[assign[i] % COLS.length]; c.globalAlpha = 0.75; c.beginPath(); c.arc(p[0], p[1], 4, 0, 7); c.fill(); });
    c.globalAlpha = 1; cents.forEach((p, j) => { c.fillStyle = COLS[j % COLS.length]; c.strokeStyle = css('--ink'); c.lineWidth = 2.5; c.beginPath(); c.rect(p[0] - 8, p[1] - 8, 16, 16); c.fill(); c.stroke(); });
    out.innerHTML = `k = <b>${k}</b> · iteration <b>${it}</b> · next step: <b>${phase === 'assign' ? 'assign each point to the nearest centroid' : 'move each centroid to the mean of its points'}</b> · within-cluster sum of squares <b>${Math.round(sse()).toLocaleString()}</b>`;
  }
  data();
  root.append(demoBox('k-means clustering', 'Points (dots) and centroids (squares). k-means alternates two steps until nothing changes: assign points to the nearest centroid, then move centroids to the mean. Try a k that does not match the real groups.',
    h('div', { class: 'row tight' }, field('k', selectEl([2, 3, 4, 5, 6], 3, (v) => { k = +v; init(); })), h('button', { type: 'button', class: 'btn pri sm', onclick: () => step() }, 'Step'),
      h('button', { type: 'button', class: 'btn sm', onclick: () => run() }, 'Run to convergence'), h('button', { type: 'button', class: 'btn sm', onclick: () => init() }, 'New start'), h('button', { type: 'button', class: 'btn sm', onclick: () => { seed++; data(); } }, 'New data')), cv, out));
};

/* ---------- chapter 19: IoT ---------- */
DEMOS['latency'] = (root) => {
  const v = { size: 1000, up: 2, rttE: 10, rttC: 80, infD: 400, infE: 60, infC: 30, req: 2000 };
  const labels = { size: 'Data per request (KB)', up: 'Uplink bandwidth (Mbps)', rttE: 'Round trip to edge (ms)', rttC: 'Round trip to cloud (ms)', infD: 'Inference on device (ms)', infE: 'Inference on edge (ms)', infC: 'Inference in cloud (ms)', req: 'Requests per day' };
  const form = h('div', { class: 'grid2' }), out = outBox(), bars_ = h('div');
  Object.keys(v).forEach((k) => form.append(field(labels[k], numInput(v[k], { min: 0, step: 'any', oninput: (e) => { v[k] = Math.max(0, parseFloat(e.target.value) || 0); paint(); } }))));
  function paint() {
    const tx = v.up > 0 ? (v.size * 8 / 1000) / v.up * 1000 : Infinity;
    const res = [['On the device', v.infD, 0], ['Edge server', tx + v.rttE + v.infE, v.size * v.req / 1e6], ['Cloud', tx + v.rttC + v.infC, v.size * v.req / 1e6]];
    const mx = Math.max(...res.map((r) => r[1]).filter(Number.isFinite)), best = res.reduce((a, b) => (b[1] < a[1] ? b : a));
    bars_.innerHTML = res.map(([n, t, gb]) => `<div class="barrow"><span class="bl">${n}</span><span class="bb"><i style="width:${(100 * t / mx).toFixed(0)}%"></i></span><b>${Number.isFinite(t) ? Math.round(t).toLocaleString() + ' ms' : '∞'}</b> <span class="small muted">${gb ? gb.toFixed(1) + ' GB uploaded / day' : 'no upload'}</span></div>`).join('');
    out.innerHTML = `Uploading ${v.size} KB at ${v.up} Mbps takes <b>${Math.round(tx).toLocaleString()} ms</b>. Fastest: <b>${best[0]}</b>. Change the uplink or data size: the best place to compute moves.`;
  }
  paint();
  root.append(demoBox('Latency calculator', 'Latency = transfer time + network round trip + inference time. Compare running a model on the device, on a nearby edge server or in the cloud.', form, bars_, out));
};

/* ---------- chapter 20: software engineering ---------- */
DEMOS['se-game'] = (root) => scoreGame(root, 'Match the question to a method', 'Pick the most suitable method for each question.', [
  { t: 'How often do popular Python projects on GitHub contain known vulnerable dependencies?', a: 'M', w: 'Measure across many real projects: repository mining.' },
  { t: 'Does a new code-review checklist help students find more bugs than no checklist?', a: 'E', w: 'Two groups, one treatment: a controlled experiment.' },
  { t: 'Can our new test generator find more bugs than EvoSuite on Defects4J?', a: 'T', w: 'A new tool evaluated on a benchmark.' },
  { t: 'Why do developers in local start-ups skip unit testing?', a: 'S', w: 'Reasons and opinions: interviews or a survey.' },
  { t: 'How did one company migrate from a monolith to microservices, and what went wrong?', a: 'C', w: 'One setting in depth: case study.' },
  { t: 'Is there a relationship between code smells and later bug-fix commits?', a: 'M', w: 'Correlate metrics from version histories.' },
  { t: 'Does pair programming reduce errors in a lab assignment?', a: 'E', w: 'Compare conditions with randomised groups.' }],
  [{ v: 'E', l: 'Experiment' }, { v: 'M', l: 'Repository mining' }, { v: 'T', l: 'Tool + benchmark' }, { v: 'S', l: 'Survey / interviews' }, { v: 'C', l: 'Case study' }]);

/* ---------- chapter 21: HCI ---------- */
DEMOS['sus'] = (root) => {
  const Q = ['I think that I would like to use this system frequently.', 'I found the system unnecessarily complex.', 'I thought the system was easy to use.',
    'I think that I would need the support of a technical person to be able to use this system.', 'I found the various functions in this system were well integrated.', 'I thought there was too much inconsistency in this system.',
    'I would imagine that most people would learn to use this system very quickly.', 'I found the system very cumbersome to use.', 'I felt very confident using the system.', 'I needed to learn a lot of things before I could get going with this system.'];
  const ans = [4, 2, 4, 2, 4, 2, 4, 2, 4, 2], scores = [];
  const list = h('div', { class: 'suslist' }), out = outBox(), avg = h('p', { class: 'small' });
  Q.forEach((q, i) => list.append(h('div', { class: 'susq' }, h('span', null, `${i + 1}. ${q}`), seg([1, 2, 3, 4, 5].map((x) => ({ v: x, l: String(x) })), ans[i], (v) => { ans[i] = v; paint(); }).el)));
  const score = () => 2.5 * ans.reduce((s, a, i) => s + (i % 2 === 0 ? a - 1 : 5 - a), 0);
  const word = (s) => (s >= 80.3 ? 'excellent (top 10%)' : s >= 68 ? 'good — above average' : s >= 51 ? 'below average' : 'poor — serious usability problems');
  function paint() { const s = score(); out.innerHTML = `SUS score <b>${s.toFixed(1)}</b> / 100 — <b>${word(s)}</b>. The average across many studies is about 68.`; }
  paint();
  root.append(demoBox('SUS questionnaire', 'Answer each statement from 1 (strongly disagree) to 5 (strongly agree). Odd items count positively, even items negatively; the sum is scaled to 0–100.', list, out,
    h('div', { class: 'row tight' }, h('button', { type: 'button', class: 'btn sm', onclick: () => { scores.push(score()); const m = scores.reduce((a, b) => a + b, 0) / scores.length; avg.innerHTML = `${scores.length} participant${scores.length > 1 ? 's' : ''} recorded · mean SUS <b>${m.toFixed(1)}</b> (${word(m)})`; } }, 'Add as a participant')), avg));
};
