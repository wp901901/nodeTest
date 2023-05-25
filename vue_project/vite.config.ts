import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports:["vue","vue-router"],
      resolvers: [ElementPlusResolver()],
      dts:'auto-import.d.ts'
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  server: {
    proxy:{
      '/dev': {
        target: 'http://127.0.0.1:3000', // 将请求代理到目标服务器
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev/, ''), // 去掉请求路径中的 '/api' 前缀
      },
    }
  }
})
