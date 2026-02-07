module.exports = async (params) => {
    const { quickAddApi: QuickAdd, app } = params;

    // ================= 1. 读取 _Config 配置 =================
    const configPath = "Toolkit/config.md";
    const configFile = app.vault.getAbstractFileByPath(configPath);

    if (!configFile) {
        new Notice(`❌ 错误：找不到配置文件 ${configPath}`);
        return;
    }

    // 获取 YAML frontmatter 数据
    const cache = app.metadataCache.getFileCache(configFile);
    const paths = cache?.frontmatter?.paths;

    // 安全检查：确保关键路径配置存在
    if (!paths || !paths.projects || !paths.templaters_proj) {
        new Notice("❌ 配置不完整：请检查 _Config 中的 paths.projects 和 paths.templaters_proj");
        return;
    }

    // ================= 2. 用户交互 =================
    const projectName = await QuickAdd.inputPrompt("请输入项目名称：");
    if (!projectName) {
        new Notice("已取消创建");
        return;
    }

    // ================= 3. 路径构造 =================
    // 3.1 目标文件夹路径 (从 Config 读取 projects 路径 + 项目名)
    // 示例: Effort/400_Projects / MyProject
    const projectRoot = paths.projects.replace(/\/$/, ""); // 去掉末尾可能的斜杠
    const projectFolderPath = `${projectRoot}/${projectName}`;

    // 3.2 目标 Dashboard 文件路径
    const dashboardFileName = `${projectName}.md`;
    const dashboardFilePath = `${projectFolderPath}/${dashboardFileName}`;

    // 3.3 模板文件路径 (自动补全 .md 后缀)
    let templatePath = paths.templaters_proj;
    if (!templatePath.endsWith(".md")) {
        templatePath += ".md";
    }

    // ================= 4. 执行文件操作 =================

    // 4.1 创建项目文件夹
    try {
        await app.vault.createFolder(projectFolderPath);
    } catch (error) {
        // 如果文件夹已存在，忽略错误继续执行；如果是其他错误则报错
        if (!error.message.includes("already exists")) {
            new Notice(`⚠️ 创建文件夹失败: ${error.message}`);
            return;
        }
    }

    // 4.2 读取模板
    const templateFile = app.vault.getAbstractFileByPath(templatePath);
    if (!templateFile) {
        new Notice(`❌ 找不到模板文件，请检查 Config 路径:\n${templatePath}`);
        return;
    }
    let templateContent = await app.vault.read(templateFile);

    // 4.3 替换变量 (使用 moment 获取当前日期，更稳健)
    const dateStr = window.moment().format("YYYY-MM-DD");

    templateContent = templateContent
        .replace(/{{VALUE:项目名称}}/g, projectName)
        .replace(/{{DATE:YYYY-MM-DD}}/g, dateStr);

    // 4.4 创建 Dashboard 文件
    try {
        const dashboardFile = await app.vault.create(dashboardFilePath, templateContent);

        // 4.5 打开新文件
        const leaf = app.workspace.getLeaf(false);
        await leaf.openFile(dashboardFile);

        new Notice(`✅ 项目 "${projectName}" 初始化完成！`);

    } catch (error) {
        new Notice(`❌ 文件创建失败 (可能文件已存在): ${error.message}`);
    }
};