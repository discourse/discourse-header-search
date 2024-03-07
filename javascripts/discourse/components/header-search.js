import Component from "@glimmer/component";
import { action } from "@ember/object";
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
    return this.displayForUser && !this.site.mobileView;
  }

  @action
  didInsert() {
    // Setting a class on <html> from a component is not great
    // but we need it for backwards compatibility
    document.documentElement.classList.add("search-header--visible");
  }

  @action
  willDestroy() {
    super.willDestroy(...arguments);
    document.documentElement.classList.remove("search-header--visible");
  }
}
