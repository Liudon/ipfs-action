const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['node_modules/helia/dist/src/index.js'], // helia包的入口文件
  bundle: true,
  format: 'cjs', // 设置输出格式为CommonJS
  outfile: 'helia-cjs.js', // 输出文件名
}).catch(() => process.exit(1));