class JSTreeView {
  constructor(id) {
    this._id = id;
    this._type = 'JSTreeView';
    this.$element = $('<div class="js-tree-view">');
    this.menuItems = [];
  }

  add(jsTreeMenuItem) {
    this.menuItems.push(jsTreeMenuItem);
  }

  showBorder(border) {
    this.border = border;
  }

  start() {
    for(let item of this.menuItems) {
      item.start(this.$element);
    }
    return this.$element;
  }
}

class JSTreeViewItem {
  constructor(id, name) {
    this._id = id;
    this._type = 'JSTreeViewItem';
    this.name = name;
    this.menuItems = [];
    this.$element = $(`<div class="js-tree-view-item">`);
    this.src = '';
    this.isFolder = false;
    this.$caret = undefined;
    this.opened = true;
    this.$icon = $('<img>');
  }

  add(jsTreeMenuItem) {
    this.menuItems.push(jsTreeMenuItem);
  }

  hide() {
    if(this.isFolder) {
      this.opened = false;
      this.$icon.attr('src', `./img/tree-view-branch-close.png`);
      this.$caret.attr('src', `./img/tree-view-${this.src}-open.png`);
    }
    this.$element.hide();
    for(let item of this.menuItems) {
      item.hide();
    }
  }

  toggle() {
    if(this.isFolder) {
      this.opened = false;
      this.$icon.attr('src', `./img/tree-view-branch-close.png`);
      this.$caret.attr('src', `./img/tree-view-${this.src}-open.png`);
    }
    this.$element.toggle();
    for(let item of this.menuItems) {
      item.hide();
    }
  }

  start($tree, depth = 0, isLast = false) {

    let self = this;
    for(let i = 0; i < depth; i++) {
      this.$element.append($('<img src="./img/tree-view-s.png">'));
    }

    if(this.menuItems.length > 0) {
      this.isFolder = true;
      this.src = isLast ? 'se' : 'nse';
      this.$caret = $(`<img src="./img/tree-view-${this.src}-close.png" class="caret">`);
      this.$caret.on('click', function() {
        self.opened = !self.opened;
        self.$icon.attr('src', `./img/tree-view-branch-${self.opened ? 'open' : 'close'}.png`);
        $(this).attr('src', `./img/tree-view-${self.src}-${self.opened ? 'close' : 'open'}.png`);
        for(let item of self.menuItems) {
          item.toggle();
        }
      });
      this.$element.append(this.$caret);

      this.$icon.attr('src', './img/tree-view-branch-open.png');
      this.$element.append(this.$icon);
      this.$element.append($(`<div><span>${this.name}</span></div>`));

      $tree.append(this.$element);
      for(let i = 0; i < this.menuItems.length; i++) {
        this.menuItems[i].start($tree, depth + 1, i == this.menuItems.length - 1);
      }
    } else {
      this.isFolder = false;
      this.src = isLast ? 'se' : 'nse';
      this.$caret = $(`<img src="./img/tree-view-${this.src}.png">`);
      this.$element.append(this.$caret);

      this.$element.append($('<img src="./img/tree-view-file.png">'));
      this.$element.append($(`<div><span>${this.name}</span></div>`));
      $tree.append(this.$element);
    }


    /*
    if(this.menuItems.length > 0) {
      let $ul = $(`<ul class="js-nested-tree-view opened">`);
      this.$element.find('span')
        .addClass('caret')
        .click((e) => {
          $ul.toggle();
          $(e.target).toggleClass('opened');
        });

      for(let item of this.menuItems) {
        $ul.append(item.start());
      }
      this.$element.append($ul);
      let el = this.$element;
    }
    */

    return this.$element;
  }
}