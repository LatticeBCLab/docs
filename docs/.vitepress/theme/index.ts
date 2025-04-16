import DefaultTheme from "vitepress/theme";
import VersionSwitcher from "../components/VersionSwitcher.vue";
import Captcha from "../components/captcha.vue";
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("VersionSwitcher", VersionSwitcher);
    app.component("Captcha",Captcha);
  },
};
