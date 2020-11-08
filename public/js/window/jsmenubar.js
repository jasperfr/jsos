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
      <ul class="jsmenu-list"></ul>
    </div>`);
    return this;
  }

  add(text, func, shortcut) {
    let $menuList = this.$element.find('ul');
    let $li = $(`<li>${text}<span class="shortcut">${shortcut}</span></li>`)
      .click(func)
      .click(() => $menuList.hide())
    $menuList.append($li);
    return this;
  }

  start() {
    let $menuButton = this.$element.find('p');
    let $menuList = this.$element.find('ul');

    $menuList.hide();
    $menuButton.on('click', function() {
      if($menuList.css('display') == 'none') $menuList.fadeIn(150);
      else $menuList.hide();
    });

    return this.$element;
  }
}