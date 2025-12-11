import esbuild from 'esbuild';
import { execSync } from 'child_process';

const isWatch = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: ['src/Main.ts'],
  bundle: true,
  outfile: 'dist/main.js',
  format: 'esm',
  platform: 'browser',
  target: ['es2020'],
  minify: true,
  sourcemap: true,
  logLevel: 'info',
};

if (isWatch) {
  const context = await esbuild.context({
    ...buildOptions,
    plugins: [{
      name: 'type-check',
      setup(build) {
        build.onStart(() => {
          execSync('tsc --noEmit', { stdio: 'inherit' });
        });
      },
    }],
  });
  await context.watch();
} else {
  execSync('tsc --noEmit', { stdio: 'inherit' });
  
  await esbuild.build(buildOptions);
  console.log('Build complete');
}
