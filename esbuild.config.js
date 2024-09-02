const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['node_modules/kubo-rpc-client/dist/src/index.js'], // helia包的入口文件
  bundle: true,
  format: 'cjs', // 设置输出格式为CommonJS
  outfile: 'kubo-rpc-client-cjs.js', // 输出文件名
}).catch(() => process.exit(1));