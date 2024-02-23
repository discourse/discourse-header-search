import Component from "@glimmer/component";
import { getOwner } from "@ember/application";
import { inject as service } from "@ember/service";

export default class SearchBarIcons extends Component {
  @service router;
  @service search;

  get searchIconItems() {
    const searchIcons = [];
    const currentRoute = this.router.currentRoute;
    let categoryId = currentRoute.attributes?.category?.id;

    // when not in a category route, see if topic has same category id
    if (!categoryId && currentRoute.name.startsWith("topic.")) {
      const topic = getOwner(this).lookup("controller:topic");
      categoryId = topic?.model?.category_id;
    }

    if (this.search.activeGlobalSearchTerm !== "") {
      JSON.parse(settings.extra_search_icons).forEach((item) => {
        if (item.params) {
          item.params.forEach((p) => {
            item[p.name] = p.value;
          });

          if (item.prefix) {
            item.url = `${item.prefix}${this.search.activeGlobalSearchTerm}`;
          }

          delete item.params;
        }

        const showInCategories = item.showInCategories
          ? item.showInCategories.split(",").map(Number)
          : [];
        const excludeFromCategories = item.excludeFromCategories
          ? item.excludeFromCategories.split(",").map(Number)
          : [];

        switch (true) {
          case excludeFromCategories.includes(categoryId):
            // skip if explicitly excluded for this category ID
            break;

          default:
            // when not excluded, show icon if:
            // - `showInCategories` param isn't used OR
            // - category ID included in `showInCategories`
            if (
              showInCategories.length === 0 ||
              showInCategories.includes(categoryId)
            ) {
              searchIcons.push(item);
            }
            break;
        }
      });

      return searchIcons;
    }
  }
}
