import { apiInitializer } from "discourse/lib/api";
import HeaderSearch from "../components/header-search";

export default apiInitializer("1.14.0", (api) => {
  api.renderInOutlet("before-header-panel", HeaderSearch);
});
