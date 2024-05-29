// 在.vitepress/theme/index.ts文件
import DefaultTheme from 'vitepress/theme';
import './custom.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.use(ElementPlus)
    }
};

