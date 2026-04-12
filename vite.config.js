import { defineConfig } from 'vite';
import path from 'path';

function cssBeforeModuleScript() {
  return {
    name: 'css-before-module-script',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const linkRe = /<link[^>]+rel="stylesheet"[^>]*>/gi;
        const links = html.match(linkRe);
        if (!links?.length) return html;

        let out = html;
        for (const tag of links) {
          out = out.replace(tag, '');
        }
        const block = links.join('\n    ');
        if (out.includes('</title>')) {
          return out.replace('</title>', `</title>\n    ${block}`);
        }
        return out.replace(/<head(\s[^>]*)?>/i, (m) => `${m}\n    ${block}`);
      },
    },
  };
}

// Dev : `base` à `/` pour correspondre à `npm run dev`.
// Prod (`npm run build`) : sous-chemin GitHub Pages pour que les assets résolvent correctement.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/odoo-mockup-integration/' : '/',

  plugins: [cssBeforeModuleScript()],

  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules'),
    },
  },
}));
