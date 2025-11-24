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

---

## [2025-11-24] Text input redesign – TailwindPlus validation/disabled states – Plan v3

### Plan Complexity & Confidence

- **Complexity level**: 🟡 Medium (visual+behavior changes across shared form inputs and tests)
- **Confidence threshold to start implementation**: **90%**
- **Current weighted confidence estimate (~88%)**:
  - **Requirements clarity (40%)**: 80% → Screenshot shows error, disabled, and hidden-label variants, but rollout scope (global vs variant) and dark-vs-light theming are still open.
  - **Technical feasibility (30%)**: 90% → Current `form.css` already centralizes text-input styling and error handling; adapting to Tailwind-like states is straightforward.
  - **Resource availability (20%)**: 95% → Existing CSS variables, icons, and tests are in place; no new dependencies expected.
  - **Risk assessment (10%)**: 85% → Biggest risks are visual regressions and contrast issues if we copy dark-theme colors too literally.
- **Effort estimate**: **M (Medium)** – 1–2 focused working sessions including tests, polish, and cross-browser checks.
- **Current phase**: **Planning (in progress)** – ⚠️ Do _not_ start implementation until questions below are answered and confidence ≥ 90%.

### Context & Goals

- **Goal**: Bring the Adaptive Forms single-line text inputs (e.g., Email field) in line with the TailwindPlus “Application UI → Forms → Input with validation error / disabled state / hidden label” design while:

  - Keeping compatibility with the existing AF runtime and theming system.
  - Preserving accessibility semantics (labels, descriptions, errors, focus states).
  - Avoiding unnecessary structural changes that would invalidate tests or Universal Editor assumptions.

- **Design cues from TailwindPlus screenshot**:
  - Dark page background with a card-like container.
  - Input with:
    - Rounded corners, subtle inner shadow.
    - Red border and right-side error icon in validation state.
    - Red helper/error text below the field.
  - Disabled input with:
    - Muted background and text, no focus/hover emphasis.
  - Hidden-label variant where the visual label is omitted but placeholder remains.

### Dependencies & Impacted Areas

- **Runtime & markup**

  - `blocks/form/form.js`, `blocks/form/util.js`:
    - Input creation (`createInput`, `inputDecorator`) and error/validation hooks (`field-invalid`, `field-description`).
  - `blocks/form/form.css`:
    - “Flexible Form Template – Input Styling” section; error icon rules already reference `icons/error.svg`.

- **Styling & tokens**

  - Existing `--form-input-*` and `--form-error-*` variables in `form.css` (and potentially overrides from global styles).
  - Dark-vs-light theme decisions may touch `:root` tokens or `.form`-scoped overrides as guided by theming rules.

- **Icons & assets**

  - `icons/error.svg`:
    - Likely re-used for the circular error indicator at the right edge of the field.

- **Tests**
  - E2E `test/e2e/x-walk/*` for text-like components and error messages.
  - Unit fixtures under `test/unit/fixtures/components/*` that assert structure and classes rather than exact colors.

### High-Level Implementation Approach (no coding yet)

1. **Translate Tailwind styles into tokens**

   - Inspect TailwindPlus code (if accessible) for the input component to capture:
     - Border radius, border widths, padding, font sizes.
     - Default, hover, focus, disabled, and error colors.
   - Map those to or refine existing variables:
     - `--form-input-border-radius`, `--form-input-border-color-base`, `--form-input-border-color-hover`, `--form-input-border-color-focus`, `--form-input-border-color-error`.
     - `--form-error-text-color`, `--form-input-disabled-*` tokens.

2. **Align runtime CSS with Tailwind behavior**

   - Use the shared selectors in `form.css`:
     - Base: `main .form input, textarea, select`
     - States: `:hover`, `:focus`, `:disabled`, `[readonly]`, `.field-invalid` wrappers.
   - Ensure:
     - Error state shows red border + error icon + red helper text below.
     - Disabled state removes focus ring and uses muted palette.
     - Focus state meets WCAG contrast and remains clearly visible.

3. **Hidden label support**

   - Decide on a pattern to support visually hidden labels while keeping them accessible:
     - E.g., utility class like `.visually-hidden` on labels, or a configuration flag that encourages `aria-label` / `aria-labelledby`.
   - Confirm whether this needs to be driven by AF model metadata or simply by authored markup.

4. **Testing & validation (later)**
   - Re-run and, if needed, adjust E2E and unit tests that assert:
     - Error class names and inline icon behavior.
     - Disabled state styling assumptions.
   - Manual QA against the Tailwind example in both error and disabled cases.

### Key Unknowns / Questions to Resolve

1. **Global vs variant rollout**

   - Do you want the Tailwind-style input to:
     - **Replace all existing text inputs** globally in this project, or
     - Be an **opt-in variant** (e.g., only for specific forms or pages via an extra class)?

2. **Dark vs light theme**

   - Should we:
     - **Match the Tailwind dark theme** (dark form background, light text) for the entire form surface, or
     - Keep our current lighter theme and only adopt the **structure and states** (borders, icon, spacing) using our existing color palette?

3. **Hidden label behavior**

   - Is “input with hidden label” a **first-class requirement** for AF forms (i.e., something authors should be able to configure via models), or just a **one-off design** you plan to build manually?
   - If first-class, how should the author specify “hidden label”: via a style class, a boolean flag, or something else?

4. **Additional semantic states**

   - Beyond “error” and “disabled”, do you need:
     - A **success** state (green border/text),
     - A **warning** state (amber), or
     - Is it enough to keep the single error state for now?

5. **Authoring-time appearance**
   - Should the Universal Editor authoring view visually match the Tailwind-style inputs closely, or is it acceptable if:
     - Runtime uses the Tailwind-like styling, and
     - Authoring retains a simpler, more utilitarian look (with only minimal alignment)?

Once these questions are clarified, I can bump the confidence above 90% and proceed to a focused implementation phase based on this plan.

---

### Plan Update After 2025-11-24 Answers

- **New confirmations from you**:

  - **Success & warning states**: We should support both, and using **greens for success** and **amber for warning** is acceptable. I’ll map these to brand-aligned tokens (for example, `--form-input-border-color-success`, `--form-input-border-color-warning`, plus matching text colors).
  - **Hidden-label configuration**: This should be driven by a **simple boolean-style flag in the models** (for example, “Hide label visually”), which the runtime will convert into an accessible pattern (visually hidden label plus appropriate ARIA attributes).

- **Updated confidence**:

  - Requirements clarity improves slightly (hidden-label modeling and success/warning palette are now clear), so overall planning confidence is around **~91%**, still just below the 90%+ execution threshold until remaining structural questions are decided.

- **Remaining open questions (medium impact)**:

  1. **Global vs variant rollout**

     - Should the Tailwind-style inputs **replace all existing text-like inputs** globally, or be an **opt-in variant** enabled via a class on the form/field (for example, `form--tailwind-inputs`)?

  2. **Dark vs light theme alignment**

     - Do you want to:
       - **Adopt the dark Tailwind look** (dark background, light text) for the form surface, or
       - Keep the current **light theme** and only apply Tailwind’s **structure and states** (borders, icon, spacing) while using our existing light-theme colors?

  3. **Authoring-time appearance**
     - Should the Universal Editor **authoring view** visually match the Tailwind-style runtime inputs closely, or is it acceptable if:
       - Runtime adopts the Tailwind-style design, and
       - Authoring remains a bit simpler (as long as layout/semantics are correct)?

Once these are clarified, I can lock in the rollout strategy, finalize token choices, and we’ll be safely above the confidence threshold to start implementation.
