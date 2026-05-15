/// <reference lib="dom" />

import type MarkdownIt from "markdown-it";
import admonitionPlugin from "./markdown-it-alert";
import alertCss from "../media/admonition.css";
import {
  buildNotebookBaseCss,
  NOTEBOOK_RENDERER_ID,
  NOTEBOOK_STYLE_REQUEST_MESSAGE,
  NOTEBOOK_STYLE_UPDATE_MESSAGE,
  type NotebookStyleUpdateMessage,
} from "./notebook-styles";

interface MarkdownItRenderer {
  extendMarkdownIt(callback: (md: MarkdownIt) => MarkdownIt): void;
}

interface NotebookRendererState {
  customCssText?: string;
}

interface RendererMessageEvent<T> {
  (listener: (event: T) => unknown): unknown;
}

interface RendererContext<TState, TRenderer> {
  getState(): TState | undefined;
  setState(value: TState): void;
  getRenderer(id: string): Promise<TRenderer | undefined>;
  postMessage?(message: unknown): void;
  onDidReceiveMessage?: RendererMessageEvent<unknown>;
}

const notebookBaseStyleTemplateId = "vscode-markdown-obsidian-alert-style";
const notebookCustomStyleTemplateId =
  "vscode-markdown-obsidian-alert-custom-style";

function upsertNotebookStyles(templateId: string, cssText: string) {
  let template = document.getElementById(templateId) as HTMLTemplateElement | null;
  let style = template?.content.firstElementChild;

  if (!template) {
    template = document.createElement("template");
    template.id = templateId;
    template.classList.add("markdown-style");
    style = document.createElement("style");
    template.content.appendChild(style);
    document.head.appendChild(template);
  }

  if (!(style instanceof HTMLStyleElement)) {
    style = document.createElement("style");
    template.content.replaceChildren(style);
  }

  style.textContent = cssText;
}

function ensureNotebookStyles() {
  upsertNotebookStyles(
    notebookBaseStyleTemplateId,
    buildNotebookBaseCss(alertCss)
  );
}

function applyNotebookCustomStyles(cssText: string) {
  upsertNotebookStyles(notebookCustomStyleTemplateId, cssText);
}

function isNotebookStyleUpdateMessage(
  message: unknown
): message is NotebookStyleUpdateMessage {
  return Boolean(
    message
      && typeof message === "object"
      && (message as { type?: unknown }).type === NOTEBOOK_STYLE_UPDATE_MESSAGE
      && typeof (message as { cssText?: unknown }).cssText === "string"
  );
}

export async function activate(
  ctx: RendererContext<NotebookRendererState, MarkdownItRenderer>
) {
  const markdownItRenderer = await ctx.getRenderer("vscode.markdown-it-renderer");

  if (!markdownItRenderer) {
    throw new Error("Could not load 'vscode.markdown-it-renderer'");
  }

  ensureNotebookStyles();

  const rendererState = ctx.getState();
  applyNotebookCustomStyles(rendererState?.customCssText || "");

  if (ctx.onDidReceiveMessage) {
    ctx.onDidReceiveMessage((message) => {
      if (!isNotebookStyleUpdateMessage(message)) {
        return;
      }

      applyNotebookCustomStyles(message.cssText);
      ctx.setState({ customCssText: message.cssText });
    });
  }

  ctx.postMessage?.({
    type: NOTEBOOK_STYLE_REQUEST_MESSAGE,
    rendererId: NOTEBOOK_RENDERER_ID,
  });

  markdownItRenderer.extendMarkdownIt((md: MarkdownIt) => md.use(admonitionPlugin));

  return markdownItRenderer;
}