class JSMenuBar {
  constructor(window) {
    this.windowPtr = window;
    this.$element = $('<div class="jsmenubar">');
    this.menuItems = [];
    return this;
  }

  add(component) {
    component.menubarPtr = this;
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
    this.menubarPtr = null;
    this.$element = $(`
    <div class="jsmenu">
      <p>${name}</p>
      <div class="jsmenu-list-wrapper">
        <ul class="jsmenu-list"></ul>
      </div>
    </div>`);
    return this;
  }

  add(text, func, shortcut) {
    let $menuList = this.$element.find('.jsmenu-list-wrapper');
    let $menu = this.$element.find('ul')
    let $li = $(`<li>${text}<span class="shortcut">${shortcut}</span></li>`)
      .click(func)
      .click(() => $menuList.slideToggle("fast"));
    $menu.append($li);
    return this;
  }

  start() {
    let $menuButton = this.$element.find('p');
    let $menuList = this.$element.find('.jsmenu-list-wrapper');

    $menuList.hide();
    $menuButton.on('click', function() {
      $menuList.slideToggle("fast");
    });

    return this.$element;
  }
}