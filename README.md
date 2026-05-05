# Markdown Obsidian Alert & Math Theorem

| English | [中文](https://github.com/FDscend/vscode_obsidian_alert/blob/master/README.zh.md) |
| ------- | --------------------------------------------------------------------------------- |

Support for Obsidian-style callouts in Markdown previews, including Jupyter Notebook previews.

## Features

### 🎨 Obsidian-Style Callouts

Render beautiful Obsidian-style admonition blocks with simple syntax:

- Basic: `> [!KEYWORD]`
- With custom title: `> [!KEYWORD] Your Title Here`

**Supported keywords** (case-insensitive):

- `NOTE`, `ABSTRACT`, `SUMMARY`, `INFO`, `TODO`
- `TIP`, `HINT`, `IMPORTANT`, `SUCCESS`, `CHECK`, `DONE`
- `QUESTION`, `HELP`, `FAQ`, `WARNING`, `CAUTION`, `ATTENTION`
- `FAILURE`, `FAIL`, `MISSING`, `DANGER`, `ERROR`, `BUG`
- `EXAMPLE`, `QUOTE`, `CITE`, `PDF`, `BORDER`

### 🧮 Mathematical Theorem Environments

Professional typesetting for mathematical documents with automatic numbering and flexible customization:

| Environment | Keyword |
| ----------- | :-----: |
| Theorem     |  `THM`  |
| Definition  |  `DEF`  |
| Lemma       |  `LEM`  |
| Proposition |  `PRP`  |
| Corollary   |  `COR`  |
| Claim       |  `CLM`  |
| Assumption  |  `ASM`  |
| Example     |  `EXM`  |
| Exercise    |  `EXR`  |
| Hypothesis  |  `HYP`  |
| Remark      |  `RMK`  |
| Axiom       |  `AXM`  |
| Conjecture  |  `CNJ`  |

**Theorem features:**

- Automatic numbering: `> [!THM]` (Theorem 1, Theorem 2, ...)
- Unnumbered: `> [!THM|*]`
- Manual numbering: `> [!THM|A]` (Theorem A)

### 🔄 Collapsible Blocks

Create interactive, collapsible callouts:

- Expandable: `> [!NOTE]+` or `> [!NOTE]+ Your Title`
- Collapsed: `> [!NOTE]-` or `> [!NOTE]- Your Title`

### ✨ Smart Defaults

- Unsupported keywords gracefully fall back to `NOTE` style
- Case-insensitive keyword recognition
- Seamless integration with existing Markdown workflows

## Usage Examples

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

## Installation

1. Install from VS Code [Marketplace](https://marketplace.visualstudio.com/items?itemName=FDscend.vscode-markdown-obsidian-alert)
2. Start using Obsidian-style callouts in your Markdown files
3. Enjoy enhanced mathematical typesetting for theorems and proofs

## See Also

Check out [test.md](https://github.com/FDscend/vscode_obsidian_alert/blob/master/test/test.md) for comprehensive examples and usage patterns.

![](https://raw.githubusercontent.com/FDscend/vscode_obsidian_alert/refs/heads/master/img/img1.jpg)

![](https://raw.githubusercontent.com/FDscend/vscode_obsidian_alert/refs/heads/master/img/img2.jpg)

![](https://raw.githubusercontent.com/FDscend/vscode_obsidian_alert/refs/heads/master/img/img3.jpg)

## Customization

You can customize callout styles using CSS. Here are the steps:

1. Open VS Code settings (`Ctrl + ,`) and search for [`markdown.styles`](vscode://settings/markdown.styles)；
2. Add the path to your custom CSS file, for example: `"markdown.styles": ["./custom.css"]`；
3. Define your callout styles in the CSS file, for example, for a border style:
   ```css
   div[data-callout="border"].callout {
     background-color: transparent;
     border: 1px solid;
     border-color: black;
   }
   div[data-callout="border"].callout > .callout-title {
     border-bottom: 1px solid;
   }
   div[data-callout="border"].callout > .callout-title > .callout-icon {
     display: none;
   }
   ```

Theoretically, you can use Obsidian snippets to achieve more complex styles.

---

Transform your Markdown documents with beautiful, functional callouts and professional mathematical formatting!

## Style References

- [Obsidian Default Styles](https://obsidian.md/help/callouts)
- [LaTeX-like Theorem & Equation Referencer for Obsidian](https://github.com/RyotaUshio/obsidian-latex-theorem-equation-referencer)
- [Obsidian PDF++](https://github.com/RyotaUshio/obsidian-pdf-plus)
