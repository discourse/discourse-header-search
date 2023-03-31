import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";
import { getOwner } from "discourse-common/lib/get-owner";

export default class SearchBarIcons extends Component {
  @service router;
  @tracked items = [];

  constructor() {
    super(...arguments);

    const itemsArray = [];
    const currentRoute = this.router.currentRoute;
    let categoryId = currentRoute.attributes?.category?.id;

    // in not in a category route, see if topic has same category id
    if (!categoryId && currentRoute.name.startsWith("topic.")) {
      const topic = getOwner(this).lookup("controller:topic");
      categoryId = topic?.model?.category_id;
    }

    if (this.args.term !== "") {
      JSON.parse(settings.extra_search_icons).forEach((item) => {
        if (item.params) {
          item.params.forEach((p) => {
            item[p.name] = p.value;
          });

          if (item.prefix) {
            item.url = `${item.prefix}${this.args.term}`;
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
