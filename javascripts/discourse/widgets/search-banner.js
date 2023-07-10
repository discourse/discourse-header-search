import { createWidgetFrom } from "discourse/widgets/widget";
import {
  DEFAULT_TYPE_FILTER,
  default as searchMenu,
} from "discourse/widgets/search-menu";
import { h } from "virtual-dom";
import { logSearchLinkClick } from "discourse/lib/search";

export default createWidgetFrom(searchMenu, "floating-search-input", {
  tagName: "div.floating-search-input",
  buildKey: () => "floating-search-input",

  defaultState() {
    return {
      expanded: false,
    };
  },

  init() {
    // used to show/hide default search button
    document
      .querySelector(".d-header")
      ?.classList.add("search-header--visible");
  },

  destroy() {
    document
      .querySelector(".d-header")
      ?.classList.remove("search-header--visible");
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

  mouseDownOutside() {
    this.state.inTopicContext = false; // need to clear context, otherwise you can't search all topics and posts again

    return this.state.expanded
      ? this.sendWidgetAction("toggleSearchBanner")
      : false;
  },

  click() {
    return !this.state.expanded
      ? this.sendWidgetAction("toggleSearchBanner")
      : false;
  },

  setTopicContext() {
    this.state.inTopicContext = true;
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
