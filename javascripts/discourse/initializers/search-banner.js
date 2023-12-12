import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "search-banner",

  initialize() {
    withPluginApi("1.1.0", (api) => {
      api.reopenWidget("header", {
        didRenderWidget() {
          document
            .querySelector(".d-header")
            .classList.add("search-header--visible");
        },
      });
    });
  },
};
