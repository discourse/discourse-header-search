import { createWidgetFrom } from "discourse/widgets/widget";
import { default as searchMenu } from "discourse/widgets/search-menu";
import { h } from "virtual-dom";

export default createWidgetFrom(searchMenu, "floating-search-input", {
  tagName: "div.floating-search-input",
  buildKey: () => "floating-search-input",
  defaultState() {
    return {
      expanded: false
    };
  },
  html(attrs) {
    // if (!attrs.shouldRender) return;
    // SearchData is passed down from the search-menu widget
    const searchData = this.searchData;
    const term = searchData.term;
    const results = searchData.results;
    const isLoading = searchData.loading;
    const searchContextEnabled = searchData.contextEnabled;
    const showResults = this.state.expanded && term && !isLoading;
    return [
      h(
        "div.search-banner",
        h("div.search-banner-inner.wrap", [
          h("div.search-menu", [
            h("div.search-input", [
              this.attach("button", {
                className: "btn btn-primary search-button",
                icon: "search",
                action: term ? "fullSearch" : ""
              }),
              isLoading ? h("div.searching", h("div.spinner")) : "",
              this.attach("search-term", {
                value: term || "",
                searchContextEnabled,
                placeholder: "Search Forum"
              }),
            ]),
            showResults
              ? this.attach("search-menu-results", {
                  term: term,
                  noResults: searchData.noResults,
                  results: results,
                  invalidTerm: searchData.invalidTerm,
                  searchContextEnabled: searchContextEnabled
                })
              : ""
          ])
        ])
      )
    ];
  },
  mouseDownOutside() {
    return this.state.expanded
      ? this.sendWidgetAction("toggleSearchBanner")
      : false;
  },
  click() {
    return !this.state.expanded
      ? this.sendWidgetAction("toggleSearchBanner")
      : false;
  },
  toggleSearchBanner() {
    this.state.expanded = !this.state.expanded;
  }
});
