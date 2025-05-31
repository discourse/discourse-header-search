import icon from "discourse/helpers/d-icon";

const SearchBarIcon = <template>
  <a
    href={{@item.url}}
    target={{@item.target}}
    class="search-bar-icons--icon search-extra-icon-{{@item.name}}"
  >
    {{icon @item.icon}}
  </a>
</template>;

export default SearchBarIcon;
