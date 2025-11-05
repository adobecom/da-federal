import esbuild from 'esbuild';
import { execSync } from 'child_process';

const isWatch = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'dist/main.js',
  format: 'esm',
  platform: 'browser',
  target: ['es2020'],
  minify: true,
  sourcemap: true,
  external: [], // Add any external dependencies here
};

const build = async () => {
  try {
    // Run TypeScript type checking first
    console.log('Running TypeScript type checking...');
    execSync('tsc --noEmit', { stdio: 'inherit' });
    console.log('TypeScript type checking passed!');

    if (isWatch) {
      const context = await esbuild.context(buildOptions);
      await context.watch();
      console.log('Watching for changes...');
    } else {
      await esbuild.build(buildOptions);
      console.log('Build completed successfully');
    }
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
};

build();