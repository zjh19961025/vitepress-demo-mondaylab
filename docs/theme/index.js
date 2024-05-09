import DefaultTheme from "vitepress/theme";
// @ts-ignore
import Home from './Home.vue'

export default {
    extends: DefaultTheme,
    enhanceApp: ({ app }) => {
        app.component('Home', Home)
    }
}
