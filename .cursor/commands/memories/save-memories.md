# Save Memories Command 📚

Record key learnings from recent work into the appropriate memory category file. This command captures implementation details, lessons learned, and decision frameworks that will inform future AI-driven development sessions.

## 🎯 Command Behavior

### Smart Bootstrap Detection

**First-Time Setup:**

1. Check if `.cursor/memories/` exists in current project
2. If NO:
   - Inform user: "📝 No memory system detected in this project. I'll initialize the framework first."
   - Create `.cursor/memories/` directory
   - Copy templates to create:
     - `README.md` (category index + loading strategy)
     - `architecture.md` (core category with intro)
     - `development-principles.md` (core category with intro)
     - `testing.md` (core category with intro)
   - Confirm: "✅ Memory system initialized!"
3. Proceed with saving the memory

**Result:** Every project gets consistent foundation (README + 3 core categories)

### Memory Recording Flow

1. **Validate Criteria** (AI self-check before prompting user):

   ```
   ✓ Does content meet "inform future AI sessions" criteria?
   ✓ Is this substantive (not just minor fixes)?
   ✓ Have I reviewed what happened since last checkpoint?
   ✓ Am I capturing important early decisions if context was reset?

   If ALL checks pass → Continue
   If ANY fails → Inform user and ask if they still want to save
   ```

2. **Identify Category**:

   - Review existing categories in `.cursor/memories/`
   - Determine best fit for the memory content
   - If no good fit: Suggest new category creation

3. **Choose Format**:

   - **Implementation Memory**: For specific fixes, features, bug resolutions
   - **Principle/Lesson Memory**: For broader insights, patterns, decision frameworks

4. **Record Memory**:

   - Find next available entry number in category
   - Format entry according to chosen template
   - Append to category file
   - Update Quick Reference section at top of file

5. **Update README** (if new category created):
   - Add category to index
   - Suggest loading strategy mapping

## 📝 Memory Recording Instructions

### 1. Identify the Primary Category

Determine which category best fits the work completed:

**Core Categories** (Always present):

- 🏗️ **Architecture** → `architecture.md` - Component design, system patterns, structural decisions
- 🎯 **Development Principles** → `development-principles.md` - Strategic decisions, refactoring approaches
- 🧪 **Testing** → `testing.md` - Testing strategies, coverage approaches, quality assurance

**Tech Stack Categories** (Created as needed):

- 💻 **TypeScript** → `typescript-development.md` - Type system, compile-time validation, TS patterns
- 🎨 **CSS/Styling** → `css-styling.md` - Styling systems, responsive design, CSS architecture
- 🐛 **UI/Component Issues** → `ui-bugs.md` or `ui-components.md` - Visual issues, component behavior
- ⚡ **Build/Performance** → `build-performance.md` - Build config, optimization, performance patterns

**Domain Categories** (Created as needed):

- 🔒 **Authentication** → `auth-patterns.md` - Auth flows, security patterns, session management
- 🌐 **API Integration** → `api-integration.md` - API patterns, integration approaches, data flow
- 📡 **WebSocket/Real-time** → `websocket-patterns.md` - Real-time patterns, connection management
- 🔧 **DOM/Scoping** → `dom-scoping.md` - DOM manipulation, scoping patterns, browser quirks

**If Memory Doesn't Fit Existing Categories:**

- Suggest new category with descriptive hyphenated name
- Ask user: "This looks like [domain] work. Create `[category-name].md`?"
- Use category template to create new file
- Add to README.md category index

### 2. Choose Appropriate Format

#### A. Implementation Memory Format

For specific fixes, features, or bug resolutions:

```markdown
## [CATEGORY-##]: [Descriptive Title]

**Issue/Context:** [Clear problem statement or situation]

**Root Cause:** [Why this happened - critical for future prevention]

**Solution:** [What was implemented - focus on approach, not verbose details]

- [Key technical decision 1]
- [Key technical decision 2]
- [Important implementation choice]

**Files:** [Use file reference strategy - see below]

**Technical Impact:**

- [What this achieved for the codebase]
- [How it improves maintainability/performance/etc.]

**Cross-References:**

- Related: [OTHER-##: Title](other-category.md#other-##)
- See also: [ANOTHER-##: Title](another-category.md#another-##)

**Learning:** [Key takeaway applicable to future similar problems]

---
```

#### B. Principle/Lesson Format

For broader insights, patterns, and decision frameworks:

```markdown
## [CATEGORY-##]: [Principle/Pattern Title]

**Context:** [When/where this principle applies]

**Key Principles:**

- [Core principle 1 with brief rationale]
- [Core principle 2 with brief rationale]
- [Core principle 3 with brief rationale]

**Decision Framework:**

- **When to apply:** [Specific conditions/scenarios]
- **When to avoid:** [Situations where this doesn't work]
- **Trade-offs:** [What you gain vs. what you sacrifice]

**Implementation Notes:**

- [Key technical considerations]
- [Common pitfalls to avoid]
- [Success patterns that work well]

**Real-World Application:**

- [Brief example of successful application]
- [Measurable outcomes when possible]

**Cross-References:**

- Foundation: [CATEGORY-##: Title](category.md#anchor)
- Related: [OTHER-##: Title](other-category.md#anchor)

---
```

### 3. File Reference Strategy

Optimize based on file count to keep entries concise:

- **≤3 files**: Include specific paths

  - Example: `src/components/InputBar.ts`, `ChatInterface.ts`, `tests/InputBar.test.ts`

- **4-8 files**: Group by type

  - Example: `3 components, 2 services, 1 test file, 2 type definitions`

- **9+ files**: Scope description
  - Example: `All component CSS files, main styling system`, `Authentication module files`

### 4. Content Optimization Guidelines

**✅ Include:**

- Root cause analysis (why it happened)
- Key technical decisions and rationale
- Architectural choices that worked well
- Error patterns to avoid in future
- Cross-category connections
- Actionable learnings for similar future work
- Decision frameworks for when to apply principles
- Transferable insights that work across contexts

**⚠️ Streamline:**

- Implementation details (focus on approach, not step-by-step)
- Code examples (concepts over lengthy blocks - can reference files instead)
- Testing results (key outcomes, not exhaustive logs)

**❌ Skip:**

- Verbose progress updates ("first we tried X, then Y, then Z")
- Duplicate information already in other entries
- Overly detailed file lists (use grouping strategy)
- Repetitive benefits or outcomes

### 5. Cross-Reference Strategy

**Purpose:** Connect related knowledge for comprehensive understanding

**When to Cross-Reference:**

- Primary entry: Full details in most relevant category
- Secondary references: Brief mentions with links to primary entry
- Related work: Connect to similar entries across categories
- Foundations: Link to principles that guided this work
- Dependencies: Reference related technical decisions

**Format:** `[CATEGORY-##: Title](category-file.md#category-##)`

**Example:**

```markdown
**Cross-References:**

- Related: [ARCH-12: Service Architecture Pattern](architecture.md#arch-12)
- Foundation: [DEV-3: Component Extraction Framework](development-principles.md#dev-3)
- See also: [TS-5: API Response Types](typescript-development.md#ts-5)
```

### 6. Entry Numbering

**Process:**

1. Open the target category file
2. Check Quick Reference section or scan existing entries
3. Find the highest number used
4. Use next sequential number

**Format:** `[PREFIX-##]`

- Prefix: 2-4 uppercase letters matching category (ARCH, DEV, TEST, TS, UI, CSS, AUTH, API)
- Number: Sequential within category (01, 02, 03... or 1, 2, 3...)

**Examples:**

- `architecture.md` → ARCH-1, ARCH-2, ARCH-3...
- `typescript-development.md` → TS-1, TS-2, TS-3...
- `auth-patterns.md` → AUTH-1, AUTH-2, AUTH-3...

### 7. Update Quick Reference

After adding entry, update the Quick Reference section at top of category file:

```markdown
## Quick Reference

- ARCH-1: Component Extraction Pattern (Rule of Three, reusability)
- ARCH-2: Service-Oriented Architecture (dependency injection, boundaries)
- ARCH-3: Layout Flexibility System (CSS Grid, component ordering)
- ARCH-4: [YOUR NEW ENTRY TITLE] ([key topics in parentheses])
```

## 🔍 Recording Criteria (AI Self-Check)

Before suggesting a memory save, validate:

### Primary Question

**"Will this inform future AI-driven development sessions?"**

### ✅ YES - Record These:

- **Nuanced bug situations**: Timing issues, DOM measurements, race conditions, browser quirks
- **Project-specific patterns**: Architecture decisions, team conventions, code organization approaches
- **Human-shared context**: Developer preferences, team standards, external constraints, business requirements
- **Non-obvious decision rationale**: Why approach A over B when both seemed viable
- **Research findings from planning**: Options explored, trade-offs analyzed, decisions made
- **External constraints**: Browser support requirements, library limitations, API constraints
- **Discoveries during implementation**: Patterns found in codebase, architectural insights

### ❌ NO - Skip These:

- Straightforward implementations AI already knows (basic CRUD, simple components)
- Common patterns without project-specific variation (standard TypeScript typing, typical React hooks)
- Simple bug fixes with obvious solutions (typos, basic logic errors)
- Work that follows well-established project patterns without deviation

### Context Reset Awareness

**If context was reset during session:**

- Review available context for early decisions made before reset
- Ask user: "Were there important decisions earlier in the session I should capture?"
- Prioritize recording significant early work that might otherwise be lost

## 🎯 Quality Standards

**Concise but Complete**: Essential info without verbose details (aim for 2-3 minute read time)

**Future-Focused**: Information useful for similar future problems, not historical documentation

**Decision-Oriented**: Why choices were made, not just what was done

**Searchable**: Descriptive titles for easy grep searching (avoid generic titles like "Fix bug" or "Add feature")

**Cross-Referenced**: Connected to related work in other categories for complete context

**Principle-Heavy**: 80% transferable insights, 20% implementation specifics

## 🚀 Expected Outcome

A well-organized memory entry that:

- Takes 2-3 minutes to read and understand
- Provides actionable insights for future similar work
- Connects properly to related memories across categories
- Uses optimized format for efficient AI context loading
- Combines implementation details with broader lessons learned
- Includes decision frameworks for when to apply principles

## 💡 Example Workflow

**Scenario:** Just implemented JWT authentication with token refresh

1. **AI validates criteria**: ✓ Project-specific auth pattern ✓ Non-obvious CORS solution ✓ Substantive work

2. **AI checks categories**:
   - `architecture.md` exists ✓
   - `auth-patterns.md` doesn't exist
3. **AI suggests**: "This looks like authentication-specific work. Should I create `auth-patterns.md`?"

4. **User approves**

5. **AI creates**:
   - New `auth-patterns.md` from category template
   - AUTH-1 entry with JWT implementation details
   - Captures: CORS issue with refresh tokens, solution, learning
6. **AI updates**:
   - Quick Reference in auth-patterns.md
   - README.md category index
   - Suggests loading strategy: "Auth work: Load `auth-patterns.md` + `api-integration.md`"

## ⚡ Smart Checkpoint Support

This command can be triggered at natural breakpoints:

- After planning phase completes (research/decision memories)
- Before context reset (capture current learnings)
- After major milestones (significant features/refactors)
- After significant discoveries (nuanced bugs/patterns)

**User always in control:**

- Save Now: Record immediately
- Save Later: Remind at session end
- Not Valuable: Skip this checkpoint

## 🔧 Technical Notes

**Bootstrap Templates Source:** Uses templates from ai-toolkit `.cursor/templates/` directory

**File Operations:**

- Creates directories if needed
- Appends to existing category files (never overwrites)
- Updates README.md when adding categories
- Preserves existing content and formatting

**Error Handling:**

- If template not found: Use inline basic template
- If category file malformed: Append entry anyway, note for manual review
- If README missing but categories exist: Create README from current state

---

**Remember:** This command maintains the project's memory system - a knowledge base that makes AI progressively better at understanding project patterns, conventions, and lessons learned. Quality and relevance over quantity! 🎯
