# Areas vs Projects: Current Structure Analysis

## Executive Summary

Your vault **does NOT yet have a dedicated 200_Areas folder**, but you have already established an **implicit area system** within your projects:

### Current Areas Identified (via `area` field in projects):
1. **Learning** (学习) - 4-5 projects
2. **Development** (开发) - 1-2 projects  
3. **Life** (生活/杂项) - 1 project
4. **Research** (研究) - 0 projects (available but unused)
5. **Writing** (写作) - 0 projects (available but unused)

---

## 1. AREA-RELATED STRUCTURES FOUND

### A. Project Template Areas Definition
**File**: `Templates/00_Template/Zettelkasten/Proj.md`

**Area Options Available** (hardcoded in template):
```javascript
const areas = [
    "Development (开发)", 
    "Research (研究)", 
    "Writing (写作)", 
    "Life (生活/杂项)",
    "Learning (学习)"
];
```

**Key Insight**: Areas are **5 fixed life domains** that act as category containers for projects.

---

### B. Actual Areas in Use (by project count)

| Area | Projects | Examples |
|------|----------|----------|
| **Learning** | 5 | 考研复试机试, 考研项目, Obsidian笔记工作流, 阅读暗时间 |
| **Development** | 1 | VibeCoding |
| **Life** | 1 | macOS配置 |
| **Research** | 0 | (undefined) |
| **Writing** | 0 | (undefined) |

**Project Breakdown by Area**:
```
30_Projects/
├── 复试项目/
│   ├── 考研-S081.md (area: Learning)
│   ├── 考研-深度学习.md (area: Learning)
│   ├── 科研入门.md (area: Learning)
│   └── ...
├── 复试机试/
│   └── 考研复试机试.md (area: Learning) 📌 **HAS CHILDREN TASKS**
├── Obsidian笔记工作流/
│   └── Obsidian笔记工作流.md (area: Learning)
├── 阅读暗时间/
│   └── 暗时间.md (area: Learning)
├── Vibecoding/
│   └── VibeCoding_proj.md (area: Development)
└── macOS配置.md (area: Life)
```

---

## 2. CURRENT AREAS vs PROJECTS DISTINCTION

### Projects (30_Projects/)
**Definition**: Time-bound, goal-oriented initiatives with clear endpoints

**Project Characteristics**:
- ✅ `status` field: active/completed
- ✅ `start_date`: YYYY-MM-DD
- ✅ `due_date`: defined deadline OR empty (ongoing)
- ✅ `completed_date`: when finished
- ✅ Hierarchical: Some projects have sub-files (Weeks, chapters)
- ✅ Output-focused: 产出 section for deliverables
- ✅ Templated structure with standardized sections

**Example Project Structure**:
```yaml
---
type: project
title: 考研复试机试
area: Learning          # ← Points to parent area
status: active
start_date: 2026-01-18
due_date: 2026-02-28    # ← TIME-BOUND
---
```

### Areas (Currently: Implicit, No Dedicated Folder)
**Definition**: Long-term responsibility zones that can contain multiple projects

**Area Characteristics** (Inferred from template):
- No dedicated folder structure yet
- Only referenced via `area:` field in projects
- **No frontmatter definition** (just strings)
- **No status tracking** (unlike projects)
- **Not ongoing-only**: Could theoretically house both ongoing and completed projects

**Problem**: Areas are metadata, not first-class objects with their own files/dashboards

---

## 3. FRONTMATTER PATTERNS FOR AREAS

### Project Frontmatter (Current)
```yaml
---
type: project
title: <Project Name>
area: "<English Area Name>"    # ← Area reference (string only)
status: active|completed
start_date: YYYY-MM-DD
due_date: YYYY-MM-DD | ""
completed_date: ""
tags: []
---
```

### Area Frontmatter (Proposed, Not Yet Implemented)
Currently **MISSING**. If you create 200_Areas folder, suggest:

```yaml
---
type: area
title: <Area Name>
description: <What this area encompasses>
status: active|archived
created_date: YYYY-MM-DD
projects: []  # Or link to related project files
color/emoji: 🎓 | 💻 | 🏠 | etc.
---
```

---

## 4. EXISTING LIFE DOMAINS (Based on Your Projects)

### 🎓 Learning (学习)
**Responsibility**: Academic preparation and skill development
- 考研复试机试 (Graduate exam prep - algorithms)
- 考研项目 (Graduate exam projects)
- 阅读暗时间 (Reading project)
- Obsidian笔记工作流 (Knowledge management)

**Pattern**: Most projects cluster here (70% of workload)

### 💻 Development (开发)
**Responsibility**: Software engineering and technical projects
- VibeCoding (Tools, CLI, agents, watch app)

**Pattern**: Smaller, more exploratory

### 🏠 Life (生活/杂项)
**Responsibility**: Personal infrastructure and quality of life
- macOS配置 (System setup)

**Pattern**: Maintenance/setup tasks

### 🔬 Research (研究) — Unused
**Responsibility**: Research projects, literature review, investigations
- Currently no projects here, but available in template

### ✍️ Writing (写作) — Unused
**Responsibility**: Content creation, blogging, documentation
- Currently no projects here, but available in template

---

## 5. HOW AREAS LINK TO PROJECTS (Current Pattern)

```
Area (Responsibility Zone)
  ↓ (labeled via `area` field)
Project (Time-bound goal)
  ↓ (optionally contains)
Sub-tasks/Weekly Logs (week1.md, week2.md, etc.)
  ↓ (link to)
Cards (20_Cards/ with knowledge & templates)
```

### Real Example: Learning Area
```
Learning Area
├── Project: 考研复试机试 (due: Feb 28)
│   ├── Week1.md (sub-file)
│   ├── Week2.md (sub-file)
│   ├── Week3.md (sub-file)
│   └── Links to: [[20_Cards/21_机试算法/*]]
├── Project: 考研项目 (due: TBD)
│   └── Links to: [[20_Cards/*]]
└── Project: Obsidian笔记工作流
    └── Links to: [[10_Sources/*]]
```

### Current Limitation
**Areas do NOT have**:
- ❌ Dedicated folder (`200_Areas/`)
- ❌ Individual area files with metadata
- ❌ Dashboard/MOC showing all projects in an area
- ❌ Status rollup (can't see health of entire area at a glance)

**Areas are ONLY**:
- ✅ String metadata on project files
- ✅ Used to filter/categorize in templates

---

## 6. DATAVIEW USAGE FOR AREA FILTERING

Your template `Week_Daily.md` already filters by area:

```javascript
p.type == "project" &&           // Check project type
p.area                           // Filter by area field
```

This suggests you could have:
- **Area dashboards** (not yet created)
- **Area-based filtering** in daily/weekly views
- **Area-level project counts** tracking

---

## 7. RECOMMENDED STRUCTURE FOR 200_AREAS FOLDER

### Option A: Lightweight (No Individual Area Files)
```
200_Areas/
├── README.md (area definitions & purpose)
└── (Area metadata stays in project files only)
```

### Option B: Full First-Class Structure (Recommended)
```
200_Areas/
├── 200_Learning/
│   ├── _Learning.md (area overview, projects, MOC)
│   └── (Projects reference this area)
├── 200_Development/
│   ├── _Development.md
│   └── (Projects reference this area)
├── 200_Life/
│   ├── _Life.md
│   └── (Projects reference this area)
├── 200_Research/
│   ├── _Research.md (ready for future use)
│   └── (Projects reference this area)
└── 200_Writing/
    ├── _Writing.md (ready for future use)
    └── (Projects reference this area)
```

Each area file would contain:
- Definition of the area
- List of all projects (with status)
- KPIs (# projects, completion rate, etc.)
- Area-specific resources/templates

---

## 8. SUMMARY TABLE: AREAS vs PROJECTS

| Aspect | Area (Responsibility) | Project (Goal) |
|--------|----------------------|----------------|
| **Scope** | Ongoing, domain-wide | Time-bound |
| **Status** | Active/Archived | Active/Completed |
| **Deadline** | None (ongoing) | Fixed (due_date) |
| **Folder** | 200_Areas (proposed) | 30_Projects (exists) |
| **Frontmatter** | type: area | type: project |
| **Example** | Learning, Development, Life | 考研复试机试, VibeCoding |
| **Count in your vault** | 5 defined, 3 active | 8+ projects |
| **Currently implemented?** | ❌ No dedicated structure | ✅ Yes |
| **Linked via** | area field in projects | Implicit (projects themselves) |

---

## 9. ACTION ITEMS FOR YOUR REDESIGN

### Phase 1: Create Area Infrastructure
- [ ] Create `200_Areas/` folder
- [ ] Create individual area files (`_Learning.md`, `_Development.md`, etc.)
- [ ] Add area frontmatter template with type: area

### Phase 2: Link Projects to Areas
- [ ] Update project template to reference area files: `area: [[200_Learning/_Learning]]`
- [ ] Update existing projects to use area links (not strings)

### Phase 3: Create Area Dashboards
- [ ] Area MOC showing all projects in that area
- [ ] Area status dashboard (% complete, active projects count)
- [ ] Area resource index (shared cards, templates)

### Phase 4: Update Filters & Views
- [ ] Update Dataview filters to use area frontmatter links
- [ ] Create area-based daily/weekly views
- [ ] Create area-based project timeline

---

## 10. KEY INSIGHTS FOR YOUR SYSTEM

1. **You already have the area concept** but it's implicit (string metadata)
2. **3 of 5 areas are actively used**: Learning > Development > Life (Research, Writing empty)
3. **Learning area is dominant**: 70% of projects live here
4. **Projects already link to cards**: Via [[20_Cards/*]] in project files
5. **No area-level dashboards exist yet**: Would be valuable for health tracking
6. **Area distinction is clear**: Time-bound (project) vs. responsibility zone (area)

---

