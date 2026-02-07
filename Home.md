
> [!btn]+
> - `button-createproj`
> - `button-createtodo`
> - `button-createdaily`

> [!NOTE]+ 📝 未完成的TODO
> ```dataviewjs
> const configNote = dv.page("Toolkit/config");
> const todoPath = configNote?.paths?.todo || "Atlas/200_Period/204_TODO";
> 
> const allTasks = dv.pages(`"${todoPath}"`).file.tasks.where(t => t.text);
> const uncompletedTasks = allTasks.where(t => !t.completed);
> 
> dv.paragraph(`共 **${uncompletedTasks.length}** 项未完成任务`);
> 
> if (uncompletedTasks.length === 0) {
>     dv.paragraph("_暂无未完成任务_");
> } else {
>     dv.taskList(uncompletedTasks.slice(0, 20), false);
> }
> ```

> [!NOTE]- ✅ 已完成的TODO
> ```dataviewjs
> const configNote = dv.page("Toolkit/config");
> const todoPath = configNote?.paths?.todo || "Atlas/200_Period/204_TODO";
> 
> const allTasks = dv.pages(`"${todoPath}"`).file.tasks.where(t => t.text);
> const completedTasks = allTasks.where(t => t.completed);
> 
> dv.paragraph(`共 **${completedTasks.length}** 项已完成任务`);
> 
> if (completedTasks.length === 0) {
>     dv.paragraph("_暂无已完成任务_");
> } else {
>     dv.taskList(completedTasks.slice(0, 20), false);
> }
> ```

> [!NOTE]+ 最近聚焦的项目
> ```dataviewjs
> const configNote = dv.page("Toolkit/config");
> 
> if (!configNote || !configNote.paths) {
>     dv.paragraph("⚠️ 无法读取配置");
> } else {
>     const projectsRoot = configNote.paths.projects;
>     
>     // 获取最近30天内有修改的项目
>     const now = dv.date(new Date().toISOString().split('T')[0]);
>     const start = now.minus({ days: 30 });
>     
>     const pages = dv.pages(`"${projectsRoot}"`)
>         .where(p => p.file.mtime >= start);
>     
>     // 按项目文件夹聚合
>     const projectMap = new Map();
>     
>     for (let p of pages) {
>         const folderPath = p.file.folder;
>         if (folderPath === projectsRoot) continue;
>         
>         const relativePath = folderPath.replace(projectsRoot + "/", "");
>         const projectName = relativePath.split("/")[0];
>         if (!projectName) continue;
>         
>         if (!projectMap.has(projectName)) {
>             projectMap.set(projectName, {
>                 name: projectName,
>                 latestUpdate: p.file.mtime,
>                 status: p.status || "—"
>             });
>         } else {
>             const existing = projectMap.get(projectName);
>             if (p.file.mtime > existing.latestUpdate) {
>                 existing.latestUpdate = p.file.mtime;
>             }
>             if (existing.status === "—" && p.status) {
>                 existing.status = p.status;
>             }
>         }
>     }
>     
>     if (projectMap.size > 0) {
>         dv.table(
>             ["项目", "最近更新", "状态"],
>             Array.from(projectMap.values())
>                 .sort((a, b) => b.latestUpdate - a.latestUpdate)
>                 .slice(0, 10)
>                 .map(item => [
>                     `[[${projectsRoot}/${item.name}/${item.name}|${item.name}]]`,
>                     item.latestUpdate.toFormat("yyyy-MM-dd HH:mm"),
>                     item.status
>                 ])
>         );
>     } else {
>         dv.paragraph("💤 *最近30天没有项目活动*");
>     }
> }
> ```

> [!note]+ 管理面板
> - [[Base_Image.base]]
> - [[Base_MOC.base]]
> - [[MOC_主页]]

