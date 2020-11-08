class JSTaskbarItem {
  constructor(windowPtr) {
    this.window = windowPtr;
    this.$element = $(`<div class="taskbar-wrapper toggled">
    <div class="taskbar-item">${windowPtr.title}</div>
    <div class="preview"><div class="placeholder"></div></div>
    </div>`);
    this.previewed = false;
  }

  start() {
    let w = this.window;
    $(document.body).find('#taskbar-menu-list').append(this.$element);
    this.$element.on('click', function() {
      w.$window.toggle();
      $(this).toggleClass('toggled');
    });

    let self = this;
    this.$element.on('mouseover', function() {
      if(self.previewed) return;
      self.previewed = true;
      let $preview = w.$window.clone();
      let width = $preview.width();
      // max width is 128
      let scale = 128 / width;
      console.log(scale);

      $preview.css({
        'position': 'absolute',
        'left': '0',
        'user-select': 'none !important',
        'transform': `scale(${scale})`,
        'border-left': `${(width / 128) * 36}px solid rgba(35, 35, 35, 0.8)`,
        'border-right': `${(width / 128) * 36}px solid rgba(35, 35, 35, 0.8)`,
        'border-top': `${(width / 128) * 8}px solid rgba(35, 35, 35, 0.8)`,
        'border-bottom': `${(width / 128) * 8}px solid rgba(35, 35, 35, 0.8)`,
        'top': '',
        'transform-origin': 'left bottom'
      }).hide();
      $(this).find('.preview').html($preview);
      $preview.slideToggle('fast');
    });

    this.$element.on('click', function() {
      $(this).find('.preview').empty().append($('<div class="placeholder"></div>'))
      self.previewed = false;
    })
    this.$element.on('mouseleave', function() {
      $(this).find('.preview').empty().append($('<div class="placeholder"></div>'))
      self.previewed = false;
    })

  }

  close() {
    this.$element.remove();
    delete this.$element;
  }
}