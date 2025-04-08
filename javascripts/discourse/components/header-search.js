import Component from "@glimmer/component";
import { service } from "@ember/service";
import { modifier as modifierFn } from "ember-modifier";

export default class HeaderSearch extends Component {
  @service site;
  @service siteSettings;
  @service currentUser;
  @service appEvents;
  @service search;

  handleKeyboardShortcut = modifierFn(() => {
    const cb = () => this.search.focusSearchInput();
    this.appEvents.on("header:keyboard-trigger", cb);
    return () => this.appEvents.off("header:keyboard-trigger", cb);
  });

  get displayForUser() {
    return (
      (this.siteSettings.login_required && this.currentUser) ||
      !this.siteSettings.login_required
    );
  }

  get shouldDisplay() {
    return (
      this.displayForUser &&
      !this.site.mobileView &&
      !this.args.outletArgs?.topicInfoVisible
    );
  }
}
