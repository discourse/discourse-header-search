import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "search-banner",

  initialize() {
    withPluginApi("1.1.0", (api) => {
      const site = api.container.lookup("service:site");
      if (!site.isMobileDevice) {
        document.querySelector("body").classList.add("search-header--visible");
      }
    });
  },
};
