## [2025-11-24] Text input redesign for Adaptive Forms (Figma-based) – Plan v2

### Plan Complexity & Confidence

- **Complexity level**: 🟡 Medium (feature spans multiple files: form block components, CSS, tests)
- **Confidence threshold to start implementation**: **90%**
- **Current weighted confidence estimate (~93%)**:
  - **Requirements clarity (40%)**: 92% → Scope clarified: apply Figma text input design to all text-like fields, label always above, error replaces helper, global rollout, canonical size only.
  - **Technical feasibility (30%)**: 90% → Existing form block architecture and theming system should easily support a richer text input design.
  - **Resource availability (20%)**: 95% → Codebase, tests, and design reference are available; no new libraries expected.
  - **Risk assessment (10%)**: 90% → Risks understood (visual regressions, accessibility, long text wrapping) and can be mitigated via tokens, responsive layout, and tests.
- **Effort estimate**: **M (Medium)** – 1–2 focused working sessions including tests and polish.
- **Current phase**: **Planning (in progress)** – ⚠️ Do _not_ start implementation until questions are resolved and confidence ≥ 90%.

### Context & Goals

- **Goal**: Update the Adaptive Forms **text input** experience to match the provided Figma design for the “Flexible Form Template – Community” while staying aligned with:
  - Existing **form block architecture** under `blocks/form/*`.
  - The **theming** rules in `.cursor/rules/eds-forms/theming.mdc`.
  - Existing **font and layout** patterns (e.g., `styles/fonts.css`, `blocks/form/form.css`).
- **Scope (confirmed)**:
  - All **text-like fields** (all “text link” fields in the form runtime: text, email, number, telephone, and other single-line textual inputs that share the base pattern).
  - Label is **always above** the field (no floating label behavior).
  - Error message **replaces helper/description text** when present.
  - Error icon appears **inside the input field on the right-hand side**, matching the Figma design.
  - Implement **all visual states** shown in Figma (default, hover, focus, disabled, readonly if present, error, success/warning if present) for **one canonical size**.
  - New styling is **applied globally** to all forms immediately (no feature flag / selective opt-in).
  - Long labels and error messages must **wrap onto multiple lines** instead of truncating.

### Dependencies & Impacted Areas

- **Form runtime & components**

  - `blocks/form/components/`:
    - Text-related components (e.g., `text`, `textInput`, `emailInput`, `numberInput`, `telephoneInput` – exact folders to confirm).
    - Shared field wrappers (e.g., `field-wrapper`, `.text-wrapper`, `.number-wrapper`) used across inputs.
  - `blocks/form/form.css`:
    - Global form-level variables (`--form-*`) and base field styling.
  - Potential touch-points in `scripts/form-editor-support.css` for authoring-time visuals (if they mirror runtime styling).

- **Global styling & tokens**

  - `styles/styles.css` and `styles/fonts.css`:
    - Ensure typography and spacing tokens align with new input design.
  - Theming rules in `.cursor/rules/eds-forms/theming.mdc`:
    - Use or extend existing `--form-*` variables instead of hardcoding new values.

- **Assets & icons**

  - `icons/error.svg`:
    - May be used for error state iconography if the Figma design includes inline error icons within the text input field.

- **Testing**
  - E2E tests in `test/e2e/x-walk/*`:
    - `textInput`, `text`, `emailInput`, `numberInput`, `telephoneInput`, `errormessages.runtime.spec.js`, etc. (exact filenames to confirm).
  - Unit fixtures in `test/unit/fixtures/components/*`:
    - Text-like field fixtures and HTML/JS pairs that assert structure and classes.

### Quality Gates Checklist

- **♿ Accessibility**

  - Maintain or improve color contrast for borders, placeholders, helper text, and error messages.
  - Preserve semantic associations: label ↔ input ↔ description/error via `for`/`id`, `aria-describedby`, etc.
  - Ensure focus states are clearly visible and meet WCAG guidelines (no removal of focus ring without a high-contrast replacement).
  - Respect reduced motion / user preferences if any animated focus/hover effects are introduced.

- **🔒 Security**

  - No new data-handling logic expected; primarily visual/DOM changes.
  - Ensure any new icons or wrappers don’t alter how user input is escaped/validated (avoid introducing unsafe HTML injection paths for error messages).

- **🧪 Testing Strategy**
  - Update existing **x-walk** E2E specs that validate text input rendering, focus, and error messages to align with new markup/CSS (without loosening assertions too much).
  - Verify unit tests / fixtures still pass and adjust only where DOM structure changes are intentional.
  - Add or update tests for:
    - Focus state visibility.
    - Error + helper text layout (including icon placement, if any).
    - Disabled/readonly state visuals if those states are part of the design.

### High-Level Implementation Plan (No coding yet)

1. **Deep-dive Figma analysis**

   - Identify the exact **text input variant** to implement (e.g., default “Text field / Primary” in the shared library).
   - Document all visual states:
     - Default, hover, focus, error, disabled, success (if present), with spacing and radius.
     - Label placement (e.g., top-aligned vs. floating), helper/description text placement, required indicators, and character counters (if any).
   - Extract or map design tokens:
     - Border colors, background colors, radii, font styles, spacing, and icon usage to comparable `--form-*` or brand tokens.

2. **Audit existing text input implementation**

   - Inspect the current markup and classes for text-like fields under `blocks/form/components/*` and in generated HTML fixtures.
   - Identify:
     - The canonical **wrapper structure** (e.g., `.field-wrapper`, `.text-wrapper`, `.field-label`, `.field-description`, `.field-error`).
     - How error states are currently signaled (classes on wrapper vs. input, ARIA attributes).
     - Which selectors in `blocks/form/form.css` and component-specific CSS control:
       - Borders, padding, typography, and spacing for inputs.
       - Layout of labels, helper text, and error messages.

3. **Design CSS token & structure mapping**

   - Propose a mapping from Figma tokens to CSS custom properties:
     - E.g., `--form-input-border-radius`, `--form-input-border-color`, `--form-input-border-color-focus`, `--form-input-error-border-color`, `--form-helper-text-color`, etc.
   - Decide where to define/override variables:
     - Prefer `:root` (global theme) for shared tokens, and `.form` scope for form-specific overrides as per theming.mdc.
   - Confirm whether any **DOM structure changes** are required (e.g., adding an inline error icon container) and how to do that without breaking authoring/runtime assumptions.

4. **Implementation steps (for later)**

   - Update `blocks/form/form.css` and any relevant component CSS to:
     - Match spacing, border radius, typography, and state styles from the design.
     - Use new/existing tokens instead of raw color/spacing literals.
   - If needed, adjust text input component templates/JS to:
     - Insert icon containers, description wrappers, or required indicators in the right order.
     - Ensure classes support new CSS selectors while remaining backward compatible where possible.
   - Run linting and all relevant tests (`npm run lint`, `npm run test:unit`, `npm run test:e2e`) and address any regressions.

5. **Review & polish**
   - Compare implemented inputs against Figma across breakpoints to ensure responsive behavior matches intent.
   - Validate keyboard and screen-reader behavior (focus order, announcements of errors, etc.).
   - Capture any notable decisions or deviations from the design for future reference.

### Remaining Unknowns / Risks

- **Figma token mapping details**: Exact variable names/semantics in the design system may require interpretive mapping into `--form-*` variables, but this is a low-risk translation task.
- **Authoring vs runtime parity**: Universal Editor authoring experience should **closely match runtime inputs visually**, which likely means mirroring key input styles in `form-editor-support.css` while still prioritizing runtime correctness.
- **Future variants**: Potential later need for additional input variants (icons, prefixes/suffixes, masked inputs) should be kept in mind when designing DOM structure and tokens, but are out of scope for this change.

---

Planning has reached the **90%+ confidence threshold** with scope and behavior clarified; implementation can now begin in a separate phase following this plan.
