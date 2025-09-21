# Markdown Obsidian Alert & Math Theorem

A powerful Visual Studio Code extension that enhances your Markdown writing experience by bringing Obsidian-style callouts and professional mathematical theorem environments right into your editor.

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
- `EXAMPLE`, `QUOTE`, `CITE`, `PDF`

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

Check out [test.md](https://github.com/FDscend/vscode_obsidian_alert/blob/master/test.md) for comprehensive examples and usage patterns.

![](https://github.com/FDscend/vscode_obsidian_alert/blob/master/img/img1.jpg)

![](https://github.com/FDscend/vscode_obsidian_alert/blob/master/img/img2.jpg)

![](https://github.com/FDscend/vscode_obsidian_alert/blob/master/img/img3.jpg)

---

Transform your Markdown documents with beautiful, functional callouts and professional mathematical formatting!
