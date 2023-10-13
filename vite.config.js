import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {prismjsPlugin} from 'vite-plugin-prismjs';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        prismjsPlugin({
            languages: ['json','python','java','c','js','ts','go','html','css','sql','c#'],
        })
    ],
    optimizeDeps: { //使用v-md-editor
        include: ['@kangc/v-md-editor/lib/theme/vuepress.js'],
    },
})

