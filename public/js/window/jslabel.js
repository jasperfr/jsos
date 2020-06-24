class JSLabel extends Component {
  constructor(id) {
    super(id, 'JSLabel', $('<span class="jslabel">New JSLabel</span>'));
    return this;
  }

  setFontSize(size) {
    this.$element.css('font-size', `${size}px`);
    return this;
  }

  addText(text) {
    this.text += text;
    this.$element.html(this.text);
    return this;
  }

  setText(text) {
    this.text = text;
    this.$element.html(this.text);
    return this;
  }
}