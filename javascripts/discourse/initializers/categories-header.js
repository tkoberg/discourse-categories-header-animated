import { withPluginApi } from "discourse/lib/plugin-api";
import { default as Category } from "discourse/models/category";

export default {
  name: "categories-header",
  initialize() {
    withPluginApi("0.8.7", (api) => {
      const categories = Category.list();
      api.registerConnectorClass("below-site-header", "categories-header", {
        setupComponent(args, component) {
          api.onPageChange((url, title) => {
            if (url === "/" || url === "/latest") {
              $("html").addClass("categories-header");
              // add a class to the HTML tag for easy CSS targetting
              component.set("categories", categories);
            } else {
              // If the page doesn't match the urls above
              $("html").removeClass("categories-header");
              // Remove our custom class
              component.set("categories", []);
              // set the categories to an empty array to disable rendering
            }
          });
        },
      });
    });
  },
};
