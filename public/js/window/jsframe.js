class JSFrame {
  constructor(icon, id, obj={}) {
    this.icon = icon || "exe";
    this._id = id || Date.now().toString();
    this._type = 'JSFrame'
    this.globals = {};
    this.components = [];
    this.titleValue = "Form";
    this.widthValue = 100;
    this.heightValue = 100;
    this.resizable = true;

    this.$window = $(`
    <div class="window" style="width:${this.widthValue}px;">
        <div class="titlebar">
            <img src="img/types/16/${this.icon}.png">
            <h1>${this.titleValue}</h1>
            <p class="button minimize"></p>
            <p class="button expand"></p>
            <p class="button close"></p>
        </div>
        <div class="content" style=" height:${this.heightValue}px; position:relative;">
        </div>
    </div>
    `);

    if(obj.disableMinimize) this.$window.find('.minimize').remove();
    if(obj.disableExpand) this.$window.find('.expand').remove();

    this.taskbar = undefined;
    this.jsmenubar = undefined;
    return this;
  }

  setIcon(icon) {
    this.$window.find('.title img').attr('src', `./img/${icon}`);
  }

  setVar(key, value) {
    this.globals[key] = value;
    return this;
  }

  getVar(key) {
    return this.globals[key];
  }

  get title() {
    return this.titleValue;
  }

  set title(title) {
    this.titleValue = title;
    $(this.$window.find('.titlebar h1')).text(this.titleValue);
    return this;
  }

  set width(width) {
    this.widthValue = width;
    $(this.$window.css('width', `${this.widthValue}px`));
  }

  set height(height) {
    this.heightValue = height;
    $(this.$window.find('.content').css('height', `${this.heightValue}px`));
  }

  setMenuBar(menuBar) {
    this.jsmenubar = menuBar;
    return this;
  }

  setIcon(iconName) {
    
  }

  setResizable(resizable) {
    this.resizable = resizable;
  }

  add(component) {
    this.components.push(component);
    return this;
  }

  css(selector, value) {
    this.$window.find('.content').css(selector, value);
    return this;
  }

  findComponentById(id) {
    for(let component of this.components) {
      let result = component.findComponentById(id);
      if(result !== undefined) {
        return result;
      }
    }
    console.error(`Error in JSFrame "${this._id}": No such component "${id}" exists.`);
    return undefined;
  }

  initialize(focus = true) {
    let self = this;
    this.taskbar = new JSTaskbarItem(this);
    this.taskbar.start();
    $(function() {
      let $element = self.start();
      $(document.body).append($element);
      if(focus) {
        $('.window').removeClass('focused');
        $($element).addClass('focused');
        $($element).css('z-index', ++$GLOBAL_Z_INDEX);
        $element.focus();
      }
    });
  }

  close() {
    this.$window.remove();
  }

  start() {

    // Add the menu bar if exists.
    if(this.jsmenubar !== undefined) {
      (this.jsmenubar.start()).insertBefore(this.$window.find('.content'));
    }

    // Add each component to the window.
    for(let component of this.components) {
      $(this.$window.find('.content')).append(component.start());
    }

    // Append the window to the document.
    // $(document.body).append(this.$window);

    // The window is draggable by default.
    this.$window.draggable({ containment: 'parent', handle: '.titlebar h1', 'stack' : '.window' });

    // Add resizable handles.
    if(this.resizable) {
      this.$window.resizable({ containment: 'parent', handles: 'nw, ne, sw, se'});
    }

    // Configure window focus behavior.
    this.$window.on('mousedown', function() {
        $('.window').removeClass('focused');
        $(this).addClass('focused');
        $(self.$window).css('z-index', ++$GLOBAL_Z_INDEX);
        self.$window.focus();
    });

    // Configure the minimize button.
    let self = this;
    this.$window.find('.minimize').click(function() {
      self.$window.hide();
      self.taskbar.$element.toggleClass('toggled');
    });

    // (TODO) Configure the close button.
    this.$window.find('.close').click(function() {
      self.$window.remove();
      self.taskbar.close();
    });

    // Configure the expand button.
    this.$window.find('.expand').click(function() {
        self.$window.removeClass('hidden');
        self.$window.toggleClass('full-screen')
    });

    // stack windows?
    this.$window.css({
      'left': `${$('.window').length * 16}px`,
      'top': `${$('.window').length * 16}px`,
    });

    return this.$window;

    /* Deprecated (?)
    $('.window').css('z-index', '-1');
    let offset = $('.window').length;
    this.$window.css('z-index', '1');
    this.$window.css('left', `${offset * 24}px`);
    this.$window.css('top', `${offset * 24}px`);
    */
  }
}