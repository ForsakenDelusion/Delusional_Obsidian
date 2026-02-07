<%*
// --- 0. 强制重命名逻辑 (单行优雅版) ---
let title = tp.file.title;
if (title.startsWith("未命名") || title.startsWith("Untitled")) {
    title = await tp.system.prompt("请输入文件名:", "");
    
    if (title) { await tp.file.rename(title); }
    else { 
        // 没起名？那就用时间戳兜底，别留着"未命名"
        await tp.file.rename("Note_" + tp.date.now("HHmmss")); 
    }
}
-%>
---
type: source
title: "<% title %>"
created: <% tp.file.creation_date("YYYY-MM-DD") %>
source_url: ""
tags:
---

## TL;DR（一句话结论）
- 
