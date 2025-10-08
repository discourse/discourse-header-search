import { apiInitializer } from "discourse/lib/api";
import HeaderSearch from "../components/header-search";

export default apiInitializer((api) => {
  api.renderInOutlet("before-header-panel", HeaderSearch);
});
