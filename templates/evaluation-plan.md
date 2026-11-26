# Evaluation plan: <working title>

1. Research question:
2. Design: controlled experiment / user study / interviews / mixed methods
3. Data and split
   - Source, size, classes or groups:
   - Split: train / validation / test (stratified? grouped by user, patient, time?):
   - How leakage is prevented:
4. Methods compared
   - Baselines (simplest first):
   - Proposed method:
   - Same tuning budget for every method: yes / how
5. Metrics: which, and why they match the research question
6. Statistics
   - What one pair is: seeds on one split / folds of cross-validation / independent test sets / participants
   - Test: paired t-test, corrected resampled t-test, Wilcoxon (6+ pairs), McNemar, Mann–Whitney
   - Number of runs or participants:
   - Effect size and 95% confidence interval reported: yes
   - Correction for many comparisons (Holm), if needed:
7. Ablation and error analysis plan
8. Threats to validity (internal, external, construct) and what reduces each
