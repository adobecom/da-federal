import esbuild from 'esbuild';

// Plugin to inject CSS into JS
const injectCSSPlugin = {
  name: 'inject-css',
  setup(build) {
    build.onLoad({ filter: /\.css$/ }, async (args) => {
      const fs = await import('fs/promises');
      const css = await fs.readFile(args.path, 'utf8');

      const contents = `
        const css = ${JSON.stringify(css)};
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
      `;

      return { contents, loader: 'js' };
    });
  },
};

// Build test exports for testing
await esbuild.build({
  entryPoints: ['src/test-exports.ts'],
  bundle: true,
  outfile: 'dist/test-exports.js',
  format: 'esm',
  platform: 'browser',
  target: ['es2020'],
  sourcemap: true,
  logLevel: 'info',
  plugins: [injectCSSPlugin],
});
console.log('Build complete - test-exports.js created');
