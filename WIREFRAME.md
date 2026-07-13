# Zal0op Engineering — Text Wireframe

Phase 0 artifact. This defines information order only; it is not final copy or a visual implementation.

## Global frame

- 12-column editorial grid on desktop; 4-column grid on mobile.
- Warm paper background, sharp 1 px rules, no cards around whole sections.
- Grotesque display typography for statements; monospace for labels, metadata, formulas, and IDs.
- Stable section anchors and a narrow sticky header after the first scroll.

## Page order

1. `header`
   - `ZAL0OP` wordmark.
   - Framework, Movements, Principles, Metrics, Maturity.
   - `EN / BY` and `READ SPEC`.
2. `hero`
   - Framework label, two-line statement, short description, two CTAs.
   - ZEF metadata rail.
   - Animated flow: Task → Blocker → Agent → PR → Review → Salary.
3. `fundamental-law`
   - Oversized editorial quotation.
   - Short supporting text and visible content-source marker.
4. `framework`
   - Five engineering levels as a numbered vertical progression.
   - Zal0op Engineering receives the accent treatment.
5. `movements`
   - Seven numbered editorial rows with alternating text/diagram alignment.
6. `blockability`
   - Large formula, variable definitions, threshold, and result panel.
   - Treated as the page's strongest technical section.
7. `adversarial-review`
   - Split composition: Defend Your PR / Attack Their PR.
   - Serious quotation treatment below.
8. `dual-loops`
   - Parallel Production and Presence flows.
   - Shared Human Plausibility Layer connector.
9. `agents`
   - 6–8 representative agent records.
   - Full agent list in one slow marquee.
10. `principles`
    - Eight numbered principle records in an open two-column index.
11. `metrics`
    - Large pseudo-scientific values in a standards-dashboard band.
12. `maturity`
    - Six-level staircase; Level 5 is visually dominant.
13. `failure-modes`
    - Compact diagnostic grid: name, symptom, cause.
14. `manifesto`
    - Closing statement, status metadata, repository/spec/language links, privacy note, footer.

## Responsive collapse

- At 1024 px: reduce display scale; keep two-column hero and critical diagrams where readable.
- At 768 px: hide desktop navigation behind a menu; collapse split sections into ordered stacks.
- At 390 px: single content column; horizontally scroll only the intentional agent marquee.
- Formulas wrap by semantic fragments, never by arbitrary characters.

## Phase 1 implementation slice

- Header.
- Hero and hero flow.
- Fundamental Law as the sample section.
- Buttons, mobile menu, entrance motion, reduced-motion behavior.

