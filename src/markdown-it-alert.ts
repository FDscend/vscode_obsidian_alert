import MarkdownIt from "markdown-it";
import type { StateBlock } from "markdown-it";
import type { Token } from "markdown-it";

// 定理类配置
interface TheoremMeta {
  defaultTitle: string;
}

// 普通警告类配置
interface AlertMeta {
  defaultTitle: string;
  icon: string;
  color: string;
}

interface PluginOptions {
  thmMeta?: Record<string, TheoremMeta>;
  alertMeta?: Record<string, AlertMeta>;
}

export default function admonitionPlugin(md: MarkdownIt) {
  const thmMeta: Record<string, TheoremMeta> = {
    THM: { defaultTitle: "Theorem" },
    DEF: { defaultTitle: "Definition" },
    LEM: { defaultTitle: "Lemma" },
    PRP: { defaultTitle: "Proposition" },
    COR: { defaultTitle: "Corollary" },
    CLM: { defaultTitle: "Claim" },
    ASM: { defaultTitle: "Assumption" },
    EXM: { defaultTitle: "Example" },
    EXR: { defaultTitle: "Exercise" },
    HYP: { defaultTitle: "Hypothesis" },
    RMK: { defaultTitle: "Remark" },
    AXM: { defaultTitle: "Axiom" },
    CNJ: { defaultTitle: "Conjecture" },
  };

  const alertMeta: Record<string, AlertMeta> = {
    NOTE: {
      defaultTitle: "Note",
      color: "#1775d9",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg>',
    },
    ABSTRACT: {
      defaultTitle: "Abstract",
      color: "#16a6ab",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>',
    },
    SUMMARY: {
      defaultTitle: "SUMMARY",
      color: "#16a6ab",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>',
    },
    INFO: {
      defaultTitle: "Info",
      color: "#1775d9",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>',
    },
    TODO: {
      defaultTitle: "Todo",
      color: "#1775d9",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>',
    },
    TIP: {
      defaultTitle: "Tip",
      color: "#16a6ab",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>',
    },
    HINT: {
      defaultTitle: "Hint",
      color: "#16a6ab",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>',
    },
    IMPORTANT: {
      defaultTitle: "Important",
      color: "#16a6ab",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>',
    },
    SUCCESS: {
      defaultTitle: "Success",
      color: "#1da51d",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>',
    },
    CHECK: {
      defaultTitle: "Check",
      color: "#1da51d",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>',
    },
    DONE: {
      defaultTitle: "Done",
      color: "#1da51d",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>',
    },
    QUESTION: {
      defaultTitle: "Question",
      color: "#de7417",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>',
    },
    HELP: {
      defaultTitle: "Help",
      color: "#de7417",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>',
    },
    FAQ: {
      defaultTitle: "Faq",
      color: "#de7417",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>',
    },
    WARNING: {
      defaultTitle: "Warning",
      color: "#de7417",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>',
    },
    CAUTION: {
      defaultTitle: "Caution",
      color: "#de7417",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>',
    },
    ATTENTION: {
      defaultTitle: "Attention",
      color: "#de7417",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>',
    },
    FAILURE: {
      defaultTitle: "Failure",
      color: "#dd2c38",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>',
    },
    FAIL: {
      defaultTitle: "Fail",
      color: "#dd2c38",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>',
    },
    MISSING: {
      defaultTitle: "Missing",
      color: "#dd2c38",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>',
    },
    DANGER: {
      defaultTitle: "Danger",
      color: "#dd2c38",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>',
    },
    ERROR: {
      defaultTitle: "Error",
      color: "#dd2c38",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>',
    },
    BUG: {
      defaultTitle: "Bug",
      color: "#dd2c38",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 2 1.88 1.88"></path><path d="M14.12 3.88 16 2"></path><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"></path><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"></path><path d="M12 20v-9"></path><path d="M6.53 9C4.6 8.8 3 7.1 3 5"></path><path d="M6 13H2"></path><path d="M3 21c0-2.1 1.7-3.9 3.8-4"></path><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"></path><path d="M22 13h-4"></path><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"></path></svg>',
    },
    EXAMPLE: {
      defaultTitle: "Example",
      color: "#8f47e1",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>',
    },
    QUOTE: {
      defaultTitle: "Quote",
      color: "#9e9e9e",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path></svg>',
    },
    CITE: {
      defaultTitle: "Cite",
      color: "#9e9e9e",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path></svg>',
    },
    PDF: {
      defaultTitle: "Pdf",
      color: "#ffd000",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 11-6 6v3h9l3-3"></path><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"></path></svg>',
    },
  };

  function admonitionRule(
    state: StateBlock,
    startLine: number,
    endLine: number,
    silent: boolean
  ): boolean {
    const startPos = state.bMarks[startLine] + state.tShift[startLine];
    if (startPos >= state.eMarks[startLine]) return false;

    // 必须以 ">" 开头
    if (state.src.charCodeAt(startPos) !== 0x3e /* '>' */) return false;

    const firstLineText = state.src.slice(startPos, state.eMarks[startLine]);
    const firstLine = firstLineText.replace(/^\s{0,3}>\s?/, "").trim();

    const headMatch = /^\[!([A-Za-z0-9]+(?:\|[^\]]*)?)\]([+-]?)(.*)/.exec(
      firstLine
    );
    if (!headMatch) return false;

    if (silent) return true;

    const rawKeyword = headMatch[1];
    const parts = rawKeyword.split("|");
    const keyword = parts[0].toUpperCase();
    const option = parts[1] ? parts[1] : "";
    const collapseFlag = headMatch[2]; // '+' | '-' | ''
    const customTitle = (headMatch[3] || "").trim();

    // 收集后续行
    let nextLine = startLine + 1;
    const bodyLines: string[] = [];

    for (; nextLine < endLine; nextLine++) {
      const lineStart = state.bMarks[nextLine] + state.tShift[nextLine];
      const lineEnd = state.eMarks[nextLine];
      const rawLine = state.src.slice(lineStart, lineEnd);

      if (/^\s*$/.test(rawLine)) break;

      const m = rawLine.match(/^\s{0,3}>\s?(.*)/);
      if (!m) break;

      bodyLines.push(m[1]);
    }

    const body = bodyLines.join("\n");

    // push tokens
    const tokenOpen = state.push("admonition_open", "div", 1);
    tokenOpen.block = true;
    tokenOpen.map = [startLine, nextLine];
    tokenOpen.meta = { keyword, option, customTitle, collapseFlag };

    const tokenBody = state.push("admonition_body", "", 0);
    tokenBody.content = body;
    tokenBody.map = [startLine + 1, nextLine];
    tokenBody.meta = tokenOpen.meta;

    state.push("admonition_close", "div", -1);

    state.line = nextLine;
    return true;
  }

  md.block.ruler.before(
    "blockquote",
    "admonition_from_blockquote",
    admonitionRule,
    { alt: ["paragraph", "reference", "blockquote"] }
  );

  // --- core rule for theorem numbering ---
  md.core.ruler.push("admonition_numbering", (state) => {
    const thmCounters: Record<string, number> = {};

    state.tokens.forEach((token) => {
      if (token.type === "admonition_open") {
        const meta = token.meta || {};
        const keyword = (meta.keyword || "").toUpperCase();
        const optionRaw = (meta.option || "").trim();

        if (thmMeta[keyword]) {
          if (optionRaw === "") {
            thmCounters[keyword] = (thmCounters[keyword] || 0) + 1;
            meta.assignedNumber = thmCounters[keyword];
          } else if (optionRaw === "*") {
            meta.assignedNumber = null;
          } else {
            meta.assignedNumber = optionRaw;
          }
        }
      }
    });

    return true;
  });

  // --- renderer ---
  md.renderer.rules["admonition_open"] = (
    tokens: Token[],
    idx: number,
    _options,
    env: any
  ) => {
    const meta = tokens[idx].meta || {};
    const keyword = (meta.keyword || "NOTE").toUpperCase();
    const option = (meta.option || "").toLowerCase();
    const collapse = meta.collapseFlag as string;
    const customTitle = meta.customTitle || "";

    if (thmMeta[keyword]) {
      const defaultTitle = thmMeta[keyword].defaultTitle || keyword;

      let titleHtml: string;

      if (meta.assignedNumber === null) {
        titleHtml = `${md.utils.escapeHtml(defaultTitle)}.`;
      } else if (typeof meta.assignedNumber === "number") {
        titleHtml = `${md.utils.escapeHtml(defaultTitle)} ${
          meta.assignedNumber
        }.`;
      } else {
        titleHtml = `${md.utils.escapeHtml(defaultTitle)} ${md.utils.escapeHtml(
          String(meta.assignedNumber)
        )}.`;
      }

      if (meta.customTitle) {
        titleHtml += ` <span style="font-weight:normal">(${md.renderInline(
          meta.customTitle
        )})</span>`;
      }

      if (collapse) {
        const openAttr = collapse === "+" ? " open" : "";
        return `<details class="thm-block"${openAttr}><summary class="thm-summary" role="button">${titleHtml}<span class="arrow"></span></summary><div class="thm-body">`;
      } else {
        return `<div class="thm-block"><div class="thm-title">${titleHtml}</div><div class="thm-body">`;
      }
    }

    const metaDef = alertMeta[keyword] || alertMeta["NOTE"];
    const icon = metaDef.icon || "";
    // const titleText = customTitle || metaDef.defaultTitle || keyword;

    const titleText = metaDef.defaultTitle || keyword;
    let titleHtml: string;

    if (meta.customTitle) {
      titleHtml = `<span class="admonition-title">${md.renderInline(
        meta.customTitle
      )}</span>`;
    } else {
      titleHtml = `<span class="admonition-title">${md.utils.escapeHtml(
        titleText
      )}</span>`;
    }

    let color: string;
    if (keyword === "PDF") {
      switch (option) {
        case "red":
          color = "#ea5252";
          break;
        case "yellow":
          color = alertMeta.PDF.color;
          break;
        case "important":
          color = "#bb61e5";
          break;
        case "note":
          color = alertMeta.NOTE.color;
          break;
        default:
          color = alertMeta.PDF.color;
      }
    } else {
      const metaDef = alertMeta[keyword] || alertMeta["NOTE"];
      color = metaDef.color || alertMeta.NOTE.color;
    }

    if (collapse) {
      const openAttr = collapse === "+" ? " open" : "";
      return `<details class="admonition alert-block"${openAttr} style="background:${color}20;"><summary class="admonition-summary" style="display:flex; align-items:center; gap:0.4em; color:${color}; cursor:pointer;">${
        icon ? `<span class="admonition-icon">${icon}</span>` : ""
      }${titleHtml}<span class="arrow"></span></summary><div class="admonition-body" style="margin-top:0.6em;">`;
    } else {
      return `<div class="admonition alert-block" style="background:${color}20;"><div class="admonition-header" style="display:flex; align-items:center; gap:0.4em; color:${color}; font-weight:bold; margin-bottom:0.4em;">${
        icon ? `<span class="admonition-icon">${icon}</span>` : ""
      }${titleHtml}</div><div class="admonition-body">`;
    }
  };

  md.renderer.rules["admonition_body"] = (
    tokens: Token[],
    idx: number,
    _options,
    env
  ) => {
    const content = tokens[idx].content || "";
    return md.render(content, env);
  };

  md.renderer.rules["admonition_close"] = (tokens: Token[], idx: number) => {
    const openToken = tokens[idx - 2] || {};
    const meta = (openToken.meta as any) || {};
    const keyword = (meta.keyword || "NOTE").toUpperCase();

    if (thmMeta[keyword]) {
      return meta.collapseFlag ? `</div></details>\n` : `</div></div>\n`;
    } else {
      return meta.collapseFlag ? `</div></details>\n` : `</div></div>\n`;
    }
  };
}
