<%*
/**
 * =============================================================================
 * Obsidian Router: 智能文件分发与模版应用系统 (v2.3: 配置化)
 * =============================================================================
 */

// --- 1. 加载配置 (Load Configuration) ---
const configFile = app.vault.getAbstractFileByPath("Toolkit/config.md");
if (!configFile) {
  new Notice("❌ 错误：无法找到 Toolkit/config.md 配置文件");
  return;
}

const configContent = await app.vault.read(configFile);
const configYaml = configContent.match(/^---\n([\s\S]*?)\n---/)?.[1];
if (!configYaml) {
  new Notice("❌ 错误：config.md 格式错误，无法解析 YAML");
  return;
}

// 手动解析 router_rules 和 paths
const lines = configYaml.split('\n');
const paths = {};
const routerRules = [];

let inPaths = false;
let inRouterRules = false;
let currentRule = null;

for (const line of lines) {
  const trimmed = line.trim();
  
  // 检测 paths 区块
  if (trimmed === 'paths:') {
    inPaths = true;
    inRouterRules = false;
    continue;
  }
  
  // 检测 router_rules 区块
  if (trimmed === 'router_rules:') {
    inRouterRules = true;
    inPaths = false;
    continue;
  }
  
  // 检测区块结束（新的顶级key）
  if (trimmed && !line.startsWith(' ') && !line.startsWith('\t')) {
    inPaths = false;
    inRouterRules = false;
  }
  
  // 解析 paths
  if (inPaths && line.startsWith('  ')) {
    const match = trimmed.match(/^(\w+):\s*["']?([^"'\n]+)["']?/);
    if (match) {
      paths[match[1]] = match[2];
    }
  }
  
  // 解析 router_rules
  if (inRouterRules) {
    if (trimmed.startsWith('- id:')) {
      if (currentRule) routerRules.push(currentRule);
      currentRule = { id: trimmed.replace('- id:', '').trim() };
    } else if (currentRule) {
      if (trimmed.startsWith('label:')) {
        currentRule.label = trimmed.replace('label:', '').trim().replace(/["']/g, '');
      } else if (trimmed.startsWith('dest:')) {
        currentRule.dest = trimmed.replace('dest:', '').trim();
      } else if (trimmed.startsWith('template:')) {
        currentRule.template = trimmed.replace('template:', '').trim();
      }
    }
  }
}
if (currentRule) routerRules.push(currentRule);

// --- 2. 构建 CONFIG 对象 ---
const CONFIG = {};
for (const rule of routerRules) {
  const destPath = paths[rule.dest];
  const templatePath = paths[rule.template];
  
  if (!destPath || !templatePath) {
    console.warn(`⚠️ Router规则 "${rule.id}" 配置不完整，跳过`);
    continue;
  }
  
  CONFIG[rule.label] = {
    folder: destPath,
    template: templatePath
  };
}

if (Object.keys(CONFIG).length === 0) {
  new Notice("❌ 错误：router_rules 配置为空或解析失败");
  return;
}

// --- 3. 核心逻辑 (Core Logic) ---
const type = await tp.system.suggester(Object.keys(CONFIG), Object.keys(CONFIG));

// === 修改区域：处理取消操作 ===
if (!type) {
  // 3.1 二次确认弹窗
  const action = await tp.system.suggester(
    ["🗑️ 确认删除 (放弃创建)", "⚠️ 保留文件 (仅取消)"], 
    ["delete", "keep"],
    false, 
    "❌ 未选择类型。是否删除当前文件？"
  );

  // 3.2 执行决策
  if (action === "delete") {
    const fileToDelete = app.workspace.getActiveFile();
    if (fileToDelete) {
      // 参数 true 表示移动到系统回收站(System Trash)，false 为 Obsidian 回收站(.trash)
      // 建议保留 true 以防万一
      await app.vault.trash(fileToDelete, true);
      new Notice(`🗑️ 文件 "${fileToDelete.basename}" 已删除`);
    } else {
      new Notice("❌ 错误：无法定位当前文件");
    }
  } else {
    // action 为 "keep" 或 用户再次按 Esc
    new Notice("⚠️ 操作取消：文件已保留");
  }

} else {
// === 修改结束，以下保持原有逻辑 ===
  const selection = CONFIG[type];
  const fileName = tp.file.title;
  
  // 路径策略
  const destFolder = selection.folder;
  const checkPath = `${destFolder}/${fileName}.md`; // 用于检测 (Strict)
  const movePath  = `${destFolder}/${fileName}`;    // 用于移动 (Clean)
  
  // 获取当前文件路径 (用于比对)
  const currentPath = tp.file.path(true);

  // === 关键修复：原地判定 ===
  // 如果目标路径就是当前文件所在路径（例如 Inbox -> Inbox），直接应用模板
  if (checkPath === currentPath) {
    const templateFile = tp.file.find_tfile(selection.template);
    if (templateFile) {
      tR += await tp.file.include(templateFile);
      new Notice(`✅ 已原地应用 ${type} 模板`);
    }
  } 
  // 否则：执行正常的移动逻辑
  else {
    // 3.1 存在性检测
    const existingFile = app.vault.getAbstractFileByPath(checkPath);

    if (existingFile) {
      // === 分支 A：文件已存在 (冲突处理) ===
      const shouldJump = await tp.system.suggester(
        ["❌ 目标已存在！点击跳转到旧文件", "Cancel"], 
        [true, false]
      );
      
      if (shouldJump) {
        await app.workspace.getLeaf().openFile(existingFile);
      }
      
    } else {
      // === 分支 B：正常移动 (执行) ===
      try {
        // 1. 移动文件
        await tp.file.move(movePath);
        
        // 2. 寻找并应用模版
        const templateFile = tp.file.find_tfile(selection.template);
        if (templateFile) {
          tR += await tp.file.include(templateFile);
        }
      } catch (err) {
        console.error(err);
        new Notice(`❌ 系统错误：${err.message}`);
      }
    }
  }
}
_%>