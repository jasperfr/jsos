class JSButton extends Component {
  constructor(id, text = "New Button") {
    super(id, 'JSButton', $(`<button class="jsbutton">${text}</button>`));
    this.text = text;
    return this;
  }

  setText(text) {
    this.text = text;
    this.$element.text(this.text);
    return this;
  }

  onClick(func) {
    this.$element.click(func);
    return this;
  }
}