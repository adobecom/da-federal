// import esbuild from 'esbuild';

// await esbuild.build({
//   entryPoints: ['features/privacy/privacy-standalone.js'],
//   bundle: true,
//   minify: true,
//   format: 'esm',
//   outfile: 'dist/privacy-standalone.min.js',
//   splitting: false,
// });


import * as esbuild from 'esbuild';
import fs from 'node:fs';

fs.rmSync('./dist/', { recursive: true, force: true });

const StyleLoader = {
  name: 'inline-style',
  setup(build) {
    const injectStyle = (css) => `
      if (typeof document < 'u') {
        const style = document.createElement('style');
        style.textContent = ${JSON.stringify(css)};
        document.head.appendChild(style);
      }
    `;

    build.onLoad({ filter: /\.css$/ }, async (args) => {
      const css = await fs.promises.readFile(args.path, 'utf8');
      return {
        contents: injectStyle(css),
        loader: 'js',
      };
    });
  },
};

await esbuild.build({
  entryPoints: ['features/privacy/privacy-standalone.js'],
  bundle: true,
  format: 'esm',
  splitting: false,
  sourcemap: true,
  minify: true,
  outfile: 'dist/privacy-standalone.min.js',
  plugins: [StyleLoader],
});

