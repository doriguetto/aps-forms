# Initialize Memories Command 🏗️

Explicitly set up the memory system framework in the current project. This command creates the foundational structure with README and 3 core category files, establishing a consistent memory management foundation.

## 🎯 Purpose

**Proactive Setup**: Initialize memory system before recording first memory, useful for:

- Team projects requiring consistent structure from start
- Setting up memory system as part of project scaffolding
- Ensuring clean initial commit with memory framework

**Alternative to Implicit**: While `save-memories` will auto-initialize when needed, this command gives explicit control over when the framework is set up.

## 📋 What This Command Creates

### Directory Structure

```
project-root/
  .cursor/
    └── memories/
        ├── README.md                    # Category index + loading strategy
        ├── architecture.md              # Core category
        ├── development-principles.md    # Core category
        └── testing.md                   # Core category
```

### File Contents

**1. README.md**

- Category index with descriptions
- AI context loading strategy section
- Expected benefits explanation
- Placeholders for project-specific mappings

**2. architecture.md**

- Category title and description
- Core Principles section (empty, ready for first principles)
- Quick Reference section (empty, ready for entries)
- Template structure for consistency

**3. development-principles.md**

- Category title and description
- Core Principles section (empty, ready for frameworks)
- Quick Reference section (empty, ready for entries)
- Guidance on what belongs in this category

**4. testing.md**

- Category title and description
- Core Principles section (empty, ready for strategies)
- Quick Reference section (empty, ready for entries)
- Testing-specific guidance

## 🚀 Command Flow

### Pre-Check

1. Check if `.cursor/memories/` already exists in current project
2. If YES:
   - Inform user: "⚠️ Memory system already initialized in this project."
   - List existing categories
   - Ask: "Would you like to:\n A) View current structure\n B) Add a new category\n C) Cancel"
   - Proceed based on user choice

### Initialization (if directory doesn't exist)

1. **Create Directory**:

   ```
   Creating .cursor/memories/ directory...
   ```

2. **Copy Templates**:

   ```
   Creating README.md from template...
   Creating architecture.md from template...
   Creating development-principles.md from template...
   Creating testing.md from template...
   ```

3. **Confirm Success**:

   ```
   ✅ Memory system initialized!

   Created:
   - .cursor/memories/README.md (category index)
   - .cursor/memories/architecture.md (core category)
   - .cursor/memories/development-principles.md (core category)
   - .cursor/memories/testing.md (core category)

   Next steps:
   - Start recording memories with 'save-memories' command
   - Additional categories will be created as needed
   - Review README.md for loading strategy guidance
   ```

## 📝 Template Customization

After initialization, consider customizing:

**README.md**:

- Add project-specific context to description
- Define initial loading strategy mappings
- Document any project-specific category conventions

**Category Files**:

- Add initial Core Principles if known
- Document team conventions in development-principles.md
- Set up architecture decision frameworks

## 🎯 When to Use This Command

**✅ Good Times to Initialize**:

- **Project Start**: Setting up new project with memory system from beginning
- **Team Onboarding**: Establishing consistent memory structure across team
- **Post-Bootstrap**: After initial project setup, before first feature work
- **Documentation Setup**: As part of comprehensive project documentation approach

**⚠️ Not Necessary**:

- **Personal Projects**: Implicit initialization via save-memories is fine
- **Experimental Work**: Let categories grow organically as needed
- **Existing Projects**: If already using save-memories, system auto-initializes

## 🔄 Relationship to save-memories

**Two Paths, Same Destination**:

**Explicit Path** (this command):

```
1. Run init-memories
2. Memory system ready
3. Use save-memories anytime
```

**Implicit Path** (save-memories auto-init):

```
1. Run save-memories (first time)
2. AI detects no memory system
3. Auto-initializes with same structure
4. Proceeds to save memory
```

**Result**: Identical structure regardless of path chosen

## 💡 Example Usage

### Scenario 1: New Team Project

```
Developer: "We're starting a new React + TypeScript project. Set up the memory system."

AI runs init-memories command:
✅ Created .cursor/memories/ with README + 3 core categories

Developer: "Great! Let's document our architecture decisions as we go."
[Uses save-memories throughout development]
```

### Scenario 2: Already Exists

```
Developer: "Initialize memories"

AI: "⚠️ Memory system already initialized in this project.

     Existing categories:
     - architecture.md (5 entries)
     - development-principles.md (3 entries)
     - testing.md (2 entries)
     - typescript-development.md (4 entries)

     Would you like to:
     A) View current structure
     B) Add a new category
     C) Cancel"

Developer: "A"

AI: [Shows README.md content with category index]
```

### Scenario 3: Mid-Project Setup

```
Developer: "I want to start tracking architectural decisions. Set up memories."

AI runs init-memories command:
✅ Memory system initialized!

AI: "Since you mentioned architectural decisions, I can start recording those
     in development-principles.md or architecture.md. Ready to record one now?"

Developer: "Yes, let's document our decision to use service-oriented architecture."

[AI uses save-memories to record first entry]
```

## 🔧 Technical Details

**Template Source**: Uses templates from `ai-toolkit/.cursor/templates/` directory:

- `readme-template.md` → README.md
- `category-template.md` → Used for each core category (with customization)

**File Creation**:

- Creates `.cursor/` directory if needed
- Creates `memories/` subdirectory
- Copies and customizes templates for each file
- Sets appropriate file permissions

**Error Handling**:

- If templates not found: Uses inline fallback templates
- If directory creation fails: Reports error with cause
- If files partially created: Reports what succeeded, what failed

**Idempotency**:

- Safe to run multiple times (checks existence first)
- Won't overwrite existing memory system
- Offers alternatives if already initialized

## ✅ Success Indicators

After running this command successfully:

- ✅ `.cursor/memories/` directory exists
- ✅ README.md provides category index and loading strategy
- ✅ Three core category files ready for entries
- ✅ Consistent structure across all projects using ai-toolkit
- ✅ Ready to use `save-memories` command
- ✅ Team has shared memory framework

## 🎯 Best Practices

**After Initialization**:

1. **Review README**: Understand loading strategy and category purposes
2. **Customize if Needed**: Add project-specific context to README
3. **Share with Team**: Commit memory framework with initial project setup
4. **Start Recording**: Use save-memories after completing first significant work
5. **Grow Organically**: Let additional categories emerge based on project needs

**Don't**:

- Don't initialize multiple times (check first)
- Don't manually edit category structure (use templates)
- Don't create all possible categories upfront (grow organically)
- Don't worry about getting it perfect (structure can evolve)

## 📚 Related Commands

- **save-memories**: Record new memories (auto-initializes if needed)
- **audit-memories**: Review and clean up existing memories
- **memory-management.mdc**: Full documentation of memory system

---

**Remember**: This command sets up the foundation, but the real value comes from consistently recording memories with `save-memories` as you build and learn! 🚀
