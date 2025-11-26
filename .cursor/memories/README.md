# Project Memory System - Table of Contents

Complete project knowledge combining implementation memories and lessons learned, organized into category-based files for efficient AI context loading.

## 📚 Memory Categories

### 🏗️ [Component Architecture & Design](architecture.md)

Component design patterns, system architecture, structural decisions, interface design, and architectural principles.

### 🎯 [Development Principles](development-principles.md)

Strategic decision-making frameworks, refactoring methodologies, enterprise constraints, code quality processes, and cross-cutting principles.

### 🧪 [Testing & Quality Assurance](testing.md)

Testing strategies, coverage approaches, quality assurance patterns, test architecture, and validation frameworks.

### 🎨 [CSS Styling](css-styling.md)

Styling patterns, theme decisions, and visual system guidelines.

<!-- Additional categories will be added here as they are created -->

## 🎯 AI Context Loading Strategy

### **Intelligent Category Loading:**

<!-- Customize these mappings based on your project's actual categories -->

- **Architecture Work:** Load `architecture.md` + `development-principles.md`
- **Testing Issues:** Load `testing.md` + related implementation categories
- **Planning/Strategy:** Load `development-principles.md` + `architecture.md`

<!-- Add more mappings as new categories are created:
- **[Work Type]:** Load `[category].md` + `[related-category].md`
-->

### **Targeted Entry Reading:**

```bash
# Find specific entry by ID
grep "## ARCH-5:" architecture.md

# Find entries by topic
grep -i "authentication" */memories/*.md
```

### **Expected Benefits:**

- **70-85% Context Reduction:** Load 300-800 lines vs 6,000+ total lines
- **Complete Context:** Each entry provides both implementation details and lessons learned
- **Single Source of Truth:** No dual maintenance or conflicting information
- **Principle-Heavy Focus:** 80% transferable insights, 20% implementation context

## 📝 How to Use This System

### Recording Memories

Use the `save-memories` command after completing significant work:

- Nuanced bugs or discoveries
- Architectural decisions
- Project-specific patterns
- Human-shared context

### Finding Relevant Memories

1. Check this README for category descriptions
2. Identify relevant categories for your current work
3. Load only those category files (not all memories)
4. Use Quick Reference section in each file for overview

### Maintaining Quality

- Use `audit-memories` command periodically for cleanup
- Remove deprecated entries
- Consolidate duplicate insights
- Keep memory base focused and valuable

## 🎯 Project Context

**Project Type:** Document-based web forms runtime

**Tech Stack:** JavaScript, HTML, CSS, Playwright tests

**Memory Categories:** 3 total

**Last Updated:** 2025-11-23


