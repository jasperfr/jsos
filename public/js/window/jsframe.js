class JSFrame {
  constructor(id) {
    this._id = id || Date.now().toString();
    this._type = 'JSFrame'
    this.globals = {};
    this.components = [];
    this.title = "Form";
    this.width = 100;
    this.height = 100;
    /* deprecated
    this.$window = $(`
      <div class="window" id="${this._id}" style="display: flex; position: absolute;">
        <div class="titlebar">
          <div class="title">
            <img src="./img/ico-js.png">
            <p>${this.title}</p>
          </div>
          <nav>
            <button title="Minimize" class="titlebar-button window-minimize" onclick="$('#${this._id}').remove();">_</button>
            <button title="Maximize" class="titlebar-button window-maximize" onclick="$('#${this._id}').remove();">O</button>
            <button title="Close" class="titlebar-button window-close" onclick="$('#${this._id}').remove();">X</button>
          </nav>
        </div>
        <div class="content" style="position: relative; width: ${this.width}px; height: ${this.height}px">
        </div>
      </div>  
    `);
    */
   this.$window = $(`
   <div class="window" style="width:${this.width}px;">
       <div class="titlebar">
           <p class="button minimize"></p>
           <h1>${this.title}</h1>
           <p class="button expand"></p>
           <p class="button close"></p>
       </div>
       <div class="content" style=" height:${this.height}px; position:relative;">
       </div>
   </div>
   `);
    this.jsmenubar = undefined;
    return this;
  }

  setIcon(icon) {
    this.$window.find('.title img').attr('src', `./img/${icon}`);
  }w

  setVar(key, value) {
    this.globals[key] = value;
    return this;
  }

  getVar(key) {
    return this.globals[key];
  }

  setTitle(title) {
    this.title = title;
    $(this.$window.find('.titlebar .title p')).text(this.title);
    return this;
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    $(this.$window.css('width', `${this.width}px`));
    $(this.$window.find('.content').css('height', `${this.height}px`));
    return this;
  }

  setMenuBar(menuBar) {
    this.jsmenubar = menuBar;
    return this;
  }

  setResizable() {
    this.$window.resizable();
    this.$window.on('resize', function() {
      console.log($(this));
      let $content = $(this).find('.content');
      $content.css('width', '');
      $content.css('height', '');
    });
    return this;
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
    $(document.body).append(this.$window);

    // The window is draggable by default.
    this.$window.draggable({ handle: '.titlebar h1', 'stack' : '.window' });

    // Add resizable handles.
    this.$window.resizable({handles: 'nw, ne, sw, se'});
    
    // Configure window focus behavior.
    this.$window.on('mousedown', function() {
        $('.window').removeClass('focused');
        $(this).addClass('focused');
    });

    // Configure the minimize button.
    let self = this;
    this.$window.find('.minimize').click(function() {
        self.$window.toggleClass('hidden');
        self.$window.removeClass('full-screen');
    });

    // (TODO) Configure the close button.
    this.$window.find('.close').click(function() {

    });

    // Configure the expand button.
    this.$window.find('.expand').click(function() {
        self.$window.removeClass('hidden');
        self.$window.toggleClass('full-screen')
    });

    /* Deprecated (?)
    $('.window').css('z-index', '-1');
    let offset = $('.window').length;
    this.$window.css('z-index', '1');
    this.$window.css('left', `${offset * 24}px`);
    this.$window.css('top', `${offset * 24}px`);
    */
  }
}