import DefaultTheme from "vitepress/theme";
import VersionSwitcher from "../components/VersionSwitcher.vue";
import Captcha from "../components/captcha.vue";
import ChatBot from "../components/ChatBot.vue";
import Layout from "./Layout.vue";
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("VersionSwitcher", VersionSwitcher);
    app.component("Captcha",Captcha);
    app.component("ChatBot", ChatBot);
  },
  Layout: Layout,
};
