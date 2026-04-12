import { defineConfig } from 'vite';
import path from 'path';

function forceAppStylesheetFirst() {
  return {
    name: 'force-app-stylesheet-first',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const re =
          /<link\b[^>]*\brel=["']stylesheet["'][^>]*\bhref=["'][^"']*\/assets\/index-[^"'?]+\.css["'][^>]*>/gi;
        const tags = [...html.matchAll(re)].map((m) => m[0]);
        if (!tags.length) return html;

        let out = html;
        for (const t of tags) {
          out = out.replace(t, '');
        }
        const block = tags.join('\n    ');
        return out.includes('</title>')
          ? out.replace('</title>', `</title>\n    ${block}`)
          : out;
      },
    },
  };
}

// Dev : `base` à `/` pour correspondre à `npm run dev`.
// Prod (`npm run build`) : sous-chemin GitHub Pages pour que les assets résolvent correctement.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/odoo-mockup-integration/' : '/',

  plugins: [forceAppStylesheetFirst()],

  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules'),
    },
  },
}));
