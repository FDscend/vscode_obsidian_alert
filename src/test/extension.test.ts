import * as assert from 'assert';
import MarkdownIt from 'markdown-it';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import admonitionPlugin from '../markdown-it-alert';

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

	test('renders foldable callouts as native details elements', () => {
		const markdown = [
			'> [!faq]- Closed block',
			'> body',
			'',
			'> [!note]+ Open block',
			'> body',
		].join('\n');

		const md = new MarkdownIt({ html: true });
		md.use(admonitionPlugin);

		const html = md.render(markdown);

		assert.match(
			html,
			/<details[^>]*class="admonition alert-block"[^>]*>[\s\S]*?<summary class="admonition-summary"/ 
		);
		assert.doesNotMatch(
			html,
			/<details[^>]*(class="admonition alert-block"[^>]*open=""|open=""[^>]*class="admonition alert-block")[^>]*>[\s\S]*Closed block/
		);
		assert.match(
			html,
			/<details[^>]*(class="admonition alert-block"[^>]*open=""|open=""[^>]*class="admonition alert-block")[^>]*>[\s\S]*Open block/
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
});
