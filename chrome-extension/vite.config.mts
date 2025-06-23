import { resolve } from 'node:path';
import { defineConfig, loadEnv, type PluginOption } from 'vite';
import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets';
import makeManifestPlugin from './utils/plugins/make-manifest-plugin';
import { watchPublicPlugin, watchRebuildPlugin } from '@extension/hmr';
import { isDev, isProduction, watchOption } from '@extension/vite-config';



const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');

const outDir = resolve(rootDir, '..', 'dist');
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ''); // ✅ load .env file

  const rootDir = resolve(__dirname);
  const srcDir = resolve(rootDir, 'src');
  const outDir = resolve(rootDir, '..', 'dist');

  return {
    define: {
      'import.meta.env.VITE_GROQ_API_KEY': JSON.stringify(env.VITE_GROQ_API_KEY), // ✅ now properly injected
    },
    resolve: {
      alias: {
        '@root': rootDir,
        '@src': srcDir,
        '@assets': resolve(srcDir, 'assets'),
      },
      conditions: ['browser', 'module', 'import', 'default'],
      mainFields: ['browser', 'module', 'main'],
    },
    server: {
      cors: {
        origin: ['http://localhost:5173', 'http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
      },
      host: 'localhost',
      sourcemapIgnoreList: false,
    },
    plugins: [
      libAssetsPlugin({
        outputPath: outDir,
      }) as PluginOption,
      watchPublicPlugin(),
      makeManifestPlugin({ outDir }),
      isDev && watchRebuildPlugin({ reload: true, id: 'chrome-extension-hmr' }),
    ],
    publicDir: resolve(rootDir, 'public'),
    build: {
      lib: {
        formats: ['iife'],
        entry: resolve(__dirname, 'src/background/index.ts'),
        name: 'BackgroundScript',
        fileName: 'background',
      },
      outDir,
      emptyOutDir: false,
      sourcemap: isDev,
      minify: isProduction,
      reportCompressedSize: isProduction,
      watch: watchOption,
      rollupOptions: {
        external: ['chrome'],
      },
    },
    envDir: '../',
  };
});
