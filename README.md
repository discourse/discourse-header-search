# Discourse Header Search Component

This component removes the search icon from the header menu and creates a search bar which is placed in the middle of the header area.

![docs card filter preview](./readme-assets/example.png)

### Optionally show external search icons

Use the `extra_search_icons` to show additional icons in the search bar.

This setting supports the following params:

- `prefix`: the prefix to the search URL when clicking the respective icon
- `icon`: icon to show, from the Font Awesome set (may need to be added to the `svg icons` setting as well)
- `target`: optionally set to "\_blank" to open the link in its own tab/window by default
- `showInCategories`: a list of category IDs on which to show this specific icon (if not present, icon is shown everywhere)
