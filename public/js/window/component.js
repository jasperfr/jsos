class Component {
  constructor(id, type, $element) {
    this._id = id;
    this._type = type;
    this.$element = $element;
    this.$element.css('position', 'absolute');
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    return this;
  }

  absolute(left, right, top, bottom) {
    this.css({
      position: 'absolute',
      left: `${left}px`,
      top: `${top}px`,
      right: `${right}px`,
      bottom: `${bottom}px`,
      margin: '0px',
      width: `calc(100% + -${left + right}px)`,
      height: `calc(100% + -${top + bottom}px)`,
    })
  }

  css(selector, value) {
    if(typeof selector === 'object') {
      this.$element.css(selector);
    } else {
      this.$element.css(selector, value);
    }
    return this;
  }

  setBorder(width, borderStyle, color) {
    this.$element.css('border-width', `${width}px`);
    this.$element.css('border-style', borderStyle);
    this.$element.css('border-color', color);
    return this;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.$element.css('left', `${this.x}px`);
    this.$element.css('top', `${this.y}px`);
    return this;
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.$element.css('width', `${this.width}px`);
    this.$element.css('height', `${this.height}px`);
    return this;
  }

  findComponentById(id) {
    if(this._id == id) {
      return this;
    }

    if(this.components === undefined) {
      return undefined;
    }
    
    for(let component of this.components) {
      let result = component.findComponentById(id);
      if(result !== undefined) {
        return result;
      }
    }

    return undefined;
  }

  start() {
    return this.$element;
  }

  on(event, listener) {
    this.$element.on(event, listener);
  }
}