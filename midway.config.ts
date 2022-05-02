import path from 'path'
import react from '@vitejs/plugin-react';
import { defineConfig } from '@midwayjs/hooks-kit';

export default defineConfig({
  vite: {
    plugins: [react()],
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, './src')
      }
    }
  },
});
