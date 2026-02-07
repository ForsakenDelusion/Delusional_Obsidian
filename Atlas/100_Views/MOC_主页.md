---
type: view
created: 2026-02-07
---
---
```dataviewjs
const configNote = dv.page("Toolkit/config");
const notesPath = configNote.paths.notes;

const allNotes = dv.pages(`"${notesPath}"`);
const totalCount = allNotes.length;

const withCategory = allNotes.where(p => p.category && p.category !== "未分类");
const withoutCategory = totalCount - withCategory.length;

dv.paragraph(`**总笔记数**: ${totalCount} | **已分类**: ${withCategory.length} | **未分类**: ${withoutCategory}`);
```

---

> [!NOTE]+ 最近聚焦的项目
> ```dataviewjs
> const configNote = dv.page("Toolkit/config");
> const projectsRoot = configNote.paths.projects;
> 
> const now = dv.date(new Date().toISOString().split('T')[0]);
> const start = now.minus({ days: 30 });
> 
> const pages = dv.pages(`"${projectsRoot}"`).where(p => p.file.mtime >= start);
> 
> if (pages.length === 0) {
>     dv.paragraph("_最近30天无项目更新_");
> } else {
>     const projectMap = new Map();
>     
>     for (let p of pages) {
>         const folderPath = p.file.folder;
>         const projectName = folderPath.replace(projectsRoot + "/", "").split("/")[0];
>         
>         if (!projectMap.has(projectName) || p.file.mtime > projectMap.get(projectName).mtime) {
>             projectMap.set(projectName, {
>                 name: projectName,
>                 mtime: p.file.mtime,
>                 status: p.status || "进行中",
>                 link: `[[${projectsRoot}/${projectName}|${projectName}]]`
>             });
>         }
>     }
>     
>     const sortedProjects = Array.from(projectMap.values())
>         .sort((a, b) => b.mtime - a.mtime)
>         .slice(0, 10);
>     
>     dv.table(
>         ["项目", "最后更新", "状态"],
>         sortedProjects.map(proj => [
>             proj.link,
>             proj.mtime.toFormat("yyyy-MM-dd"),
>             proj.status
>         ])
>     );
> }
> ```

---

---

> [!NOTE]+ 所有标签
> ```dataviewjs
> const configNote = dv.page("Toolkit/config");
> const notesPath = configNote.paths.notes;
> 
> const allNotes = dv.pages(`"${notesPath}"`);
> 
> // Collect all unique tags
> const tagSet = new Set();
> allNotes.forEach(p => {
>     if (p.tags) {
>         const tagArray = Array.isArray(p.tags) ? p.tags : [p.tags];
>         tagArray.forEach(tag => tagSet.add(tag));
>     }
> });
> 
> const uniqueTags = Array.from(tagSet).sort();
> 
> if (uniqueTags.length === 0) {
>     dv.paragraph("_暂无标签_");
> } else {
>     // Display as inline links
>     const tagLinks = uniqueTags.map(tag => `\`${tag}\``).join(" · ");
>     dv.paragraph(tagLinks);
> }
> ```

---

> [!NOTE]+ 按分类浏览
> ```dataviewjs
> // ================= 1. Load Configuration =================
> const configNote = dv.page("Toolkit/config");
> if (!configNote || !configNote.categories) {
>     dv.paragraph("⚠️ 无法读取分类配置，请检查 Toolkit/config.md");
> } else {
>     const categories = configNote.categories;
>     const notesPath = configNote.paths.notes;
> 
>     // ================= 2. Load All Notes =================
>     const allNotes = dv.pages(`"${notesPath}"`);
> 
>     if (allNotes.length === 0) {
>         dv.paragraph("📭 暂无笔记");
>     } else {
>         // ================= 3. Render Each Category =================
>         for (const category of categories) {
>             // Filter notes in this category
>             const categoryNotes = allNotes.where(p => p.category === category);
>             
>             // Build header with link to sub-MOC
>             const subMocLink = `[[MOC_${category}|${category}]]`;
>             const count = categoryNotes.length;
>             
>             dv.header(3, `${subMocLink} (${count})`);
>             
>             if (count === 0) {
>                 dv.paragraph("_暂无笔记_");
>                 continue;
>             }
>             
>             // Show recent 5 notes with metadata
>             const recentNotes = categoryNotes
>                 .sort(p => p.file.mtime, "desc")
>                 .limit(5);
>             
>             dv.table(
>                 ["笔记", "状态", "标签", "最后修改"],
>                 recentNotes.map(p => [
>                     p.file.link,
>                     p.status || "—",
>                     p.tags ? (Array.isArray(p.tags) ? p.tags.join(", ") : p.tags) : "—",
>                     p.file.mtime.toFormat("yyyy-MM-dd")
>                 ])
>             );
>         }
>     }
> }
> ```

---

> [!NOTE]+ 最近更新
> ```dataviewjs
> const configNote = dv.page("Toolkit/config");
> const notesPath = configNote.paths.notes;
> 
> const recentNotes = dv.pages(`"${notesPath}"`)
>     .sort(p => p.file.mtime, "desc")
>     .limit(10);
> 
> dv.table(
>     ["笔记", "分类", "最后修改"],
>     recentNotes.map(p => [
>         p.file.link,
>         p.category || "未分类",
>         p.file.mtime.toFormat("yyyy-MM-dd HH:mm")
>     ])
> );
> ```
