import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";

export default class SearchBarIcons extends Component {
  @tracked items = [];
  @service router;

  constructor() {
    super(...arguments);

    const itemsArray = [];
    const currentRoute = this.router.currentRoute;
    const categoryId = currentRoute.attributes?.category?.id;

    const searchKeyword = document.querySelector(
      ".floating-search-input #search-term"
    ).value;

    if (searchKeyword !== "") {
      JSON.parse(settings.extra_search_icons).forEach((item) => {
        if (item.params) {
          item.params.forEach((p) => {
            item[p.name] = p.value;
          });

          if (item.prefix) {
            item.url = `${item.prefix}${searchKeyword}`;
          }

          delete item.params;
        }

        const categoriesToShowOn = item.showInCategories
          ?.split(",")
          .map(Number);
        if (
          categoriesToShowOn === undefined ||
          categoriesToShowOn.includes(categoryId)
        ) {
          itemsArray.push(item);
        }
      });

      this.items = itemsArray;
    }
  }
}
