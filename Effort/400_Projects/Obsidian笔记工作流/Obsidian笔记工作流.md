---
type: project
status: active
start_date: 2026-02-07
due_date: 
completed_date:
tags: []
---
> [!btn]
> - `button-createprojfile`

> [!NOTE]- 项目附属文件
> ```dataviewjs
> const curr = dv.current();
> 
> const projFiles = dv.pages(`"${curr.file.folder}"`)
>     .where(p => {
>         if (p.file.path === curr.file.path) return false;
>         
>         if (p.file.frontmatter.type !== "project-file") return false;
>         
>         const related = p.file.frontmatter.related;
>         if (!related) return false;
>         
>         if (Array.isArray(related)) {
>             return related.some(link => {
>                 if (link && link.path === curr.file.path) return true;
>                 if (typeof link === 'string') {
>                     const match = link.match(/\[\[(.*?)(?:\|.*)?\]\]/);
>                     const linkName = match ? match[1] : link;
>                     return curr.file.name === linkName || curr.file.path.endsWith(linkName + ".md");
>                 }
>                 return false;
>             });
>         } else if (related.path === curr.file.path) {
>             return true;
>         } else if (typeof related === 'string') {
>             const match = related.match(/\[\[(.*?)(?:\|.*)?\]\]/);
>             const linkName = match ? match[1] : related;
>             return curr.file.name === linkName || curr.file.path.endsWith(linkName + ".md");
>         }
>         
>         return false;
>     });
> 
> if (projFiles.length === 0) {
>     dv.paragraph("🍃 *暂无项目附属文件*");
> } else {
>     const roleGroups = {
>         "log": "📋 Log",
>         "research": "🔍 Research", 
>         "resource": "📚 Resource"
>     };
>     
>     for (const [role, label] of Object.entries(roleGroups)) {
>         const roleFiles = projFiles.where(p => p.file.frontmatter.role === role);
>         if (roleFiles.length > 0) {
>             dv.header(3, label);
>             dv.list(roleFiles.map(p => p.file.link));
>         }
>     }
> }
> ```


## 思路
[[Obsidian笔记重构]]


## 材料

- https://www.bilibili.com/video/BV1MM4m1R7Tj 侧重于Zotero集成
- https://zhuanlan.zhihu.com/p/1912968515327075959 卡片笔记思路以及具体实现参考
- https://www.bilibili.com/video/BV1pkpFe9EUw/ 很多好思路
- https://github.com/DuskWasHere/dusk-obsidian-vault 很帅的repo，一些插件可以抄过来
- https://forum-zh.obsidian.md/t/topic/67/7 一种新的笔记组织方式
- https://garden.oldwinter.top/ 数字obsidian卡片实例
- https://notes.oldwinter.top/ 同上
- https://www.bilibili.com/video/BV1vJ6GBbEv5/?spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=a050735bf251f44101103e1314e38fe9 这个home和思路非常值得借鉴
- https://www.bilibili.com/video/BV1CG411974Z/?spm_id_from=333.337.search-card.all.click&vd_source=a050735bf251f44101103e1314e38fe9 上述视频中借鉴的模型
## 链接

- https://anytype.io/ 类似产品

## 目标阐述

// 这一步做目标分析，并且对任务做拆解

## 任务
- [x] 基本框架  [completion:: 2026-01-16]
- [-] 插入sources card的过程采用quickadd什么的自动完成 这个转用templater router来实现
- [ ] proj视图（view），主页显示的proj实际是是proj视图，包含特定proj下的所有文件，和概览
- [ ] notebook navigator
- [ ] homepage设计参考
- [ ] pdf++
- [ ] zotero集成

## Related

```dataviewjs
// ================= 配置加载区 =================
const DEBUG = false; // ⚠️ 调试模式开关

// 1. 读取配置文件
const configNote = dv.page("Toolkit/config"); 

// 【修正点】这里不再使用 return，而是用 if/else 包裹
if (!configNote || !configNote.paths) {
    // 🔴 情况A：配置读取失败，显示错误
    dv.header(2, "⚠️ 错误：未找到 _Config 文件或 paths 配置属性");
    dv.paragraph("请检查是否创建了 _Config 笔记，且 YAML 格式正确。");
    
} else {
    // 🟢 情况B：配置读取成功，执行主逻辑
    
    // 2. 从配置中提取路径
    const P = configNote.paths;

    // 3. 定义分组
    const targetGroups = [
        { path: P.notes,    label: "📝 Notes (Atlas)" },
        { path: P.areas,    label: "🏔️ Areas" },
        { path: P.projects, label: "🚀 Projects" },
        { path: P.daily,    label: "📅 Daily Log" }
    ];

    // ================= 逻辑处理区 =================
    const curr = dv.current();
    const indirectPaths = new Set();
    const debugLog = [];

    if (DEBUG) debugLog.push(`**当前文件**: ${curr.file.name}`);

    // --- Step 1 & 2: 捕获间接引用 ---
    const siblings = dv.pages(`"${curr.file.folder}"`)
        .where(p => p.file.path !== curr.file.path);

    for (let sib of siblings) {
        const related = sib.file.frontmatter.related;
        if (!related) continue;

        let isRelatedToCurrentProject = false;
        const links = Array.isArray(related) ? related : [related];

        for (let link of links) {
            if (link && link.path === curr.file.path) {
                isRelatedToCurrentProject = true;
            } 
            else if (typeof link === 'string') {
                const match = link.match(/\[\[(.*?)(?:\|.*)?\]\]/);
                const linkName = match ? match[1] : link;
                if (curr.file.name === linkName || curr.file.path.endsWith(linkName + ".md")) {
                     isRelatedToCurrentProject = true;
                }
            }
        }

        if (isRelatedToCurrentProject) {
            if(DEBUG) debugLog.push(`✅ 发现关联文档: [${sib.file.name}]`);
            sib.file.outlinks.forEach(l => {
                if (l.path !== curr.file.path) indirectPaths.add(l.path);
            });
        }
    }

    if (DEBUG) debugLog.push(`**间接引用数**: ${indirectPaths.size}`);

    // --- Step 3: 动态构建查询 ---
    const querySource = targetGroups
        .map(g => `"${g.path}"`)
        .join(" or ");

    if (DEBUG) debugLog.push(`**查询范围**: ${querySource}`);

    const pages = dv.pages(querySource)
        .where(p => {
            if (p.file.path === curr.file.path) return false;
            
            const isDirectlyLinked = p.file.outlinks.some(l => l.path === curr.file.path) ||
                                     p.file.inlinks.some(l => l.path === curr.file.path);
            if (isDirectlyLinked) return true;

            if (indirectPaths.has(p.file.path)) return true;
            
            return false;
        });

    // ================= 渲染输出区 =================

    if (pages.length === 0) {
        dv.paragraph("🍃 *当前路径下的相关模块没有发现关联条目*");
    }

    if (DEBUG) {
        dv.header(2, "🐛 Debug Info");
        dv.list(debugLog);
        dv.header(2, "📋 Result");
    }

    for (const group of targetGroups) {
        const groupPages = pages.where(p => p.file.path.startsWith(group.path));

        if (groupPages.length > 0) {
            dv.header(3, group.label);
            dv.list(groupPages.map(p => p.file.link));
        }
    }
} // <--- 别漏了这个大括号，它是 else 的结束
```
