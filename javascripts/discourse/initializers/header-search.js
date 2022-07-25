import { withPluginApi } from "discourse/lib/plugin-api";
import hbs from "discourse/widgets/hbs-compiler";

export default {
  name: "customize-widget",

  initialize() {
    withPluginApi("0.8.14", (api) => {
      api.reopenWidget("header-contents", {
        template: hbs`
        {{home-logo attrs=attrs}}
        {{#if attrs.topic}}
          {{header-topic-info attrs=attrs}}
        {{else}}
          {{#unless this.site.mobileView}}
            {{floating-search-input attrs=attrs}}
          {{/unless}}
        {{/if}}
        <div class="panel clearfix">{{yield}}</div>
      `,
      });
    });
  },
};
