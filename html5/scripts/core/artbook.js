class ArtBook {
  constructor() {
    this.assetCatalog = {};
    this.elementRegistry = {};
    this.elementRegistryUniqueID = 0;
    this.classUniqueID = 0;

    let stylesheetElement = document.createElement("style");
    stylesheetElement.type = "text/css";
    stylesheetElement.title = "artbook";
    stylesheetElement.appendChild(document.createTextNode(""));
    document.head.appendChild(stylesheetElement);
    for (let stylesheet of document.styleSheets) {
      if (stylesheet.title == stylesheetElement.title) {
        this.stylesheet = stylesheet;
        break;
      }
    }
  }

  setArt(selector, assetURL) {
    if (!(assetURL in this.assetCatalog)) {
      let className = "artbook_" + this.classUniqueID;
      this.classUniqueID++;

      this.stylesheet.insertRule(
        "." + className + "{background-image:url(" + assetURL + ")}",
        0
      );
      this.assetCatalog[assetURL] = className;
    }

    let id = this.getElementID(selector);

    if (id == null) {
      console.warn("no element for selector " + selector);
    }

    if (id in this.elementRegistry) {
      if (this.elementRegistry[id] == assetURL) {
        return;
      }
      this.removeArt(selector);
    }
    this.elementRegistry[id] = assetURL;
    $(selector).addClass(this.assetCatalog[assetURL]);
  }

  removeArt(selector) {
    let id = this.getElementID(selector);
    if (id in this.elementRegistry) {
      let assetURL = this.elementRegistry[id];
      if (assetURL in this.assetCatalog) {
        $(selector).removeClass(this.assetCatalog[assetURL]);
      }
      delete this.elementRegistry[id];
    }
  }

  getElementID(selector) {
    let element = $(selector)[0];

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
