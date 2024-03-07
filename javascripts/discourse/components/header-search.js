import Component from "@glimmer/component";
import { inject as service } from "@ember/service";

export default class HeaderSearch extends Component {
  @service site;
  @service router;
  @service siteSettings;
  @service currentUser;

  get displayForUser() {
    return (
      (this.siteSettings.login_required && this.currentUser)
      || !this.siteSettings.login_required
    );
  }

  get shouldDisplay() {
    return this.displayForUser && !this.site.mobileView && !this.router.currentRoute.name.includes("topic");
  }
}
