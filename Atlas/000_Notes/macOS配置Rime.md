---
type: note
created: 2026-02-07
status: draft
category: 工具使用
---
## links

- https://www.mintimate.cc/zh/guide/installRime.html
- https://www.cnblogs.com/cgoldfish/p/19434507

# macOS Rime 鼠须管 + 雾凇拼音 配置记录

换到 Mac 之后最不适应的就是原生输入法——联想能力太差，完全记不住我的打字习惯。试了一圈最后换成了 Rime（鼠须管），隐私性好还能自定义。下面是我折腾一下午的配置过程，留个档。

## 0. 为什么选 Rime

Mac 自带的输入法用起来太憋屈了，词库小，联想也笨。Rime 是开源的，不联网，词库和配置都能自己改。Mac 上的版本叫「鼠须管」(Squirrel)。

## 1. 安装鼠须管

Homebrew 一键装：

```bash
brew install --cask squirrel
```

装完去系统设置里启用：
系统设置 → 键盘 → 输入法 → 点加号 → 找到「鼠须管」→ 添加

## 2. 装上雾凇拼音

刚装好的 Rime 默认只有繁体，得手动配简体方案。我用的「雾凇拼音」，词库比较全：

```bash
cd ~/Library/Rime/
git clone https://github.com/iDvel/rime-ice.git --depth 1

# 把配置文件复制到根目录（Rime 只认根目录的文件）
cp -r rime-ice/*.yaml rime-ice/*.txt .
cp -r rime-ice/lua rime-ice/opencc rime-ice/cn_dicts rime-ice/en_dicts .
```

以后更新雾凇拼音：
```bash
cd ~/Library/Rime/rime-ice
git pull
cd ..
cp -r rime-ice/*.yaml rime-ice/*.txt .
cp -r rime-ice/lua rime-ice/opencc rime-ice/cn_dicts rime-ice/en_dicts .
```

## 3. 换个顺眼的皮肤

默认的竖排候选词看得我眼睛疼。建个 `squirrel.custom.yaml`，改成横排 + 接近系统原生的配色：

```yaml
patch:
  style:
    status_message_type: mix
    candidate_format: "[label]. [candidate]"
    candidate_list_layout: linear
    text_orientation: horizontal
    inline_preedit: true
    inline_candidate: false
    translucency: true
    mutual_exclusive: false
    memorize_size: false
    showPaging: false
    alpha: 1e+0
    corner_radius: 1.25e+1
    hilited_corner_radius: 1e+1
    border_height: -3e+0
    border_width: 0e+0
    line_spacing: 1e+1
    spacing: 0e+0
    base_offset: 5e+0
    shadow_size: 2e+0
    font_face: PingFangSC-Regular
    font_point: 1.6e+1
    label_font_face: PingFangSC-Light
    label_font_point: 1.2e+1
    color_scheme: macos_light
    color_scheme_dark: macos_dark

  preset_color_schemes:
    macos_light:
      author: 安静 <qvshuo@foxmail.com>
      color_space: display_p3
      back_color: "0xB0FFFFFF"
      hilited_candidate_back_color: "0xF99563"
      text_color: "0xFFFFFF"
      candidate_text_color: "0x000000"
      hilited_candidate_text_color: "0xFFFFFF"
      label_color: "0x80000000"
      hilited_candidate_label_color: "0xFFFFFF"

    macos_dark:
      author: 安静 <qvshuo@foxmail.com>
      color_space: display_p3
      back_color: "0x26000000"
      hilited_candidate_back_color: "0xFDDFD0"
      text_color: "0xFFFFFF"
      candidate_text_color: "0xE6FFFFFF"
      hilited_candidate_text_color: "0x000000"
      label_color: "0x80FFFFFF"
      hilited_candidate_label_color: "0x000000"
```

皮肤配色来自 [安静](https://github.com/qvshuo)，还挺像原生输入法的。

## 4. 开启词频自动调整

建 `rime_ice.custom.yaml`，让输入法记住你的习惯：

```yaml
patch: 
  # 开启用户词典（记录打过的字）
  "translator/enable_user_dict": true
  
  # 自动调频（按使用频率排候选词顺序）
  "translator/enable_encoder": true
  
  # 整句输入时也调频
  "translator/enable_sentence": true
  
  # 对所有词都调频（false），不只是长词（true）
  "translator/encode_commit_history": false
  
  # 默认简体中文
  "switches/@2/reset": 0
```

一个小坑：上屏之后别删了重打。Rime 会把删除当成「这个词选错了」，反而不会更新词频。

## 5. 把 CapsLock 切输入法搞对

默认 Shift 和 CapsLock 都会切中英文，很烦。建 `default.custom.yaml` 禁用掉：

```yaml
patch:
  "ascii_composer/switch_key/Shift_L": noop
  "ascii_composer/switch_key/Shift_R": noop
  "ascii_composer/switch_key/Caps_Lock": noop
```

这样：
- Shift 不会切中英文了
- CapsLock 交给 macOS 自己管，在鼠须管和 ABC 之间切换
- 按 CapsLock 时也不会闪一下 Rime 的「Ａ」图标

然后去系统设置里勾个选项：
系统设置 → 键盘 → 输入法 → 勾选「使用大写锁定键切换 'ABC' 输入法」

## 6. 每次改完配置要重新部署

点菜单栏的鼠须管图标 → 重新部署

或者用命令行：
```bash
/Library/Input\ Methods/Squirrel.app/Contents/MacOS/Squirrel --reload
```

## 配置文件清单

最后你的 `~/Library/Rime/` 应该是这样：

```
~/Library/Rime/
├── default.custom.yaml      # 全局按键
├── rime_ice.custom.yaml     # 雾凇拼音设置
├── squirrel.custom.yaml     # 外观
├── rime-ice/                # git 仓库
├── *.schema.yaml            # 输入方案（从 rime-ice 复制）
├── *.dict.yaml              # 词库（从 rime-ice 复制）
├── lua/                     # Lua 脚本
├── opencc/                  # 简繁转换
├── cn_dicts/                # 中文词库
├── en_dicts/                # 英文词库
└── build/                   # 编译后的配置（自动生成）
```

## 最终效果

现在用起来是这样的：
- 默认简体中文
- 候选词横排，长得跟原生输入法差不多
- 词频会自动学习，越用越顺手
- CapsLock 切输入法，Shift 不会误触切英文了

## 参考资料

- [Rime 官网](https://rime.im/)
- [雾凇拼音](https://github.com/iDvel/rime-ice)
- [雾凇拼音详细介绍](https://dvel.me/posts/rime-ice/)

