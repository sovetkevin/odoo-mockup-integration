import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: '/odoo-mockup-integration/', 
  
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules')
    }
  }
});