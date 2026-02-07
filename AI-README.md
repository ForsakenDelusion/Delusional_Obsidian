# Obsidian Zettelkasten Template Vault

一个基于Zettelkasten方法论的Obsidian笔记库模板，提供完整的笔记工作流、项目管理和知识组织系统。

## ✨ 特性

### 📝 笔记系统
- **Zettelkasten工作流**：支持Fleeting、Note、Card三种笔记类型
- **智能分类**：9大预设分类（算法、编程、学术研究、工具使用等）
- **标签系统**：灵活的标签管理和聚合
- **双向链接**：完整的知识网络构建

### 🚀 项目管理
- **项目跟踪**：支持项目状态管理（active、paused、completed、archived）
- **项目文件**：三种角色分类（Log、Research、Resource）
- **自动聚合**：基于双向链接的智能内容聚合
- **最近活动**：自动追踪最近30天的项目动态

### 🎯 任务管理
- **TODO系统**：按月份组织的TODO文件
- **状态切换**：未完成/已完成任务快速切换
- **可交互**：支持直接勾选完成任务

### 🛠️ 智能工具
- **Router系统**：智能文件路由和模板应用
- **配置中心**：集中式配置管理（`Toolkit/config.md`）
- **MOC系统**：多层级的内容地图（Map of Content）
- **周报系统**：自动生成每周笔记和项目活动总结

## 📁 目录结构

```
.
├── Atlas/                    # 知识地图
│   ├── 000_Notes/           # 所有笔记（Zettelkasten）
│   ├── 100_Views/           # MOC视图
│   └── 200_Period/          # 时间周期
│       ├── 201_Daily/       # 每日笔记
│       ├── 202_Monthly/     # 每月总结
│       ├── 203_Ponder/      # 思考记录
│       └── 204_TODO/        # 任务列表
├── Effort/                  # 行动区
│   ├── 300_Areas/           # 生活领域
│   └── 400_Projects/        # 项目管理
├── Source/                  # 资源库
│   └── 500_Attachments/     # 附件存储
└── Toolkit/                 # 工具箱
    ├── 00_Template/         # 模板文件
    ├── 01_Script/           # 脚本工具
    └── 02_Buffer/           # 临时缓冲区
```

## 🚀 快速开始

### 1. 克隆仓库
```bash
git clone <your-repo-url>
cd <vault-name>
```

### 2. 在Obsidian中打开
1. 打开Obsidian
2. 选择"打开文件夹作为vault"
3. 选择克隆的目录

### 3. 安装必需插件
该模板依赖以下插件（已包含在`.obsidian/plugins/`中）：
- **Dataview** - 数据查询和聚合
- **Templater** - 模板自动化
- **Tasks** - 任务管理
- **Buttons** - 快捷按钮
- **Homepage** - 自定义主页
- 其他：见`.obsidian/community-plugins.json`

首次打开时，Obsidian会提示启用这些插件。

### 4. 配置Router
打开`Toolkit/config.md`，根据需要调整：
- 路径配置（`paths`）
- 分类列表（`categories`）
- 状态选项（`note_status`、`project_status`）
- 项目文件角色（`project_file_roles_labels`）

### 5. 创建第一个笔记
1. 在任意位置创建新文件（或使用快捷键）
2. 触发Templater的Router模板（通常自动触发）
3. 选择笔记类型（Note/Fleeting/Card/Project）
4. Router会自动移动文件并应用对应模板

## 📖 使用指南

### 笔记工作流

#### Fleeting（闪念笔记）
用于快速捕捉想法和灵感：
```markdown
---
type: note
status: fleeting
category: 未分类
created: 2026-02-07
---
```

#### Note（永久笔记）
用于深度思考和知识沉淀：
```markdown
---
type: note
status: draft  # draft -> mature
category: 编程技术
tags: [python, async]
created: 2026-02-07
---
```

#### Card（知识卡片）
用于原子化知识点：
```markdown
---
type: note
status: draft
category: 算法与数据结构
tags: [binary-search]
created: 2026-02-07
---
```

### 项目管理

#### 创建项目
1. 使用Router创建Project类型文件
2. 填写项目名称和截止日期
3. 设置项目状态（active/paused/completed/archived）

#### 创建项目文件
在项目主页点击"创建项目文件"按钮，选择角色：
- **Log**：项目日志、进度记录
- **Research**：调研资料、技术探索
- **Resource**：参考资料、外部链接

#### 关联内容
项目文件会自动关联到项目主页，MOC会自动聚合相关笔记。

### 配置系统

所有配置集中在`Toolkit/config.md`：

```yaml
paths:
  notes: "Atlas/000_Notes"
  projects: "Effort/400_Projects"
  todo: "Atlas/200_Period/204_TODO"
  # ... 其他路径

router_rules:
  - id: note
    label: "Note"
    dest: notes
    template: templaters_notes
  # ... 其他规则

categories:
  - 算法与数据结构
  - 编程技术
  # ... 其他分类

project_file_roles_labels:
  log: "📋 Log"
  research: "🔍 Research"
  resource: "📚 Resource"
```

修改配置后，所有依赖的模板和查询会自动更新。

## 🎨 自定义

### 添加新的笔记分类
1. 编辑`Toolkit/config.md`
2. 在`categories`列表中添加新分类
3. 复制`Atlas/100_Views/MOC_Category_Template.md`
4. 重命名为`MOC_<新分类>.md`

### 修改项目文件角色
1. 编辑`Toolkit/config.md`
2. 修改`project_file_roles`列表（角色ID）
3. 修改`project_file_roles_labels`映射（显示标签）
4. Proj.md模板会自动读取新配置

### 自定义主页
编辑`Home.md`或`Atlas/100_Views/MOC_主页.md`，使用Dataview查询自定义内容。

## 🔧 技术细节

### 依赖的Obsidian插件
- **核心插件**：
  - Dataview ^0.5.0
  - Templater ^1.0.0
  - Tasks ^7.0.0

- **推荐插件**：
  - Buttons
  - Homepage
  - Calendar
  - Excalidraw

### 配置文件说明
- `.obsidian/workspace.json` - 已被gitignore（个人工作区布局）
- `.obsidian/workspace-mobile.json` - 已被gitignore（移动端布局）
- `.obsidian/community-plugins.json` - 插件列表（已保留）
- `Toolkit/config.md` - **核心配置文件**，所有路径和选项的单一来源

### Dataviewjs模式
所有查询使用统一的配置读取模式：
```javascript
const configNote = dv.page("Toolkit/config");
const projectsRoot = configNote.paths.projects;
// 使用配置...
```

### Router工作原理
1. Templater触发`Router.md`模板
2. 读取`config.md`的`router_rules`
3. 动态构建路由表
4. 根据用户选择移动文件并应用模板

## 📝 最佳实践

1. **保持原子化**：每个笔记专注一个主题
2. **积极链接**：使用`[[双链]]`建立知识网络
3. **定期回顾**：每周查看MOC和项目进度
4. **合理分类**：使用category进行主题分类，用tags进行多维标签
5. **配置优先**：所有可配置内容都应该放在`config.md`

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

---

**Built with ❤️ using Obsidian**
