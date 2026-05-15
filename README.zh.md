# Markdown Obsidian Alert 与数学定理

| [English](https://github.com/FDscend/vscode_obsidian_alert/blob/master/README.md) | 中文 |
| --------------------------------------------------------------------------------- | ---- |

支持 Obsidian 风格的 callout 在 Markdown 预览中渲染，包括 Jupyter Notebook 预览。

## 功能特性

### 🎨 Obsidian 风格 Callout

使用简洁的语法渲染美观的 Obsidian 风格提示块：

- 基础写法：`> [!KEYWORD]`
- 自定义标题：`> [!KEYWORD] Your Title Here`

**支持的关键字**（不区分大小写）：

- `NOTE`, `ABSTRACT`, `SUMMARY`, `INFO`, `TODO`
- `TIP`, `HINT`, `IMPORTANT`, `SUCCESS`, `CHECK`, `DONE`
- `QUESTION`, `HELP`, `FAQ`, `WARNING`, `CAUTION`, `ATTENTION`
- `FAILURE`, `FAIL`, `MISSING`, `DANGER`, `ERROR`, `BUG`
- `EXAMPLE`, `QUOTE`, `CITE`, `PDF`, `BORDER`

### 🧮 数学定理环境

为数学文档提供专业排版，支持自动编号以及灵活自定义：

| 环境名称 | 关键字 |
| -------- | :----: |
| 定理     | `THM`  |
| 定义     | `DEF`  |
| 引理     | `LEM`  |
| 命题     | `PRP`  |
| 推论     | `COR`  |
| 断言     | `CLM`  |
| 假设     | `ASM`  |
| 示例     | `EXM`  |
| 练习     | `EXR`  |
| 假说     | `HYP`  |
| 注记     | `RMK`  |
| 公理     | `AXM`  |
| 猜想     | `CNJ`  |

**定理功能：**

- 自动编号：`> [!THM]`（Theorem 1、Theorem 2，依次递增）
- 不编号：`> [!THM|*]`
- 手动编号：`> [!THM|A]`（Theorem A）

### 🔄 可折叠块

创建可交互的折叠式 callout：

- 默认展开：`> [!NOTE]+` 或 `> [!NOTE]+ Your Title`
- 默认折叠：`> [!NOTE]-` 或 `> [!NOTE]- Your Title`

### ✨ 智能默认行为

- 不受支持的关键字会自动优雅回退到 `NOTE` 样式
- 关键字识别不区分大小写
- 可无缝融入现有 Markdown 工作流

## 使用示例

```
> [!NOTE]
> This is a simple note callout

> [!WARNING] Important Security Notice
> Remember to update your passwords regularly

> [!THM]
> Every finite integral domain is a field

> [!THM|*]
> Pythagorean Theorem

> [!THM|A]
> This theorem has custom numbering

> [!TIP]+ Click to expand
> This tip is hidden until you click on it
```

## 安装方式

1. 在 VS Code [Marketplace](https://marketplace.visualstudio.com/items?itemName=FDscend.vscode-markdown-obsidian-alert) 中安装
2. 另外，你也可以从 GitHub 的 [Releases](https://github.com/FDscend/vscode_obsidian_alert/releases) 页面下载此扩展。

## 另请参阅

可查看 [test.md](https://github.com/FDscend/vscode_obsidian_alert/blob/master/test/test.md) 了解更完整的示例和使用方式。

![](https://raw.githubusercontent.com/FDscend/vscode_obsidian_alert/refs/heads/master/img/img1.jpg)

![](https://raw.githubusercontent.com/FDscend/vscode_obsidian_alert/refs/heads/master/img/img2.jpg)

![](https://raw.githubusercontent.com/FDscend/vscode_obsidian_alert/refs/heads/master/img/img3.jpg)

## 自定义

可以通过 CSS 自定义 callout 样式，以下是操作步骤：

现在这些 `markdown.styles` CSS 文件也会同步注入到 Jupyter Notebook 的 Markdown 预览中。只要路径能从当前工作区或绝对文件路径解析，同一份 callout 样式片段就可以同时作用于 `.md` 和 `.ipynb` 预览。

1. 在 VS Code 中打开设置（`Ctrl + ,`），搜索 [`markdown.styles`](vscode://settings/markdown.styles)；
2. 添加自定义 CSS 文件路径，例如：`"markdown.styles": ["./.vscode/custom.css"]`；
3. 在 CSS 文件中定义你的 callout 样式，以 border-blue 样式为例：
   ```css
   div[data-callout="border-blue"].callout {
     background-color: transparent;
     border: 1px solid;
     border-color: blue;
   }
   div[data-callout="border-blue"].callout > .callout-title {
     border-bottom: 1px solid;
   }
   div[data-callout="border-blue"].callout > .callout-title > .callout-icon {
     display: none;
   }
   ```

理论上可以使用 Obsidian 的 snippets 来实现更复杂的样式。

---

用美观、实用的 callout 和专业的数学排版能力，全面提升你的 Markdown 文档体验。

## 样式参考

- [Obsidian 默认样式](https://obsidian.md/help/callouts)
- [LaTeX-like Theorem & Equation Referencer for Obsidian](https://github.com/RyotaUshio/obsidian-latex-theorem-equation-referencer)
- [Obsidian PDF++](https://github.com/RyotaUshio/obsidian-pdf-plus)
