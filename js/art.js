/* ===================== art.js : one decorative illustration per chapter ===================== */
/* Shown on each chapter's title slide, in the chapter list and on the share cards.
   Mount with <span class="topic-art" data-art="3" aria-hidden="true"></span>; colours come from the
   theme variables, so the drawings follow light and dark mode. */
const TOPIC_ART = (() => {
  const bg = '<circle cx="200" cy="165" r="142" class="ta-bg"/>';
  const lines = (x, y, w, n, gap, cls) => Array.from({ length: n }, (_, i) => `<rect x="${x}" y="${y + i * gap}" width="${i === n - 1 ? w * 0.6 : w}" height="9" rx="4.5" class="${cls || 'ta-faint'}"/>`).join('');
  const doc = (x, y, w, hh, cls) => `<rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="10" class="${cls || 'ta-card'}"/>`;
  return {
    /* 1. a bound thesis and a graduation cap */
    1: `${bg}${doc(92, 130, 150, 160)}<rect x="92" y="130" width="22" height="160" rx="6" class="ta-ac"/>${lines(128, 196, 92, 3, 22)}<rect x="128" y="166" width="92" height="14" rx="7" class="ta-acc"/>
       <path d="M262,58 L344,86 L262,114 L180,86 Z" class="ta-fill-ink"/><path d="M222,100 V124 Q262,140 302,124 V100" class="ta-fill-ink"/><path d="M344,86 V124" class="ta-line"/><circle cx="344" cy="128" r="7" class="ta-acc"/>`,
    /* 2. an idea becomes a question */
    2: `${bg}<circle cx="170" cy="140" r="62" class="ta-soft2"/><rect x="148" y="200" width="44" height="30" rx="8" class="ta-card"/><path d="M152,238 H188" class="ta-line"/>
       <path d="M150,124 Q170,96 190,124" class="ta-line"/><text x="290" y="200" class="ta-quote">?</text><path d="M232,140 H262" class="ta-line"/><path d="M252,130 L264,140 L252,150" class="ta-line"/>`,
    /* 3. searching a stack of papers */
    3: `${bg}${doc(90, 120, 140, 170)}${doc(110, 100, 140, 170)}${doc(130, 80, 140, 170)}${lines(150, 110, 100, 5, 24)}
       <circle cx="262" cy="196" r="46" class="ta-lens"/><path d="M295,229 L336,270" class="ta-handle"/>`,
    /* 4. a funnel selects papers */
    4: `${bg}<path d="M90,70 H310 L228,170 V250 L172,272 V170 Z" class="ta-soft1"/>${[0, 1, 2, 3, 4].map((i) => `<rect x="${104 + i * 40}" y="${40 + (i % 2) * 10}" width="30" height="38" rx="5" class="ta-card"/>`).join('')}
       <circle cx="200" cy="290" r="22" class="ta-ok"/><path d="M189,290 l8,8 l15,-17" class="ta-check"/>`,
    /* 5. reading in three passes */
    5: `${bg}${doc(110, 60, 180, 220)}${lines(132, 92, 136, 3, 22)}<rect x="132" y="168" width="136" height="12" rx="6" class="ta-acc"/>${lines(132, 194, 136, 3, 22, 'ta-faint')}
       ${[1, 2, 3].map((n, i) => `<circle cx="${304}" cy="${100 + i * 56}" r="20" class="${['ta-soft2', 'ta-ac', 'ta-acc'][i]}"/><text x="304" y="${108 + i * 56}" class="ta-t ${i ? 'ta-on-ac' : ''}">${n}</text>`).join('')}`,
    /* 6. papers synthesised into one review */
    6: `${bg}${[[70, 70], [70, 200], [300, 70], [300, 200]].map(([x, y]) => doc(x - 28, y - 32, 56, 66) + `<path d="M${x < 200 ? x + 28 : x - 28},${y} L${x < 200 ? 160 : 240},165" class="ta-line-thin"/>`).join('')}
       ${doc(150, 110, 100, 120, 'ta-soft1')}${lines(166, 132, 68, 4, 22)}`,
    /* 7. a method pipeline */
    7: `${bg}${[0, 1, 2].map((i) => `<rect x="${64 + i * 100}" y="${126 + (i === 1 ? -36 : 0)}" width="76" height="62" rx="12" class="${['ta-card', 'ta-ac', 'ta-card'][i]}"/>`).join('')}
       <path d="M140,157 H164 M240,121 L264,150" class="ta-line"/><rect x="164" y="214" width="76" height="46" rx="10" class="ta-soft2"/><path d="M202,186 V214" class="ta-dash"/><text x="202" y="244" class="ta-s">baseline</text>`,
    /* 8. results with error bars */
    8: `${bg}<path d="M90,260 H320 M90,260 V70" class="ta-line"/>${[[120, 120, 'ta-faint'], [180, 90, 'ta-soft1'], [240, 150, 'ta-ac'], [300, 0, '']].filter((b) => b[1]).map(([x, hh, c]) => `<rect x="${x - 22}" y="${260 - hh}" width="44" height="${hh}" rx="4" class="${c}"/><path d="M${x},${248 - hh} V${272 - hh} M${x - 8},${248 - hh} H${x + 8} M${x - 8},${272 - hh} H${x + 8}" class="ta-line"/>`).join('')}
       <text x="296" y="100" class="ta-t">p&lt;.05</text>`,
    /* 9. ethics: a shield with a check */
    9: `${bg}<path d="M200,52 L292,88 V170 Q292,240 200,282 Q108,240 108,170 V88 Z" class="ta-soft1"/><path d="M200,82 L264,108 V170 Q264,220 200,252 Q136,220 136,170 V108 Z" class="ta-ac"/>
       <path d="M168,168 l24,24 l44,-50" class="ta-check"/>`,
    /* 10. writing: a page and a pen */
    10: `${bg}${doc(104, 60, 170, 230)}<rect x="126" y="86" width="100" height="14" rx="7" class="ta-ac"/>${lines(126, 116, 126, 6, 24)}
       <path d="M262,252 L320,140 L338,150 L280,262 L258,272 Z" class="ta-acc"/><path d="M320,140 L330,122 L348,132 L338,150" class="ta-fill-ink"/>`,
    /* 11. presenting results */
    11: `${bg}<rect x="78" y="62" width="244" height="150" rx="12" class="ta-card"/><path d="M200,212 V262 M160,272 H240" class="ta-line"/>
       <path d="M104,182 L150,142 L190,160 L240,104 L296,84" class="ta-stroke-acc"/>${[[150, 142], [190, 160], [240, 104]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" class="ta-ac"/>`).join('')}`,
    /* 12. machine learning: a neural network */
    12: `${bg}${(() => { const L = [[100, [100, 165, 230]], [200, [70, 130, 190, 250]], [300, [130, 200]]]; let s = '';
       for (let a = 0; a < 2; a++) L[a][1].forEach((y1) => L[a + 1][1].forEach((y2) => { s += `<path d="M${L[a][0]},${y1} L${L[a + 1][0]},${y2}" class="ta-line-thin"/>`; }));
       L.forEach(([x, ys], i) => ys.forEach((y) => { s += `<circle cx="${x}" cy="${y}" r="18" class="${['ta-soft2', 'ta-ac', 'ta-acc'][i]}"/>`; })); return s; })()}`,
    /* 13. artificial intelligence: a chip with sparkles */
    13: `${bg}<rect x="130" y="100" width="140" height="140" rx="22" class="ta-ac"/><rect x="160" y="130" width="80" height="80" rx="12" class="ta-card"/><text x="200" y="182" class="ta-t ta-big">AI</text>
       ${[0, 1, 2, 3].map((i) => `<path d="M${150 + i * 33},84 V100 M${150 + i * 33},240 V256 M114,${120 + i * 33} H130 M270,${120 + i * 33} H286" class="ta-line"/>`).join('')}
       <path d="M308,72 l6,16 l16,6 l-16,6 l-6,16 l-6,-16 l-16,-6 l16,-6 z" class="ta-acc"/><path d="M92,250 l4,10 l10,4 l-10,4 l-4,10 l-4,-10 l-10,-4 l10,-4 z" class="ta-acc"/>`,
    /* 14. NLP: speech bubbles in two scripts */
    14: `${bg}<path d="M80,80 H220 Q236,80 236,96 V160 Q236,176 220,176 H130 L100,204 V176 H96 Q80,176 80,160 V96 Q80,80 96,80 Z" class="ta-ac"/><text x="158" y="142" class="ta-t ta-big ta-on-ac">অ আ</text>
       <path d="M180,190 H304 Q320,190 320,206 V262 Q320,278 304,278 H296 V302 L270,278 H196 Q180,278 180,262 V206 Q180,190 196,190 Z" class="ta-soft2"/><text x="250" y="244" class="ta-t ta-big">Aa</text>`,
    /* 15. computer vision: an image with a detection box */
    15: `${bg}<rect x="80" y="80" width="240" height="176" rx="12" class="ta-card"/><path d="M80,230 L150,160 L200,206 L240,176 L320,240 V244 Q320,256 308,256 H92 Q80,256 80,244 Z" class="ta-soft1"/>
       <circle cx="268" cy="124" r="20" class="ta-acc"/><rect x="132" y="138" width="88" height="80" rx="4" class="ta-box-acc"/><rect x="132" y="120" width="60" height="18" class="ta-acc"/><text x="162" y="134" class="ta-s ta-on-ac">rice</text>`,
    /* 16. cybersecurity: a padlock and bits */
    16: `${bg}<path d="M150,150 V112 Q150,66 200,66 Q250,66 250,112 V150" class="ta-shackle"/><rect x="124" y="146" width="152" height="126" rx="16" class="ta-ac"/>
       <circle cx="200" cy="196" r="14" class="ta-card"/><rect x="194" y="204" width="12" height="32" rx="4" class="ta-card"/><text x="94" y="110" class="ta-m">01</text><text x="310" y="250" class="ta-m">10</text><text x="316" y="120" class="ta-m">1</text>`,
    /* 17. biomedical: a heart with an ECG trace */
    17: `${bg}<path d="M200,280 C120,220 80,180 80,132 C80,96 108,72 140,72 C166,72 186,88 200,108 C214,88 234,72 260,72 C292,72 320,96 320,132 C320,180 280,220 200,280 Z" class="ta-soft2"/>
       <path d="M86,170 H150 L166,130 L186,214 L206,110 L224,170 H314" class="ta-stroke-acc"/>`,
    /* 18. data science: clusters and a trend */
    18: `${bg}${[[130, 120, 'ta-ac'], [250, 110, 'ta-acc'], [190, 220, 'ta-ok']].map(([cx, cy, c], k) => Array.from({ length: 9 }, (_, i) => `<circle cx="${cx + Math.cos(i * 2.1 + k) * (14 + (i % 3) * 12)}" cy="${cy + Math.sin(i * 2.1 + k) * (12 + (i % 3) * 10)}" r="7" class="${c}"/>`).join('')).join('')}
       <path d="M90,280 L160,250 L230,262 L310,200" class="ta-line"/>`,
    /* 19. IoT: a tower and connected sensors */
    19: `${bg}<path d="M200,120 L170,270 M200,120 L230,270 M180,220 H220 M185,190 H215" class="ta-line"/><circle cx="200" cy="112" r="12" class="ta-acc"/>
       <path d="M168,84 Q200,60 232,84 M150,66 Q200,30 250,66" class="ta-ring-acc"/>${[[92, 160], [100, 250], [306, 168], [300, 252]].map(([x, y]) => `<path d="M${x},${y} L200,112" class="ta-dash"/><rect x="${x - 18}" y="${y - 14}" width="36" height="28" rx="6" class="ta-ac"/>`).join('')}`,
    /* 20. software engineering: code and a gear */
    20: `${bg}<rect x="78" y="86" width="190" height="150" rx="12" class="ta-card"/><text x="173" y="182" class="ta-t ta-big">&lt;/&gt;</text>${lines(98, 108, 60, 1, 0, 'ta-acc')}
       <circle cx="282" cy="236" r="40" class="ta-soft1"/>${Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<rect x="${282 + Math.cos(a) * 44 - 9}" y="${236 + Math.sin(a) * 44 - 9}" width="18" height="18" rx="3" class="ta-ac" transform="rotate(${i * 45} ${282 + Math.cos(a) * 44} ${236 + Math.sin(a) * 44})"/>`; }).join('')}<circle cx="282" cy="236" r="14" class="ta-card"/>`,
    /* 21. HCI: a phone and a person */
    21: `${bg}<rect x="196" y="66" width="110" height="200" rx="18" class="ta-card"/><rect x="212" y="94" width="78" height="44" rx="6" class="ta-soft1"/>${lines(212, 152, 78, 2, 20)}<rect x="212" y="208" width="78" height="30" rx="15" class="ta-acc"/>
       <circle cx="130" cy="130" r="30" class="ta-ac"/><path d="M78,262 Q78,180 130,180 Q182,180 182,262 Z" class="ta-ac"/>`
  };
})();

(function mountTopicArt() {
  document.querySelectorAll('[data-art]').forEach((el) => {
    const art = TOPIC_ART[el.getAttribute('data-art')];
    if (art) el.innerHTML = `<svg viewBox="0 0 400 320" class="ta-svg" focusable="false">${art}</svg>`;
  });
})();
