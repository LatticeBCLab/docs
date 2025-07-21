import DefaultTheme from "vitepress/theme";
import VersionSwitcher from "../components/VersionSwitcher.vue";
import Captcha from "../components/captcha.vue";
import CustomerService from "../components/CustomerService.vue";
import Layout from "./Layout.vue";
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("VersionSwitcher", VersionSwitcher);
    app.component("Captcha",Captcha);
    app.component("CustomerService", CustomerService);
  },
  Layout: Layout,
};
