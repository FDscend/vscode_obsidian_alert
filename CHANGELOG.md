# Change Log

## [0.0.3] - 2026-05-17

- Added dedicated notebook preview CSS support through the `markdown-obsidian-alert.notebook.styles` setting, so `.ipynb` Markdown previews can opt into custom styles separately from `markdown.styles`.
- Added built-in layout presets and extra callout styles, including `BORDER`, `style-1` to `style-4`, `MULTI-COLUMN`, `*-BLANK`, `caption`, `wide-2` to `wide-5`, and `col2` to `col5`.
- Added support for custom callout keywords containing `-` and `_`, such as `> [!note-2]` and `> [!note_2]`.
- Updated default callout titles so built-in keywords render with capitalized names such as `Todo` and `Warning`, while custom hyphenated keywords remain readable without changing the original `data-callout` value.
- Improved Markdown and notebook preview compatibility styles to use consistent box sizing and fixed multi-column layout issues caused by hidden preview placeholder nodes.
- Updated the README documentation for the new notebook style setting and the newly bundled layout presets.

## [0.0.2] - 2026-05-03

- Fixed source line mapping for callouts and theorem blocks in Markdown preview.
- Fixed foldable callouts so `+` and `-` blocks expand and collapse correctly with matching arrow state.
- Added notebook renderer support so callouts and theorem blocks work in `.ipynb` Markdown cells.
- Fixed notebook custom title rendering by forwarding renderer context during inline rendering.
- Adjusted callout icon and title alignment in Markdown preview and notebook preview.

## [0.0.1] - 2025-09-22

- Initial release
