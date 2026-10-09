import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { biniroute } from 'bini-router';
import { biniOverlay } from 'bini-overlay';
import { biniEnv } from 'bini-env';
import { biniSSG } from 'bini-ssg';

export default defineConfig(({ command, mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isBuild = command === 'build';
  const port = parseInt(env['PORT'] ?? '3000', 10);

  const isTauri = env['TAURI'] === 'true' || process.env.TAURI === 'true';
  // Set by the Tauri CLI for `android dev` / `ios dev` (the LAN IP of this machine).
  const tauriDevHost = process.env.TAURI_DEV_HOST;
  const isCodespace = !!env['CODESPACE_NAME'];

  const host = tauriDevHost || (isTauri || isCodespace ? '0.0.0.0' : 'localhost');

  const hmrConfig = tauriDevHost
    ? { protocol: 'ws', host: tauriDevHost, port: port + 1, overlay: false }
    : isCodespace
      ? { clientPort: 443, overlay: false }
      : { overlay: false, host: 'localhost', protocol: 'ws' };

  return {
    plugins: [
      react(),
      biniroute(),
      biniOverlay(),
      biniEnv(),
      biniSSG(),
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
        usePolling: isCodespace || isTauri,
        ignored: [
          '**/dist/**',
          '**/node_modules/**',
          ...(isTauri ? [
            '**/src-tauri/**',
            '**/target/**',
            '**/*.exe',
            '**/*.dll',
            '**/*.pdb',
          ] : []),
        ],
      },
      // Tauri's devUrl is fixed (http://localhost:3000): never let Vite hop to another port.
      strictPort: isTauri,
    },

    preview: {
      port,
      host: '0.0.0.0',
      open: true,
      cors: true,
    },

    build: {
      // The SSR pass (`vite build --ssr`) gets its own folder so it never mixes with or wipes the client build.
      // Order matters: the client build runs first (it empties dist/), then the SSR pass fills dist/.bini.
      outDir: isSsrBuild ? 'dist/.bini' : 'dist',
      sourcemap: isBuild,
      emptyOutDir: true,
      minify: isBuild,
      cssCodeSplit: true,
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,
      rolldownOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const name = assetInfo.names?.[0] ?? assetInfo.name ?? '';
            const ext = name.split('.').pop()?.toLowerCase() || '';
            if (/png|jpe?g|gif|svg|webp|avif/.test(ext)) {
              return 'assets/images/[name]-[hash][extname]';
            }
            if (/woff2?|eot|ttf|otf/.test(ext)) {
              return 'assets/fonts/[name]-[hash][extname]';
            }
            if (ext === 'css') return 'css/[name]-[hash][extname]';
            if (ext === 'json') return 'data/[name]-[hash][extname]';
            return 'assets/[name]-[hash][extname]';
          },
        },
        onwarn(warning, warn) {
          const ignoreCodes = [
            'MODULE_EXTERNALIZED',
            'INEFFECTIVE_DYNAMIC_IMPORT',
            'UNRESOLVED_IMPORT',
          ];
          const ignoreMessages = [
            'stream',
            'externalized',
            'dynamic import will not move module',
          ];
          const code = warning.code || '';
          const message = warning.message || '';

          if (ignoreCodes.includes(code)) return;
          if (ignoreMessages.some((msg) => message.includes(msg))) return;
          warn(warning);
        },
      },
    },

    resolve: {
      alias: { '@': '/src' },
    },

    css: {
      modules: { localsConvention: 'camelCase' },
      devSourcemap: true,
    },

    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
    },
  };
});
