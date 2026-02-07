---
paths:
  notes: "Atlas/000_Notes"
  views: "Atlas/100_Views"
  daily: "Atlas/200_Period/201_Daily"
  monthly: "Atlas/200_Period/202_Monthly"
  ponder: "Atlas/200_Period/203_Ponder"
  todo: "Atlas/200_Period/204_TODO"
  areas: "Effort/300_Areas"
  projects: "Effort/400_Projects"
  attachments: "Source/500_Attachments"
  image: "Source/500_Attachments/501_Image"
  clippings: "Source/500_Attachments/502_Clippings"
  files: "Source/500_Attachments/503_Files"
  books: "Source/500_Attachments/504_Books"
  archives: "Source/600_Archives"
  templaters: "Toolkit/00_Template"
  templaters_notes: "Toolkit/00_Template/Zettelkasten/Notes.md"
  templaters_fleetings: "Toolkit/00_Template/Zettelkasten/Fleetings.md"
  templaters_cards: "Toolkit/00_Template/Zettelkasten/Cards.md"
  templaters_proj: "Toolkit/00_Template/Zettelkasten/Proj.md"
  templaters_router: "Toolkit/00_Template/Router.md"
  script: "Toolkit/01_Script"
  buffer: "Toolkit/02_Buffer"

router_rules:
  - id: note
    label: "Note"
    dest: notes
    template: templaters_notes
  - id: fleeting
    label: "Fleeting"
    dest: notes
    template: templaters_fleetings
  - id: card
    label: "Card"
    dest: notes
    template: templaters_cards
  - id: project
    label: "Project"
    dest: projects
    template: templaters_proj

# --- 前缀配置 (Prefixes) ---
# 用于自动生成文件名时的前缀（当用户未指定名称时）
prefixes:
  fleeting: "Fleeting_"
  note: "Note_"
  card: "Card_"

# --- 默认值配置 (Defaults) ---
# 定义各类型笔记的默认状态和其他属性
defaults:
  note_status: "draft"         # Note 的默认状态
  fleeting_status: "fleeting"  # Fleeting 的默认状态
  card_status: "draft"         # Card 的默认状态

note_status:
  - fleeting
  - draft
  - mature
project_status:
  - active
  - paused
  - completed
  - archived
project_file_roles:
  - log
  - research
  - resource

# --- 项目文件角色标签映射 (Project File Roles Labels) ---
# 用于 Proj.md 等模板中显示角色的UI标签和图标
project_file_roles_labels:
  log: "📋 Log"
  research: "🔍 Research"
  resource: "📚 Resource"

# --- 分类配置 (Categories) ---
# 适用于 Notes/Cards/Fleetings 的主题分类（单选）
# 配合 tags 进行 MOC 生成和内容聚合
categories:
  - 算法与数据结构
  - 编程技术
  - 学术研究
  - 工具使用
  - 工作流与方法
  - 学习笔记
  - 思考与反思
  - 阅读笔记
  - 未分类
---
