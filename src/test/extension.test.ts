import * as assert from 'assert';
import MarkdownIt from 'markdown-it';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import admonitionPlugin from '../markdown-it-alert';
import { buildNotebookBaseCss, NOTEBOOK_COMPAT_CSS } from '../notebook-styles';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('passes notebook env to inline custom title rendering', () => {
		const md = new MarkdownIt({ html: true });
		md.use(admonitionPlugin);

		const originalRenderInline = md.renderInline.bind(md);
		md.renderInline = (src, env) => {
			assert.deepStrictEqual(env, { id: 'notebook-cell' });
			return originalRenderInline(src, env);
		};

		md.render('> [!tip] Custom title', { id: 'notebook-cell' });
		md.render('> [!thm] Theorem name', { id: 'notebook-cell' });
	});

	test('renders callouts with Obsidian-compatible DOM structure', () => {
		const markdown = [
			'> [!faq]- Closed block',
			'> body',
			'',
			'> [!border] border',
			'> border body',
			'',
			'> [!note]+ Open block',
			'> body',
		].join('\n');

		const md = new MarkdownIt({ html: true });
		md.use(admonitionPlugin);

		const html = md.render(markdown);

		assert.match(
			html,
			/<div(?=[^>]*class="[^"]*\bcallout\b[^"]*\bis-collapsible\b[^"]*\bis-collapsed\b)(?=[^>]*data-callout="faq")(?=[^>]*data-callout-fold="-")(?=[^>]*data-callout-metadata="")[^>]*>/
		);
		assert.doesNotMatch(
			html,
			/<input class="callout-fold-toggle" type="checkbox" id="[^"]+" checked="" aria-hidden="true">[\s\S]*?<span class="callout-title-inner">Closed block<\/span>/
		);
		assert.match(
			html,
			/<input class="callout-fold-toggle" type="checkbox" id="[^"]+" checked="" aria-hidden="true">[\s\S]*?<span class="callout-title-inner">Open block<\/span>/
		);
		assert.match(
			html,
			/<label class="callout-title" for="[^"]+" dir="auto">[\s\S]*?<span class="callout-icon">[\s\S]*?<\/span><span class="callout-title-inner">Closed block<\/span><span class="callout-fold" aria-hidden="true">[\s\S]*?class="svg-icon lucide-chevron-down"[\s\S]*?<\/span><\/label><div class="callout-content">/
		);
		assert.match(
			html,
			/<div(?=[^>]*class="[^"]*\bcallout\b)(?=[^>]*data-callout="border")(?=[^>]*data-callout-fold="")[^>]*>[\s\S]*?<span class="callout-title-inner">border<\/span>[\s\S]*?<div class="callout-content"><p>border body<\/p>/
		);
	});

	test('supports hyphen and underscore in callout keywords', () => {
		const markdown = [
			'> [!note-2]',
			'> body',
			'',
			'> [!note_2]',
			'> body',
		].join('\n');

		const md = new MarkdownIt({ html: true });
		md.use(admonitionPlugin);

		const html = md.render(markdown);

		assert.match(
			html,
			/<div(?=[^>]*class="[^"]*\bcallout\b)(?=[^>]*data-callout="note-2")[^>]*>[\s\S]*?<span class="callout-title-inner">note 2<\/span>[\s\S]*?<div class="callout-content"><p>body<\/p>/
		);
		assert.match(
			html,
			/<div(?=[^>]*class="[^"]*\bcallout\b)(?=[^>]*data-callout="note_2")[^>]*>[\s\S]*?<span class="callout-title-inner">note_2<\/span>[\s\S]*?<div class="callout-content"><p>body<\/p>/
		);
	});

	test('preserves source line mapping inside theorem blocks', () => {
		const markdown = [
			'# math alert',
			'',
			'Automatic Numbering (Default): Use `> [!thm]` to create a theorem environment.',
			'',
			'> [!thm] Theorem name',
			'>',
			'> Theorem content',
		].join('\n');

		const md = new MarkdownIt({ html: true });
		md.use(admonitionPlugin);

		const originalRenderToken = md.renderer.renderToken.bind(md.renderer);
		md.renderer.renderToken = (tokens, idx, options) => {
			const token = tokens[idx];

			if (token.map && token.nesting !== -1) {
				token.attrSet('data-line', String(token.map[0]));
			}

			return originalRenderToken(tokens, idx, options);
		};

		const html = md.render(markdown);

		assert.match(html, /<h1[^>]*data-line="0"[^>]*>math alert<\/h1>/);
		assert.match(
			html,
			/<p[^>]*data-line="2"[^>]*>Automatic Numbering \(Default\):/
		);
		assert.match(
			html,
			/<div[^>]*(data-line="4"[^>]*class="thm-block"|class="thm-block"[^>]*data-line="4")/
		);
		assert.match(
			html,
			/<p[^>]*data-line="6"[^>]*>Theorem content<\/p>/
		);
	});

	test('includes notebook preview compatibility styles', () => {
		assert.match(NOTEBOOK_COMPAT_CSS, /#preview > \.callout/);
		assert.match(NOTEBOOK_COMPAT_CSS, /box-sizing: border-box/);
		assert.match(NOTEBOOK_COMPAT_CSS, /padding-bottom: 0\.55em/);

		const baseCss = buildNotebookBaseCss('.callout { color: red; }');
		assert.ok(baseCss.startsWith('.callout { color: red; }'));
		assert.ok(baseCss.endsWith(NOTEBOOK_COMPAT_CSS));
	});
});
