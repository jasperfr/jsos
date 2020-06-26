class JSLabel extends Component {
  constructor(id) {
    super(id, 'JSLabel', $('<span class="jslabel">New JSLabel</span>'));
    this.textValue = "";
    return this;
  }

  setFontSize(size) {
    this.$element.css('font-size', `${size}px`);
    return this;
  }

  get text() {
    return this.textValue;
  }

  set text(text) {
    this.textValue = text;
    this.$element.html(this.textValue);
  }
}