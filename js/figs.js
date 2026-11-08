/* ===================== figs.js : diagrams for the Thesis guide (mounted by page.js on figure[data-fig]) =====================
   Every shape comes from diagram.js; D.tip(shape, text) adds the hover text shown after 1.5 s. */
const FIGS = {};
const L = D.line, R = D.rect, C = D.circle, TX = D.T;
const tipR = (x, y, w, h, label, tip, o) => D.tip(R(x, y, w, h, label, o), tip);

/* a tree: root on top, groups below, each group's items stacked under it */
function treeMap(root, rootTip, groups, label) {
  const colW = 158, gap = 16, n = groups.length, W = n * colW + (n - 1) * gap + 24;
  const k = [], ln = (pts) => k.push(L(pts, { cls: 'dg-thin' }));
  const cx = W / 2, mids = groups.map((_, i) => 12 + i * (colW + gap) + colW / 2);
  k.push(tipR(cx - 110, 8, 220, 46, root, rootTip, { cls: 'dg-fill2', tcls: 'dg-t2' }));
  ln([[cx, 54], [cx, 70]]); ln([[mids[0], 84], [mids[0], 70], [mids[n - 1], 70], [mids[n - 1], 84]]);
  let maxY = 0;
  groups.forEach(([g, gTip, items], i) => {
    const gx = 12 + i * (colW + gap);
    if (i > 0 && i < n - 1) ln([[mids[i], 70], [mids[i], 84]]);
    k.push(tipR(gx, 84, colW, 46, g, gTip, { cls: 'dg-fill1', tcls: 'dg-t2' }));
    const sx = gx + 12, ys = [];
    items.forEach(([t, tp], j) => {
      const y = 144 + j * 40;
      k.push(tipR(gx + 26, y, colW - 26, 32, t, tp, { cls: 'dg-fill3', tcls: 'dg-s' }));
      ys.push(y + 16); maxY = Math.max(maxY, y + 32);
    });
    if (ys.length) { ln([[sx, 130], [sx, ys[ys.length - 1]]]); ys.forEach((y) => ln([[sx, y], [gx + 26, y]])); }
  });
  return D.svg(W, maxY + 14, label, k, { scale: 1.1 });
}

/* stacked bars that narrow (a funnel) or narrow then widen (an hourglass) */
function bars(rows, W, label) {
  const k = [], h = 40, gap = 10;
  rows.forEach(([t, tip, w, cls], i) => {
    const y = 8 + i * (h + gap);
    k.push(tipR((W - w) / 2, y, w, h, t, tip, { cls: cls || 'dg-fill1', tcls: 'dg-t2', rx: 8 }));
    if (i) k.push(L([[W / 2, y - gap], [W / 2, y]], { end: 'arrow', cls: 'dg-thin' }));
  });
  return D.svg(W, 8 + rows.length * (h + gap), label, k);
}

/* ================= Part A ================= */
FIGS['research-cycle'] = () => {
  const steps = [['Question', 'Decide exactly what you want to find out (chapter 2).'], ['Literature', 'Find out what is already known and where the gap is (chapters 3–6).'],
    ['Method', 'Plan how you will answer: data, method, baselines, metrics (chapter 7).'], ['Experiment', 'Collect the evidence carefully and reproducibly (chapter 8).'],
    ['Analysis', 'Decide what the evidence shows and how sure you are: statistics, ablation, errors.'], ['Writing', 'Explain it so others can check and build on it (chapters 10–11). New questions start the next loop.']];
  const cx = 300, cy = 196, rx = 220, ry = 150, k = [], pts = [];
  steps.forEach(([t, tip], i) => {
    const a = -Math.PI / 2 + i * 2 * Math.PI / steps.length, x = cx + rx * Math.cos(a), y = cy + ry * Math.sin(a);
    pts.push([x, y]);
    k.push(tipR(x - 64, y - 22, 128, 44, t, tip, { cls: i % 2 ? 'dg-fill3' : 'dg-fill1', tcls: 'dg-t2', rx: 22 }));
  });
  pts.forEach((p, i) => {
    const q = pts[(i + 1) % pts.length], dx = q[0] - p[0], dy = q[1] - p[1], len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
    const off = Math.abs(ux) > 0.6 ? 70 : 30, off2 = Math.abs(ux) > 0.6 ? 70 : 30;
    k.push(L([[p[0] + ux * off, p[1] + uy * off], [q[0] - ux * off2, q[1] - uy * off2]], { end: 'arrow', cls: 'dg-thin' }));
  });
  k.push(TX(cx, cy - 8, 'The research', 'dg-t2'), TX(cx, cy + 12, 'cycle', 'dg-t2'));
  return D.svg(600, 392, 'The research cycle: question, literature, method, experiment, analysis, writing', k);
};

FIGS['topic-funnel'] = () => bars([
  ['Area', 'A broad field: e.g. natural language processing.', 520], ['Topic', 'A subject inside it: sentiment analysis of Bangla text.', 460],
  ['Problem', 'What is difficult or missing: models fail on code-mixed social-media comments.', 400], ['Research question', 'What exactly you will find out, with data, method, comparison and outcome.', 340],
  ['Hypothesis', 'A testable prediction (optional for exploratory or design studies).', 280, 'dg-fill3'], ['Objectives', 'The concrete steps that answer the question.', 220, 'dg-fill3']], 540, 'From a research area to objectives');

FIGS['search-strategy'] = () => {
  const k = [], box = (x, y, w, t, tip, cls) => k.push(tipR(x, y, w, 46, t, tip, { cls: cls || 'dg-fill1', tcls: 'dg-t2' }));
  box(10, 10, 170, 'Research\nquestion', 'Start from your RQ, not from a vague topic.', 'dg-fill2');
  box(220, 10, 170, 'Concepts &\nsynonyms', 'Split the RQ into 2–4 concepts and list synonyms for each.');
  box(430, 10, 170, 'Search string', 'OR inside a concept, AND between concepts, quotes for phrases.');
  box(430, 110, 170, 'Databases', 'Google Scholar, Semantic Scholar, IEEE Xplore, ACM DL, arXiv, PubMed…');
  box(220, 110, 170, 'Screen', 'Titles, then abstracts, then full texts, against your criteria (chapter 4).');
  box(10, 110, 170, 'Snowball', 'Follow references backward and “Cited by” forward from the best papers.', 'dg-fill3');
  k.push(L([[180, 33], [220, 33]], { end: 'arrow' }), L([[390, 33], [430, 33]], { end: 'arrow' }), L([[515, 56], [515, 110]], { end: 'arrow' }),
    L([[430, 133], [390, 133]], { end: 'arrow' }), L([[220, 133], [180, 133]], { end: 'arrow' }),
    L([[95, 156], [95, 186], [515, 186], [515, 156]], { end: 'arrow', label: 'new keywords and papers: repeat until results saturate', at: .5, dy: 14 }));
  return D.svg(610, 214, 'A literature search strategy', k);
};

FIGS['snowball'] = () => {
  const k = [];
  k.push(tipR(220, 90, 150, 56, 'Seed paper', 'A strong, recent paper close to your question.', { cls: 'dg-fill2', tcls: 'dg-t2' }));
  [0, 1, 2].forEach((i) => {
    k.push(tipR(10, 20 + i * 70, 120, 44, 'Older paper', 'Found in the seed’s reference list (backward snowballing).', { cls: 'dg-fill3', tcls: 'dg-s' }));
    k.push(tipR(460, 20 + i * 70, 120, 44, 'Newer paper', 'Found with “Cited by” in Google Scholar or Semantic Scholar (forward snowballing).', { cls: 'dg-fill1', tcls: 'dg-s' }));
    k.push(L([[220, 118], [130, 42 + i * 70]], { end: 'arrow', cls: 'dg-thin' }), L([[460, 42 + i * 70], [370, 118]], { end: 'arrow', cls: 'dg-thin' }));
  });
  k.push(TX(70, 238, '← backward: its references', 'dg-s'), TX(520, 238, 'forward: who cites it →', 'dg-s'));
  return D.svg(590, 252, 'Backward and forward snowballing from a seed paper', k);
};

FIGS['three-pass'] = () => {
  const k = [], rows = [['Pass 1 · 5–10 min', 'Title, abstract, introduction, headings, figures, conclusion', 'Decide: relevant? read on?'],
    ['Pass 2 · about 1 hour', 'Everything except hard details; figures and tables', 'Summary in your own words; references to follow'],
    ['Pass 3 · several hours', 'Re-derive or re-implement; question assumptions', 'Strengths, weaknesses, ideas for your thesis']];
  rows.forEach(([a, b, c], i) => {
    const y = 10 + i * 78;
    k.push(tipR(10, y, 180, 60, a, ['A quick scan of the whole paper.', 'Understand the content, not every detail.', 'Only for the few papers your thesis builds on.'][i], { cls: ['dg-fill3', 'dg-fill1', 'dg-fill2'][i], tcls: 'dg-t2' }));
    k.push(R(205, y, 250, 60, b, { cls: 'dg-fill3', tcls: 'dg-s' }), L([[455, y + 30], [480, y + 30]], { end: 'arrow', cls: 'dg-thin' }), R(480, y, 200, 60, c, { cls: 'dg-fill3', tcls: 'dg-s' }));
    if (i) k.push(L([[100, y - 18], [100, y]], { end: 'arrow', cls: 'dg-thin' }));
  });
  k.push(TX(330, 246, 'read', 'dg-s'), TX(580, 246, 'outcome', 'dg-s'));
  return D.svg(690, 256, 'The three-pass method for reading a paper', k);
};

FIGS['review-funnel'] = () => bars([
  ['Scope and search', 'What the review covers and how papers were found.', 520], ['Themes', 'Sections that group and compare the work.', 450], ['Closest work', 'The few papers nearest to your thesis, compared in a table.', 380],
  ['The gap', 'What has not been done, and why it matters.', 310, 'dg-fill2'], ['Your research questions', 'How your thesis fills the gap.', 240, 'dg-fill3']], 540, 'The literature review narrows from the field to your questions');

FIGS['design-tree'] = () => treeMap('Research design', 'Chosen from the research question, not from the tool you like.', [
  ['Experimental', 'Change one thing and measure the effect, with everything else held equal.', [['Controlled experiment', 'Compare methods on the same data and protocol.'], ['Simulation', 'Experiments in a model of a system you cannot test live.']]],
  ['Design science', 'Build an artefact that solves a problem, then evaluate it.', [['Build + evaluate', 'A prototype measured with experiments or users.'], ['Case study', 'Study one real setting in depth.']]],
  ['Empirical', 'Observe what happens in the world, often at scale.', [['Data mining', 'e.g. mine repositories, logs or social media.'], ['Survey', 'Questionnaires to many people.']]],
  ['Qualitative', 'Understand experiences and reasons in depth.', [['Interviews', 'Semi-structured conversations, analysed into themes.'], ['Observation', 'Watch people work in their real context.']]]], 'Research designs');

FIGS['method-pipeline'] = () => {
  const k = [], box = (x, w, t, tip, cls) => k.push(tipR(x, 20, w, 54, t, tip, { cls: cls || 'dg-fill1', tcls: 'dg-t2' }));
  box(10, 120, 'Data', 'Source, size, labels, licence, splits.', 'dg-fill3'); box(160, 140, 'Pre-processing', 'Cleaning and transforms — the same for every method.');
  box(330, 150, 'Proposed\nmethod', 'What is new, described fully.', 'dg-fill2'); box(510, 140, 'Evaluation', 'Metrics, several runs, statistics, ablation, error analysis.');
  k.push(L([[130, 47], [160, 47]], { end: 'arrow' }), L([[300, 47], [330, 47]], { end: 'arrow' }), L([[480, 47], [510, 47]], { end: 'arrow' }));
  k.push(tipR(330, 110, 150, 44, 'Baselines', 'Trivial, classic, state-of-the-art and ablations — tuned equally.', { cls: 'dg-fill3', tcls: 'dg-t2' }));
  k.push(L([[230, 74], [230, 132], [330, 132]], { end: 'arrow', cls: 'dg-thin' }), L([[480, 132], [580, 132], [580, 74]], { end: 'arrow', cls: 'dg-thin' }));
  return D.svg(660, 166, 'An experimental pipeline with baselines', k);
};

FIGS['data-split'] = () => {
  const k = [], W = 600;
  [['Train 70%', 'The model learns from this part.', 0, 420, 'dg-fill1'], ['Validation 15%', 'For tuning and choosing models.', 420, 90, 'dg-fill3'], ['Test 15%', 'Used once, at the end.', 510, 90, 'dg-fill2']]
    .forEach(([t, tip, x, w, cls]) => k.push(tipR(x, 10, w, 40, t, tip, { cls, tcls: 'dg-s', rx: 0 })));
  k.push(TX(300, 72, '5-fold cross-validation: each fold is the test fold once', 'dg-s'));
  for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
    const x = c * 120, y = 88 + r * 28;
    k.push(R(x, y, 116, 22, r === c ? 'test' : 'train', { cls: r === c ? 'dg-fill2' : 'dg-fill3', tcls: 'dg-s', rx: 3 }));
  }
  return D.svg(W, 232, 'Train/validation/test split and 5-fold cross-validation', k);
};

FIGS['thesis-hourglass'] = () => bars([
  ['Introduction', 'Broad: the field, the problem, why it matters, your questions and contributions.', 520], ['Literature review', 'Narrows: what is known, and the gap.', 420],
  ['Methodology', 'Narrowest: exactly what you did.', 300, 'dg-fill2'], ['Results', 'Narrow: what you found.', 300, 'dg-fill2'],
  ['Discussion', 'Widens: what it means, compared with earlier work, limitations.', 420], ['Conclusion', 'Broad again: answers, implications, future work.', 520]], 540, 'The hourglass shape of a thesis');

FIGS['peer-review'] = () => {
  const k = [], box = (x, y, w, t, tip, cls) => k.push(tipR(x, y, w, 44, t, tip, { cls: cls || 'dg-fill1', tcls: 'dg-t2' }));
  box(10, 10, 120, 'Submit', 'Follow the template, page limit and anonymity rules.', 'dg-fill3'); box(160, 10, 130, 'Desk check', 'The editor or chairs check scope and format; some papers are desk-rejected.');
  box(320, 10, 130, 'Peer review', 'Usually 2–4 experts review the paper.'); box(480, 10, 120, 'Decision', 'Accept, minor revision, major revision or reject.', 'dg-fill2');
  box(480, 100, 120, 'Accept', 'Prepare the camera-ready version.', 'dg-fill3'); box(320, 100, 130, 'Revise', 'Address every comment; write a point-by-point response.');
  k.push(L([[130, 32], [160, 32]], { end: 'arrow' }), L([[290, 32], [320, 32]], { end: 'arrow' }), L([[450, 32], [480, 32]], { end: 'arrow' }), L([[540, 54], [540, 100]], { end: 'arrow' }),
    L([[480, 32], [470, 32], [470, 70], [385, 70], [385, 100]], { end: 'arrow', cls: 'dg-thin' }), L([[320, 122], [290, 122], [290, 54]], { end: 'arrow', cls: 'dg-thin', label: 'resubmit', at: .7, dx: -6, anchor: 'end' }));
  return D.svg(610, 156, 'The peer-review process', k);
};

/* ================= Part B: field maps ================= */
FIGS['map-ml'] = () => treeMap('Machine learning', 'Algorithms that learn patterns from data.', [
  ['Supervised', 'Learn from labelled examples.', [['Classification', 'Predict a category: spam or not.'], ['Regression', 'Predict a number: price, yield.']]],
  ['Unsupervised', 'Find structure without labels.', [['Clustering', 'Group similar items.'], ['Dim. reduction', 'PCA, UMAP: compress features.']]],
  ['Deep learning', 'Neural networks with many layers.', [['CNN / transformer', 'Architectures for images and sequences.'], ['Transfer learning', 'Fine-tune a pretrained model.']]],
  ['Trustworthy ML', 'Make models reliable and fair.', [['Robustness', 'Hold up under shift and noise.'], ['Fairness', 'Equal treatment across groups.'], ['Explainability', 'Why a prediction was made.']]]], 'Map of machine learning research');

FIGS['map-ai'] = () => treeMap('Artificial intelligence', 'Systems that perceive, reason, plan, learn and act.', [
  ['Search & planning', 'Finding sequences of actions to reach goals.', [['Heuristic search', 'A*, local search.'], ['Planning', 'PDDL planners, scheduling.']]],
  ['Knowledge & reasoning', 'Representing facts and drawing conclusions.', [['Knowledge graphs', 'Entities and relations.'], ['Probabilistic', 'Bayesian networks, uncertainty.']]],
  ['Agents & RL', 'Acting in an environment.', [['Reinforcement learning', 'Learning from rewards.'], ['LLM agents', 'Models that use tools and plan steps.']]],
  ['Generative AI', 'Models that produce text, images and code.', [['LLMs', 'Large language models.'], ['RAG', 'Answers grounded in retrieved documents.'], ['Evaluation & safety', 'Hallucination, bias, misuse.']]]], 'Map of artificial intelligence research');

FIGS['map-nlp'] = () => treeMap('Natural language processing', 'Computers that understand and generate language.', [
  ['Understanding', 'Analyse the meaning of text.', [['Classification', 'Sentiment, hate speech, topics.'], ['NER', 'Find names of people, places, things.']]],
  ['Generation', 'Produce text.', [['Translation', 'Between languages.'], ['Summarisation', 'Shorter versions of documents.']]],
  ['Interaction', 'Systems that converse or answer.', [['Question answering', 'Answers from text or documents.'], ['Dialogue', 'Chatbots and assistants.']]],
  ['Speech & resources', 'Spoken language and low-resource work.', [['Speech recognition', 'Speech to text.'], ['Low-resource', 'Methods and data for languages like Bangla.']]]], 'Map of NLP research');

FIGS['map-cv'] = () => treeMap('Computer vision', 'Extracting meaning from images and video.', [
  ['Image processing', 'Transforming images.', [['Enhancement', 'Denoise, deblur, low-light.'], ['Edges & filters', 'Convolution, Canny, morphology.']]],
  ['Recognition', 'What is in the image.', [['Classification', 'One label per image.'], ['Detection', 'Boxes around objects.']]],
  ['Pixel-level', 'Labels for every pixel.', [['Segmentation', 'Masks of objects or regions.'], ['OCR', 'Reading text in images.']]],
  ['Video & 3D', 'Motion and depth.', [['Tracking & action', 'Follow objects; recognise actions.'], ['3D & depth', 'Reconstruct shape and distance.']]]], 'Map of computer vision research');

FIGS['map-sec'] = () => treeMap('Cybersecurity', 'How systems are attacked and defended.', [
  ['Network security', 'Protecting traffic and services.', [['Intrusion detection', 'Spot attacks in traffic.'], ['DDoS defence', 'Withstand floods of traffic.']]],
  ['Software & web', 'Bugs attackers exploit.', [['Vulnerabilities', 'OWASP Top 10, memory bugs.'], ['Malware', 'Detect and analyse malicious code.']]],
  ['Cryptography', 'Mathematics of secrecy and integrity.', [['Protocols', 'TLS, authentication.'], ['Post-quantum', 'Algorithms safe from quantum computers.']]],
  ['People & privacy', 'The human side.', [['Phishing & fraud', 'Deceiving users.'], ['Privacy', 'Protecting personal data.'], ['Usable security', 'Security people can actually use.']]]], 'Map of cybersecurity research');

FIGS['map-bio'] = () => treeMap('Biomedical informatics', 'Computing for medicine and biology.', [
  ['Medical imaging', 'X-ray, CT, MRI, fundus, pathology.', [['Diagnosis', 'Classify disease from images.'], ['Segmentation', 'Outline organs and lesions.']]],
  ['Biosignals', 'ECG, EEG, wearables.', [['Arrhythmia', 'Heart-rhythm detection.'], ['Monitoring', 'Continuous health tracking.']]],
  ['Clinical data', 'Records and text.', [['Risk prediction', 'Who will get worse?'], ['Clinical NLP', 'Information from notes and messages.']]],
  ['Bio & public health', 'Genes and populations.', [['Bioinformatics', 'Genes, proteins, sequences.'], ['Digital health', 'Apps, SMS, telemedicine.']]]], 'Map of biomedical informatics research');

FIGS['map-data'] = () => treeMap('Data science & IR', 'Patterns in data; finding relevant items.', [
  ['Data mining', 'Discovering patterns.', [['Clustering', 'Groups of similar records.'], ['Association rules', 'Items that occur together.']]],
  ['Prediction', 'Forecasting and detection.', [['Time series', 'Forecast future values.'], ['Anomalies', 'Unusual records: fraud, faults.']]],
  ['Retrieval', 'Search engines.', [['Ranking', 'BM25, dense retrieval.'], ['Query understanding', 'What the user means.']]],
  ['Recommendation', 'Suggesting items.', [['Collaborative filtering', 'Learn from similar users.'], ['Graphs', 'Networks of users and items.']]]], 'Map of data science and information retrieval research');

FIGS['map-iot'] = () => treeMap('Networks & IoT', 'Moving data efficiently and reliably.', [
  ['IoT systems', 'Sensors and devices.', [['Sensor networks', 'Many small battery nodes.'], ['Energy', 'Duty cycling, harvesting.']]],
  ['Wireless & mobile', 'Radio networks.', [['Wi-Fi / 5G', 'Capacity and coverage.'], ['LoRa / BLE', 'Low-power links.']]],
  ['Edge computing', 'Processing near the data.', [['Offloading', 'Device, edge or cloud?'], ['TinyML', 'ML on microcontrollers.']]],
  ['Network systems', 'How networks are run.', [['SDN', 'Programmable networks.'], ['Measurement', 'Latency, loss, throughput in practice.']]]], 'Map of networking and IoT research');

FIGS['map-se'] = () => treeMap('Software engineering', 'How software is built and maintained.', [
  ['Quality & testing', 'Finding and preventing bugs.', [['Test generation', 'Automatic tests, fuzzing.'], ['Defect prediction', 'Which code will break?']]],
  ['Maintenance', 'Keeping code healthy.', [['Code smells', 'Signs of poor design.'], ['Refactoring', 'Improving code safely.']]],
  ['AI for code', 'Models that write and fix code.', [['Code generation', 'From description to code.'], ['Program repair', 'Fixing bugs automatically.']]],
  ['Human & process', 'People and teams.', [['Repository mining', 'Evidence from GitHub at scale.'], ['Developer studies', 'Surveys and interviews.']]]], 'Map of software engineering research');

FIGS['map-hci'] = () => treeMap('Human–computer interaction', 'Technology that fits people.', [
  ['Usability', 'Easy and efficient to use.', [['Usability testing', 'Tasks with real users.'], ['Interface design', 'Layouts, flows, feedback.']]],
  ['Accessibility', 'Usable by everyone.', [['Visual / motor', 'Screen readers, large targets.'], ['Low literacy', 'Voice and icons.']]],
  ['New interaction', 'Beyond keyboard and mouse.', [['Voice & gesture', 'Natural input.'], ['Human–AI', 'Working with AI assistants.']]],
  ['Social & ICTD', 'Technology in communities.', [['ICTD', 'Technology for development.'], ['Well-being', 'Health and education.']]]], 'Map of HCI research');
