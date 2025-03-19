import DefaultTheme from "vitepress/theme";
import VersionSwitcher from "../components/VersionSwitcher.vue";
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("VersionSwitcher", VersionSwitcher);
  },
};
