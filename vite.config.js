import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteImagemin from 'vite-plugin-imagemin'
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        viteImagemin({ // 配置各种类型的图片压缩
            verbose: true, // 是否在控制台输出压缩结果
            gifsicle: { // gif压缩
                optimizationLevel: 7, // 压缩比例
            },
            optipng: {
                optimizationLevel: 7,
            },
            mozjpeg: {
                quality: 20,
            },
            pngquant: {
                quality: [0.8, 0.9],
                speed: 4,
            },
            svgo: {
                plugins: [
                    {
                        name: 'removeViewBox',
                    },
                    {
                        name: 'removeEmptyAttrs',
                        active: false,
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['vue', 'vue-router'],
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: 'Vue', 'vue-router': 'vue-router'
                }
            }
        }
    },
    base: './',
    server: {
        open: true,
        port: 8080,
        proxy: {
            "/test": {
                target: "http://localhost:3000",
                changeOrigin: true,
                ws: true,
                rewrite: (path) => path.replace(/^\/test/, ''),
                cookieDomainRewrite: {
                    "*": ""
                },
            }
        }
    }
})