# CSS Styling Memories

Styling patterns, theme decisions, and visual system guidelines.

## Core Principles

### **🎨 Visual Consistency**

**Decision Framework:**

1. **Inherit Global Styles:** Prefer matching the global site shell (`styles.css`) over creating divergent form-specific themes unless explicitly required by a different brand context.
2. **Use Variables:** Drive all styling through CSS custom properties (tokens) defined in `:root` for easy theming.
3. **Scoped Selectors:** Keep form styles strictly scoped to `.form` to prevent leaking, but respect global cascade where beneficial.

**Success Criteria:**

- Form components seamlessly blend with the host page.
- Theme changes require only variable updates, not selector refactoring.

---

## Quick Reference

- [CSS-1]: Standardized Form Button Styling (Blue Pill Style)

---

## CSS-1: Standardized Form Button Styling

**Issue/Context:** Unifying Adaptive Forms button styles with the main site design (Blue Pill style) based on user request to follow `btn btn-primary` convention.

**Root Cause:** Form styles (`blocks/form/form.css`) were using a "Corporate PDF" theme (Yellow, Boxy) which diverged from the main site's modern style (Blue, Pill).

**Solution:**
- Updated form button variables in `blocks/form/form.css` to match global site link color (`#3b63fb`) and pill shape (`2.4em` radius).
- Removed top margin (`m-t-0` behavior) from form buttons to align with utility class expectations.
- Aligned secondary buttons and Wizard "Back" button to a "ghost" pill style (transparent background, gray border).
- Preserved existing HTML classes but updated their visual definitions.

**Files:** `blocks/form/form.css`

**Technical Impact:**
- Form buttons now match the visual language of the embedding site.
- Button styling is more robust and modern (pill shape, better hover states).

**Learning:** When "btn-primary" is requested without external CSS, infer the design from the main site's primary action style (often defined in `styles.css`) rather than inventing a new one or sticking to a legacy theme.

---

