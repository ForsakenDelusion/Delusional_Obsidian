module.exports = async (params) => {
    const { quickAddApi: QuickAdd, app } = params;

    // ================= 1. 读取配置 =================
    const configPath = "Toolkit/config.md";
    const configFile = app.vault.getAbstractFileByPath(configPath);

    if (!configFile) {
        new Notice(`❌ 错误：找不到配置文件 ${configPath}`);
        return;
    }

    // 获取 YAML frontmatter 数据
    const cache = app.metadataCache.getFileCache(configFile);
    const paths = cache?.frontmatter?.paths;
    const projectFileRoles = cache?.frontmatter?.project_file_roles;

    // 安全检查
    if (!paths || !paths.projects) {
        new Notice("❌ 配置不完整：请检查 config 中的 paths.projects");
        return;
    }

    if (!projectFileRoles || projectFileRoles.length === 0) {
        new Notice("❌ 配置不完整：请检查 config 中的 project_file_roles");
        return;
    }

    // ================= 2. 获取当前文件信息 =================
    const activeFile = app.workspace.getActiveFile();
    if (!activeFile) {
        new Notice("❌ 请先打开一个 Dashboard 文件");
        return;
    }

    // 从当前文件名中提取项目名称
    // 支持格式: "项目名_Dashboard.md" 或 "000_项目名_Dashboard.md"
    const currentFileName = activeFile.basename;
    let projectName;

    // 尝试匹配 "XXX_Dashboard" 或 "000_XXX_Dashboard" 格式
    const dashboardMatch = currentFileName.match(/^(?:\d+_)?(.+?)_Dashboard$/i);
    if (dashboardMatch) {
        projectName = dashboardMatch[1];
    } else {
        // 如果不是 Dashboard 格式，使用整个文件名（去除数字前缀）
        projectName = currentFileName.replace(/^\d+_/, '');
    }

    // 获取当前文件所在的项目文件夹
    const projectFolder = activeFile.parent.path;

    // 验证是否在 projects 目录下
    if (!projectFolder.startsWith(paths.projects)) {
        new Notice("⚠️ 当前文件不在 Projects 目录下，确认要继续吗？");
    }

    // ================= 3. 用户交互 =================
    // 3.1 选择角色
    const roleChoice = await QuickAdd.suggester(
        projectFileRoles.map(r => `📄 ${r}`),
        projectFileRoles
    );

    if (!roleChoice) {
        new Notice("已取消创建");
        return;
    }

    // 3.2 输入文件名（可选）
    const customName = await QuickAdd.inputPrompt(
        `请输入文件名（留空则使用角色名称）：`,
        roleChoice
    );

    if (customName === null) {
        new Notice("已取消创建");
        return;
    }

    const baseName = customName.trim() || roleChoice;
    
    const fileName = `${roleChoice}_${baseName}`;

    // ================= 4. 构造文件路径 =================
    const targetFilePath = `${projectFolder}/${fileName}.md`;

    // 检查文件是否已存在
    const existingFile = app.vault.getAbstractFileByPath(targetFilePath);
    if (existingFile) {
        new Notice(`⚠️ 文件已存在: ${fileName}.md`);
        return;
    }

    // ================= 5. 创建文件内容 =================
    const currentDate = window.moment().format("YYYY-MM-DD");

    // 读取 ProjFile 模板（如果存在）
    const templatePath = "Toolkit/00_Template/Zettelkasten/ProjFile.md";
    const templateFile = app.vault.getAbstractFileByPath(templatePath);
    
    let fileContent;
    
    if (templateFile) {
        // 如果模板存在但为空，使用默认内容
        const templateContent = await app.vault.read(templateFile);
        if (templateContent.trim()) {
            fileContent = templateContent;
        } else {
            fileContent = generateDefaultContent();
        }
    } else {
        // 如果模板不存在，使用默认内容
        fileContent = generateDefaultContent();
    }

    // 替换变量
    fileContent = fileContent
        .replace(/{{PROJECT_NAME}}/g, projectName)
        .replace(/{{ROLE}}/g, roleChoice)
        .replace(/{{DATE}}/g, currentDate)
        .replace(/{{FILE_NAME}}/g, fileName);

    // ================= 6. 创建文件 =================
    try {
        const newFile = await app.vault.create(targetFilePath, fileContent);

        // 打开新文件
        const leaf = app.workspace.getLeaf(false);
        await leaf.openFile(newFile);

        new Notice(`✅ 项目文件 "${fileName}" 创建成功！`);

    } catch (error) {
        new Notice(`❌ 文件创建失败: ${error.message}`);
    }

    // ================= 辅助函数 =================
    function generateDefaultContent() {
        return `---
type: project-file
role: {{ROLE}}
related: "[[{{PROJECT_NAME}}]]"
created: {{DATE}}
---

# {{FILE_NAME}}

## 内容

`;
    }
};
