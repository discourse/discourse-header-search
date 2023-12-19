import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "search-banner",

  initialize() {
    withPluginApi("1.1.0", (api) => {
      const site = api.container.lookup("service:site");
      api.reopenWidget("header", {
        didRenderWidget() {
          if (!site.isMobileDevice) {
            document
              .querySelector(".d-header")
              .classList.add("search-header--visible");
          }
        },
      });
    });
  },
};
