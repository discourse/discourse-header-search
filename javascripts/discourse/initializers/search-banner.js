import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "search-banner",

  initialize() {
    withPluginApi("1.1.0", (api) => {
      const site = api.container.lookup("service:site");
      const currentUser = api.getCurrentUser();
      if (currentUser?.glimmer_header_enabled && !site.isMobileDevice) {
        api.addCustomHeaderClass("search-header--visible");
      } else {
        api.reopenWidget("header", {
          didRenderWidget() {
            if (!site.isMobileDevice) {
              document
                .querySelector(".d-header")
                .classList.add("search-header--visible");
            }
          },
        });
      }
    });
  },
};
