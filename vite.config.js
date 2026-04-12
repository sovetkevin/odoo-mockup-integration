import { defineConfig } from 'vite';
import path from 'path';

// Dev : `base` à `/` pour correspondre à `npm run dev`.
// Prod (`npm run build`) : sous-chemin GitHub Pages pour que les assets résolvent correctement.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/odoo-mockup-integration/' : '/',

  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules'),
    },
  },
}));
