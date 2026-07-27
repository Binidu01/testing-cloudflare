import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { biniroute } from 'bini-router';
import { biniOverlay } from 'bini-overlay';
import { biniEnv } from 'bini-env';
import { biniExport } from 'bini-export';
import tailwindcss from '@tailwindcss/vite';

import { existsSync } from 'node:fs';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isBuild = command === 'build';
  const port = parseInt(env['PORT'] ?? '3000', 10);

  const isTauri = env['TAURI'] === 'true' ||
                  process.env.TAURI === 'true' ||
                  existsSync('./src-tauri');

  const tauriDevHost = process.env.TAURI_DEV_HOST;

  const host = tauriDevHost
    ? true
    : isTauri
      ? '0.0.0.0'
      : (env['CODESPACE_NAME'] ? '0.0.0.0' : 'localhost');

  const hmrConfig = env['CODESPACE_NAME']
    ? { clientPort: 443, overlay: false }
    : tauriDevHost
      ? {
          overlay: false,
          protocol: 'ws',
          host: tauriDevHost,
          port,
        }
      : {
          overlay: false,
          host: 'localhost',
          protocol: 'ws',
        };

  return {
    plugins: [
      tailwindcss(),
      react(),
      biniroute({ platform: 'node' }),
      biniOverlay(),
      biniEnv(),
      biniExport(),
    ],

    server: {
      port,
      host,
      open: !isTauri,
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      hmr: hmrConfig,
      watch: {
        usePolling: !!env['CODESPACE_NAME'] || isTauri,
        ignored: [
          '**/dist/**',
          '**/node_modules/**'
        ],
      },
      strictPort: true,
    },

    preview: {
      port,
      host: '0.0.0.0',
      open: true,
      cors: true
    },

    build: {
      outDir: 'dist',
      sourcemap: !isBuild,
      emptyOutDir: true,
      minify: isBuild,
      cssCodeSplit: true,
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const name = assetInfo.names?.[0] ?? assetInfo.name ?? '';
            const ext = name.split('.').pop() ?? '';
            if (/png|jpe?g|gif|svg|webp|avif/.test(ext)) return 'assets/images/[name]-[hash][extname]';
            if (/woff2?|eot|ttf|otf/.test(ext)) return 'assets/fonts/[name]-[hash][extname]';
            if (ext === 'css') return 'css/[name]-[hash][extname]';
            if (ext === 'json') return 'data/[name]-[hash][extname]';
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },

    resolve: { alias: { '@': '/src' } },
    css: {
      modules: { localsConvention: 'camelCase' },
      devSourcemap: true
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom']
    },
    types: ["vite/client"]
  };
});
