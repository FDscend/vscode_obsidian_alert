# Obsidian style alert

By default, the title of the callout is its type identifier in title case. You can change it by adding text after the type identifier:

## Change the title

> [!tip] Callouts can have custom titles
> Like this one.

You can even omit the body to create title-only callouts:

> [!tip] Title-only callout

## Foldable callouts

You can make a callout foldable by adding a plus (`+`) or a minus (`-`) directly after the type identifier.

A plus sign expands the callout by default, and a minus sign collapses it instead.

> [!faq]- Are callouts foldable?
> Yes! In a foldable callout, the contents are hidden when the callout is collapsed.

## Nested callouts

You can nest callouts in multiple levels.

> [!question] Can callouts be nested?
>
> > [!todo] Yes!, they can.
> >
> > > [!example] You can even use multiple layers of nesting.

## Supported types

You can use several callout types and aliases. Each type comes with a different background color and icon.

Any unsupported type defaults to the note type. The type identifier is case-insensitive.

> [!note]

> [!abstract]

> [!summary]

> [!info]

> [!todo]

> [!tip]

> [!hint]

> [!important]

> [!success]

> [!check]

> [!done]

> [!question]

> [!help]

> [!faq]

> [!warning]

> [!caution]

> [!attention]

> [!failure]

> [!fail]

> [!missing]

> [!danger]

> [!error]

> [!bug]

> [!example]

> [!quote]

> [!cite]

> [!pdf]

> [!pdf|yellow]

> [!pdf|red]

> [!pdf|important]

> [!pdf|note]

> [!border]

# math alert

Automatic Numbering (Default): Use `> [!thm]` to create a theorem environment with automatic sequential numbering.

> [!thm] Theorem name
>
> Theorem content

Unnumbered Entries: Append a `*` to the identifier to create a significant but unnumbered entry.

> [!thm|*] Theorem name
>
> Theorem content

Manual Numbering: You can manually assign a specific label (e.g., a letter or custom identifier) by adding it after the `|` symbol.

> [!thm|A] Theorem name
>
> Theorem content

## Supported types

| Environment name | keyword |
| :--------------: | :-----: |
|     Theorem      |  `THM`  |
|    Definition    |  `DEF`  |
|      Lemma       |  `LEM`  |
|   Proposition    |  `PRP`  |
|    Corollary     |  `COR`  |
|      Claim       |  `CLM`  |
|    Assumption    |  `ASM`  |
|     Example      |  `EXM`  |
|     Exercise     |  `EXR`  |
|    Hypothesis    |  `HYP`  |
|      Remark      |  `RMK`  |
|      Axiom       |  `AXM`  |
|    Conjecture    |  `CNJ`  |

# Use meta to control style

You can use meta to control the style of callouts, for example:

> [!note|style-1]
>
> content

> [!note|style-2]
>
> content

> [!note|style-3]
>
> content

> [!note|style-4]
>
> content

# Multi Column

> [!multi-column]
>
> > [!warning]+ Resources
> >
> > - Lorem ipsum dolor sit amet
> > - Vitae nunc sed velit dignissim sodales.
> > - In cursus turpis massa tincidunt dui ut ornare lectus.
>
> > [!todo]+
> >
> > - [x] Define Use Case
> > - [ ] Craft User Story
> > - [ ] Develop draft sketches

If there are multiple Callouts inside `multi-column`, a multi-column layout will be attempted; if they don't fit on one line, they will automatically wrap.

By default the columns share width equally; you can set meta to control each column's width ratio.

- `wide-2` - give callout twice the size
- `wide-3` - three times the size
- `wide-4` - four times the size
- `wide-5` - five times the size

> [!multi-column]
>
> > [!note]+ Work
> > your notes or lists here. using markdown formatting
>
> > [!warning|wide-2]+ Personal
> > your notes or lists here. using markdown formatting

You can also set meta `col2`, `col3`, `col4`, `col5` to control the number of columns to be 2, 3, 4, 5 respectively.

> [!multi-column|col2]
>
> > [!note] Work
> > your notes or lists here. using markdown formatting
>
> > [!warning] Personal
> > your notes or lists here. using markdown formatting
>
> > [!tip] Personal
> > your notes or lists here. using markdown formatting

If you only need multiple columns without rendering Callout styles, you can add `blank`, for example

> [!multi-column]
>
> > [!warning-blank]
> >
> > - Lorem ipsum dolor sit amet
> > - Vitae nunc sed velit dignissim sodales.
> > - In cursus turpis massa tincidunt dui ut ornare lectus.
>
> > [!todo-blank]
> >
> > - [x] Define Use Case
> > - [ ] Craft User Story
> > - [ ] Develop draft sketches

# Caption

Based on the `blank` style, you can use `caption` to add a title to the image, such as

> [!note-blank|caption]
>
> ![](https://markdown.com.cn/images/philly-magic-garden.jpg)
>
> This is the image caption
