import { createWidgetFrom } from "discourse/widgets/widget";
import {
  DEFAULT_TYPE_FILTER,
  default as searchMenu,
} from "discourse/widgets/search-menu";
import { h } from "virtual-dom";
import { iconNode } from "discourse-common/lib/icon-library";
import { logSearchLinkClick } from "discourse/lib/search";

export default createWidgetFrom(searchMenu, "floating-search-input", {
  tagName: "div.floating-search-input",
  buildKey: () => "floating-search-input",

  defaultState() {
    return {
      expanded: false,
    };
  },

  html() {
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

    const clearButton = this.attach("link", {
      title: "search.clear_search",
      action: "clearSearch",
      className: "clear-search",
      contents: () => iconNode("times"),
    });

    const advancedSearchButton = this.attach("link", {
      href: this.fullSearchUrl({ expanded: true }),
      contents: () => iconNode("sliders-h"),
      className: "show-advanced-search",
      title: "search.open_advanced",
    });

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
              term
                ? h("div.searching", [clearButton, advancedSearchButton])
                : h("div.searching", advancedSearchButton),
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

  linkClickedEvent(attrs) {
    const { searchLogId, searchResultId, searchResultType } = attrs;
    if (searchLogId && searchResultId && searchResultType) {
      logSearchLinkClick({
        searchLogId,
        searchResultId,
        searchResultType,
      });
    }

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
