---
type: view
category: 未分类
created: 2026-02-07
---
---
```dataviewjs
const currentCategory = dv.current().category;
const configNote = dv.page("Toolkit/config");
const notesPath = configNote.paths.notes;

const categoryNotes = dv.pages(`"${notesPath}"`)
    .where(p => p.category === currentCategory);

const totalCount = categoryNotes.length;
const withTags = categoryNotes.where(p => p.tags && p.tags.length > 0).length;
const withoutTags = totalCount - withTags;

dv.paragraph(`**总计**: ${totalCount} 篇 | **有标签**: ${withTags} | **无标签**: ${withoutTags}`);
```
---

> [!NOTE]+ 按标签浏览
> ```dataviewjs
> // ================= 1. Get Current Category =================
> const currentCategory = dv.current().category;
> const configNote = dv.page("Toolkit/config");
> const notesPath = configNote.paths.notes;
> 
> // ================= 2. Filter Notes in This Category =================
> const categoryNotes = dv.pages(`"${notesPath}"`)
>     .where(p => p.category === currentCategory);
> 
> if (categoryNotes.length === 0) {
>     dv.paragraph("📭 本分类暂无笔记");
> } else {
>     // ================= 3. Collect All Unique Tags =================
>     const tagSet = new Set();
>     const notesWithoutTags = [];
> 
>     categoryNotes.forEach(p => {
>         if (p.tags) {
>             const tagArray = Array.isArray(p.tags) ? p.tags : [p.tags];
>             tagArray.forEach(tag => tagSet.add(tag));
>         } else {
>             notesWithoutTags.push(p);
>         }
>     });
> 
>     const uniqueTags = Array.from(tagSet).sort();
> 
>     // ================= 4. Render Notes Grouped by Tag =================
>     if (uniqueTags.length > 0) {
>         for (const tag of uniqueTags) {
>             // Filter notes with this tag
>             const taggedNotes = categoryNotes.where(p => {
>                 if (!p.tags) return false;
>                 const tagArray = Array.isArray(p.tags) ? p.tags : [p.tags];
>                 return tagArray.includes(tag);
>             }).sort(p => p.file.mtime, "desc");
>             
>             if (taggedNotes.length === 0) continue;
>             
>             dv.header(3, `\`${tag}\` (${taggedNotes.length})`);
>             
>             dv.table(
>                 ["笔记", "状态", "创建日期", "最后修改"],
>                 taggedNotes.map(p => [
>                     p.file.link,
>                     p.status || "—",
>                     p.file.ctime.toFormat("yyyy-MM-dd"),
>                     p.file.mtime.toFormat("yyyy-MM-dd")
>                 ])
>             );
>         }
>     }
> 
>     // ================= 5. Render Notes Without Tags =================
>     if (notesWithoutTags.length > 0) {
>         dv.header(3, `🏷️ 未标记 (${notesWithoutTags.length})`);
>         
>         const sortedUntagged = dv.array(notesWithoutTags)
>             .sort(p => p.file.mtime, "desc");
>         
>         dv.table(
>             ["笔记", "状态", "创建日期", "最后修改"],
>             sortedUntagged.map(p => [
>                 p.file.link,
>                 p.status || "—",
>                 p.file.ctime.toFormat("yyyy-MM-dd"),
>                 p.file.mtime.toFormat("yyyy-MM-dd")
>             ])
>         );
>     }
> }
> ```

---

> [!NOTE]+ 最近更新
> ```dataviewjs
> const currentCategory = dv.current().category;
> const configNote = dv.page("Toolkit/config");
> const notesPath = configNote.paths.notes;
> 
> const recentNotes = dv.pages(`"${notesPath}"`)
>     .where(p => p.category === currentCategory)
>     .sort(p => p.file.mtime, "desc")
>     .limit(10);
> 
> if (recentNotes.length > 0) {
>     dv.table(
>         ["笔记", "标签", "最后修改"],
>         recentNotes.map(p => [
>             p.file.link,
>             p.tags ? (Array.isArray(p.tags) ? p.tags.join(", ") : p.tags) : "—",
>             p.file.mtime.toFormat("yyyy-MM-dd HH:mm")
>         ])
>     );
> } else {
>     dv.paragraph("📭 暂无笔记");
> }
> ```

---

← 返回 [[MOC_主页|知识库主页]]
