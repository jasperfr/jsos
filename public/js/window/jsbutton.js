class JSButton extends Component {
  constructor(id, text = "New Button") {
    super(id, 'JSButton', $(`<button class="jsbutton">${text}</button>`));
    this.textValue = text;
    return this;
  }

  get text() {
    return this.textValue;
  }

  set text(text) {
    this.textValue = text;
    this.$element.text(this.textValue);
  }

  set click(func) {
    this.$element.click(func);
  }
}