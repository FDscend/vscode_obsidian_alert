// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";
import MarkdownIt from "markdown-it";
import admonitionPlugin from "./markdown-it-alert";
import {
  NOTEBOOK_RENDERER_ID,
  NOTEBOOK_STYLE_REQUEST_MESSAGE,
  NOTEBOOK_STYLE_UPDATE_MESSAGE,
} from "./notebook-styles";

const textDecoder = new TextDecoder("utf-8");
const NOTEBOOK_STYLE_CONFIGURATION_KEY =
  "markdown-obsidian-alert.notebook.styles";

async function uriExists(uri: vscode.Uri): Promise<boolean> {
  try {
    await vscode.workspace.fs.stat(uri);
    return true;
  } catch {
    return false;
  }
}

function looksLikeUri(value: string): boolean {
  return /^[a-z][a-z0-9+.-]*:/i.test(value);
}

async function resolveMarkdownStyleUris(): Promise<vscode.Uri[]> {
  const configuredStyles = vscode.workspace
    .getConfiguration("markdown-obsidian-alert")
    .get<string[]>("notebook.styles", []);
  const resolved = new Map<string, vscode.Uri>();

  for (const configuredStyle of configuredStyles) {
    const stylePath = configuredStyle.trim();
    if (!stylePath) {
      continue;
    }

    if (looksLikeUri(stylePath)) {
      try {
        const uri = vscode.Uri.parse(stylePath);
        if (await uriExists(uri)) {
          resolved.set(uri.toString(), uri);
        }
      } catch {
        // Ignore unsupported URIs and continue with the remaining paths.
      }

      continue;
    }

    if (path.isAbsolute(stylePath)) {
      const fileUri = vscode.Uri.file(stylePath);
      if (await uriExists(fileUri)) {
        resolved.set(fileUri.toString(), fileUri);
      }
      continue;
    }

    const normalizedStylePath = stylePath.replace(/\\/g, "/").replace(/^\.\//, "");
    const pathSegments = normalizedStylePath.split("/").filter(Boolean);

    if (pathSegments.length === 0) {
      continue;
    }

    for (const workspaceFolder of vscode.workspace.workspaceFolders ?? []) {
      const uri = vscode.Uri.joinPath(workspaceFolder.uri, ...pathSegments);
      if (await uriExists(uri)) {
        resolved.set(uri.toString(), uri);
      }
    }
  }

  return [...resolved.values()];
}

async function readMarkdownStyleContents(): Promise<string> {
  const cssBlocks: string[] = [];

  for (const styleUri of await resolveMarkdownStyleUris()) {
    try {
      const content = await vscode.workspace.fs.readFile(styleUri);
      cssBlocks.push(`/* ${styleUri.toString()} */\n${textDecoder.decode(content)}`);
    } catch {
      // Ignore unreadable styles and continue applying the rest.
    }
  }

  return cssBlocks.join("\n\n");
}

async function postNotebookStyles(
  rendererMessaging: vscode.NotebookRendererMessaging,
  editor?: vscode.NotebookEditor
): Promise<void> {
  await rendererMessaging.postMessage(
    {
      type: NOTEBOOK_STYLE_UPDATE_MESSAGE,
      cssText: await readMarkdownStyleContents(),
    },
    editor
  );
}

async function refreshNotebookStylesIfNeeded(
  rendererMessaging: vscode.NotebookRendererMessaging,
  changedUri: vscode.Uri
): Promise<void> {
  const styleUris = await resolveMarkdownStyleUris();
  const styleUriSet = new Set(styleUris.map((uri) => uri.toString()));

  if (styleUriSet.has(changedUri.toString())) {
    await postNotebookStyles(rendererMessaging);
  }
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  // console.log(
  //   'Congratulations, your extension "vscode-markdown-obsidian-alert" is now active!'
  // );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
//   const disposable = vscode.commands.registerCommand(
//     "vscode-markdown-obsidian-alert.helloWorld",
//     () => {
//       // The code you place here will be executed every time your command is executed
//       // Display a message box to the user
//       vscode.window.showInformationMessage(
//         "Hello World from vscode-markdown-obsidian-alert!"
//       );
//     }
//   );

//   context.subscriptions.push(disposable);

  const rendererMessaging = vscode.notebooks.createRendererMessaging(
    NOTEBOOK_RENDERER_ID
  );

  context.subscriptions.push(
    rendererMessaging.onDidReceiveMessage(({ editor, message }) => {
      if (
        !message
        || typeof message !== "object"
        || (message as { type?: unknown }).type !== NOTEBOOK_STYLE_REQUEST_MESSAGE
      ) {
        return;
      }

      void postNotebookStyles(rendererMessaging, editor);
    })
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration(NOTEBOOK_STYLE_CONFIGURATION_KEY)) {
        void postNotebookStyles(rendererMessaging);
      }
    })
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeWorkspaceFolders(() => {
      void postNotebookStyles(rendererMessaging);
    })
  );

  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument((document) => {
      void refreshNotebookStylesIfNeeded(rendererMessaging, document.uri);
    })
  );

  void postNotebookStyles(rendererMessaging);

  return {
    extendMarkdownIt(md: MarkdownIt) {
      return md.use(admonitionPlugin);
    },
  };
}

// This method is called when your extension is deactivated
export function deactivate() {}
