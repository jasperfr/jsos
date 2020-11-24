class XFrame {
    private _title: string;
    width: Number;
    height: Number;
    resizable: Boolean;
    icon: string;
    menubar: XMenu;
    statusbar: XStatusBar;
    taskbarButtons: Array<string>;
    $window: any;
    components: Array<XComponent>;
    state: Record<string, any> = {}

    constructor(data: any) {
      if(!data) data = {};
      this._title = data.title || 'New XFrame';
      this.width = data.size != undefined ? data.size[0] : 640;
      this.height = data.size != undefined ? data.size[1] : 480;
      this.resizable = data.resizable || true;
      this.icon = data.icon || 'exe';
      this.taskbarButtons = data.taskbarButtons  || ['minimize','resize','close'];
      this.$window = undefined;
      this.components = [];
  
      return this;
    }
  
    get title() { return this._title };
    set title(title) {
      this._title = title;
      if(this.$window) {
        this.$window.find('.titlebar h1').text(this.title);
      }
    }

    getState(key) {
      return this.state[key] || undefined;
    }

    setState(key, val) {
      this.state[key] = val;
    }
  
    hide() {
      this.$window.hide();
    }
  
    maximize() {
      this.$window.removeClass('hidden');
      this.$window.toggleClass('full-screen');
    }
  
    close() {
      this.$window.remove();
    }
  
    add(component): XFrame {
      this.components.push(component);
      return this;
    }

    setMenubar(menubar: XMenu): XFrame {
      this.menubar = menubar;
      return this;
    }

    setStatusbar(statusbar: XStatusBar): XFrame {
      this.statusbar = statusbar;
      return this;
    }
  
    start() {
      let self = this;
  
      // ----------------------------------------------------------------------------------------------
      // Create the wndow wrapper
  
      this.$window = $(`<div class="xframe" style="width:${this.width}px;">`);
  
      // ----------------------------------------------------------------------------------------------
      // Create the title bar
  
      let $titlebar = $(`<div class="titlebar">`);
      $titlebar.append($(`<img src="img/types/16/${this.icon}.png">`));
      $titlebar.append($(`<h1>${this.title}</h1>`));
  
      if(this.taskbarButtons.indexOf('minimize') != -1) {
        let $minimize = $('<p class="button minimize"></p>');
        $minimize.on('click', () => self.hide());
        $titlebar.append($minimize);
      }
      if(this.taskbarButtons.indexOf('resize') != -1) {
        let $resize = $('<p class="button maximize"></p>');
        $resize.on('click', () => self.maximize());
        $titlebar.append($resize);
      }
      if(this.taskbarButtons.indexOf('close') != -1) {
        let $close = $('<p class="button close"></p>');
        $close.on('click', () => self.close());
        $titlebar.append($close);
      }
  
      this.$window.append($titlebar);
  
      // ----------------------------------------------------------------------------------------------
      // Create the menu box if a menu exists
      if(this.menubar) {
        this.$window.append(this.menubar.start());
      }

      // ----------------------------------------------------------------------------------------------
      // Create the content box
  
      let $content = $(`<div class="content" style=" height:${this.height}px; position:relative;">`);
      for(let component of this.components) {
        $content.append(component.start());
      }
      this.$window.append($content);

      // ----------------------------------------------------------------------------------------------
      // Create the status bar if it exists
      if(this.statusbar) {
        this.$window.append(this.statusbar.start());
      }
  
      // ----------------------------------------------------------------------------------------------
      // Create the status bar
  
      // ----------------------------------------------------------------------------------------------
      // Event listeners
  
      this.$window.draggable({
        containment: 'parent',
        handle: '.titlebar h1',
        'stack' : '.xframe'
      });
  
      if(this.resizable) {
        this.$window.resizable({
          containment: 'parent',
          handles: 'nw, ne, sw, se'
        });
      }
  
      this.$window.on('mousedown', function() {
        $('.window').removeClass('focused');
        $(this).addClass('focused');
        $(this).css('z-index', 1000);
        this.focus();
      });
  
      this.$window.css({
        'left': `${$('.window').length * 16}px`,
        'top': `${$('.window').length * 16}px`,
      });
  
      $(() => $(document.body).append(this.$window));
    }
  }