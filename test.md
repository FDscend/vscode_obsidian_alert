# obsidian style alert

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
