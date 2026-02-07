<%*
/**
 * 逻辑脚本区
 * 1. 从 Toolkit/config.md 读取配置
 * 2. 自动重命名 (仅针对 Untitled/未命名 文件)
 * 
 * NOTE: 交互式选择逻辑已移至 Router.md
 */

// --- 配置读取函数 (从 config.md 读取前缀、默认状态和 category 列表) ---
async function readConfigFrontmatter() {
  const configPath = "Toolkit/config.md";
  const configFile = tp.file.find_tfile(configPath);
  
  if (!configFile) {
    console.warn(`[WARNING] Config file not found at ${configPath}, using fallback defaults`);
    return {
      prefix: "Card_",
      cardStatus: "draft",
      categories: ["未分类"]
    };
  }
  
  try {
    const vault = app.vault;
    const content = await vault.read(configFile);
    
    // 提取 YAML 前缀区域
    const yamlMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!yamlMatch) {
      return { prefix: "Card_", cardStatus: "draft", categories: ["未分类"] };
    }
    
    const yamlContent = yamlMatch[1];
    
    // 解析 prefixes.card
    const prefixMatch = yamlContent.match(/^prefixes:\n[\s\S]*?^\s*card:\s*['"]?([^'"#\n]+?)['"]?\s*(?:#.*)?$/m);
    const prefix = prefixMatch ? prefixMatch[1].trim() : "Card_";
    
    // 解析 defaults.card_status
    const statusMatch = yamlContent.match(/^defaults:\n[\s\S]*?^\s*card_status:\s*['"]?([^'"#\n]+?)['"]?\s*(?:#.*)?$/m);
    const cardStatus = statusMatch ? statusMatch[1].trim() : "draft";
    
    // 解析 categories 列表
    const categoriesMatch = yamlContent.match(/^categories:\s*\n((?:\s*-\s*.+\n?)+)/m);
    let categories = ["未分类"];
    if (categoriesMatch) {
      categories = categoriesMatch[1]
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('-'))
        .map(line => line.substring(1).trim())
        .filter(cat => cat.length > 0);
    }
    
    return { prefix, cardStatus, categories };
  } catch (err) {
    console.warn(`[WARNING] Failed to read config: ${err.message}, using fallback defaults`);
    return { prefix: "Card_", cardStatus: "draft", categories: ["未分类"] };
  }
}

// --- 自动重命名逻辑 ---
let title = tp.file.title;
const config = await readConfigFrontmatter();

// 只有当文件名是默认的 "未命名" 或 "Untitled" 时才触发，避免误伤已有文件
if (title.startsWith("Untitled") || title.startsWith("未命名")) {
    const inputName = await tp.system.prompt("请输入卡片标题 (Card Name):");
    
    if (inputName) {
        title = inputName;
        await tp.file.rename(title);
    } else {
        // 如果用户按ESC或未输入，生成时间戳兜底，防止文件名冲突
        // 使用动态前缀而非硬编码
        title = config.prefix + tp.date.now("HHmmss");
        await tp.file.rename(title);
    }
}

// --- Category 选择逻辑 ---
let selectedCategory = "";
const categoryChoices = ["稍后填写", ...config.categories];
const categoryChoice = await tp.system.suggester(
    categoryChoices, 
    categoryChoices, 
    false, 
    "请选择分类 (Category)"
);

if (categoryChoice && categoryChoice !== "稍后填写") {
    selectedCategory = categoryChoice;
}


-%>
---
type: card
created: <% tp.date.now("YYYY-MM-DD") %>
status: <% config.cardStatus %>
category: <% selectedCategory %>
tags:
---

