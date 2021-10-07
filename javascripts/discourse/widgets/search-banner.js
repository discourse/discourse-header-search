import { createWidgetFrom } from "discourse/widgets/widget";
import {
  default as searchMenu,
  DEFAULT_TYPE_FILTER,
} from "discourse/widgets/search-menu";
import { h } from "virtual-dom";

export default createWidgetFrom(searchMenu, "floating-search-input", {
  tagName: "div.floating-search-input",
  buildKey: () => "floating-search-input",
  defaultState() {
    return {
      expanded: false,
    };
  },
  html(attrs) {
    // if (!attrs.shouldRender) return;
    // SearchData is passed down from the search-menu widget
    const {
      term,
      results,
      loading,
      noResults,
      invalidTerm,
      suggestionKeyword,
      suggestionResults,
    } = this.searchData;
    const showResults = this.state.expanded;
    return [
      h(
        "div.search-banner",
        h("div.search-banner-inner.wrap", [
          h("div.search-menu", [
            h("div.search-input", [
              this.attach("button", {
                className: "btn btn-primary search-button",
                icon: "search",
                action: term ? "fullSearch" : "",
              }),
              loading ? h("div.searching", h("div.spinner")) : "",
              this.attach("search-term", {
                value: term,
              }),
            ]),
            showResults
              ? this.attach("search-menu-results", {
                  term,
                  noResults,
                  results,
                  invalidTerm,
                  suggestionKeyword,
                  suggestionResults,
                  searchTopics: this.searchesTopics(),
                })
              : "",
          ]),
        ])
      ),
    ];
  },
  clickOutside() {
    return this.state.expanded
      ? this.sendWidgetAction("toggleSearchBanner")
      : false;
  },
  click() {
    return !this.state.expanded
      ? this.sendWidgetAction("toggleSearchBanner")
      : false;
  },
  linkClickedEvent() {
    const input = document.getElementById("search-term");
    input.value = "";
    this.sendWidgetAction("toggleSearchBanner");
  },
  toggleSearchBanner() {
    this.state.expanded = !this.state.expanded;
  },

  searchesTopics() {
    return this.searchData.typeFilter !== DEFAULT_TYPE_FILTER;
  },
});
