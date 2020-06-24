class JSMenuBar {
  constructor() {
    this.$element = $('<div class="jsmenubar">');
    this.menuItems = [];
    return this;
  }

  add(component) {
    this.menuItems.push(component);
    return this;
  }

  start() {
    for(let menu of this.menuItems) {
      this.$element.append(menu.start());
    }
    return this.$element;
  }
}

class JSMenu {
  constructor(name) {
    this.$element = $(`<button class="jsmenu-button">${name}</button>`);
    this.$menu = $('<ul class="jsmenu-menu"></ul>');
    return this;
  }

  start() {
    return this.$element;
  }
}