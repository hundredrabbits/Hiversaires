"use strict";

class ArtBook {
  constructor() {
    this.assetCatalog = new Map();
    this.elementRegistry = new Map();
    this.elementRegistryUniqueID = 0;
    this.classUniqueID = 0;

    const stylesheetElement = document.createElement("style");
    stylesheetElement.type = "text/css";
    stylesheetElement.title = "artbook";
    stylesheetElement.appendChild(document.createTextNode(""));
    document.head.appendChild(stylesheetElement);
    for (const stylesheet of document.styleSheets) {
      if (stylesheet.title == stylesheetElement.title) {
        this.stylesheet = stylesheet;
        break;
      }
    }
  }

  preloadArt(assetURL) {
    const img = new Image();
    img.onload = function() {
      img.onload = null;
    };
    img.src = assetURL;
  }

  setArt(selector, assetURL) {
    if (!this.assetCatalog.has(assetURL)) {
      const className = "artbook_" + this.classUniqueID;
      this.classUniqueID++;

      this.stylesheet.insertRule(
        "." + className + "{background-image:url(" + assetURL + ")}",
        0
      );
      this.assetCatalog.set(assetURL, className);
    }

    const id = this.getElementID(selector);

    if (id == null) {
      console.warn("no element for selector " + selector);
    }

    if (this.elementRegistry.has(id)) {
      if (this.elementRegistry.get(id) == assetURL) {
        return;
      }
      this.removeArt(selector);
    }
    this.elementRegistry.set(id, assetURL);
    $(selector).addClass(this.assetCatalog.get(assetURL));
  }

  removeArt(selector) {
    const id = this.getElementID(selector);
    if (this.elementRegistry.has(id)) {
      const assetURL = this.elementRegistry.get(id);
      if (this.assetCatalog.has(assetURL)) {
        $(selector).removeClass(this.assetCatalog.get(assetURL));
      }
      this.elementRegistry.delete(id);
    }
  }

  getElementID(selector) {
    const element = $(selector)[0];

    if (element == null) {
      return null;
    }

    if (!element.hasOwnProperty("artbook_id")) {
      if (element.hasOwnProperty("id")) {
        element.artbook_id = element.id;
      } else {
        element.artbook_id = "artbook_id_" + this.elementRegistryUniqueID;
        this.elementRegistryUniqueID++;
      }
    }
    return element.artbook_id;
  }
}
