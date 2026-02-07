# Areas vs Projects - Quick Reference Guide

## The Fundamental Distinction

| Aspect | **Area** (Responsibility) | **Project** (Goal) |
|--------|--------------------------|------------------|
| **Definition** | Ongoing domain of responsibility | Time-bound initiative with clear endpoint |
| **Scope** | Continuous, never ends | Defined start & end dates |
| **Deadline** | ❌ None (ongoing) | ✅ YES (due_date field) |
| **Status** | Active or Archived | Active or Completed |
| **Example** | Learning, Development, Life | 考研复试机试, VibeCoding, macOS配置 |
| **Folder** | 200_Areas (PROPOSED) | 30_Projects (EXISTS) |
| **Frontmatter Type** | type: area | type: project |

---

## Your 5 Life Domains (Areas)

```
┌─────────────────────────────────────────────────────────────┐
│                  5 LIFE DOMAINS (TEMPLATE)                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🎓 Learning ................. Academic + skill development  │
│  💻 Development .............. Software + tools engineering  │
│  🏠 Life ..................... Personal infrastructure       │
│  🔬 Research ................. (Available but unused)        │
│  ✍️  Writing .................. (Available but unused)        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Active Areas & Current Projects

#### 🎓 Learning (70% of workload)
- 考研复试机试 (Graduate exam algorithms, due Feb 28)
- 考研项目 (Multiple graduate projects)
- Obsidian笔记工作流 (Knowledge system design)
- 阅读暗时间 (Reading project)

#### 💻 Development (14%)
- VibeCoding (CLI tools, agents, watch app)

#### 🏠 Life (14%)
- macOS配置 (System setup and configuration)

#### 🔬 Research (0%)
- *None currently*

#### ✍️ Writing (0%)
- *None currently*

---

## Current Implementation

### ✅ What Exists
```
30_Projects/                          ← Projects are here
├── 考研复试机试/
├── 考研项目/
├── VibeCoding/
├── Obsidian笔记工作流/
├── 阅读暗时间/
└── macOS配置.md

Templates/00_Template/Zettelkasten/Proj.md
└── Contains area definition in template logic
    const areas = ["Development (开发)", "Research (研究)", ...]
```

### ❌ What's Missing
```
200_Areas/                           ← DOESN'T EXIST YET
├── 200_Learning/
│   └── _Learning.md (type: area)
├── 200_Development/
│   └── _Development.md
├── 200_Life/
│   └── _Life.md
├── 200_Research/
│   └── _Research.md
└── 200_Writing/
    └── _Writing.md
```

---

## Frontmatter Examples

### Current Project Structure
```yaml
---
type: project
title: 考研复试机试
area: "Learning"                    # ← STRING reference (not linked)
status: active
start_date: 2026-01-18
due_date: 2026-02-28                # ← KEY: Has deadline
completed_date: 
tags: []
---
```

### Proposed Area Structure (To Create)
```yaml
---
type: area                          # ← New type
title: Learning
description: Academic preparation and skill development
status: active
created_date: 2026-01-15
emoji: 🎓
projects:
  - [[30_Projects/考研复试机试/考研复试机试.md]]
  - [[30_Projects/Obsidian笔记工作流/Obsidian笔记工作流.md]]
  - [[30_Projects/复试项目/考研-深度学习.md]]
---
```

---

## The Link Hierarchy

```
AREA (Responsibility Zone)
  │
  ├─→ PROJECT 1 (Time-bound goal)
  │   │
  │   ├─→ Sub-file: Week1.md
  │   ├─→ Sub-file: Week2.md
  │   └─→ Links to: [[20_Cards/21_机试算法/*]]
  │
  └─→ PROJECT 2 (Time-bound goal)
      │
      └─→ Links to: [[20_Cards/*]]
```

**Key Insight**: One area can contain many projects, and projects share cards.

---

## Area vs Project: Decision Tree

### How to Tell the Difference?

**Does it have a fixed deadline?**
- ✅ YES → It's a **PROJECT**
- ❌ NO → It's an **AREA** (or ongoing project without deadline)

**Can you complete it and be done?**
- ✅ YES → It's a **PROJECT**
- ❌ NO → It's an **AREA** (always needs attention)

**Is it a domain/responsibility/life area?**
- ✅ YES → It's an **AREA**
- ❌ NO → It's a **PROJECT**

**Can multiple projects exist within it?**
- ✅ YES → It's an **AREA**
- ❌ NO → It's a **PROJECT**

---

## Dataview Usage

### Current Filter (Week_Daily.md)
```javascript
p.type == "project" &&
p.area                              // Filters by area field
```

### Future Filter (after redesign)
```javascript
p.type == "project" &&
p.area.path.includes("200_Learning") // Filters by area file
```

### Area Dashboard Query (to create)
```javascript
dv.pages('"200_Areas"')
  .where(p => p.type == "area")
  .map(area => ({
    "Area": area.title,
    "Projects": /* count projects with this area */,
    "Completed": /* count completed */,
    "Status": area.status
  }))
```

---

## Action Items for Redesign

### Phase 1: Create Infrastructure ⚙️
- [ ] Create `200_Areas/` folder
- [ ] Create 5 subfolders: `200_Learning/`, `200_Development/`, etc.
- [ ] Create `_Learning.md`, `_Development.md`, `_Life.md`, `_Research.md`, `_Writing.md`
- [ ] Add frontmatter to each (type: area, description, emoji)

### Phase 2: Update References 🔗
- [ ] Update project template: `area: [[200_Learning/_Learning.md]]`
- [ ] Update existing projects: convert string → wikilink
- [ ] Verify backlinks in Obsidian

### Phase 3: Build Dashboards 📊
- [ ] Add project roster to each area file
- [ ] Add Dataview query for project status
- [ ] Add area-specific resources section
- [ ] Add area KPIs (# projects, completion %)

### Phase 4: Update Filters 🎯
- [ ] Modify Week_Daily.md area filter
- [ ] Create area-based daily views
- [ ] Create area-based project timeline
- [ ] Create area selector in main dashboard

---

## Quick Facts About Your System

| Metric | Value |
|--------|-------|
| **Total Projects** | 8+ |
| **Active Areas** | 3 (Learning, Development, Life) |
| **Unused Areas** | 2 (Research, Writing) |
| **Learning Dominance** | 70% of all projects |
| **Largest Project** | 考研复试机试 (with 3+ sub-files) |
| **Total Folders in 30_Projects** | 5 |
| **Frontmatter Fields Used** | type, title, area, status, start_date, due_date |
| **Area Implementation** | String metadata only (not linked) |
| **MOCs Created** | 0 (for areas) |

---

## Key Insight: The TIME-BOUND Factor

The **single most important distinguishing feature** between an area and a project is:

```
📅 Does it have a deadline (due_date)?

  YES → PROJECT
  NO  → AREA
```

This is how your system differentiates:
- **Projects** have `due_date: YYYY-MM-DD` (or empty for ongoing)
- **Areas** have no deadline (ongoing forever)

---

## Files You've Been Given

1. **Areas_vs_Projects_Analysis.md**
   - Comprehensive analysis with tables, examples, recommendations
   
2. **Area_Project_Visualization.txt**
   - ASCII diagrams of vault structure and relationships
   
3. **areas-summary.txt**
   - Quick reference card
   
4. **QuickReference_Areas_Projects.md** ← You are here
   - This file - quick lookup guide

---

**Last Updated**: Feb 5, 2026  
**Status**: Ready for redesign phase planning
