import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router/index.js";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import comment from './components/comment.vue'
// 全局注册v-md-editor
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
//引入表情包
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
//引入 katex
// import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';
//快捷复制代码
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
//particles
import Particles from "vue3-particles";




//预览组件preview
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
/////设置主题
///预览组件的主题
VMdPreview.use(vuepressTheme, {
    Prism,
});

///编辑组件的主题
VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});

const app = createApp(App)
app.component('comment', comment)  //注册为全局组件 在其他组件中使用 就不需要import了
app.use(VueMarkdownEditor);
VueMarkdownEditor.use(createEmojiPlugin());
// VueMarkdownEditor.use(createKatexPlugin())
VueMarkdownEditor.use(createCopyCodePlugin());
app.use(VMdPreview)
app.use(ElementPlus) //引入element-plus
app.use(router);
app.use(Particles);

// 屏蔽控制台警告信息
app.config.warnHandler = () => null;
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {  //应用所有图标
    app.component(key, component)
}
app.mount('#app')
