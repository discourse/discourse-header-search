import Component from "@glimmer/component";
import { service } from "@ember/service";
import { modifier as modifierFn } from "ember-modifier";
import SearchMenu from "discourse/components/search-menu";
import bodyClass from "discourse/helpers/body-class";
import SearchIcon from "./search-icon";

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

  <template>
    {{#if this.shouldDisplay}}
      {{bodyClass "search-header--visible"}}
      <div
        class="floating-search-input-wrapper"
        {{this.handleKeyboardShortcut}}
      >
        <div class="floating-search-input">
          <div class="search-banner">
            <div class="search-banner-inner wrap">
              <div class="search-menu">
                <SearchIcon />
                <SearchMenu @searchInputId="advanced-header-search-input" />
              </div>
            </div>
          </div>
        </div>
      </div>
    {{/if}}
  </template>
}
