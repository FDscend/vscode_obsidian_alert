/// <reference lib="dom" />

import type MarkdownIt from "markdown-it";
import admonitionPlugin from "./markdown-it-alert";
import alertCss from "../media/admonition.css";

interface MarkdownItRenderer {
  extendMarkdownIt(callback: (md: MarkdownIt) => MarkdownIt): void;
}

interface RendererContext<T> {
  getRenderer(id: string): Promise<T | undefined>;
}

const notebookStyleTemplateId = "vscode-markdown-obsidian-alert-style";

function ensureNotebookStyles() {
  if (document.getElementById(notebookStyleTemplateId)) {
    return;
  }

  const style = document.createElement("style");
  style.textContent = alertCss;

  const template = document.createElement("template");
  template.id = notebookStyleTemplateId;
  template.classList.add("markdown-style");
  template.content.appendChild(style);
  document.head.appendChild(template);
}

export async function activate(ctx: RendererContext<MarkdownItRenderer>) {
  const markdownItRenderer = await ctx.getRenderer("vscode.markdown-it-renderer");

  if (!markdownItRenderer) {
    throw new Error("Could not load 'vscode.markdown-it-renderer'");
  }

  ensureNotebookStyles();

  markdownItRenderer.extendMarkdownIt((md: MarkdownIt) => md.use(admonitionPlugin));

  return markdownItRenderer;
}