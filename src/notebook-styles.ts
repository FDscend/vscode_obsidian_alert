export const NOTEBOOK_RENDERER_ID =
  "FDscend.vscode-markdown-obsidian-alert-renderer";

export const NOTEBOOK_STYLE_REQUEST_MESSAGE = "requestStyles";
export const NOTEBOOK_STYLE_UPDATE_MESSAGE = "customStyles";

export interface NotebookStyleUpdateMessage {
  type: typeof NOTEBOOK_STYLE_UPDATE_MESSAGE;
  cssText: string;
}

export const NOTEBOOK_COMPAT_CSS = `
#preview .callout,
#preview .callout > .callout-title,
#preview .callout > .callout-content,
#preview .thm-block,
#preview .thm-block > .thm-title,
#preview .thm-block > .thm-summary,
#preview .thm-block > .thm-body {
  box-sizing: border-box;
  max-width: 100%;
}

#preview > .callout,
#preview > .thm-block {
  width: auto;
}

#preview > .callout:only-child,
#preview > .callout:last-child {
  padding-bottom: 0.55em;
}

#preview > .thm-block:only-child,
#preview > .thm-block:last-child {
  padding-bottom: 0.6em;
}
`.trim();

export function buildNotebookBaseCss(alertStyles: string): string {
  return `${alertStyles}\n\n${NOTEBOOK_COMPAT_CSS}`;
}