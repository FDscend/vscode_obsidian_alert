# Change Log

## [Unreleased]

- Added new callout types: `BORDER`.
- You can customize callout styles using CSS. See the README for details.
- Added support for custom callout keywords containing `-` and `_`, such as `> [!note-2]` and `> [!note_2]`.
- Updated default custom callout titles so hyphenated keywords render with spaces while preserving the original `data-callout` value.
- Synced full `markdown.styles` CSS files into Jupyter Notebook Markdown previews when the configured paths can be resolved.
- Added notebook preview compatibility styles to avoid callouts and theorem blocks being squeezed against the right edge or bottom in `.ipynb` Markdown cells.

## [0.0.2] - 2026-05-03

- Fixed source line mapping for callouts and theorem blocks in Markdown preview.
- Fixed foldable callouts so `+` and `-` blocks expand and collapse correctly with matching arrow state.
- Added notebook renderer support so callouts and theorem blocks work in `.ipynb` Markdown cells.
- Fixed notebook custom title rendering by forwarding renderer context during inline rendering.
- Adjusted callout icon and title alignment in Markdown preview and notebook preview.

## [0.0.1] - 2025-09-22

- Initial release
