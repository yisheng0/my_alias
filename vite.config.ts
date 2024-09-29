import { defineConfig } from 'vite';
import * as path from 'path';
import * as fs from 'fs';

export default defineConfig({
  plugins: [
    createAliasPlugin('$', path.resolve(__dirname, 'src')),
  ],
  build: {
    lib: {
      entry: './index.ts',
      name: 'my_alias',
      formats: ['es'],
    },
    outDir: 'dist',
    minify: false,
    manifest: true,
  },
});


function createAliasPlugin(alias: string, basePath: string) {
    return {
      name: "custom-alias-plugin",
      resolveId(id: string) {
        console.log('Resolving:', id);
        if (id.startsWith(`${alias}/`)) {
          const relativePath = id.slice(alias.length + 1);
          const fullBasePath = path.resolve(basePath, relativePath);
          const extensions = ['.ts', '.tsx', '.js', '.jsx'];
          
          for (const ext of extensions) {
            const fullPath = fullBasePath + ext;
            if (fs.existsSync(fullPath)) {
              console.log('Resolved to:', fullPath);
              return fullPath;
            }
          }
          
          console.log('Could not resolve:', id);
        }
        return null;
      },
    };
  }
  