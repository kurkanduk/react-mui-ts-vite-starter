import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import path from 'path';

export default defineConfig({
    base: './',
    resolve: {
        alias: {
          Components: path.resolve(__dirname, './src/components'),
          Hooks: path.resolve(__dirname, './src/hooks'),
          Utils: path.resolve(__dirname, './src/utils'),
        },
      },
    plugins: [react(), viteTsconfigPaths()],
    server: {    
        open: true,
        port: 3000, 
    },
})