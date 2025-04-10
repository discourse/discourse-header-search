import { click, fillIn, visit } from "@ember/test-helpers";
import { test } from "qunit";
import { acceptance } from "discourse/tests/helpers/qunit-helpers";

acceptance("Header Search", function () {
  test("shows in header", async function (assert) {
    await visit("/");

    assert
      .dom(".floating-search-input")
      .exists("search form present in header");
    assert.dom(".search-term__input").exists("it shows the search input");
    assert
      .dom(".show-advanced-search")
      .exists("it shows full page search button");

    await click(".floating-search-input .search-term__input");
    await fillIn(".floating-search-input .search-term__input", "test");

    assert.dom(".search-menu .results").exists("it has results");
  });
});

acceptance("Header Search - Extra Icons", function (needs) {
  const itemsJSON = [
    {
      name: "google",
      params: [
        {
          name: "icon",
          value: "fab-google",
        },
        {
          name: "prefix",
          value: "https://www.google.com/search?q=",
        },
      ],
    },
    {
      name: "apple",
      params: [
        {
          name: "icon",
          value: "fab-apple",
        },
        {
          name: "prefix",
          value: "https://www.apple.com/search?q=",
        },
        {
          name: "showInCategories",
          value: "7",
        },
      ],
    },
    {
      name: "github",
      params: [
        {
          name: "icon",
          value: "fab-github",
        },
        {
          name: "prefix",
          value: "https://www.github.com/search?q=",
        },
        {
          name: "excludeFromCategories",
          value: "7",
        },
      ],
    },
  ];
  needs.hooks.beforeEach(() => {
    settings.extra_search_icons = JSON.stringify(itemsJSON);
  });

  needs.hooks.afterEach(() => {
    settings.extra_search_icons = "[]";
  });

  test("shows additional icons", async function (assert) {
    await visit("/");

    assert
      .dom(".floating-search-input")
      .exists("search form present in header");

    await click(".floating-search-input .search-term__input");
    await fillIn(".floating-search-input .search-term__input", "test");

    assert.dom(".extra-search-icons").exists("it has extra icons");

    assert
      .dom(".extra-search-icons .search-extra-icon-google")
      .exists("it has the google search icon (as defined in theme settings)");

    assert
      .dom(".extra-search-icons .search-extra-icon-google")
      .hasAttribute(
        "href",
        "https://www.google.com/search?q=test",
        "it appends current search term to external link"
      );

    assert
      .dom(".extra-search-icons .search-extra-icon-github")
      .exists("it respects the excludeFromCategories parameter");

    assert
      .dom(".show-advanced-search")
      .exists("it still shows full page search button");

    await visit("/c/dev/7");
    await click(".floating-search-input .search-term__input");

    assert
      .dom(".extra-search-icons .search-extra-icon-apple")
      .hasAttribute(
        "href",
        "https://www.apple.com/search?q=test",
        "it shows the apple icon in category #7 via showInCategories parameter"
      );

    assert
      .dom(".extra-search-icons .search-extra-icon-github")
      .doesNotExist("it respects the excludeFromCategories parameter");
  });
});
